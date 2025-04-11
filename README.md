# React Panel Library

A powerful and flexible React-based panel library for building administrative interfaces and data management systems.

## Features

- **List Page Component**: Built-in list view with customizable cells and image handling
- **Form Page Component**: Flexible form creation and management
- **Login Component**: Authentication handling
- **Layout System**: Consistent layout management
- **Panel Component**: Core panel functionality
- **Counter Component**: Utility component for counting operations

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
import { Panel, ListPage, FormPage, Login, Layout } from 'proje-react-panel';

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
```

## Type Definitions

The library includes TypeScript definitions for better development experience:

- `InitPanelOptions`: Configuration options for panel initialization
- `ScreenCreatorData`: Data structure for screen creation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
