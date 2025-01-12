export default function ProjectDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="hide-footer">
      {children}
    </div>
  );
} 