# Constraints

Constraints are defined for columns when creating a table. They specify certain rules that the column must follow.

- NOT NULL - Ensures that a column cannot have a NULL value
- UNIQUE - Ensures that all values in a column are different
```sql
CREATE TABLE example (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (255) UNIQUE NOT NULL 
);
```
- PRIMARY KEY - A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table
```sql
CREATE TABLE example (id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY);
```
- FOREIGN KEY - Prevents actions that would destroy links between tables
- CHECK - Ensures that the values in a column satisfies a specific condition
- DEFAULT - Sets a default value for a column if no value is specified
```sql
ALTER TABLE ADD COLUMN type VARCHAR ( 50 ) NOT NULL DEFAULT 'vegetable';
```
- UNIQUE
- CREATE INDEX - Used to create and retrieve data from the database very quickly
