## SQL Injections (SQLi)

Attacker may insert SQL code into input fields to access data from the database.

In the database section we had code which just inserts user supplied data into query string. 
`$query = "select * from users where name like '%$searchInput%'";`
This is vulnerable, as user input is not properly filtered, attacker can escape command or add additional SQL code to gain more data 

