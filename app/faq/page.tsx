'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is CommandL?",
    answer: "CommandL is an innovative code editor designed specifically for students learning to program. It combines traditional IDE features with AI-powered assistance, interactive tutorials, and a gamified learning experience to make coding education more engaging and effective."
  },
  {
    question: "How does the AI assistance work?",
    answer: "Our AI assistant provides real-time code suggestions, explains complex concepts, and offers contextual hints as you type. It helps identify potential errors, suggests best practices, and can even explain code snippets in simple terms."
  },
  {
    question: "Is CommandL suitable for complete beginners?",
    answer: "Yes! CommandL is designed to accommodate all skill levels, from complete beginners to advanced learners. Our interactive tutorials start from the basics and gradually progress to more complex topics, ensuring a smooth learning curve."
  },
  {
    question: "What programming languages are supported?",
    answer: "CommandL supports a wide range of popular programming languages including Python, JavaScript, Java, and C++. We regularly update our language support based on educational trends and user feedback."
  },
  {
    question: "How does the task tracking system work?",
    answer: "CommandL features a dynamic task sidebar that displays your current lessons, challenges, and progress. As you complete tasks, you earn points and badges, making the learning process more engaging and rewarding."
  },
  {
    question: "Is there a cost to use CommandL?",
    answer: "CommandL offers both free and premium features. The basic version includes essential coding tools and tutorials, while the premium version provides additional features like advanced AI assistance and specialized learning paths."
  },
  {
    question: "Can I use CommandL offline?",
    answer: "Yes, CommandL has offline capabilities. While some features like AI assistance require an internet connection, core editing features and previously downloaded tutorials are available offline."
  },
  {
    question: "How do I get started with CommandL?",
    answer: "Simply download CommandL from our website, install it on your computer, and create an account. You'll be guided through an initial setup process that helps customize your learning experience based on your skill level and goals."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#58cc02] mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <span className="ml-6">
                    <svg
                      className={`w-6 h-6 transform ${openIndex === index ? 'rotate-180' : ''} transition-transform duration-200`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 