import React from 'react';
import { CalendarDays } from 'lucide-react';
import ProgressIndicator from './ProgressIndicator';

interface DaySelectorProps {
  selectedDay: number;
  lockedMessageDay: number | null;
  onDaySelect: (day: number) => void;
  maxUnlockedDay: number;
  isDayCompleted: (day: number) => boolean;
  completedDays: number[];
}

const DaySelector: React.FC<DaySelectorProps> = ({ 
  selectedDay, 
  lockedMessageDay, 
  onDaySelect,
  maxUnlockedDay,
  isDayCompleted,
  completedDays
}) => {
  const daysArray = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <div className="w-full bg-white rounded-lg mx-auto mb-6">
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-[65%]">
          <div className="p-4 pb-2 flex items-center">
            <div className="flex items-center space-x-2">
              <CalendarDays className="w-5 h-5 text-[#58cc02]" />
              <h2 className="text-xl font-semibold text-gray-800">Day {selectedDay}/14</h2>
            </div>
          </div>
          <div className="px-6 pb-6 pt-2">
            <div className="grid grid-cols-7 gap-2">
              {daysArray.map((day) => {
                const isLocked = day > maxUnlockedDay;
                const isSelected = selectedDay === day;
                const isCompleted = isDayCompleted(day);

                return (
                  <div
                    key={day}
                    className="relative"
                  >
                    <button
                      onClick={() => onDaySelect(day)}
                      disabled={isLocked}
                      className={`
                        w-full h-12 rounded-lg transition-all duration-200
                        flex items-center justify-center
                        ${isSelected 
                          ? 'bg-[#58cc02] text-white transform scale-105' 
                          : isCompleted
                            ? 'bg-[#58cc02]/10 text-[#58cc02] hover:bg-[#58cc02]/20'
                            : isLocked
                              ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xs uppercase">Day</span>
                        <span className="text-sm font-bold">{day}</span>
                      </div>
                    </button>

                    {lockedMessageDay === day && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                        px-2 py-1 bg-white text-red-500 text-xs font-medium
                        rounded whitespace-nowrap z-10
                        border border-red-100">
                        Complete Day {maxUnlockedDay}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[32%] md:pl-0 md:pr-6 md:py-4 flex">
          <ProgressIndicator 
            completedDays={completedDays}
            totalDays={14}
          />
        </div>
      </div>
    </div>
  );
};

export default DaySelector;