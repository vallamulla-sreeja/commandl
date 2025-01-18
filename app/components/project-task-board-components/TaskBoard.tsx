import React from 'react';
import { Nunito } from 'next/font/google';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

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
  getStatusIcon: (status: string) => JSX.Element | null;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  onDragEnd,
  handleTaskClick,
  getTaskProgress,
  getStatusIcon,
}) => {

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto ${nunito.className}`}>
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`
                  bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6
                  ${snapshot.isDraggingOver ? 'bg-[#F7F7F7]' : ''}
                  transition-colors duration-200 hover:border-[#58CC02]
                `}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status)}
                    <h2 className="text-lg font-semibold text-[#4B4B4B]">
                      {status}
                    </h2>
                  </div>
                  <div className="group relative">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#F7F7F7] text-[#4B4B4B] cursor-help border border-[#E5E5E5]">
                      {tasks.filter((t) => t.status === status).length}
                    </span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#4B4B4B] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                      Total tasks in {status.toLowerCase()}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {tasks
                    .filter((t) => t.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleTaskClick(task)}
                            className={`
                              bg-white border border-[#E5E5E5] rounded-xl p-5
                              hover:shadow-md hover:border-[#58CC02]
                              ${snapshot.isDragging ? 'shadow-lg border-[#58CC02] bg-[#F7F7F7]' : ''}
                              transition-all duration-200 cursor-pointer
                            `}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-md font-semibold text-[#4B4B4B]">
                                {task.title}
                              </h3>
                            </div>
                            <div className="mt-3">
                              <div className="w-full bg-[#F7F7F7] rounded-full h-2.5">
                                <div
                                  className="bg-[#58CC02] h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                  style={{
                                    width: `${getTaskProgress(task)}%`,
                                  }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-[#4B4B4B] mt-2.5">
                                <span>
                                  {task.subtasks.filter((st) => st.completed).length}
                                  /{task.subtasks.length} subtasks
                                </span>
                                <span className="font-medium">{getTaskProgress(task)}%</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;