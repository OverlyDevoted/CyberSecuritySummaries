This was written [using this video as reference](https://www.youtube.com/watch?v=za2FZ8QCE18)

# What is React?

`React` is a library for building UI.

With React you can describe the UI you want to show by using components.

A tree of elements is outputted which then can be used by rendering libraries. In this case for React you would use `ReactDOM`

React tree can look like this:

```tsx
{
    type: 'div',
    props: [
        children: [
            {
                type: 'img',
                props: { src: 'img.jpg' }
            },
            {
                type: 'h1',
                children: "Card title"
            },
            {
                type: 'p',
                children: 'Lorem inpusm... '
            }
        ]
    ]
}
```

This can be used to render UI in react native, electron and other libraries.

React also keeps track of changes to data and outputs the output using something called state.

Using things like `jsx`, you can describe react components not with javascript, but with HTML-like syntax, but it also needs to be transpiled and babel and other bundlers are used for that.

## How does react know when to update the DOM

It's a three step process

1. Trigger

2. Render

3. Commit

### Trigger

There is 2 things that trigger the render process

1. Initial render, the first time the component is rendered with ReactDOM.createRoot()
2. When 1 or more states are updated in the component or it's ancestor

State updates are batched. So if one button click or any other event would update several states, only one rerender would be used to update those states. This helps to avoid too many rerenders.

The state change happens outside the event loop. That means, the value gets updated after the code is executed. If we had code like this:

```js
function handleExpand() {
  setIsTitleExpanded(!isTitleExpanded);
  setIsTextExpanded(!isTextExpanded);
  console.log(isTitleExpanded);
  console.log(isTextExpanded);
}
```

The console logs would output `false`. Now let's look at this code

```js
function handleIncrement() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
```

You would think this would increment by 3. But React takes a snapshot of the current state of the component and the same snapshot is used by the setCount function. That means, that it would update count of the same value, which in result only increments the count by one.

We can get the most recent state, by passing a function with a parameter, which would contain the current state of the variable.

```js
function handleIncrement() {
  setCount((previousState) => previousState + 1);
  setCount((previousState) => previousState + 1);
  setCount((previousState) => previousState + 1);
}
```

As you can see wee set the count to some other value that is returned by the callback. The callback gets passed the latest state of the variable that get handled by setCount.

### Render

React calls the component that triggered the trigger and it just calls the components. AS you may now you define components as functions and they just get called in the render step after the trigger.

This process is recursive, so if the components contains other components it will also call their respective functions.

What we end up with is a light-weight representation of what the UI should look like as a tree of react elements. There's some root element for the react and all of it's children (components) form a tree and that is the `Virtual DOM` (which is a tree of JS objects). So now when a state change triggers, the current Virtual DOM is compered with the last snapshot.

The diffing algorithm compares them and figures out the changes.

### Commit

During this stage, the changes are applied to the DOM using the least amount of necessary operations. And it only touches the DOM nodes that have changed.

### 4 stage Repaint

This is done by browser and only repaints the HTML to reflect the changes

## Why use Virtual DOM

It's better to create a tree of javascript objects than writing directly to the DOM as with the Virtual DOM, we can batch updates and apply them once which minimizes the amount of reflows and repaints. This process is also called **reconciliation**

The main problem is figuring out the differences between the old and new Virtual DOM. The complexity of the algorithm for comparing the differences is O(n^3) So if you had n=5 components it would take 125 operations to compare the tree.

That's why react is made to make assumptions in order to reduce the amount of comparisons:

1. Different element types produce different trees
2. Keys stay consistent across rerenders

### Assumption one demonstration

Let's examine an old tree and a new tree

New:

```html
<div>
    <h1>
    <article>
        <h2>
        <p>
    </article>
</div>
```

Old:

```html
<div>
    <h1>
    <a>
        <button>
    </a>
</div>
```

Now during the diffing algorithm, these trees would be compared line by line and it would spot that `article` is different than `a` element. So it would replace `a` and all it's contents entirely with the `article` and its contents

### Assumption two

You know how you can map an array and if you render components from that you need to assign a key to them?

The key is then used to tell React which elements are old elements from before, so it does not replace them if their order in the DOM changed

## State persistance

Variables declared in the component will be always redeclared. That's why states are used. Also changing those variables would not cause a rerender. They should always be used for values that do not change or for computed values that may be constructed from the states.
