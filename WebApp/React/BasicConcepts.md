General React concepts that are used in the docs and out in the wild.

## Arrow functions vs named functions

There is a difference between arrow function and named function components. Named functions will show up in stack traces.

## Composable components 

The components in react are composable. That means we can create many different components and compose a aggregate component to perform any function we desire.

## How useContext may ruin directional flow of data

Powerful tool, it simplifies code in a way that you do not have to do as much passing variables/constants through props, but it greatly complicates maintenance. Props come from parent to child, parent to child it creates an explicit data flow. useContext is like some sort of portal, it can plop any value into any place that uses it. There are some app level stuff, like users information. Most likely it would be used everywhere so to avoid passing it through everything you'd create context.

In frontend masters course, the context was introduced with a strong case for why it can introduce hard to maintain code. It has a lot of indirection and it is hard to track what manages and changes it. You would have to search all of the places that modify it.
