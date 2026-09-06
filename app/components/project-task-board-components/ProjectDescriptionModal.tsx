import React from 'react';
import { X, BookOpen } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={handleOverlayClick}
    >
      <div
        onClick={handleModalClick}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300"
      >
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-b border-emerald-100 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  {title}
                </h2>
                <p className="text-emerald-600 font-semibold text-lg">
                  Project Overview & Requirements
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-3 hover:bg-white/80 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="prose prose-lg max-w-none">
            <style jsx>{`
              .prose {
                color: #374151;
                line-height: 1.75;
              }
              .prose h1, .prose h2, .prose h3, .prose h4 {
                color: #1f2937;
                font-weight: 700;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              .prose h1 {
                font-size: 2rem;
                border-bottom: 2px solid #10b981;
                padding-bottom: 0.5rem;
              }
              .prose h2 {
                font-size: 1.5rem;
                color: #059669;
              }
              .prose h3 {
                font-size: 1.25rem;
                color: #0d9488;
              }
              .prose p {
                margin-bottom: 1.5rem;
                color: #4b5563;
                font-weight: 500;
              }
              .prose ul, .prose ol {
                margin: 1.5rem 0;
                padding-left: 2rem;
              }
              .prose li {
                margin: 0.75rem 0;
                color: #4b5563;
                font-weight: 500;
              }
              .prose a {
                color: #1a56db;
                text-decoration: underline;
                font-weight: 600;
                transition: all 0.2s ease;
              }
              .prose a:hover {
                color: #1e40af;
                text-shadow: 0 0 8px rgba(26, 86, 219, 0.2);
              }
              .prose strong {
                color: #1f2937;
                font-weight: 700;
              }
              .prose em {
                color: #6b7280;
                font-style: italic;
              }
              .prose code {
                background-color: #f3f4f6;
                color: #1f2937;
                padding: 0.25rem 0.5rem;
                border-radius: 0.375rem;
                font-size: 0.875rem;
                font-weight: 600;
              }
              .prose pre {
                background-color: #1f2937;
                color: #f9fafb;
                padding: 1rem;
                border-radius: 0.75rem;
                overflow-x: auto;
                margin: 1.5rem 0;
              }
              .prose blockquote {
                border-left: 4px solid #10b981;
                background-color: #ecfdf5;
                padding: 1rem 1.5rem;
                margin: 1.5rem 0;
                border-radius: 0 0.5rem 0.5rem 0;
                color: #065f46;
                font-style: italic;
              }
            `}</style>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>

          {/* Enhanced Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Ready to Begin?</h3>
              </div>
              <p className="text-gray-700 font-medium mb-4">
                This comprehensive project will guide you through real-world development scenarios and help you build valuable portfolio pieces.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white rounded-lg border border-emerald-200">
                  <div className="text-xl font-bold text-emerald-600">14</div>
                  <div className="text-sm text-gray-600">Days of Learning</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-emerald-200">
                  <div className="text-xl font-bold text-blue-600">7</div>
                  <div className="text-sm text-gray-600">Project Phases</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-emerald-200">
                  <div className="text-xl font-bold text-teal-600">100%</div>
                  <div className="text-sm text-gray-600">Hands-on Practice</div>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescriptionModal; 