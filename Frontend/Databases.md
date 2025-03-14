
## Databases

Web apps utilize backend databases for data storing and retrieval. This can store text, images and other files. This can be user related (e.g. credentials, posts, comments) or website related (e.g. blogs). Databases enable dynamic content that is different for each user.

There are different database types and these are main attributes that describe them:
- Speed
- Size
- Scalability
- Cost

### Relations (SQL)

Relational databases store their data in tables where they are divided in rows and columns. Each table has keys to identify data and create relations with other table data.

![Relational database](/hackthebox/Images/relationalDB.bmp)

Relations between database tables is called **Schema**

### Common SQL databases

| Type | Description |
| - | - |
| MySQL | Most common database. Open-source, free |
| MSSQL | Microsofts implementation of relational database. Used in Windows servers and IIS web servers |
| Oracle | Considered a reliable database for big businesses, with a lot of innovative solutions to data management problems |
| PostgreSQL | Free, open-source relational database. It is designed to be extended, it supports adding new features to an existing database and is widely used by start-ups, small companies and individual projects |

Another SQL databases: SQLite, MariaDB, Amazon Aurora, Azure SQL.

### Non-relational (NoSQL)

This type of database stores data in various storage models, depending on type of data stored.
These tend to be very scalable and flexible databases. When datasets are not clearly defined or structured, a NoSQL database is much easier to adopt.

4 Common storage models for NoSQL database:
- Key-value. Stores data in key-value pairs to form JSON files (Redis)
- Document-based. Stores data in a complex JSON objects
- Wide-column
- Graph

| Type | Description |
| - | - |
| MongoDB | The most common NoSQL database. Document-based and stores data in JSON object format |
| Elastic Search | Free and open-source NoSQL database. Optimized to store and analyzing large datasets. Searching for data in this database is fast and efficient |
| Apache Cassandra | Very scalable and optimized for gracefully handling faulty requests |

More common NoSQL databases: Redis, Neo4j, CouchDB, Amazon DynamoDB.


## Database us in web applications

Most databases have made it easy to integrate backend server application to the database server. Different languages use different initialization methods, but all are done through code.

In `PHP`, you can connect to `MySQL` database by first: 
Opening a connection:
`$conn = new mysqli("localhost", "user", "pass");`
Then we create a database inside the server:

```php
$sql = "CREATE DATABASE database1";
$conn->query($sql)
```

Then we connect to our new database, and we can use MySQL database within PHP:
```php
$conn = new mysqli("localhost", "user", "pass", "database1");
$query = "select * from table_1";
$result = $conn->query($query);
```

When user posts a search form server might retrieve data from database like this

```php
$searchInput =  $_POST['findUser'];
$query = "select * from users where name like '%$searchInput%'";
$result = $conn->query($query);
```

Then the server returns results to the user browser:
```php
while($row = $result->fetch_assoc() ){
	echo $row["name"]."<br>";
}
```

This was a short demo of how one could use `PHP` and `MySQL` for data retrieval. But if coded without input sanitization and validation it vulnerable to SQL
