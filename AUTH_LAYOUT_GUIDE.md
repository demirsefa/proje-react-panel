# AuthLayout with Sidebar Implementation Guide

This guide explains how to implement the `AuthLayout` component with a collapsible sidebar in your React application using the `proje-react-panel` library.

> **Note**: `AuthLayout` is a **helper component** created for the example application. It is **not part of the core `proje-react-panel` library**. This component demonstrates how to use the library's `Layout` component to create a complete authentication layout with sidebar functionality.

## Overview

The `AuthLayout` provides a complete authenticated layout with:

- Collapsible sidebar navigation
- User authentication handling
- Automatic redirect to login for unauthenticated users
- Logout functionality
- Responsive design
- Icon support for menu items

## Table of Contents

1. [Quick Start](#quick-start)
2. [Basic Implementation](#basic-implementation)
3. [Component Structure](#component-structure)
4. [Menu Configuration](#menu-configuration)
5. [Icon System](#icon-system)
6. [Styling](#styling)
7. [Authentication Setup](#authentication-setup)
8. [Complete Example](#complete-example)
9. [Advanced Usage](#advanced-usage)

## Quick Start

> **Important**: The `AuthLayout` component shown in this guide is a **helper component** that demonstrates how to use the `proje-react-panel` library. You'll need to create this component yourself as it's not included in the library.

> **Note**: The helper component uses React Router components like `Outlet`, `BrowserRouter`, `Route`, `Routes`, and `Link` - these are **not part of the `proje-react-panel` library** but are required dependencies for the helper component implementation.

To get started with AuthLayout, follow these steps:

1. **Install dependencies**:

   ```bash
   npm install proje-react-panel @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons react-router axios
   ```

   > **Important**: Use `react-router` (not `react-router-dom`) for all routing components.

2. **Create your AuthLayout component**:

   ```tsx
   // AuthLayout.tsx
   import { Outlet } from 'react-router';
   import { Layout, logout } from 'proje-react-panel';
   import { setAuthLogout } from './api/apiConfig';

   export function AuthLayout() {
     return (
       <Layout
         logout={() => {
           setAuthLogout();
           logout(() => (window.location.href = '/login'));
         }}
         getIcons={getIcons}
         menu={getMenu}
       >
         <Outlet />
       </Layout>
     );
   }
   ```

3. **Set up your routing**:

   ```tsx
   // App.tsx
   import { Panel } from 'proje-react-panel';
   import { BrowserRouter as Router, Route, Routes } from 'react-router'; // Use react-router, not react-router-dom
   import { AuthLayout } from './AuthLayout';

   export function App() {
     return (
       <Panel>
         <Router>
           <Routes>
             <Route path="/" element={<AuthLayout />}>
               {/* Your authenticated routes */}
             </Route>
             <Route path="/login" element={<Login />} />
           </Routes>
         </Router>
       </Panel>
     );
   }
   ```

   > **Important**: Always use `key` props on your route components to prevent rendering issues:

   ```tsx
   <Route path={"/"} index element={<Dashboard key="dashboard" />} />
   <Route path={"users"}>
     <Route path={""} element={<ListPage key="user-list" model={UserList} />} />
     <Route path={"create"} element={<FormPage key="user-create" model={CreateUserForm} />} />
   </Route>
   ```

4. **Add menu configuration** (see Menu Configuration section below)

## Basic Implementation

### 1. Import Required Components

```tsx
import { Outlet } from 'react-router'; // React Router component (not from proje-react-panel)
import React from 'react';
import { Layout, logout } from 'proje-react-panel'; // Core library components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // External dependency
import { setAuthLogout } from './api/apiConfig'; // Custom helper function
```

> **Important**: Always import from `react-router`, not `react-router-dom`. The library is designed to work with `react-router`.

### 2. Create the AuthLayout Component

```tsx
export function AuthLayout() {
  return (
    <Layout
      logout={() => {
        setAuthLogout();
        logout(() => {
          window.location.href = '/login';
        });
      }}
      getIcons={getIcons}
      menu={getMenu}
    >
      <Outlet />
    </Layout>
  );
}
```

## Component Structure

### Layout Component

The `Layout` component from `proje-react-panel` provides the main structure. This is the **core component from the library** that you'll use to build your custom AuthLayout:

> **Important**: The `Layout` component automatically redirects unauthenticated users to the login page. If no user is authenticated, it will call the `logout` function with `'redirect'` parameter.

```tsx
<Layout
  logout={logoutFunction} // Function to handle logout
  getIcons={getIcons} // Function to render icons
  menu={getMenu} // Function that returns menu items
>
  <Outlet /> // Child routes content
</Layout>
```

### Component Hierarchy

```
App
├── Panel (from proje-react-panel)
│   └── Router
│       └── Routes
│           ├── AuthLayout (authenticated routes)
│           │   ├── Layout (from proje-react-panel)
│           │   │   ├── SideBar
│           │   │   │   ├── Toggle Button
│           │   │   │   ├── Navigation Links
│           │   │   │   └── Logout Button
│           │   │   └── Main Content
│           │   │       └── <Outlet /> (child routes)
│           │   └── Child Routes (Dashboard, Admins, etc.)
│           └── Login Route
```

### Data Flow

```
AuthLayout
├── getMenu() → Menu Items Array
├── getIcons() → Icon Components
├── logout() → Authentication Cleanup
└── <Outlet /> → Rendered Child Components
```

### Props Interface

```tsx
interface LayoutProps<IconType> {
  children?: React.ReactNode;
  menu?: () => { name: string; path: string; iconType: IconType }[];
  getIcons?: (iconType: IconType) => React.ReactNode;
  logout?: (type: 'redirect' | 'logout') => void;
}
```

## Menu Configuration

### 1. Define Icon Types

```tsx
export type IconType =
  | 'dashboard'
  | 'admin'
  | 'user'
  | 'message'
  | 'thread'
  | 'assets'
  | 'localization'
  | 'language';
```

### 2. Create Menu Function

```tsx
function getMenu(): {
  name: string;
  path: string;
  iconType: IconType;
}[] {
  return [
    { name: 'Dashboard', path: '/', iconType: 'dashboard' },
    { name: 'Admins', path: '/admins', iconType: 'admin' },
    { name: 'Users', path: 'users', iconType: 'user' },
    { name: 'Threads', path: 'threads', iconType: 'thread' },
    { name: 'Messages', path: 'messages', iconType: 'message' },
    { name: 'Assets', path: 'assets', iconType: 'assets' },
    { name: 'Localization', path: 'localization?language=tr', iconType: 'localization' },
    { name: 'Languages', path: 'languages', iconType: 'language' },
  ];
}
```

### Menu Item Properties

- `name`: Display text for the menu item
- `path`: Route path (can include query parameters)
- `iconType`: Type identifier for the icon

## Icon System

### 1. Import Icons

```tsx
import {
  faDashboard,
  faEnvelope,
  faGlobe,
  faImage,
  faLanguage,
  faMessage,
  faUserAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
```

### 2. Create Icon Function

```tsx
function getIcons(iconType: IconType) {
  switch (iconType) {
    case 'dashboard':
      return <FontAwesomeIcon icon={faDashboard} />;
    case 'admin':
      return <FontAwesomeIcon icon={faUserAlt} />;
    case 'user':
      return <FontAwesomeIcon icon={faUserCircle} />;
    case 'message':
      return <FontAwesomeIcon icon={faEnvelope} />;
    case 'thread':
      return <FontAwesomeIcon icon={faMessage} />;
    case 'assets':
      return <FontAwesomeIcon icon={faImage} />;
    case 'localization':
      return <FontAwesomeIcon icon={faLanguage} />;
    case 'language':
      return <FontAwesomeIcon icon={faGlobe} />;
  }
}
```

### Custom Icon Implementation

You can use any React component as an icon:

```tsx
function getIcons(iconType: IconType) {
  switch (iconType) {
    case 'dashboard':
      return <YourCustomIcon />;
    case 'admin':
      return <span>👤</span>; // Emoji icons
    // ... other cases
  }
}
```

## Styling

### Layout Styles

The layout uses CSS classes that are automatically included with the library:

```scss
.layout {
  .content {
    flex: 1;
    padding: 0 0 0 1rem;
    overflow-y: auto;
    transition: margin-left 0.3s ease;
  }
}
```

### Sidebar Styles

The sidebar includes responsive behavior and animations:

```scss
.sidebar {
  position: relative;
  background-color: #343a40;
  height: 100vh;
  transition: width 0.3s ease;
  border-right: 1px solid #454d55;

  &.open {
    width: 250px;
  }

  &.closed {
    width: 60px;
  }
}
```

### Custom Styling

You can override styles by targeting the CSS classes:

```scss
// Custom sidebar background
.sidebar {
  background-color: #your-color;
}

// Custom navigation link styles
.nav-links a {
  color: #your-text-color;

  &:hover {
    background-color: #your-hover-color;
  }

  &.active {
    background-color: #your-active-color;
  }
}
```

## Authentication Setup

### Authentication Flow

The `Layout` component from `proje-react-panel` automatically handles authentication:

```tsx
// The Layout component checks user authentication automatically
<Layout
  logout={() => {
    setAuthLogout();
    logout(() => {
      window.location.href = '/login';
    });
  }}
  getIcons={getIcons}
  menu={getMenu}
>
  <Outlet />
</Layout>
```

**Authentication Behavior:**

- ✅ **Authenticated users**: See the layout with sidebar
- ❌ **Unauthenticated users**: Automatically redirected to `/login`
- 🔄 **Logout**: Clears tokens and redirects to `/login`
- 🔄 **401 errors**: Automatically handled by API interceptors

### 1. API Configuration

```tsx
// api/apiConfig.ts
import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance;

export function initApi(config: { baseUrl: string }) {
  axiosInstance = axios.create({
    baseURL: config.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Handle 401 responses
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        setAuthLogout();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}

export function setAuthLogout(): void {
  if (!axiosInstance) {
    throw new Error('API not initialized. Call initApi first.');
  }
  axiosInstance.defaults.headers.common['Authorization'] = null;
  localStorage.removeItem('token');
}
```

### 2. Initialize API

```tsx
// In your main App component
import { initApi, initAuthToken, setAuthToken } from './api/apiConfig';

initApi({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
});
initAuthToken();
```

## Complete Example

### App.tsx

```tsx
import React from 'react';
import { Login, Panel, ListPage, FormPage, DetailsPage } from 'proje-react-panel';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { AuthLayout } from './AuthLayout';
import { initApi, initAuthToken, setAuthToken } from './api/apiConfig';

// Initialize API
initApi({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
});
initAuthToken();

export function App() {
  return (
    <Panel
      onInit={appData => {
        if (appData.token) {
          setAuthToken(appData.token);
        }
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            {/* Your authenticated routes here */}
            <Route path={'/'} index element={<Dashboard />} />
            <Route path={'admins'}>
              <Route path={''} element={<ListPage model={AdminList} />} />
              <Route path={'create'} element={<FormPage model={CreateAdminForm} />} />
              <Route path={'edit/:id'} element={<FormPage model={EditAdminForm} />} />
              <Route path={':id'} element={<DetailsPage model={AdminDetails} />} />
            </Route>
            {/* Add more routes as needed */}
          </Route>
          <Route path="/login" element={<Login model={LoginForm} />} />
        </Routes>
      </Router>
    </Panel>
  );
}
```

### AuthLayout.tsx

```tsx
import { Outlet } from 'react-router';
import React from 'react';
import { Layout, logout } from 'proje-react-panel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDashboard,
  faEnvelope,
  faGlobe,
  faImage,
  faLanguage,
  faMessage,
  faUserAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { setAuthLogout } from './api/apiConfig';

export type IconType =
  | 'dashboard'
  | 'admin'
  | 'user'
  | 'message'
  | 'thread'
  | 'assets'
  | 'localization'
  | 'language';

function getIcons(iconType: IconType) {
  switch (iconType) {
    case 'dashboard':
      return <FontAwesomeIcon icon={faDashboard} />;
    case 'admin':
      return <FontAwesomeIcon icon={faUserAlt} />;
    case 'user':
      return <FontAwesomeIcon icon={faUserCircle} />;
    case 'message':
      return <FontAwesomeIcon icon={faEnvelope} />;
    case 'thread':
      return <FontAwesomeIcon icon={faMessage} />;
    case 'assets':
      return <FontAwesomeIcon icon={faImage} />;
    case 'localization':
      return <FontAwesomeIcon icon={faLanguage} />;
    case 'language':
      return <FontAwesomeIcon icon={faGlobe} />;
  }
}

function getMenu(): {
  name: string;
  path: string;
  iconType: IconType;
}[] {
  return [
    { name: 'Dashboard', path: '/', iconType: 'dashboard' },
    { name: 'Admins', path: '/admins', iconType: 'admin' },
    { name: 'Users', path: 'users', iconType: 'user' },
    { name: 'Threads', path: 'threads', iconType: 'thread' },
    { name: 'Messages', path: 'messages', iconType: 'message' },
    { name: 'Assets', path: 'assets', iconType: 'assets' },
    { name: 'Localization', path: 'localization?language=tr', iconType: 'localization' },
    { name: 'Languages', path: 'languages', iconType: 'language' },
  ];
}

export function AuthLayout() {
  return (
    <Layout
      logout={() => {
        setAuthLogout();
        logout(() => {
          window.location.href = '/login';
        });
      }}
      getIcons={getIcons}
      menu={getMenu}
    >
      <Outlet />
    </Layout>
  );
}
```

## Features

### Sidebar Functionality

- **Collapsible**: Click the toggle button to expand/collapse
- **Active State**: Current route is highlighted
- **Responsive**: Adapts to different screen sizes
- **Smooth Animations**: CSS transitions for better UX

### Authentication Features

- **Auto-redirect**: Redirects to login on 401 errors and for unauthenticated users
- **Token Management**: Handles JWT tokens automatically
- **Logout**: Clears tokens and redirects to login
- **Route Protection**: Automatically protects authenticated routes

### Navigation Features

- **Active Link Detection**: Automatically highlights current page
- **Icon Support**: FontAwesome or custom icons
- **Flexible Menu**: Easy to customize menu items

## Troubleshooting

### Common Issues

1. **Icons not showing**: Ensure FontAwesome is properly installed and imported
2. **Styling issues**: Check that CSS files are imported in your main stylesheet
3. **Authentication problems**: Verify API configuration and token handling
4. **Routing issues**: Ensure React Router is properly configured
5. **Rendering issues**: Always use `key` props on route components to prevent React rendering problems

### Debug Tips

- Check browser console for errors
- Verify API endpoints are accessible
- Ensure all required dependencies are installed
- Check that CSS classes are not being overridden

## Dependencies

Required packages:

```json
{
  "proje-react-panel": "^latest",
  "@fortawesome/fontawesome-svg-core": "^latest",
  "@fortawesome/free-solid-svg-icons": "^latest",
  "@fortawesome/react-fontawesome": "^latest",
  "react-router": "^latest",
  "axios": "^latest"
}
```

> **Note**: Only `proje-react-panel` is the core library. The other packages are dependencies you'll need to install to implement the AuthLayout helper component.

### Library vs Helper Component Dependencies

**Core Library Components** (from `proje-react-panel`):

- `Layout` - Main layout component with sidebar
- `logout` - Logout utility function
- `Panel` - Main application wrapper
- `Login`, `ListPage`, `FormPage`, `DetailsPage` - UI components

**Helper Component Dependencies** (external packages):

- `react-router` - For routing (`Outlet`, `BrowserRouter`, `Route`, `Routes`, `Link`)
- `@fortawesome/*` - For icons
- `axios` - For API calls
- `react` - React framework

### What's from the Library vs External Dependencies

**From `proje-react-panel` library:**

- `Layout` - Main layout with sidebar
- `Panel` - Application wrapper
- `Login`, `ListPage`, `FormPage`, `DetailsPage` - UI components
- `logout` - Utility function

**External dependencies (not from library):**

- `react-router` - Routing components (`Outlet`, `BrowserRouter`, `Route`, `Routes`, `Link`) - **Use `react-router`, NOT `react-router-dom`**
- `@fortawesome/*` - Icons
- `axios` - HTTP client
- `react` - React framework

## Advanced Usage

### Important: Use react-router (Not react-router-dom)

**Critical Requirement**: The `proje-react-panel` library is designed to work with `react-router`, not `react-router-dom`.

```tsx
// ✅ Correct - Use react-router
import { BrowserRouter as Router, Route, Routes, Outlet, Link } from 'react-router';

// ❌ Wrong - Don't use react-router-dom
import { BrowserRouter as Router, Route, Routes, Outlet, Link } from 'react-router-dom';
```

**Why react-router is required:**

- The library's components are built specifically for `react-router`
- `react-router-dom` has different APIs and behavior
- Using the wrong package will cause compatibility issues
- The library expects `react-router`'s specific component structure

### Important: Using Key Props

**Always use `key` props on your route components** to prevent React rendering issues:

```tsx
// ✅ Good - with key props
<Route path={"/"} index element={<Dashboard key="dashboard" />} />
<Route path={"users"}>
  <Route path={""} element={<ListPage key="user-list" model={UserList} />} />
  <Route path={"create"} element={<FormPage key="user-create" model={CreateUserForm} />} />
  <Route path={"edit/:id"} element={<FormPage key="user-edit" model={EditUserForm} />} />
  <Route path={":id"} element={<DetailsPage key="user-details" model={UserDetails} />} />
</Route>

// ❌ Bad - without key props (can cause rendering issues)
<Route path={"/"} index element={<Dashboard />} />
<Route path={"users"}>
  <Route path={""} element={<ListPage model={UserList} />} />
</Route>
```

**Why key props are important:**

- Prevents React from reusing components incorrectly
- Ensures proper component lifecycle management
- Avoids state persistence issues between route changes
- Improves performance by helping React identify components

### Custom Sidebar Behavior

You can customize the sidebar behavior by extending the Layout component:

```tsx
// CustomLayout.tsx
import { Layout } from 'proje-react-panel';
import { useState } from 'react';

export function CustomLayout({ children, ...props }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="custom-layout">
      <Layout {...props}>{children}</Layout>
    </div>
  );
}
```

### Dynamic Menu Items

Create dynamic menu items based on user permissions:

```tsx
function getMenu(userRole: string) {
  const baseMenu = [{ name: 'Dashboard', path: '/', iconType: 'dashboard' }];

  if (userRole === 'admin') {
    return [
      ...baseMenu,
      { name: 'Admins', path: '/admins', iconType: 'admin' },
      { name: 'Settings', path: '/settings', iconType: 'settings' },
    ];
  }

  return baseMenu;
}
```

### Custom Styling with CSS Variables

Use CSS variables for easy theming:

```scss
:root {
  --sidebar-bg: #343a40;
  --sidebar-width-open: 250px;
  --sidebar-width-closed: 60px;
  --sidebar-text-color: #e9ecef;
  --sidebar-active-color: #fff;
}

.sidebar {
  background-color: var(--sidebar-bg);
  width: var(--sidebar-width-open);

  &.closed {
    width: var(--sidebar-width-closed);
  }
}
```

### Integration with State Management

Integrate with Redux or Zustand for global state:

```tsx
// With Zustand
import { useAppStore } from './store/store';

export function AuthLayout() {
  const { user, logout } = useAppStore();

  return (
    <Layout
      logout={() => {
        logout();
        window.location.href = '/login';
      }}
      getIcons={getIcons}
      menu={() => getMenu(user?.role)}
    >
      <Outlet />
    </Layout>
  );
}
```

### Performance Optimization

For better performance with large menus:

```tsx
import { useMemo } from 'react';

export function AuthLayout() {
  const menuItems = useMemo(() => getMenu(), []);
  const iconFunction = useMemo(() => getIcons, []);

  return (
    <Layout menu={() => menuItems} getIcons={iconFunction} logout={handleLogout}>
      <Outlet />
    </Layout>
  );
}
```

This guide provides everything you need to implement a complete AuthLayout with sidebar functionality in your React application.
