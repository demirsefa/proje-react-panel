import React from 'react';

interface DashboardGridProps {
  children: React.ReactNode;
  columns?: number;
}

export function DashboardGrid({ children, columns = 3 }: DashboardGridProps) {
  return (
    <div className="dashboard-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {children}
    </div>
  );
}
