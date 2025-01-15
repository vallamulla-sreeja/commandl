import Sidebar from '../components/Sidebar';

export default function ProjectDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="hide-footer flex">
      <Sidebar />
      <main className="flex-1 ml-72 p-8">
        {children}
      </main>
    </div>
  );
} 