'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TagIcon, UserGroupIcon, EyeIcon } from '@heroicons/react/24/outline';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  students: string[];
  views: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "AI Task Manager",
    description: "A smart task management system that uses AI to prioritize and categorize tasks. Built with Next.js, TypeScript, and OpenAI API.",
    image: "/images/ai-task-manager.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "OpenAI API"],
    students: ["Nina Patel"],
    views: 5600,
    difficulty: "Advanced"
  },
  {
    id: 2,
    title: "EcoTracker",
    description: "A web application that helps users track their carbon footprint and suggests ways to reduce environmental impact.",
    image: "/images/eco.png",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    students: ["Lisa Chang"],
    views: 2800,
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "Learning Buddy",
    description: "An educational platform that connects students with study partners based on their courses and learning style.",
    image: "/images/study-buddy.png",
    tags: ["React", "Express.js", "MongoDB", "Socket.io"],
    students: ["Sarah Chen"],
    views: 4200,
    difficulty: "Intermediate"
  }
];

export default function FeaturedProjects() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-[#58cc02]">
            Featured Student Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what our students have built in just 2 weeks. From AI-powered applications to environmental impact trackers,
            see how they're making a difference through code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.difficulty === 'Beginner' ? 'bg-[#58CC02]/10 text-[#58CC02]' :
                    project.difficulty === 'Intermediate' ? 'bg-[#1CB0F6]/10 text-[#1CB0F6]' :
                    'bg-[#CE82FF]/10 text-[#CE82FF]'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <UserGroupIcon className="h-4 w-4" />
                    <span>{project.students.join(', ')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <EyeIcon className="h-4 w-4" />
                    <span>{(project.views / 1000).toFixed(1)}k views</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-[#1CB0F6]/10 text-[#1CB0F6] rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/projects"
            className="inline-block bg-[#58CC02] hover:bg-[#4CAF02] text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
} 