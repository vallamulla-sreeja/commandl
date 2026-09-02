'use client';

import { Nunito } from 'next/font/google';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { fetchAccessToken } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../services/api';
import DaySelector from '../project-task-board-components/DaySelector';
import AssignmentHeader from '../project-task-board-components/AssignmentHeader';
import TaskBoard from '../project-task-board-components/TaskBoard';
import TaskDetails from '../project-task-board-components/TaskDetails';
import { DropResult } from 'react-beautiful-dnd';
import { debounce } from 'lodash';
import { Slide } from 'react-toastify';
import { Crown, CheckCircle2, X } from 'lucide-react';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

interface MoreInfo {
  data: {
    verify_field: {
      type: string;
    };
  };
}

interface ApiSubtask {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  spark_studio?: boolean;
  more_info?: MoreInfo | null;
}

interface ApiTask {
  id: string;
  title: string;
  description?: string;
  subtasks?: ApiSubtask[];
  status?: 'To Do' | 'In Progress' | 'Done';
  day_assigned: number;
}

interface Subtask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  spark_studio?: boolean;
  more_info?: MoreInfo | null;
}

interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
  status: 'To Do' | 'In Progress' | 'Done';
  completed?: boolean;
  day_assigned: number;
  hasLimitedDetails?: boolean;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
}

const markdownLinkStyles = `
  a {
    color: #274c77;
    text-decoration: underline;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  a:hover {
    color: #1e3a5f;
  }
`;

export default function ProjectTaskManager() {
  const fetchRef = useRef(false);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [expandedSubtasks, setExpandedSubtasks] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allTasksCompleted, setAllTasksCompleted] = useState<boolean>(false);
  
  // Initialize to day 1, but we'll update this immediately once we have task data
  const [selectedDay, setSelectedDay] = useState<number>(1);
  
  const [lockedMessageDay, setLockedMessageDay] = useState<number | null>(null);
  const [maxUnlockedDay, setMaxUnlockedDay] = useState<number>(1);
  const [urlInputs, setUrlInputs] = useState<{ [key: string]: string }>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(true);
  const [currentUnlockedTaskId, setCurrentUnlockedTaskId] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [dbTables, setDbTables] = useState<{ [key: string]: string[] }>({});
  const [codeFeedback, setCodeFeedback] = useState<{ 
    [key: string]: { 
      message: string, 
      feedback: string,
      results?: Record<string, unknown>[],
      ran_user_code?: boolean,
      code_to_execute?: string | null
    } 
  }>({});

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  useEffect(() => {
    const fetchData = async () => {
      if (fetchRef.current) return;
      fetchRef.current = true;
      
      // Clear any stored day preference from previous sessions
      sessionStorage.removeItem('selectedDayManuallyChanged');
      
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
        const isPaid = data.isPaid !== false;

        if (projects.length === 0) {
          setAssignment(null);
          setTasks([]);
          setIsInitialized(true);
          setIsLoading(false);
          return;
        }

        const project = projects[0];

        const newAssignment: Assignment = {
          id: project.project_id.toString(),
          title: project.title,
          description: project.description || 'No description provided.'
        };

        const newTasks: Task[] = (project.tasks as ApiTask[] || []).map((task: ApiTask) => {
          // Check if this task has limited details (minimal subtasks data)
          const hasLimitedDetails = task.subtasks?.some(st => 
            !st.description || st.description.trim() === ''
          ) || false;

          const subtasks = (task.subtasks || [])
            .map((st: ApiSubtask) => ({
              id: st.id,
              title: st.title,
              description: st.description || '',
              completed: st.completed || false,
              spark_studio: st.spark_studio || false,
              more_info: st.more_info || null,
            }))
            .sort((a: { id: string; }, b: { id: string; }) => parseInt(a.id) - parseInt(b.id));

          return {
            id: task.id,
            title: task.title,
            description: task.description || '',
            status: task.status || 'To Do',
            subtasks: subtasks,
            day_assigned: task.day_assigned,
            hasLimitedDetails: hasLimitedDetails
          };
        });

        setAssignment(newAssignment);
        setTasks(newTasks);
        setIsPremiumUser(isPaid);
        setIsInitialized(true);
        setIsLoading(false);

      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        setIsInitialized(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Combine tasks-dependent effects
  useEffect(() => {
    if (tasks.length === 0) return;
    
    // Update maxUnlockedDay
    let maxDay = 1;
    for (let day = 1; day <= 14; day++) {
      const dayTasks = tasks.filter(task => task.day_assigned === day);
      const allDayTasksCompleted = dayTasks.length > 0 && dayTasks.every(task => task.status === 'Done');

      if (allDayTasksCompleted) {
        maxDay = day + 1;
      } else {
        break;
      }
    }
    setMaxUnlockedDay(Math.min(maxDay, 14));

    // Determine the current day for the user
    let currentDay = maxDay; // Default to the first unlocked day that isn't completed
    
    // If all days are completed, show the last day
    if (maxDay > 14) {
      currentDay = 14;
    }
    
    // Always set to the current in-progress day when the component first loads
    setSelectedDay(prevDay => {
      // If the user has manually changed the day in this session, respect their choice
      if (sessionStorage.getItem('selectedDayManuallyChanged')) {
        return prevDay;
      }
      // Otherwise, always set to the current in-progress day
      return currentDay;
    });

    // Update allTasksCompleted
    const allDone = tasks.every((task) => task.status === 'Done');
    setAllTasksCompleted(allDone);
    
    // Update currentUnlockedTaskId
    if (tasks.length === 0) {
      setCurrentUnlockedTaskId(null);
      return;
    }

    let unlockedTaskId = tasks[0].id;
    for (let i = 0; i < tasks.length; i++) {
      if (i === 0 || tasks[i - 1].subtasks.every(st => st.completed)) {
        unlockedTaskId = tasks[i].id;
      } else {
        break;
      }
    }
    setCurrentUnlockedTaskId(unlockedTaskId);
  }, [tasks]);

  const getTaskProgress = (task: Task) => {
    const completed = task.subtasks.filter((st) => st.completed).length;
    const total = task.subtasks.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const isTaskLocked = (task: Task): boolean => {
    // For unpaid users with limited details tasks
    if (!isPremiumUser && task.hasLimitedDetails) {
      return true;
    }
    
    // For paid users, use the original locking logic
    if (!currentUnlockedTaskId) return task.id !== tasks[0]?.id;
     
    const taskIndex = tasks.findIndex(t => t.id === task.id);
    if (taskIndex === 0) return false;
     
    const previousTask = tasks[taskIndex - 1];
    return !previousTask.subtasks.every(st => st.completed);
  };

  const getVerificationKey = (subtaskId: string, value: string) => `${subtaskId}:${value}`;

  const debouncedSaveProgress = useMemo(() => 
    debounce(async (updatedTasks: Task[]) => {
      const savingToastId = toast.info('Saving changes...', {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        className: 'bg-blue-500 text-white font-medium'
      });

      try {
        const token = await fetchAccessToken();
        const response = await fetch(`${BASE_URL}/save-progress-project-building`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tasks: updatedTasks.map((task) => ({
              id: task.id,
              status: task.status,
              subtasks: task.subtasks.map((st) => ({
                id: st.id,
                completed: st.completed,
                input: st.more_info?.data?.verify_field ? urlInputs[st.id] || '' : undefined,
                db_tables: st.more_info?.data?.verify_field?.type === 'db_connection_string' ? dbTables[urlInputs[st.id] || ''] || [] : undefined,
                feedback: st.more_info?.data?.verify_field?.type === 'code_verify' && urlInputs[st.id] ? 
                  (codeFeedback[getVerificationKey(st.id, urlInputs[st.id])] || codeFeedback[urlInputs[st.id]]) : undefined
              }))
            })),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save progress');
        }

        toast.dismiss(savingToastId);
        toast.success('Progress saved!', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      } catch (error) {
        console.error('Error saving progress:', error);
        toast.dismiss(savingToastId);
        toast.error('Failed to save progress. Please try again.', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    }, 1000),
    [urlInputs, dbTables, codeFeedback]
  );

  const handleSaveProgress = useCallback((updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    debouncedSaveProgress(updatedTasks);
  }, [debouncedSaveProgress]);

  const taskHasSparkStudio = (task: Task) => {
    return task.subtasks.some((st) => st.spark_studio === true);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const task = tasks.find((t) => t.id === draggableId);
    if (!task || task.day_assigned > maxUnlockedDay) return;

    // For unpaid users, only block premium task movements
    if (!isPremiumUser && task.hasLimitedDetails) {
      toast.error('Upgrade to premium to move this task', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      
      // Show a toast with an upgrade button
      toast.info(
        <div className="flex flex-col items-center">
          <p className="mb-2">Upgrade to premium to access all features</p>
          <button
            className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
            onClick={() => {
              window.open('https://buy.stripe.com/eVa9DB3fr9og0RqeUZ', '_blank');
            }}
          >
            Upgrade Now
          </button>
        </div>,
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        }
      );
      
      return;
    }

    const sourceStatus = source.droppableId as Task['status'];
    const destStatus = destination.droppableId as Task['status'];

    if (sourceStatus === destStatus) return;

    if (destStatus === 'Done') {
      const allSubtasksCompleted = task.subtasks.every((subtask) => subtask.completed);
      if (!allSubtasksCompleted) {
        toast.error('Complete all subtasks before moving to Done', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        return;
      }
    }

    const movingToInProgressFromDifferentStatus =
      destStatus === 'In Progress' && sourceStatus !== 'In Progress';

    const updatedTasks = tasks.map((t) =>
      t.id === draggableId ? { ...t, status: destStatus } : t
    );

    handleSaveProgress(updatedTasks);

    if (movingToInProgressFromDifferentStatus && taskHasSparkStudio(task)) {
      toast.info(
        "This task will be completed on CommandL. Please open CommandL. See task details for more info.",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        }
      );
    }
  };

  const handleSubtaskToggle = (taskId: string, subtaskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.day_assigned > maxUnlockedDay) {
      return;
    }

    // For unpaid users, only block premium tasks
    if (!isPremiumUser && task.hasLimitedDetails) {
      toast.error('Upgrade to premium to complete this task', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }

    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            subtasks: t.subtasks.map((st) =>
              st.id === subtaskId ? { ...st, completed: !st.completed } : st
            ),
          }
        : t
    );

    handleSaveProgress(updatedTasks);
  };

  const handleTaskClick = (task: Task) => {
    if (task.day_assigned > maxUnlockedDay) {
      const dayDifference = task.day_assigned - maxUnlockedDay;
      setLockedMessageDay(task.day_assigned);
      toast.error(
        `This task is locked. Complete Day ${maxUnlockedDay - 1} to unlock Day ${task.day_assigned}.`,
        {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        }
      );
      return;
    }

    // For unpaid users, show premium modal for limited tasks
    if (!isPremiumUser && task.hasLimitedDetails) {
      setShowPremiumModal(true);
      return;
    }

    setSelectedTaskId(task.id);
  };

  const toggleSubtaskDescription = (subtaskId: string) => {
    setExpandedSubtasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subtaskId)) {
        newSet.delete(subtaskId);
      } else {
        newSet.add(subtaskId);
      }
      return newSet;
    });
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    sessionStorage.setItem('selectedDayManuallyChanged', 'true');
    setLockedMessageDay(null);
  };

  const closeTaskDetails = () => {
    setSelectedTaskId(null);
  };

  const filteredTasks = tasks.filter((task) => task.day_assigned === selectedDay);

  const handleUrlChange = (subtaskId: string, value: string) => {
    setUrlInputs(prev => ({
      ...prev,
      [subtaskId]: value
    }));
  };

  const handleOpenPremiumModal = () => {
    setShowPremiumModal(true);
  };
  
  const handleClosePremiumModal = () => {
    setShowPremiumModal(false);
  };

  // Premium Features Modal Component
  const PremiumFeaturesModal = () => {
    if (!showPremiumModal) return null;
    
    const features = [
      {
        title: "1 Year Full Access to CommandL",
        description: "Complete access to our powerful development environment with built-in AI assistance"
      },
      {
        title: "3 Months Unlimited AI Resume Generator",
        description: "Position yourself in the top 1% of job candidates with our advanced resume tool"
      },
      {
        title: "14 Days Daily Mentorship",
        description: "Get direct guidance from our founders and domain experts"
      },
      {
        title: "Advanced Projects Access",
        description: "Access to advanced projects as long as you have access to CommandL"
      },
      {
        title: "Full Stack Completion Certification",
        description: "Earn an official CommandL project completion certificate"
      },
      {
        title: "Weekly New Projects",
        description: "We're constantly adding new projects including AI/ML and App Development"
      }
    ];
    
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4"
        onClick={handleClosePremiumModal}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-[#58CC02] to-[#1cb0f6] p-4 sm:p-6 relative">
            <button
              onClick={handleClosePremiumModal}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 text-white hover:bg-white/20 p-1.5 sm:p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex items-center mb-2">
              <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-white mr-3" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Upgrade to Premium</h2>
            </div>
            <p className="text-white/90 text-sm sm:text-base">Unlock all features and accelerate your learning journey</p>
          </div>

          {/* Features list */}
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#58CC02] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{feature.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.open('https://buy.stripe.com/eVa9DB3fr9og0RqeUZ', '_blank')}
                className="flex-1 bg-gradient-to-r from-[#58CC02] to-[#1cb0f6] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
              >
                Upgrade Now - $39/month
              </button>
              <button
                onClick={handleClosePremiumModal}
                className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#58cc02]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-600 mb-2">Error loading project data</div>
          <div className="text-gray-600 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  if (!assignment || tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-gray-600 mb-2">No project found</div>
          <div className="text-gray-500 text-sm">Please enroll in a project to continue</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${nunito.className} min-h-screen bg-gray-50`}>
      <style jsx>{markdownLinkStyles}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Assignment Header */}
        <AssignmentHeader 
          assignment={assignment}
          allTasksCompleted={allTasksCompleted}
        />

        {/* Day Selector */}
        <DaySelector
          maxUnlockedDay={maxUnlockedDay}
          selectedDay={selectedDay}
          onDaySelect={handleDaySelect}
          lockedMessageDay={lockedMessageDay}
          isDayCompleted={(day: number) => {
            const dayTasks = tasks.filter(task => task.day_assigned === day);
            return dayTasks.length > 0 && dayTasks.every(task => task.status === 'Done');
          }}
          completedDays={(() => {
            const completed = [];
            for (let day = 1; day <= 14; day++) {
              const dayTasks = tasks.filter(task => task.day_assigned === day);
              if (dayTasks.length > 0 && dayTasks.every(task => task.status === 'Done')) {
                completed.push(day);
              }
            }
            return completed;
          })()}
        />

        {/* Task Board */}
        <TaskBoard
          tasks={filteredTasks}
          maxUnlockedDay={maxUnlockedDay}
          currentUnlockedTaskId={currentUnlockedTaskId}
          isPremiumUser={isPremiumUser}
          expandedSubtasks={expandedSubtasks}
          urlInputs={urlInputs}
          dbTables={dbTables}
          codeFeedback={codeFeedback}
          getTaskProgress={getTaskProgress}
          isTaskLocked={isTaskLocked}
          onDragEnd={onDragEnd}
          onSubtaskToggle={handleSubtaskToggle}
          onTaskClick={handleTaskClick}
          onToggleSubtaskDescription={toggleSubtaskDescription}
          onUrlChange={handleUrlChange}
          onOpenPremiumModal={handleOpenPremiumModal}
        />

        {/* Task Details Modal */}
        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            expandedSubtasks={expandedSubtasks}
            urlInputs={urlInputs}
            dbTables={dbTables}
            codeFeedback={codeFeedback}
            isPremiumUser={isPremiumUser}
            maxUnlockedDay={maxUnlockedDay}
            currentUnlockedTaskId={currentUnlockedTaskId}
            onClose={closeTaskDetails}
            onSubtaskToggle={handleSubtaskToggle}
            onToggleSubtaskDescription={toggleSubtaskDescription}
            onUrlChange={handleUrlChange}
            onOpenPremiumModal={handleOpenPremiumModal}
          />
        )}

        {/* Premium Modal */}
        <PremiumFeaturesModal />

        {/* Toast Container */}
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
          transition={Slide}
          limit={3}
        />
      </div>
    </div>
  );
} 