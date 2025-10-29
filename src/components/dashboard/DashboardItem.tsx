import React from 'react';

interface DashboardItemProps {
  children: React.ReactNode;
}

export function DashboardItem({ children }: DashboardItemProps) {
  return <div className="dashboard-item">{children}</div>;
}
