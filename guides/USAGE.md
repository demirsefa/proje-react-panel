# React Panel Library

A powerful and flexible React-based panel library for building administrative interfaces and data management systems.

## Features

- **List Page Component**: Built-in list view with customizable cells and image handling
- **Form Page Component**: Flexible form creation and management
- **Login Component**: Authentication handling
- **Layout System**: Consistent layout management
- **Panel Component**: Core panel functionality
- **Counter Component**: Utility component for counting operations
- **Dashboard Components**: Flexible grid-based dashboard layout system
- **Color System**: Centralized color system with SCSS variables and CSS custom properties

## Decorators

The library provides several decorators for enhanced functionality:

### List Decorators

- `@List`: Main list decorator for creating list views
- `@ImageCell`: Specialized cell for handling images in lists
- `@Cell`: Base cell decorator for list items

### Form Decorators

- `@Input`: Form input decorator
- `@Crud`: CRUD operations decorator

## Installation

```bash
npm install proje-react-panel
# or
yarn add proje-react-panel
```

## Usage

```typescript
import { Panel, ListPage, FormPage, Login, Layout, DashboardGrid, DashboardItem } from 'proje-react-panel';

// Initialize the panel
const panel = new Panel({
  // configuration options
});

// Use components
<Layout>
  <ListPage />
  <FormPage />
  <Login />
</Layout>

// Dashboard example
<DashboardGrid columns={3}>
  <DashboardItem>Content 1</DashboardItem>
  <DashboardItem>Content 2</DashboardItem>
  <DashboardItem>Content 3</DashboardItem>
</DashboardGrid>
```

## Guides

- **[Dashboard Guide](./guides/DASHBOARD_GUIDE.md)** - Complete guide for using Dashboard components
- **[Auth Layout Guide](./guides/AUTH_LAYOUT_GUIDE.md)** - Guide for implementing authentication layouts with sidebar
- **[Auth Layout Example](./guides/AUTH_LAYOUT_EXAMPLE.md)** - Complete working example of AuthLayout implementation
- **[Color System Guide](./guides/COLOR_SYSTEM_GUIDE.md)** - Complete documentation of the color system, SCSS variables, and CSS custom properties
- **[Implementation Guide](./guides/IMPLEMENTATION_GUIDE.md)** - Comprehensive guide for implementing the library in your React applications

## Type Definitions

The library includes TypeScript definitions for better development experience:

- `InitPanelOptions`: Configuration options for panel initialization
- `ScreenCreatorData`: Data structure for screen creation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
