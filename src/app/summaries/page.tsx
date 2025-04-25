"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Types
type Summary = {
  id: string;
  title: string;
  subject: string;
  instructor: string;
  author: string;
  year: string;
  pages: number;
};

type Subject = {
  id: string;
  name: string;
};

const SummariesPage = () => {
  // State for filters
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [summaries, setSummaries] = useState<Summary[]>([]);

  // Restricted subjects to 4 specializations only as requested
  const subjects: Subject[] = [
    { id: "all", name: "جميع التخصصات" },
    { id: "software", name: "هندسة برمجيات" },
    { id: "cybersecurity", name: "أمن سيبراني" },
    { id: "networking", name: "شبكات" },
    { id: "ai", name: "ذكاء اصطناعي" },
  ];

  // Mock data for summaries
  const mockSummaries: Summary[] = [
    {
      id: "1",
      title: "أساسيات هندسة البرمجيات",
      subject: "هندسة برمجيات",
      instructor: "د. أحمد الهاشمي",
      author: "محمد السالمي",
      year: "2023",
      pages: 75,
    },
    {
      id: "2",
      title: "مقدمة في الأمن السيبراني",
      subject: "أمن سيبراني",
      instructor: "د. محمد الرئيسي",
      author: "فاطمة الهاشمية",
      year: "2022",
      pages: 120,
    },
    {
      id: "3",
      title: "البرمجة المتقدمة بلغة Python",
      subject: "هندسة برمجيات",
      instructor: "د. منى الكندية",
      author: "خالد العامري",
      year: "2023",
      pages: 92,
    },
    {
      id: "4",
      title: "تطبيقات الذكاء الاصطناعي",
      subject: "ذكاء اصطناعي",
      instructor: "د. يوسف الكندي",
      author: "سارة الفارسي",
      year: "2023",
      pages: 105,
    },
    {
      id: "5",
      title: "أمن الشبكات والمعلومات",
      subject: "أمن سيبراني",
      instructor: "م. خالد البلوشي",
      author: "عائشة الناصري",
      year: "2022",
      pages: 88,
    },
    {
      id: "6",
      title: "تصميم وإدارة الشبكات",
      subject: "شبكات",
      instructor: "د. ناصر المعمري",
      author: "علي البلوشي",
      year: "2023",
      pages: 115,
    },
    {
      id: "7",
      title: "التعلم الآلي وتطبيقاته",
      subject: "ذكاء اصطناعي",
      instructor: "د. فاطمة الزدجالي",
      author: "حمد الشحي",
      year: "2023",
      pages: 98,
    },
    {
      id: "8",
      title: "بروتوكولات الشبكات المتقدمة",
      subject: "شبكات",
      instructor: "د. علي الشحي",
      author: "زينب المعمري",
      year: "2022",
      pages: 110,
    },
  ];

  // Effect to load summaries
  useEffect(() => {
    const loadSummaries = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setSummaries(mockSummaries);
        setIsLoading(false);
      }, 800);
    };

    loadSummaries();
  }, []);

  // Filter summaries based on search and filters
  const filteredSummaries = summaries.filter((summary) => {
    // Search filter
    const matchesSearch = search === "" || 
      summary.title.toLowerCase().includes(search.toLowerCase()) ||
      summary.subject.toLowerCase().includes(search.toLowerCase()) ||
      summary.instructor.toLowerCase().includes(search.toLowerCase());
    
    // Subject filter
    const matchesSubject = selectedSubject === "" || selectedSubject === "all" || 
      summary.subject === subjects.find(s => s.id === selectedSubject)?.name;
    
    return matchesSearch && matchesSubject;
  });

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 text-white py-16">
        {/* Animated Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-15">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        {/* Decorative Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-white/10 text-cyan-100 rounded-full text-sm font-semibold backdrop-blur-sm mb-6">ملخصات دراسية متميزة</span>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              ملخصات <span className="text-cyan-300 relative">
                شاملة ومتميزة
                <span className="absolute bottom-1 left-0 w-full h-2 bg-cyan-300/20 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-100">
              استكشف مجموعتنا الواسعة من الملخصات الدراسية عالية الجودة المعدة من قبل طلاب متفوقين.
              وفر وقتك واحصل على المعرفة التي تحتاجها بسرعة وسهولة.
            </p>
          </div>
        </div>
      </section>

      {/* Filters section */}
      <section className="py-10 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  ابحث عن ملخص
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="اسم الملخص، التخصص، المدرس..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Subject filter */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  التخصص
                </label>
                <select
                  id="subject"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 appearance-none bg-white transition-colors"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="mt-12">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : filteredSummaries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSummaries.map((summary) => (
                  <div key={summary.id} className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden border border-gray-100">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100 duration-300"></div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">{summary.title}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                        {summary.subject}
                      </span>
                      <span className="text-gray-600 text-sm">جامعة التقنية والعلوم التطبيقية</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm text-gray-600">المدرس: {summary.instructor}</span>
                      <span className="text-sm text-gray-600">{summary.year}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-6">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {summary.pages} صفحة
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {summary.author}
                      </span>
                    </div>
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('open-summary-details', { detail: summary }))}
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-3 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:-translate-y-1 duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 shadow-md">
                <svg className="mx-auto h-16 w-16 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="mt-4 text-xl font-bold text-gray-900">لا توجد ملخصات مطابقة للبحث</h2>
                <p className="mt-2 text-gray-600 max-w-md mx-auto">حاول تغيير معايير البحث أو تصفية النتائج.</p>
                <button 
                  className="mt-6 inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:-translate-y-1 duration-200"
                  onClick={() => {
                    setSearch("");
                    setSelectedSubject("");
                  }}
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-16">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">هل لديك ملخصات دراسية متميزة؟</h2>
              <p className="text-lg text-cyan-100 mb-8">
                شارك ملخصاتك الدراسية مع زملائك ومجتمع الطلاب وساهم في نشر المعرفة وتعزيز التعاون الأكاديمي
              </p>
              <Link href="/contribute" className="inline-flex items-center px-6 py-4 bg-white text-teal-800 hover:bg-gray-100 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <span>شارك ملخصاتك الآن</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Details Modal */}
      <SummaryDetailsModal />
    </main>
  );
};

// Summary Details Modal Component
const SummaryDetailsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState<Summary | null>(null);

  useEffect(() => {
    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSelectedSummary(customEvent.detail);
      setIsOpen(true);
    };

    window.addEventListener('open-summary-details', handleOpenModal);

    return () => {
      window.removeEventListener('open-summary-details', handleOpenModal);
    };
  }, []);

  const handleDownload = () => {
    // Mock download functionality
    alert(`تم بدء تنزيل الملخص: ${selectedSummary?.title}`);
    
    // In a real application, this would trigger the actual file download
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };

  if (!isOpen || !selectedSummary) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={() => setIsOpen(false)}></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 overflow-hidden">
          {/* Decorative top gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
          
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-900">{selectedSummary.title}</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center mb-6">
            <span className="bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full mr-3">
              {selectedSummary.subject}
            </span>
            <span className="text-gray-600 text-sm">جامعة التقنية والعلوم التطبيقية</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">المدرس</p>
                <p className="font-semibold">{selectedSummary.instructor}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">السنة الدراسية</p>
                <p className="font-semibold">{selectedSummary.year}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">معد الملخص</p>
                <p className="font-semibold">{selectedSummary.author}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">عدد الصفحات</p>
                <p className="font-semibold">{selectedSummary.pages} صفحة</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">وصف الملخص</h4>
            <p className="text-gray-600 mb-4">
              ملخص شامل لمادة {selectedSummary.title} يغطي جميع محاور المقرر بطريقة مبسطة ومنظمة. 
              يحتوي على الأمثلة التوضيحية والرسومات البيانية التي تساعد على فهم المفاهيم الأساسية.
              مناسب للطلاب الذين يرغبون في تحضير المادة بشكل سريع وفعال.
            </p>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-3">المحتويات الرئيسية</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
              <li>المفاهيم الأساسية والتعريفات</li>
              <li>النظريات والمعادلات الرئيسية</li>
              <li>تطبيقات عملية وأمثلة محلولة</li>
              <li>أسئلة وتمارين للمراجعة الذاتية</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-0 sm:space-x-reverse sm:gap-4">
            <button 
              onClick={handleDownload}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-3 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all transform sm:hover:-translate-y-1 duration-200 font-medium shadow-md hover:shadow-lg flex-1 flex justify-center items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              تنزيل الملخص
            </button>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all font-medium flex-1 flex justify-center items-center"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummariesPage; 