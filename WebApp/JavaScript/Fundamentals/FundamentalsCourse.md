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

when there's no other value for a variable or constant it will have `undefined` as a value and that will be it's type. Type `undefined` has only one value and that is `undefined`.

`typeof` can help us retrieve the type of a variable. It always returns a string

when we run `typeof` on a variable with null value assigned to it will return `object`. The instructor believes it is a bug, also mentions that in the spec it says that if you wanted to unset a variable with a primitive type, you would set it's value to `undefined`, while with objects, you would use `null`.

```js
const v = function(){};
console.log(typeof v)
```

With `BigInt`s it doesn't mix and match well with regular `Number` type, so `typeof` can be used to compare and better distinguish them from each other

## `undefined` and `undeclared` and `uninitialized` aka (TDZ)

```js
console.log(typeof v) //undefined
```

`typeof` is the only thing that can reference a thing that does not exist and not throw an error

Some block scope variables do not get set to undefined, therefore they cannot be accessed. They are in so called temporal dead zone TDZ. When something in TDZ, you cannot touch them, otherwise you will get a TDZ error.

## Special values

`NaN` (~~not-a-number~~). Rather than calling it not-a-number it's better to call it an invalid number. You get to `NaN` by trying to parse something into a number type.


```js
var myAge = Number("0o46") // 38
var myNextAge = Number("39") // 39
var myCatsAge = Number("n/a") // NaN
myAge - "my moms age" // NaN (weird)

myCatsAge === myCatsAge // false OOPS (weird) 
isNan(myAge) // false
isNaN(myCatsAge) // true
isNaN("my moms age") // true OOPS

Number.isNaN(myCatsAge) // true
Number.isNaN("my moms age") // false
```

1. First weird

When subtract `string` from a `number`, you can see we get a `NaN`. JS tries to turn the `string` into a `number`, but it can't so it's `NaN`. Any mathematical operation with `NaN` results in `NaN`.

2. First OOPS

When comparing `NaN` to another `NaN` with `===` (triple equals) operator it is does not return `true`. `NaN` does not have an identity property, so it means it's not equal to itself, it is the only value that does this. 

3. Second OOPS
`isNaN` checks whether the value is NaN, but when we pass a string to it, it returns `true`. It should be returning false as it's false. But isNaN function coerces the passed in value into a number type and then does comparison. Since string coerced into a number returns a NaN, therefore the function returns NaN. The spec describes that.

With ES6, a better utility was introduced `Number.isNaN` which correctly assesses `NaN` values

`typeof NaN` is `"number"`

## -0 in JS

```js
var trendRate = -0
trendRate === -0 // true
trendRate.toString(); // "0" oops
trendRate === 0; // true oops
trendRate > 0; // false
trendRate < 0; // false

Object.is(trendRate, -0) //true
Object.is(trendRate, 0) //false

1 / -0 == 1 / 0 // false
NaN === NaN // false - the only value of type "number" to do that 
```

## Fundamental objects

aka: built-in objects
aka: native functions

Use `new` keyword with:

- Object() *checkout Generator functions to read about and shared object functions in Principles.md*
- Array()
- Function()
- Date()
- RegExp()
- Error()
- Date()

Do not use `new` with:

- String()
- Number()
- Boolean()

as these always must be used as functions and not constructors. When these are used on a value, it will try to coerce it into the appropriate primitive type.

Abstract operations - is a fundamental block of how type conversion is handled. Type conversion is called coercion

Abstract operations:

- `ToPrimitive(hint)` basically tries to convert something? to a primitive type. With the `hint` parameter a type name could be passed in. It helps prioritize which type the value is tried to be converted to.
- `ToString()` it takes any value and gives the representation of that value in string form. Almost any value has some sort of string representation.

```js
ToString(null) //"null" 
ToString(undefined) //"undefined"
ToString(true) //"true"
ToString(false) //"false"
ToString(3.14159) //"3.14159"
ToString(0) //"0"
ToString(-0) //"-0"

```

If we call `ToString()` on an object it will invoke `ToPrimitive(string)`, which prioritizes coercion to string, so it will call `toString()` and the `valueOf()`.

On arrays:

```js
ToString([]) //"" why does it remove square brackets
ToString([1,2,3]) //"1,2,3"
ToString([null, undefined]) //"," why is it empty for null and undefined
ToString([[[],[],[]],[]]) //",,,"
ToString(,,,,) //",,,,"
```

Generally on arrays it will take values and concatenate them as you can see with `"1,2,3"`

On objects:

```js
ToString({}) // "[object Object]" // why does it not stringify as json
ToString({a:2}) // "[object Object]"
ToString({toString(){return"x"}}) // "X"
```

As you can see the toString can be overriden to return any value you like, you could also pass an argument to `toString` to have more dynamic behavior.

- `ToNumber()`

```js
ToNumber("") // 0 - which does not make sense why to NaN
ToNumber("0") // 0
ToNumber("-0") // 0
ToNumber(" 009 ") // 9
ToNumber("3.14159") // 3.14159
ToNumber("0.") // 0
ToNumber(".0") // 0
ToNumber(".") // NaN
ToNumber("0xaf") // 175

ToNumber(false) // 0
ToNumber(true) // 1
ToNumber(null) // 0 does not make sense why not NaN
ToNumber(undefined) // NaN this makes sense 
```

- ToNumber(object). It will do ToPrimitive(number), which does valueOf() and then toString(). For any [] or {} `valueOf() { return this; }`. So it ignores number and goes directly to toString(). So it will produce a `toString()`

```js
[""].ToPrimitive("number") // 0 WTF?
["0"].ToPrimitive("number") // 0
["-0"].ToPrimitive("number") // -0
[null].ToPrimitive("number") // 0 WTF this get turned into empty string, which then turns into 0
[undefined].ToPrimitive("number") // 0 same as null
[1,2,3].ToPrimitive("number") // NaN
[[[[]]]].ToPrimitive("number") // 0 same as null and  undefined
```

> "" empty string is the root of coercion evil

```js
{}.ToPrimitive("number") // NaN
{valueOf() {return 3;}}.ToPrimitive("number") // 3
```
