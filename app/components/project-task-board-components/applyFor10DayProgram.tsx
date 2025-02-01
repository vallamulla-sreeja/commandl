import React from 'react';
import Image from 'next/image';
import { ArrowRight, AlertCircle } from 'lucide-react';

const ApplyFor10DayProgram = () => {
  const handleApply = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfoa_LPZhX9VN0H4wyvv8kO2DGH9-n6G9YmbZMIO5P3uvzuNg/viewform', '_blank');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-gray-200 hover:border-[#58cc02] transition-all duration-300 overflow-hidden">
        <div className="flex items-start space-x-3 bg-orange-50 p-4 rounded-lg border border-orange-100">
          <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-orange-700 mb-1">Oh no!</h3>
            <p className="text-orange-600">
              Looks like you&apos;re not part of our current batch yet.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch">
          {/* Image Section */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center bg-blue-50/30">
            <div className="relative aspect-square w-full max-w-[300px]">
              <Image
                src="/images/10-day-program-page.png"
                alt="10 Day Program"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-white to-blue-50">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#274c77] leading-tight mb-4">
                  10-Day Project Building Program
                </h2>
                <p className="text-gray-600 mb-6">
                  But don&apos;t worry! You can apply for our upcoming batches and start your journey towards becoming a better developer.
                </p>
              </div>

              <button
                onClick={handleApply}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#58cc02] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#4fb102] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#58cc02] shadow-lg hover:shadow-xl"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyFor10DayProgram;
