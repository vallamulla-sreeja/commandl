"use client"

import Image from 'next/image';
import { EyeIcon } from '@heroicons/react/24/outline';
import Section from './ui/Section';
import Container from './ui/container';

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

export default function Testimonials() {
  return (
    <Section 
      size="lg"
      className="bg-white dark:bg-surface-900"
      aria-label="Student Testimonials and Projects"
    >
      <Container>
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-surface-900 dark:text-surface-50">
            Student Success Stories
          </h2>
          <p className="text-lg md:text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
            See what our students have built and hear their experiences firsthand. From concept to completion in just 2 weeks.
          </p>
        </header>

          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            role="list"
            aria-label="Student Projects and Testimonials"
          >
            {studentProjects.map((project) => (
              <article
                key={project.id}
                className="bg-white dark:bg-surface-800 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700 transition-all duration-300 hover:border-surface-300 dark:hover:border-surface-600 hover:shadow-lg"
                role="listitem"
              >
                <div className="relative w-full h-auto aspect-[16/9] bg-surface-50 dark:bg-surface-900">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title} project`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={project.id <= 2}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-surface-900 dark:text-surface-50">
                      {project.title}
                    </h3>
                    <span 
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.difficulty === 'Beginner' ? 'bg-primary/10 text-primary dark:bg-primary/20' :
                        project.difficulty === 'Intermediate' ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' :
                        'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
                      }`}
                      aria-label={`Difficulty level: ${project.difficulty}`}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <p className="text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div 
                    className="flex flex-wrap gap-2 mb-4"
                    aria-label="Technologies used"
                  >
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-primary/10 text-primary dark:bg-primary/20 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-surface-600 dark:text-surface-400">
                    <div className="flex items-center space-x-1">
                      <EyeIcon className="h-4 w-4" aria-hidden="true" />
                      <span>{(project.views / 1000).toFixed(1)}k views</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-surface-200 dark:border-surface-700 p-6 bg-surface-50 dark:bg-surface-800/50">
                  <figure>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={project.studentImage}
                          alt={`Profile picture of ${project.student}`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <figcaption>
                        <h4 className="font-semibold text-surface-900 dark:text-surface-50">{project.student}</h4>
                        <p className="text-sm text-surface-600 dark:text-surface-400">{project.role}</p>
                      </figcaption>
                    </div>
                    <blockquote className="text-surface-700 dark:text-surface-300 italic">
                      "{project.testimonial}"
                    </blockquote>
                  </figure>
                </div>
              </article>
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <Link 
              href="/projects"
              className="inline-block bg-[#58CC02] hover:bg-[#4CAF02] text-white font-bold py-3 px-8 rounded-2xl transition-colors duration-300"
              aria-label="View all student projects"
            >
              View All Projects
            </Link>
          </div> */}
        {/* </div> */}
      </Container>
    </Section>
  );
}
