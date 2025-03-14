Components are reusable components that can be used to build UI or introduce functionality

Their purpose may be to execute heavy or only used for presentation

# Atomic design pattern

Components impose a methodology for structuring your app into 5 distinct constructional blocks. These blocks help to have linear app development and separate concerns into their own modular functionalities.

In react atomic design can be visualized like this:

1. Atoms - single component: button, input, checkbox
2. Molecules - a group of atoms: create form from button, input checkbox
3. Organism - Connecting molecules together to create a unit of functionality: navigation bar
4. Templates - a group of many different organisms doing their thing or depending on each other to form a page where user can do some task
5. Pages - basically the app, user can explore a plethora of different pages with their own unique functionalities that are completely separate from the page before.

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
