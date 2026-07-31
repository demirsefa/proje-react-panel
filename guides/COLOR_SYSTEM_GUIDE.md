# Color System Guide

This guide documents the color system used in the `proje-react-panel` library. The system uses SCSS variables with the `dark-` prefix for the dark theme, which are then mapped to CSS custom properties with the `prp-` prefix for use throughout the application.

## Table of Contents

1. [Overview](#overview)
2. [SCSS Variables](#scss-variables)
3. [CSS Custom Properties](#css-custom-properties)
4. [Usage Guidelines](#usage-guidelines)
5. [Future: Light Theme Support](#future-light-theme-support)

---

## Overview

The color system is centralized in `src/styles/base/_variables.scss`. It consists of:

- **SCSS Variables**: Base color definitions with creative single-word names prefixed with `dark-`
- **CSS Custom Properties**: Runtime-accessible variables prefixed with `prp-` (proje-react-panel)
- **Theme Scoping**: All CSS custom properties are scoped to `.layout` for better isolation

### Naming Convention

- **SCSS Variables**: `$dark-[name]` (e.g., `$dark-void`)
- **CSS Variables**: `--prp-[category]-[purpose]` (e.g., `--prp-bg-primary`)

---

## SCSS Variables

SCSS variables are defined at the top of `_variables.scss` and are used only during compilation. They are prefixed with `dark-` to indicate they belong to the dark theme.

### Background Colors

| Variable       | Hex Value | Usage                                       | Example                                     |
| -------------- | --------- | ------------------------------------------- | ------------------------------------------- |
| `$dark-void`   | `#1a1a1a` | Darkest background - main page backgrounds  | Primary container backgrounds               |
| `$dark-slate`  | `#2b2b2b` | Dark background - secondary surfaces        | Cards, panels, secondary containers         |
| `$dark-mist`   | `#333333` | Medium dark background - elevated elements  | Input fields, headers, tertiary backgrounds |
| `$dark-silver` | `#444444` | Lighter dark background - borders, dividers | Border colors, hover states                 |

### Neutral Colors

| Variable      | Hex Value | Usage                       | Example                                    |
| ------------- | --------- | --------------------------- | ------------------------------------------ |
| `$dark-pearl` | `#ffffff` | White - primary text        | Main headings, primary text content        |
| `$dark-ash`   | `#e0e0e0` | Light gray - secondary text | Secondary text, borders                    |
| `$dark-dust`  | `#999999` | Medium gray - muted text    | Placeholders, disabled text, muted content |

### Action Colors

| Variable        | Hex Value | Usage                            | Example                                       |
| --------------- | --------- | -------------------------------- | --------------------------------------------- |
| `$dark-ocean`   | `#007bff` | Primary blue - main actions      | Primary buttons, links, main CTAs             |
| `$dark-sky`     | `#66b2ff` | Light blue - focus states        | Focus rings, active states, highlights        |
| `$dark-emerald` | `#4caf50` | Success green - positive actions | Success buttons, success messages, checkmarks |
| `$dark-ruby`    | `#ff4d4f` | Error red - error states         | Error messages, delete actions, warnings      |

---

## CSS Custom Properties

CSS custom properties are scoped to `.layout` and are accessible at runtime. They use the `prp-` prefix to avoid conflicts with other libraries.

### Background Variables

```css
--prp-bg-primary: #1a1a1a /* Main background */ --prp-bg-secondary: #2b2b2b
  /* Secondary background */ --prp-bg-tertiary: #333333 /* Tertiary background */
  --prp-bg-white: #ffffff /* White background */ --prp-bg-button-primary: #007bff
  /* Primary button background */ --prp-bg-button-success: #4caf50 /* Success button background */;
```

### Text Variables

```css
--prp-text-primary: #ffffff /* Primary text (white) */ --prp-text-secondary: #e0e0e0
  /* Secondary text (light gray) */ --prp-text-muted: #999999 /* Muted text (medium gray) */;
```

### Border Variables

```css
--prp-border-primary: #444444 /* Primary border */ --prp-border-light: #e0e0e0 /* Light border */;
```

### Color Variables

```css
--prp-color-focus: #66b2ff /* Focus/active states */ --prp-color-success: #4caf50
  /* Success states */ --prp-color-error: #ff4d4f /* Error states */;
```

### Shadow Variables

```css
--prp-shadow-light: rgba(0, 0, 0, 0.05) /* Subtle shadows */ --prp-shadow-medium: rgba(0, 0, 0, 0.2)
  /* Medium shadows */ --prp-shadow-dark: rgba(0, 0, 0, 0.3) /* Strong shadows */
  --prp-shadow-focus: rgba(102, 178, 255, 0.2) /* Focus ring shadows */;
```

---

## Usage Guidelines

### Using CSS Custom Properties

Always use CSS custom properties (not SCSS variables) in your stylesheets:

```scss
// ✅ Correct - Use CSS custom properties
.component {
  background-color: var(--prp-bg-primary);
  color: var(--prp-text-primary);
  border: 1px solid var(--prp-border-primary);
}

// ❌ Incorrect - Don't use SCSS variables directly
.component {
  background-color: $dark-void; // Only for compilation
}
```

### When to Use Each Variable

#### Backgrounds

- **`--prp-bg-primary`**: Main page/container backgrounds
- **`--prp-bg-secondary`**: Cards, panels, dropdown menus
- **`--prp-bg-tertiary`**: Input fields, headers, elevated surfaces
- **`--prp-bg-white`**: Special white backgrounds (checkboxes, etc.)

#### Text

- **`--prp-text-primary`**: Main content, headings, important text
- **`--prp-text-secondary`**: Secondary content, labels
- **`--prp-text-muted`**: Placeholders, hints, disabled text

#### Colors

- **`--prp-color-focus`**: Focus rings, active indicators
- **`--prp-color-success`**: Success messages, positive feedback
- **`--prp-color-error`**: Error messages, validation errors, destructive actions

#### Shadows

- **`--prp-shadow-light`**: Subtle elevation (cards, inputs)
- **`--prp-shadow-medium`**: Medium elevation (modals, popovers)
- **`--prp-shadow-dark`**: Strong elevation (dropdowns, tooltips)
- **`--prp-shadow-focus`**: Focus rings around interactive elements

---

## Future: Light Theme Support

The current system is designed with dark theme in mind. When implementing light theme support:

1. **Add light theme variables** with `light-` prefix:

   ```scss
   $light-[name]: #hexvalue;
   ```

2. **Use theme selector** to conditionally apply:

   ```scss
   .layout[data-theme='dark'] {
     --prp-bg-primary: #{$dark-void};
     // ...
   }

   .layout[data-theme='light'] {
     --prp-bg-primary: #{$light-snow};
     // ...
   }
   ```

3. **Maintain same CSS custom property names** - only the values change based on theme

---

## Maintenance

### Updating Colors

When modifying colors:

1. Update the SCSS variable in `_variables.scss`
2. The CSS custom property will automatically update (it references the SCSS variable)
3. **Update this guide** to reflect any changes
4. Test all components that use the affected colors

### Adding New Colors

1. Add the SCSS variable with `dark-` prefix
2. Add the corresponding CSS custom property in `.layout`
3. Document it in this guide
4. Update any relevant usage examples

### File Structure

```
src/styles/
├── base/
│   └── _variables.scss    ← SCSS variables defined here
├── layout.scss            ← Contains layout-specific styles
└── [other component files] ← Use CSS custom properties here
```

---

## Examples

### Example 1: Button Component

```scss
.button {
  background-color: var(--prp-bg-button-primary);
  color: var(--prp-text-primary);
  border: 1px solid var(--prp-border-primary);

  &:hover {
    box-shadow: 0 2px 4px var(--prp-shadow-medium);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--prp-shadow-focus);
  }
}
```

### Example 2: Input Field

```scss
.input {
  background-color: var(--prp-bg-tertiary);
  color: var(--prp-text-primary);
  border: 1px solid var(--prp-border-primary);

  &::placeholder {
    color: var(--prp-text-muted);
  }

  &:focus {
    border-color: var(--prp-color-focus);
    outline: none;
  }
}
```

### Example 3: Error Message

```scss
.error-message {
  background-color: var(--prp-bg-secondary);
  color: var(--prp-color-error);
  border-left: 4px solid var(--prp-color-error);
  padding: 1rem;
}
```

---

## Quick Reference

### Background Hierarchy

```
Darkest → Lightest
void → slate → mist → silver → pearl
```

### Text Hierarchy

```
Brightest → Most Muted
pearl → ash → dust
```

### Action Colors

```
ocean (primary) → sky (focus)
emerald (success)
ruby (error)
```

---

## Notes

- All colors are scoped to `.layout` to prevent conflicts
- The `prp-` prefix stands for "proje-react-panel"
- SCSS variables are compile-time only, CSS custom properties are runtime
- Always update this guide when modifying the color system
