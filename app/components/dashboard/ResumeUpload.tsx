import { motion } from 'framer-motion';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';
// import { useState } from 'react';
import { toast } from 'react-toastify';

interface ResumeUploadProps {
  resumeFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: () => void;
}

export default function ResumeUpload({ resumeFile, onFileChange, onContinue }: ResumeUploadProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    const fiveMB = 5 * 1024 * 1024;
    if (file.size > fiveMB) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, DOC, and DOCX files are allowed');
      return;
    }

    onFileChange(e); // Update parent component with validated file
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Resume</h2>
        {/* <p className="text-xl text-gray-600">
          Let&apos;s start by uploading your resume to help us understand your background
        </p> */}
      </div>
      <div className="bg-white rounded-2xl p-8">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <DocumentArrowUpIcon className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 mb-2">
              {resumeFile ? resumeFile.name : "Click or drag to upload resume"}
            </p>
            <p className="text-sm text-gray-500">PDF, DOC, or DOCX (max. 5MB)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            accept=".pdf,.doc,.docx"
          />
        </label>
        <button
          onClick={onContinue}
          disabled={!resumeFile}
          className={`w-full mt-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 
            ${!resumeFile ? 
              'bg-gray-200 text-gray-500 cursor-not-allowed' : 
              'bg-[#58CC02] text-white hover:bg-[#58CC02]/90'}`}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
} 