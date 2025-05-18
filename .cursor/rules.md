# React Component Development Rules

## 1. Component Structure

Use regular function declarations for components:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

## 2. Props and Types

- Type props directly in function parameters
- Use interfaces for complex props
- Keep interfaces close to components

## 3. Performance Guidelines

### Only use these when necessary:

- `React.memo`: For frequently rendered components with same props
- `useCallback`: For callbacks passed to optimized child components
- `useMemo`: For expensive computations or referential equality needs

### Best Practices:

1. Start with functional components
2. Use named exports
3. Profile before optimizing
4. Document optimization reasons

## 4. Styling

Use SCSS exclusively for styling.

## 5. General Rules

- Keep components focused and single-responsibility
- Use meaningful names
- Document complex props
- Use TypeScript's strict mode
