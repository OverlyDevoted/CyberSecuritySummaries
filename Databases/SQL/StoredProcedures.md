# Stored procedures

Stored procedures in SQL are something similar to functions or methods. They perform a specific task hello running pre-defined commands. They can be used to simplify certain tasks. They are stored inside the database.

## Procedure syntax

Command to pre-compile a procedure:

```sql
CREATE PROCEDURE procedure_name
AS
sql_statement
GO;
```

Run pre-compiled procedure:

```sql
EXEC procedure_name;
```

It is also possible to define procedures that have one or multiple parameters:

```sql
CREATE PROCEDURE SelectAllCustomers @City nvarchar(30)
AS
SELECT * FROM Customers WHERE City = @City
GO;
```

Execute:

```sql
EXEC SelectAllCustomers @City = 'London';
```
