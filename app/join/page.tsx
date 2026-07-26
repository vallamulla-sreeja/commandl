'use client';

import { Stream } from "@cloudflare/stream-react";
import { Suspense } from 'react';
import { CheckCircle2 } from 'lucide-react';

const VideoPlayer = () => {
  return (
    <div className="relative w-full">
      <div className="aspect-video max-w-[1200px] mx-auto">
        <Stream
          controls
          src="aafc2832a7f9e35f7c4f9df27bc34e0c"
          height="100%"
          width="100%"
          responsive={true}
          className="rounded-lg md:rounded-xl"
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
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1e1e1e] tracking-tight mb-6">
          <span className="relative inline-block">
            <span className="relative z-10">Join CommandL</span>
            <span className="absolute inset-x-[-1rem] inset-y-[-0.5rem] bg-[#EFCCFF] -rotate-0 rounded-lg -z-0"></span>
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start your journey to becoming a better programmer with our structured learning approach
        </p>
      </div>

      {/* Video Section */}
      <div className="mb-16">
        <Suspense fallback={
          <div className="w-full aspect-video bg-gray-100 animate-pulse rounded-lg md:rounded-xl flex items-center justify-center">
            <p className="text-gray-500">Loading video...</p>
          </div>
        }>
          <VideoPlayer />
        </Suspense>
      </div>

      {/* Perks Section - With Green Checkmarks */}
      <div className="mb-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">What You Get by enrolling in 2 week program</h2>
        <div className="space-y-4">
          {[
            'Finish an end-to-end project in just 2 weeks with daily guidance',
            'Expand your professional network and meet like-minded peers',
            'We have a close network of about 100+ recruiters from top companies like Applied Intuition, NVidia, Netflix and other silicon valley startups, to whom we can forward your profile',
            'Access a secret resume tool to place you in the top 1% of applicants',
            'Receive hands-on mentorship from our founders for 2 weeks',
            'Ongoing guidance for a full year after you complete the program',
            'Enjoy a 1-year subscription to our CommandL code editor and other AI tools'
          ].map((perk, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-600 leading-relaxed">{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold mb-3">Structured Learning Path</h3>
          <p className="text-gray-600">Follow our carefully designed curriculum that takes you from basics to advanced concepts.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold mb-3">Real Project Experience</h3>
          <p className="text-gray-600">Build production-ready projects that you can add to your portfolio.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold mb-3">Expert Guidance</h3>
          <p className="text-gray-600">Get support from experienced developers who will help you overcome challenges.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold mb-3">Community Support</h3>
          <p className="text-gray-600">Join a community of like-minded learners and share your journey together.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <a
          href="https://buy.stripe.com/9AQ2b9dU59og9nWdQT"
          target="_blank"
          rel="noopener noreferrer"
          className="buttonPrimary inline-block font-bold text-lg px-8 py-4"
        >
          Enroll Now
        </a>
        <p className="text-gray-600 mt-4">
          Take the first step towards becoming a better programmer
        </p>
      </div>
    </div>
  );
}
