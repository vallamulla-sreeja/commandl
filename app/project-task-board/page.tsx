import { Nunito } from 'next/font/google';
import ProjectTaskBoardClient from './ProjectTaskBoardClient';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

interface PageProps {
  params: Promise<{
    id: string;
    sectionId: string;
    assignmentId: string;
  }>;
}

export default async function ProjectTaskBoard({ params }: PageProps) {
  const resolvedParams = await params;
  
  return (
    <div className={nunito.className}>
      <ProjectTaskBoardClient params={resolvedParams} />
    </div>
  );
}