"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Professional Image Slider Component
export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef(0);
  
  const images = [
    '/images/handshake-5768632.jpg',
    '/images/handshake-5760544.jpg',
    '/images/ai-generated-8295617.jpg',
    '/images/Graduation - Cap throw.webp',
    '/images/brightspotcdn.byu.jpg'
  ];
  
  const captions = [
    { title: "التعاون والثقة", description: "بناء جسور المعرفة من خلال التعاون المستمر والثقة المتبادلة" },
    { title: "النجاح المهني", description: "نساعدك على بناء مستقبلك المهني وتحقيق طموحاتك الأكاديمية" },
    { title: "تجربة تعليمية متميزة", description: "نقدم تجربة تعليمية ثرية تجمع بين المعرفة النظرية والتطبيق العملي" },
    { title: "لحظات التخرج", description: "نفخر بطلابنا ونحتفل معهم بلحظات النجاح والإنجاز في مسيرتهم التعليمية" },
    { title: "الحياة الجامعية", description: "أجواء دراسية محفزة تجمع بين المعرفة والصداقات والأنشطة الطلابية المتنوعة" }
  ];
  
  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);
  
  const goToNextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goToSlide]);
  
  const goToPrevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, goToSlide]);
  
  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchDiff = touchStartXRef.current - touchEndX;
    
    // Swipe threshold
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        // Swipe left
        goToNextSlide();
      } else {
        // Swipe right
        goToPrevSlide();
      }
    }
  };
  
  // Auto slide with pause on hover
  useEffect(() => {
    const startAutoplay = () => {
      autoplayTimerRef.current = setInterval(() => {
        if (!isHovering) {
          goToNextSlide();
        }
      }, 5000);
    };
    
    startAutoplay();
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [goToNextSlide, isHovering]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToNextSlide();
      } else if (e.key === 'ArrowRight') {
        goToPrevSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNextSlide, goToPrevSlide]);
  
  return (
    <div 
      className="relative mx-auto w-full max-w-md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Decorative background glow */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-400 to-teal-400 opacity-40 blur-xl"></div>
      
      {/* Slider container */}
      <div 
        className="relative overflow-hidden rounded-3xl backdrop-blur-sm bg-white/5 border border-white/10 shadow-2xl h-[450px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/10">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-500"
            style={{ width: `${(currentIndex + 1) * (100 / images.length)}%` }}
          ></div>
        </div>
        
        {/* Images */}
        <div className="relative h-full w-full">
          {images.map((image, index) => {
            // Determine which transition to use
            let transitionClass = '';
            if (index === currentIndex) {
              transitionClass = 'opacity-100 scale-100';
            } else if ((index === currentIndex + 1) || (index === 0 && currentIndex === images.length - 1)) {
              transitionClass = 'opacity-0 translate-x-full scale-105';
            } else {
              transitionClass = 'opacity-0 -translate-x-full scale-105';
            }
            
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-800 ease-in-out transform ${transitionClass}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/50 to-transparent z-10"></div>
                <img
                  src={image}
                  alt={captions[index].title}
                  className="object-cover w-full h-full select-none"
                />
                
                {/* Caption with slide-up animation */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 z-20 p-6 transform transition-all duration-700 ease-out ${
                    index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index === currentIndex ? '400ms' : '0ms'}` }}
                >
                  <h3 className="font-bold text-2xl mb-2 text-white">{captions[index].title}</h3>
                  <p className="text-sm text-gray-100">{captions[index].description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Navigation arrows - show on hover */}
        <div className={`absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-30 opacity-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : ''}`}>
          <button 
            onClick={goToPrevSlide}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center transition-transform hover:scale-110 focus:outline-none hover:bg-black/30"
            aria-label="السابق"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button 
            onClick={goToNextSlide}
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center transition-transform hover:scale-110 focus:outline-none hover:bg-black/30"
            aria-label="التالي"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-110 w-4' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`الانتقال إلى الشريحة ${index + 1}`}
            ></button>
          ))}
        </div>
        
        {/* Slide counter */}
        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full z-30">
          {currentIndex + 1} / {images.length}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-6 w-12 h-12 bg-teal-500/20 rounded-full blur-lg"></div>
      </div>
      
      {/* Extra decorative elements outside slider */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
      <div className="absolute -top-6 -left-6 w-32 h-32 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
    </div>
  );
} 