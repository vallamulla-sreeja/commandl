'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const features = [
  {
    title: "CommandL Code Editor",
    description: "Access our powerful development environment with built-in AI"
  },
  {
    title: "2-Week Guided Program",
    description: "Build a real project in 2 weeks with mentorship"
  },
  {
    title: "Direct Mentorship",
    description: "Get guidance from founders and domain experts"
  },
  {
    title: "CommandL Community",
    description: "Connect with other CommandL developers and grow your network"
  },
  {
    title: "Unlimited Projects",
    description: "Build unlimited projects using CommandL"
  },
  {
    title: "Lifetime Project Access",
    description: "Keep your CommandL projects forever, even after subscription"
  },
  {
    title: "Advanced Resume Tool",
    description: "Position yourself in the top 1% of job candidates"
  },
  {
    title: "CommandL Certificate",
    description: "Earn an official CommandL project completion certificate"
  }
];

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
          <h2 className="text-4xl md:text-5xl font-bold text-[#4b4b4b] mb-4 font-nunito">
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
                <span className="text-6xl font-bold text-[#4b4b4b] font-nunito">$99</span>
                <span className="text-xl text-[#4b4b4b] font-nunito">/ year</span>
              </div>
              <div className="text-[#4b4b4b] text-lg font-nunito">
                One-time payment for full access to CommandL
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4">
                  <CheckCircle2 className="h-6 w-6 text-[#58cc02] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#4b4b4b] mb-1 text-xl font-bold font-nunito">{feature.title}</h4>
                    <p className="text-base text-[#4b4b4b] text-md font-nunito">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA and Guarantee */}
            <div className="mt-12 flex flex-col items-center">
              <button 
                onClick={handleGetStarted}
                className="w-1/2 text-center bg-[#58cc02] text-2xl text-white py-4 px-8 rounded-xl font-extrabold hover:bg-[#4ba802] transition-colors duration-200 font-nunito">
                Get Started for Free
              </button>
              <div className="mt-6 text-center space-y-2">
                <p className="text-lg text-[#4b4b4b] font-nunito font-bold">
                  No hidden fees. Start your journey today.
                </p>
                <p className="text-lg text-[#58cc02] font-bold font-nunito">
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
