import Link from "next/link";
import ImageSlider from "../components/ImageSlider";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 text-white py-20 md:py-28">
        {/* Animated Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-15">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        {/* Decorative Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-right md:flex md:items-center md:justify-between">
            <div className="md:w-3/5 mx-0 mr-auto md:mr-0">
              <div className="flex flex-col items-start">
                <span className="inline-block px-3 py-1 bg-white/10 text-cyan-100 rounded-full text-sm font-semibold backdrop-blur-sm mb-6">نحو مستقبل أكاديمي مشرق</span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-right w-full">
                  نساعدك لتحقيق <span className="text-cyan-300 relative">
                    أحلامك التعليمية
                    <span className="absolute bottom-1 left-0 w-full h-2 bg-cyan-300/20 rounded-full"></span>
                  </span>
                </h1>
                <p className="text-lg md:text-xl mb-10 text-gray-100 max-w-2xl text-right w-full">
                  كل خطوة في رحلتك الأكاديمية مهمة، ونحن هنا لنمسك بيدك من أول يوم دراسي وحتى التخرج. لأن نجاحك هو هدفنا الأول، ومستقبلك هو ما نسعى إليه معاً.
                </p>
                
                {/* Testimonial Bubbles */}
                <div className="flex flex-wrap justify-start gap-3 mb-8 w-full">
                  <div className="bg-white/10 p-3 rounded-xl max-w-xs backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
                    <p className="text-sm text-gray-100 mb-2 text-right">
                      &quot;تغيرت حياتي الأكاديمية بشكل كامل مع أكاديمي بلس. من طالب متعثر إلى متفوق في دفعتي!&quot;
                    </p>
                    <p className="text-xs text-cyan-200 font-medium text-left">- أحمد الريامي، طالب هندسة</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl max-w-xs backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
                    <p className="text-sm text-gray-100 mb-2 text-right">
                      &quot;لم أكن أحلم بالنجاح الذي حققته الآن. شكراً لمنصة أكاديمي بلس على الدعم المستمر.&quot;
                    </p>
                    <p className="text-xs text-cyan-200 font-medium text-left">- نورة الحارثي، طالبة طب</p>
                  </div>
                </div>
                
                {/* أزرار */}
                <div className="flex flex-col sm:flex-row justify-start gap-5 w-full">
                  <Link href="/register" className="bg-gradient-to-r from-white to-gray-100 text-teal-800 hover:from-gray-100 hover:to-white transition-all px-8 py-5 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center">
                    <span>انضم لعائلتنا</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <Link href="/about" className="relative overflow-hidden border-2 border-white/70 text-white hover:bg-white/10 transition-all px-8 py-5 rounded-xl font-medium group">
                    <span className="relative z-10">اكتشف قصص النجاح</span>
                    <div className="absolute inset-0 translate-y-[105%] bg-white/10 transition-transform duration-300 group-hover:translate-y-0"></div>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block md:w-2/5 mt-10 md:mt-0">
              {/* Professional Image Slider */}
              <ImageSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-4">خدماتنا</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">خدماتنا الرئيسية</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              توفر منصة أكاديمي بلس مجموعة متكاملة من الخدمات لمساعدة الطلاب الجامعيين على التفوق في مسيرتهم الأكاديمية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100 duration-300"></div>
              <div className="w-16 h-16 bg-teal-50 group-hover:bg-teal-500 group-hover:rotate-6 rounded-2xl flex items-center justify-center mb-6 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">منتدى الطلاب</h3>
              <p className="text-gray-600 mb-8 group-hover:text-gray-700 transition-colors leading-relaxed">
                تواصل مع زملائك الطلاب، اطرح أسئلتك الأكاديمية، وشارك المعرفة في بيئة تعاونية
              </p>
              <Link href="/forum" className="inline-flex items-center font-medium text-teal-600 group-hover:text-teal-700 transition-colors relative">
                <span className="relative z-10">اكتشف المنتدى</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600/40 group-hover:bg-teal-600 transition-colors"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100 duration-300"></div>
              <div className="w-16 h-16 bg-teal-50 group-hover:bg-teal-500 group-hover:rotate-6 rounded-2xl flex items-center justify-center mb-6 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">ملخصات دراسية</h3>
              <p className="text-gray-600 mb-8 group-hover:text-gray-700 transition-colors leading-relaxed">
                اكتشف ملخصات شاملة للمواد الجامعية معدة من قبل الطلاب المتفوقين والأساتذة المتخصصين
              </p>
              <Link href="/summaries" className="inline-flex items-center font-medium text-teal-600 group-hover:text-teal-700 transition-colors relative">
                <span className="relative z-10">تصفح الملخصات</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600/40 group-hover:bg-teal-600 transition-colors"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100 duration-300"></div>
              <div className="w-16 h-16 bg-teal-50 group-hover:bg-teal-500 group-hover:rotate-6 rounded-2xl flex items-center justify-center mb-6 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">دورات تدريبية</h3>
              <p className="text-gray-600 mb-8 group-hover:text-gray-700 transition-colors leading-relaxed">
                استفد من دورات تدريبية متخصصة تساعدك على تطوير مهاراتك الأكاديمية والعملية
              </p>
              <Link href="/courses" className="inline-flex items-center font-medium text-teal-600 group-hover:text-teal-700 transition-colors relative">
                <span className="relative z-10">استكشف الدورات</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600/40 group-hover:bg-teal-600 transition-colors"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100 duration-300"></div>
              <div className="w-16 h-16 bg-teal-50 group-hover:bg-teal-500 group-hover:rotate-6 rounded-2xl flex items-center justify-center mb-6 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">استشارات الخبراء</h3>
              <p className="text-gray-600 mb-8 group-hover:text-gray-700 transition-colors leading-relaxed">
                احصل على استشارات مخصصة من خبراء في مجالات متنوعة تساعدك في تحديد مسارك المهني والأكاديمي
              </p>
              <Link href="/experts" className="inline-flex items-center font-medium text-teal-600 group-hover:text-teal-700 transition-colors relative">
                <span className="relative z-10">تواصل مع الخبراء</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600/40 group-hover:bg-teal-600 transition-colors"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Feature 5 - AI Assistant */}
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100 duration-300"></div>
              <div className="w-16 h-16 bg-teal-50 group-hover:bg-teal-500 group-hover:rotate-6 rounded-2xl flex items-center justify-center mb-6 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">المساعد الذكي</h3>
              <p className="text-gray-600 mb-8 group-hover:text-gray-700 transition-colors leading-relaxed">
                استخدم الذكاء الاصطناعي لتلخيص الملفات والمستندات الدراسية بسرعة وكفاءة، مما يوفر وقتك ويحسن من كفاءة دراستك
              </p>
              <Link href="/ai-assistant" className="inline-flex items-center font-medium text-teal-600 group-hover:text-teal-700 transition-colors relative">
                <span className="relative z-10">جرب المساعد الذكي</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600/40 group-hover:bg-teal-600 transition-colors"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - We'll keep this section but focus more on student success stories */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/80 to-gray-50/40 opacity-70"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold mb-4">قصص نجاح</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">رحلة طلابنا نحو التفوق</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              تعرف على تجارب طلابنا وكيف ساهمت منصة أكاديمي بلس في تحسين مستواهم الأكاديمي وتحقيق أحلامهم
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Testimonial 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 group hover:border-teal-200">
              <div className="mb-8 text-teal-500">
                <svg width="45" height="35" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.07816 21.584C6.95816 19.464 5.89816 17.2 5.89816 14.008C5.89816 10.168 7.29416 7.064 10.0862 4.696C12.9102 2.36 16.5502 1.192 21.0062 1.192V8.584C16.7582 8.656 14.6382 9.976 14.6382 12.544C14.6382 13.528 14.9662 14.344 15.6222 14.992H19.5262C21.3582 14.992 22.8822 15.608 24.0982 16.84C25.3462 18.072 25.9702 19.624 25.9702 21.496C25.9702 23.44 25.3462 24.992 24.0982 26.152C22.8822 27.312 21.3582 27.892 19.5262 27.892C17.6942 27.892 16.1702 27.288 14.9542 26.08C13.7382 24.904 13.1302 23.416 13.1302 21.616C13.1302 21.6 13.1382 21.592 13.1542 21.592L9.07816 21.584ZM28.1142 21.584C26.0262 19.464 24.9822 17.2 24.9822 14.008C24.9822 10.168 26.3622 7.064 29.1222 4.696C31.9142 2.36 35.5542 1.192 40.0102 1.192V8.584C35.7622 8.656 33.6422 9.976 33.6422 12.544C33.6422 13.528 33.9702 14.344 34.6262 14.992H38.5302C40.3622 14.992 41.8862 15.608 43.1022 16.84C44.3502 18.072 44.9742 19.624 44.9742 21.496C44.9742 23.44 44.3502 24.992 43.1022 26.152C41.8862 27.312 40.3622 27.892 38.5302 27.892C36.6982 27.892 35.1742 27.288 33.9582 26.08C32.7422 24.904 32.1342 23.416 32.1342 21.616C32.1342 21.6 32.1422 21.592 32.1582 21.592L28.1142 21.584Z" fill="currentColor" />
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                &quot;ساعدتني منصة أكاديمي بلس في الحصول على ملخصات متميزة للمواد الهندسية الصعبة. حياتي الدراسية تغيرت بشكل كامل.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">أ</div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">أحمد الريامي</h4>
                  <p className="text-teal-600 font-medium">طالب هندسة، جامعة التقنية والعلوم التطبيقية</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 group hover:border-teal-200">
              <div className="mb-8 text-teal-500">
                <svg width="45" height="35" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.07816 21.584C6.95816 19.464 5.89816 17.2 5.89816 14.008C5.89816 10.168 7.29416 7.064 10.0862 4.696C12.9102 2.36 16.5502 1.192 21.0062 1.192V8.584C16.7582 8.656 14.6382 9.976 14.6382 12.544C14.6382 13.528 14.9662 14.344 15.6222 14.992H19.5262C21.3582 14.992 22.8822 15.608 24.0982 16.84C25.3462 18.072 25.9702 19.624 25.9702 21.496C25.9702 23.44 25.3462 24.992 24.0982 26.152C22.8822 27.312 21.3582 27.892 19.5262 27.892C17.6942 27.892 16.1702 27.288 14.9542 26.08C13.7382 24.904 13.1302 23.416 13.1302 21.616C13.1302 21.6 13.1382 21.592 13.1542 21.592L9.07816 21.584ZM28.1142 21.584C26.0262 19.464 24.9822 17.2 24.9822 14.008C24.9822 10.168 26.3622 7.064 29.1222 4.696C31.9142 2.36 35.5542 1.192 40.0102 1.192V8.584C35.7622 8.656 33.6422 9.976 33.6422 12.544C33.6422 13.528 33.9702 14.344 34.6262 14.992H38.5302C40.3622 14.992 41.8862 15.608 43.1022 16.84C44.3502 18.072 44.9742 19.624 44.9742 21.496C44.9742 23.44 44.3502 24.992 43.1022 26.152C41.8862 27.312 40.3622 27.892 38.5302 27.892C36.6982 27.892 35.1742 27.288 33.9582 26.08C32.7422 24.904 32.1342 23.416 32.1342 21.616C32.1342 21.6 32.1422 21.592 32.1582 21.592L28.1142 21.584Z" fill="currentColor" />
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                &quot;استفدت كثيراً من الدورات التدريبية. محتوى متميز والخبراء دعموني في كل خطوة. كان هذا سر تفوقي.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">ن</div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">نورة الحارثي</h4>
                  <p className="text-teal-600 font-medium">طالبة طب، جامعة التقنية والعلوم التطبيقية</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 group hover:border-teal-200">
              <div className="mb-8 text-teal-500">
                <svg width="45" height="35" viewBox="0 0 45 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.07816 21.584C6.95816 19.464 5.89816 17.2 5.89816 14.008C5.89816 10.168 7.29416 7.064 10.0862 4.696C12.9102 2.36 16.5502 1.192 21.0062 1.192V8.584C16.7582 8.656 14.6382 9.976 14.6382 12.544C14.6382 13.528 14.9662 14.344 15.6222 14.992H19.5262C21.3582 14.992 22.8822 15.608 24.0982 16.84C25.3462 18.072 25.9702 19.624 25.9702 21.496C25.9702 23.44 25.3462 24.992 24.0982 26.152C22.8822 27.312 21.3582 27.892 19.5262 27.892C17.6942 27.892 16.1702 27.288 14.9542 26.08C13.7382 24.904 13.1302 23.416 13.1302 21.616C13.1302 21.6 13.1382 21.592 13.1542 21.592L9.07816 21.584ZM28.1142 21.584C26.0262 19.464 24.9822 17.2 24.9822 14.008C24.9822 10.168 26.3622 7.064 29.1222 4.696C31.9142 2.36 35.5542 1.192 40.0102 1.192V8.584C35.7622 8.656 33.6422 9.976 33.6422 12.544C33.6422 13.528 33.9702 14.344 34.6262 14.992H38.5302C40.3622 14.992 41.8862 15.608 43.1022 16.84C44.3502 18.072 44.9742 19.624 44.9742 21.496C44.9742 23.44 44.3502 24.992 43.1022 26.152C41.8862 27.312 40.3622 27.892 38.5302 27.892C36.6982 27.892 35.1742 27.288 33.9582 26.08C32.7422 24.904 32.1342 23.416 32.1342 21.616C32.1342 21.6 32.1422 21.592 32.1582 21.592L28.1142 21.584Z" fill="currentColor" />
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                &quot;ساعدتني استشارات الخبراء في اتخاذ قرارات مهمة حول مساري المهني بعد التخرج. النصائح كانت عملية ومفيدة وساهمت في حصولي على وظيفة مناسبة في مجال تخصصي.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">س</div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">سلطان البلوشي</h4>
                  <p className="text-teal-600 font-medium">خريج إدارة أعمال، جامعة التقنية والعلوم التطبيقية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 py-20">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-block px-3 py-1 bg-white/10 text-cyan-100 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">ابدأ رحلتك معنا</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">ابدأ رحلتك التعليمية معنا اليوم</h2>
            <p className="text-lg text-teal-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              انضم إلى الآلاف من الطلاب الذين يستفيدون من منصة أكاديمي بلس لتحسين مستواهم الأكاديمي وبناء مستقبلهم المهني
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5 max-w-md mx-auto">
              <Link href="/register" className="bg-gradient-to-r from-white to-gray-100 text-teal-800 hover:from-gray-100 hover:to-white transition-all px-10 py-5 rounded-xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center flex-1">
                <span>انضم إلينا</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="/courses" className="relative overflow-hidden border-2 border-white/70 text-white hover:bg-white/10 transition-all px-10 py-5 rounded-xl font-medium group flex-1 flex items-center justify-center">
                <span className="relative z-10">تصفح الدورات</span>
                <div className="absolute inset-0 translate-y-[105%] bg-white/10 transition-transform duration-300 group-hover:translate-y-0"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
