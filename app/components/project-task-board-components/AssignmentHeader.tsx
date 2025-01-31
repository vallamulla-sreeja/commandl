import React, { useState } from 'react';
import ProjectDescriptionModal from './ProjectDescriptionModal';

interface AssignmentHeaderProps {
  title: string;
  description: string;
}

const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({ title, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mb-8 flex flex-col items-center  max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-[#4b4b4b]">{title}</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-[#4b4b4b] bg-white border border-[#4b4b4b] rounded-md hover:bg-[#4b4b4b] hover:text-white transition-colors duration-200"
      >
        View Project Details
      </button>

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