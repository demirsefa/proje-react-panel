# AuthLayout Implementation Example

This file shows a complete working example of how to implement AuthLayout with sidebar in your React application.

> **Note**: `AuthLayout` is a **helper component** created for demonstration purposes. It is **not part of the core `proje-react-panel` library**. This example shows how to create your own AuthLayout using the library's `Layout` component.

> **Important**: The helper component uses React Router components (`Outlet`, `BrowserRouter`, `Route`, `Routes`, `Link`) and other external dependencies that are **not part of the `proje-react-panel` library**.

## File Structure

```
src/
├── App.tsx                 # Main application component
├── AuthLayout.tsx          # Authentication layout component
├── api/
│   └── apiConfig.ts        # API configuration
├── pages/
│   └── Dashboard.tsx       # Example dashboard page
└── types/
    └── Login.tsx           # Login form model
```

## Complete Implementation

### 1. App.tsx

```tsx
import React from 'react';
import { Login, Panel, ListPage, FormPage, DetailsPage } from 'proje-react-panel';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { Dashboard } from './pages/Dashboard';
import { AuthLayout } from './AuthLayout';
import { initApi, initAuthToken, setAuthToken } from './api/apiConfig';
import { LoginForm } from './types/Login';

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
          {/* Authenticated routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route path={'/'} index element={<Dashboard key="dashboard" />} />
            <Route path={'users'}>
              <Route path={''} element={<ListPage key="user-list" model={UserList} />} />
              <Route
                path={'create'}
                element={<FormPage key="user-create" model={CreateUserForm} />}
              />
              <Route
                path={'edit/:id'}
                element={<FormPage key="user-edit" model={EditUserForm} />}
              />
              <Route
                path={':id'}
                element={<DetailsPage key="user-details" model={UserDetails} />}
              />
            </Route>
            {/* Add more routes as needed */}
          </Route>

          {/* Public routes */}
          <Route path="/login" element={<Login model={LoginForm} />} />
        </Routes>
      </Router>
    </Panel>
  );
}
```

### 2. AuthLayout.tsx

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

### 3. api/apiConfig.ts

```tsx
import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance;

export function initApi(config: { baseUrl: string }) {
  axiosInstance = axios.create({
    baseURL: config.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Handle 401 responses automatically
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

export function initAuthToken(): void {
  if (!axiosInstance) {
    throw new Error('API not initialized. Call initApi first.');
  }
  const token = localStorage.getItem('token');
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export function setAuthToken(token: string): void {
  if (!axiosInstance) {
    throw new Error('API not initialized. Call initApi first.');
  }
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);
}

export function setAuthLogout(): void {
  if (!axiosInstance) {
    throw new Error('API not initialized. Call initApi first.');
  }
  axiosInstance.defaults.headers.common['Authorization'] = null;
  localStorage.removeItem('token');
}

export function getAxiosInstance(): AxiosInstance {
  if (!axiosInstance) {
    throw new Error('API not initialized. Call initApi first.');
  }
  return axiosInstance;
}
```

### 4. pages/Dashboard.tsx

```tsx
import React from 'react';

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}
```

### 5. types/Login.tsx

```tsx
import { Form } from 'proje-react-panel';

export const LoginForm = Form({
  title: 'Login',
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      required: true,
    },
  ],
  submitText: 'Login',
});
```

## Package.json Dependencies

```json
{
  "dependencies": {
    "proje-react-panel": "^latest",
    "@fortawesome/fontawesome-svg-core": "^6.4.0",
    "@fortawesome/free-solid-svg-icons": "^6.4.0",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "react-router": "^6.8.0",
    "axios": "^1.3.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

> **Important**: Use `react-router` (not `react-router-dom`) for all routing components.

## Environment Variables

Create a `.env` file in your project root:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Usage

1. Install dependencies: `npm install`
2. Start your development server: `npm run dev`
3. Navigate to `http://localhost:3000`
4. The app will redirect to `/login` if not authenticated
5. After login, you'll see the sidebar with navigation

## Features Demonstrated

- ✅ Authentication flow with automatic redirects
- ✅ Automatic redirect to login for unauthenticated users
- ✅ Collapsible sidebar with toggle button
- ✅ Active route highlighting
- ✅ Icon support with FontAwesome
- ✅ Logout functionality
- ✅ Responsive design
- ✅ API integration with token management
- ✅ Proper React key props for route components

## Important Notes

- **AuthLayout is a helper component**: This component is created specifically for this example and is not part of the `proje-react-panel` library
- **Core library component**: The `Layout` component from `proje-react-panel` is the actual library component that provides the sidebar functionality
- **External dependencies**: The helper component uses React Router (`Outlet`, `BrowserRouter`, `Route`, `Routes`, `Link`), FontAwesome, and Axios - these are not part of the core library
- **Use react-router**: Always use `react-router` (not `react-router-dom`) for all routing components
- **Automatic authentication**: The `Layout` component automatically redirects unauthenticated users to `/login`
- **Custom implementation**: You'll need to create your own AuthLayout component following this pattern
- **Flexible design**: You can customize the AuthLayout component to match your application's specific needs

### What's from the Library vs External Dependencies

**From `proje-react-panel` library:**

- `Layout` - Main layout with sidebar
- `Panel` - Application wrapper
- `Login`, `ListPage`, `FormPage`, `DetailsPage` - UI components
- `logout` - Utility function

**External dependencies (not from library):**

- `react-router` - Routing components
- `@fortawesome/*` - Icons
- `axios` - HTTP client
- `react` - React framework

This example provides a complete working implementation that you can use as a starting point for your own application.
