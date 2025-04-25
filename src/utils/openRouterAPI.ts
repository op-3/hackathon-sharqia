// OpenRouter API integration with OpenAI model
import axios from 'axios';

// API key for OpenRouter
export const OPENROUTER_API_KEY = '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';
export const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Updated Model ID (using OpenAI GPT-3.5 Turbo which is widely supported)
export const MODEL_ID = 'openai/gpt-3.5-turbo';

/**
 * Helper function to deeply extract text content from any possible response structure
 * @param obj The object to inspect
 * @returns The first string content found or null if none
 */
const extractTextContent = (obj: any): string | null => {
  // Base cases
  if (typeof obj === 'string') {
    return obj;
  }
  
  if (!obj || typeof obj !== 'object') {
    return null;
  }
  
  // Common field names that might contain content
  const contentFields = [
    'content', 'text', 'message', 'summary', 'result', 'output',
    'answer', 'response', 'generated_text', 'completion'
  ];
  
  // Try direct access to common content fields
  for (const field of contentFields) {
    if (typeof obj[field] === 'string' && obj[field].trim()) {
      return obj[field];
    }
    
    // Check one level deeper for nested contents
    if (obj[field] && typeof obj[field] === 'object') {
      const nestedContent = extractTextContent(obj[field]);
      if (nestedContent) {
        return nestedContent;
      }
    }
  }
  
  // Look for content in choices array
  if (Array.isArray(obj.choices) && obj.choices.length > 0) {
    for (const choice of obj.choices) {
      const choiceContent = extractTextContent(choice);
      if (choiceContent) {
        return choiceContent;
      }
    }
  }
  
  // If we have an array, try to find content in its items
  if (Array.isArray(obj) && obj.length > 0) {
    for (const item of obj) {
      const itemContent = extractTextContent(item);
      if (itemContent) {
        return itemContent;
      }
    }
  }
  
  // Still nothing? Try to find any string property longer than 50 chars
  for (const key in obj) {
    if (typeof obj[key] === 'string' && obj[key].length > 50) {
      return obj[key];
    }
    
    // Recurse into objects but avoid circular references
    if (obj[key] && typeof obj[key] === 'object' && obj[key] !== obj) {
      const deepContent = extractTextContent(obj[key]);
      if (deepContent) {
        return deepContent;
      }
    }
  }
  
  return null;
};

/**
 * Splits a long text into smaller chunks suitable for the API's context window
 * @param text The text to split into chunks
 * @param maxTokens Approximate maximum tokens per chunk
 * @returns Array of text chunks
 */
const splitTextIntoChunks = (text: string, maxTokens: number = 12000): string[] => {
  // Estimate: 1 token ~= 4 characters in English/Arabic text
  const avgCharsPerToken = 4;
  const maxCharsPerChunk = maxTokens * avgCharsPerToken;
  
  // If text is already small enough, return it as is
  if (text.length <= maxCharsPerChunk) {
    return [text];
  }
  
  const chunks: string[] = [];
  
  // Split text into paragraphs
  const paragraphs = text.split(/\n\s*\n/);
  
  let currentChunk = '';
  
  for (const paragraph of paragraphs) {
    // If adding this paragraph would exceed the chunk size
    if (currentChunk.length + paragraph.length + 2 > maxCharsPerChunk) {
      // If current chunk has content, add it to chunks
      if (currentChunk.length > 0) {
        chunks.push(currentChunk);
        currentChunk = '';
      }
      
      // If a single paragraph is too long, split it into sentences
      if (paragraph.length > maxCharsPerChunk) {
        const sentences = paragraph.split(/(?<=[.!?])\s+/);
        
        for (const sentence of sentences) {
          if (currentChunk.length + sentence.length + 1 > maxCharsPerChunk) {
            if (currentChunk.length > 0) {
              chunks.push(currentChunk);
              currentChunk = '';
            }
            
            // If a single sentence is still too long, split it arbitrarily
            if (sentence.length > maxCharsPerChunk) {
              let remainingSentence = sentence;
              while (remainingSentence.length > 0) {
                const chunkSize = Math.min(remainingSentence.length, maxCharsPerChunk);
                chunks.push(remainingSentence.slice(0, chunkSize));
                remainingSentence = remainingSentence.slice(chunkSize);
              }
            } else {
              currentChunk = sentence;
            }
          } else {
            currentChunk += (currentChunk ? ' ' : '') + sentence;
          }
        }
      } else {
        currentChunk = paragraph;
      }
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    }
  }
  
  // Add the last chunk if it has content
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }
  
  return chunks;
};

/**
 * Generates a summary of the given text using OpenAI model through OpenRouter API
 * Handles large documents by splitting them into chunks and summarizing each
 * @param text The text to summarize
 * @param options Additional options for the API request
 * @returns A promise that resolves to the generated summary
 */
export const generateSummary = async (
  text: string, 
  fileName: string,
  options: {
    temperature?: number;
    maxTokens?: number;
  } = {}
): Promise<string> => {
  const { temperature = 0.7, maxTokens = 4000 } = options;

  // Check if text is very large and needs chunking
  const estimatedTokens = Math.ceil(text.length / 4); // Rough estimate: 4 chars ≈ 1 token
  
  if (estimatedTokens > 15000) {
    console.log(`Text is very large (estimated ${estimatedTokens} tokens), splitting into chunks`);
    
    // Split text into manageable chunks
    const chunks = splitTextIntoChunks(text, 12000);
    console.log(`Split text into ${chunks.length} chunks`);
    
    // Generate summaries for each chunk
    const chunkSummaries = [];
    
    for (let i = 0; i < chunks.length; i++) {
      console.log(`Processing chunk ${i+1}/${chunks.length}, size: ${chunks[i].length} characters`);
      
      try {
        // For each chunk, create a smaller summary
        const chunkPrompt = `
          أنت مساعد ذكي متخصص في تلخيص المستندات.
          هذا جزء ${i+1} من ${chunks.length} من ملف "${fileName}".
          قم بتلخيص هذا الجزء بشكل واضح ومختصر مع الحفاظ على النقاط الرئيسية.
          المحتوى:
          
          ${chunks[i]}
        `;
        
        const payload = {
          model: MODEL_ID,
          messages: [
            {
              role: 'user',
              content: chunkPrompt
            }
          ],
          temperature,
          max_tokens: 2000 // Smaller summary for each chunk
        };
        
        console.log(`Sending chunk ${i+1} to API`);
        
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://academy-plus.com',
            'X-Title': 'Academy Plus AI Assistant'
          },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error(`API error (${response.status}) for chunk ${i+1}:`, errorData);
          throw new Error(`API error: ${response.status} ${JSON.stringify(errorData)}`);
        }
        
        const result = await response.json();
        
        // Extract content from result using our flexible extraction
        let chunkSummaryContent = '';
        
        if (result.choices && result.choices.length > 0 && result.choices[0].message) {
          chunkSummaryContent = result.choices[0].message.content;
        } else {
          const extractedContent = extractTextContent(result);
          if (extractedContent) {
            chunkSummaryContent = extractedContent;
          } else {
            // Create a basic summary for this chunk if API fails
            console.log(`Using basic summary for chunk ${i+1} due to API issue`);
            chunkSummaryContent = generateBasicSummary(chunks[i], `${fileName} (جزء ${i+1})`);
          }
        }
        
        chunkSummaries.push(chunkSummaryContent);
      } catch (error) {
        console.error(`Error processing chunk ${i+1}:`, error);
        // Add a basic summary for this chunk
        const basicSummary = generateBasicSummary(chunks[i], `${fileName} (جزء ${i+1})`);
        chunkSummaries.push(basicSummary);
      }
    }
    
    // Now combine all chunk summaries and generate a final summary
    if (chunkSummaries.length === 1) {
      return chunkSummaries[0];
    }
    
    // Combine all chunk summaries
    const combinedSummary = chunkSummaries.map((summary, index) => 
      `==== ملخص الجزء ${index+1} ====\n${summary}`
    ).join('\n\n');
    
    // If there are multiple chunks, create a final summary of summaries
    if (chunkSummaries.length <= 3) {
      // For 2-3 chunks, just return the combined summaries
      return `تم تقسيم الملف إلى ${chunkSummaries.length} أجزاء بسبب حجمه الكبير. فيما يلي ملخص لكل جزء:\n\n${combinedSummary}`;
    }
    
    // For many chunks, try to summarize the summaries
    try {
      const finalPrompt = `
        أنت مساعد ذكي متخصص في تلخيص المستندات.
        قم بإنشاء ملخص نهائي موحد من الملخصات الجزئية التالية لملف "${fileName}".
        يجب أن يكون الملخص النهائي شاملاً ومنظماً ويحتوي على أهم النقاط من كل الأجزاء.
        
        ${combinedSummary}
      `;
      
      const payload = {
        model: MODEL_ID,
        messages: [
          {
            role: 'user',
            content: finalPrompt
          }
        ],
        temperature,
        max_tokens: maxTokens
      };
      
      console.log("Generating final summary from all chunks");
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://academy-plus.com',
          'X-Title': 'Academy Plus AI Assistant'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        // If final summary fails, return the combined summaries
        return `تم تقسيم الملف إلى ${chunkSummaries.length} أجزاء بسبب حجمه الكبير. فيما يلي ملخص لكل جزء:\n\n${combinedSummary}`;
      }
      
      const result = await response.json();
      
      // Extract content from result
      if (result.choices && result.choices.length > 0 && result.choices[0].message) {
        return result.choices[0].message.content;
      }
      
      const extractedContent = extractTextContent(result);
      if (extractedContent) {
        return extractedContent;
      }
      
      // Fall back to combined summaries
      return `تم تقسيم الملف إلى ${chunkSummaries.length} أجزاء بسبب حجمه الكبير. فيما يلي ملخص لكل جزء:\n\n${combinedSummary}`;
    } catch (error) {
      console.error("Error generating final summary:", error);
      // Return the combined summaries if final summarization fails
      return `تم تقسيم الملف إلى ${chunkSummaries.length} أجزاء بسبب حجمه الكبير. فيما يلي ملخص لكل جزء:\n\n${combinedSummary}`;
    }
  }

  // For smaller texts, use the original approach
  // Construct prompt for summarization
  const prompt = `
    أنت مساعد ذكي متخصص في تلخيص المستندات. 
    قم بتلخيص المحتوى التالي من ملف "${fileName}" بشكل واضح ومختصر، مع الحفاظ على النقاط الرئيسية.
    يجب أن يكون الملخص شاملاً ومفيداً ولا يتجاوز 30% من طول النص الأصلي.
    المحتوى:
    
    ${text}
  `;

  try {
    console.log(`Generating summary for file: ${fileName} using model: ${MODEL_ID}`);
    
    // Create the request payload
    const payload = {
      model: MODEL_ID,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature,
      max_tokens: maxTokens
    };
    
    // Log the payload for debugging (truncated to avoid large logs)
    console.log(`Summary request payload: ${JSON.stringify({
      ...payload, 
      messages: [{...payload.messages[0], content: 'Content truncated for logging...'}]
    }, null, 2)}`);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://academy-plus.com',
        'X-Title': 'Academy Plus AI Assistant'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`API error (${response.status}):`, errorData);
      throw new Error(`API error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    console.log("Summary API response received:", JSON.stringify(result, null, 2));
    
    // More flexible response handling to accommodate different API response structures
    if (!result) {
      console.error("Empty API response");
      throw new Error("API returned an empty response");
    }
    
    // Try different known response structures
    if (result.choices && result.choices.length > 0 && result.choices[0].message) {
      // Standard OpenAI-like format
      return result.choices[0].message.content;
    } else if (result.message && typeof result.message.content === 'string') {
      // Direct message content format
      return result.message.content;
    } else if (result.content && typeof result.content === 'string') {
      // Simple content format
      return result.content;
    } else if (result.text && typeof result.text === 'string') {
      // Text-only format
      return result.text;
    } else if (result.summary && typeof result.summary === 'string') {
      // Summary-specific format
      return result.summary;
    } else if (result.output && typeof result.output === 'string') {
      // Output format
      return result.output;
    } else if (result.data && result.data.content && typeof result.data.content === 'string') {
      // Nested data format
      return result.data.content;
    } else if (Array.isArray(result) && result.length > 0 && result[0].text) {
      // Array of completions format
      return result[0].text;
    }
    
    // Use deep content extraction as a last resort
    const extractedContent = extractTextContent(result);
    if (extractedContent) {
      console.log("Found content through deep extraction");
      return extractedContent;
    }
    
    // If we reached here, we couldn't identify the structure
    console.error("Unrecognized API response structure:", result);
    
    // Fall back to using generateBasicSummary
    console.log("Using fallback basic summary due to unexpected API response format");
    return generateBasicSummary(text, fileName);
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
};

/**
 * Reads file content as text
 * @param file The file to read
 * @returns A promise that resolves to the file content as string
 */
export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("FileReader error"));
    };

    if (file.type === 'application/pdf') {
      // For PDF files, we're just getting the raw data for now
      // In a production app, you'd use a PDF parsing library
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  });
};

/**
 * Formats file size in a human-readable format
 * @param bytes File size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / 1048576).toFixed(1) + " MB";
};

/**
 * Checks if the file type is supported
 * @param fileType MIME type of the file
 * @returns Boolean indicating if the file type is supported
 */
export const isSupportedFileType = (fileType: string): boolean => {
  const validTypes = [
    'application/pdf', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'text/plain'
  ];
  return validTypes.includes(fileType);
};

/**
 * Gets file extension from MIME type
 * @param mimeType MIME type of the file
 * @returns File extension without dot
 */
export const getFileExtension = (mimeType: string): string => {
  const mimeToExt: Record<string, string> = {
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'text/plain': 'txt'
  };
  
  return mimeToExt[mimeType] || '';
};

/**
 * Sends a message to the OpenRouter API and returns the response using Axios
 * @param messages Array of messages to send to the API
 * @param options Additional options for the API
 * @returns Promise that resolves to the API response
 */
export const sendChatMessage = async (
  messages: Array<{ role: string; content: string }>,
  options: {
    temperature?: number;
    maxTokens?: number;
    referer?: string;
    appName?: string;
  } = {}
): Promise<any> => {
  const { temperature = 0.7, maxTokens = 2000, referer = "https://academy-plus.com", appName = "Academy Plus AI" } = options;

  try {
    console.log(`Sending chat request to model: ${MODEL_ID}`);
    
    // Create the request payload
    const payload = {
      model: MODEL_ID,
      messages: messages,
      temperature,
      max_tokens: maxTokens
    };
    
    // Log the complete request for debugging
    console.log("OpenRouter request payload:", JSON.stringify(payload, null, 2));
    
    const response = await axios.post(API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': referer,
        'X-Title': appName
      }
    });

    console.log("OpenRouter successful response received");
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

/**
 * Generate a basic fallback summary when the API fails
 * @param text Text to summarize
 * @param fileName Name of the file
 * @returns A simple summary of the text
 */
export const generateBasicSummary = (text: string, fileName: string): string => {
  try {
    // Calculate some basic stats
    const words = text.split(/\s+/).filter(Boolean);
    const paragraphs = text.split(/\n\s*\n/).filter(Boolean);
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    
    // Extract first and last sentence for context (if available)
    const firstSentence = sentences.length > 0 ? sentences[0].trim() : '';
    const lastSentence = sentences.length > 1 ? sentences[sentences.length - 1].trim() : '';
    
    // Create a basic statistical summary
    return `
      ملخص أساسي للمحتوى المُقدم في الملف: "${fileName}".
      
      المحتوى يتكون من حوالي ${words.length} كلمة، و ${paragraphs.length} فقرة.
      
      يبدأ المستند بـ "${firstSentence}"
      ${lastSentence ? `\n\nوينتهي بـ "${lastSentence}"` : ''}
      
      هذا ملخص أساسي تم إنشاؤه تلقائيًا. للحصول على ملخص أكثر دقة، يرجى المحاولة مرة أخرى لاحقًا.
    `;
  } catch (error) {
    console.error("Error creating basic summary:", error);
    return `
      لم نتمكن من إنشاء ملخص للملف "${fileName}" في هذا الوقت.
      يرجى المحاولة مرة أخرى لاحقًا.
    `;
  }
}; 