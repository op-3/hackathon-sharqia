"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-700 to-teal-900 text-white shadow-xl font-['Tajawal'] relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
      
      {/* Decorative Blobs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="flex-shrink-0 flex items-center">
                <span className="font-bold text-xl tracking-wide text-white group-hover:text-cyan-300 transition-colors duration-300">أكاديمي بلس</span>
              </div>
            </Link>
            <div className="hidden md:flex ml-4">
              <span className="text-sm text-teal-100 border-r border-teal-600/50 pr-4 mr-4">جامعة التقنية والعلوم التطبيقية</span>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1 ml-4">
            <Link href="/forum" className="px-3 py-2 rounded-lg text-sm font-medium text-teal-100 hover:text-white hover:bg-teal-600/30 transition-all duration-200">
              المنتدى
            </Link>
            <Link href="/summaries" className="px-3 py-2 rounded-lg text-sm font-medium text-teal-100 hover:text-white hover:bg-teal-600/30 transition-all duration-200">
              الملخصات الدراسية
            </Link>
            <Link href="/courses" className="px-3 py-2 rounded-lg text-sm font-medium text-teal-100 hover:text-white hover:bg-teal-600/30 transition-all duration-200">
              الدورات
            </Link>
            <Link href="/experts" className="px-3 py-2 rounded-lg text-sm font-medium text-teal-100 hover:text-white hover:bg-teal-600/30 transition-all duration-200">
              استشارات الخبراء
            </Link>
            <Link href="/ai-assistant" className="px-3 py-2 rounded-lg text-sm font-medium text-teal-100 hover:text-white hover:bg-teal-600/30 transition-all duration-200">
              المساعد الذكي
            </Link>
            
            {isLoggedIn ? (
              <div className="relative mr-3">
                <button 
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-teal-600 transition-all duration-200 shadow-md"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="flex">
                <Link href="/login" className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-teal-600 transition-all duration-200 shadow-md transform hover:-translate-y-0.5">
                  تسجيل الدخول
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="mr-2 flex md:hidden">
            <button
              onClick={handleToggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-teal-100 hover:text-white hover:bg-teal-600/30 focus:outline-none transition-all duration-200"
              aria-label="Main menu"
              aria-expanded="false"
              tabIndex={0}
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden relative z-20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-teal-800 to-teal-900 shadow-inner">
            <div className="text-sm text-teal-200 py-2 px-3 border-b border-teal-700/50 mb-2">
              جامعة التقنية والعلوم التطبيقية
            </div>
            <Link href="/forum" className="block px-3 py-2 rounded-lg text-base font-medium text-teal-100 hover:text-white hover:bg-teal-600/30 transition-all duration-200">
              المنتدى
            </Link>
            <Link href="/summaries" className="block px-3 py-2 rounded-lg text-base font-medium text-teal-100 hover:text-white hover:bg-teal-600/30 transition-all duration-200">
              الملخصات الدراسية
            </Link>
            <Link href="/courses" className="block px-3 py-2 rounded-lg text-base font-medium text-teal-100 hover:text-white hover:bg-teal-600/30 transition-all duration-200">
              الدورات
            </Link>
            <Link href="/experts" className="block px-3 py-2 rounded-lg text-base font-medium text-teal-100 hover:text-white hover:bg-teal-600/30 transition-all duration-200">
              استشارات الخبراء
            </Link>
            <Link href="/ai-assistant" className="block px-3 py-2 rounded-lg text-base font-medium text-teal-100 hover:text-white hover:bg-teal-600/30 transition-all duration-200">
              المساعد الذكي
            </Link>
            
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="block w-full text-right px-3 py-2 rounded-lg text-base font-medium bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 transition-all duration-200 shadow-md"
              >
                تسجيل الخروج
              </button>
            ) : (
              <div className="space-y-2 mt-4">
                <Link href="/login" className="block w-full text-center px-3 py-2 rounded-lg text-base font-medium bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 transition-all duration-200 shadow-md">
                  تسجيل الدخول
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 