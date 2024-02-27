# Difference between regular expression and arrow functions

`this` for different scopes is determined on a number of factors.
1. The place something was defined;
2. Determined during runtime;

Best way to showcase how `this` gets determined is by writing up some examples for event listeners.

```javascript
element.addEventListener("click",(e)=>{
    console.log("target=" + e.target.tagName, "this=" + this.tagName);
});
```

```javascript
element.addEventListener("click", function (e) {
    console.log("target=" + e.target.tagName, "this=" + this.tagName);
});
```

Both of these will have a different `this`.

Arrow function will have it's `this` assigned to `window`, while function `this` will be assigned to the DOM element. Why is that?

Regular functions declared with `function` keyword get their `this` dynamically determined during runtime based on which lexical environment it gets called at. So in this case `this` refers to the DOM element.

Meanwhile arrow functions do not have their own `this`, their `this` gets inherited from the lexical environment/enclosing scopes when they are defined. When assigning arrow function callbacks, `this` is not referred to the DOM element, rather it retains the `this` from surrounding environment, which is usually global object. 

## Lexical scoping 

Enclosing scope is a scope that surrounds and contains another scope. It refers to a scope in which a variable or function is defined and can be accessed by inner scopes due to **lexical scoping** or **closure**. Inner functions create **closures** through which they access outer scope variables.

Word *lexical* refers to the fact that the lexical scoping uses the location where the variable is declared within the source code to determine where that variable is available.

The best way lexical environment capturing for forming closures are explained with this for loop.

```javascript
    for (var i = 0; i < 3; i++) {
        const log = () =>{
            console.log(i);
        }
        setTimeout(log, 100);
    }
```

What will the function output? Well, because of lexical environment capturing at the time of defining `log` function `i` is a global context variable because it's defined with keyword `var`. So all logs would output 3.

But what if we changed `i` scope to local scope with `let` keyword. Then the `i` would no longer be global, but rather local at the time of `log` function definition. So each `log` function get their own lexical environment with a distinctive `i`. So each log in a timeout appropriately prints out their `i`.

### `var`

`var` variables are either function-scoped or globally scoped.

Scope is a map and a set of rules, the JavaScript engine plays by when it does a **lookup** for a variable.