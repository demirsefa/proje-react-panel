import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { ScreenCreatorData } from '../../types/ScreenCreatorData';
import { useAppStore } from '../../store/store';

type GetMenuFunction<IconType> = (
  screens: Record<string, ScreenCreatorData>
) => { name: string; path: string; iconType: IconType }[];

type GetIconsFunction<IconType> = (iconType: IconType) => React.ReactNode;

export function SideBar<IconType>({
  menu,
  getIcons,
  onLogout,
}: {
  menu?: GetMenuFunction<IconType>;
  getIcons?: GetIconsFunction<IconType>;
  onLogout?: () => void;
}) {
  const { screens, screenPaths } = useAppStore(s => ({
    screens: s.screens ?? {},
    screenPaths: s.screenPaths ?? {},
  }));
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to determine if a link is active
  const isActiveLink = (path: string) => {
    // For root path, we need exact match
    if (path === '/') {
      return location.pathname === path;
    }

    // Normalize paths by removing leading/trailing slashes for comparison
    const normalizedPath = path.replace(/^\/+|\/+$/g, '');
    const normalizedLocation = location.pathname.replace(/^\/+|\/+$/g, '');

    // Check if the current path matches the link path
    return (
      normalizedLocation === normalizedPath || normalizedLocation.startsWith(`${normalizedPath}/`)
    );
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button
        className="toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        aria-expanded={isOpen}
      >
        {isOpen ? '<' : '>'}
      </button>
      <nav className="nav-links">
        {menu?.(screens).map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
            aria-current={isActiveLink(item.path) ? 'page' : undefined}
          >
            <span className={'nav-links-icon'}>{getIcons?.(item.iconType)}</span>
            {isOpen ? <span>{item.name}</span> : null}
          </Link>
        ))}
      </nav>
      {onLogout && (
        <div className="sidebar-footer">
          <button
            className="logout-button"
            onClick={() => {
              if (onLogout) {
                onLogout();
                navigate(screenPaths.login);
              }
            }}
            aria-label="Logout"
          >
            <span className="nav-links-icon">
              {
                /*TODO: remove*/
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H2V4H6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 8L14 4M14 4L10 0M14 4H6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            </span>
            {isOpen ? <span>Logout</span> : null}
          </button>
        </div>
      )}
    </div>
  );
}
