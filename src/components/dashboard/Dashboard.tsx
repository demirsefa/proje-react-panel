import React from 'react';
import { DashboardGrid } from './DashboardGrid';

interface DashboardProps {
  children: React.ReactNode;
  columns?: number;
}

export function Dashboard({ children, columns }: DashboardProps) {
  return <DashboardGrid columns={columns}>{children}</DashboardGrid>;
}
