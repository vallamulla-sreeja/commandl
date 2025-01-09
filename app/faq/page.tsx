'use client';

import Navbar from '../components/Navbar';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is CommandL?",
    answer: "CommandL is an innovative code editor that integrates with the VedaVerse platform to provide a hands-on learning experience. It combines a powerful code editor with task tracking capabilities, making it easier for you to learn programming through practical exercises."
  },
  {
    question: "How do I get started with CommandL?",
    answer: "Getting started is a simple 3-step process: 1) First, sign up on the VedaVerse platform at https://platform.vedaverse.io/ 2) Download and install the CommandL editor from our website 3) Set up your development environment following our setup guide."
  },
  {
    question: "How does the task management work?",
    answer: "After signing up on the VedaVerse platform, you'll select a project or programming language you want to learn. This creates a task board similar to an agile scrum board. You can move tasks to 'In Progress' when you're ready to work on them, and they'll automatically appear in your CommandL editor's sidebar."
  },
  {
    question: "How do I access my learning tasks in CommandL?",
    answer: "Once you move a task to 'In Progress' on the VedaVerse platform (https://platform.vedaverse.io/), it will automatically appear in the CommandL editor's sidebar. You can then follow the instructions and complete the hands-on coding exercises directly in the editor."
  },
  {
    question: "What programming languages and projects are available?",
    answer: "You can choose from a variety of programming languages and projects on the VedaVerse platform. Simply browse through the available options after signing up and select what interests you most. The corresponding tasks and learning materials will be created automatically."
  },
  {
    question: "Is there a cost to use CommandL and VedaVerse?",
    answer: "Please visit the VedaVerse platform (https://platform.vedaverse.io/) for current pricing information and available plans. You'll need both platform access and the CommandL editor to get the complete learning experience."
  },
  {
    question: "Can I work on multiple projects simultaneously?",
    answer: "Yes! You can select multiple projects or languages on the VedaVerse platform and manage different task boards. All your in-progress tasks will be accessible through the CommandL editor's sidebar."
  },
  {
    question: "What if I need help while working on a task?",
    answer: "CommandL provides built-in assistance while you're working on your tasks. If you need additional help, you can access resources and community support through the VedaVerse platform."
  }
];

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-[#58cc02] mb-12 text-center">Frequently Asked Questions</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4">{faq.question}</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 