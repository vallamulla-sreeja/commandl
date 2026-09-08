'use client';

import Image from 'next/image';
import { Stream } from "@cloudflare/stream-react";
import { Suspense, useState } from 'react';
import Link from 'next/link';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiJavascript, SiHtml5, SiCss3, SiPython } from 'react-icons/si';

const VideoPlayer = ({ muted = true }) => {
  return (
    <div className="relative w-full">
      <div className="aspect-video">
        <Stream
          controls
          src="aafc2832a7f9e35f7c4f9df27bc34e0c"
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
    <section className="relative flex flex-col items-center text-center py-6 md:py-10 px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Heading */}
      <h1 className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl leading-tight">
        Ship <span className="bg-gradient-to-r from-[#6E46FF] via-[#00D3FF] to-[#FF4BCD] bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient">beautiful</span> projects in <em className="italic">record</em> time
      </h1>

      {/* Tagline */}
      <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-600 max-w-xl">
        50+ interactive tasks and templates built with React, Typescript, and Tailwind CSS to help students build real-world applications fast.
      </p>

      {/* Buttons */}
      <div className="flex flex-row flex-wrap sm:flex-row justify-center gap-3 mt-8 w-full">
        <Link href="/api/auth/login" className="magicPrimary flex-1 basis-0 sm:flex-none sm:w-auto px-5 py-2 text-sm text-center">
          Get Started
          <span className="ml-1 text-base">→</span>
        </Link>
        <button
          onClick={() => setShowVideo(true)}
          className="magicSecondary flex-1 basis-0 sm:flex-none sm:w-auto px-5 py-2 text-sm"
        >
          Watch Demo
        </button>
      </div>

      {/* Tech Logos */}
      <div className="flex items-center gap-3 mt-8 text-2xl sm:text-3xl">
        <span className="relative group transition-transform hover:-translate-y-1 hover:scale-110">
          <SiNextdotjs className="text-black" />
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">Next.js</span>
        </span>
        <span className="relative group transition-transform hover:-translate-y-1 hover:scale-110">
          <SiReact className="text-[#61DAFB]" />
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">React</span>
        </span>
        <span className="relative group transition-transform hover:-translate-y-1 hover:scale-110">
          <SiTypescript className="text-[#3178C6]" />
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">TypeScript</span>
        </span>
        <span className="relative group transition-transform hover:-translate-y-1 hover:scale-110">
          <SiTailwindcss className="text-[#38B2AC]" />
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">Tailwind</span>
        </span>
        <span className="relative group transition-transform hover:-translate-y-1 hover:scale-110">
          <SiNodedotjs className="text-[#339933]" />
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">Node.js</span>
        </span>
        <span className="relative group transition-transform hover:-translate-y-1 hover:scale-110">
          <SiJavascript className="text-[#F7DF1E]" />
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">JavaScript</span>
        </span>
        <span className="relative group transition-transform hover:-translate-y-1 hover:scale-110">
          <SiPython className="text-[#3776AB]" />
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">Python</span>
        </span>
        <span className="relative group transition-transform hover:-translate-y-1 hover:scale-110">
          <SiHtml5 className="text-[#E34F26]" />
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">HTML5</span>
        </span>
        <span className="relative group transition-transform hover:-translate-y-1 hover:scale-110">
          <SiCss3 className="text-[#1572B6]" />
          <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">CSS3</span>
        </span>
      </div>

      {/* Screenshot or Video */}
      <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 mt-10">
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
            className="w-full h-auto rounded-lg md:rounded-xl shadow-lg"
          />
        )}
      </div>
    </section>
  );
}