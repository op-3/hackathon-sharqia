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
  tableOfContents: string[];
  previewPages: string[];
};

const SummaryDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
    description: "ملخص شامل لمبادئ علم الاقتصاد يغطي النظريات الاقتصادية الأساسية، والعرض والطلب، والأسواق، والاقتصاد الكلي والجزئي. يتضمن الملخص شرحاً مبسطاً للمفاهيم المعقدة مع أمثلة توضيحية ورسوم بيانية لتسهيل الفهم. تم إعداد الملخص وفقاً للمنهج المعتمد في جامعة السلطان قابوس للعام الدراسي 2022-2023.",
    tableOfContents: [
      "مقدمة في علم الاقتصاد",
      "نظرية العرض والطلب",
      "مرونة العرض والطلب",
      "نظرية سلوك المستهلك",
      "نظرية الإنتاج والتكاليف",
      "هياكل السوق",
      "الدخل القومي والناتج المحلي الإجمالي",
      "البطالة والتضخم",
      "السياسات النقدية والمالية",
      "التجارة الدولية"
    ],
    previewPages: [
      "/summaries/preview/economics-1.jpg",
      "/summaries/preview/economics-2.jpg",
      "/summaries/preview/economics-3.jpg"
    ]
  };

  useEffect(() => {
    // Simulate fetching summary data
    const fetchSummary = () => {
      setTimeout(() => {
        setSummary(mockSummary);
        setSelectedImage(mockSummary.coverImage);
        setIsLoading(false);
      }, 1000);
    };

    fetchSummary();
  }, [params.id]);

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCheckoutModalOpen(false);
  };

  const handlePurchase = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckoutModalOpen(false);
      // Simulate download
      alert("تم شراء الملخص بنجاح! جاري تحويلك إلى صفحة التحميل...");
      router.push(`/summaries/${params.id}/download`);
    }, 2000);
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
          <li className="text-blue-500">{summary.title}</li>
        </ol>
      </nav>

      {/* Summary details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Left column - Images */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <div className="relative h-80 w-full">
              <Image
                src={selectedImage}
                alt={summary.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          {/* Thumbnail previews */}
          <div className="grid grid-cols-4 gap-2">
            <div 
              className={`relative h-20 cursor-pointer border-2 rounded overflow-hidden ${selectedImage === summary.coverImage ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => setSelectedImage(summary.coverImage)}
            >
              <Image
                src={summary.coverImage}
                alt="Cover"
                fill
                className="object-cover"
              />
            </div>
            
            {summary.previewPages.map((page, index) => (
              <div 
                key={index}
                className={`relative h-20 cursor-pointer border-2 rounded overflow-hidden ${selectedImage === page ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setSelectedImage(page)}
              >
                <Image
                  src={page}
                  alt={`Preview page ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Middle column - Details */}
        <div className="md:col-span-1">
          <h1 className="text-2xl font-bold mb-4">{summary.title}</h1>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">المادة:</span>
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                {summary.subject}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">الجامعة:</span>
              <span>{summary.university}</span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">أستاذ المادة:</span>
              <span>{summary.instructor}</span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">معد الملخص:</span>
              <span>{summary.author}</span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">السنة الدراسية:</span>
              <span>{summary.year}</span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">عدد الصفحات:</span>
              <span>{summary.pages} صفحة</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">وصف الملخص</h2>
            <p className="text-gray-700">{summary.description}</p>
          </div>
        </div>

        {/* Right column - Checkout */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {/* Placeholder for price */}
              </div>
              <p className="text-sm text-gray-500">ضريبة القيمة المضافة مشمولة</p>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-4 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              شراء الآن
            </button>
            
            <div className="flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm text-gray-600">دفع آمن عبر بوابات دفع موثوقة</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-lg mb-3">ما الذي ستحصل عليه:</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ملف PDF عالي الجودة
                </li>
                <li className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  وصول فوري بعد الدفع
                </li>
                <li className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  تحميل غير محدود لمدة سنة
                </li>
                <li className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ضمان استرداد المال لمدة 7 أيام
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Table of contents */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-xl font-semibold mb-4">محتويات الملخص</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {summary.tableOfContents.map((item, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 ml-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Related summaries (placeholder) */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">ملخصات ذات صلة</h2>
        <p className="text-gray-600 mb-4">استكشف المزيد من الملخصات في نفس التخصص.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4">
                <h3 className="font-semibold mb-2">ملخص آخر متعلق بالموضوع #{num}</h3>
                <p className="text-gray-600 text-sm mb-3">جامعة السلطان قابوس</p>
                <Link
                  href={`/summaries/related-${num}`}
                  className="block text-center w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  عرض الملخص
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
            
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full z-10 relative">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">تحميل الملخص</h3>
                  <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{summary.title}</h4>
                      <p className="text-sm text-gray-600">{summary.subject}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-b py-3 mb-4">
                    <div className="flex justify-between">
                      <span>المبلغ:</span>
                      <span className="font-semibold">مجاناً</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <button
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className={`w-full py-2 px-4 rounded ${
                      isProcessing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    } text-white font-medium transition-colors flex items-center justify-center`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جارٍ المعالجة...
                      </>
                    ) : (
                      "تحميل الآن"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryDetailPage; 