import React from 'react';
import { SideBar } from './SideBar';
import { useAppStore } from '../../store/store';

export function Layout<IconType>({
  children,
  menu,
  getIcons,
  logout,
}: {
  children?: React.ReactNode;
  menu?: () => { name: string; path: string; iconType: IconType }[];
  getIcons?: (iconType: IconType) => React.ReactNode;
  logout?: (type: 'redirect' | 'logout') => void;
}) {
  const { user } = useAppStore(s => ({
    user: s.user,
  }));
  if (!user) {
    logout?.('redirect');
  }

  return (
    <div className="layout">
      <SideBar onLogout={logout} menu={menu} getIcons={getIcons} />
      <main className="content">{children}</main>
    </div>
  );
}
