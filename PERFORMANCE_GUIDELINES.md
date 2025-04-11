# React Performance Optimization Guidelines

## Performance Optimization Hooks Usage

### React.memo
⚠️ **Warning**: Only use `React.memo` when you have identified a specific performance issue through profiling. Common use cases:
- Components that render frequently with the same props
- Components that are expensive to render
- Components that are rendered in lists with many items

### useCallback
⚠️ **Warning**: Only use `useCallback` when:
- You're passing callbacks to optimized child components that rely on reference equality
- You have identified a specific performance issue through profiling
- The callback is used as a dependency in other hooks

### useMemo
⚠️ **Warning**: Only use `useMemo` when:
- You have expensive computations that you want to cache
- You need referential equality for dependencies in other hooks
- You have identified a specific performance issue through profiling

## Best Practices
1. Always start with functional components
2. Use named exports instead of default exports
3. Profile your application before adding performance optimizations
4. Document why you're using performance optimization hooks when you do use them
5. Consider using the React DevTools Profiler to identify actual performance bottlenecks

## Example of Proper Component Structure
```jsx
export function MyComponent({ prop1, prop2 }) {
  // Component logic here
  return (
    // JSX here
  );
}
``` 