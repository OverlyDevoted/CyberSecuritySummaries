# SOLID in React

SOLID is more of a object-oriented programming concept, but the principles can be applied to functional programming as well.

Before getting into SOLID, we'll go over what is functional programming and object-oriented programming and in what ways are they different.

## Functional programming

It's a declarative programming paradigm where one applies pure functions (functions that always have the same output for the same input) in sequence to solve complex problems.

### Functional programming concepts

#### First-class functions

Functions are treated as variables. That means it can be passed as arguments into functions and can be returned by other functions

#### Recursion

This is not very applicable to JavaScript, but usually in functional programming loops and conditionals are avoided and desired states are achieved through recursions

#### Immutability

All variables are const and changing states are avoided. Instead new data structures are created with updated values.

#### Pure functions

It's best to program every function to return the same output given same input. This helps to maintain program's state throughout the runtime. Additionally functions do not cause any side-effects

#### Declarative rather than imperative

Declarative style - describes what the program should do, instead of detailing the steps to achieve it.

### Functional programming in React

In react, declarative style can be observed by looking at the component JSX code. It always describes what is going to be rendered and how it will change, based on certain user actions. And exactly that let's developers focus on _what_ not the _how_

States in react are treated as immutable.
