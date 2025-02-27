'use client';

import { Suspense, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Stream } from "@cloudflare/stream-react";
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import { checkUserStatusAPI } from '../services/api';

export default function BenefitsPage() {
  const { user, isLoading: isUserLoading } = useUser();
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Define the common problems array from bootcamp/join pages
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

  // Demo videos data from bootcamp page
  const demoVideos = [
    {
      id: "aafc2832a7f9e35f7c4f9df27bc34e0c",
      title: "Introduction to CommandL Bootcamp",
      description: "Learn about our 14-day program and how it will transform your coding skills."
    },
    {
      id: "https://bypr8o9pz5zjf5of.public.blob.vercel-storage.com/careerfornia-captions-compressed-F3ixwJI67gGJ9KmMVuhiLZ8HUMfsAC.mp4",
      title: "Powerful AI Resume Tool",
      description: "Generate best resume for each role with a single click and be in top 1% of all the candidates that apply to the position. Get interview calls in 2 weeks."
    }
  ];

  // Check if user has paid
  useEffect(() => {
    const checkUserStatus = async () => {
      if (!user) return;
      
      try {
        const response = await checkUserStatusAPI();
        if (response && response.extra === 'paid') {
          setIsPaid(true);
        } else {
          setIsPaid(false);
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        setIsPaid(false);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    if (user && !isPaid && isCheckingStatus) {
      checkUserStatus();
    } else if (!isUserLoading && !user) {
      setIsPaid(false);
      setIsCheckingStatus(false);
    }
  }, [user, isUserLoading, isPaid, isCheckingStatus]);

  return (
    <>
      <Sidebar isCollapsedCallback={setIsSidebarCollapsed} />
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'} pt-[72px] min-h-screen bg-white`}>
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12 mt-4 md:mt-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#4b4b4b] tracking-tight mb-8">
              <span className="relative inline-block">
                <span className="relative z-10">Benefits & Features</span>
                <span className="absolute inset-x-[-1rem] inset-y-[-0.5rem] bg-[#EFCCFF] rounded-lg -z-0"></span>
              </span>
            </h1>
            <p className="text-2xl text-[#4b4b4b] mt-8 mb-8 font-bold">
              Become a software developer in 2 weeks and get a job
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-black font-nunito">
              Watch Demo Videos
            </h2>
            <div className="flex flex-col gap-12 max-w-3xl mx-auto">
              {demoVideos.map((video, index) => (
                <div key={index} className="flex flex-col">
                  <div className="relative w-full mb-4 overflow-hidden rounded-2xl shadow-lg">
                    <div className="aspect-video w-full">
                      <Suspense
                        fallback={
                          <div className="w-full aspect-video bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">
                            <p className="text-gray-500">Loading video...</p>
                          </div>
                        }
                      >
                        {video.id.includes('http') ? (
                          <video
                            controls
                            className="w-full h-full rounded-2xl"
                            preload="auto"
                            autoPlay
                            muted
                            loop
                            controlsList="nodownload"
                          >
                            <source src={video.id} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <Stream
                            controls
                            src={video.id}
                            height="100%"
                            width="100%"
                            responsive={true}
                            className="rounded-2xl"
                            autoplay={true}
                            muted={true}
                            loop={true}
                            preload="auto"
                            primaryColor="#EFCCFF"
                          />
                        )}
                      </Suspense>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#4b4b4b] mb-2">{video.title}</h3>
                  <p className="text-gray-600">{video.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Updated Cohort + Perks Section */}
          <div className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-black font-nunito">
              What You&apos;ll Get
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

          {/* Signup/CTA Section - Only show if the user hasn't paid */}
          {!isCheckingStatus && isPaid === false && (
            <div className="text-center font-nunito bg-gray-50 rounded-xl p-8 mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-[#4b4b4b]">
                Join Our Bootcamp Today
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Transform your career in just 14 days with hands-on training, real-world projects, and direct mentorship from industry experts.
              </p>
              <div className="mb-6">
                <p className="text-lg text-[#FF4B4B] font-extrabold">
                  Limited Time Discount
                </p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="text-3xl md:text-4xl font-black line-through text-gray-400">$250</span>
                  <span className="text-3xl md:text-4xl font-black text-[#4b4b4b]">$200</span>
                </div>
              </div>
              <p className="text-lg text-[#FF4B4B] mb-2 font-extrabold">
                100% Money-Back Guarantee
              </p>
              <a
                href="https://buy.stripe.com/eVa9DB3fr9og0RqeUZ"
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
          )}

          {/* Already enrolled message - only show if the user has paid */}
          {!isCheckingStatus && isPaid === true && (
            <div className="text-center font-nunito bg-gray-50 rounded-xl p-8 mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-green-600">
                You&apos;re Already Enrolled!
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Thank you for joining our bootcamp! You have full access to all features and benefits.
              </p>
              <Link
                href="/dashboard"
                className="buttonPrimary inline-block font-bold text-2xl px-8 py-4"
              >
                Go to Dashboard
              </Link>
            </div>
          )}

          {/* FAQ Section - Moved to bottom and redesigned */}
          <div className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-black font-nunito">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-nunito text-[#4b4b4b]">
              {commonProblems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <div className="text-sm space-y-3 flex-grow">
                    <div>
                      <span className="font-semibold block mb-1">Problem:</span>
                      <p>{item.problem}</p>
                    </div>
                    <div>
                      <span className="font-semibold block mb-1">Solution:</span>
                      <p>{item.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="text-center font-nunito mb-12">
            <p className="text-xl text-[#4b4b4b] font-medium">
              For any questions, please contact us at{' '}
              <a href="https://wa.me/19722928701" className="text-blue-600 hover:underline font-semibold">
                +1 972-292-8701
              </a>{' '}
              (WhatsApp) or email{' '}
              <a href="mailto:sai@vedaverse.io" className="text-blue-600 hover:underline font-semibold">
                sai@vedaverse.io
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
} 