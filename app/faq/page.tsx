'use client';

import Navbar from '../components/Navbar';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is CommandL?",
    answer: `
  CommandL is a learning platform that combines a Jira-like dashboard with an AI-powered code editor. It's designed to help you build real projects in just 14 days.
    `.trim()
  },
  {
    question: "How does the website work?",
    answer: `
  Our website features a daily task dashboard, similar to Jira. Each day, you’ll see a list of tasks to complete, keeping your learning on track.
    `.trim()
  },
  {
    question: "What about the code editor?",
    answer: `
    The CommandL code editor comes with task board, AI mentor, tutorials plus streaks and points. The more tasks you finish, the more points you earn, boosting motivation and progress.
    `.trim()
  },
  {
    question: "How does the resume builder works?",
    answer: `
    Using our resume builder you will be able to create a personalized resume that for every job in less than 5 seconds, this resume lands you in top 1% of the jobs you apply.
    `.trim()
  },
  {
    question: "Do I need coding experience?",
    answer: `
No. The 14-day bootcamp is beginner-friendly. Many students start with zero coding background and still build complete projects by the end.
    `.trim()
  },
  {
    question: "What is the 14-day bootcamp?",
    answer: `
It’s an intensive program where you tackle daily tasks, build full projects, and gain real-world coding skills, most importantly applying to jobs using our personalized resume builder for every job all within two weeks.
    `.trim()
  },
  {
    question: "How does it help with interviews?",
    answer: `
Graduates see a 60% increase in interview invites and a 90%+ chance of landing a job within three months after completing the bootcamp.
    `.trim()
  },
  
  {
    question: "How much time do I have to spend each day?",
    answer: `
You will have to spend at least 2 hours a day for 14 dyas at your convinient time.
    `.trim()
  },
  {
    question: "How do I track my progress?",
    answer: `
Your daily tasks, streaks, and points are all visible in your dashboard and the editor. You can see exactly how far you’ve come.
    `.trim()
  },
  {
    question: "How do I join?",
    answer: `
Simply sign up on our website. Once enrolled, you’ll get immediate access to the dashboard and code editor to start your 14-day journey.
    `.trim()
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
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {faq.question}
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
