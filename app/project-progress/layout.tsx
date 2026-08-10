import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Roadmap | CommandL',
  description: 'Track your progress through the project roadmap',
};

export default function ProjectProgressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 