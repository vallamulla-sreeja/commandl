"use client"

import Image from 'next/image';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  student: string;
  views: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  testimonial: string;
  studentImage: string;
  role: string;
}

const studentProjects: Project[] = [
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

export const metadata: Metadata = {
  title: 'Student Success Stories - CommandL Learning Platform',
  description: 'Discover inspiring success stories from CommandL students who built impressive projects in just 2 weeks. From AI applications to web development, see real-world examples of student achievements.',
  keywords: 'coding bootcamp, student projects, programming success stories, learn to code, web development, AI development',
  openGraph: {
    title: 'Student Success Stories - CommandL Learning Platform',
    description: 'Discover inspiring success stories from CommandL students who built impressive projects in just 2 weeks.',
    images: ['/images/ai-task-manager.png'],
  }
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <article
      ref={ref}
      className={`bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all duration-700 hover:border-gray-300 hover:shadow-2xl hover:scale-[1.02] group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      role="listitem"
    >
      {/* Gradient glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/0 via-green-400/0 to-blue-400/0 group-hover:from-purple-400/20 group-hover:via-green-400/20 group-hover:to-blue-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      
      <div className="relative w-full h-auto aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title} project`}
          fill
          className={`object-contain transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={project.id <= 2}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900 font-nunito group-hover:text-green-600 transition-colors duration-300">
            {project.title}
          </h2>
          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium font-nunito transition-all duration-300 group-hover:scale-110 ${
              project.difficulty === 'Beginner' ? 'bg-[#58CC02]/10 text-[#58CC02] group-hover:bg-[#58CC02]/20' :
              project.difficulty === 'Intermediate' ? 'bg-[#1CB0F6]/10 text-[#1CB0F6] group-hover:bg-[#1CB0F6]/20' :
              'bg-[#CE82FF]/10 text-[#CE82FF] group-hover:bg-[#CE82FF]/20'
            }`}
            aria-label={`Difficulty level: ${project.difficulty}`}
          >
            {project.difficulty}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2 font-nunito group-hover:text-gray-800 transition-colors duration-300">
          {project.description}
        </p>

        <div 
          className="flex flex-wrap gap-2 mb-4"
          aria-label="Technologies used"
        >
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2.5 py-1 bg-[#1CB0F6]/10 text-[#1CB0F6] rounded-full text-sm font-medium font-nunito transition-all duration-300 hover:bg-[#1CB0F6]/20 hover:scale-105"
              style={{ transitionDelay: `${tagIndex * 50}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 font-nunito">
          <div className="flex items-center space-x-1 group-hover:text-gray-800 transition-colors duration-300">
            <EyeIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <span>{(project.views / 1000).toFixed(1)}k views</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 p-6 bg-gradient-to-br from-gray-50/50 to-gray-100/50 group-hover:from-gray-50 group-hover:to-gray-100 transition-all duration-300">
        <figure>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-transparent group-hover:ring-green-200 transition-all duration-300">
              <Image
                src={project.studentImage}
                alt={`Profile picture of ${project.student}`}
                width={48}
                height={48}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <figcaption>
              <h3 className="font-semibold text-gray-900 font-nunito group-hover:text-green-600 transition-colors duration-300">{project.student}</h3>
              <p className="text-sm text-gray-600 font-nunito group-hover:text-gray-700 transition-colors duration-300">{project.role}</p>
            </figcaption>
          </div>
          <blockquote className="text-gray-700 italic font-nunito group-hover:text-gray-800 transition-colors duration-300 relative">
            <span className="absolute -top-2 -left-2 text-4xl text-green-200 font-serif">&ldquo;</span>
            {project.testimonial}
            <span className="absolute -bottom-4 -right-2 text-4xl text-green-200 font-serif">&rdquo;</span>
          </blockquote>
        </figure>
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <>
      <Head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
        <meta name="keywords" content={metadata.keywords as string} />
      </Head>
      <section 
        className="py-16 px-4 bg-gradient-to-b from-white via-green-50/15 to-white relative overflow-hidden"
        aria-label="Student Testimonials and Projects"
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main gradient orbs - well positioned within bounds */}
          <div className="absolute top-24 left-20 w-80 h-80 bg-gradient-to-r from-emerald-100/20 to-cyan-100/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-72 h-72 bg-gradient-to-r from-teal-100/20 to-blue-100/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-green-100/15 to-lime-100/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '8s' }}></div>
          
          {/* Minimal floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full animate-bounce opacity-25"
              style={{
                left: `${25 + Math.random() * 50}%`,
                top: `${25 + Math.random() * 50}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#58cc02] to-[#4CAF02] bg-clip-text text-transparent font-nunito">
              Student Success Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
              See what our students have built and hear their experiences firsthand. From concept to completion in just 2 weeks.
            </p>
            {/* Decorative line */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 rounded-full"></div>
            </div>
          </header>

          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            role="list"
            aria-label="Student Projects and Testimonials"
          >
            {studentProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
