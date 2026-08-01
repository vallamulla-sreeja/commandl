'use client';

import { Stream } from "@cloudflare/stream-react";
import { Suspense, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';

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

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-02-14T23:59:00-05:00'); // EST time

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-base text-[#4b4b4b] mt-2 font-semibold">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left to enroll
    </div>
  );
};

export default function JoinPage() {
  // Define the 3 common problems array
  const commonProblems = [
    {
      title: "1. I'm new to coding—where do I even begin?",
      problem:
        "Students with little or no coding experience often feel overwhelmed by terms like HTML, CSS, React, Node.js, MongoDB—and how they fit together. They're also worried about asking basic questions and looking lost.",
      solution:
        "Our 2-week program is beginner-friendly. We guide you step by step through each tool and show exactly how they work together to build a real project from scratch."
    },
    {
      title: "2. I have no idea how to actually land a job—my resume is weak.",
      problem:
        "Without a strong resume or industry connections, job applications often go unanswered. Beginners don't know what hiring managers really look for.",
      solution:
        "Our advanced resume tool tailors your skills to each job posting, putting you in the top 1% of applicants. Plus, we'll show you proven tactics to network directly with recruiters."
    },
    { 
      title: "3. I don't have the time or money for a long, expensive bootcamp.",
      problem:
        "Traditional bootcamps can take months and cost thousands—impossible for most students or those on tight budgets.",
      solution:
        "We compress essential modern tech skills (HTML, CSS, JS, React, Node.js, MongoDB) into just 14 days, at a fraction of the cost. You only need 2 hours a day to make real progress."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-[72px] md:pt-[80px] min-h-screen bg-white">
        <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-2">
          {/* Header Section */}
          <div className="text-center mb-12 mt-4 md:mt-8">
            <h1 className="text-4xl sm:text-4xl md:text-4xl font-extrabold text-[#4b4b4b] tracking-tight mb-8">
              <span className="relative inline-block">
                <span className="relative z-10">Join CommandL Bootcamp</span>
                <span className="absolute inset-x-[-1rem] inset-y-[-0.5rem] bg-[#EFCCFF] rounded-lg -z-0"></span>
              </span>
            </h1>
            <p className="text-2xl text-[#4b4b4b] mt-2 font-bold">
              Become a software developer in 2 weeks and get a job
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-20">
            <Suspense
              fallback={
                <div className="w-full aspect-video max-w-[900px] mx-auto bg-gray-100 animate-pulse rounded-lg md:rounded-xl flex items-center justify-center">
                  <p className="text-gray-500 text-2xl">Loading video...</p>
                </div>
              }
            >
              <VideoPlayer />
            </Suspense>
          </div>

          {/* 3 Common Problems Section */}
          <div className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-black font-nunito">
              3 Common Problems (And How We Solve Them)
            </h2>
            <div className="space-y-6 font-nunito text-[#4b4b4b]">
              {commonProblems.map((item, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl mb-2">
                    <strong className="block mb-1">Problem:</strong>
                    {item.problem}
                  </p>
                  <p className="text-lg md:text-xl">
                    <strong className="block mb-1">Solution:</strong>
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Updated Cohort + Perks Section */}
          <div className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-black font-nunito">
              Starts on February 17th, 2025
            </h2>
            <div className="space-y-6 font-nunito text-[#4b4b4b]">
              {[
                'Build a real-world full-stack project in just 14 days',
                'Access our AI-driven tools & 1-year subscription to our code editor',
                'Master in-demand skills like React, Node.js, and MongoDB',
                'Get direct mentorship from our founders every single day',
                'Network with top recruiters and land interviews at major tech companies'
              ].map((perk, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-2xl md:text-3xl text-[#4b4b4b] leading-relaxed font-bold">
                    {perk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center font-nunito">
            <div className="mb-6">
              <p className="text-lg text-[#FF4B4B] font-extrabold">
                Limited Time Discount
              </p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className="text-3xl md:text-4xl font-black line-through text-gray-400">$200</span>
                <span className="text-3xl md:text-4xl font-black text-[#4b4b4b]">$149</span>
              </div>
              <CountdownTimer />
            </div>
            <p className="text-lg text-[#FF4B4B] mb-2 font-extrabold">
              100% Money-Back Guarantee
            </p>
            <a
              href="https://buy.stripe.com/7sI5nl9DPgQIbw4fZ2"
              target="_blank"
              rel="noopener noreferrer"
              className="buttonPrimary inline-block font-black text-3xl px-12 py-6"
            >
              Enroll Now
            </a>
            <p className="text-lg text-[#4b4b4b] mt-6 font-bold">
              Your career starts in just 14 days.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
