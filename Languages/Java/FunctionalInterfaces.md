For functional programming check [this](./../../WebApp/React/SOLID.md). In short it's a programming style where all of the provided functions return the same output on a given input.

java.util.function package provides functional interfaces. It's interfaces that have only one abstract method and that one method which can be implemented to let functions accept lambda expressions as their arguments.

lambda expressions are implementations of those abstract methods in the functional interfaces.

```java
List countries = List.of("Australia", "China", "France", "Italy");
countries.forEach(c -> System.out.println(c));
```

In the given example we see the `c -> System.out.println(c)` - that is a lambda expression and it is an implementation of a functional interface abstract method. 

Let's implement the the interface in a different way:

```java
List countries = List.of("Australia", "China", "France", "Italy");
Consumer print = c -> System.out.println(c);
countries.forEach(print);
```

```java
Consumer print = c -> System.out.println(c);
print.accept("This will run out lambda expression")
```

## Core functional interfaces

| Interface | Description | Abstract method |
| - | - | - |
| Consumer | Accepts a single input and returns no result | void accept (T t) |
| Supplier | Accepts no arguments and returns a result | T get() |
| Predicate | Accepts one argument and return a boolean result | boolean test (T t) |
| Function | Accepts one argument and returns a result | R apply (T t) |
| Unary operator | Accepts one argument and returns a result of the same type | T apply (T t) |
| Binary operator | Accepts two arguments of the same type and returns a result of the same type | T apply (T t, T u) |


## Chaining of responsibility

Functional interfaces can also have additional methods. 

[`Function` interface](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html#andThen-java.util.function.Function-) has a default implementation of method andThen.

```java
Function<Integer, Integer> square = (n) -> n * n;
Function<Integer, Integer> add = (n) -> n + n;

square.adnThen(add).apply(5); // 50
```

## Custom functional interfaces 

```java
@FunctionalInterface
public interface MyInterface {
  int add(int num1, int num2, int num3);
}
```
