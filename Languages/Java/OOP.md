Inheritance - class inherits the attributes and methods of a parent 

Abstraction - is hiding implementation details, basically  building up tools we use from imperative (how everything is done) to declarative (what functionality I want)

Polymorphism - many shapes we can use classes by their parent class.

Aggregation - when objects have a "has a" relationship. It's basically one-to-zero or many-to-zero. Objects can exist independently but one may hold other object instances. (class library contains books objects)

Composition - represents part-of relationship. Engine is a part of a   car. Allows construction of complex objects from smaller objects

Wrapper classes = Allow primitive values to be used as objects. "Wrap them in an object". Generally, don't warp primitives unless you need an object. Allow use of a collection framework or static utility methods

```java
Integer i = new Integer(12);
Double d = new Double(12.12);
Char c = new Char('A');
Float f = new Float(1.1);

String is = Integer.toString(4);
int si = Integer.parseInt("45");
```

## Anonymous classes

It is a class that does not have a name. Cannot be reused. Add a custom behavior without having to create a new class. Often used for one time purposes. (TimerTask, Runnable, callbacks) Let's say you have a class and would like to override it's methods, it would be a lot to create a whole new class for that. You can: 

```java
Dog dogSpecial = new Dog(){
    @Override
    public void bark() {
        System.out.println("That is crazy");
    }
};
```
