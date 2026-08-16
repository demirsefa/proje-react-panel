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
- `@SelectInput`: Select input decorator
- `@RichTextInput`: Rich text (TipTap) input decorator — needs the optional `@tiptap/react` + `@tiptap/starter-kit` peers
- `@CustomInput`: Render your own component in place of a field
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

## Custom Form Fields

When a field needs a control the library does not ship, `@CustomInput` lets your app render
it. The library only wires the field into `react-hook-form` and renders the label and the
error message like any other field — everything inside is yours.

```tsx
import { CustomInput, type CustomRenderProps } from 'proje-react-panel';

class Product {
  @Input({ label: 'Name' })
  name: string;

  @CustomInput({
    label: 'Cover image',
    render: ({ value, onChange, error }: CustomRenderProps) => (
      <MyImagePicker value={value as string} onSelect={onChange} invalid={!!error} />
    ),
  })
  coverImage: string;
}
```

The render function receives:

| Prop        | Type                       | Description                                         |
| ----------- | -------------------------- | --------------------------------------------------- |
| `fieldName` | `string`                   | Full form path of the field (nested paths included) |
| `value`     | `unknown`                  | Current form value                                  |
| `onChange`  | `(value: unknown) => void` | Writes a new value into the form                    |
| `error`     | `string \| undefined`      | Validation message for this field, if any           |

Because the value is whatever you pass to `onChange`, a custom field can hold an id, an
object or a file reference — validation and submit treat it like any other form value.

## What a field puts into the submitted body

The DOM hands every input value over as a string. The library converts it before it reaches
`onSubmit`, so a model does not need `@Type(() => Number)` to get a number:

| Field                             | Value in the submitted body                                           |
| --------------------------------- | --------------------------------------------------------------------- |
| `@Input({ inputType: 'number' })` | `number` — and `undefined` when the field is empty                    |
| `@Input({ inputType: 'date' })`   | `string` — the input's own `'YYYY-MM-DD'`, `''` when empty, no `Date` |
| `@Input({ type: 'checkbox' })`    | `boolean`                                                             |
| everything else                   | `string`                                                              |

Notes:

- **Empty number fields are `undefined`, not `0`.** `JSON.stringify` drops the key, so
  `@IsOptional()` fields simply stay unset, and a required `@IsInt()` fails with the message
  under the field instead of quietly posting `0`.
- **Date fields stay strings.** They are meant to be validated with `@IsString()` /
  `@IsISO8601()` and posted as-is; the library never turns them into `Date` objects.
- **`type: 'hidden'` follows the same rules** — declare `inputType: 'number'` on a hidden id
  and it reaches the body as a number rather than a string.
- `@Type(() => Number)` on a model keeps working; it just is not needed anymore.

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
