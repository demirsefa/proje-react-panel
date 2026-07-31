import React, { useEffect, useRef } from 'react';
import { SideBar } from './SideBar';
import { LoadingScreen } from '../LoadingScreen';
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
  const redirected = useRef(false);

  // Yonlendirme render govdesinde degil effect'te yapiliyor: render sirasindaki
  // yan etki React kuralini ihlal ediyor ve StrictMode'da iki kez tetikleniyordu.
  useEffect(() => {
    if (user || redirected.current) {
      return;
    }
    redirected.current = true;
    logout?.('redirect');
  }, [user, logout]);

  // Oturum yokken children RENDER EDILMEZ. Eskiden `logout('redirect')` cagrilip
  // yine de tum layout donuluyordu; tarayici korumali ekrani boyayip ancak
  // ondan sonra login'e gidiyordu (panelin bir an gorunup kaybolmasi).
  if (!user) {
    return <LoadingScreen id="layout-auth-redirect" />;
  }

  return (
    <div className="layout">
      <SideBar onLogout={logout} menu={menu} getIcons={getIcons} />
      <main className="content">{children}</main>
    </div>
  );
}
