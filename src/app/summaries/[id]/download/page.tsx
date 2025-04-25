"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Types
type Summary = {
  id: string;
  title: string;
  subject: string;
  university: string;
  instructor: string;
  author: string;
  year: string;
  pages: number;
  coverImage: string;
  description: string;
};

const DownloadPage = () => {
  const params = useParams();
  const router = useRouter();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadStatus, setDownloadStatus] = useState<'pending' | 'downloading' | 'completed' | 'error'>('pending');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloadReady, setIsDownloadReady] = useState(false);

  // Mock summary data
  const mockSummary: Summary = {
    id: "sum-1",
    title: "ملخص مبادئ علم الاقتصاد",
    subject: "إدارة الأعمال",
    university: "جامعة السلطان قابوس",
    instructor: "د. محمد العامري",
    author: "فاطمة البلوشي",
    year: "2023",
    pages: 45,
    coverImage: "/summaries/economics.jpg",
    description: "ملخص شامل لمبادئ علم الاقتصاد يغطي النظريات الاقتصادية الأساسية، والعرض والطلب، والأسواق، والاقتصاد الكلي والجزئي."
  };

  useEffect(() => {
    // Simulate fetching summary data
    const fetchSummary = () => {
      setTimeout(() => {
        setSummary(mockSummary);
        setIsLoading(false);
        setIsDownloadReady(true);
      }, 1500);
    };

    fetchSummary();
  }, [params.id]);

  const handleDownload = () => {
    setDownloadStatus('downloading');
    
    // Simulate progress increments
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          setDownloadStatus('completed');
          
          // Create a dummy PDF file for download
          const blob = new Blob([''], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${summary?.title || 'summary'}.pdf`;
          link.click();
          window.URL.revokeObjectURL(link.href);
        }, 500);
      }
      setDownloadProgress(progress);
    }, 300);
  };

  const handleBackToSummaries = () => {
    router.push('/summaries');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // If summary not found
  if (!summary) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center py-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold mb-2">لم يتم العثور على الملخص!</h3>
          <p className="text-gray-600 mb-8">
            الملخص الذي تبحث عنه غير موجود أو تمت إزالته.
          </p>
          <Link
            href="/summaries"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            العودة إلى الملخصات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8">
        <ol className="flex items-center text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-500">
              الرئيسية
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li>
            <Link href="/summaries" className="hover:text-blue-500">
              الملخصات
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li>
            <Link href={`/summaries/${params.id}`} className="hover:text-blue-500">
              {summary.title}
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-blue-500">تحميل</li>
        </ol>
      </nav>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          {/* Success message */}
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">تمت عملية الشراء بنجاح!</h2>
            <p className="text-gray-600 mb-2">شكراً لك على الشراء. يمكنك الآن تحميل الملخص.</p>
            <p className="text-gray-500 text-sm mb-1">تم إرسال رابط التحميل إلى بريدك الإلكتروني</p>
            <p className="text-gray-500 text-sm">يمكنك أيضاً العودة إلى هذه الصفحة في أي وقت للتحميل مرة أخرى</p>
          </div>

          {/* Summary info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-start">
              <div className="relative h-20 w-16 flex-shrink-0">
                <Image
                  src={summary.coverImage}
                  alt={summary.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="mr-4 flex-grow">
                <h3 className="font-semibold text-lg mb-1">{summary.title}</h3>
                <p className="text-gray-600 text-sm mb-1">{summary.subject} - {summary.university}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {summary.pages} صفحة
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Download section */}
          <div className="border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">تحميل الملخص</h3>

            {downloadStatus === 'pending' && (
              <button
                onClick={handleDownload}
                disabled={!isDownloadReady}
                className={`w-full py-3 rounded-md flex items-center justify-center ${
                  isDownloadReady 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4-4 4m0 0-4-4m4 4V4" />
                </svg>
                {isDownloadReady ? 'تحميل الملف' : 'جاري تجهيز الملف...'}
              </button>
            )}

            {downloadStatus === 'downloading' && (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">جاري التحميل...</span>
                  <span className="text-sm font-semibold">{downloadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center">الرجاء عدم إغلاق هذه الصفحة حتى اكتمال التحميل</p>
              </div>
            )}

            {downloadStatus === 'completed' && (
              <div className="text-center">
                <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-green-600 mb-2">تم التحميل بنجاح!</h4>
                <p className="text-gray-600 text-sm mb-4">إذا لم يبدأ التحميل تلقائياً، يمكنك النقر على الزر أدناه</p>
                <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                  <button
                    onClick={handleDownload}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    تحميل مرة أخرى
                  </button>
                  <button
                    onClick={handleBackToSummaries}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    العودة للملخصات
                  </button>
                </div>
              </div>
            )}

            {downloadStatus === 'error' && (
              <div className="text-center">
                <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-red-600 mb-2">حدث خطأ أثناء التحميل</h4>
                <p className="text-gray-600 text-sm mb-4">يرجى المحاولة مرة أخرى. إذا استمرت المشكلة، يرجى التواصل مع الدعم الفني.</p>
                <button
                  onClick={handleDownload}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  إعادة المحاولة
                </button>
              </div>
            )}
          </div>

          {/* Help section */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              هل تواجه مشكلة؟
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 ml-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>إذا لم يبدأ التحميل تلقائياً، حاول النقر على زر التحميل مرة أخرى.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 ml-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>تأكد من أن متصفحك يسمح بتنزيل الملفات من موقعنا.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 ml-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>يمكنك أيضاً تحميل الملخص من خلال الرابط المرسل إلى بريدك الإلكتروني.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 ml-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>للمساعدة، يمكنك التواصل معنا عبر البريد الإلكتروني: support@academyplus.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* More actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">استعراض المشتريات</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">يمكنك استعراض جميع مشترياتك السابقة وتحميلها مرة أخرى في أي وقت.</p>
          <Link href="/profile/purchases" className="text-blue-500 font-semibold hover:text-blue-700 transition-colors flex items-center">
            الذهاب إلى المشتريات
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">تقييم الملخص</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">ساعد الطلاب الآخرين من خلال مشاركة تجربتك مع هذا الملخص وتقييمه.</p>
          <Link href={`/summaries/${params.id}/review`} className="text-green-500 font-semibold hover:text-green-700 transition-colors flex items-center">
            كتابة تقييم
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg">تصفح المزيد</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">استكشف المزيد من الملخصات المتعلقة بنفس المادة أو التخصص.</p>
          <Link href="/summaries" className="text-purple-500 font-semibold hover:text-purple-700 transition-colors flex items-center">
            تصفح الملخصات
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6">الأسئلة الشائعة</h3>
        
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-semibold mb-2">كم مرة يمكنني تحميل الملخص؟</h4>
            <p className="text-gray-600">يمكنك تحميل الملخص الذي اشتريته بشكل غير محدود خلال فترة اشتراكك، والتي تستمر لمدة سنة كاملة من تاريخ الشراء.</p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-semibold mb-2">هل يمكنني مشاركة الملخص مع أصدقائي؟</h4>
            <p className="text-gray-600">الملخصات مخصصة للاستخدام الشخصي فقط، ولا يجوز إعادة توزيعها أو مشاركتها. يرجى احترام حقوق الملكية الفكرية للمؤلفين.</p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-semibold mb-2">ماذا لو كان الملخص لا يلبي توقعاتي؟</h4>
            <p className="text-gray-600">نحن نقدم ضمان استرداد المال لمدة 7 أيام. إذا لم يكن الملخص مفيداً كما توقعت، يمكنك التواصل معنا لاسترداد أموالك.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">هل يمكنني الوصول إلى الملخص على أجهزة متعددة؟</h4>
            <p className="text-gray-600">نعم، يمكنك تسجيل الدخول إلى حسابك والوصول إلى مشترياتك من أي جهاز. الملفات متوافقة مع جميع الأجهزة التي تدعم تنسيق PDF.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage; 