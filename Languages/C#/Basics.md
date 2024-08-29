# C#

## Packages needed for Visual Studio Code

- C# Dev Kit
- .NET Install Tool
- Intellicode for C# Dev Kit

## Basic C# CLI boilerplate

```c#
using System;

namespace HelloWorld
{
  class Program
  {
    static void Main()
    {

    }
  }
}
```

Starting with .NET 6 the boilerplate is no longer needed

## Directives

This is a directive:

```c#
using System;
```

Various directives provides functionalities. Directives can be implicit, that means some may be included automatically based on what kind of project type. In the case of a console app these may be implicitly included:

- using System;
- using System.IO;
- using System.Collections.Generic;
- using System.Linq;
- using System.Net.Http;
- using System.Threading;
- using System.Threading.Tasks;

## Writing to the console

```c#
Console.WriteLine("OverlyDevoted");
```

## Getting input

```c#
Console.ReadLine();
```

## Data types

| Type       | .NET type       | Bytes           |
| ---------- | --------------- | --------------- |
| `int`      | `System.Int32`  | 4               |
| `long`     | `System.Int64`  | 8               |
| `float`    | System.Single   | 4               |
| `double`   | System.Double   | 8               |
| `decimal`  | System.Decimal  | 16              |
| `char`     | System.Char     | 2               |
| `bool`     | System.Boolean  | 1               |
| `DateTime` | System.DateTime | 8               |
| `string`   | System.String   | 2 per character |

## Variable conversion

Variables are strongly typed in C#. Some variables can be converted to other types

```c#
double myDouble = 3.2;

// rounds to the closest whole number
int myInt = myDouble;
```

There's different types of conversion

- Implicit conversion: it's possible to convert `int` to `double` without doing any additional commands, it's done automatically
- Explicit conversion: requires a cast operator to convert, with the cases where there would be loss of data. For example, we can't convert a double `3.2` to int without a loss of data.

```c#
// implicit conversion
int myInt = 3;
double myDouble = myInt;

// explicit conversion
double myDouble = 3.2;
int myInt = (int)myDouble;
```

There also built-in conversion methods `Convert.ToString()`

If we add int with int, we will get an int. If we add int with double, we will get a double, unless we cast.

## About number types

- `int` is for whole numbers.
- `float` is for imprecise decimal
- `double` more precise than `float` and more performant than `decimal`
- `decimal` is most precise and is used to represent monetary values, and you have to write **m** after the value

```c#
decimal myMoney = 4.99m
```

## Escape character sequences

Escape sequences are used for inclusion of special characters into text. For example quotation mark marks the end of a string. If we wanted to included in a string we would have to place an escape sequence which is a `\`.

There are also other special symbols when escaped like a newline (`\n`), tabulation (`\t`),

## String interpolation

It's a way to include variables inside a string without having to concatenate.

```c#
string favoriteBasketballPlayer = "Kobe Bryant";
Console.WriteLine($"My favorite basketball player is {favoriteBasketballPlayer}");
```

String interpolation was introduced in C# 6. There's also string formatting or composite formatting which is an older way of doing something similar to string interpolation.

## Methods

Methods in C# are written in Pascal case. Methods are defined outside of `Main()`

You can have optional parameters for methods by defining a default value

Named arguments is useful for when you have many optional arguments and you want to specify which one you want to assign a value to

```C#
static void YourMethodName(int a = 0, int b = 0, int c = 0, int d = 0, int e = 0) {...}

YourMethodName(d: 4);
YourMethodName(2, 1, d: 4) // a is 2, b is 1, d is 4
YourMethodName(d: 4, 2, 1) // Error!
```

Method overloading is when you have more than one same signature method defined (except the parameter list)

## `out` keyword

Usually we deal with return values and only one value can be returned. With the `out` keyword we can have multiple values be returned from a called function.

`Int32.TryParse()` function returns true if it can parse a value into a `int` and sets it `out` variable to the new parsed value. `Int32.TryParse()` signature looks like this:

```C#
public static bool TryParse (string s, out int result);
```

Usage:

```c#
int number;
bool success = Int32.TryParse("10602", out number);
// number is 10602 and success is true
int number2;
bool success2 = Int32.TryParse(" !!! ", out number2);
// number2 is 0 and success2 is false
```

You can define the variable inside function call:

```c#
bool success = Int32.TryParse("10602", out int number);
```

You can use `out` in your own method definitions

```c#
static string Whisper(string phrase, out bool wasWhisperCalled)
{
  wasWhisperCalled = true;
  return phrase.ToLower();
}
```

`out` keyword must be used when it's defined. Also the parameter with the `out` must be used inside the method's body.

## Expression-bodied definitions and lambda expressions

### Expression-bodied definition

For functions with return type.

```c#
bool isEven(int num) => num % 2 == 0;
```

These functions do not have `{ statement }` brackets with a statement, in place they have a one-liner, which is called an expression.

Same for void functions

```c#
void Shout(string x) => Console.WriteLine(x.ToUpper());
```

_Fun fact: `=>` is sometimes called a squid_

### Passing methods as arguments

Similar to JavaScript, you can pass functions as arguments. It's often used for writing a predicate function for defining a calculation for finding a certain value in an array:

```c#
int[] numbers = [1,2,3,4,5,6];
static bool IsGreaterThan5 (int numberToCheck) => numberToCheck > 5;
bool answer = Array.Exists(numbers, IsGreaterThan5);
```

### Lambda expressions

Lambda expressions are anonymous methods, that means they have no name.

```c#
bool hasEvenNumber = Array.Exists(numbers, (int num) => num % 2 == 0 );
```

With lambda expressions it's possible to avoid typing types for the arguments and then the type is inferred by the context of the expression/statement. Parentheses `()` can also be dropped if there's only one argument.

## Arrays

Array is defined with a type followed by brackets. If array has to have an initial array state, curly braces are used to contain elements.

```c#
int[] plantHeights = { 3, 4, 6 };
```

We can also initialize an array using `new` keyword. With `new` we signify that we are defining an array using the array class.

```c#
int[] plantHeights = new int[] { 3, 4, 6 };
```

If you have an initial state you can do it either way, but if at first you define a variable and then later assign a value to it you would have to use class based initialization.

```c#
// Initial declaration
int[] plantHeights;

// This works
plantHeights = new int[] { 3, 4, 6 };

// This will cause an error
// plantHeights = { 3, 4, 6 };
```

It's possible to define an array of predetermined length. It's then filled with default values which can be edited at any time.

[Array methods](https://learn.microsoft.com/en-us/dotnet/api/system.array?view=net-8.0)

## Loops

To break loops we can use `break` keyword if we want to skip over an iteration we can use `continue`, if we want to stop and return a loop in a function, we can use `return`.
