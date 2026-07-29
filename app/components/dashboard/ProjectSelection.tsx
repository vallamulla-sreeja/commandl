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

interface ProjectSelectionProps {
  projects: Project[];
  selectedProject: string;
  onProjectSelect: (projectId: string) => void;
  onContinue: () => void;
}

export default function ProjectSelection({ projects, selectedProject, onProjectSelect, onContinue }: ProjectSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Project</h2>
        <p className="text-xl text-gray-600">
          Select a project that aligns with your interests and skills
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.02 }}
            className={`bg-white rounded-2xl overflow-hidden border border-[#58CC02] shadow-sm transition-all cursor-pointer ${
              selectedProject === project.id ? 'ring-2 ring-[#58CC02]' : 'hover:shadow-lg'
            }`}
            onClick={() => onProjectSelect(project.id)}
          >
            <div className={`relative w-full h-48 ${project.color}`}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={onContinue}
          className={`px-12 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
            !selectedProject
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-[#58CC02] text-white hover:bg-[#58CC02]/90'
          }`}
          disabled={!selectedProject}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
} 