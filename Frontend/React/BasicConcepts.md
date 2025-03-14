General React concepts that are used in the docs and out in the wild.

## Arrow functions vs named functions

There is a difference between arrow function and named function components. Named functions will show up in stack traces.

## Composable components 

The components in react are composable. That means we can create many different components and compose a aggregate component to perform any function we desire.

## How useContext may ruin directional flow of data

Powerful tool, it simplifies code in a way that you do not have to do as much passing variables/constants through props, but it greatly complicates maintenance. Props come from parent to child, parent to child it creates an explicit data flow. useContext is like some sort of portal, it can plop any value into any place that uses it. There are some app level stuff, like users information. Most likely it would be used everywhere so to avoid passing it through everything you'd create context.

In frontend masters course, the context was introduced with a strong case for why it can introduce hard to maintain code. It has a lot of indirection and it is hard to track what manages and changes it. You would have to search all of the places that modify it.

## What are portals and their use cases

We create a root div for a portal, in the example case, we create an additional `<div id="modal"></div>` in our index. It will be referenced between renders, so how to we refer to it between different rerenders? Pure javascript solution would be to use `document.getElementById`. But it is a less performant API, especially if we do it inside the render. Using APIs that directly interact with the DOM are bringing us down the slow performance path. Because of those reasons react has **portals**.

## Class components

They are the old way of writing react. Might encounter them while working on an old codebase. 

Hooks cannot be used in class components. *You can cheat by passing a function component as a prop*

You can do ErrorBoundary component. It's apparently more suitable to create ErrorBoundary component with class component rather than function components

## Promise chaining

`.then().then()`

so you would return promise if you are hoping to continue to promise chain, meaning, wanting to do something after an async function
 
