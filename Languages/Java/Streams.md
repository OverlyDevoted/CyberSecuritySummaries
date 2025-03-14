Streams a sequence of elements from a data source. 
Stream represents a sequence of elements in a collection, an array or other input source.

It does not store data like collections do, instead it allows to perform operations on data without affecting the original data source.

```java
int nums = {0, 2, 4, 5, 9, 11};
Arrays.stream(numbers); // it's a stream of integers
```

and now that it's a stream you can perform any operation on it that the stream provides. When a stream operation it closes and returns another stream that can be chained. 

Remember how an array does not have a forEach? With a stream it does

```java
int nums = {0, 2, 4, 5, 9, 11};
Arrays.stream(numbers).forEach(num -> System.out::println); // it's a stream of integers
```

`.parallel` runs operations in parallel threads. So you could run System.out::println in parallel

```java
int nums = {0, 2, 4, 5, 9, 11};
Arrays.stream(numbers).parallel().forEach(num -> System.out::println); // it's a stream of integers
```

This would output out of order but might be useful to speed up very long streams.

## Common stream operations

`.anyMatch` (javascript equivalent of `.some`) - it will check if any of the items in the array matches the predicate.

```java
private static boolean anyMatchDemo() {
  return food.stream().anyMatch(item -> Character.toLowerCase(item.charAt(0)) == 'c');
}

private static boolean allMatchDemo() {
  return food.stream().allMatch(item -> Character.isUpperCase(item.charAt(0)));
}

private static void filterDemo() {
  food.stream()
          .filter(item -> item.toLowerCase().contains("ta"))
          .forEach(System.out::println);
}

private static void mapDemo() {
  food.stream()
          .map(item -> Character.toLowerCase(item.charAt(0)) == 'c' ? item + " is tasty" : item + " is yuckie")
          .forEach(System.out::println);
}

private static void reduceDemo() {
  System.out.println(food.stream()
          .reduce("", (a, b) -> a + " | " + b));
}

public static void intReduceDemo() {
  List<Integer> ints = List.of(1, 2, 3, 4, 5, 6, 7);

  System.out.println(ints.stream().reduce(0, (a, b) -> a + b));
}
```

`.collect` is usually used on a resulting stream and it will assign the result to the collection of your choice.

```java
public static void collectDemo() {
    List<String> leftovers = food.stream().sorted().filter(item -> item.contains("o")).toList();

    leftovers.forEach(System.out::println);
}
```
