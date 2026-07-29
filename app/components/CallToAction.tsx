'use client'
import React from 'react';

const CallToAction = () => {

  return (
    <section className="relative text-black flex items-center justify-center overflow-hidden py-24 min-h-[60vh]">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="transform transition-all duration-500 hover:translate-y-[-4px]">
          <h2 className="text-[#FF6B6B] text-5xl md:text-8xl font-extrabold mb-32">
            Build your project now
          </h2>

          <button
            className="bg-[#E85D45] text-white hover:bg-[#d54d35] transition-colors duration-300 text-xl px-8 py-6 rounded-[8px] font-extrabold inline-flex items-center gap-2 hover:scale-105 transform transition-transform mb-16"
            onClick={() => window.location.href = '/dashboard'}
          >
            GET STARTED
          </button>
        </div>
      </div>

      {/* Wave pattern background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23000000' d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover'
        }}
      />
    </section>
  );
};

export default CallToAction; 