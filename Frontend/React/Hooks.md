# React Hooks

React has their built-in hooks and they introduce a way to better handle state changes, rerender process, accessing values. You can also build your own hooks.

## Most common hooks

- useState
- useEffect
- useRef
- useMemo / useCallback

### useState

Is used to store component specific information. May be used for state management.

- state setters are asynchronous
- state and state setters are declared using array destructuring

### useEffect

It's aa hook that let's you to set side effects. _e.g. setup server connection, send analytics logs when component appears on the screen_

`useEffect` let's you to run some code after the component is rendered, so that you can synchronize your component with some system outside React

```jsx
const [input, setInput] = useState("");

useEffect(() => {
  if (input.length > 10) {
    console.log("You have reached 10 characters");
  }
}, [input]);
```

If dependency array is empty, useEffect will run once on mount. 

Or if there is a dependency, it will call the function inside every time the dependency is changed. The comparison is done with [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison, so it's better to use primitive types. But arrays or objects can be used as well.

You can also define **clean-up** event listeners when component is unmounting. And it's done by returning a callback in effect function.

### useRef

Let's you reference a value that is not needed for rendering. The ref value gets updated in the background but does not cause rerenders.

Mostly it's used for DOM manipulations

- When submitting form, having inputs as refs can be used to read their value instead of using useState. This method removes rerenders for the input
- Calling element functions programmatically 

### useMemo

Used to cache the result of a calculation between rerenders

### useCallback

Used to cache function definition between rerenders

## Hook rules

- Function that start with **use** are React hooks
- Hooks are called at the top level of function component body
- Call hooks at the top level of a custom Hook body
- Do not call hooks inside conditions or loops
- Do not call hooks after a conditional return statement
- Do not call hooks in event handlers
- Do not call hooks in class components
- Do not call hooks inside function passed to `useMemo`, `useReducer`, `useEffect`

## Advanced hooks

- useReducer
- custom hooks

## Custom hook

They are usually written for operation that you do often. Fetching some data, state, establish a connection. 

### Example. Check if user is online

1. We need to implement a state, that would store if we are online
2. An Effect that subscribes to the global online and offline events, and updates the state

```tsx
import { useEffect, useState } from 'react';

const useIsOnline = (): boolean => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export default useIsOnline;
```

Good rule of thumb for when to make a custom hook is when you need some custom logic in different places. 


```tsx
import { useEffect, useState } from 'react';

interface UseFetchActivity {
  activity: string | null;
  isLoading: boolean;
  isError: boolean;
}

const useFetchAnyActivity = (): UseFetchActivity => {
  const [activity, setActivity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchAndSetData = async () => {
    try {
      const response = await fetch('https://www.boredapi.com/api/activity');
      const data = await response.json();
      setActivity(data?.activity);
    } catch {
      console.log('Error occurred while fetching the data');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);
  return { activity, isLoading, isError };
};

export default useFetchAnyActivity;
```

### useImperativeHandle

It let's you customize a ref that is passed from a parent inside of a child. It enables you to create *imperative handles* for things that are inside of children. So parents can call those handles through ref to trigger some behavior for a child. 

React uses declarative approach as its paradigm. SO it is advised to avoid imperative style.
