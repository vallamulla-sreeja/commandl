import { Nunito } from 'next/font/google';
import ProjectTaskBoardClient from './ProjectTaskBoardClient';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

interface PageProps {
  params: {
    id: string;
    sectionId: string;
    assignmentId: string;
  };
}

export default function ProjectTaskBoard({ params }: PageProps) {
  return (
    <div className={nunito.className}>
      <ProjectTaskBoardClient params={params} />
    </div>
  );
}