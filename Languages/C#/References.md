# References

## References of the same type

Classes are reference types. That means when we create an instance of a class and store it in a variable, the variable is a reference to the object. When an object is created a part of a memory is allocated to it to be stored and the variable has it's own separate memory block where it's stored and it's purpose is to point to the object. So it's just that, the variable is an reference to the object, so the object can have multiple references

```c#
Dissertation diss1 = new Dissertation();
Dissertation diss2 = diss1;
```

## Reference type vs value type

Reference types refer to a place in memory, while value types hold actual data.

Every class is a reference type, other types like `int`, `double`, `bool`, `char` are value types, they only hold values. They are also called primitive types.

When value type variables are their values are compared. `8 == 8` returns true as they are obviously equal. While comparing reference types their addresses are compared instead.

```c#
class Dissertation
{
    public Dissertation(string description)
    {
        this.Description = description;
    }

    public string Description
    { get; private set; }
}

Dissertation diss1 = new Dissertation("Interesting");
Dissertation diss2 = diss1;
Dissertation diss3 = new Dissertation("Interesting");


if  (diss1 == diss2)
    Console.WriteLine("Equal"); // Their references are equal

if (diss1 == diss3)
    Console.WriteLine("Opposite") // Their references are not equal, despite having same values
```

## References of different types

```c#
Dissertation diss1 = new Dissertation();
Dissertation diss2 = diss1;
```

Both `diss` and `diss2` are references to the `Dissertation` object and they are of type `Dissertation`. With these we can handle `Dissertation` object as if it were `Dissertation` type. Since Dissertation implements `IFlippable` we can reference it that way too.

```c#
Dissertation diss = new Dissertation(50);
IFlippable fdiss = diss;
```

Both of these point to the same `Dissertation` object. `fdiss` is an `IFlippable` si ut can only use IFlippable functionality.

This rule can also applies to classes. Let's say `Dissertation` inherits `Book`. So we can create `Book` objects with a `Dissertation` object. Even though the `Book` was created from a `Dissertation` object only Book functionality can be used.

This allows us to work with many similar types at the same time. Imagine if we didn’t have this feature and we had to “flip” a group of Diary and Dissertation types:

```c#
Diary dy1 = new Diary(1);
Diary dy2 = new Diary(30);
Dissertation diss1 = new Dissertation(50);
Dissertation diss2 = new Dissertation(49);
dy1.Flip();
dy2.Flip();
diss1.Flip();
diss2.Flip();
```

We could create an array of `IFlippable`, loop through all of the references and call the `Flip()` that way.

Here's how polymorphism and inheritance interacts in `C#`

```c#
class Dissertation : Book
{
  public override string Stringify()
  {
    return "This is a Dissertation object!";
  }
}


class Book
{
  public virtual string Stringify()
  {
    return "This is a Book object!";
  }
}

Book bk = new Book();
Book bdiss = new Dissertation();
Console.WriteLine(bk.Stringify());
Console.WriteLine(bdiss.Stringify());
```

The output of these would be

```
This is a Book object!
This is a Dissertation object!
```

## Casting

We had reference of their own type, an inherited type, implemented interface.

```c#
Dissertation diss = new Dissertation();
Book bdiss = diss;
IFlippable fdiss = diss;
```

This process of having references of the same object but with different types, this is called - _upcasting_. Logically looking at it, it makes sense why it's _up_, it's up because we reference initial object type with reference types higher up the inheritance hierarchy. How about _downcasting_?

```c#
Book bk = new Book();
Dissertation dbk = bk;
```

We get an error

```
error CS0266: Cannot implicitly convert type `Book` to `Dissertation`. An explicit conversion exists (are you missing a cast?)
```

We can explicitly _downcast_

```c#
Book bk = new Book();
Dissertation bdk = (Dissertation)bk;
```

But in a lot of cases, this still won't work.

- Upcasting is creating a superclass or interface reference from a subclass reference
- Downcasting is creating a subclass reference from a superclass or interface reference.
- Upcasting can be done implicitly, while downcasting cannot

## `Null` and `Unassigned` references

Reference that refers to no object is called `null` or `unassigned`.

```c#
Diary dy = null;
//dy is null
Diary dy2;
// dy2 is unassigned
Diary[] diaries = new Diary[5];
// diaries[1] is unassigned, diaries[2] is unassigned, etc.
```

We can check if the value is `null`, but using a variable while it's `unassigned` - throws errors.

```c#
Diary dy = null;
Console.WriteLine(dy == null);
// Output: true

Object o;
Console.WriteLine (o == null);
// error CS0165: Use of unassigned local variable 'o'
```
