# Javascript principles

When javascript engine runs code it:

- Goes line-by-line. Thread of execution
- Saves variables, or code itself in computers memory, to come back to it and use it elsewhere

```javascript
const num = 3;
function multiplyBy2 (inputNumber){
  const result = inputNumber*2;
  return result;
}
const output = multiplyBy2(num);
const newOutput = multiplyBy2(10);
```

So when this code is ran, the execution goes line by line, saves identifiers[^1] and data associated with the line.

| Line | Identifier | Value |
| - | - | - |
| 1 | num | 3 |
| 2 | multiplyBy2 | F()[^2] |
| 6 | output | result of multiplyByTup(num) for that a new **execution context** is created |

[^1]: Identifier is a label to anything that is stored in a computer's memory
[^2]: **F()** denotes a function

Execution context are created to run code of a function. Execution context has 2 parts:

- Thread of execution
- Memory

We've already had one execution context. The **global execution context**. It ran the initial code, but now a `multiplyBy2` execution context gets created with it's own thread of execution and local memory.

`multiplyBy2` execution context

| Line | Identifier | Value |
| - | - | - |
| 1 | inputNumber | 3 |
| 2 | result | 6 |

then it return result. It looks up result and returns it to global context that called it.

## Call stack

- Javascript keeps track of what function is currently running (thread of execution)
- Run a function - add to call stack
- Finish running it - Javascript removes it
- Whatever is at the top - that is what we are currently running

So the call stack always has the `global()[^note]` function 

[^note] The engine itself calling the entry file

and it adds function onto it when they are met during execution of call stack. The thread of execution always runs the function that is at the top of the call stack. Functions are popped off the callstack when the thread of execution hits the `return` keyword and execution thread returns to `global()`

## Higher order functions

Let's say we have a function that accepts values as arguments. Higher order functions accepts additional functionality as arguments. That means JavaScript let's you to pass functions as arguments.  

```js
function copyAndTransform(array, tranformFn) {
  const output = []
  for (let i = 0; i < array.length; i++) {
    output.push(transformFn(array[i]))
  }
  return output
}
```
Bonus: does the `for` loop get its own execution context?

>! No it does not. Instead it gets **protected namespace**. With that, the `i` variable defined as a iterator will only be accessed within the curly braces of the `for` loop. It'a a protected memory space for labels defined inside the `for` loop. Same with `while`, `switch`, `if` anything that introduces it's own curly braces

The function we inserted into our higher order function is called **callback function**

### First-class objects

Functions are treated as first-class objects, which means they inherit object prototype and they are treated like any other object inside JavaScript. That's why they can be saved in variables, passed in as arguments. They are just objects behind the scenes, like arrays. 

When function is a property of another object, its then called a method. 

> Like functions defined inside classes are methods. 

### Benefits of higher order functions 

- They help write more declarative code. Core of functional programming and declarative programming
- Backbone of asynchronous JavaScript.

## Arrow function 

Legibility and readability

Legibility means to reduce the content to read
Readability the syntax and how something can be structured and grouped to make it more digestible by just observing

They are different from functions under the hood, but generally it's the same and it's considered more legible, but sometimes not more readable.

## Closures

Before diving into what closures are, let's discuss what it brings. It enables to write functions with their own memories that persist between its calls. It enables you to build iterators, handle partial application and maintain state in an asynchronous world

### Functions with memories

We know that when we call a function it creates a new execution context, that has it's own local memory for storing values. The local memory is also called - variable environment or state. When the function finishes running, it's execution context gets deleted with the memory and it's output gets transferred. Some data of local memory can be kept.

Let's say during a function call it returns another function.

```js
function outer() {
  let counter = 0;
  function inner() { counter++ ;}
  return inner;
}
const generatedFunc = outer();
generatedFunc();
generatedFunc();
```

In this case, when the `generatedFunc()` is called it goes through a call stack and the local memory of each scope to check for a variable `counter`. Intuitively it should not be finding the `counter`, because when we call `generatedFunc` there's no outer on the call stack anymore. It still can increment `counter`, but how - when the function was returned by outer and assigned to `generatedFunc` identifier in the global context, `generatedFunc` came out with the attached local memory of the `outer`. So now when it checks the scopes it checks its scope, then goes to check the attached local memory (in `[[scope]]` attribute). The colloquial name could be **covered over variable environment**. Covered over in a sense, that it cannot be accessed by anything but the function that captures the variable for it's scope.

JavaScript abides by lexical/static scope. Where the function is saved, determines it scope, or in other words, what data it will have access to. Dynamically scoped languages determines the variables the function has acces to by the location it was run. Knowing that a more precise name for function's backpack could be given - **Persistent lexical scope reference data**. But in general everyone calls it *closure* which is more of an umbrella term for the whole feature and not the extracted local memory of a saved function scope.

### Memoization

Memoization is a practice of storing and input and output for a function. With closures that can be made without creating additional variables

### Iterators and generators

Iterator could be a helper function, that each time returns a subsequent array element

Generator can be used to create a pausing of a function

### Module pattern

Creating variables in the persistent lexical scope reference data can help avoid polluting global namespace with variables

## JavaScript synchronous execution

JavaScript does not have any asynchronous code execution features. It does not create treads to execute background tasks. Instead it uses synchronisity to simulate asynchronous behavior.

### Web browsers

To understand how some behaviors inside of JavaScript are possible it's important to look further and at the back-bone it stands on.

Browser and JS runtimes have some features, that JS utilizes to enrich it's toolkit. So browser has APIs for sending network requests, rendering and JS uses it but not implement it. JavaScript may seem to have related functionalities implemented, but those are facade functionalities. 

JavaScript does not have `settimeout` implemented, it uses the runtime API to create a timer. Same for accessing the DOM, we use `document`, `fetch`, `console`. All these are labels (API implementations) for runtime features.

### Event loop

```js
setTimeout(() => console.log("Hello"), 0)
console.log("Bye")
```

How will this code run? Intuitively it seems that `"Hello"` and then `"Bye"` would get printed in that order. But that is not the case, it would be printed in the reverse order. The reason is because of the **callback queue**. setTimeout is a runtime feature and not feature in JavaScript itself. Eventually it has to be able to put back the callback back into the callstack somehow so it gets called. So that's why there's this queue that then gets looked at. 

Another example:

```js
setTimeout(() => console.log("Hello"), 0)
for(let i = 0; i < 10000; i++) { console.log(`Bye ${i}`)}
```
Now when would `"Hello"` get outputted? Before the first `"Bye"`? After the first `"Bye"`? Somewhere in the middle? There's a rule, a check, that keeps on checking when the callback queue can get popped and it's called the callback loop. The rule goes like this: when a the callback stack is empty and the thread of execution at the global execution context has nothing else to execute, pop the callback queue into the callback stack. So, bye would get printed out after ALL the `"Bye"` logs. That is called the **event loop**

Now imagine we are fetching some data from somewhere the internet. Currently in our model we will only have the data available inside our function, within it's execution context and nowhere else. That's not ideal and that has a name - **callback hell**.

## Two-pronged facade function (promise)

It's a solution to a **callback hell**. Functions that require to utilize browser features will initiate background web browser work and return a placeholder object (promise) immediately in JavaScript. When calling a `fetch` function, it returns something, it returns a `promise` object. That object contains a `value` and an onFulfilled, which is a big empty array `{value: undefined, onFulfilled: []}`, while it returns this object it simultaneously sends a message to the browser to fetch data. The return object is there to show, to keep track of what is happening in the browser. When the data gets fetched it is placed inside the value property. 

`OnFulfill` is a callback that is called when the value is filled, it's a hidden property. We can pass a function for onFulfilled by calling `promise.then`. We can also chain `.then` each subsequent return will have result argument of the previous `.then`

But how does promise-deferred functionality gets back to JavaScript. With timers, we know that it get put into the callback queue and it waits for the global execution context thread to finish before being put into the call stack. We called that the event loop. 

With promises, it's different, it does not get put into callback queue. There's another queue, called micro-task queue. So the callbacks get put into micro-task queue instead. So now the event loop checks the queues. First the microtask loop gets checked, then the callback queue

```js
function display(message) { console.log(message) }
function sayHello() { console.log("hello") }
function blockFor300ms { 
  // block for 300ms 
}

setTimeout(sayHello, 0)

const returnData = fetch('some-url') // will take 300 ms

returnData.then(display)

console.log("me first")
blockFor300ms()
```

Try and explain/draw the sequence of events, call stack, global execution contexts, other function contexts, web api side and reactivity