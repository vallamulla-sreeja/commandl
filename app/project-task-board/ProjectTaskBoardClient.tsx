'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { fetchAccessToken } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../services/api';
import ApplyFor10DayProgram from '../components/project-task-board-components/applyFor10DayProgram';
// import CountdownTimer from '../components/project-task-board-components/CountdownTimer';
import DaySelector from '../components/project-task-board-components/DaySelector';
import AssignmentHeader from '../components/project-task-board-components/AssignmentHeader';
import TaskBoard from '../components/project-task-board-components/TaskBoard';
import TaskDetails from '../components/project-task-board-components/TaskDetails';
import { DropResult } from 'react-beautiful-dnd';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

interface Subtask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  spark_studio?: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
  status: 'To Do' | 'In Progress' | 'Done';
  completed?: boolean;
  day_assigned: number;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
}

interface ClientProps {
  params: {
    id: string;
    sectionId: string;
    assignmentId: string;
  };
}

interface Project {
  project_id: number;
  title: string;
  description: string;
  tasks: ProjectTask[];
}

interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  subtasks: ProjectSubtask[];
  day_assigned: number;
}

interface ProjectSubtask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  spark_studio?: boolean;
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

export default function ProjectTaskBoardClient({ params }: ClientProps) {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [expandedSubtasks, setExpandedSubtasks] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allTasksCompleted, setAllTasksCompleted] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [lockedMessageDay, setLockedMessageDay] = useState<number | null>(null);
  const [maxUnlockedDay, setMaxUnlockedDay] = useState<number>(1);

//   const [timeRemaining, setTimeRemaining] = useState<{
//     days: number;
//     hours: number;
//     minutes: number;
//     seconds: number;
//   }>({ days: 10, hours: 0, minutes: 0, seconds: 0 });

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  const fetchData = async () => {
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
        setAssignment(null);
        setTasks([]);
        setIsLoading(false);
        return;
      }

      const project = projects[0] as Project;

      const newAssignment: Assignment = {
        id: project.project_id.toString(),
        title: project.title,
        description: project.description || 'No description provided.'
      };

      const newTasks: Task[] = (project.tasks || []).map((task: ProjectTask) => {
        const subtasks = (task.subtasks || [])
          .map((st: ProjectSubtask) => ({
            id: st.id,
            title: st.title,
            description: st.description || '',
            completed: st.completed || false,
            spark_studio: st.spark_studio || false,
          }))
          .sort((a, b) => parseInt(a.id) - parseInt(b.id));

        return {
          id: task.id,
          title: task.title,
          description: task.description || '',
          status: task.status || 'To Do',
          subtasks: subtasks,
          day_assigned: task.day_assigned,
        };
      });

      setAssignment(newAssignment);
      setTasks(newTasks);
      setIsLoading(false);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id, params.sectionId, params.assignmentId]);

  useEffect(() => {
    let maxDay = 1;
    for (let day = 1; day <= 10; day++) {
      const dayTasks = tasks.filter(task => task.day_assigned === day);
      const allDayTasksCompleted = dayTasks.length > 0 && dayTasks.every(task => task.status === 'Done');

      if (allDayTasksCompleted) {
        maxDay = day + 1;
      } else {
        break;
      }
    }
    setMaxUnlockedDay(Math.min(maxDay, 10));
  }, [tasks]);

  useEffect(() => {
    const allDone = tasks.every((task) => task.status === 'Done');
    setAllTasksCompleted(allDone);
  }, [tasks]);

//   useEffect(() => {
//     const startDate = new Date('2024-12-28T00:00:00.000Z');
//     const endDate = new Date(startDate);
//     endDate.setDate(endDate.getDate() + 6);

//     const timer = setInterval(() => {
//       const now = new Date();
//       const diff = endDate.getTime() - now.getTime();

//       if (diff <= 0) {
//         setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//         clearInterval(timer);
//         return;
//       }

//       const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//       setTimeRemaining({ days, hours, minutes, seconds });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

  const getTaskProgress = (task: Task) => {
    const completed = task.subtasks.filter((st) => st.completed).length;
    const total = task.subtasks.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'To Do':
        return <Circle className="w-5 h-5 text-gray-400" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-[#274c77]" />;
      case 'Done':
        return <CheckCircle2 className="w-5 h-5 text-[#274c77]" />;
      default:
        return null;
    }
  };

  const handleSaveProgress = async (updatedTasks: Task[]) => {
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
              completed: st.completed
            }))
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save progress');
      }

      toast.update(savingToastId, {
        render: "Changes Saved",
        type: 'success',
        autoClose: 2000,
        closeOnClick: true,
        className: ''
      });

    } catch (err) {
      console.error(err);
      toast.update(savingToastId, {
        render: 'An error occurred while saving progress.',
        type: 'error',
        autoClose: 5000,
        closeOnClick: true
      });
    }
  };

  const taskHasSparkStudio = (task: Task) => {
    return task.subtasks.some((st) => st.spark_studio === true);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const task = tasks.find((t) => t.id === draggableId);
    if (!task || task.day_assigned > maxUnlockedDay) return;

    const sourceStatus = source.droppableId as Task['status'];
    const destStatus = destination.droppableId as Task['status'];

    if (sourceStatus === destStatus) return;

    if (destStatus === 'Done') {
      const allSubtasksCompleted = task.subtasks.every((subtask) => subtask.completed);
      if (!allSubtasksCompleted) {
        toast.error('Complete all subtasks before moving to Done', {
          position: "bottom-center",
          autoClose: 3000
        });
        return;
      }
    }

    const movingToInProgressFromDifferentStatus =
      destStatus === 'In Progress' && sourceStatus !== 'In Progress';

    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((t) =>
        t.id === draggableId ? { ...t, status: destStatus } : t
      );
      handleSaveProgress(newTasks);

      if (movingToInProgressFromDifferentStatus && taskHasSparkStudio(task)) {
        toast.info(
          "This task will be completed on Spark Studio. Please open Spark Studio. See task details for more info.",
          {
            position: "bottom-center",
            autoClose: 5000
          }
        );
      }

      return newTasks;
    });
  };

  const handleSubtaskToggle = (taskId: string, subtaskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.day_assigned > maxUnlockedDay) {
      return;
    }

    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((t) => {
        if (t.id === taskId) {
          const updatedSubtasks = t.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          return { ...t, subtasks: updatedSubtasks };
        }
        return t;
      });
      handleSaveProgress(newTasks);
      return newTasks;
    });
  };

  const handleTaskClick = (task: Task) => {
    if (task.day_assigned > maxUnlockedDay) return;
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

  const days = Array.from({ length: 10 }, (_, i) => i + 1);
  const completedDaysMap = useMemo(() => {
    const map = new Map<number, boolean>();
    for (let day = 1; day <= 10; day++) {
      const dayTasks = tasks.filter(task => task.day_assigned === day);
      const completed = dayTasks.length > 0 && dayTasks.every(task => task.status === 'Done');
      map.set(day, completed);
    }
    return map;
  }, [tasks]);

  const isDayCompleted = (day: number) => {
    return completedDaysMap.get(day) || false;
  };

  const handleDaySelect = (day: number, isLocked: boolean) => {
    if (isLocked) {
      setLockedMessageDay(day);
      setTimeout(() => setLockedMessageDay(null), 2000);
    } else {
      setSelectedDay(day);
    }
  };

  const closeTaskDetails = () => {
    setSelectedTaskId(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#274c77] border-b-4 border-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen px-4 text-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ApplyFor10DayProgram />
      </div>
    );
  }

  const filteredTasks = tasks.filter(task => task.day_assigned === selectedDay);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      {assignment && (
        <AssignmentHeader
          title={assignment.title}
          description={assignment.description}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* <CountdownTimer
            days={timeRemaining.days}
            hours={timeRemaining.hours}
            minutes={timeRemaining.minutes}
            seconds={timeRemaining.seconds}
          /> */}
          <DaySelector
            days={days}
            selectedDay={selectedDay}
            onDaySelect={handleDaySelect}
            maxUnlockedDay={maxUnlockedDay}
            lockedMessageDay={lockedMessageDay}
            isDayCompleted={isDayCompleted}
          />
          <TaskBoard
            tasks={filteredTasks}
            onDragEnd={onDragEnd}
            getTaskProgress={getTaskProgress}
            getStatusIcon={getStatusIcon}
            handleTaskClick={handleTaskClick}
          />
        </div>
      </div>
      {selectedTask && (
        <TaskDetails
          selectedTask={selectedTask}
          onClose={closeTaskDetails}
          expandedSubtasks={expandedSubtasks}
          toggleSubtaskDescription={toggleSubtaskDescription}
          handleSubtaskToggle={handleSubtaskToggle}
          maxUnlockedDay={maxUnlockedDay}
          markdownLinkStyles={markdownLinkStyles}
        />
      )}
      {allTasksCompleted && <ApplyFor10DayProgram />}
    </div>
  );
} 