import React from 'react';
import { Home, ArrowLeft, Code, Search } from 'lucide-react';

export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="text-center relative z-10">
        {/* 404 Number with gradient */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold mb-4 animate-bounce">
            <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
              404
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
            The page you're looking for might have been moved, deleted, or doesn't exist.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 rounded-full flex items-center justify-center mb-6 border border-white/10 backdrop-blur-sm">
            <Search className="w-16 h-16 text-[#6366f1]" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="group flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          
          <button
            onClick={handleGoHome}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-lg hover:from-[#5a5fcf] hover:to-[#9333ea] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Home size={20} className="group-hover:scale-110 transition-transform" />
            Go Home
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold">Sathish Madanu</span>. All Rights Reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}