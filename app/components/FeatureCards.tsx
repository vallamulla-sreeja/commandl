'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="flex flex-col md:flex-row gap-8 items-center py-16"
    >
      {index % 2 === 0 ? (
        <>
          <motion.div 
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            className="flex-1 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e1e1e]">{title}</h2>
            <p className="text-xl text-gray-600">{description}</p>
          </motion.div>
          <motion.div 
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            className="flex-1"
          >
            <Image
              src="/images/editor-screenshot.png"
              alt="Editor Screenshot"
              width={500}
              height={312}
              className="rounded-lg"
            />
          </motion.div>
        </>
      ) : (
        <>
          <motion.div 
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            className="flex-1 md:order-2"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e1e1e]">{title}</h2>
              <p className="text-xl text-gray-600">{description}</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            className="flex-1 md:order-1"
          >
            <Image
              src="/images/editor-screenshot.png"
              alt="Editor Screenshot"
              width={500}
              height={312}
              className="rounded-lg"
            />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

function RichFeatureSection() {
  return (
    <div className="py-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#1e1e1e] mb-4">Code with powerful features</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our editor comes packed with everything you need to learn coding effectively. From integrated tools to smart features, we&apos;ve got you covered.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Integrated Terminal Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Built-in Console</h3>
          <p className="text-gray-600">Execute code, view output, and debug right within the editor. No need to switch between windows.</p>
        </div>

        {/* Real-time Execution Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Instant Execution</h3>
          <p className="text-gray-600">Run your code instantly and see results in real-time. Perfect for learning through experimentation.</p>
        </div>

        {/* Code History Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
          <p className="text-gray-600">Keep track of your coding journey with automatic progress saving and detailed history.</p>
        </div>

        {/* Multi-device Support Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Cross-Platform</h3>
          <p className="text-gray-600">Access your learning environment from any device. Your progress syncs automatically.</p>
        </div>
      </div>
    </div>
  );
}

export default function FeatureCards() {
  const features = [
    {
      title: "Interactive Task Sidebar",
      description: "Stay focused with a dynamic to-do list of lessons, challenges, and checkpoints—all displayed in a dedicated sidebar. Switch between coding and instructions seamlessly without ever leaving the IDE.",
    },
    {
      title: "Built-In Tutorials & Hints",
      description: "Get instant help as you code. Enjoy inline guides and pop-up tips that explain new concepts or suggest fixes the moment you need them, reducing frustration and speeding up learning.",
    },
    {
      title: "Real-Time Execution & Debugging",
      description: "Run your code instantly and track issues in real time. With built-in debugging tools, you can set breakpoints, inspect variables, and gain immediate insights into how your code is working.",
    },
    {
      title: "Gamified Progress & Rewards",
      description: "Earn points, level up, and collect badges as you complete tasks. Turn coding into a rewarding journey that keeps you motivated and celebrates every milestone you achieve.",
    },
  ];

  return (
    <>
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
      <RichFeatureSection />
    </>
  );
} 