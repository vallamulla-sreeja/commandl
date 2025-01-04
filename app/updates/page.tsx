'use client';

import Navbar from '../components/Navbar';

interface Update {
  date: string;
  version: string;
  title: string;
  description: string;
  changes: string[];
}

const updates: Update[] = [
  {
    date: "December 29, 2024",
    version: "v1.2.0",
    title: "Audio Explanations & Enhanced Learning Experience",
    description: "Introducing audio explanations and improved in-IDE learning features",
    changes: [
      "Built-in audio explanations for tutorials and concepts",
      "Interactive code walkthroughs with voice guidance",
      "Enhanced in-IDE learning materials and documentation",
      "Improved task progression system"
    ]
  },
  {
    date: "December 22, 2024",
    version: "v1.1.0",
    title: "UI Polish & Performance Updates",
    description: "Improvements to user interface and system stability",
    changes: [
      "Enhanced user interface for better navigation",
      "Fixed build and deployment related issues",
      "Improved system performance and reduced loading times",
      "Better error handling and user feedback",
      "Enhanced compatibility across different operating systems"
    ]
  },
  {
    date: "December 15, 2024",
    version: "v1.0.0",
    title: "Initial Release: CommandL Launch",
    description: "Launching CommandL - Your AI-powered IDE for learning programming",
    changes: [
      "Task progress tracking in the sidebar",
      "Initial set of programming tutorials and exercises",
      "Basic task verification system",
      "Progress tracking dashboard",
      "Fundamental learning path structure"
    ]
  }
];

export default function UpdatesPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#58cc02] mb-12">Latest Updates</h1>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[180px] top-6 bottom-10 w-[2px] bg-gray-200"></div>

            <div className="space-y-16">
              {updates.map((update, index) => (
                <div key={index} className="relative flex">
                  {/* Left side - Date and Version */}
                  <div className="w-[180px] pr-8 flex flex-col items-end pt-[2px]">
                    <div className="text-sm font-mono text-gray-500">{update.version}</div>
                    <div className="text-sm font-bold text-gray-600">{update.date}</div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-[180px] -translate-x-1/2 top-[7px] w-[10px] h-[10px] rounded-full bg-[#1cb0f6] ring-4 ring-white"></div>
                  
                  {/* Right side - Content */}
                  <div className="flex-1 pl-12">
                    <h2 className="text-xl font-bold text-[#1cb0f6] mb-2">{update.title}</h2>
                    <p className="text-gray-600 mb-4 text-sm">{update.description}</p>
                    
                    <ul className="space-y-2">
                      {update.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-start text-sm">
                          <span className="mr-3 mt-1">•</span>
                          <span className="text-gray-700">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 