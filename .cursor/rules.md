# React Component Development Rules

## 1. Component Declaration Style

Always use regular function declarations for React components instead of arrow functions or React.FC.

### ✅ Correct Way:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

### ❌ Incorrect Ways:

```typescript
// Don't use React.FC
export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// Don't use arrow functions
export const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
```

## 2. Props Typing

- Type props directly in the function parameters
- Use interfaces for complex prop types
- Keep prop interfaces close to the component

### ✅ Good Example:

```typescript
interface UserCardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onSelect: (userId: string) => void;
}

export function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div onClick={() => onSelect(user.id)}>
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

## 3. Performance Optimization Guidelines

### Performance Optimization Hooks Usage

#### React.memo

⚠️ **Warning**: Only use `React.memo` when you have identified a specific performance issue through profiling. Common use cases:

- Components that render frequently with the same props
- Components that are expensive to render
- Components that are rendered in lists with many items

#### useCallback

⚠️ **Warning**: Only use `useCallback` when:

- You're passing callbacks to optimized child components that rely on reference equality
- You have identified a specific performance issue through profiling
- The callback is used as a dependency in other hooks

#### useMemo

⚠️ **Warning**: Only use `useMemo` when:

- You have expensive computations that you want to cache
- You need referential equality for dependencies in other hooks
- You have identified a specific performance issue through profiling

### Performance Best Practices

1. Always start with functional components
2. Use named exports instead of default exports
3. Profile your application before adding performance optimizations
4. Document why you're using performance optimization hooks when you do use them
5. Consider using the React DevTools Profiler to identify actual performance bottlenecks

## 4. Benefits of This Approach

- Better TypeScript inference
- Cleaner and more readable code
- Easier to maintain and refactor
- Follows modern React best practices
- Reduces unnecessary type complexity
- Better IDE support and autocompletion

## 5. When to Break the Rules

These rules can be broken in specific cases:

- When working with legacy code that uses different patterns
- When team consensus prefers a different approach
- When specific project requirements dictate otherwise

## 6. Additional Guidelines

- Keep components focused and single-responsibility
- Use meaningful prop and interface names
- Document complex props with comments
- Export components as named exports
- Use TypeScript's strict mode
