## Inheritance

Class inherits the attributes and methods of a parent

Inherited class constructor gets called automatically to ensure proper parent field instantiation.

To run another constructor you may call the `super` inside of the constructor
 
Overriding inherited class methods is done just defining the class with the same signature. It's also not required but it's a good practice to add `@Override` above the signature as it can help to catch minute mistakes (e.g. wrong name used for overridden signature). Note - do not mistake overload with override. Overload is when a function is redefined you in the same class but with a different parameter list. You can also overload methods from a parent class.

Constructors are not inherited and they are not considered as members of a class only the public and protected fields and the methods. `final` members are only inherited and cannot be overridden

Example of a override.

```java
public class Person {
    public void payTax() {
        System.out.println("My taxes are payed by the government");
    }
}

public class Employee extends Person {
    @Override
    public void payTax() {
        System.out.println("I payed my own taxes");
    }
}
```

### Sealed classes

Classes that restrict their inheritance over to other classes. It's a new feature. You would supply a list of subclasses that are allowed to inherit from the class. The child classes specified in the permit class list must inherit the parent class

```java
public sealed class Person permits Employee, Partner {}
public class Employee extends Person {} // classes that inherit a sealed class must specify if they are sealed, non-sealed or final
public class Partner extends Person {}
```

Class declared with a `final` keyword cannot be inherited

## Abstraction

Abstraction is hiding implementation details, basically  building up tools we use from imperative (how everything is done) to declarative (what functionality I want)

## Polymorphism
Polymorphism means many shapes we can use classes by their parent class.

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