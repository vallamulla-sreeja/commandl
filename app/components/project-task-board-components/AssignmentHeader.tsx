import React, { useState } from 'react';
import { BookOpen, Info } from 'lucide-react';
import ProjectDescriptionModal from './ProjectDescriptionModal';

interface AssignmentHeaderProps {
  title: string;
  description: string;
}

const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({ title, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mb-12 flex flex-col items-center max-w-4xl mx-auto">
      {/* Enhanced Header with Icon */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-4 leading-tight">
          {title}
        </h1>
        
        <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Your comprehensive project-based learning journey
        </p>
      </div>

      {/* Enhanced CTA Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="group relative inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
      >
        {/* Button background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative flex items-center space-x-3">
          <Info className="w-6 h-6 group-hover:animate-pulse" />
          <span>View Project Details</span>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </button>

      {/* Additional Project Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-bold text-emerald-600">14</div>
          <div className="text-sm font-medium text-gray-700">Days</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-bold text-blue-600">7</div>
          <div className="text-sm font-medium text-gray-700">Phases</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-bold text-teal-600">∞</div>
          <div className="text-sm font-medium text-gray-700">Learning</div>
        </div>
      </div>

      <ProjectDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
      />
    </div>
  );
};

export default AssignmentHeader;