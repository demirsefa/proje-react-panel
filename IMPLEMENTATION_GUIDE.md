# Proje React Panel - Implementation Guide

A comprehensive guide for implementing the Proje React Panel library in your React applications.

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Basic Configuration](#basic-configuration)
3. [Authentication Setup](#authentication-setup)
4. [API Configuration](#api-configuration)
5. [Creating Models with Decorators](#creating-models-with-decorators)
6. [Form Implementation](#form-implementation)
7. [List Implementation](#list-implementation)
8. [Details Page Implementation](#details-page-implementation)
9. [Routing & Layout](#routing--layout)
10. [Advanced Features](#advanced-features)
11. [Complete Example](#complete-example)

## Installation & Setup

### Prerequisites

- React 19.0.0 or higher
- TypeScript
- React Router 7.3.0
- React Hook Form 7.54.2 or higher
- Zustand 5.0.3 or higher

### Install Dependencies

```bash
npm install proje-react-panel react react-dom react-router react-hook-form zustand class-validator class-transformer
```

### Required Peer Dependencies

```json
{
  "react": ">=19.0.0",
  "react-hook-form": ">=7.54.2",
  "react-router": "7.3.0",
  "react-select": "^5.10.1",
  "use-sync-external-store": ">=1.4.0",
  "zustand": ">=5.0.3"
}
```

## Basic Configuration

### 1. Initialize Your App

Create your main App component and wrap it with the `Panel` component:

```tsx
// App.tsx
import React from 'react';
import { Panel, Login, ListPage, FormPage, DetailsPage } from 'proje-react-panel';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
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
        <Routes>{/* Your routes here */}</Routes>
      </Router>
    </Panel>
  );
}
```

### 2. Entry Point

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
```

## Authentication Setup

### 1. API Configuration

Create an API configuration file to handle authentication and HTTP requests:

```typescript
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

  // Handle 401 errors globally
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

### 2. Login Form Implementation

```typescript
// types/Login.ts
import { MinLength } from 'class-validator';
import { Form, Input, login } from 'proje-react-panel';
import { dataFetchers } from '../api/dataFetchers';
import { setAuthToken } from '../api/apiConfig';

export interface LoginResponse {
  access_token: string;
  admin: AdminDetails; // Your user type
}

@Form<LoginForm, LoginResponse>({
  onSubmit: dataFetchers.auth.login,
  onSubmitSuccess: (data: LoginResponse) => {
    setAuthToken(data.access_token);
    login(data.admin, data.access_token, () => {
      window.location.href = '/';
    });
  },
  type: 'formData',
})
export class LoginForm {
  @MinLength(3)
  @Input({
    label: 'Username',
  })
  username: string;

  @Input({
    label: 'Password',
    inputType: 'password',
  })
  password: string;
}
```

## API Configuration

### 1. CRUD Operations

Create a CRUD utility for API operations:

```typescript
// api/crud.ts
import { getAxiosInstance } from './apiConfig';

export function create<T>(endpoint: string) {
  return async (data: T) => {
    const response = await getAxiosInstance().post(`/${endpoint}`, data);
    return response.data;
  };
}

export function getAll<T>(endpoint: string) {
  return async (params: any = {}) => {
    const response = await getAxiosInstance().get(`/${endpoint}`, { params });
    return response.data;
  };
}

export function getOne<T>(endpoint: string) {
  return async (id: string) => {
    const response = await getAxiosInstance().get(`/${endpoint}/${id}`);
    return response.data;
  };
}

export function update<T>(endpoint: string) {
  return async (data: T) => {
    const response = await getAxiosInstance().put(`/${endpoint}`, data);
    return response.data;
  };
}

export function remove(endpoint: string, idField: string) {
  return async (item: any) => {
    const response = await getAxiosInstance().delete(`/${endpoint}/${item[idField]}`);
    return response.data;
  };
}
```

### 2. Data Fetchers

Create a centralized data fetchers object:

```typescript
// api/dataFetchers.ts
import { create, getAll, getOne, update, remove } from './crud';
import { AdminList, CreateAdminForm, EditAdminForm, AdminDetails } from '../types/Admin';

export const dataFetchers = Object.freeze({
  admins: {
    getAll: getAll<AdminList>('admins'),
    details: getOne<AdminDetails>('admins'),
    create: create<CreateAdminForm>('admins'),
    update: update<EditAdminForm>('admins'),
    updateDetails: getOne<EditAdminForm>('admins'),
    remove: remove('admins', 'id'),
  },
  auth: {
    login: async (data: any) => {
      const response = await getAxiosInstance().post('/auth/login', data);
      return response.data;
    },
  },
});
```

## Creating Models with Decorators

The library uses decorators to define models for forms, lists, and details pages.

### 1. List Model

```typescript
// types/Admin.ts
import {
  Cell,
  List,
  Input,
  DetailsItem,
  Details,
  Form,
  SelectInput,
  LinkCell,
} from 'proje-react-panel';
import { dataFetchers } from '../api/dataFetchers';

@List({
  headers: {
    create: { path: 'create', label: 'Create' },
  },
  actions: (item: AdminList) => ({
    customActions: [
      {
        label: 'Custom Action',
        onClick: () => {
          alert('Custom action clicked');
        },
      },
    ],
    details: { path: '' + item.id, label: 'Details' },
    edit: { path: 'edit/' + item.id, label: 'Edit' },
    delete: { label: 'Delete', onRemoveItem: dataFetchers.admins.remove },
  }),
  getData: dataFetchers.admins.getAll,
  primaryId: 'id',
})
export class AdminList {
  @Cell({
    title: 'ID',
    type: 'uuid',
  })
  id: string;

  @Cell({
    title: 'Username',
  })
  username: string;

  @Cell({
    title: 'Email',
  })
  email: string;

  @Cell({
    title: 'Created At',
    type: 'date',
  })
  createdAt: string;

  @LinkCell({
    path: '/',
    placeHolder: 'Custom Link',
  })
  details: string;

  @Cell({
    title: 'Updated At',
    type: 'date',
  })
  updatedAt: string;
}
```

### 2. Form Model

```typescript
// Form base class
class AdminForm {
  @MinLength(3)
  @Input({
    label: 'Username',
  })
  username: string;

  @IsEmail()
  @Input({
    label: 'Email',
    inputType: 'email',
  })
  email: string;

  @ValidateIf(o => !o.__formEdit)
  @IsString()
  @MinLength(6)
  @Input({
    label: 'Password',
    inputType: 'password',
  })
  password: string;

  @IsEnum(['super-admin', 'admin'])
  @SelectInput({
    label: 'Role',
    defaultOptions: [
      { value: 'super-admin', label: 'Super Admin' },
      { value: 'admin', label: 'Admin' },
    ],
  })
  role: string;
}

// Create form
@Form({
  onSubmit: dataFetchers.admins.create,
  type: 'formData',
  redirectSuccessUrl: '/admins',
})
export class CreateAdminForm extends AdminForm {}

// Edit form
@Form({
  onSubmit: dataFetchers.admins.update,
  getDetailsData: dataFetchers.admins.updateDetails,
  redirectSuccessUrl: '/admins',
})
export class EditAdminForm extends AdminForm {}
```

### 3. Details Model

```typescript
@Details({
  getDetailsData: dataFetchers.admins.details,
  primaryId: 'username',
})
export class AdminDetails {
  @DetailsItem()
  id: string;

  @DetailsItem()
  username: string;

  @DetailsItem()
  email: string;

  @DetailsItem()
  role: string;

  @DetailsItem()
  createdAt: string;

  @DetailsItem()
  updatedAt: string;
}
```

## Form Implementation

### 1. Basic Form

```tsx
// In your routing
<Route path="create" element={<FormPage key="admin-create" model={CreateAdminForm} />} />
<Route path="edit/:id" element={<FormPage key="admin-edit" model={EditAdminForm} />} />
```

### 2. Form with Custom Validation

```typescript
import { IsEmail, IsString, MinLength, ValidateIf } from 'class-validator';

class UserForm {
  @IsString()
  @MinLength(3)
  @Input({ label: 'Username' })
  username: string;

  @IsEmail()
  @Input({ label: 'Email', inputType: 'email' })
  email: string;

  @ValidateIf(o => !o.__formEdit)
  @IsString()
  @MinLength(6)
  @Input({ label: 'Password', inputType: 'password' })
  password: string;

  @IsBoolean()
  @Input({ label: 'Is Active', type: 'checkbox' })
  isActive: boolean;
}
```

### 3. Form with Select Input

```typescript
@SelectInput({
  label: "Role",
  defaultOptions: [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ],
})
role: string;

// Dynamic options
@SelectInput({
  label: "Asset",
  defaultOptions: [],
  onSelectPreloader: async () => {
    const response = await dataFetchers.assets.getAll({});
    return response.data.map((asset) => ({
      value: asset.id,
      label: asset.filename,
    }));
  },
})
assetId: number;
```

## List Implementation

### 1. Basic List

```tsx
// In your routing
<Route path="" element={<ListPage key="admin-list" model={AdminList} />} />
```

### 2. List with Custom Header

```tsx
<Route
  path=""
  element={<ListPage key="admin-list" customHeader={<AdminListHeader />} model={AdminList} />}
/>
```

### 3. List with Custom Actions

```typescript
@List({
  actions: (item: AdminList) => ({
    customActions: [
      {
        label: "Custom Action",
        onClick: () => {
          // Custom action logic
        },
      },
    ],
    details: { path: "" + item.id, label: "Details" },
    edit: { path: "edit/" + item.id, label: "Edit" },
    delete: { label: "Delete", onRemoveItem: dataFetchers.admins.remove },
  }),
  // ... other options
})
```

### 4. Cell Types

```typescript
// Different cell types
@Cell({ title: "ID", type: "uuid" })
id: string;

@Cell({ title: "Created At", type: "date" })
createdAt: string;

@Cell({ title: "Is Active", type: "boolean" })
isActive: boolean;

// Link cells
@LinkCell({
  path: "/details",
  placeHolder: "View Details",
})
details: string;

@LinkCell({
  path: "/",
  placeHolder: "Click Me",
  onClick: (data: AdminList) => {
    alert(data.username);
  },
})
customLink: string;
```

## Details Page Implementation

### 1. Basic Details Page

```tsx
<Route path=":id" element={<DetailsPage key="admin-details" model={AdminDetails} />} />
```

### 2. Details Page with Custom Header

```tsx
<Route
  path=":id"
  element={
    <DetailsPage CustomHeader={AdminDetailsHeader} key="admin-details" model={AdminDetails} />
  }
/>
```

## Routing & Layout

### 1. Layout Component

```tsx
// AuthLayout.tsx
import { Outlet } from 'react-router';
import React from 'react';
import { Layout, logout } from 'proje-react-panel';
import { setAuthLogout } from './api/apiConfig';

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

function getMenu() {
  return [
    { name: 'Dashboard', path: '/', iconType: 'dashboard' },
    { name: 'Admins', path: '/admins', iconType: 'admin' },
    { name: 'Users', path: 'users', iconType: 'user' },
    // ... more menu items
  ];
}
```

### 2. Complete Routing Structure

```tsx
// App.tsx
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
            <Route path={'/'} index element={<Dashboard />} />

            <Route path={'admins'}>
              <Route path={''} element={<ListPage key="admin-list" model={AdminList} />} />
              <Route
                path={'create'}
                element={<FormPage key="admin-create" model={CreateAdminForm} />}
              />
              <Route
                path={'edit/:id'}
                element={<FormPage key="admin-edit" model={EditAdminForm} />}
              />
              <Route
                path={':id'}
                element={<DetailsPage key="admin-details" model={AdminDetails} />}
              />
            </Route>

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
          </Route>

          <Route path="/login" element={<Login key="login" model={LoginForm} />} />
        </Routes>
      </Router>
    </Panel>
  );
}
```

## Advanced Features

### 1. Custom Components

```tsx
// Custom header component
export function AdminListHeader() {
  return (
    <div>
      <h2>Admin Management</h2>
      <button
        onClick={() => {
          /* custom action */
        }}
      >
        Custom Action
      </button>
    </div>
  );
}

// Use in routing
<Route
  path=""
  element={<ListPage key="admin-list" customHeader={<AdminListHeader />} model={AdminList} />}
/>;
```

### 2. Dashboard Implementation

```tsx
// Dashboard.tsx
import React from 'react';
import { Counter } from 'proje-react-panel';

export function Dashboard() {
  return (
    <div className="dashboard">
      <Counter targetNumber={100} duration={2000} image={''} text={'Products'} />
      <Counter targetNumber={50} duration={2000} image={''} text={'Users'} />
      <Counter targetNumber={25} duration={2000} image={''} text={'Admins'} />
    </div>
  );
}
```

### 3. File Upload Forms

```typescript
// For file uploads, use type: "formData"
@Form({
  onSubmit: dataFetchers.assets.create,
  type: 'formData', // Important for file uploads
  redirectSuccessUrl: '/assets',
})
export class CreateAssetForm {
  @Input({ label: 'File', type: 'file' })
  file: File;
}
```

### 4. Conditional Fields

```typescript
class UserForm {
  @ValidateIf(o => !o.__formEdit)
  @IsString()
  @MinLength(6)
  @Input({ label: 'Password', inputType: 'password' })
  password: string;

  @ValidateIf(o => o.role === 'admin')
  @Input({ label: 'Admin Code' })
  adminCode: string;
}
```

## Complete Example

Here's a complete example of a simple CRUD implementation:

### 1. Model Definition

```typescript
// types/User.ts
import { IsEmail, IsString, MinLength, IsBoolean } from 'class-validator';
import { Cell, List, Input, Form, Details, DetailsItem } from 'proje-react-panel';
import { dataFetchers } from '../api/dataFetchers';

@List({
  headers: {
    create: { path: 'create', label: 'Create' },
  },
  actions: (item: UserList) => ({
    details: { path: '' + item.id, label: 'Details' },
    edit: { path: 'edit/' + item.id, label: 'Edit' },
    delete: { label: 'Delete', onRemoveItem: dataFetchers.users.remove },
  }),
  getData: dataFetchers.users.getAll,
  primaryId: 'id',
})
export class UserList {
  @Cell({ title: 'ID', type: 'uuid' })
  id: string;

  @Cell({ title: 'Username' })
  username: string;

  @Cell({ title: 'Email' })
  email: string;

  @Cell({ title: 'Is Active', type: 'boolean' })
  isActive: boolean;

  @Cell({ title: 'Created At', type: 'date' })
  createdAt: Date;
}

class UserForm {
  @IsString()
  @MinLength(3)
  @Input({ label: 'Username' })
  username: string;

  @IsEmail()
  @Input({ label: 'Email', inputType: 'email' })
  email: string;

  @IsString()
  @MinLength(6)
  @Input({ label: 'Password', inputType: 'password' })
  password: string;

  @IsBoolean()
  @Input({ label: 'Is Active', type: 'checkbox' })
  isActive: boolean;
}

@Form({
  onSubmit: dataFetchers.users.create,
  redirectSuccessUrl: '/users',
})
export class CreateUserForm extends UserForm {}

@Form({
  onSubmit: dataFetchers.users.update,
  getDetailsData: dataFetchers.users.updateDetails,
  redirectSuccessUrl: '/users',
})
export class EditUserForm extends UserForm {
  @Input({ label: 'ID', type: 'hidden' })
  id: string;
}

@Details({
  getDetailsData: dataFetchers.users.details,
  primaryId: 'id',
})
export class DetailsUserForm {
  @DetailsItem()
  id: string;

  @DetailsItem()
  username: string;

  @DetailsItem()
  email: string;

  @DetailsItem()
  isActive: boolean;

  @DetailsItem()
  createdAt: Date;
}
```

### 2. Routing Implementation

```tsx
// App.tsx
<Route path={'users'}>
  <Route path={''} element={<ListPage key="user-list" model={UserList} />} />
  <Route path={'create'} element={<FormPage key="user-create" model={CreateUserForm} />} />
  <Route path={'edit/:id'} element={<FormPage key="user-edit" model={EditUserForm} />} />
  <Route path={':id'} element={<DetailsPage key="user-details" model={DetailsUserForm} />} />
</Route>
```

## Best Practices

1. **Model Organization**: Keep your models organized in separate files by entity
2. **API Configuration**: Centralize your API configuration and data fetchers
3. **Error Handling**: Implement proper error handling in your API layer
4. **Validation**: Use class-validator decorators for form validation
5. **Type Safety**: Leverage TypeScript for better type safety
6. **Customization**: Use custom headers and components when needed
7. **Performance**: Use proper keys for React components to avoid unnecessary re-renders

## Troubleshooting

### Common Issues

1. **Authentication Issues**: Ensure your API configuration is properly initialized
2. **Form Validation**: Check that class-validator decorators are properly applied
3. **Routing**: Make sure your route paths match your model configurations
4. **API Calls**: Verify your data fetchers are correctly configured

### Debug Tips

1. Check browser console for errors
2. Verify API endpoints are working
3. Ensure all required dependencies are installed
4. Check that decorators are properly imported

This guide provides a comprehensive overview of implementing the Proje React Panel library. For more specific use cases, refer to the examples folder in the repository.
