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

### Examining 