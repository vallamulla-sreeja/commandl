'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchAccessToken } from '../services/api';
import { BASE_URL } from '../services/api';
import ProjectRoadmapStandalone from '../components/project-task-board-components/ProjectRoadmapStandalone';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface ApiTask {
  id: string;
  status?: 'To Do' | 'In Progress' | 'Done';
  day_assigned: number;
}

const ProjectProgressClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<ApiTask[]>([]);
  const [urlParamDays, setUrlParamDays] = useState<number[]>([]);
  const [isUrlParamValid, setIsUrlParamValid] = useState<boolean>(false);

  // Validate URL parameter data against API data
  const validateUrlParamData = useCallback(() => {
    // Only run validation if we have both tasks and urlParamDays
    if (tasks.length === 0 || urlParamDays.length === 0) {
      return;
    }
    
    // Get actual completed days from tasks
    const actualCompletedDays = new Map<number, boolean>();
    for (let day = 1; day <= 14; day++) {
      const dayTasks = tasks.filter(task => task.day_assigned === day);
      const completed = dayTasks.length > 0 && dayTasks.every(task => task.status === 'Done');
      actualCompletedDays.set(day, completed);
    }

    // Check if URL param days match actual completed days
    const allDaysValid = urlParamDays.every(day => actualCompletedDays.get(day) === true);
    
    setIsUrlParamValid(allDaysValid);
  }, [tasks, urlParamDays]);

  useEffect(() => {
    // Parse URL parameters if present
    if (dataParam) {
      try {
        const days = dataParam.split(',').map(day => parseInt(day, 10));
        setUrlParamDays(days);
      } catch (err) {
        console.error("Error parsing URL data:", err);
      }
    }

    // Always fetch data from API for validation purposes
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        const token = await fetchAccessToken();
        const response = await fetch(`${BASE_URL}/projects-with-tasks`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }

        const data = await response.json();
        const projects = data.projects || [];

        if (projects.length === 0) {
          setTasks([]);
          setIsLoading(false);
          return;
        }

        const project = projects[0];
        setTasks(project.tasks || []);
        setIsLoading(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dataParam]);

  // Separate useEffect to handle validation after tasks and urlParamDays are set
  useEffect(() => {
    // Only validate if we have the necessary data
    if (dataParam && tasks.length > 0 && urlParamDays.length > 0) {
      // Add a small delay to ensure we're not caught in a render loop
      const timeoutId = setTimeout(() => {
        validateUrlParamData();
      }, 0);
      
      return () => clearTimeout(timeoutId);
    }
  }, [dataParam, tasks, urlParamDays, validateUrlParamData]);

  // Calculate completed days from tasks data, which is our source of truth
  const calculatedCompletedDaysArray = useMemo(() => {
    const completedDays: number[] = [];
    for (let day = 1; day <= 14; day++) {
      const dayTasks = tasks.filter(task => task.day_assigned === day);
      const completed = dayTasks.length > 0 && dayTasks.every(task => task.status === 'Done');
      if (completed) {
        completedDays.push(day);
      }
    }
    return completedDays;
  }, [tasks]);

  // Decide which data to use based on validation
  const displayCompletedDays = useMemo(() => {
    // If URL param is present and valid, use it for faster loading
    // Otherwise, always use the calculated data from the API
    return (dataParam && isUrlParamValid && urlParamDays.length > 0) 
      ? urlParamDays 
      : calculatedCompletedDaysArray;
  }, [dataParam, isUrlParamValid, urlParamDays, calculatedCompletedDaysArray]);

  const handleBackToTasks = () => {
    router.push('/project-task-board');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">Loading your progress roadmap...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-red-600 mb-2">Error Loading Progress</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={handleBackToTasks}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105 group"
          >
            <div className="p-2 bg-white rounded-xl shadow-md mr-3 group-hover:shadow-lg transition-all duration-300">
              <ArrowLeft className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg">Back to Tasks</span>
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 mb-8 overflow-hidden">
          <ProjectRoadmapStandalone completedDays={displayCompletedDays} />
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressClient; 