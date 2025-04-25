"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'expert';
  timestamp: Date;
};

type Expert = {
  id: number;
  name: string;
  title: string;
  university: string;
  specialization: string;
  image: string;
  online?: boolean;
};

const ExpertChatPage = () => {
  const params = useParams();
  const expertId = Number(params.id);
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [expert, setExpert] = useState<Expert | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock experts data - in a real app, this would come from an API
  const experts: Expert[] = [
    {
      id: 1,
      name: "د. أحمد الريامي",
      title: "أستاذ مشارك",
      university: "جامعة السلطان قابوس",
      specialization: "الهندسة",
      image: "/images/expert-1.jpg",
      online: true
    },
    {
      id: 2,
      name: "د. فاطمة البلوشي",
      title: "أستاذ",
      university: "كلية عمان الطبية",
      specialization: "الطب والصحة",
      image: "/images/expert-2.jpg",
      online: false
    },
  ];
  
  const mockInitialMessages: Message[] = [
    {
      id: 1,
      text: "مرحبا! كيف يمكنني مساعدتك اليوم؟",
      sender: "expert",
      timestamp: new Date(Date.now() - 1000 * 60 * 10) // 10 minutes ago
    }
  ];
  
  // Simulate fetching data
  useEffect(() => {
    const foundExpert = experts.find(e => e.id === expertId);
    
    // Simulate loading
    setTimeout(() => {
      setExpert(foundExpert || null);
      setMessages(mockInitialMessages);
      setIsLoading(false);
    }, 1000);
  }, [expertId]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate expert response after a delay
    setTimeout(() => {
      if (expertId === 1) {
        const expertResponse: Message = {
          id: messages.length + 2,
          text: "شكراً على سؤالك. سأقوم بالرد عليه في أقرب وقت ممكن. هل يمكنك تقديم المزيد من التفاصيل؟",
          sender: 'expert',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, expertResponse]);
      } else if (expertId === 2) {
        const expertResponse: Message = {
          id: messages.length + 2,
          text: "أهلاً بك! نعم، هذا سؤال مهم في مجال الطب. دعني أوضح لك بعض النقاط الأساسية حول هذا الموضوع...",
          sender: 'expert',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, expertResponse]);
      }
    }, 1500);
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-OM', { hour: '2-digit', minute: '2-digit' });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }
  
  if (!expert) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">الخبير غير موجود</h1>
        <p className="text-gray-600 mb-6">عذراً، لا يمكن العثور على الخبير الذي تبحث عنه.</p>
        <Link href="/experts" className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-all">
          العودة إلى صفحة الخبراء
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-[calc(100vh-6rem)]">
        {/* Expert Info Header */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative h-12 w-12 mr-4">
              <Image
                src={expert.image}
                alt={expert.name}
                fill
                className="object-cover rounded-full"
              />
              <span className={`absolute bottom-0 left-0 h-3 w-3 rounded-full ${expert.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{expert.name}</h2>
              <p className="text-sm text-gray-600">{expert.title} - {expert.specialization}</p>
            </div>
          </div>
          
          <Link href={`/experts/${expert.id}`} className="text-teal-600 hover:text-teal-800 text-sm">
            عرض الملف الشخصي
          </Link>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 bg-white shadow-md rounded-lg flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-bl-none'
                      : 'bg-gray-100 text-gray-800 rounded-tr-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-teal-100' : 'text-gray-500'
                  }`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 border border-gray-300 rounded-lg rounded-l-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded-lg rounded-r-none hover:bg-teal-700 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transform rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertChatPage; 