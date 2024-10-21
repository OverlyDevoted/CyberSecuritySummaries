# Fundamentals course by Kyle Simpson

Fundamentals about how JavaScript actually works, diving into ECMAScript specification and breaking developed mental models, removing magic and forming new ones based on facts.

## "Everything in JavaScript is an object" is `false`

According to ECMAScript specification (short ECMA) in JS there is ECMA language types and these are Undefined, Null, Boolean, String, Symbol, Number and Object, Bigint. Otherwise this is known as primitive types.

Other types and subtypes include:
- undeclared 
- null
- function (in some places is called a callable object)
- array (a special kind of object that has indexing)

In JS the variables do not have types, instead values have types. That is a characteristic of a dynamically typed language
