## User input

```java
    Scanner scanner = new Scanner(System.in);
    System.out.println("Hello World, what is your name?");
    String name = scanner.nextLine();
    System.out.println("Hello, " + name);
    System.out.println("What is ur age?");
    int age = scanner.nextInt();
    System.out.println("Ur age is " + age);
    scanner.close();
```

With scanner it is possible to read files

```java
public static int IntScan() {
    Scanner scanner = new Scanner(System.in);
    int result;
    try {
      System.out.print("Enter a number: ");
      result = scanner.nextInt();
      scanner.close();
      return result;
    } catch(Exception e)  {
      return IntScan();
    }
  }
```

## Math class

For all your math related methods

## random

```java
  Random random = new Random();
  int number;
  number = random.nextInt(1,6);
  System.out.println(number)
```

## Zero-padding and offsetting

```java
System.out.printf("%04d", 1); // '0001'
System.out.printf("%4d", 1); // '   1'
System.out.printf("%-4d", 1); // '1   '
```

## Java 14 feature. Enhanced switches

```java
String day  = "Monday";
switch (day) {
  case "Monday" -> System.out.printf("It is %s\n", day);
  case "Tuesday" -> System.out.printf("It is %s\n", day);
  case "Wednesday" -> System.out.printf("It is %s\n", day);
  case "Thursday" -> System.out.printf("It is %s\n", day);
  case "Friday" -> System.out.printf("It is %s\n", day);
  case "Saturday" -> System.out.printf("It is %s\n", day);
  case "Sunday" -> System.out.printf("It is %s\n", day);
  default -> System.out.printf("No day %s\n", day);
}
```

But it could be ENHANCED

```java
String day  = "Monday";
switch (day) {
  case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" -> System.out.printf("It is %s\n", day);
  case "Saturday", "Sunday" -> System.out.printf("It is weekend %s\n", day);
  default -> System.out.printf("No day %s\n", day);
}
```

## Java record keyword

With Java 14, a record keyword was introduced that helps creating immutable classes. 

Old way:

```java
public class Person {

    private final String name;
    private final String address;

    public Person(String name, String address) {
        this.name = name;
        this.address = address;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, address);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        } else if (!(obj instanceof Person)) {
            return false;
        } else {
            Person other = (Person) obj;
            return Objects.equals(name, other.name)
              && Objects.equals(address, other.address);
        }
    }

    @Override
    public String toString() {
        return "Person [name=" + name + ", address=" + address + "]";
    }

    // standard getters
}
```

New way:

```java
public record Person (String name, String address) {}
```

## Thread.sleep(n);

Pauses main thread execution for n milliseconds

## Overloaded methods

Methods with same signatures but different parameters.

## arrays

```java
String[] fruit = {"Apple", "Orange"}
```

Empty array:

```java
String[] fruit = {};
```

Empty array with reserved space

```java
int n = 10;
String[] fruit = new String[n];
```


## for each 

```java
String[] fruits = {"Apple", "Orange"}
for (String fruit: fruits) {
  System.out.println(fruit);
}
```

## Arrays class

Contains many methods for working with arrays (sort, comparison)

Array.fill - fills an array with a specified value

## varargs (varying arguments)

Allows methods to accept a varying number of arguments. Makes methods more flexible, removes the need to specify many parameters, or overload methods. Methods will be packed into an array.

the main (program entry point) has the args param when it ran, so you can specify arguments when you launch your program and the arg argument will contain then and you cna use them inside your program for various reasons.

```java
static int add(int... numbers) {
  let result = 0;
  for(int number: numbers) {
    result += number;
  }
  return result;
}
```
