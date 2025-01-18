'use client';

import Image from 'next/image';
import { Stream } from "@cloudflare/stream-react";
import { Suspense, useState } from 'react';
import Link from 'next/link';

const VideoPlayer = ({ muted = true }) => {
  return (
    <div className="relative w-full">
      <div className="aspect-video">
        <Stream
          controls
          src="d73b6525e1b8d43f5970c13e883afecc"
          height="100%"
          width="100%"
          responsive={true}
          className="rounded-lg md:rounded-xl"
          autoplay={true}
          muted={muted}
          preload="auto"
          primaryColor="#EFCCFF"
        />
      </div>
    </div>
  );
};

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="flex flex-col items-center text-center py-4 md:py-8 px-4 max-w-[1000px] mx-auto">
      {/* Text Content */}
      <div className="flex flex-col items-center gap-3 md:gap-5 mb-6 md:mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1e1e1e] tracking-tight max-w-[800px] leading-tight">
          <span className="relative z-10 block mb-4">Code Editor for</span>
          <span className="relative inline-block">
            <span className="relative z-10">Students</span>
            <span className="absolute inset-x-[-1rem] inset-y-[-0.5rem] bg-[#EFCCFF] -rotate-0 rounded-lg -z-0"></span>
          </span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-600 font-bold mt-2 max-w-[600px]">
          The fun &amp; effective way to build complete projects
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center w-full sm:w-auto flex-col sm:flex-row mt-6">
          <Link href="/api/auth/login" className="buttonPrimary font-bold w-full sm:w-auto">
            GET STARTED
          </Link>
          <button
            onClick={() => setShowVideo(true)}
            className="buttonSecondary font-bold w-full sm:w-auto"
          >
            WATCH DEMO
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-lg sm:text-xl text-gray-700 font-semibold bg-white/80 px-4 mb-4 rounded-full">
        <Image
          src="/images/microsoft-logo.png"
          alt="Microsoft Logo"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        Backed by Microsoft for Startups
      </div>

      {/* Screenshot or Video */}
      <div className="w-full max-w-[1000px] mx-auto px-2 sm:px-4">
        {showVideo ? (
          <Suspense fallback={
            <div className="w-full aspect-video bg-gray-100 animate-pulse rounded-lg md:rounded-xl flex items-center justify-center">
              <p className="text-gray-500">Loading video...</p>
            </div>
          }>
            <VideoPlayer muted={false} />
          </Suspense>
        ) : (
          <Image
            src="/images/hero_image.png"
            alt="Screenshot of CommandL Code Editor"
            width={1000}
            height={625}
            priority
            quality={100}
            className="w-full h-auto rounded-lg md:rounded-xl"
          />
        )}
      </div>
    </section>
  );
}
