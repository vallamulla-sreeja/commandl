'use client';

import React from 'react';
import Image from 'next/image';

interface Step {
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    title: 'Beginners way to build real projects',
    description:
      'A beginner-friendly code editor that guides you through building complete projects from start to finish, with everything you need in one place.',
    image: '/gifs/Structured_path.gif',
  },
  {
    title: 'Rewards & Feedback',
    description:
      'Earn points, badges, and instant feedback on every task to keep you motivated and accelerate your growth.',
    image: '/gifs/rewards.gif',
  },
  {
    title: 'Mimic Real-World Task Management',
    description:
      'Practice real dev workflows by moving tasks across boards, just like in professional environments, simplified for learning.',
    image: '/gifs/task_dashboard.gif',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl space-y-16 md:space-y-24 lg:space-y-32">
        {steps.map((step, index) => (
          <StepSection key={index} step={step} />
        ))}
      </div>
    </section>
  );
}

function StepSection({ step }: { step: Step }) {
  const { title, description, image } = step;

  return (
    <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#58cc02' }}>
        {title}
      </h3>
      <p className="text-xl md:text-2xl text-[#4b4b4b] max-w-3xl mx-auto">
        {description}
      </p>
      <div className="relative w-full max-w-[900px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src={image}
          alt={title}
          width={900}
          height={562}
          className="w-full h-auto object-contain"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}





// 'use client';

// import React, { JSX } from 'react';
// import Image from 'next/image';
// import { List, ListItem, ListItemIcon } from '@mui/material';
// import { CheckCircle, Cancel } from '@mui/icons-material';

// interface Step {
//   title: string;
//   description: string;
//   image: string;
//   points: {
//     icon: JSX.Element;
//     text: string;
//   }[];
// }

// const steps: Step[] = [
//   {
//     title: 'Your All-in-One Coding Solution',
//     description: `
//       No more juggling multiple tabs or tools. 
//       <b><span style="color:#1cb0f6">CommandL</span></b> puts tutorials, 
//       coding, and resources in a single workspace—so you focus on learning.
//     `,
//     image: '/gifs/task_dashboard.gif',
//     points: [
//       {
//         icon: <CheckCircle className="text-[#58cc02]" />,
//         text: 'Everything in one place for a streamlined experience.',
//       },
//       {
//         icon: <Cancel className="text-[#FF0000]" />,
//         text: 'No more constant tab-switching or tool overload.',
//       },
//     ],
//   },
//   {
//     title: 'Hands-On from Day One',
//     description: `
//       Code right away. 
//       Every concept comes with an immediate practice session, 
//       ensuring you <b>learn by doing</b> at every step.
//     `,
//     image: '/gifs/tutorial.gif',
//     points: [
//       {
//         icon: <CheckCircle className="text-[#58cc02]" />,
//         text: 'Real-time coding tasks and immediate feedback.',
//       },
//       {
//         icon: <Cancel className="text-[#FF0000]" />,
//         text: 'No more passive "watch-only" tutorials.',
//       },
//     ],
//   },
//   {
//     title: 'Clear, Structured Path',
//     description: `
//       <b><span style="color:#1cb0f6">CommandL</span></b> offers a 
//       step-by-step roadmap from basics to advanced projects. 
//       You always know your next move.
//     `,
//     image: '/gifs/Structured_path.gif',
//     points: [
//       {
//         icon: <CheckCircle className="text-[#58cc02]" />,
//         text: 'Guided tasks, checkpoints, and milestones.',
//       },
//       {
//         icon: <Cancel className="text-[#FF0000]" />,
//         text: 'No more "What\'s next?" confusion.',
//       },
//     ],
//   },
//   {
//     title: 'Mimic Real-World Task Management',
//     description: `
//       Practice working like a real dev team. 
//       Move tasks from <b>To-Do</b> to <b>In-Progress</b> to <b>Done</b>, 
//       mirroring how modern companies organize projects —
//       without the complexity of corporate tools.
//     `,
//     image: '/gifs/chat.gif',
//     points: [
//       {
//         icon: <CheckCircle className="text-[#58cc02]" />,
//         text: 'Feels like using Jira boards but simplified for learning.',
//       },
//       {
//         icon: <Cancel className="text-[#FF0000]" />,
//         text: 'No more unrealistic or random tasks.',
//       },
//     ],
//   },
//   {
//     title: 'Motivating Rewards & Feedback',
//     description: `
//       Earn points, badges, and get instant feedback 
//       on every task you complete. 
//       <b>Watch your progress grow</b> while leveling up your skills.
//     `,
//     image: '/gifs/rewards.gif',
//     points: [
//       {
//         icon: <CheckCircle className="text-[#58cc02]" />,
//         text: 'Tangible achievements keep you motivated.',
//       },
//       {
//         icon: <Cancel className="text-[#FF0000]" />,
//         text: 'No more coding in a void with zero recognition.',
//       },
//     ],
//   },
// ];

// export default function HowItWorksSection() {
//   return (
//     <section className="py-12 md:py-16 lg:py-20 bg-white">
//       <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl space-y-16 md:space-y-24 lg:space-y-32">
//         {steps.map((step, index) => (
//           <StepSection key={index} step={step} index={index} />
//         ))}
//       </div>
//     </section>
//   );
// }

// function StepSection({ step, index }: { step: Step; index: number }) {
//   const { title, description, image, points } = step;

//   return (
//     <div className="overflow-hidden">
//       <div
//         className={`flex flex-col ${
//           index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
//         } items-center gap-6 md:gap-8 lg:gap-12`}
//       >
//         <div className="lg:w-3/5 w-full flex justify-center px-4">
//           <div className="relative w-full max-w-[900px] rounded-lg overflow-hidden shadow-lg">
//             <Image
//               src={image}
//               alt={title}
//               width={900}
//               height={562}
//               className="w-full h-auto object-contain"
//               priority
//               unoptimized
//               style={{ maxHeight: '600px' }}
//             />
//           </div>
//         </div>
        
//         <div className="lg:w-2/5 w-full px-4 md:px-6 flex flex-col justify-center">
//           <h3
//             className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left"
//             style={{ color: '#58cc02' }}
//           >
//             {title}
//           </h3>
//           <p
//             className="text-lg md:text-xl mb-6 text-gray-700 text-center lg:text-left"
//             dangerouslySetInnerHTML={{ __html: description }}
//           />
//           <List className="space-y-3">
//             {points.map((point, i) => (
//               <ListItem key={i} className="px-0">
//                 <ListItemIcon className="min-w-[40px]">{point.icon}</ListItemIcon>
//                 <p className="text-base md:text-lg text-gray-800">{point.text}</p>
//               </ListItem>
//             ))}
//           </List>
//         </div>
//       </div>
//     </div>
//   );
// }