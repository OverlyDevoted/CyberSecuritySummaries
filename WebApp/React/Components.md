Components are reusable components that can be used to build UI

Their purpose may be to execute heavy or only used for presentation

## Props

They also may accept props, which are variables that get passed down to the component. They are used to do logic on.

Special prop names:

- className (for styling)
- children (React nodes that get passed)
- key (id for list item)
- ref (for setting the ref, that will point to that component)

You have to define prop type for the component. You can either use JavaScript or TypeScript. It's more intuitive to use TS, but with `propTypes` lib for JS it's possible do that in a pure JS project.

## Composing components

When mapping out an array and according to values and rendering other components a key attribute should assign to each component rendered that way. It must be unique, and using array index for the component should be avoided. That ID is used commit stage of ReactDOM render process. It's used to determined what actually changed in the DOM. It's away to optimize rerender process.

## Component events

They should be written in camelCase

Event handlers should be named starting with a word `handle` and then the action e.g. `Click`, while function props should start with `on`.

Funtions passed to event handlers should be passed, not called

```jsx
<button type='button' onClick={handleClick}>
    {label}
</button>
```
