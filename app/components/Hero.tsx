'use client';

import Image from 'next/image';
import { Stream } from "@cloudflare/stream-react";
import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';

const VideoPlayer = ({ muted = true }) => {
  return (
    <div className="relative w-full group">
      <div className="aspect-video transition-transform duration-500 group-hover:scale-[1.02]">
        <Stream
          controls
          src="aafc2832a7f9e35f7c4f9df27bc34e0c"
          height="100%"
          width="100%"
          responsive={true}
          className="rounded-lg md:rounded-xl shadow-2xl"
          autoplay={true}
          muted={muted}
          loop={true}
          preload="auto"
          primaryColor="#EFCCFF"
          poster=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-lg md:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="flex flex-col items-center text-center py-4 md:py-8 px-4 max-w-[1000px] mx-auto relative">
      {/* Subtle floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-16 w-64 h-64 bg-purple-100/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-72 h-72 bg-green-100/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-56 h-56 bg-blue-100/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Text Content */}
      <div className={`flex flex-col items-center gap-3 md:gap-5 mb-6 md:mb-8 relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1e1e1e] tracking-tight max-w-[800px] leading-tight">
          <span className="relative z-10 block mb-4 animate-fade-in-up">Code Editor for</span>
          <span className="relative inline-block group">
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">Students</span>
            <span className="absolute inset-x-[-1rem] inset-y-[-0.5rem] bg-gradient-to-r from-[#EFCCFF] to-[#DEB8FF] -rotate-1 rounded-lg -z-0 transition-all duration-300 group-hover:rotate-1 group-hover:scale-105 shadow-lg"></span>
          </span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-600 font-bold mt-2 max-w-[600px] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          The fun &amp; effective way to build complete projects
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center w-full sm:w-auto flex-col sm:flex-row mt-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link href="/api/auth/login" className="buttonPrimary font-bold w-full sm:w-auto relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">GET STARTED</span>
          </Link>
          <button
            onClick={() => setShowVideo(true)}
            className="buttonSecondary font-bold w-full sm:w-auto relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              WATCH DEMO
            </span>
          </button>
        </div>
      </div>

      <div className={`flex items-center gap-2 text-lg sm:text-xl text-gray-700 font-semibold bg-white/80 backdrop-blur-sm px-4 py-2 mb-4 rounded-full shadow-lg border border-gray-200/50 transition-all duration-700 hover:shadow-xl hover:scale-105 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '0.6s' }}>
        <div className="transition-transform duration-300 hover:scale-110">
          <Image
            src="/images/microsoft-logo.png"
            alt="Microsoft Logo"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </div>
        Backed by Microsoft for Startups
      </div>

      {/* Screenshot or Video */}
      <div className={`w-full max-w-[1000px] mx-auto px-2 sm:px-4 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '0.8s' }}>
        {showVideo ? (
          <Suspense fallback={
            <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-lg md:rounded-xl flex items-center justify-center shadow-xl">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading video...</p>
              </div>
            </div>
          }>
            <VideoPlayer muted={true} />
          </Suspense>
        ) : (
          <div className="group cursor-pointer transition-all duration-500 hover:scale-[1.02]" onClick={() => setShowVideo(true)}>
            <div className="relative overflow-hidden rounded-lg md:rounded-xl shadow-2xl">
              <Image
                src="/images/hero_image.png"
                alt="Screenshot of CommandL Code Editor"
                width={1000}
                height={625}
                priority
                quality={100}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}