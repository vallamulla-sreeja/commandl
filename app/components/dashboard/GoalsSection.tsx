import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const GOALS = [
  { id: 'job', label: 'Getting a Job', description: 'Land a role in tech industry' },
  { id: 'skills', label: 'Skills Development', description: 'Improve technical abilities' },
  { id: 'startup', label: 'Start a Company', description: 'Build your own tech startup' },
  { id: 'freelance', label: 'Freelancing', description: 'Work as a freelance developer' },
  { id: 'career_switch', label: 'Career Switch', description: 'Transition to tech career' },
  { id: 'personal_growth', label: 'Personal Growth', description: 'Learn for self-improvement' }
];

interface GoalsSectionProps {
  selectedGoals: string[];
  onGoalToggle: (goalId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function GoalsSection({ selectedGoals, onGoalToggle, onContinue, onBack }: GoalsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Goals</h2>
        <p className="text-xl text-gray-600">
          Choose at least 3 goals that align with your aspirations
        </p>
      </div>
      <div className="bg-white rounded-2xl p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {GOALS.map((goal) => (
            <button
              key={goal.id}
              onClick={() => onGoalToggle(goal.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                selectedGoals.includes(goal.id)
                  ? 'border-[#58CC02] bg-[#58CC02]/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  selectedGoals.includes(goal.id)
                    ? 'bg-[#58CC02]'
                    : 'bg-gray-200'
                }`}>
                  <CheckCircleIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{goal.label}</h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-between gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-4 rounded-xl text-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
          >
            Back
          </button>
          <button
            onClick={onContinue}
            disabled={selectedGoals.length < 3}
            className={`flex-1 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
              selectedGoals.length < 3 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#58CC02] text-white hover:bg-[#58CC02]/90'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  );
} 