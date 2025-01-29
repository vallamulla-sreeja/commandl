'use client';

import { Stream } from "@cloudflare/stream-react";
import { Suspense } from 'react';
import { CheckCircle2 } from 'lucide-react';

const VideoPlayer = () => {
  return (
    <div className="relative w-full">
      <div className="aspect-video max-w-[900px] mx-auto">
        <Stream
          controls
          src="aafc2832a7f9e35f7c4f9df27bc34e0c"
          height="100%"
          width="100%"
          responsive={true}
          className="rounded-lg md:rounded-xl shadow-lg"
          autoplay={false}
          muted={false}
          preload="auto"
          primaryColor="#EFCCFF"
        />
      </div>
    </div>
  );
};

export default function JoinPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-4xl md:text-4xl font-extrabold text-[#4b4b4b] tracking-tight mb-8">
          <span className="relative inline-block">
            <span className="relative z-10">Join CommandL</span>
            <span className="absolute inset-x-[-1rem] inset-y-[-0.5rem] bg-[#EFCCFF] -rotate-0 rounded-lg -z-0"></span>
          </span>
        </h1>
      </div>

      {/* Video Section */}
      <div className="mb-20">
        <Suspense fallback={
          <div className="w-full aspect-video max-w-[900px] mx-auto bg-gray-100 animate-pulse rounded-lg md:rounded-xl flex items-center justify-center">
            <p className="text-gray-500 text-2xl">Loading video...</p>
          </div>
        }>
          <VideoPlayer />
        </Suspense>
      </div>

      {/* Perks Section - With Green Checkmarks */}
      <div className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-black font-nunito">Next Cohort Starts February 10th, 2025
        </h2>
        <div className="space-y-6 font-nunito text-[#4b4b4b]">
          {[
            'Learn to build a full-stack project from scratch in 2 weeks',
            'Learn to build professional network with recruiters',
            'Access our advanced resume tool to place you in the top 1% of applicants',
            'Receive hands-on mentorship from our founders for 2 weeks',
            'Ongoing guidance for a full year after you complete the program',
            'Enjoy a 1-year subscription to our CommandL code editor and our advanced AI tools',
            'Access to our network of 100+ technical recruiters from companies like Applied Intuition, Nvidia, Netflix and other silicon valley startups'
          ].map((perk, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
              <span className="text-2xl md:text-3xl text-[#4b4b4b] leading-relaxed font-bold">{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center font-nunito">
        <p className="text-lg text-[#FF4B4B] mb-6 font-extrabold">
        100% Money Back Guarantee
        </p>
        <a
          href="https://buy.stripe.com/9AQ2b9dU59og9nWdQT"
          target="_blank"
          rel="noopener noreferrer"
          className="buttonPrimary inline-block font-black text-3xl px-12 py-6"
        >
          Enroll Now
        </a>
        <p className="text-lg text-[#4b4b4b] mt-6 font-bold">
          It only takes 2 weeks to get an offer
        </p>
      </div>
    </div>
  );
}
