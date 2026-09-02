'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ProjectSelection from '../dashboard/ProjectSelection';
import GoalsSection from '../dashboard/GoalsSection';
import EnrollmentSummary from '../dashboard/EnrollmentSummary';
import { fetchAccessToken, BASE_URL } from '../../services/api';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
};

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Virtual chatbot',
    description: 'Build a virtual chatbot that can answer questions and help users with their queries.',
    image: '/images/frontend_development.png',
    color: 'bg-[#ffffff]'
  },
  {
    id: '2',
    title: 'Flashcard Study Tool',
    description: 'Create a flashcard study tool that can help users study for their exams.',
    image: '/images/backend_development.png',
    color: 'bg-[#ffffff]'
  },
  {
    id: '3',
    title: 'Blog Manager',
    description: 'Develop a blog manager that can help users manage their blog posts.',
    image: '/images/software_development.png',
    color: 'bg-[#ffffff]'
  }
];

export default function ProjectEnrollment() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Start with goals (step 1)
  
  // These state variables are kept for compatibility with the EnrollmentSummary component
  const [resumeFile] = useState<File | null>(null);
  const [about] = useState('');

  const handleProjectSelection = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => {
      if (prev.includes(goalId)) {
        return prev.filter(id => id !== goalId);
      }
      return [...prev, goalId];
    });
  };

  const handleSubmit = async () => {
    if (isEnrolling) return; // Prevent multiple submissions
    setIsEnrolling(true);
    
    try {
      // Get the selected project details
      const project = PROJECTS.find(p => p.id === selectedProject);
      if (!project) throw new Error('Project not found');
      
      // Now make the API call to generate project tasks
      const accessToken = await fetchAccessToken();
      const response = await fetch(`${BASE_URL}/generate-14-day-project-tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          project_name: project.title.toLowerCase().replace(/\s+/g, '_'),
          project_description: project.description,
          goals: selectedGoals
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate project tasks');
      }

      const data = await response.json();
      if (data.message === 'Tasks and subtasks stored successfully') {
        // First set enrollment success
        setEnrollmentSuccess(true);
        // Then reset loading state
        setIsEnrolling(false);
        // Finally redirect after a short delay
        setTimeout(() => {
          router.push('/projects'); // Redirect to projects instead of project-task-board
        }, 1500);
      } else {
        throw new Error('Failed to generate project tasks');
      }
    } catch (error) {
      console.error('Error during project enrollment:', error);
      toast.error('Failed to enroll in project. Please try again.');
      setIsEnrolling(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <GoalsSection
            selectedGoals={selectedGoals}
            onGoalToggle={handleGoalToggle}
            onContinue={() => selectedGoals.length >= 3 && setCurrentStep(2)}
            onBack={() => {}}
          />
        );
      case 2:
        return (
          <ProjectSelection
            projects={PROJECTS}
            selectedProject={selectedProject}
            onProjectSelect={handleProjectSelection}
            onContinue={() => selectedProject && setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        const project = PROJECTS.find(p => p.id === selectedProject);
        if (!project) return null;
        return (
          <EnrollmentSummary
            resumeFile={resumeFile}
            about={about}
            selectedGoals={selectedGoals}
            selectedProject={project}
            onBack={() => setCurrentStep(2)}
            onEnroll={handleSubmit}
            isEnrolling={isEnrolling}
          />
        );
      default:
        return null;
    }
  };

  if (enrollmentSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enrollment Successful!</h2>
          <p className="text-gray-600">Redirecting you to your project...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-0.5 ${
                      step < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="text-sm text-gray-500">
              Step {currentStep} of 3: {
                currentStep === 1 ? 'Select Goals' :
                currentStep === 2 ? 'Choose Project' :
                'Review & Enroll'
              }
            </div>
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </div>
    </div>
  );
} 