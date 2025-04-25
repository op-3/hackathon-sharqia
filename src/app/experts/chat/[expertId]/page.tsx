"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// Types
type Message = {
  id: string;
  content: string;
  sender: "user" | "expert";
  timestamp: Date;
};

type Specialization = "software" | "security" | "network" | "ai";

type Expert = {
  id: string;
  name: string;
  title: string;
  specialization: Specialization;
  university: string;
  experience: number;
  rating: number;
  bio: string;
  availability: string;
  image?: string;
};

// Mock data for experts (matching the data from the experts page)
const expertsData: Expert[] = [
  {
    id: "1",
    name: "د. أحمد الريامي",
    title: "أستاذ مشارك في هندسة البرمجيات",
    specialization: "software",
    university: "جامعة السلطان قابوس",
    experience: 8,
    rating: 4.9,
    bio: "د. أحمد الريامي أستاذ مشارك في كلية الهندسة وتقنية المعلومات بجامعة السلطان قابوس. حاصل على الدكتوراه في هندسة البرمجيات من جامعة مانشستر بالمملكة المتحدة. له أكثر من 8 سنوات من الخبرة الأكاديمية والصناعية في تطوير البرمجيات وإدارة المشاريع.",
    availability: "متاح 5 أيام في الأسبوع",
  },
  {
    id: "2",
    name: "د. فاطمة البلوشي",
    title: "خبيرة في الأمن السيبراني",
    specialization: "security",
    university: "كلية عمان للتقنية",
    experience: 6,
    rating: 4.7,
    bio: "د. فاطمة البلوشي خبيرة في مجال الأمن السيبراني مع خبرة تزيد عن 6 سنوات في حماية البنية التحتية الحساسة. حاصلة على الدكتوراه في أمن المعلومات من جامعة لندن. عملت سابقاً مع عدة مؤسسات حكومية في تأمين أنظمتها ضد الهجمات السيبرانية.",
    availability: "متاحة 4 أيام في الأسبوع",
  },
  {
    id: "3",
    name: "م. خالد السعيدي",
    title: "مهندس شبكات أول",
    specialization: "network",
    university: "جامعة التقنية والعلوم التطبيقية",
    experience: 10,
    rating: 4.8,
    bio: "م. خالد السعيدي مهندس شبكات أول مع خبرة عملية تزيد عن 10 سنوات في تصميم وإدارة شبكات الحاسوب المعقدة. حاصل على شهادة الماجستير في تكنولوجيا الشبكات من جامعة ليفربول، بالإضافة إلى عدة شهادات مهنية معتمدة من سيسكو ومايكروسوفت.",
    availability: "متاح 3 أيام في الأسبوع",
  },
  {
    id: "4",
    name: "د. نورة الهاشمي",
    title: "باحثة في الذكاء الاصطناعي",
    specialization: "ai",
    university: "جامعة السلطان قابوس",
    experience: 7,
    rating: 4.9,
    bio: "د. نورة الهاشمي باحثة متخصصة في مجال الذكاء الاصطناعي وتعلم الآلة. حاصلة على الدكتوراه في علوم الحاسب الآلي من جامعة ستانفورد. نشرت أكثر من 15 ورقة بحثية في مجلات علمية مرموقة حول تطبيقات الذكاء الاصطناعي في حل المشكلات المعقدة.",
    availability: "متاحة 4 أيام في الأسبوع",
  },
  {
    id: "5",
    name: "د. سالم المعمري",
    title: "خبير في أمن المعلومات",
    specialization: "security",
    university: "جامعة نزوى",
    experience: 9,
    rating: 4.6,
    bio: "د. سالم المعمري خبير في مجال أمن المعلومات والتشفير. حاصل على الدكتوراه في أمن الحاسوب من جامعة كامبريدج. عمل في العديد من المشاريع الوطنية لتعزيز البنية التحتية الأمنية ويقدم استشارات للعديد من المؤسسات الحكومية والخاصة.",
    availability: "متاح 3 أيام في الأسبوع",
  },
  {
    id: "6",
    name: "م. مريم الزدجالي",
    title: "مطورة برمجيات رئيسية",
    specialization: "software",
    university: "جامعة التقنية والعلوم التطبيقية",
    experience: 6,
    rating: 4.7,
    bio: "م. مريم الزدجالي مطورة برمجيات رئيسية مع خبرة واسعة في تطوير تطبيقات الويب والجوال. حاصلة على الماجستير في هندسة البرمجيات من جامعة برمنغهام. عملت في شركات عالمية مثل أمازون ومايكروسوفت، وتتخصص في تطوير واجهات المستخدم وتحسين تجربة المستخدم.",
    availability: "متاحة 5 أيام في الأسبوع",
  },
  {
    id: "7",
    name: "د. ياسر البوسعيدي",
    title: "باحث في الشبكات اللاسلكية",
    specialization: "network",
    university: "جامعة صحار",
    experience: 7,
    rating: 4.5,
    bio: "د. ياسر البوسعيدي باحث متخصص في مجال الشبكات اللاسلكية وإنترنت الأشياء. حاصل على الدكتوراه في هندسة الاتصالات من جامعة إدنبرة. له العديد من الأبحاث المنشورة في مجال تحسين أداء الشبكات اللاسلكية وتقنيات الاتصالات الحديثة.",
    availability: "متاح 4 أيام في الأسبوع",
  },
  {
    id: "8",
    name: "د. هدى العلوي",
    title: "خبيرة في تعلم الآلة",
    specialization: "ai",
    university: "جامعة السلطان قابوس",
    experience: 8,
    rating: 4.8,
    bio: "د. هدى العلوي خبيرة في مجال تعلم الآلة ومعالجة اللغات الطبيعية. حاصلة على الدكتوراه في علوم الحاسب من جامعة أكسفورد. عملت في عدة مشاريع بحثية مع شركات تقنية كبرى وتركز أبحاثها الحالية على تطبيقات الذكاء الاصطناعي في التعليم والصحة.",
    availability: "متاحة 3 أيام في الأسبوع",
  },
];

export default function ChatPage() {
  const { expertId } = useParams();
  const router = useRouter();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Find expert and set initial welcome message
  useEffect(() => {
    if (expertId) {
      const foundExpert = expertsData.find((e) => e.id === expertId);
      if (foundExpert) {
        setExpert(foundExpert);
        
        // Add welcome message
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          content: `مرحباً! أنا ${foundExpert.name}، خبير في ${getSpecializationName(foundExpert.specialization)}. كيف يمكنني مساعدتك اليوم؟`,
          sender: "expert",
          timestamp: new Date(),
        };
        
        setMessages([welcomeMessage]);
      }
    }
  }, [expertId]);

  // Function to get specialization name
  const getSpecializationName = (specialization: Specialization): string => {
    switch (specialization) {
      case "software":
        return "هندسة البرمجيات";
      case "security":
        return "الأمن السيبراني";
      case "network":
        return "الشبكات";
      case "ai":
        return "الذكاء الاصطناعي";
      default:
        return "";
    }
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate expert typing
    setIsTyping(true);
    
    // Simulate expert response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Create expert response based on user message
      let responseText = "";
      
      if (newMessage.toLowerCase().includes("مرحبا") || newMessage.toLowerCase().includes("أهلا")) {
        responseText = "مرحباً بك! كيف يمكنني مساعدتك اليوم؟";
      } else if (newMessage.toLowerCase().includes("شكرا") || newMessage.toLowerCase().includes("شكراً")) {
        responseText = "العفو! سعيد بمساعدتك. هل هناك أي شيء آخر تحتاج إليه؟";
      } else if (newMessage.toLowerCase().includes("دراسات") || newMessage.toLowerCase().includes("دراسة")) {
        responseText = "بالنسبة للدراسات، هناك العديد من المسارات المتاحة. هل تفكر في الدراسات العليا أم مرحلة البكالوريوس؟ يمكنني تقديم النصائح المناسبة بناءً على اهتماماتك.";
      } else if (newMessage.toLowerCase().includes("وظيفة") || newMessage.toLowerCase().includes("عمل")) {
        responseText = "سوق العمل في مجال التقنية متنوع ومليء بالفرص. هل تبحث عن نصائح للحصول على وظيفة أم تطوير مسارك المهني الحالي؟";
      } else if (expert?.specialization === "software" && (newMessage.toLowerCase().includes("برمجة") || newMessage.toLowerCase().includes("تطوير"))) {
        responseText = "تطوير البرمجيات مجال واسع ومثير. هناك العديد من المسارات مثل تطوير الويب، تطبيقات الجوال، أو برمجيات النظم. أي مجال يثير اهتمامك أكثر؟";
      } else if (expert?.specialization === "security" && (newMessage.toLowerCase().includes("أمن") || newMessage.toLowerCase().includes("اختراق"))) {
        responseText = "الأمن السيبراني أصبح من أهم المجالات في عصرنا الحالي. هل تهتم بجانب معين مثل اختبار الاختراق، تحليل البرمجيات الخبيثة، أو سياسات الأمن؟";
      } else if (expert?.specialization === "network" && (newMessage.toLowerCase().includes("شبكة") || newMessage.toLowerCase().includes("شبكات"))) {
        responseText = "تصميم وإدارة الشبكات من المهارات المطلوبة دائماً. هل تفكر في الحصول على شهادات مهنية مثل شهادات سيسكو؟ يمكنني مساعدتك في تحديد المسار المناسب.";
      } else if (expert?.specialization === "ai" && (newMessage.toLowerCase().includes("ذكاء") || newMessage.toLowerCase().includes("تعلم آلة"))) {
        responseText = "الذكاء الاصطناعي وتعلم الآلة من المجالات الواعدة جداً. للبدء، يُنصح بتعلم أساسيات البرمجة والرياضيات، ثم التخصص في مجالات مثل معالجة اللغات الطبيعية أو الرؤية الحاسوبية.";
      } else {
        responseText = "شكراً على سؤالك. يمكنني مساعدتك بمزيد من المعلومات إذا وضحت استفسارك بشكل أكثر تفصيلاً.";
      }
      
      const expertResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseText,
        sender: "expert",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, expertResponse]);
    }, 1500);
  };

  // Handle Enter key to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle back to experts list
  const handleBackToExperts = () => {
    router.push("/experts");
  };

  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل المحادثة...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 shadow-lg relative">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
        
        {/* Header Content */}
        <div className="max-w-4xl mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <Link 
              href="/experts" 
              className="flex items-center text-teal-100 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="text-sm font-medium">العودة للخبراء</span>
            </Link>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-lg font-bold text-teal-50 mr-3">
                {expert.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold text-white">{expert.name}</h2>
                <div className="flex items-center">
                  <span className="text-xs text-teal-100 font-medium">{expert.title}</span>
                  <span className="mx-2 text-teal-200 text-xs">•</span>
                  <div className="text-xs px-2 py-0.5 bg-green-500/20 text-green-100 rounded-full flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    متصل الآن
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.sender === "user"
                      ? "bg-white border border-gray-200 text-gray-800 shadow-sm"
                      : "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-right mt-2">
                    <span
                      className={`text-xs ${
                        message.sender === "user"
                          ? "text-gray-400"
                          : "text-teal-200"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("ar-OM", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl px-5 py-3 bg-teal-100/50 backdrop-blur-sm shadow-sm">
                  <div className="flex space-x-1 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex">
            <textarea
              className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-3 focus:ring-teal-500 focus:border-teal-500 text-right shadow-sm"
              rows={2}
              placeholder="اكتب رسالتك هنا..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            ></textarea>
            <button
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl px-5 py-3 mr-2 hover:from-teal-700 hover:to-cyan-700 transition-colors shadow-md flex items-center justify-center"
              onClick={handleSendMessage}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 