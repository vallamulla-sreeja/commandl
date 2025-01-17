'use client';

import { useEffect, useState } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div suppressHydrationWarning>
      {isMounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </div>
  );
} 