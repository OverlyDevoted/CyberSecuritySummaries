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

## SQLi types based on results
- Retrieving hidden data. Modify SQL query to return additional results
- Subverting application logic. Change query to interfere with application's logic.
- UNION attacks. Get data from other tables
- Blind SQL injection. Results of a query are not returned n the application's responses.

### Retrieving hidden data. 

For example we have a shop website that has a search based on a parameter categories. When clicking on any category we send a **GET** request with a parameter `category`.
e.g. `https://insecure-website.com/products?category=Gifts`
The relevant data is retrieved from the database like this:
`SELECT * FROM products WHERE category = 'Gifts' AND released = 1`
From this query we can assume that we could retrieve unreleased products by changing released to 0. So an attacker main enter `'--`. In SQL `--` means comment. So everything after category clause is commented.

We can also modify the request a little to `OR 1==1'--`. This would mean then that we would get all items from table **products**.

**WARNING** `OR 1=1` should be used with caution as it could lead to loss of data if the queries lead to `insert` or `delete`.

### Subverting application logic.

For example we have an login form and this SQL is made to check if valid user:
`SELECT * FROM users WHERE username = 'wiener' AND password = 'bluecheese'`
As we can see here, if there was an used `admin` we could insert `admin'--` and would get logged in as an administrator. 

### Retrieving data from other database tables (UNION attacks)

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

### Union attack for retrieving relevant data

Once we figure out the number of columns and figure out data types for the columns we can try to retrieve interesting data.

Suppose that:
- The original query returns two columns, both of which can hold string data.
- Injection point is quoted string withing the `WHERE` clause.
- The database contains a table called `users` with the columns `username` and `password`

So we can inject into `users` table with
`' UNION SELECT username, password FROM users--`
But to perform a `UNION` attack there's the need of knowing the table name and it's column names.
Fortunate for us, most modern database provide ways to retrieve database structure (tables and column names)

### Multiple values within column

SQL has syntax for concatenating multiple columns into one when doing `SELECT`
`' UNION SELECT username || '~' || password FROM users --`