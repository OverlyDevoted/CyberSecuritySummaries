## JavaScript tricky spots

```js
typeof NaN // "number"

const arr = [1, 2, 3]
Object.assign([], arr)
const obj = {a: 1, b: 2}
Object.assign({}, obj);

//IIFE functions

// create object from array
const arr = [
  ["0", "a"],
  ["1", "b"],
  ["2", "c"],
];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }

//deep copy array. Also spread works
Object.assign({}, obj)
```

## Java basics

StringBuilder is an instantiable class that creates objects that have methods for handling strings.

Just in case a do-while:

```java
do { 
  //run code
} while(some_condition == true)
```

You can have multiple same signature methods, their parameters must differ

Local variable type inference var. It will infer datatype based on data that is assigned to the variable.

`::` is a method reference access operator. It is used to refer to methods or constructors without calling them. Mainly used in functional programming to pass methods as lambdas.

Example:

```java
class MathUtils {
    public static int square(int x) {
        return x * x;
    }
}

public class Test {
    public static void main(String[] args) {
        // Using a lambda expression
        Function<Integer, Integer> lambda = x -> MathUtils.square(x);
        
        // Using a method reference
        Function<Integer, Integer> methodRef = MathUtils::square;

        System.out.println(lambda.apply(5));  // Output: 25
        System.out.println(methodRef.apply(5));  // Output: 25
    }
}
```

## OOP syntax

`implements` keyword is for inheriting from interfaces

`extends` keyword is for inheriting from other classes

`abstract` cannot instantiate classes with this keyword but can instantiate as polymorphic objects

All methods in java by-default are virtual. Only methods with `final` keyword cannot be overridden

Encapsulation is hiding implementation details and having private/protected fields. protected can be accessed in classes that inherit variables.

```java
@Override
public void overriding () {

}
```

### interfaces

```java
public interface Electronic {

    // Constant variable
    String LED = "LED";

    // Abstract method
    int getElectricityUse();

    // Static method
    static boolean isEnergyEfficient(String electtronicType) {
        if (electtronicType.equals(LED)) {
            return true;
        }
        return false;
    }

    //Default method
    default void printDescription() {
        System.out.println("Electronic Description");
    }
}
```

There is a lot of crazy in this interface so let's break it down
- Constant variable. Variables defined inside an interface are public, static and final. 
- Abstract methods. It's a method which has to be implemented by the class implementing the interface
- Static methods. They must have a concrete implementation in the interface itself
- `default` methods. In Java 8, the `default` keyword defines an implementation that can be overriden.  

Additional info about interfaces:
- interfaces cannot be final
- interface method cannot be protected or final

## SQL syntax

```sql
CREATE TABLE recipe (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR (255) UNIQUE NOT NULL, body TEXT);
```

```sql
CREATE TABLE recipe_image (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, recipe_id INT REFERENCES recipe(id), title VARCHAR (255) NOT NULL, type VARCHAR (255) NOT NULL);
```

Reference or foreign key ON DELETE actions

`ON DELETE CASCADE` if an associated records is deleted then the rows with the rule delete too
`ON DELETE SET NULL` does exactly what it says 
`ON DELETE NO ACTION` will error

```sql
INSERT INTO recipe (title, body) VALUES ("Empanada", "Super delicious"), ("Taco", "Juicy embrace");
```

```sql
DROP TABLE recipe;
```

```sql
ALTER TABLE recipe ADD COLUMN image VARCHAR (255);
```

```sql
ALTER TABLE recipe DROP COLUMN image;
```

Upsert

```sql
<INSERT CLAUSE> ON CONFLICT (column) DO UPDATE SET <column> = excluded.<column>
```

## Procedure and transaction

What is the difference between a procedure and a transaction

Procedure is a set of SQL statements stored in the database that can be executed as a unit
While a transaction is a sequence of one or more SQL statements executed as a single unit of work

Procedure example:

```sql
CREATE PROCEDURE UpdateCarPrice
    @CarID INT,
    @NewPrice DECIMAL(10,2)
AS
BEGIN
    UPDATE car SET price = @NewPrice WHERE id = @CarID;
END;
```

## Table view

What is a SQL View?

A view in SQL is a virtual table based on a query. It does not store data itself but provides a way to represent data from one or more tables in a structured manner.
Why Use Views?

✅ Security: Restrict access to specific columns or rows.
✅ Simplicity: Simplify complex queries.
✅ Maintainability: Provide an abstraction layer over tables.
✅ Data Integrity: Ensures consistent data representation.

```sql
CREATE VIEW ActiveDrivers AS
SELECT id, name, license_number 
FROM driver
WHERE status = 'Active';
```

You can also alter and delete views

## SQL triggers