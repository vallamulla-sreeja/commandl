import React from 'react';
import { Nunito } from 'next/font/google';
import { ChevronDown, X, Check, AlertTriangle } from 'lucide-react';
import SubTaskRenderer from '../SubTaskRenderer';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

interface Subtask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  spark_studio?: boolean; // Already added
}

interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
  status: 'To Do' | 'In Progress' | 'Done';
  day_assigned: number;
}

interface TaskDetailsProps {
  selectedTask: Task | null;
  expandedSubtasks: Set<string>;
  toggleSubtaskDescription: (subtaskId: string) => void;
  handleSubtaskToggle: (taskId: string, subtaskId: string) => void;
  markdownLinkStyles: string;
  maxUnlockedDay: number;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  selectedTask,
  expandedSubtasks,
  toggleSubtaskDescription,
  handleSubtaskToggle,
  markdownLinkStyles,
  maxUnlockedDay,
  onClose
}) => {
  const isVisible = !!selectedTask;

  const handleOverlayClick = () => {
    onClose();
  };

  const handlePanelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 
        ${isVisible ? 'flex' : 'hidden'}
        items-center justify-end
        bg-black bg-opacity-60
      `}
      onClick={handleOverlayClick}
    >
      <div
        onClick={handlePanelClick}
        className={`
          bg-white shadow-2xl border-l border-gray-200 px-8 py-8
          transform transition-transform duration-300 h-full
          w-full sm:w-4/5 lg:w-4/5
          overflow-y-auto ${nunito.className}
        `}
      >
        {selectedTask ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#4B4B4B]">
                {selectedTask.title}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close details panel"
                className="text-[#4B4B4B] hover:text-[#777777] p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-[#4B4B4B] mb-8 text-xl leading-relaxed">
              {selectedTask.description}
            </p>

            <h3 className="text-2xl font-semibold text-[#4B4B4B] mb-6">
              Subtasks
            </h3>

            <div className="space-y-6">
              {selectedTask.subtasks.map((subtask) => {
                const isSubtaskSparkStudio = subtask.spark_studio === true;
                const showMoveToInProgressInstruction =
                  isSubtaskSparkStudio &&
                  (
                    selectedTask.status === 'To Do' ||
                    (selectedTask.status === 'Done' && !subtask.completed)
                  );

                return (
                  <div
                    key={subtask.id}
                    className="bg-[#F7F7F7] rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div
                      onClick={() => toggleSubtaskDescription(subtask.id)}
                      className="flex items-center p-4 cursor-pointer"
                    >
                      <div className="flex-grow flex items-center space-x-3">
                        <ChevronDown
                          className={`w-5 h-5 text-[#4B4B4B] transform transition-transform duration-200 ${expandedSubtasks.has(subtask.id) ? 'rotate-180' : ''
                            }`}
                        />
                        <span
                          className={`text-lg ${subtask.completed ? 'text-[#777777]' : 'text-[#4B4B4B]'
                            }`}
                        >
                          {subtask.title}
                        </span>

                        {/* 
                          CHANGES: Add a small label if subtask has spark_studio = true 
                        */}
                        {isSubtaskSparkStudio && (
                          // CHANGES: Wrap the SparkStudio text in a group container with a tooltip
                          <div className="group relative ml-2 inline-block">
                            <span className="px-2 py-1 text-xs font-semibold text-white bg-pink-500 rounded-full cursor-help">
                              CommandL
                            </span>

                            {/* 
      CHANGES: The tooltip itself (hidden by default, visible on hover)
    */}
                            <div
                              className="
        absolute bottom-full left-1/2 transform -translate-x-1/2 
        mb-2 px-3 py-1 text-xs text-white bg-black rounded 
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-200 z-10
        whitespace-nowrap
      "
                            >
                              This task will be done in CommandL
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubtaskToggle(selectedTask.id, subtask.id);
                        }}
                        disabled={selectedTask.day_assigned > maxUnlockedDay}
                        className={`
                          w-6 h-6 rounded-lg flex items-center justify-center
                          transition-all duration-200 ease-in-out ml-4
                          ${subtask.completed
                            ? 'bg-[#58cc02] text-white'
                            : 'bg-white border-2 border-[#58cc02]'
                          }
                          ${selectedTask.day_assigned > maxUnlockedDay
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-[#58cc02] hover:bg-opacity-10 cursor-pointer'
                          }
                        `}
                        aria-label={
                          subtask.completed
                            ? 'Mark as incomplete'
                            : 'Mark as complete'
                        }
                      >
                        {subtask.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>
                    </div>

                    {expandedSubtasks.has(subtask.id) && (
                      <div className="px-4 pb-4">
                        <div className="ml-8 text-md text-[#4B4B4B] bg-white rounded-lg border border-[#E5E5E5] p-4 break-words">
                          {/* 
                            CHANGES: Show instruction if subtask requires SparkStudio 
                            AND the task is in 'To Do' or 'Done' but incomplete.
                          */}
                          {showMoveToInProgressInstruction && (
                            <div className="mt-4 p-3 bg-yellow-100 border-black-400 text-black-800 text-sm rounded">
                              <p>
                                <AlertTriangle className="w-4 h-4 inline-block mr-2" />
                                <strong>Note:</strong> This task requires CommandL.
                                Please move the <em>entire task</em> to <strong>In Progress </strong>
                                to continue working on it in CommandL.
                              </p>
                            </div>
                          )}
                          <style>{markdownLinkStyles}</style>
                          <SubTaskRenderer subtask={subtask.description} />

                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubtaskToggle(selectedTask.id, subtask.id);
                              }}
                              disabled={selectedTask.day_assigned > maxUnlockedDay}
                              className={`
                                px-4 py-2 rounded-lg font-medium
                                transition-all duration-200 ease-in-out
                                ${subtask.completed
                                  ? 'bg-[#58cc02] text-white hover:bg-[#4fb102]'
                                  : 'bg-[#1cb0f6] text-white hover:bg-[#1a9fe6]'
                                }
                                ${selectedTask.day_assigned > maxUnlockedDay
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'cursor-pointer'
                                }
                              `}
                            >
                              {subtask.completed ? 'Completed' : 'Mark as complete'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="p-6 text-[#4B4B4B] text-center bg-[#F7F7F7] rounded-lg">
            <p className="text-xl">Select a task from the board to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;