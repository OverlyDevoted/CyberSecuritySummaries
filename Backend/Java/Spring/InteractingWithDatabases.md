## Concepts

In a broad sense, there are three main  to concepts to understand when talking about data bases.

1. Database driver - it's somewhat of an SDK, that provides Java APIs to interact with the database.
2. JDBC - provides a low level API to connect and write SQL to the database. The downside you have to map objects from and to manually 
    2.1. Spring JDBC - provides a JDBC template that makes interacting with the database even easier
3. JPA - allows to interact with the database using Java objects and it's a high-level API

JPA is a specification and most common one you might encounter is Hibernate. Hibernate is what you would call a persistence framework.

Persistence framework is a framework that helps developers to interact with a database in a object-oriented way