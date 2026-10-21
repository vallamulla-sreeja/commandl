import React, { useEffect, useState } from 'react';
import { Nunito } from 'next/font/google';
import {
  DragDropContext,
  Draggable,
  DropResult,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import { Lock, Unlock, ListTodo, Clock, CheckCircle2, Crown, Sparkles } from 'lucide-react';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

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
  hasLimitedDetails?: boolean;
}

interface TaskBoardProps {
  tasks: Task[];
  onDragEnd: (result: DropResult) => void;
  handleTaskClick: (task: Task) => void;
  getTaskProgress: (task: Task) => number;
  isTaskLocked: (task: Task) => boolean;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onDragEnd,
  handleTaskClick,
  getTaskProgress,
  isTaskLocked
}) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setEnabled(true);
    });

    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  const getColumnIcon = (status: string) => {
    switch (status) {
      case 'To Do':
        return <ListTodo className="w-6 h-6 text-gray-700" />;
      case 'In Progress':
        return <Clock className="w-6 h-6 text-blue-700" />;
      case 'Done':
        return <CheckCircle2 className="w-6 h-6 text-emerald-700" />;
      default:
        return null;
    }
  };

  const getColumnStyles = (status: string) => {
    switch (status) {
      case 'To Do':
        return {
          gradient: 'from-orange-50 via-amber-50 to-yellow-50',
          border: 'border-orange-200',
          badge: 'bg-orange-100 text-orange-700'
        };
      case 'In Progress':
        return {
          gradient: 'from-blue-50 via-indigo-50 to-blue-50',
          border: 'border-blue-200',
          badge: 'bg-blue-100 text-blue-700'
        };
      case 'Done':
        return {
          gradient: 'from-emerald-50 via-green-50 to-teal-50',
          border: 'border-emerald-200',
          badge: 'bg-emerald-100 text-emerald-700'
        };
      default:
        return {
          gradient: 'from-gray-50 to-gray-100',
          border: 'border-gray-200',
          badge: 'bg-gray-100 text-gray-700'
        };
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 ${nunito.className}`}>
        {['To Do', 'In Progress', 'Done'].map((status) => {
          const columnStyles = getColumnStyles(status);
          return (
            <StrictModeDroppable droppableId={status} key={status}>
              {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`
                    bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 ${columnStyles.border}
                    ${snapshot.isDraggingOver ? 'ring-4 ring-emerald-200 border-emerald-300 scale-102' : ''}
                    transition-all duration-300 ease-out
                    flex flex-col h-full min-h-[600px]
                  `}
                >
                  {/* Enhanced Column Header */}
                  <div className={`
                    p-6 bg-gradient-to-br ${columnStyles.gradient}
                    border-b-2 ${columnStyles.border} flex-shrink-0
                    rounded-t-2xl
                  `}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm">
                          {getColumnIcon(status)}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">
                            {status}
                          </h2>
                          <p className="text-sm text-gray-600 font-medium">
                            {status === 'To Do' && 'Ready to start'}
                            {status === 'In Progress' && 'Currently working'}
                            {status === 'Done' && 'Completed tasks'}
                          </p>
                        </div>
                      </div>
                      <div className="group relative">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${columnStyles.badge} cursor-help border-2 border-white shadow-sm`}>
                          {tasks.filter((t) => t.status === status).length}
                        </span>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-gray-800 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-xl z-10">
                          <div className="flex items-center space-x-2">
                            <span>{tasks.filter((t) => t.status === status).length} task(s) in {status.toLowerCase()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Tasks Container */}
                  <div className="p-6 space-y-4 flex-grow overflow-y-auto">
                    {tasks
                      .filter((t) => t.status === status)
                      .map((task, index) => {
                        const locked = isTaskLocked(task);
                        const progress = getTaskProgress(task);
                        const isPremium = task.hasLimitedDetails;
                        
                        return (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                            isDragDisabled={locked}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => handleTaskClick(task)}
                                style={{
                                  ...provided.draggableProps.style,
                                  transform: snapshot.isDragging
                                    ? provided.draggableProps.style?.transform
                                    : 'none',
                                }}
                                className={`
                                  bg-white rounded-xl p-5 border-2 transition-all duration-300 ease-out
                                  ${locked 
                                    ? 'opacity-75 cursor-not-allowed border-gray-200 hover:border-gray-300' 
                                    : 'hover:border-emerald-300 border-gray-200 hover:shadow-lg cursor-grab active:cursor-grabbing'
                                  }
                                  ${snapshot.isDragging ? 'shadow-2xl ring-4 ring-emerald-200 rotate-2 scale-105' : 'shadow-sm'}
                                  ${isPremium ? 'bg-gradient-to-br from-amber-50 to-yellow-50' : ''}
                                  transform-gpu group
                                `}
                              >
                                {/* Enhanced Task Header */}
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex-1 mr-3">
                                    <h3 className={`text-lg font-bold leading-tight transition-colors duration-200 ${
                                      locked ? 'text-gray-500' : 'text-gray-800 group-hover:text-emerald-700'
                                    }`}>
                                      {task.title}
                                    </h3>
                                    {isPremium && (
                                      <div className="flex items-center mt-2 px-2 py-1 bg-amber-100 rounded-lg">
                                        <Crown className="w-4 h-4 text-amber-600 mr-1" />
                                        <span className="text-xs font-semibold text-amber-700">Premium Task</span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    {locked ? (
                                      <div className="flex items-center space-x-1">
                                        {isPremium && (
                                          <div className="p-1.5 bg-amber-100 rounded-lg">
                                            <Crown className="w-4 h-4 text-amber-600" />
                                          </div>
                                        )}
                                        <div className="p-1.5 bg-gray-100 rounded-lg">
                                          <Lock className="w-4 h-4 text-gray-500" />
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="p-1.5 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors duration-200">
                                        <Unlock className="w-4 h-4 text-emerald-600" />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Enhanced Progress Section */}
                                <div className="mt-4">
                                  {/* Progress Bar */}
                                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                                    <div
                                      className={`h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden ${
                                        locked 
                                          ? 'bg-gray-300' 
                                          : progress === 100 
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                                            : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                                      }`}
                                      style={{ width: `${progress}%` }}
                                    >
                                      {progress > 0 && !locked && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse"></div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Progress Details */}
                                  <div className="flex justify-between items-center mt-3">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm font-medium text-gray-700">
                                        {task.subtasks.filter((st) => st.completed).length}
                                        /{task.subtasks.length} subtasks
                                      </span>
                                      {progress === 100 && (
                                        <div className="flex items-center">
                                          <Sparkles className="w-4 h-4 text-emerald-500" />
                                        </div>
                                      )}
                                    </div>
                                    <div className={`
                                      px-3 py-1 rounded-full text-sm font-bold
                                      ${progress === 100 
                                        ? 'bg-emerald-100 text-emerald-700' 
                                        : 'bg-blue-100 text-blue-700'
                                      }
                                    `}>
                                      {progress}%
                                    </div>
                                  </div>

                                  {/* Additional Task Indicators */}
                                  {task.subtasks.some(st => st.spark_studio) && (
                                    <div className="mt-3 flex items-center space-x-2">
                                      <div className="px-2 py-1 bg-pink-100 rounded-lg">
                                        <span className="text-xs font-semibold text-pink-700">CommandL</span>
                                      </div>
                                      <span className="text-xs text-gray-600">Requires CommandL IDE</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                    
                    {/* Empty State */}
                    {tasks.filter((t) => t.status === status).length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="p-4 bg-gray-100 rounded-full mb-4">
                          {getColumnIcon(status)}
                        </div>
                        <p className="text-gray-500 font-medium">No tasks in {status.toLowerCase()}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {status === 'To Do' && 'Tasks will appear here when ready'}
                          {status === 'In Progress' && 'Move tasks here when working on them'}
                          {status === 'Done' && 'Completed tasks will appear here'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </StrictModeDroppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;