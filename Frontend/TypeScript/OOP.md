# OOP Principles

## Incapsulation

Object's variables have access restrictions.

It's good to have control over a variable access because:
- You can insure it's correctness
- Some variables are interconnected, so when one changes, other change too.
- Clarity. Class has exposed only the things that can be modified or changed

Access levels:

- Public. Variable can be accessed outside the scope of the class
- Private. Variable can be accessed only from the inside scope
- Protected. Variable can be accessed only from the inside scope and class descendants can also access that variable

Incapsulation methodology

Private fields may contain getter and setter functions which can be tailored to give and modify the way we want 

## Inheritance

We can create base structures for our object classes by grouping commonalities. This decreases code duplication.

When we want to use a class as a base for another class we **extend** the subject.

`class Cat extends Feline`

Now the class inherits member properties and methods. 

When implementing constructors for children classes, we may want to instantiate parent's constructor code, so we would have to call `super(<parent's constructors arguments>)`. If we do not implement a call to a `super` it gets called automatically. Usually we have to call supers, because child class objects may need to user properties from the parent class.  


Children can only access `protected` or `public` parent properties. `private` is accessible only inside the class the property is defined in.

Let's say we have parent-child class relationship

```typescript
class A {
    talk() {
        console.log("I talky talky in A");
    }
}
class B extends A {

}
```
When we create a `B` class object we can invoke the `talk()` method. But we can also override the function and introduce new behavior for `B` class object instances.

```typescript
class B extends A {
    talk() {
        console.log("I talk in B");
    }
}
```

With this, we no longer can call `talk()` on `B` class object and expect it to have `A` class `talk()` method functionality.
But we can call `A` class' talk inside of `B` similarly to how we call parent class constructor inside of a child. 

```typescript
class B extends A {
    talk() {
        super.talk();
        console.log("I talk in B");
    }
}
```

## Abstraction

Abstraction is using frameworks and templates to describe structure for objects.

### Class abstraction

It's a template class that is inherited by other classes. This usually is used for 
1. Some classes are templates, and it doesn't make sense to instantiate objects from them alone
2. Creating subclasses that have similar behavior but they do it in different ways. 

Example: we have concrete classes - `circle` and `square`, and they might both have a method for calculating the shapes area, but the formulas for them are different so they have to be implemented differently. But also, we may not want to let developers instantiate object from class `shape`, `circle` and `square` class parent, so we make `shape` into an `abstract` class. We'll not be able to create object from that particular class, but we'll be able to create instances from concrete descendants and still utilize polymorphism

In an abstract class we can either implement *general* methods or *abstract* methods. General methods mean that we declare them inside abstract class with base behavior, all classes perform it by default if the method does not get overridden. But we can also make methods `abstract`, which means descendants will have to implement the `abstract` method in their own way. Abstract methods are used for the sake of polymorphism. Polymorphism often decreases the amount of code repetition and conditional checking. 

### Class interfaces

Interfaces describes what methods or fields a class must implement 

### Differences

A class may only implement one class, while it may implement multiple interfaces

Class describes what the class is, while interface describes what it do.

When the project gets bigger it's harder to keep track of the hierarchy tree, their variations and functionality expands too. When a new common functionality is required to be implemented it could be hard to squeeze it in.

But interface sometimes is an alternative. As you may implement multiple interfaces, a class can be expanded more easily without much care about classes.

## Polymorphism

Poly(Many)morph(form)ism. Let's a class to implemented in many different variations of the same method. In TypeScript, mainly the class signature can be **overloaded**(that is the word for adding new function signatures) or a method can be **overriden**(means to change behavior of a inherited method)

*Polymorphism allows us to refer to a subclass object in a super class variable*

This means we can create objects like this

```TypeScript
const mageHero: Hero = new Mage();
const warriorHero: Hero = new Warrior();
const rogueHero: Hero = new Rogue();
```

The `Hero` class is a parent class for `Mage`. As you can see, we can create class instances from the parent class. This allows for more flexible code, as now if we wanted to create an array consisting of only `hero` class objects we can do that without caring for subclasses.

```typescript
const heroArr: Hero[] = [mageHero, warriorHero, rogueHero]
heroArr.forEach((hero)=>{
    hero.attack();
}) 
```
