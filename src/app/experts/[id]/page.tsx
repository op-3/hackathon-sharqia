"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type Expert = {
  id: number;
  name: string;
  title: string;
  specialization: string;
  university: string;
  experience: number;
  rating: number;
  consultationsCount: number;
  availability: string[];
  price: number;
  image: string;
  bio: string;
  education: string[];
  expertise: string[];
  languages: string[];
  reviews: Review[];
};

type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
};

type TimeSlot = {
  id: number;
  day: string;
  time: string;
  available: boolean;
};

const ExpertProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const expertId = Number(params.id);
  
  const [expert, setExpert] = useState<Expert | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'about' | 'reviews' | 'book'>('about');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);
  
  // Mock experts data
  const experts: Expert[] = [
    {
      id: 1,
      name: "د. أحمد الريامي",
      title: "أستاذ مشارك",
      specialization: "الهندسة",
      university: "جامعة السلطان قابوس",
      experience: 15,
      rating: 4.9,
      consultationsCount: 243,
      availability: ["الاثنين", "الأربعاء", "السبت"],
      price: 20,
      image: "/images/expert-1.jpg",
      bio: "دكتور أحمد الريامي حاصل على درجة الدكتوراه في الهندسة المدنية من جامعة بريستول في المملكة المتحدة. يمتلك خبرة تدريسية وبحثية تمتد لأكثر من 15 عاماً في مجال هندسة الإنشاءات والمواد المتقدمة. قام بنشر أكثر من 30 بحثاً علمياً في مجلات عالمية محكمة.",
      education: [
        "دكتوراه في الهندسة المدنية - جامعة بريستول، المملكة المتحدة",
        "ماجستير في هندسة الإنشاءات - جامعة السلطان قابوس، عمان",
        "بكالوريوس في الهندسة المدنية - جامعة السلطان قابوس، عمان"
      ],
      expertise: [
        "تصميم المنشآت المقاومة للزلازل",
        "المواد الهندسية المتقدمة",
        "إدارة المشاريع الهندسية",
        "تقييم المنشآت القائمة وإعادة تأهيلها"
      ],
      languages: ["العربية", "الإنجليزية"],
      reviews: [
        {
          id: 1,
          name: "محمد الحارثي",
          rating: 5,
          date: "قبل 3 أسابيع",
          comment: "استفدت كثيراً من استشارة الدكتور أحمد في مشروع التخرج الخاص بي. شرح لي النقاط الأساسية بطريقة مبسطة وساعدني في تجاوز التحديات التي واجهتني."
        },
        {
          id: 2,
          name: "سارة البلوشي",
          rating: 4.5,
          date: "قبل شهرين",
          comment: "الدكتور أحمد خبير ممتاز في مجاله، ساعدني كثيراً في فهم المفاهيم المعقدة في تصميم المنشآت. أنصح بشدة بالتواصل معه للاستشارات الهندسية."
        }
      ]
    },
    {
      id: 2,
      name: "د. فاطمة البلوشي",
      title: "أستاذ",
      specialization: "الطب والصحة",
      university: "كلية عمان الطبية",
      experience: 18,
      rating: 4.8,
      consultationsCount: 187,
      availability: ["الثلاثاء", "الخميس", "الأحد"],
      price: 25,
      image: "/images/expert-2.jpg",
      bio: "الدكتورة فاطمة البلوشي أستاذة في كلية عمان الطبية متخصصة في طب الأسرة والصحة العامة. حاصلة على شهادة البورد الأمريكي في طب الأسرة، مع خبرة تزيد عن 18 عاماً في المجال الطبي والأكاديمي. تهتم بالأبحاث المتعلقة بالصحة المجتمعية والوقاية من الأمراض المزمنة.",
      education: [
        "دكتوراه في الطب - جامعة إدنبرة، المملكة المتحدة",
        "البورد الأمريكي في طب الأسرة",
        "بكالوريوس الطب والجراحة - جامعة الخليج العربي، البحرين"
      ],
      expertise: [
        "طب الأسرة والصحة العامة",
        "الوقاية من الأمراض المزمنة",
        "الصحة المجتمعية",
        "التغذية العلاجية"
      ],
      languages: ["العربية", "الإنجليزية", "الفرنسية"],
      reviews: [
        {
          id: 1,
          name: "خالد العامري",
          rating: 5,
          date: "قبل أسبوع",
          comment: "الدكتورة فاطمة من أفضل الأطباء الذين استشرتهم. تستمع جيداً للمشكلة وتقدم نصائح طبية قيمة. أوصي بها بشدة لأي استشارة طبية."
        },
        {
          id: 2,
          name: "نورة الهنائي",
          rating: 4.5,
          date: "قبل شهر",
          comment: "استفدت كثيراً من استشارة الدكتورة فاطمة حول موضوع بحثي في مجال الصحة العامة. خبرتها الواسعة ساعدتني على تحسين منهجية البحث بشكل كبير."
        }
      ]
    }
  ];
  
  // Mock time slots
  const generateTimeSlots = (): TimeSlot[] => {
    const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "السبت", "الأحد"];
    const times = ["9:00 ص", "10:00 ص", "11:00 ص", "12:00 م", "1:00 م", "2:00 م", "3:00 م", "4:00 م", "5:00 م"];
    
    const slots: TimeSlot[] = [];
    let id = 1;
    
    days.forEach(day => {
      times.forEach(time => {
        // Random availability, but ensure some slots are available
        const available = Math.random() > 0.3;
        slots.push({ id: id++, day, time, available });
      });
    });
    
    return slots;
  };
  
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  
  // Simulate fetching data
  useEffect(() => {
    const foundExpert = experts.find(e => e.id === expertId);
    const slots = generateTimeSlots();
    
    setTimeout(() => {
      setExpert(foundExpert || null);
      setTimeSlots(slots);
      setIsLoading(false);
    }, 1000);
  }, [expertId]);
  
  // Filter time slots by selected date
  const filteredTimeSlots = timeSlots.filter(slot => 
    selectedDate ? slot.day === selectedDate : true
  );
  
  // Handle booking consultation
  const handleBookConsultation = () => {
    if (!selectedTimeSlot) {
      alert("الرجاء اختيار موعد للاستشارة");
      return;
    }
    
    // In a real app, this would call an API to book the consultation
    router.push(`/experts/${expertId}/chat`);
  };
  
  // Navigate to chat
  const handleStartChat = () => {
    router.push(`/experts/${expertId}/chat`);
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
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Expert Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 relative h-80 md:h-auto">
              <Image 
                src={expert.image}
                alt={expert.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{expert.name}</h1>
                  <p className="text-gray-600 mb-1">{expert.title}</p>
                  <p className="text-gray-600 mb-3">{expert.university}</p>
                  
                  <div className="flex items-center mb-4">
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium mr-2">
                      {expert.specialization}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {expert.experience} سنة خبرة
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{expert.price} ر.ع</p>
                  <p className="text-sm text-gray-500">للساعة</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <svg 
                  className="h-5 w-5 text-yellow-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="mr-1 text-lg font-medium text-gray-900">{expert.rating}</span>
                <span className="mr-2 text-gray-600">({expert.consultationsCount} استشارة)</span>
              </div>
              
              <div className="flex mb-4">
                <p className="text-gray-700 mb-2 ml-4">
                  <span className="font-medium">متاح: </span>
                  {expert.availability.join('، ')}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">اللغات: </span>
                  {expert.languages.join('، ')}
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => setSelectedTab('book')}
                  className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-all ml-4"
                >
                  حجز استشارة
                </button>
                <button 
                  onClick={handleStartChat}
                  className="border border-teal-600 text-teal-600 px-6 py-2 rounded-md hover:bg-teal-50 transition-all"
                >
                  دردشة مباشرة
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex" aria-label="Tabs">
              <button
                onClick={() => setSelectedTab('about')}
                className={`px-6 py-4 text-sm font-medium ${
                  selectedTab === 'about'
                    ? 'text-teal-600 border-b-2 border-teal-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                نبذة عن الخبير
              </button>
              <button
                onClick={() => setSelectedTab('reviews')}
                className={`px-6 py-4 text-sm font-medium ${
                  selectedTab === 'reviews'
                    ? 'text-teal-600 border-b-2 border-teal-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                التقييمات ({expert.reviews.length})
              </button>
              <button
                onClick={() => setSelectedTab('book')}
                className={`px-6 py-4 text-sm font-medium ${
                  selectedTab === 'book'
                    ? 'text-teal-600 border-b-2 border-teal-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                حجز موعد
              </button>
            </nav>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* About Tab */}
          {selectedTab === 'about' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">نبذة تعريفية</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{expert.bio}</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">المؤهلات العلمية</h3>
              <ul className="list-disc list-inside mb-6 space-y-1 text-gray-700">
                {expert.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">مجالات الخبرة</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {expert.expertise.map((item, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Reviews Tab */}
          {selectedTab === 'reviews' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">تقييمات سابقة</h2>
              
              {expert.reviews.length > 0 ? (
                <div className="space-y-6">
                  {expert.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="mr-2 text-gray-700">{review.rating.toFixed(1)}</span>
                      </div>
                      
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">لا توجد تقييمات حتى الآن</p>
              )}
            </div>
          )}
          
          {/* Book Tab */}
          {selectedTab === 'book' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">حجز موعد استشارة</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">اختر اليوم</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {[...new Set(timeSlots.map(slot => slot.day))].map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`px-4 py-2 rounded-md text-sm ${
                        selectedDate === day
                          ? 'bg-teal-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {selectedDate ? `المواعيد المتاحة - ${selectedDate}` : 'اختر يوماً لعرض المواعيد المتاحة'}
                </h3>
                
                {selectedDate && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {filteredTimeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedTimeSlot(slot.id)}
                        disabled={!slot.available}
                        className={`px-4 py-2 rounded-md text-sm ${
                          selectedTimeSlot === slot.id
                            ? 'bg-teal-600 text-white'
                            : slot.available
                              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">رسوم الاستشارة</span>
                  <span className="font-semibold text-gray-900">{expert.price} ر.ع</span>
                </div>
                
                <button
                  onClick={handleBookConsultation}
                  className="w-full bg-teal-600 text-white py-3 rounded-md font-medium hover:bg-teal-700 transition-all"
                >
                  تأكيد الحجز
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertProfilePage; 