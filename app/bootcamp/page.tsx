'use client';

import { Stream } from "@cloudflare/stream-react";
import { Suspense } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';

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
      id: "aafc2832a7f9e35f7c4f9df27bc34e0c", // Using same video ID for demo purposes
      title: "Building Your First Full-Stack Application",
      description: "Watch how we build a complete web application from scratch using modern technologies."
    },
    {
      id: "aafc2832a7f9e35f7c4f9df27bc34e0c", // Using same video ID for demo purposes
      title: "Job-Ready Skills Workshop",
      description: "Discover the essential skills employers are looking for and how to showcase them."
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
              <a
                href="/api/auth/login?screen_hint=signup"
                className="buttonPrimary text-2xl px-8 py-4 font-bold"
              >
                Register for Free
              </a>
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-black font-nunito">
              Watch Demo Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        <Stream
                          controls
                          src={video.id}
                          height="100%"
                          width="100%"
                          responsive={true}
                          className="rounded-2xl"
                          autoplay={false}
                          muted={false}
                          preload="auto"
                          primaryColor="#EFCCFF"
                        />
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
              What You'll Get
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
            <a
              href="/api/auth/signup"
              className="buttonPrimary inline-block font-bold text-2xl px-8 py-4"
            >
              Sign Up Now
            </a>
            <p className="text-lg text-[#4b4b4b] mt-6 font-semibold">
              Your career starts in just 14 days.
            </p>
          </div>
        </div>
      </main>
    </>
  );
} 