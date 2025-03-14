// Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from './SideBar';

export function Layout({
  children,
  noSidebar = false,
}: {
  children?: React.ReactNode;
  noSidebar?: boolean;
}) {
  return (
    <div className="layout">
      {!noSidebar && <SideBar />}
      <main className="content">{children || <Outlet />}</main>
    </div>
  );
}
