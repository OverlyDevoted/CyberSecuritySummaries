# ErrorBoundaries

If any rendering error occurs in the element the fallback will be called.

```tsx
<ErrorBoundary fallback={<p>Something went wrong</p>}>
  <CrashOnRenderComponent />
</ErrorBoundary>
```

But these do not catch errors for event handlers or asynchronous code.
