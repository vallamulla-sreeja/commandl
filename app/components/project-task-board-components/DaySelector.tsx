import React from 'react';
import { CalendarDays } from 'lucide-react';

interface DaySelectorProps {
  selectedDay: number;
  lockedMessageDay: number | null;
  onDaySelect: (day: number, isLocked: boolean) => void;
  maxUnlockedDay: number;
  isDayCompleted: (day: number) => boolean;
}

const DaySelector: React.FC<DaySelectorProps> = ({ 
  selectedDay, 
  lockedMessageDay, 
  onDaySelect,
  maxUnlockedDay,
  isDayCompleted 
}) => {
  const daysArray = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <div className="w-full bg-white rounded-lg mx-auto">
      <div className="border-b border-gray-100 p-4">
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-5 h-5 text-[#58cc02]" />
          <h2 className="text-xl font-semibold text-gray-800">Day {selectedDay}/14</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-7 gap-4">
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
                  onClick={() => onDaySelect(day, isLocked)}
                  disabled={isLocked}
                  className={`
                    w-full h-16 rounded-lg transition-all duration-200
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
                    <span className="text-xs uppercase mb-1">Day</span>
                    <span className="text-lg font-bold">{day}</span>
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
  );
};

export default DaySelector;