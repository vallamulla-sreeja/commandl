'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { EyeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  student: string;
  studentImage: string;
  role: string;
  views: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  testimonial: string;
}

const dummyProjects: Project[] = [
  {
    id: 1,
    title: "AI Task Manager",
    description: "A smart task management system that uses AI to prioritize and categorize tasks. Built with Next.js, TypeScript, and OpenAI API.",
    image: "/images/ai-task-manager.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "OpenAI API"],
    student: "Nina Patel",
    studentImage: "/images/Nina_Patel.png",
    role: "AI/ML Student",
    views: 5600,
    difficulty: "Advanced",
    testimonial: "I needed help with both basic coding and advanced AI topics and CommandL nails it. The interactive exercises keep me engaged."
  },
  {
    id: 2,
    title: "EcoTracker",
    description: "A web application that helps users track their carbon footprint and suggests ways to reduce environmental impact.",
    image: "/images/eco.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    student: "Lisa Chang",
    studentImage: "/images/Lisa_Chang.png",
    role: "Web Development Student",
    views: 2800,
    difficulty: "Intermediate",
    testimonial: "I started coding last month and I'm already building real projects. The structured path helps me truly understand what I'm doing."
  },
  {
    id: 3,
    title: "Learning Buddy",
    description: "An educational platform that connects students with study partners based on their courses and learning style.",
    image: "/images/study-buddy.png",
    tags: ["React", "Express.js", "MongoDB", "Socket.io"],
    student: "Sarah Chen",
    studentImage: "/images/Sarah_Chen.png",
    role: "CS Major",
    views: 4200,
    difficulty: "Intermediate",
    testimonial: "CommandL changed how I learn code. Everything is in one place and the rewards keep me going."
  },
  {
    id: 4,
    title: "Budget Master",
    description: "A personal finance tracking app with beautiful visualizations and AI-powered spending insights.",
    image: "/images/budget-master.png",
    tags: ["MongoDB", "Express", "React", "Node.js", "Material UI"],
    student: "David Park",
    studentImage: "/images/David_Park.png",
    role: "CS Undergraduate",
    views: 3700,
    difficulty: "Advanced",
    testimonial: "CommandL helped me combine my passion for finance with coding. The project-based learning approach enabled me to build a real-world finance app from scratch."
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "A beginner-friendly weather application showcasing API integration and responsive design.",
    image: "/images/weather.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Chart.js", "OpenWeather API"],
    student: "Emily Thompson",
    studentImage: "/images/Emily_Thompson.png",
    role: "Computer Science Major",
    views: 1900,
    difficulty: "Beginner",
    testimonial: "It's intuitive and the AI feedback is instant. I can focus on coding instead of juggling different resources."
  }
];

export default function Projects() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-white">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 font-nunito">
            Real Projects Built by Our Students in 2 Weeks
          </h1>
          <button className="bg-[#58CC02] hover:bg-[#4CAF02] text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all font-nunito">
            START YOUR PROJECT
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dummyProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 transition-colors duration-300 hover:border-gray-300"
              >
                {/* Project Section */}
                <div className="relative w-full h-auto aspect-[16/9]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 font-nunito">
                      {project.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium font-nunito ${
                      project.difficulty === 'Beginner' ? 'bg-[#58CC02]/10 text-[#58CC02]' :
                      project.difficulty === 'Intermediate' ? 'bg-[#1CB0F6]/10 text-[#1CB0F6]' :
                      'bg-[#CE82FF]/10 text-[#CE82FF]'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2 font-nunito">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-[#1CB0F6]/10 text-[#1CB0F6] rounded-full text-sm font-medium font-nunito"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 font-nunito">
                    <div className="flex items-center space-x-1">
                      <EyeIcon className="h-4 w-4" />
                      <span>{(project.views / 1000).toFixed(1)}k views</span>
                    </div>
                  </div>
                </div>

                {/* Testimonial Section */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={project.studentImage}
                        alt={project.student}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 font-nunito">{project.student}</h4>
                      <p className="text-sm text-gray-600 font-nunito">{project.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic font-nunito">
                    {project.testimonial}
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 