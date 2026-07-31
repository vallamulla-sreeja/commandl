import { motion } from 'framer-motion';

interface AboutSectionProps {
  about: string;
  onAboutChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function AboutSection({ about, onAboutChange, onContinue, onBack }: AboutSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell Us About Yourself</h2>
        <p className="text-xl text-gray-600">
          Share your background, skills, and experience to help us understand you better
        </p>
      </div>
      <div className="bg-white rounded-2xl p-8">
        <textarea
          value={about}
          onChange={(e) => onAboutChange(e.target.value)}
          placeholder="Write about your background, technical skills, work experience, and what you're looking to achieve..."
          className="w-full h-64 p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#58CC02] resize-none text-gray-700"
        />
        <div className="flex justify-between mt-6 gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-4 rounded-xl text-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
          >
            Back
          </button>
          <button
            onClick={onContinue}
            disabled={!about.trim()}
            className={`flex-1 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
              !about.trim() ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#58CC02] text-white hover:bg-[#58CC02]/90'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  );
} 