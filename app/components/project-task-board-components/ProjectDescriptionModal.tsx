import React from 'react';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ProjectDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const ProjectDescriptionModal: React.FC<ProjectDescriptionModalProps> = ({
  isOpen,
  onClose,
  title,
  description
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={handleOverlayClick}
    >
      <div
        onClick={handleModalClick}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#274c77]">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="prose max-w-none">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescriptionModal; 