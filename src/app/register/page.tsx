"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type University = {
  id: number;
  name: string;
};

const RegisterPage = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    major: "",
    yearOfStudy: "",
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const universities: University[] = [
    { id: 1, name: "جامعة السلطان قابوس" },
    { id: 2, name: "الجامعة الألمانية للتكنولوجيا" },
    { id: 3, name: "جامعة نزوى" },
    { id: 4, name: "جامعة ظفار" },
    { id: 5, name: "جامعة صحار" },
    { id: 6, name: "كلية عمان الطبية" },
    { id: 7, name: "كلية الشرق الأوسط" },
    { id: 8, name: "جامعة البريمي" }
  ];
  
  const majors = [
    "الهندسة",
    "الطب",
    "العلوم",
    "تقنية المعلومات",
    "إدارة الأعمال",
    "الاقتصاد",
    "القانون",
    "التربية",
    "اللغات",
    "العلوم الاجتماعية",
    "الفنون",
    "الزراعة"
  ];
  
  const studyYears = ["السنة الأولى", "السنة الثانية", "السنة الثالثة", "السنة الرابعة", "السنة الخامسة", "الدراسات العليا"];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = "الاسم الأول مطلوب";
    if (!formData.lastName) newErrors.lastName = "الاسم الأخير مطلوب";
    
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "الرجاء إدخال بريد إلكتروني صحيح";
    }
    
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 8) {
      newErrors.password = "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمات المرور غير متطابقة";
    }
    
    if (!formData.university) newErrors.university = "الرجاء اختيار الجامعة";
    if (!formData.major) newErrors.major = "الرجاء اختيار التخصص";
    if (!formData.yearOfStudy) newErrors.yearOfStudy = "الرجاء اختيار سنة الدراسة";
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "يجب الموافقة على الشروط والأحكام للاستمرار";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Mock registration - in a real app this would call an API
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to home page after successful registration
        router.push("/");
      }, 1500);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">إنشاء حساب جديد</h1>
          <p className="mt-2 text-gray-600">
            انضم إلى مجتمع أكاديمي بلس للطلاب العمانيين
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الأول
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              
              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الأخير
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
              
              {/* Email */}
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your.email@example.com"
                  dir="ltr"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  dir="ltr"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  dir="ltr"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
              
              {/* University */}
              <div className="sm:col-span-2">
                <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                  الجامعة أو الكلية
                </label>
                <select
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.university ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">اختر الجامعة...</option>
                  {universities.map((university) => (
                    <option key={university.id} value={university.name}>
                      {university.name}
                    </option>
                  ))}
                </select>
                {errors.university && (
                  <p className="mt-1 text-sm text-red-600">{errors.university}</p>
                )}
              </div>
              
              {/* Major */}
              <div>
                <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                  التخصص
                </label>
                <select
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.major ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">اختر التخصص...</option>
                  {majors.map((major) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </select>
                {errors.major && (
                  <p className="mt-1 text-sm text-red-600">{errors.major}</p>
                )}
              </div>
              
              {/* Year of Study */}
              <div>
                <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
                  سنة الدراسة
                </label>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.yearOfStudy ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">اختر سنة الدراسة...</option>
                  {studyYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.yearOfStudy && (
                  <p className="mt-1 text-sm text-red-600">{errors.yearOfStudy}</p>
                )}
              </div>
              
              {/* Terms and Conditions */}
              <div className="sm:col-span-2 mt-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="mr-3 text-sm">
                    <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                      أوافق على{" "}
                      <Link href="/terms" className="text-teal-600 hover:text-teal-500">
                        شروط الاستخدام
                      </Link>{" "}
                      و{" "}
                      <Link href="/privacy" className="text-teal-600 hover:text-teal-500">
                        سياسة الخصوصية
                      </Link>
                    </label>
                  </div>
                </div>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="sm:col-span-2 mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "إنشاء حساب"
                  )}
                </button>
              </div>
            </div>
          </form>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            لديك حساب بالفعل؟{" "}
            <Link href="/login" className="font-medium text-teal-600 hover:text-teal-500">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;