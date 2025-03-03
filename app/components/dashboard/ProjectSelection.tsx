import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface ProjectSelectionProps {
  projects: Project[];
  selectedProject: string;
  onProjectSelect: (projectId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function ProjectSelection({ projects, selectedProject, onProjectSelect, onContinue, onBack }: ProjectSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Project</h2>
        <p className="text-xl text-gray-600">
          Select a project that aligns with your goals
        </p>
        <div className="mt-3 text-sm text-gray-500 bg-blue-50 p-3 rounded-lg inline-block">
          <span className="font-medium">Note:</span> We add new projects every week! You'll gain access to all projects after completing your first 14-day project.
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.02 }}
            className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-colors duration-300 ${
              selectedProject === project.id
                ? 'border-[#58CC02] shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onProjectSelect(project.id)}
          >
            <div className={`h-48 relative ${project.color}`}>
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex justify-between gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-xl text-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className={`flex-1 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
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