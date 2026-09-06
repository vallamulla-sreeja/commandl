'use client'
import React, { useEffect, useState } from 'react';

const CallToAction = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative text-black flex items-center justify-center overflow-hidden py-24 min-h-[60vh] bg-gradient-to-br from-red-50 via-orange-50 to-red-100">
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Existing particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-red-300 to-orange-300 rounded-full animate-bounce opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* New floating gradient shapes */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute bg-gradient-to-r from-orange-300/30 to-red-300/30 rounded-full animate-pulse blur-xl"
            style={{
              width: `${60 + Math.random() * 80}px`,
              height: `${60 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-200/30 to-orange-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/30 to-yellow-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/6 w-80 h-80 bg-gradient-to-r from-pink-200/30 to-red-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-1/6 right-1/6 w-72 h-72 bg-gradient-to-r from-yellow-200/30 to-orange-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '6s' }}></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className={`transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-5xl md:text-8xl font-extrabold mb-16 md:mb-32 relative group cursor-default">
            <span className="bg-gradient-to-r from-[#FF6B6B] via-[#E85D45] to-[#FF6B6B] bg-clip-text text-transparent animate-gradient-x">
              Build your project now
            </span>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-red-400 to-orange-400 rounded-full opacity-60 animate-ping"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-60 animate-ping" style={{ animationDelay: '1s' }}></div>
          </h2>

          <div className="relative group inline-block">
            {/* Glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 rounded-lg blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500 animate-gradient-x"></div>
            
            <button
              className="relative bg-gradient-to-r from-[#E85D45] to-[#FF6B6B] text-white hover:from-[#d54d35] hover:to-[#E85D45] transition-all duration-500 text-2xl px-8 py-6 rounded-[8px] font-extrabold inline-flex items-center gap-3 hover:scale-110 transform hover:shadow-2xl mb-16 group"
              onClick={() => window.location.href = '/api/auth/login'}
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                GET STARTED FOR FREE
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-[-200%] transition-all duration-1000 ease-in-out"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced wave pattern background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23E85D45' d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Multiple wave layers for depth */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23FF6B6B' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover'
        }}
      />

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default CallToAction; 