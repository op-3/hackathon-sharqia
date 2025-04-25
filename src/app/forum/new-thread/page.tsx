"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Types
type Category = {
  id: string;
  name: string;
};

const NewThreadPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    category: ""
  });

  // Mock categories
  const categories: Category[] = [
    { id: "cat-1", name: "المهارات الأكاديمية" },
    { id: "cat-2", name: "مواد دراسية محددة" },
    { id: "cat-3", name: "التكنولوجيا والبرمجة" },
    { id: "cat-4", name: "البحث العلمي" },
    { id: "cat-5", name: "التدريب والعمل" },
    { id: "cat-6", name: "الحياة الجامعية" }
  ];

  const validate = () => {
    const newErrors = {
      title: "",
      content: "",
      category: ""
    };
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = "يرجى إدخال عنوان للموضوع";
      isValid = false;
    } else if (title.length < 10) {
      newErrors.title = "العنوان قصير جداً، يجب أن يكون 10 أحرف على الأقل";
      isValid = false;
    }

    if (!content.trim()) {
      newErrors.content = "يرجى إدخال محتوى للموضوع";
      isValid = false;
    } else if (content.length < 30) {
      newErrors.content = "المحتوى قصير جداً، يجب أن يكون 30 حرف على الأقل";
      isValid = false;
    }

    if (!selectedCategory) {
      newErrors.category = "يرجى اختيار تصنيف للموضوع";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call to create thread
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to forum or specific thread page
      router.push("/forum");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/forum" className="text-blue-500 hover:text-blue-700 mr-2">
          العودة إلى المنتدى
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">إنشاء موضوع جديد</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              التصنيف
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- اختر تصنيفاً --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 mt-1 text-sm">{errors.category}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              عنوان الموضوع
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="أدخل عنواناً واضحاً للموضوع"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 mt-1 text-sm">{errors.title}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
              محتوى الموضوع
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="اشرح موضوعك بالتفصيل هنا..."
              rows={8}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.content && (
              <p className="text-red-500 mt-1 text-sm">{errors.content}</p>
            )}
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري النشر...
                </>
              ) : (
                "نشر الموضوع"
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold mb-3">إرشادات النشر:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>تأكد من أن موضوعك لم تتم مناقشته سابقاً في المنتدى.</li>
            <li>استخدم عنواناً واضحاً ومختصراً يعبر عن محتوى موضوعك.</li>
            <li>كن محترماً ومهذباً في طرحك وتجنب الألفاظ غير اللائقة.</li>
            <li>حاول أن تكون دقيقاً في وصف مشكلتك أو استفسارك.</li>
            <li>تأكد من نشر الموضوع في التصنيف المناسب.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewThreadPage; 