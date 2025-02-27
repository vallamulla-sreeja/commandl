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
import { Lock, Unlock, ListTodo, Clock, CheckCircle2, Crown } from 'lucide-react';

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
        return <ListTodo className="w-5 h-5 text-[gray-600]" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'Done':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const getColumnColor = (status: string) => {
    switch (status) {
      case 'To Do':
        return 'from-[#FE8D01]/30 to-[#FE8D01]/30';
      case 'In Progress':
        return 'from-blue-100 to-blue-100';
      case 'Done':
        return 'from-green-100 to-green-100';
      default:
        return '';
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 ${nunito.className}`}>
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <StrictModeDroppable droppableId={status} key={status}>
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`
                  bg-white rounded-xl shadow-sm border border-gray-200
                  ${snapshot.isDraggingOver ? 'ring-2 ring-[#58CC02]/20' : ''}
                  transition-all duration-200
                  flex flex-col h-full min-h-[500px]
                `}
              >
                <div className={`
                  p-4 bg-gradient-to-r ${getColumnColor(status)}
                  border-b border-gray-200 flex-shrink-0
                  rounded-t-xl
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getColumnIcon(status)}
                      <h2 className="text-lg font-semibold text-gray-800">
                        {status}
                      </h2>
                    </div>
                    <div className="group relative">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-gray-700 cursor-help border border-gray-200">
                        {tasks.filter((t) => t.status === status).length}
                      </span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                        Total tasks in {status.toLowerCase()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-grow">
                  {tasks
                    .filter((t) => t.status === status)
                    .map((task, index) => {
                      const locked = isTaskLocked(task);
                      const progress = getTaskProgress(task);
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
                                bg-white border rounded-xl p-4
                                ${locked ? 'opacity-75 cursor-not-allowed border-gray-200' : 'hover:border-[#58CC02] border-gray-200'}
                                ${snapshot.isDragging ? 'shadow-lg ring-2 ring-[#58CC02]/20 rotate-2' : ''}
                                transition-all duration-200 ease-in-out
                                ${locked ? '' : 'cursor-grab active:cursor-grabbing'}
                                transform-gpu
                              `}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h3 className={`text-md font-semibold ${locked ? 'text-gray-500' : 'text-gray-800 group-hover:text-[#58CC02]'} transition-colors`}>
                                  {task.title}
                                </h3>
                                {locked ? (
                                  <div className="flex items-center">
                                    {task.subtasks.length === 1 && task.subtasks[0].title.includes("Premium Task - Upgrade to Unlock") ? (
                                      <Crown className="w-4 h-4 text-amber-500 mr-1" />
                                    ) : null}
                                    <Lock className="w-4 h-4 text-gray-400" />
                                  </div>
                                ) : (
                                  <Unlock className="w-4 h-4 text-[#58CC02]" />
                                )}
                              </div>
                              <div className="mt-3">
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                                      locked ? 'bg-gray-300' : progress === 100 ? 'bg-[#58CC02]' : 'bg-blue-500'
                                    }`}
                                    style={{
                                      width: `${progress}%`
                                    }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-xs mt-2.5">
                                  <span className="text-gray-600">
                                    {task.subtasks.filter((st) => st.completed).length}
                                    /{task.subtasks.length} subtasks
                                  </span>
                                  <span className={`font-medium ${
                                    progress === 100 ? 'text-[#58CC02]' : 'text-blue-500'
                                  }`}>
                                    {progress}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </StrictModeDroppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;