# Web Application Layout

## Web application infrastructure

Describes the structure of required system components: Database, backend, frontend. Most common infrastructure structures:
- Client-server
- One server
- Many servers - one database
- Many servers - many databases

### Client-server
Many users access resources from one server.

Workflow
Users sends requests to server and servers performs actions with that request and accordingly responds with website resources, usually HTML to rerender the site.

### One server

One or many applications and components, including database, are hosted on the server. It's straightforward but its riskiest design.

If one of the components on the server is compromised then everything is compromised. `All egg in the basket` issue.

### Many-servers - one database

![Many servers-one database](/hackthebox/Images/manyserver1data.bmp)

Database is separated onto it's own server and servers communicate to it for data retrieval. It allows multiple applications to access the same data or one balance loaded application.

Main security advantage is segmentation, where all the server components are hosted separately so if one server is compromised others may not be affected as harshly     

### Many-servers - many databases

Its built upon many-servers - one database infrastructure. More database servers are introduced with this one. There are multiple ways to implement this. Each webserver has its own database that communicates with, or maybe the data is segmented and i can communicate with other databases to retrieve data, or maybe it access other databases from other servers. But the main advantage it introduces is that if any of the components goes down, there will be a contingency plan, whether its data backups, redirecting to different component.

```There are also different infrastructure models, such as serverless or microservices```

## Web application components

1. Client
2. Server
    - Webserver
    - Web application logic
    - Database
3. Services (microservices)
    - 3rd Party integrations
    - Web application integrations
4. Functions (serverless)