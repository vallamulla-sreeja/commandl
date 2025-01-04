'use client';

import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ title, description, index }: FeatureCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center py-16">
      {index % 2 === 0 ? (
        <>
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: '#58cc02' }}>{title}</h2>
            <p className="text-xl text-gray-600" dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
          <div className="flex-1">
            <Image
              src="/images/editor-screenshot.png"
              alt="Editor Screenshot"
              width={500}
              height={312}
              className="rounded-lg"
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 md:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: '#58cc02' }}>{title}</h2>
              <p className="text-xl text-gray-600" dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
          </div>
          <div className="flex-1 md:order-1">
            <Image
              src="/images/editor-screenshot.png"
              alt="Editor Screenshot"
              width={500}
              height={312}
              className="rounded-lg"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function FeatureCards() {
  const features = [
    {
      title: "Built-In Tutorials & Hints",
      description: "Get instant help as you code. Enjoy <span style='color: #1cb0f6'>inline guides</span> and pop-up tips that explain new concepts or suggest fixes the moment you need them, reducing frustration and speeding up learning.",
    },
    {
      title: "Interactive Task Sidebar",
      description: "Stay focused with a <span style='color: #1cb0f6'>dynamic to-do list</span> of lessons, challenges, and checkpoints—all displayed in a dedicated sidebar. Switch between coding and instructions seamlessly without ever leaving the IDE.",
    },
    {
      title: "Gamified Progress & Rewards",
      description: "Earn points, level up, and collect <span style='color: #1cb0f6'>badges</span> as you complete tasks. Turn coding into a rewarding journey that keeps you motivated and celebrates every milestone you achieve.",
    },
    {
      title: "AI-Powered Code Assistance",
      description: "Get <span style='color: #1cb0f6'>intelligent suggestions</span> and best practices as you type. Our AI assistant helps you write better code and understand complex concepts with ease.",
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-4">
      <div className="space-y-16">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </div>
    </section>
  );
} 