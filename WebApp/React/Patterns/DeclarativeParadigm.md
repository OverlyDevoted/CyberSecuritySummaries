React uses declarative paradigm. This paradigm dictates how developers structure their code.

Imperative - declares how you will do something
Declarative  - declarative describes what want to do

## Real-life analogy

Imperative (HOW):

I see that table over there by the Gone Fishin sign is empty. My husband are going to walk towards the bar, take a right at the bathroom, walk past two tables, then sit down.

Declarative (WHAT):

I want table for two

## Code examples

Imperative 

```js
function double(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++)
    result.push(arr[i] * 2);
  return result;
}
```

```js
function add(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++)
    result += arr[i];
  return result;
}
```

```js
const btn = document.getElementById("btn");
btn.addEventListener("click", ()=>{
  btn.classList.toggle("highlight")
  btn.innerText = btn.innerText === "Add highlight"? "Remove highlight" : "Add highlight"
})
```

Each of these models conforms to the operational model of the machine. In these examples we are describing HOW we want to double each member of our array, HOW we want to reduce array, HOW we want our highlight button to work.

We can clearly trace how the computer would execute it's commands, rather as a human. Human would ask for things.

More declarative style:

```js
function double(arr) {
  return arr.map(item => item * 2);
}
```

```js
function add(arr) {
  return arr.reduce((accum, cur) => accum + cur, 0);
}
```

```js
<Btn />
```

So as you can see, it's all about reducing complexity by adding abstraction. All declarative code has some sort of imperative code behind it. Declarative code can be context independent as it declares WHAT, not HOW so it can be put anywhere to do what it needs to do in that specific place. Imperative code would often depend on context (such as state)

https://github.com/facebook/react/issues/25017
