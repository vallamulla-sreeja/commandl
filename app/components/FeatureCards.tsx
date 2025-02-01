'use client';

import React, { JSX, Suspense } from 'react';
import Image from 'next/image';
import { List, ListItem, ListItemIcon } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import codingHandsOn from '../../public/lottie/coding_hands_on.json';
import allInOne from '../../public/lottie/all_in_one.json';
import clearPath from '../../public/lottie/clear_path.json';
import jiraBoard from '../../public/lottie/jira_board.json';
import rewards from '../../public/lottie/rewards.json';

interface Step {
  title: string;
  description: string;
  image: string;
  points: {
    icon: JSX.Element;
    text: string;
  }[];
}

const steps: Step[] = [
  {
    title: 'Your All-in-One Coding Solution',
    description: `
      No more juggling multiple tabs or tools. 
      <b><span style="color:#1cb0f6">CommandL</span></b> puts tutorials, 
      coding, and resources in a single workspace—so you focus on learning.
    `,
    image: '/lottie/all_in_one.json',
    points: [
      {
        icon: <CheckCircle className="text-[#58cc02]" />,
        text: 'Everything in one place for a streamlined experience.',
      },
      {
        icon: <Cancel className="text-[#FF0000]" />,
        text: 'No more constant tab-switching or tool overload.',
      },
    ],
  },
  {
    title: 'Hands-On from Day One',
    description: `
      Code right away. 
      Every concept comes with an immediate practice session, 
      ensuring you <b>learn by doing</b> at every step.
    `,
    image: '/lottie/coding_hands_on.json',
    points: [
      {
        icon: <CheckCircle className="text-[#58cc02]" />,
        text: 'Real-time coding tasks and immediate feedback.',
      },
      {
        icon: <Cancel className="text-[#FF0000]" />,
        text: 'No more passive "watch-only" tutorials.',
      },
    ],
  },
  {
    title: 'Clear, Structured Path',
    description: `
      <b><span style="color:#1cb0f6">CommandL</span></b> offers a 
      step-by-step roadmap from basics to advanced projects. 
      You always know your next move.
    `,
    image: '/lottie/clear_path.json',
    points: [
      {
        icon: <CheckCircle className="text-[#58cc02]" />,
        text: 'Guided tasks, checkpoints, and milestones.',
      },
      {
        icon: <Cancel className="text-[#FF0000]" />,
        text: 'No more "What\'s next?" confusion.',
      },
    ],
  },
  {
    title: 'Mimic Real-World Task Management',
    description: `
      Practice working like a real dev team. 
      Move tasks from <b>To-Do</b> to <b>In-Progress</b> to <b>Done</b>, 
      mirroring how modern companies organize projects —
      without the complexity of corporate tools.
    `,
    image: '/lottie/jira_board.json',
    points: [
      {
        icon: <CheckCircle className="text-[#58cc02]" />,
        text: 'Feels like using Jira boards but simplified for learning.',
      },
      {
        icon: <Cancel className="text-[#FF0000]" />,
        text: 'No more unrealistic or random tasks.',
      },
    ],
  },
  {
    title: 'Motivating Rewards & Feedback',
    description: `
      Earn points, badges, and get instant feedback 
      on every task you complete. 
      <b>Watch your progress grow</b> while leveling up your skills.
    `,
    image: '/lottie/rewards.json',
    points: [
      {
        icon: <CheckCircle className="text-[#58cc02]" />,
        text: 'Tangible achievements keep you motivated.',
      },
      {
        icon: <Cancel className="text-[#FF0000]" />,
        text: 'No more coding in a void with zero recognition.',
      },
    ],
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl space-y-16 md:space-y-24 lg:space-y-32">
        {steps.map((step, index) => (
          <StepSection key={index} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}

function StepSection({ step, index }: { step: Step; index: number }) {
  const { title, description, image, points } = step;

  const renderMedia = () => {
    const lottieProps = {
      loop: true,
      className: "w-full h-auto max-w-[450px] mx-auto"
    };

    if (image === '/lottie/coding_hands_on.json') {
      return (
        <Suspense fallback={<div className="w-full h-[450px] bg-gray-100 animate-pulse rounded-lg" />}>
          <Lottie animationData={codingHandsOn} {...lottieProps} />
        </Suspense>
      );
    }
    if (image === '/lottie/all_in_one.json') {
      return (
        <Suspense fallback={<div className="w-full h-[450px] bg-gray-100 animate-pulse rounded-lg" />}>
          <Lottie animationData={allInOne} {...lottieProps} />
        </Suspense>
      );
    }
    if (image === '/lottie/clear_path.json') {
      return (
        <Suspense fallback={<div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
          <Lottie animationData={clearPath} {...lottieProps} className="w-full h-auto max-w-[400px] mx-auto" />
        </Suspense>
      );
    }
    if (image === '/lottie/jira_board.json') {
      return (
        <Suspense fallback={<div className="w-full h-[450px] bg-gray-100 animate-pulse rounded-lg" />}>
          <Lottie animationData={jiraBoard} {...lottieProps} />
        </Suspense>
      );
    }
    if (image === '/lottie/rewards.json') {
      return (
        <Suspense fallback={<div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
          <Lottie animationData={rewards} {...lottieProps} className="w-full h-auto max-w-[400px] mx-auto" />
        </Suspense>
      );
    }
    return (
      <Image
        src={image}
        alt={title}
        width={500}
        height={312}
        className="rounded-lg w-full h-auto object-cover"
      />
    );
  };

  return (
    <div className="overflow-hidden">
      <div
        className={`flex flex-col ${
          index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } items-center gap-6 md:gap-8 lg:gap-12`}
      >
        <div className="lg:w-1/2 w-full flex justify-center px-4">
          <div className="relative w-full max-w-[500px]">
            {renderMedia()}
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full px-4 md:px-6 flex flex-col justify-center">
          <h3
            className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left"
            style={{ color: '#58cc02' }}
          >
            {title}
          </h3>
          <p
            className="text-lg md:text-xl mb-6 text-gray-700 text-center lg:text-left"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <List className="space-y-3">
            {points.map((point, i) => (
              <ListItem key={i} className="px-0">
                <ListItemIcon className="min-w-[40px]">{point.icon}</ListItemIcon>
                <p className="text-base md:text-lg text-gray-800">{point.text}</p>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
