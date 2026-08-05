import React from 'react';
import { Nunito } from 'next/font/google';
import { ChevronDown, X, Check, AlertTriangle, Crown } from 'lucide-react';
import SubTaskRenderer from './SubTaskRenderer';
import { toast } from 'react-hot-toast';

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
  day_assigned: number;
  hasLimitedDetails?: boolean;
}

interface TaskDetailsProps {
  selectedTask: Task | null;
  expandedSubtasks: Set<string>;
  toggleSubtaskDescription: (subtaskId: string) => void;
  handleSubtaskToggle: (taskId: string, subtaskId: string) => void;
  markdownLinkStyles: string;
  selectedDay: number;
  maxUnlockedDay: number;
  onClose: () => void;
  urlInputs: { [key: string]: string };
  handleUrlChange: (subtaskId: string, value: string) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  selectedTask,
  expandedSubtasks,
  toggleSubtaskDescription,
  handleSubtaskToggle,
  markdownLinkStyles,
  maxUnlockedDay,
  onClose,
  urlInputs,
  handleUrlChange
}) => {
  const isVisible = !!selectedTask;
  
  // Check if this is a premium locked task - only for unpaid users
  // We need to check if the task is specifically a premium task for unpaid users
  // not just any locked task for paid users
  const isPremiumTask = selectedTask && 
    ((selectedTask.hasLimitedDetails) ||
    (selectedTask.subtasks.length === 1 && 
    selectedTask.subtasks[0].title.includes("Premium Task - Upgrade to Unlock") &&
    selectedTask.day_assigned > maxUnlockedDay)); // This ensures it's actually locked due to premium status

  const validateUrl = (url: string, type: string): boolean => {
    if (!url) return false;
    
    if (type === 'linkedin') {
      return url.toLowerCase().includes('linkedin.com/');
    } else if (type === 'github') {
      return url.toLowerCase().includes('github.com/');
    }
    return false;
  };

  const handleSubtaskToggleWrapper = (taskId: string, subtask: Subtask) => {
    if (subtask.completed) {
      toast.error('Completed subtasks cannot be unchecked', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    if (subtask.spark_studio) {
      toast.error('This task can only be completed in the CommandL application', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    const subtaskIndex = selectedTask?.subtasks.findIndex(st => st.id === subtask.id) ?? -1;
    if (subtaskIndex > 0 && !selectedTask?.subtasks[subtaskIndex - 1].completed) {
      toast.error('Please complete the previous subtask first', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    if (subtask.more_info?.data?.verify_field) {
      const url = urlInputs[subtask.id] || '';
      const urlType = subtask.more_info.data.verify_field.type;
      
      if (!validateUrl(url, urlType)) {
        toast.error(`Please enter a valid ${urlType} URL`, {
          duration: 3000,
          position: 'top-center',
        });
        return;
      }
    }

    handleSubtaskToggle(taskId, subtask.id);
  };

  const handleOverlayClick = () => {
    onClose();
  };

  const handlePanelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // For premium tasks (unpaid users), show a special UI
  if (isPremiumTask) {
    return (
      <div
        className={`fixed inset-0 z-50 ${isVisible ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-60`}
        onClick={handleOverlayClick}
      >
        <div
          className={`bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 ${nunito.className}`}
          onClick={handlePanelClick}
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-[#4B4B4B] flex items-center">
              {selectedTask?.title || 'Task Details'}
              <span className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-amber-500 rounded-full flex items-center">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 border-b">
            <p className="text-[#4B4B4B] whitespace-pre-line">
              {selectedTask?.description}
            </p>
          </div>

          <div className="p-6 flex flex-col items-center justify-center">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-4 w-full">
              <div className="flex items-center justify-center mb-4">
                <Crown className="w-10 h-10 text-amber-500 mr-2" />
                <h3 className="text-xl font-bold text-amber-700">Premium Content</h3>
              </div>
              <p className="text-center text-amber-700 mb-6">
                {selectedTask?.hasLimitedDetails 
                  ? "This task requires a premium subscription to view all details. Upgrade now to access the full content and complete this task."
                  : "This task is only available for premium users. Upgrade now to access all tasks and track your progress."
                }
              </p>
              <button 
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
                onClick={() => {
                  // Navigate to the Stripe payment link
                  window.open('https://buy.stripe.com/eVa9DB3fr9og0RqeUZ', '_blank');
                  onClose();
                }}
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original UI for paid users - DO NOT MODIFY THIS SECTION
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

                const verifyField = subtask.more_info?.data?.verify_field;
                const urlValue = urlInputs[subtask.id] || '';
                const isUrlValid = verifyField ? validateUrl(urlValue, verifyField.type) : true;

                // Check if this subtask can be completed (based on previous subtask)
                const subtaskIndex = selectedTask.subtasks.findIndex(st => st.id === subtask.id);
                const isPreviousSubtaskCompleted = subtaskIndex === 0 || selectedTask.subtasks[subtaskIndex - 1].completed;
                const canBeCompleted = !subtask.completed && isPreviousSubtaskCompleted;

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

                        {isSubtaskSparkStudio && (
                          <div className="group relative ml-2 inline-block">
                            <span className="px-2 py-1 text-xs font-semibold text-white bg-pink-500 rounded-full cursor-help">
                              CommandL
                            </span>
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
                          handleSubtaskToggleWrapper(selectedTask.id, subtask);
                        }}
                        disabled={
                          selectedTask.day_assigned > maxUnlockedDay || 
                          (verifyField && !isUrlValid) || 
                          (isSubtaskSparkStudio && !subtask.completed) ||
                          subtask.completed ||
                          !canBeCompleted
                        }
                        className={`
                          w-6 h-6 rounded-lg flex items-center justify-center
                          transition-all duration-200 ease-in-out ml-4
                          ${subtask.completed
                            ? 'bg-[#58cc02] text-white cursor-not-allowed'
                            : canBeCompleted
                              ? 'bg-white border-2 border-[#58cc02]'
                              : 'bg-white border-2 border-gray-300 cursor-not-allowed'
                          }
                          ${(selectedTask.day_assigned > maxUnlockedDay || 
                            (verifyField && !isUrlValid) || 
                            (isSubtaskSparkStudio && !subtask.completed) ||
                            !canBeCompleted)
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-[#58cc02] hover:bg-opacity-10 cursor-pointer'
                          }
                        `}
                        aria-label={
                          subtask.completed
                            ? 'Completed'
                            : canBeCompleted
                              ? 'Mark as complete'
                              : 'Complete previous subtask first'
                        }
                        title={
                          subtask.completed
                            ? 'Completed'
                            : canBeCompleted
                              ? 'Mark as complete'
                              : 'Complete previous subtask first'
                        }
                      >
                        {subtask.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>
                    </div>

                    {expandedSubtasks.has(subtask.id) && (
                      <div className="px-4 pb-4">
                        <div className="ml-8 text-md text-[#4B4B4B] bg-white rounded-lg border border-[#E5E5E5] p-4 break-words">
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
                          <SubTaskRenderer 
                            subtask={subtask.description} 
                            completed={subtask.completed}
                            more_info={subtask.more_info}
                          />

                          {!isSubtaskSparkStudio && subtask.more_info?.data?.verify_field && !subtask.completed && (
                            <div className="mt-6 border-t border-gray-200 pt-4">
                              <div className="bg-white">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Enter your {subtask.more_info.data.verify_field.type} profile URL:
                                </label>
                                <input
                                  type="url"
                                  value={urlValue}
                                  onChange={(e) => handleUrlChange(subtask.id, e.target.value)}
                                  placeholder={`https://${subtask.more_info.data.verify_field.type}.com/your-profile`}
                                  className={`
                                    w-full px-3 py-2 border rounded-md shadow-sm
                                    focus:outline-none focus:ring-2 focus:ring-offset-2
                                    ${urlValue && isUrlValid
                                      ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }
                                  `}
                                />
                                {urlValue && !isUrlValid && (
                                  <p className="mt-2 text-sm text-red-600">
                                    Please enter a valid {subtask.more_info.data.verify_field.type} profile URL
                                  </p>
                                )}
                                <p className="mt-2 text-sm text-gray-500">
                                  You must provide a valid {subtask.more_info.data.verify_field.type} profile URL to mark this task as complete
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubtaskToggleWrapper(selectedTask.id, subtask);
                              }}
                              disabled={
                                selectedTask.day_assigned > maxUnlockedDay || 
                                (verifyField && !isUrlValid) || 
                                (isSubtaskSparkStudio && !subtask.completed) ||
                                subtask.completed ||
                                !canBeCompleted
                              }
                              className={`
                                px-4 py-2 rounded-lg font-medium
                                transition-all duration-200 ease-in-out
                                ${subtask.completed
                                  ? 'bg-[#58cc02] text-white cursor-not-allowed'
                                  : canBeCompleted
                                    ? 'bg-[#1cb0f6] text-white hover:bg-[#1a9fe6]'
                                    : 'bg-gray-300 text-white cursor-not-allowed'
                                }
                                ${(selectedTask.day_assigned > maxUnlockedDay || 
                                  (verifyField && !isUrlValid) || 
                                  (isSubtaskSparkStudio && !subtask.completed) ||
                                  !canBeCompleted)
                                  ? 'opacity-50'
                                  : ''
                                }
                              `}
                            >
                              {subtask.completed 
                                ? 'Completed' 
                                : canBeCompleted
                                  ? 'Mark as complete'
                                  : 'Complete previous subtask first'
                              }
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