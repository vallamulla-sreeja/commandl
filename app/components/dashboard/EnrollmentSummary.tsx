import { motion } from 'framer-motion';
import { DocumentArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface EnrollmentSummaryProps {
  resumeFile?: File | null;
  about?: string;
  selectedGoals: string[];
  selectedProject: Project;
  onBack: () => void;
  onEnroll: () => Promise<void>;
  isEnrolling: boolean;
}

export default function EnrollmentSummary({
  resumeFile,
  about,
  selectedGoals,
  selectedProject,
  onBack,
  onEnroll,
  isEnrolling
}: EnrollmentSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Review & Begin</h2>
        <p className="text-xl text-gray-600">
          Please review your project details before starting
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 space-y-6">
        {/* Project Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Selected Project</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900">{selectedProject.title}</h4>
            <p className="text-gray-600 mt-1">{selectedProject.description}</p>
          </div>
        </div>

        {/* Resume - Only show if resumeFile exists */}
        {resumeFile && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume</h3>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center">
              <DocumentArrowUpIcon className="w-6 h-6 text-gray-400 mr-3" />
              <span className="text-gray-600">{resumeFile.name}</span>
            </div>
          </div>
        )}

        {/* About - Only show if about exists and is not empty */}
        {about && about.trim() !== '' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About You</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-600">{about}</p>
            </div>
          </div>
        )}

        {/* Goals */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Goals</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <ul className="space-y-2">
              {selectedGoals.map((goal, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <CheckCircleIcon className="w-5 h-5 text-[#58CC02] mr-2" />
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isEnrolling}
            className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={onEnroll}
            disabled={isEnrolling}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 
              ${isEnrolling 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-[#58CC02] text-white hover:bg-[#58CC02]/90'}`}
          >
            {isEnrolling ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Enrolling...
              </div>
            ) : (
              'Begin Your Journey'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
} 