import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  techStack: string[];
}

interface EnrollmentProps {
  projects: Project[];
  selectedProject: string;
  isEnrolling: boolean;
  onEnroll: () => void;
}

export default function Enrollment({ projects, selectedProject, isEnrolling, onEnroll }: EnrollmentProps) {
  const project = projects.find(p => p.id === selectedProject);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Begin?</h2>
        <div className="space-y-4 mb-8">
          <p className="text-xl text-gray-600">
            You&apos;ve selected a project. Click below to start your journey!
          </p>
          {project && (
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className={`relative w-16 h-16 ${project.color} rounded-lg overflow-hidden`}>
                  <Image
                    src={project.image}
                    alt="Project"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          className="w-full py-4 rounded-xl text-lg font-semibold bg-[#58CC02] text-white hover:bg-[#58CC02]/90 transition-colors duration-300"
          onClick={onEnroll}
          disabled={isEnrolling}
        >
          {isEnrolling ? 'Enrolling...' : 'Begin Your Journey'}
        </button>
      </div>
    </motion.div>
  );
} 