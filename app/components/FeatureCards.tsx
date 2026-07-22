'use client';

import React, { JSX } from 'react';
import Image from 'next/image';
import { List, ListItem, ListItemIcon } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

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
    title: 'One Unified Environment',
    description: `
      No more juggling multiple tabs or tools. 
      <b><span style="color:#1cb0f6">CommandL</span></b> puts tutorials, 
      coding, and resources in a single workspace—so you focus on learning, 
      not setup hassles.
    `,
    image: '/images/unified_platform.png',
    points: [
      {
        icon: <CheckCircle className="text-[#58cc02]" />, // Green tick
        text: 'Everything in one place for a streamlined experience.',
      },
      {
        icon: <Cancel className="text-[#FF0000]" />, // Red cross
        text: 'No more constant tab-switching or tool overload.',
      },
    ],
  },
  {
    title: 'Hands-On from Day One',
    description: `
      Don’t just watch—code right away. 
      Every concept comes with an immediate practice session, 
      ensuring you <b>learn by doing</b> at every step.
    `,
    image: '/images/hands_on.png',
    points: [
      {
        icon: <CheckCircle className="text-[#58cc02]" />,
        text: 'Real-time coding tasks and immediate feedback.',
      },
      {
        icon: <Cancel className="text-[#FF0000]" />,
        text: 'No more passive “watch-only” tutorials.',
      },
    ],
  },
  {
    title: 'Clear, Structured Path',
    description: `
      Wondering what to learn next? 
      <b><span style="color:#1cb0f6">CommandL</span></b> offers a 
      step-by-step roadmap from basics to advanced projects. 
      You always know your next move.
    `,
    image: '/images/structured_path.png',
    points: [
      {
        icon: <CheckCircle className="text-[#58cc02]" />,
        text: 'Guided tasks, checkpoints, and milestones.',
      },
      {
        icon: <Cancel className="text-[#FF0000]" />,
        text: 'No more “What’s next?” confusion.',
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
    image: '/images/task_mgmt.png',
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
    image: '/images/gamified_rewards.png',
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
    <section className="py-8 bg-white">
      <div className="container mx-auto space-y-8">
        {steps.map((step, index) => (
          <StepSection key={index} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}

function StepSection({ step, index }: { step: Step; index: number }) {
  const { title, description, image, points } = step;

  return (
    <div className="overflow-hidden py-4">
      <div
        className={`flex flex-col ${
          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        } items-center gap-8`}
      >
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={image}
            alt={title}
            width={500}
            height={312}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Text & Checkpoints Section */}
        <div className="md:w-1/2 p-4 flex flex-col justify-center">
          <h3
            className="text-3xl font-bold mb-4 text-center md:text-left"
            style={{ color: '#58cc02' }} // Green heading
          >
            {title}
          </h3>
          <p
            className="text-xl mb-4 text-gray-700"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <List>
            {points.map((point, i) => (
              <ListItem key={i}>
                <ListItemIcon>{point.icon}</ListItemIcon>
                <p className="text-xl">{point.text}</p>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
