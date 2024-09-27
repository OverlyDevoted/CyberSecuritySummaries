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

[^note]

and it adds function onto it when they are met during execution of call stack. The thread of execution always runs the function that is at the top of the call stack. Functions are popped off the callstack when the thread of execution hits the `return` keyword and execution thread returns to `global()`

## Higher order functions

Let's say we have a function that accepts values as arguments. Higher order functions accepts additional functionality as arguments. That means JavaScript let's you to pass functions as arguments