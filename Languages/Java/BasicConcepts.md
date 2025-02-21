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

## Text blocks

A newer java feature

TextBlock are used to work with multiline string. You cannot open and close multiline string on the same line.

```java
String json = """
              {
              house: "big",
              flat: "huge"
              }
              """;
System.out.println(json);
```

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

POJO - plain old java object. It's a simple object that contains some fields, setters/getters. You can add methods to records. Then instantiate like any other class.

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

## ArrayList

ArrayList is a resizable array that stores objects. Normal arrays are fixed in size, but ArrayList are dynamic.

## Writing to files

FileWrite - small or medium text files
BufferedWriter - better performance for large amount of text
PrintWriter - Best for structured data, like reports or logs
FileOutputStream - Best for binary files (e.g. images, audio files)

```java
try (FileWriter write = new FileWriter("C:\\Users\\rober\\Desktp\\test.txt")) {
  write.write("File has been written");
  } catch (IOException e) {
    System.out.println(e.getMessage());
  }
```

## Reading files 

BufferedReader + FileReader: Best for reading line by line
FileInputStream: Best for binary files
RandomAccessFile: Best for read/write specific portions of a large file

```java
String filePath = "C:\\Users\\rober\\Desktop\\test.txt";

try (BufferedReader reader = new BufferedReader(new FileReader(filePath));) {
    System.out.println("File found");
    String line;
    while((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}
catch (FileNotFoundException e) {
    System.out.println("File not found" + e.getMessage());
}
```

//dates

```java
LocalDate date = LocalDate.now();
    System.out.println(date);
    LocalTime time = LocalTime.now();
    System.out.println(time);
    LocalDateTime d = LocalDateTime.now();
    System.out.println(d);
    //UTC
    Instant instant = Instant.now();
    System.out.println(instant);

    //Formatting
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    System.out.println(formatter.format(d));
    
    LocalDate createdDate = LocalDate.of(2000, 2, 1);
    System.out.println(createdDate);
    System.out.println(createdDate.isBefore(date));
```

## Timer and TimerTask

Timer - is a class for scheduling tasks at specified times. Useful for notifications, scheduled updates, repetitive actions

TimerTask - Represents the task that will be executed by the timer.
Anonymous class object instantiation is used to override TimerTask class actions to perform any of your actions


## static

Object has to be all-encompassing of everything it needs static is something we create when we don't need using fields or methods that are all connected within the object class.
Static methods would usually be just methods that receive input and output.
The whole purpose of classes is to have objects that you would not need to pass the data over and over again, but just call the behaviors