'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PricingSection = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/api/auth/login');
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-nunito">
            Build Real Projects with CommandL
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-nunito">
            Get access to CommandL&apos;s powerful development platform, guided project experience, mentorship and so much more
          </p>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 max-w-3xl w-full">
            {/* Price */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-6xl font-bold text-gray-900 font-nunito">$99</span>
                <span className="text-xl text-gray-900 font-nunito">/ year</span>
              </div>
              <div className="text-gray-600 text-lg font-nunito">
                One-time payment for full access to CommandL
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              {/* CommandL Platform */}
              <div className="flex items-start space-x-3 p-4">
                <CheckCircle2 className="h-6 w-6 text-[#58cc02] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-lg font-nunito">CommandL Code Editor</h4>
                  <p className="text-base text-gray-600 font-nunito">Access our powerful development environment with built-in AI assistance</p>
                </div>
              </div>

              {/* 2-Week Program */}
              <div className="flex items-start space-x-3 p-4">
                <CheckCircle2 className="h-6 w-6 text-[#58cc02] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-lg font-nunito">2-Week Guided Program</h4>
                  <p className="text-base text-gray-600 font-nunito">Build real projects using CommandL&apos;s structured learning path</p>
                </div>
              </div>

              {/* Direct Mentorship */}
              <div className="flex items-start space-x-3 p-4">
                <CheckCircle2 className="h-6 w-6 text-[#58cc02] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-lg font-nunito">Direct Mentorship</h4>
                  <p className="text-base text-gray-600 font-nunito">Get guidance from founders throughout your journey</p>
                </div>
              </div>

              {/* Professional Network */}
              <div className="flex items-start space-x-3 p-4">
                <CheckCircle2 className="h-6 w-6 text-[#58cc02] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-lg font-nunito">CommandL Community</h4>
                  <p className="text-base text-gray-600 font-nunito">Connect with other CommandL developers and grow your network</p>
                </div>
              </div>

              {/* Unlimited Projects */}
              <div className="flex items-start space-x-3 p-4">
                <CheckCircle2 className="h-6 w-6 text-[#58cc02] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-lg font-nunito">Unlimited Projects</h4>
                  <p className="text-base text-gray-600 font-nunito">Build unlimited projects using CommandL</p>
                </div>
              </div>

              {/* Lifetime Access */}
              <div className="flex items-start space-x-3 p-4">
                <CheckCircle2 className="h-6 w-6 text-[#58cc02] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-lg font-nunito">Lifetime Project Access</h4>
                  <p className="text-base text-gray-600 font-nunito">Keep your CommandL projects forever, even after subscription</p>
                </div>
              </div>

              {/* Resume Tool */}
              <div className="flex items-start space-x-3 p-4">
                <CheckCircle2 className="h-6 w-6 text-[#58cc02] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-lg font-nunito">Advanced Resume Tool</h4>
                  <p className="text-base text-gray-600 font-nunito">Position yourself in the top 1% of job candidates</p>
                </div>
              </div>

              {/* Certificate */}
              <div className="flex items-start space-x-3 p-4">
                <CheckCircle2 className="h-6 w-6 text-[#58cc02] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-lg font-nunito">CommandL Certificate</h4>
                  <p className="text-base text-gray-600 font-nunito">Earn an official CommandL project completion certificate</p>
                </div>
              </div>
            </div>

            {/* CTA and Guarantee */}
            <div className="mt-12 flex flex-col items-center">
              <button 
                onClick={handleGetStarted}
                className="w-1/2 text-center bg-[#58cc02] text-xl text-white py-4 px-8 rounded-xl font-extrabold hover:bg-[#4ba802] transition-colors duration-200 font-nunito">
                Get Started Now
              </button>
              <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-gray-500 font-nunito">
                  No hidden fees. Start your journey today.
                </p>
                <p className="text-md text-[#58cc02] font-medium font-nunito">
                  30-day money-back guarantee, no questions asked
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
