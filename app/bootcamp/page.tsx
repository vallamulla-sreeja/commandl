'use client';

import { Stream } from "@cloudflare/stream-react";
import { Suspense } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

// const CountdownTimer = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   });

//   useEffect(() => {
//     const targetDate = new Date('2025-02-14T23:59:00-05:00'); // EST time

//     const calculateTimeLeft = () => {
//       const now = new Date();
//       const difference = targetDate.getTime() - now.getTime();

//       if (difference > 0) {
//         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
//         const minutes = Math.floor((difference / 1000 / 60) % 60);
//         const seconds = Math.floor((difference / 1000) % 60);

//         setTimeLeft({ days, hours, minutes, seconds });
//       }
//     };

//     calculateTimeLeft();
//     const timer = setInterval(calculateTimeLeft, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="font-mono text-base text-[#4b4b4b] mt-2 font-semibold">
//       {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left to enroll
//     </div>
//   );
// };

export default function BootcampPage() {
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

  // Demo videos data
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

  return (
    <>
      <Navbar />
      <main className="pt-[72px] md:pt-[80px] min-h-screen bg-white">
        <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-2">
          {/* Header Section */}
          <div className="text-center mb-12 mt-4 md:mt-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#4b4b4b] tracking-tight mb-8">
              <span className="relative inline-block">
                <span className="relative z-10">CommandL 14 day bootcamp</span>
                <span className="absolute inset-x-[-1rem] inset-y-[-0.5rem] bg-[#EFCCFF] rounded-lg -z-0"></span>
              </span>
            </h1>
            <p className="text-2xl text-[#4b4b4b] mt-8 mb-8 font-bold">
              Become a software developer in 2 weeks and get a job
            </p>
            <div className="flex justify-center">
              <Link
                href="/api/auth/login?screen_hint=signup"
                className="buttonPrimary text-2xl px-8 py-4 font-bold"
              >
                Register for Free
              </Link>
            </div>
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

          {/* 3 Common Problems Section */}
          <div className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-black font-nunito">
              3 Common Problems (And How We Solve Them)
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

          {/* Signup Section */}
          <div className="text-center font-nunito bg-gray-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-[#4b4b4b]">
              Join Our Bootcamp Today
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your career in just 14 days with hands-on training, real-world projects, and direct mentorship from industry experts.
            </p>
            <Link
              href="/api/auth/signup"
              className="buttonPrimary inline-block font-bold text-2xl px-8 py-4"
            >
              Sign Up Now
            </Link>
            <p className="text-lg text-[#4b4b4b] mt-6 font-semibold">
              Your career starts in just 14 days.
            </p>
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
      <Footer />
    </>
  );
} 