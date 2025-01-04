'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Update {
  date: string;
  version: string;
  title: string;
  description: string;
  changes: string[];
}

const updates: Update[] = [
  {
    date: "December 2023",
    version: "v2.1.0",
    title: "Enhanced AI Assistant & New Language Support",
    description: "Major improvements to our AI assistant capabilities and expanded language support",
    changes: [
      "Improved code suggestion accuracy with our latest AI model",
      "Added support for TypeScript and Rust",
      "Enhanced real-time error detection and fixes",
      "New interactive tutorial system with immediate feedback",
      "Improved code completion speed and relevance"
    ]
  },
  {
    date: "November 2023",
    version: "v2.0.5",
    title: "Performance Optimization & UI Improvements",
    description: "Significant performance enhancements and user interface updates",
    changes: [
      "Reduced startup time by 40%",
      "New dark mode theme with customizable colors",
      "Improved task sidebar organization",
      "Added new keyboard shortcuts for common actions",
      "Enhanced search functionality across projects"
    ]
  },
  {
    date: "October 2023",
    version: "v2.0.0",
    title: "Major Release: CommandL 2.0",
    description: "Complete overhaul of the CommandL learning experience",
    changes: [
      "Redesigned user interface for better learning flow",
      "Introduced gamification system with points and badges",
      "Added collaborative coding features for pair programming",
      "New project templates for quick start",
      "Integrated debugging tools with step-by-step guidance"
    ]
  },
  {
    date: "September 2023",
    version: "v1.9.0",
    title: "New Learning Paths & Bug Fixes",
    description: "Introduction of structured learning paths and stability improvements",
    changes: [
      "Added specialized learning paths for different programming domains",
      "Fixed multiple stability issues in the code editor",
      "Improved code syntax highlighting",
      "Enhanced offline mode capabilities",
      "Added new exercise types for better practice"
    ]
  }
];

export default function UpdatesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#58cc02] mb-8">Latest Updates</h1>
          
          <div className="space-y-8">
            {updates.map((update, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-sm font-medium text-gray-500">{update.date}</span>
                  <span className="px-3 py-1 rounded-full bg-[#58cc02] text-white text-sm font-medium">
                    {update.version}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{update.title}</h2>
                <p className="text-gray-600 mb-4">{update.description}</p>
                
                <ul className="space-y-2">
                  {update.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start">
                      <span className="mr-3 mt-1.5">
                        <svg className="w-4 h-4 text-[#58cc02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 