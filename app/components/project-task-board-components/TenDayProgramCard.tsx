import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

const TenDayProgramCard = () => {
  const router = useRouter();

  const checkpoints = [
    'Build frontend, backend and database from scratch (full-stack)',
    'Project of your choice',
    'Standout LinkedIn Profile',
    'GitHub Optimization', 
    'Credible Certificate',
    'Resume Optimization',
    'Mock Interview',
    'Mentorship'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-poppins">
      <div className="bg-white hover:border-[#58cc02] rounded-xl duration-300 overflow-hidden border-2 border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="p-4 sm:p-6">
            <div className="relative h-40 sm:h-48 md:h-56 w-full">
              <Image
                src="/images/10-day-program-page.png"
                alt="10 Day Program"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-600 text-center mt-4 mb-4 text-sm sm:text-base px-2 sm:px-4">
                In just 10 days, you&apos;ll go from zero to building and deploying a real application, improving your coding confidence and communication skills.
              </p>
              <button
                onClick={() => router.push('/10-day-program')}
                className="w-full sm:w-auto bg-[#58cc02] text-sm sm:text-base text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#4fb102] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Get Internship Ready in 10 Days</h3>
            <div className="space-y-3 sm:space-y-4">
              {checkpoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#58cc02] mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenDayProgramCard;