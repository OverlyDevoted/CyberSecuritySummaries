# Classes

Basic class definition

```c#
using System;

namespace YourSpace
{
    class Forest
    {
        public string name;
        public int trees;
        public int age;
        public string biome;
    }
}
```

Instancing:

```c#
using System;

namespace BasicClasses
{
  class Program
  {
    static void Main(string[] args)
    {
      Forest f = new Forest();
      f.name = "Congo";
      f.trees = 0;
      f.age = 0;
      f.biome = "Tropical";

      Console.WriteLine(f.name);
    }
  }
}

```

## Properties

Properties are different from class fields. It controls the fields access (get/set).

```c#
private int area;
public int Area
{
  get { return area; }
  set { area = value; }
}
```

When defining we define a field and property. Property name should use the same name for the field it controls but capitalized.

### Automatic properties

This:

```c#
private string size;
public string Size
{
  get { return size; }
  set { size = value; }
}
```

Has a short-hand that looks like this:

```c#
public string Size
{ get; set; }
```

Several things got shortened:

1. We do not have to include a field with the lower-case. `get` and `set` are shortened.

### Get-only properties

Additionally a property may not have a publicly exposed setter. For this:

1. `set` may be excluded
2. `set` may be set to `private`

## Methods

```c#
class Forest
{
    public string Name
    { get; set; }

    public int Age
    { get; private set; }

    public int Trees
    { get; private set; }

    public int Grow()
    {
        Trees += 30;
        Age++;
        return Trees;
    }
}
```

## Constructors

These are used to initialize our class-objects with any values we may want. Constructor is used whenever we instantiate a class with a `new` keyword.

Basic constructor:

```c#
class Forest
{
  public int Area;

  public Forest(int area)
  {
    Area = area;
  }
}
```

When there's no constructor defined for a class, one is automatically generated and it's called parameterless constructor.

Like methods, constructors can also be overloaded by adding additional constructors with a different signature.

## `this` keyword

We refer to the current instance of the class through the `this` keyword.

```c#
class Forest
{
  public int Area
  { /* property omitted */ }

  public Forest(int area)
  {
    this.Area = area;
  }
}
```

As you can see, through `this` we can access the variables of the class-instance we are creating.

```c#
public Forest(int area, string country)
{
  this.Area = area;
  this.Country = country;
 }

public Forest(int area)
{
  this.Area = area;
  this.Country = "Unknown";
}
```

You may have duplicate code (`this.Area = area`), so there are some different ways to avoid it:

1. Setting default values for some fields:

```c#
public Forest(int area, string country = "Unknown")
{
  this.Area = area;
  this.Country = country;
}
```

2. Call another constructor from the constructor:

```c#
public Forest(int area, string country)
{
  this.Area = area;
  this.Country = country;
}

public Forest(int area) : this(area, "Unknown")
{
  Console.WriteLine("Country property not specified. Value defaulted to 'Unknown'.");
}
```

## `static` keywords

### `static` variables

Static classes are higher up the abstraction hierarchy, while the class instances are created from the class, with static classes, the class itself is an instance.

First let's take a look at `static` variables.

```c#
class Forest
{
  private static string definition;
  public static string Definition
  {
    get { return definition; }
    set { definition = value; }
  }
}
```

```c#
static void Main(string[] args)
{
  Console.WriteLine(Forest.Definition);
}
```

The definition variable is accessed directly through a class accessor instead of the class instance.

### `static` methods

`static` methods are defined similarly to how class methods are defined but with the `static` keyword. They can only use other `static` variables.

```c#
class Forest
{
  private string definition;
  public static void Define()
  {
    // Throws error because definition is not static
    Console.WriteLine(definition);
  }
}
```

### `static` constructor

A class instance constructor is ran before every instance is created. While a `static` constructor is ran before:

1. A static class member is accessed
2. Before an object is made from a type

Typically we use static constructors to set values to static fields and properties.

A static constructor does not accept an access modifier.

```c#
class Forest
{
  static Forest()
  { /* ... */ }
}
```

### `static` classes

Instances cannot be made from `static` classes. They are useful when creating utilities or libraries like `Math` or `Console`

## Interfaces

With interfaces it's possible to add common functionality between classes, which introduces composition into our application architecture.

Interfaces are similar to classes, only difference is that it describes a group of variables, properties, methods that should be in a class but not their implementation.

Interfaces also should have their own files and a name should start with `I`

```c#
interface IAutomobile
{
  string Id { get; }
  void Vroom();
}
```

Classes can make promises to implement specified interfaces.

```c#
class Sedan : IAutomobile
{
}
```

## Inheritance

### Superclass and sublass

In inheritance, one class inherits the members of superclass. Now the other class is called subclass or a derived class.

A class may only inherit from one base class.

A derived class cannot access base class's `private` members, that why there is a `protected` keyword. Properties with `protected` can be accessed inside the derived class.

To construct derived classes, at first we have to construct its superclass. We can refer to a superclass with the `base` keyword.

There's a special syntax for calling superclass constructor inside the derived class constructor

```c#
class Sedan : Vehicle
{
  public Sedan (double speed) : base(speed)
  {
  }
}
```

If we do not specify a superclass constructor with `base`, the parameterless constructor for that class will be called

```c#
class Sedan : Vehicle
{
  // Implicitly calls base(), aka Vehicle()
  public Sedan (double speed)
  {
  }
}
```

But if the Vehicle does not implement a parameterless constructor, this code will throw an error.

### `override` and `virtual`

These keywords are used for when we want to override implementations of base class

Superclass methods that have `virtual` keyword means that they can be overridden in a derived class, while with the `override` we include our own unique implementation of a method in a derived class.

Example:

#### Superclass

```c#
using System;

namespace LearnInheritance
{
  class Vehicle
  {
    public string LicensePlate
    { get; private set; }

    public double Speed
    { get; protected set; }

    public int Wheels
    { get; protected set; }

    public Vehicle(double speed)
    {
      Speed = speed;
      LicensePlate = Tools.GenerateLicensePlate();
    }

    public virtual void SpeedUp()
    {
      Speed += 5;
    }

    public virtual void SlowDown()
    {
      Speed -= 5;
    }

    public void Honk()
    {
      Console.WriteLine("HONK!");
    }

  }
}
```

#### Derived class

```c#
using System;

namespace LearnInheritance
{
  class Bicycle: Vehicle
  {
    public Bicycle(double speed): base(speed) {
      this.Wheels = 2;
    }

    public override void SpeedUp()
    {
      this.Speed += 5;
      if(this.Speed > 15)
        this.Speed = 15;
    }

    public override void SlowDown()
    {
      this.Speed -= 5;
      if(this.Speed < 0)
        this.Speed = 0;
    }
  }
}
```

### `abstract`

Sometimes a superclass may not want have a default implementation for a methods, but would like all derivees to implement it. That's where the `abstract` keyword comes in. If any of the methods are abstract, the class itself should be made abstract. You cannot make object instances of an abstract class.

When a derived class implements an `abstract` methods, it should use `override` keyword after the accessor keyword

```c#
abstract class Vehicle
{
  public abstract string Describe();
}
```

```c#
class Bicycle : Vehicle
{
  public override string Describe()
  {
    return $"Bicycle {this.LicensePlate} {this.Speed} {this.Wheels}";
  }

}
```

### `new`

We can also use `new` keyword to override base functionality. If derived class uses `new` inside of one of it's method overrides then it will **hide** the base class method.

But using `new` maybe give unexpected behaviors. Hiding a method is not the same as overriding. Here's an example;

```c#
public class BaseClass
{
    public void Display()
    {
        Console.WriteLine("Base Display");
    }
}

public class DerivedClass : BaseClass
{
    public new void Display()
    {
        Console.WriteLine("Derived Display");
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        BaseClass obj = new DerivedClass();
        obj.Display();
    }
}
```

What will be the output?

It will be `"Base Display"`. Why? Because the class is of type `BaseClass` even though the `DerivedClass` is used for instantiation. In other cases like with `virtual` or `abstract` the output would be the opposite.

```c#
public abstract class Shape
{
    public abstract void Draw();
}

public class Circle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a circle");
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        Shape myShape = new Circle();
        myShape.Draw();
    }
}
```
