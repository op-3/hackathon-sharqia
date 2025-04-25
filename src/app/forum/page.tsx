"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Thread = {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  category: string;
  date: string;
  repliesCount: number;
  viewsCount: number;
  isPinned: boolean;
  isHot: boolean;
  lastReply: {
    author: string;
    date: string;
  };
};

type Category = {
  id: string;
  name: string;
  description: string;
  threadsCount: number;
  postsCount: number;
  icon: string;
};

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Forum statistics
  const forumStats = {
    threadsCount: 10,
    postsCount: 6,
    membersCount: 12
  };

  // Updated categories to match the 4 requested specializations
  const categories: Category[] = [
    {
      id: "software",
      name: "هندسة برمجيات",
      description: "مناقشة البرمجة وهندسة البرمجيات وتطوير التطبيقات",
      threadsCount: 3,
      postsCount: 2,
      icon: "software"
    },
    {
      id: "networking",
      name: "شبكات",
      description: "مناقشة الشبكات وبروتوكولات الاتصال والبنية التحتية",
      threadsCount: 2,
      postsCount: 1,
      icon: "networking"
    },
    {
      id: "cybersecurity",
      name: "أمن سيبراني",
      description: "مناقشة الأمن السيبراني وحماية المعلومات والخصوصية",
      threadsCount: 3,
      postsCount: 2,
      icon: "cybersecurity"
    },
    {
      id: "ai",
      name: "ذكاء اصطناعي",
      description: "مناقشة الذكاء الاصطناعي وتعلم الآلة ومعالجة اللغات الطبيعية",
      threadsCount: 2,
      postsCount: 1,
      icon: "ai"
    },
  ];

  // Updated threads data to match categories
  const threadsData: Thread[] = [
    {
      id: "1",
      title: "ما هي أفضل لغات البرمجة للمبتدئين في عام 2023؟",
      author: "محمد العامري",
      authorAvatar: "/images/forum/user-1.jpg",
      category: "software",
      date: "منذ 2 ساعة",
      repliesCount: 3,
      viewsCount: 142,
      isPinned: true,
      isHot: true,
      lastReply: {
        author: "أحمد السالمي",
        date: "منذ 15 دقيقة"
      }
    },
    {
      id: "2",
      title: "كيفية إعداد بيئة تطوير متكاملة لتطبيقات الويب",
      author: "سارة المعمري",
      authorAvatar: "/images/forum/user-2.jpg",
      category: "software",
      date: "منذ 6 ساعات",
      repliesCount: 2,
      viewsCount: 95,
      isPinned: false,
      isHot: true,
      lastReply: {
        author: "خالد البلوشي",
        date: "منذ 1 ساعة"
      }
    },
    {
      id: "3",
      title: "استراتيجيات حماية البيانات وتشفيرها",
      author: "فاطمة الهاشمي",
      authorAvatar: "/images/forum/user-3.jpg",
      category: "cybersecurity",
      date: "منذ يوم",
      repliesCount: 4,
      viewsCount: 215,
      isPinned: true,
      isHot: false,
      lastReply: {
        author: "حسين الرياشي",
        date: "منذ 4 ساعات"
      }
    },
    {
      id: "4",
      title: "تكوين شبكة محلية آمنة للمؤسسات الصغيرة",
      author: "علي المجيني",
      authorAvatar: "/images/forum/user-4.jpg",
      category: "networking",
      date: "منذ 2 أيام",
      repliesCount: 1,
      viewsCount: 127,
      isPinned: false,
      isHot: false,
      lastReply: {
        author: "ليلى البلوشي",
        date: "منذ 12 ساعة"
      }
    },
    {
      id: "5",
      title: "كيف تساعد تقنية الذكاء الاصطناعي في حل مشكلات العالم الحقيقي؟",
      author: "يوسف الزدجالي",
      authorAvatar: "/images/forum/user-5.jpg",
      category: "ai",
      date: "منذ 3 أيام",
      repliesCount: 2,
      viewsCount: 163,
      isPinned: false,
      isHot: true,
      lastReply: {
        author: "نور السيابي",
        date: "منذ 5 ساعات"
      }
    },
    {
      id: "6",
      title: "مبادئ هندسة البرمجيات وأفضل الممارسات",
      author: "سعيد الحراصي",
      authorAvatar: "/images/forum/user-6.jpg",
      category: "software",
      date: "منذ 4 أيام",
      repliesCount: 1,
      viewsCount: 89,
      isPinned: false,
      isHot: false,
      lastReply: {
        author: "هدى الكندي",
        date: "منذ يوم"
      }
    },
    {
      id: "7",
      title: "تحليل ثغرات الأمن السيبراني وكيفية تجنبها",
      author: "مريم البريكي",
      authorAvatar: "/images/forum/user-7.jpg",
      category: "cybersecurity",
      date: "منذ 5 أيام",
      repliesCount: 2,
      viewsCount: 112,
      isPinned: false,
      isHot: false,
      lastReply: {
        author: "أمجد الراشدي",
        date: "منذ 2 أيام"
      }
    },
    {
      id: "8",
      title: "النماذج اللغوية الكبيرة وتطبيقاتها",
      author: "أحمد المحرزي",
      authorAvatar: "/images/forum/user-8.jpg",
      category: "ai",
      date: "منذ أسبوع",
      repliesCount: 3,
      viewsCount: 195,
      isPinned: false,
      isHot: true,
      lastReply: {
        author: "ريم العيسائي",
        date: "منذ 3 أيام"
      }
    },
    {
      id: "9",
      title: "بروتوكولات شبكات الاتصال الحديثة",
      author: "حمدان العزري",
      authorAvatar: "/images/forum/user-9.jpg",
      category: "networking",
      date: "منذ 10 أيام",
      repliesCount: 2,
      viewsCount: 150,
      isPinned: false,
      isHot: false,
      lastReply: {
        author: "سالم الكندي",
        date: "منذ 4 أيام"
      }
    },
    {
      id: "10",
      title: "اختبار الاختراق وأدوات الأمن السيبراني",
      author: "زينب العلوي",
      authorAvatar: "/images/forum/user-10.jpg",
      category: "cybersecurity",
      date: "منذ 2 أسبوع",
      repliesCount: 1,
      viewsCount: 175,
      isPinned: false,
      isHot: false,
      lastReply: {
        author: "طلال المنذري",
        date: "منذ 5 أيام"
      }
    }
  ];

  // Filter threads based on search query and active tab
  const filteredThreads = threadsData.filter(thread => {
    const matchesSearch = 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeTab === "all" || thread.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  // Sort threads to show pinned ones first
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  // Category icon component - updated with new icons for our categories
  const CategoryIcon = ({ category }: { category: string }) => {
    const icons = {
      software: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      networking: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      cybersecurity: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      ai: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    };
  
    return icons[category as keyof typeof icons] || null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="relative mb-12 overflow-hidden bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-20"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 p-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold text-white mb-3">منتدى أكاديمي بلس</h1>
            <p className="text-teal-100 text-lg leading-relaxed max-w-2xl">
              مرحباً بك في منتدى أكاديمي بلس، المكان المثالي لمناقشة المواضيع التقنية والأكاديمية مع زملائك وخبراء المجال.
            </p>
          </div>
          <Link 
            href="/forum/new-thread" 
            className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all px-6 py-3 rounded-xl font-medium inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            موضوع جديد
          </Link>
        </div>
      </div>

      {/* Forum Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
          <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-1">{forumStats.threadsCount}</div>
          <div className="text-lg text-blue-700 font-medium">المواضيع</div>
        </div>
        
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-teal-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
          <div className="bg-teal-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <div className="text-4xl font-bold text-teal-600 mb-1">{forumStats.postsCount}</div>
          <div className="text-lg text-teal-700 font-medium">المشاركات</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
          <div className="bg-purple-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="text-4xl font-bold text-purple-600 mb-1">{forumStats.membersCount}</div>
          <div className="text-lg text-purple-700 font-medium">الأعضاء</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="md:flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن موضوع..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex overflow-x-auto md:overflow-visible gap-2 pb-1">
            <button 
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${activeTab === "all" 
                ? "bg-teal-600 text-white shadow-md" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setActiveTab("all")}
            >
              الكل
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${activeTab === category.id 
                  ? "bg-teal-600 text-white shadow-md" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      {activeTab === "all" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all group">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <CategoryIcon category={category.icon} />
                  </div>
                  <div className="flex-1">
                    <Link href={`/forum/category/${category.id}`} className="text-xl font-bold text-gray-900 hover:text-teal-600 transition-colors">
                      {category.name}
                    </Link>
                    <p className="text-gray-600 mt-2 leading-relaxed">{category.description}</p>
                    <div className="flex items-center text-gray-500 text-sm mt-4">
                      <div className="flex items-center bg-teal-50 px-3 py-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <span>{category.threadsCount} مواضيع</span>
                      </div>
                      <div className="flex items-center mr-3 bg-blue-50 px-3 py-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        <span>{category.postsCount} مشاركات</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Threads */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10 border border-gray-100">
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            {activeTab === "all" ? "أحدث المواضيع" : `مواضيع ${categories.find(c => c.id === activeTab)?.name}`}
          </h2>
          <div className="text-sm bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
            {sortedThreads.length} موضوع
          </div>
        </div>

        {sortedThreads.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {sortedThreads.map((thread) => (
              <div key={thread.id} className="group hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-transparent transition-all">
                <div className="p-6">
                  <div className="flex">
                    <div className="flex-shrink-0 ml-4 hidden md:block">
                      <div className="relative">
                        <Image 
                          src={thread.authorAvatar} 
                          alt={thread.author} 
                          width={48} 
                          height={48} 
                          className="rounded-full border-2 border-white shadow-md group-hover:border-teal-300 transition-all"
                        />
                        {(thread.isPinned || thread.isHot) && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-teal-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {thread.isPinned && (
                          <span className="bg-orange-100 text-orange-600 text-xs px-2.5 py-1 rounded-lg font-medium inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            مثبت
                          </span>
                        )}
                        {thread.isHot && (
                          <span className="bg-red-100 text-red-600 text-xs px-2.5 py-1 rounded-lg font-medium inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                            </svg>
                            نشط
                          </span>
                        )}
                        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium inline-flex items-center ${
                          thread.category === 'software' ? 'bg-blue-100 text-blue-600' :
                          thread.category === 'networking' ? 'bg-green-100 text-green-600' :
                          thread.category === 'cybersecurity' ? 'bg-red-100 text-red-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {categories.find(c => c.id === thread.category)?.name}
                        </span>
                      </div>
                      <Link href={`/forum/thread/${thread.id}`} className="text-xl font-bold text-gray-900 hover:text-teal-600 transition-colors block mb-3 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                        {thread.title}
                      </Link>
                      <div className="flex flex-wrap items-center justify-between">
                        <div className="flex flex-wrap items-center text-sm text-gray-600">
                          <div className="flex items-center ml-4">
                            <span className="ml-1">بواسطة:</span>
                            <Link href={`/profile/${thread.author}`} className="text-teal-600 hover:underline font-medium">{thread.author}</Link>
                          </div>
                          <div className="ml-4 bg-gray-100 px-2 py-0.5 rounded-md">
                            <span>{thread.date}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mt-2 md:mt-0">
                          <div className="flex items-center ml-4 bg-teal-50 px-3 py-1 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            <span>{thread.repliesCount}</span>
                          </div>
                          <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{thread.viewsCount}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-dashed border-gray-200 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                          <span className="ml-1">آخر رد:</span>
                          <Link href={`/profile/${thread.lastReply.author}`} className="text-teal-600 hover:underline ml-1 font-medium">{thread.lastReply.author}</Link>
                          <span className="mr-1 bg-gray-100 px-2 py-0.5 rounded-md">{thread.lastReply.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="bg-teal-50 inline-flex items-center justify-center w-24 h-24 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">لا توجد مواضيع للعرض</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">لم يتم العثور على أي مواضيع تطابق معايير البحث الحالية. يمكنك تعديل معايير البحث أو إنشاء موضوع جديد.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="bg-white border border-teal-600 text-teal-600 hover:bg-teal-50 transition-colors px-6 py-3 rounded-xl font-medium inline-flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                إعادة ضبط البحث
              </button>
              <Link
                href="/forum/new-thread"
                className="bg-teal-600 text-white hover:bg-teal-700 transition-colors px-6 py-3 rounded-xl font-medium inline-flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                إنشاء موضوع جديد
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="relative overflow-hidden rounded-2xl mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-800"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-20"></div>
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 p-10 md:p-16 text-center">
          <div className="inline-flex justify-center items-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">كن جزءًا من مجتمعنا</h3>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            انضم إلى {forumStats.membersCount} عضو في منتدى أكاديمي بلس واستفد من تبادل المعرفة والخبرات مع الطلاب والأكاديميين والخبراء في مختلف المجالات التقنية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link 
              href="/register" 
              className="bg-white text-teal-700 hover:bg-teal-50 transition-all px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex-1 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              سجل الآن
            </Link>
            <Link 
              href="/login" 
              className="bg-transparent text-white border-2 border-white/60 hover:bg-white/10 transition-all px-8 py-4 rounded-xl font-medium flex-1 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mb-6">
        <p>منتدى أكاديمي بلس - المكان الأمثل للمناقشات الأكاديمية والتقنية</p>
        <p className="mt-2">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
} 