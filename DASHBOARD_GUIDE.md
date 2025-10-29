# Dashboard Components Guide

This guide explains how to use the Dashboard components from the `proje-react-panel` library to create flexible and responsive dashboard layouts.

## Overview

The Dashboard components provide a simple and flexible way to create grid-based dashboard layouts with:

- Configurable grid columns
- Responsive item containers
- Simple CSS styling
- Flexible component composition

## Table of Contents

1. [Quick Start](#quick-start)
2. [Components](#components)
3. [Basic Usage](#basic-usage)
4. [Advanced Usage](#advanced-usage)
5. [Styling](#styling)
6. [Examples](#examples)

## Quick Start

### Installation

The Dashboard components are part of the `proje-react-panel` library:

```bash
npm install proje-react-panel
# or
yarn add proje-react-panel
```

### Basic Example

```tsx
import { DashboardGrid, DashboardItem, Counter } from 'proje-react-panel';

export function MyDashboard() {
  return (
    <DashboardGrid columns={3}>
      <DashboardItem>
        <Counter targetNumber={100} duration={2000} image={''} text={'Products'} />
      </DashboardItem>
      <DashboardItem>
        <Counter targetNumber={50} duration={2000} image={''} text={'Orders'} />
      </DashboardItem>
      <DashboardItem>
        <Counter targetNumber={25} duration={2000} image={''} text={'Users'} />
      </DashboardItem>
    </DashboardGrid>
  );
}
```

## Components

### Dashboard

A convenience wrapper component that uses `DashboardGrid` internally.

**Props:**

- `children` (React.ReactNode): Child components to render
- `columns?` (number): Number of columns in the grid (default: 3)

**Example:**

```tsx
import { Dashboard } from 'proje-react-panel';

<Dashboard columns={3}>
  <DashboardItem>Content 1</DashboardItem>
  <DashboardItem>Content 2</DashboardItem>
</Dashboard>;
```

### DashboardGrid

The main grid container component that creates a CSS Grid layout.

**Props:**

- `children` (React.ReactNode): Child components to render
- `columns?` (number): Number of columns in the grid (default: 3)

**Example:**

```tsx
import { DashboardGrid } from 'proje-react-panel';

<DashboardGrid columns={3}>{/* Your dashboard items */}</DashboardGrid>;
```

### DashboardItem

A wrapper component for individual dashboard items. Ensures items take full width within their grid cell.

**Props:**

- `children` (React.ReactNode): Content to render inside the item

**Example:**

```tsx
import { DashboardItem } from 'proje-react-panel';

<DashboardItem>
  <YourComponent />
</DashboardItem>;
```

## Basic Usage

### Simple Grid Layout

Create a basic 3-column grid:

```tsx
import { DashboardGrid, DashboardItem } from 'proje-react-panel';

export function SimpleDashboard() {
  return (
    <DashboardGrid columns={3}>
      <DashboardItem>
        <div>Item 1</div>
      </DashboardItem>
      <DashboardItem>
        <div>Item 2</div>
      </DashboardItem>
      <DashboardItem>
        <div>Item 3</div>
      </DashboardItem>
    </DashboardGrid>
  );
}
```

### Using Dashboard Wrapper

The `Dashboard` component is a convenience wrapper:

```tsx
import { Dashboard, DashboardItem } from 'proje-react-panel';

export function WrappedDashboard() {
  return (
    <Dashboard columns={3}>
      <DashboardItem>Content 1</DashboardItem>
      <DashboardItem>Content 2</DashboardItem>
      <DashboardItem>Content 3</DashboardItem>
    </Dashboard>
  );
}
```

### Different Column Counts

Adjust the number of columns based on your needs:

```tsx
// 2 columns
<DashboardGrid columns={2}>
  {/* items */}
</DashboardGrid>

// 4 columns
<DashboardGrid columns={4}>
  {/* items */}
</DashboardGrid>

// 6 columns
<DashboardGrid columns={6}>
  {/* items */}
</DashboardGrid>
```

## Advanced Usage

### Dynamic Columns

Set columns dynamically based on screen size or state:

```tsx
import { useState } from 'react';
import { DashboardGrid, DashboardItem } from 'proje-react-panel';

export function ResponsiveDashboard() {
  const [columns, setColumns] = useState(3);

  return (
    <>
      <select value={columns} onChange={e => setColumns(Number(e.target.value))}>
        <option value={1}>1 Column</option>
        <option value={2}>2 Columns</option>
        <option value={3}>3 Columns</option>
        <option value={4}>4 Columns</option>
      </select>
      <DashboardGrid columns={columns}>
        <DashboardItem>Item 1</DashboardItem>
        <DashboardItem>Item 2</DashboardItem>
        <DashboardItem>Item 3</DashboardItem>
        <DashboardItem>Item 4</DashboardItem>
      </DashboardGrid>
    </>
  );
}
```

### Using with Counter Component

Combine Dashboard components with the Counter component:

```tsx
import { DashboardGrid, DashboardItem, Counter } from 'proje-react-panel';

export function StatsDashboard() {
  return (
    <DashboardGrid columns={3}>
      <DashboardItem>
        <Counter targetNumber={100} duration={2000} image={<Icon />} text={'Products'} />
      </DashboardItem>
      <DashboardItem>
        <Counter targetNumber={50} duration={2000} image={<Icon />} text={'Downloads'} />
      </DashboardItem>
      <DashboardItem>
        <Counter targetNumber={25} duration={2000} image={<Icon />} text={'Services'} />
      </DashboardItem>
    </DashboardGrid>
  );
}
```

### Custom Content

Wrap any content in DashboardItem:

```tsx
import { DashboardGrid, DashboardItem } from 'proje-react-panel';

export function CustomDashboard() {
  return (
    <DashboardGrid columns={2}>
      <DashboardItem>
        <div className="card">
          <h2>Title</h2>
          <p>Content goes here</p>
        </div>
      </DashboardItem>
      <DashboardItem>
        <div className="chart">{/* Chart component */}</div>
      </DashboardItem>
      <DashboardItem>
        <div className="table">{/* Table component */}</div>
      </DashboardItem>
    </DashboardGrid>
  );
}
```

### Conditional Rendering

Render items conditionally:

```tsx
import { DashboardGrid, DashboardItem } from 'proje-react-panel';

export function ConditionalDashboard({ showStats, showCharts }) {
  return (
    <DashboardGrid columns={3}>
      {showStats && (
        <DashboardItem>
          <StatsComponent />
        </DashboardItem>
      )}
      {showCharts && (
        <DashboardItem>
          <ChartComponent />
        </DashboardItem>
      )}
      <DashboardItem>
        <AlwaysVisibleComponent />
      </DashboardItem>
    </DashboardGrid>
  );
}
```

## Styling

### Default Styles

The dashboard components come with minimal default styles:

```scss
.dashboard-grid,
.dashboard {
  display: grid;
  gap: 1rem;
}

.dashboard-item {
  width: 100%;
}
```

### Custom Styling

You can override styles by targeting the CSS classes:

```scss
.dashboard-grid {
  gap: 2rem; // Custom gap
  padding: 1rem;
}

.dashboard-item {
  width: 100%;
  padding: 1rem;
  background-color: var(--bg-primary);
  border-radius: 8px;
}
```

### Responsive Styles

Use media queries for responsive layouts:

```scss
.dashboard-grid {
  display: grid;
  gap: 1rem;

  // Responsive columns
  @media (max-width: 768px) {
    grid-template-columns: 1fr !important;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
```

### CSS Variables

Use CSS variables for theming:

```scss
:root {
  --dashboard-gap: 1rem;
  --dashboard-item-padding: 1rem;
  --dashboard-item-radius: 8px;
}

.dashboard-grid {
  gap: var(--dashboard-gap);
}

.dashboard-item {
  padding: var(--dashboard-item-padding);
  border-radius: var(--dashboard-item-radius);
}
```

## Examples

### Complete Dashboard Example

```tsx
import React from 'react';
import { DashboardGrid, DashboardItem, Counter } from 'proje-react-panel';

export function CompleteDashboard() {
  return (
    <DashboardGrid columns={3}>
      <DashboardItem>
        <Counter targetNumber={100} duration={2000} image={<ProductsIcon />} text={'Products'} />
      </DashboardItem>
      <DashboardItem>
        <Counter targetNumber={50} duration={2000} image={<DownloadsIcon />} text={'Downloads'} />
      </DashboardItem>
      <DashboardItem>
        <Counter targetNumber={25} duration={2000} image={<ServicesIcon />} text={'Services'} />
      </DashboardItem>
      <DashboardItem>
        <Counter targetNumber={10} duration={2000} image={<AdminsIcon />} text={'Admins'} />
      </DashboardItem>
    </DashboardGrid>
  );
}
```

### Mixed Content Dashboard

```tsx
import { DashboardGrid, DashboardItem, Counter } from 'proje-react-panel';

export function MixedDashboard() {
  return (
    <DashboardGrid columns={2}>
      <DashboardItem>
        <Counter targetNumber={100} duration={2000} image={''} text={'Total Users'} />
      </DashboardItem>
      <DashboardItem>
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          {/* Activity list */}
        </div>
      </DashboardItem>
      <DashboardItem>
        <div className="chart">
          <h3>Sales Chart</h3>
          {/* Chart component */}
        </div>
      </DashboardItem>
      <DashboardItem>
        <div className="table">
          <h3>Latest Orders</h3>
          {/* Table component */}
        </div>
      </DashboardItem>
    </DashboardGrid>
  );
}
```

### Responsive Dashboard

```tsx
import { useEffect, useState } from 'react';
import { DashboardGrid, DashboardItem } from 'proje-react-panel';

export function ResponsiveDashboard() {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DashboardGrid columns={columns}>
      <DashboardItem>Item 1</DashboardItem>
      <DashboardItem>Item 2</DashboardItem>
      <DashboardItem>Item 3</DashboardItem>
      <DashboardItem>Item 4</DashboardItem>
    </DashboardGrid>
  );
}
```

## API Reference

### Dashboard Props

```typescript
interface DashboardProps {
  children: React.ReactNode;
  columns?: number; // Default: 3
}
```

### DashboardGrid Props

```typescript
interface DashboardGridProps {
  children: React.ReactNode;
  columns?: number; // Default: 3
}
```

### DashboardItem Props

```typescript
interface DashboardItemProps {
  children: React.ReactNode;
}
```

## Best Practices

1. **Always wrap content in DashboardItem**: This ensures proper spacing and width within grid cells
2. **Use appropriate column counts**: Consider your content and screen sizes when choosing columns
3. **Keep styles simple**: The components are designed to be minimal - add custom styling as needed
4. **Use Dashboard for convenience**: Use `Dashboard` if you prefer a simpler API, or `DashboardGrid` for more control
5. **Responsive design**: Consider using responsive breakpoints or dynamic column counts for mobile devices

## Troubleshooting

### Items not displaying correctly

- Ensure you're wrapping content in `DashboardItem`
- Check that CSS styles are properly imported
- Verify the `columns` prop is set correctly

### Grid not responsive

- The grid uses CSS Grid with fixed columns
- Use media queries or dynamic column state for responsive behavior
- Consider using CSS `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` for auto-responsive grids

### Styling issues

- Check that dashboard styles are imported in your main stylesheet
- Verify CSS specificity isn't being overridden
- Use browser DevTools to inspect computed styles

## Dependencies

The Dashboard components are part of the `proje-react-panel` library and require:

- React (^16.8.0 or later)
- TypeScript (optional, but recommended)

## Related Components

- [Counter Component](./README.md#counter-component) - For displaying animated counters
- [Layout Component](./AUTH_LAYOUT_GUIDE.md) - For page layouts with sidebar
