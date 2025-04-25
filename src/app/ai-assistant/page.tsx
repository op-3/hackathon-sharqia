"use client";

import { useState, useRef, useEffect } from "react";
import { 
  readFileContent, 
  formatFileSize, 
  isSupportedFileType, 
  generateSummary,
  sendChatMessage,
  MODEL_ID,
  generateBasicSummary
} from "../../utils/openRouterAPI";
import axios, { AxiosError } from 'axios';

// Types
type FileInfo = {
  name: string;
  size: number;
  type: string;
  content: string | null;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function AIAssistantPage() {
  const [file, setFile] = useState<FileInfo | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "مرحباً! أنا المساعد الذكي الخاص بك. يمكنك رفع ملف وسأقوم بتلخيصه لك أو يمكنك التحدث معي مباشرة والاستفسار عن أي معلومات دراسية تحتاجها.",
    },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Auto-resize textarea as content grows
  useEffect(() => {
    const textarea = messageInputRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    };

    textarea.addEventListener('input', adjustHeight);
    return () => textarea.removeEventListener('input', adjustHeight);
  }, []);

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check file size (limit to 20MB for very large documents)
    if (selectedFile.size > 20 * 1024 * 1024) {
      setErrorMessage("حجم الملف كبير جداً. الحد الأقصى هو 20 ميجابايت.");
      return;
    }

    // Check file type
    if (!isSupportedFileType(selectedFile.type)) {
      setErrorMessage("نوع الملف غير مدعوم. الأنواع المدعومة: PDF، DOCX، TXT.");
      return;
    }

    setErrorMessage(null);

    try {
      // Read file contents
      const fileContent = await readFileContent(selectedFile);
      
      setFile({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        content: fileContent,
      });

      // Add user message about uploading the file
      const fileSizeFormatted = formatFileSize(selectedFile.size);
      const newMessage: ChatMessage = {
        role: "user",
        content: `لقد قمت برفع ملف: ${selectedFile.name} (${fileSizeFormatted})`,
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      
      // Start processing the file automatically
      processFile(fileContent, selectedFile.name);
    } catch (error) {
      console.error("Error reading file:", error);
      setErrorMessage("حدث خطأ أثناء قراءة الملف. يرجى المحاولة مرة أخرى.");
    }
  };

  // Process the file using OpenRouter API
  const processFile = async (fileContent: string, fileName: string) => {
    setIsProcessing(true);
    
    try {
      // Check file size to provide appropriate loading message
      const estimatedTokens = Math.ceil(fileContent.length / 4); // Rough estimate: 4 chars ≈ 1 token
      const isLargeFile = estimatedTokens > 15000;
      
      // Add assistant message indicating processing
      setChatMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: isLargeFile 
            ? "جاري تحليل الملف الكبير وتقسيمه إلى أجزاء للمعالجة... قد تستغرق هذه العملية بضع دقائق، يرجى الانتظار."
            : "جاري تحليل الملف وإعداد الملخص..." 
        }
      ]);

      console.log(`Processing file: ${fileName}, size: ${fileContent.length} characters, estimated tokens: ${estimatedTokens}`);
      
      let summary = '';
      let usingFallback = false;
      
      // Try to get a summary from the API
      try {
        summary = await generateSummary(fileContent, fileName, {
          temperature: 0.7,
          maxTokens: 4000
        });
      } catch (error) {
        console.error("Error from generate summary API:", error);
        console.log("Falling back to basic summary generator");
        
        // If API failed, use our local fallback
        summary = generateBasicSummary(fileContent, fileName);
        summary += "\n\n(تم إنشاء هذا الملخص محلياً بسبب تعذر الوصول لخدمة التلخيص المتقدمة)";
        usingFallback = true;
      }

      // Add the summary to chat
      setChatMessages(prev => {
        // Remove the "processing" message
        const newMessages = [...prev];
        newMessages.pop(); 
        
        // Add the summary message
        return [
          ...newMessages, 
          { 
            role: "assistant", 
            content: summary 
          }
        ];
      });
      
      // Show a warning if we used the fallback
      if (usingFallback) {
        setErrorMessage("تم إنشاء ملخص بسيط محلياً بسبب تعذر الوصول لخدمة التلخيص المتقدمة.");
      } else {
        // Clear any previous errors
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("General error processing file:", error);
      
      // Update the processing message with general error
      setChatMessages(prev => {
        // Remove the "processing" message (if it exists)
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1].content.includes("جاري تحليل")) {
          newMessages.pop();
        }
        
        // Add error message
        return [
          ...newMessages,
          {
            role: "assistant",
            content: "عذراً، حدث خطأ غير متوقع أثناء معالجة الملف. يرجى المحاولة مرة أخرى."
          }
        ];
      });
      
      setErrorMessage("حدث خطأ غير متوقع أثناء معالجة الملف. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Send a message to the chatbot
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage.trim()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);
    
    try {
      // Ensure messages are properly formatted for the API
      const formattedMessages = chatMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the current message
      formattedMessages.push({
        role: "user",
        content: userMessage.content
      });
      
      // Log complete payload for debugging
      console.log("Sending request to OpenRouter:", {
        model: MODEL_ID,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 2000
      });
      
      // Use the new sendChatMessage utility function
      const result = await sendChatMessage(formattedMessages, {
        temperature: 0.7,
        maxTokens: 2000,
        referer: window.location.origin,
        appName: "Academy Plus AI Assistant"
      });
      
      console.log("OpenRouter response:", result);
      
      // Extract assistant response
      const assistantResponse = result.choices[0].message;
      setChatMessages(prev => [...prev, {
        role: "assistant",
        content: assistantResponse.content
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // More detailed error logging
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Error response data:', axiosError.response.data);
          console.error('Error response status:', axiosError.response.status);
        }
      }
      
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'عذراً، حدث خطأ أثناء معالجة الرسالة. يرجى المحاولة مرة أخرى.' 
      }]);
    } finally {
      setIsProcessing(false);
      
      // Reset textarea height
      if (messageInputRef.current) {
        messageInputRef.current.style.height = 'auto';
      }
    }
  };

  // Handle keyboard events in the message input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Reset the state to upload another file
  const handleReset = () => {
    setFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 text-white">
        {/* Animated Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-15">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        {/* Decorative Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-white/10 text-cyan-100 rounded-full text-sm font-semibold backdrop-blur-sm mb-3">الذكاء الاصطناعي</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              المساعد <span className="text-cyan-300 relative">
                الذكي
                <span className="absolute bottom-1 left-0 w-full h-2 bg-cyan-300/20 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-100 leading-relaxed">
              تحدث مع المساعد الذكي أو قم برفع الملفات الدراسية لتلخيصها بسرعة وكفاءة عالية، مما يوفر وقتك ويساعدك في رحلتك الأكاديمية
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Chat Area */}
          <div className="md:col-span-8 flex flex-col">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-4 border border-gray-100 flex-grow overflow-hidden flex flex-col">
              {/* Chat Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto mb-4 p-2 max-h-[calc(80vh-200px)]"
              >
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-3/4 p-4 rounded-xl ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}

                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="max-w-3/4 p-4 rounded-xl bg-gray-100 text-gray-800">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse animation-delay-2000"></div>
                          <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse animation-delay-4000"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-end space-x-2 rtl:space-x-reverse">
                  <textarea
                    ref={messageInputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="اكتب رسالتك هنا..."
                    className="flex-grow resize-none p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[40px] max-h-[120px]"
                    rows={1}
                    disabled={isProcessing}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isProcessing || !inputMessage.trim()}
                    className="bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="إرسال"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180 rtl:rotate-0" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* File Upload Section */}
              <div>
                <div className="pt-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                  />
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 mb-2">أو يمكنك رفع ملف للتلخيص:</p>
                    {file && (
                      <button 
                        onClick={handleReset}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors"
                        disabled={isProcessing}
                      >
                        إلغاء الملف
                      </button>
                    )}
                  </div>
                  
                  {!file ? (
                    <div 
                      onClick={handleUploadClick}
                      className="border-2 border-dashed border-teal-300 rounded-xl p-4 text-center cursor-pointer hover:bg-teal-50 transition-all"
                    >
                      <div className="flex items-center justify-center text-teal-700">
                        <svg 
                          className="w-6 h-6 mr-2 text-teal-500" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="text-sm font-medium">اضغط لرفع ملف (PDF, DOCX, TXT - الحد الأقصى: 10MB)</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 p-2 bg-teal-100 rounded-lg">
                          <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="mr-3">
                          <p className="font-medium text-gray-900 truncate text-sm" dir="ltr">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="mt-3 text-red-500 text-sm">{errorMessage}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">حول المساعد الذكي</h3>
              
              <div className="space-y-4">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-medium text-teal-800 mb-2 flex items-center">
                    <svg className="h-5 w-5 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    كيف يعمل؟
                  </h4>
                  <p className="text-sm text-teal-700">
                    يستخدم المساعد الذكي تقنية الذكاء الاصطناعي المتطورة لتحليل المستندات وتلخيصها بدقة عالية، كما يمكنه الإجابة على استفساراتك الدراسية والأكاديمية.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">يمكنك استخدام المساعد لـ:</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-teal-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      طرح أسئلة دراسية وأكاديمية
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-teal-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      تلخيص المستندات والملفات الدراسية
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-teal-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      الحصول على شرح لمفاهيم صعبة
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-teal-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      المساعدة في حل المشكلات الدراسية
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">الملفات المدعومة للتلخيص:</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-teal-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      PDF
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-teal-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      DOCX (مستندات Word)
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-teal-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      TXT (ملفات نصية)
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                    <svg className="h-5 w-5 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    نصائح للاستخدام
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside pr-2">
                    <li>اطرح أسئلة محددة وواضحة للحصول على إجابات أفضل</li>
                    <li>استخدم جمل قصيرة ومباشرة</li>
                    <li>يمكنك طلب توضيح أو شرح إضافي عند الحاجة</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 