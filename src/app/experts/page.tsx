"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Types
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

// Star Rating Component
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-500" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="mr-1 text-gray-600 text-sm">{rating} / 5</span>
    </div>
  );
};

export default function ExpertsPage() {
  const router = useRouter();
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    Specialization | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for experts
  const experts: Expert[] = [
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

  // Filter experts by specialization and search query
  const filteredExperts = experts.filter((expert) => {
    const specializationMatch =
      selectedSpecialization === "all" ||
      expert.specialization === selectedSpecialization;

    const searchMatch =
      searchQuery === "" ||
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getSpecializationName(expert.specialization)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return specializationMatch && searchMatch;
  });

  const handleExpertClick = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsModalOpen(true);
  };

  const handleStartChat = (expertId: string) => {
    setIsModalOpen(false);
    // Navigate to the chat page with the selected expert
    router.push(`/experts/chat/${expertId}`);
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
            <span className="inline-block px-3 py-1 bg-white/10 text-cyan-100 rounded-full text-sm font-semibold backdrop-blur-sm mb-3">نخبة من الخبراء</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              استشارات <span className="text-cyan-300 relative">
                الخبراء
                <span className="absolute bottom-1 left-0 w-full h-2 bg-cyan-300/20 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-100 leading-relaxed">
              تواصل مع نخبة من الخبراء المتخصصين في مجالات تقنية المعلومات المختلفة للحصول على استشارات مهنية وأكاديمية عالية الجودة
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400"></div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="block w-full p-3 pr-10 text-right text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:ring-teal-500 focus:border-teal-500"
                placeholder="ابحث عن خبير..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Specialization Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSpecialization === "all"
                    ? "bg-teal-100 text-teal-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedSpecialization("all")}
              >
                جميع التخصصات
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSpecialization === "software"
                    ? "bg-teal-100 text-teal-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedSpecialization("software")}
              >
                هندسة البرمجيات
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSpecialization === "security"
                    ? "bg-teal-100 text-teal-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedSpecialization("security")}
              >
                الأمن السيبراني
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSpecialization === "network"
                    ? "bg-teal-100 text-teal-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedSpecialization("network")}
              >
                الشبكات
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSpecialization === "ai"
                    ? "bg-teal-100 text-teal-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedSpecialization("ai")}
              >
                الذكاء الاصطناعي
              </button>
            </div>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <div
              key={expert.id}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group relative"
              onClick={() => handleExpertClick(expert)}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100 duration-300"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <div className="w-16 h-16 bg-teal-50 group-hover:bg-teal-500 group-hover:rotate-6 rounded-2xl flex items-center justify-center text-2xl font-bold text-teal-700 group-hover:text-white transition-all duration-300">
                    {expert.name.charAt(0)}
                  </div>
                  <div className="text-right">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {expert.name}
                    </h3>
                    <p className="text-sm text-gray-600">{expert.title}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                      {getSpecializationName(expert.specialization)}
                    </span>
                    <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-medium">التخصص</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                      {expert.university}
                    </span>
                    <span className="text-sm font-medium">الجامعة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                      {expert.experience} سنوات
                    </span>
                    <span className="text-sm font-medium">الخبرة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <RatingStars rating={expert.rating} />
                    <span className="text-sm font-medium">التقييم</span>
                  </div>
                </div>

                <button
                  className="w-full mt-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:from-teal-600 hover:to-cyan-600 transition duration-300 transform group-hover:translate-y-0 translate-y-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpertClick(expert);
                  }}
                >
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredExperts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100 my-12">
            <div className="text-gray-400 mb-3">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              لم يتم العثور على نتائج
            </h3>
            <p className="text-gray-500 mt-1 max-w-md mx-auto">
              حاول تغيير معايير البحث أو التصفية للعثور على الخبراء المناسبين
            </p>
          </div>
        )}
      </div>

      {/* Expert Detail Modal */}
      {isModalOpen && selectedExpert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 h-32 rounded-t-2xl"></div>
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10 h-32 rounded-t-2xl"></div>
              <div className="p-6 border-b relative z-10 flex justify-between items-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:text-gray-200 focus:outline-none bg-white/20 rounded-full p-1.5 backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-white">
                  تفاصيل الخبير
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 pt-16 relative">
              <div className="absolute -top-12 right-8 w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg transform rotate-3">
                {selectedExpert.name.charAt(0)}
              </div>

              <div className="flex-1 text-right mr-32 md:mr-28">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedExpert.name}
                </h3>
                <p className="text-teal-600 font-medium mb-4">{selectedExpert.title}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div>
                    <span className="text-sm font-bold text-gray-700 mb-1 block">
                      التخصص:
                    </span>
                    <span className="inline-block bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm">
                      {getSpecializationName(selectedExpert.specialization)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-700 mb-1 block">
                      الجامعة:
                    </span>
                    <span className="text-sm text-gray-600">
                      {selectedExpert.university}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-700 mb-1 block">الخبرة:</span>
                    <span className="text-sm text-gray-600">
                      {selectedExpert.experience} سنوات
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-700 mb-1 block">
                      التقييم:
                    </span>
                    <RatingStars rating={selectedExpert.rating} />
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-bold text-gray-700 mb-1 block">
                      الإتاحة:
                    </span>
                    <span className="text-sm text-gray-600">
                      {selectedExpert.availability}
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-700 mb-2">نبذة مختصرة:</h4>
                  <p className="text-sm text-gray-600 leading-relaxed bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    {selectedExpert.bio}
                  </p>
                </div>

                <button
                  onClick={() => handleStartChat(selectedExpert.id)}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl px-6 py-3 font-medium transition duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  بدء محادثة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 