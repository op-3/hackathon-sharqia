"use client";

import { useState } from "react";

type Course = {
  id: string;
  title: string;
  instructor: string;
  description: string;
  category: string;
  level: "مبتدئ" | "متوسط" | "متقدم";
  duration: string;
  startDate: string;
  price: number;
  isFeatured: boolean;
};

const categories = [
  { id: "all", name: "الكل" },
  { id: "software-engineering", name: "هندسة البرمجيات" },
  { id: "cybersecurity", name: "الأمن السيبراني" },
  { id: "artificial-intelligence", name: "الذكاء الاصطناعي" },
  { id: "networking", name: "الشبكات" },
];

// Sample courses data
const coursesData: Course[] = [
  {
    id: "1",
    title: "مقدمة في هندسة البرمجيات",
    instructor: "د. أحمد الهاشمي",
    description: "دورة شاملة في أساسيات هندسة البرمجيات ومنهجيات تطوير البرمجيات الحديثة. ستتعلم في هذه الدورة المفاهيم الأساسية في هندسة البرمجيات، وكيفية بناء البرمجيات بطريقة منهجية ومنظمة. تشمل الدورة تغطية دورة حياة تطوير البرمجيات، وأنماط التصميم الشائعة، وأفضل الممارسات في كتابة الشيفرة البرمجية.",
    category: "software-engineering",
    level: "مبتدئ",
    duration: "8 أسابيع",
    startDate: "2023-11-15",
    price: 75,
    isFeatured: true,
  },
  {
    id: "2",
    title: "تطوير تطبيقات الويب المتقدمة",
    instructor: "م. سارة العلوي",
    description: "تعلم تطوير تطبيقات الويب باستخدام أحدث التقنيات مثل React و Node.js. ستتمكن من بناء تطبيقات ويب متكاملة من الواجهة الأمامية إلى الخلفية، مع التركيز على أفضل الممارسات في التطوير والأداء وأمان التطبيقات.",
    category: "software-engineering",
    level: "متوسط",
    duration: "10 أسابيع",
    startDate: "2023-12-01",
    price: 95,
    isFeatured: false,
  },
  {
    id: "3",
    title: "أساسيات الأمن السيبراني",
    instructor: "د. محمد الرئيسي",
    description: "مقدمة في أمن المعلومات والتهديدات السيبرانية وكيفية حماية البيانات والأنظمة. تغطي هذه الدورة المبادئ الأساسية للأمن السيبراني، وأنواع الهجمات الإلكترونية الشائعة، وطرق الحماية منها، بالإضافة إلى أساسيات التشفير وإدارة المخاطر.",
    category: "cybersecurity",
    level: "مبتدئ",
    duration: "6 أسابيع",
    startDate: "2023-11-20",
    price: 85,
    isFeatured: true,
  },
  {
    id: "4",
    title: "اختبار الاختراق الأخلاقي",
    instructor: "م. خالد البلوشي",
    description: "تعلم تقنيات اختبار الاختراق الأخلاقي وتقييم الثغرات الأمنية في الأنظمة والشبكات. ستكتسب مهارات عملية في استخدام أدوات اختبار الاختراق، وتحديد نقاط الضعف في الأنظمة، وكتابة تقارير الاختبار، والتوصية بإجراءات تحسين الأمان.",
    category: "cybersecurity",
    level: "متقدم",
    duration: "12 أسبوع",
    startDate: "2024-01-10",
    price: 120,
    isFeatured: false,
  },
  {
    id: "5",
    title: "مدخل إلى الذكاء الاصطناعي",
    instructor: "د. فاطمة الزدجالي",
    description: "تعرف على أساسيات الذكاء الاصطناعي وتطبيقاته في مختلف المجالات. تشمل الدورة مقدمة في تعلم الآلة، والشبكات العصبية، ومعالجة اللغة الطبيعية، مع التطبيق العملي على مشاريع حقيقية باستخدام Python وأطر عمل الذكاء الاصطناعي الشائعة.",
    category: "artificial-intelligence",
    level: "مبتدئ",
    duration: "8 أسابيع",
    startDate: "2023-12-05",
    price: 90,
    isFeatured: true,
  },
  {
    id: "6",
    title: "التعلم العميق وتطبيقات الرؤية الحاسوبية",
    instructor: "د. يوسف الكندي",
    description: "دورة متقدمة في تقنيات التعلم العميق واستخداماتها في تطبيقات الرؤية الحاسوبية. ستتعلم كيفية بناء وتدريب نماذج الشبكات العصبية العميقة، وتطبيقها في مجال الرؤية الحاسوبية لحل مشاكل معقدة مثل التعرف على الصور والأشياء وتتبع الحركة.",
    category: "artificial-intelligence",
    level: "متقدم",
    duration: "14 أسبوع",
    startDate: "2024-02-01",
    price: 150,
    isFeatured: false,
  },
  {
    id: "7",
    title: "أساسيات الشبكات",
    instructor: "م. ناصر المعمري",
    description: "مقدمة في أساسيات شبكات الحاسوب وبروتوكولات الاتصال والإنترنت. ستتعرف على مكونات الشبكات، ونماذج OSI وTCP/IP، وتكوين الشبكات المحلية، وأساسيات التوجيه والتبديل، وحلول مشاكل الشبكات الشائعة.",
    category: "networking",
    level: "مبتدئ",
    duration: "6 أسابيع",
    startDate: "2023-11-25",
    price: 70,
    isFeatured: true,
  },
  {
    id: "8",
    title: "تصميم وإدارة الشبكات المؤسسية",
    instructor: "د. علي الشحي",
    description: "تعلم كيفية تصميم وإدارة شبكات المؤسسات الكبيرة وضمان أمنها واستقرارها. ستكتسب مهارات متقدمة في تصميم بنية الشبكات، وإدارة البنية التحتية، وتنفيذ سياسات الأمان، ومراقبة أداء الشبكة وتحسينه، وإدارة خدمات الشبكة المختلفة.",
    category: "networking",
    level: "متوسط",
    duration: "10 أسابيع",
    startDate: "2024-01-15",
    price: 110,
    isFeatured: false,
  },
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ar-OM', options);
};

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    // Reset notification state for new course selection
    setNotificationEnabled(false);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };
  
  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
    
    if (!notificationEnabled && selectedCourse) {
      // Simulate saving the notification (in a real app, this would interact with a backend)
      alert(`تم تفعيل الإشعارات لدورة "${selectedCourse.title}"\nسيتم إشعارك قبل موعد بدء الدورة!`);
    }
  };
  
  const filteredCourses = coursesData.filter((course) => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Featured courses
  const featuredCourses = coursesData.filter((course) => course.isFeatured);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section - Similar to Forum Page */}
      <div className="relative mb-12 overflow-hidden bg-gradient-to-br from-teal-600 to-teal-800 shadow-xl">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-20"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center md:text-right md:flex md:items-center md:justify-between">
            <div className="md:w-3/5">
              <span className="inline-block px-3 py-1 bg-white/10 text-cyan-100 rounded-full text-sm font-semibold backdrop-blur-sm mb-4">تعلّم وتطوّر مهاراتك</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                دورات تدريبية <span className="text-cyan-300 relative">
                  متخصصة
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-cyan-300/20 rounded-full"></span>
                </span>
              </h1>
              <p className="text-lg text-teal-100 max-w-2xl md:mr-0 mx-auto leading-relaxed">
                دورات أكاديمية ومهنية عالية الجودة تساعدك على التفوق في دراستك وتطوير مهاراتك بإشراف نخبة من المدربين المتخصصين
              </p>
            </div>
            
            <div className="hidden md:block md:w-2/5 mt-10 md:mt-0">
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-400 opacity-75 blur-xl"></div>
                <div className="relative overflow-hidden rounded-2xl bg-white/10 p-1.5 backdrop-blur-sm">
                  <img 
                    src="/images/courses-illustration.svg" 
                    alt="دورات أكاديمي بلس" 
                    className="w-full h-auto rounded-xl shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Featured Courses */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              الدورات المميزة
            </h2>
            <div className="text-sm bg-teal-100 text-teal-800 px-3 py-1 rounded-lg">
              {featuredCourses.length} دورات
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all block cursor-pointer border border-gray-100 group"
                onClick={() => handleCourseClick(course)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        مميز
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {course.instructor}
                      </p>
                      <p className="text-sm text-gray-600 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        جامعة التقنية والعلوم التطبيقية
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm mb-5">
                    <span className={`bg-teal-100 text-teal-800 px-2.5 py-1 rounded-lg mr-2 flex items-center text-xs ${
                      course.level === 'مبتدئ' ? 'bg-green-100 text-green-800' :
                      course.level === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {course.level}
                    </span>
                    <span className="text-gray-500 mr-2 flex items-center text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </span>
                    <span className="text-gray-700 flex items-center text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      تبدأ: {formatDate(course.startDate)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-blue-600 text-lg">
                      {course.price} ر.ع
                    </div>
                    <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center group-hover:shadow-md">
                      عرض التفاصيل
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Search and Filters - Updated to match forum design */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="md:flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="ابحث عن دورة..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex overflow-x-auto md:overflow-visible gap-2 pb-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                    selectedCategory === category.id 
                      ? "bg-teal-600 text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-1">8</div>
            <div className="text-lg text-blue-700 font-medium">دورات متاحة</div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-teal-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <div className="bg-teal-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-teal-600 mb-1">12</div>
            <div className="text-lg text-teal-700 font-medium">مدربين متخصصين</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <div className="bg-purple-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-1">20</div>
            <div className="text-lg text-purple-700 font-medium">شهادات معتمدة</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <div className="bg-yellow-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="text-4xl font-bold text-yellow-600 mb-1">4.8</div>
            <div className="text-lg text-yellow-700 font-medium">تقييم الدورات</div>
          </div>
        </div>

        {/* Courses Grid - Updated */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10 border border-gray-100">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-5 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {selectedCategory === "all" ? "جميع الدورات" : `دورات ${categories.find(c => c.id === selectedCategory)?.name}`}
            </h2>
            <div className="text-sm bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
              {filteredCourses.length} دورة
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all block cursor-pointer border border-gray-100 group"
                  onClick={() => handleCourseClick(course)}
                >
                  <div className="p-6">
                    <div className="mb-3 relative">
                      <div className="absolute -top-1 -right-1 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100 duration-300"></div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                        {course.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-col space-y-2 mb-4">
                      <p className="text-sm text-gray-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {course.instructor}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-xs px-2 py-1 rounded-lg inline-flex items-center ${
                          course.level === 'مبتدئ' ? 'bg-green-100 text-green-800' :
                          course.level === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {course.level}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-lg inline-flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {course.duration}
                        </span>
                        <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-lg inline-flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(course.startDate)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <div className="font-semibold text-blue-600">
                        {course.price} ر.ع
                      </div>
                      <button className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-teal-700 transition-colors flex items-center group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                        عرض التفاصيل
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">لا توجد دورات مطابقة لبحثك</p>
              <button 
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }} 
                className="mt-4 bg-teal-100 text-teal-800 px-4 py-2 rounded-lg hover:bg-teal-200 transition-colors"
              >
                إعادة ضبط البحث
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination - Updated */}
        {filteredCourses.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="flex-1 flex justify-between">
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                السابق
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                التالي
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Course Details Modal - Updated */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true" onClick={handleCloseModal}></div>
            
            <div className="relative bg-white rounded-2xl text-right overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
              
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-6 text-white">
                <div className="flex justify-between items-start">
                  <button
                    onClick={handleCloseModal}
                    className="bg-white/10 backdrop-blur-sm rounded-full p-1 text-teal-100 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <span className="sr-only">إغلاق</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedCourse.level === 'مبتدئ' ? 'bg-green-100 text-green-800' :
                      selectedCourse.level === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    } mb-2`}>
                      {selectedCourse.level}
                    </span>
                    <h3 className="text-xl leading-6 font-bold" id="modal-title">
                      {selectedCourse.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="text-sm font-medium text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      التخصص:
                    </div>
                    <div className="text-sm text-gray-900">{categories.find(c => c.id === selectedCourse.category)?.name}</div>
                    
                    <div className="text-sm font-medium text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      المدرس:
                    </div>
                    <div className="text-sm text-gray-900">{selectedCourse.instructor}</div>
                    
                    <div className="text-sm font-medium text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      الجامعة:
                    </div>
                    <div className="text-sm text-gray-900">جامعة التقنية والعلوم التطبيقية</div>
                    
                    <div className="text-sm font-medium text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      المستوى:
                    </div>
                    <div className="text-sm text-gray-900">{selectedCourse.level}</div>

                    <div className="text-sm font-medium text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      المدة:
                    </div>
                    <div className="text-sm text-gray-900">{selectedCourse.duration}</div>
                    
                    <div className="text-sm font-medium text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      تاريخ البدء:
                    </div>
                    <div className="text-sm text-gray-900">{formatDate(selectedCourse.startDate)}</div>
                    
                    <div className="text-sm font-medium text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      السعر:
                    </div>
                    <div className="text-sm font-bold text-blue-600">{selectedCourse.price} ر.ع</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    وصف الدورة
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    ماذا ستتعلم
                  </h4>
                  <ul className="list-none space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 flex-shrink-0 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>أساسيات {selectedCourse.category.includes('software') ? 'البرمجة وهندسة البرمجيات' : selectedCourse.category.includes('cyber') ? 'الأمن السيبراني والحماية من الاختراق' : selectedCourse.category.includes('artificial') ? 'الذكاء الاصطناعي وتعلم الآلة' : 'الشبكات وتصميم البنية التحتية'}</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 flex-shrink-0 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>التطبيقات العملية والمشاريع الواقعية</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 flex-shrink-0 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>أفضل الممارسات والتقنيات الحديثة في مجال {selectedCourse.category.includes('software') ? 'تطوير البرمجيات' : selectedCourse.category.includes('cyber') ? 'الأمن السيبراني' : selectedCourse.category.includes('artificial') ? 'الذكاء الاصطناعي' : 'الشبكات'}</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 flex-shrink-0 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>حل المشكلات والتحديات الواقعية ومهارات التفكير النقدي</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-xl mb-6 border border-yellow-100">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notification"
                      checked={notificationEnabled}
                      onChange={toggleNotification}
                      className="h-4 w-4 ml-2 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label htmlFor="notification" className="text-sm text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      تفعيل إشعارات تذكير قبل موعد بدء الدورة
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    إغلاق
                  </button>
                  <button
                    className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-colors shadow-md"
                  >
                    التسجيل في الدورة
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

export default CoursesPage; 