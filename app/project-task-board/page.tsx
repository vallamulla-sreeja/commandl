import { Nunito } from 'next/font/google';
import ProjectTaskBoardClient from './ProjectTaskBoardClient';
import Sidebar from '../components/Sidebar';

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
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className={`flex-1 lg:ml-72 transition-all duration-300 ${nunito.className}`}>
        <ProjectTaskBoardClient params={resolvedParams} />
      </div>
    </div>
  );
}