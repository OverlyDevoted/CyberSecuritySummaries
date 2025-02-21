## Docker

Only run this if you don't have the container running. It'll error otherwise

```bash
docker pull postgres:14

docker run -e POSTGRES_PASSWORD=lol --name=pg --rm -d -p 5432:5432 postgres:14

docker exec -u postgres -it pg psql
```

## NodeJS

[pg](https://node-postgres.com/) has two ways to connect to a database: a client and a pool.

You can think of a client as an individual connection you open and then eventually close to your PostgreSQL database. When you call connect on a client, it handshakes with the server and opens a connection for you to start using. You eventually call end to end your session with a client.

A pool is a pool of clients. Opening and closing clients can be expensive if you're doing it a lot. Imagine you have a server that gets 1,000 requests per second and every one of those needs to open a line to a database. All that opening and closing of connections is a lot of overhead. A pool therefore holds onto connections. You basically just say "hey pool, query this" and if it has a spare connection open it will give it to you. If you don't then it will open another one. Pretty neat, right?

Okay, we're going to be using pools today since we're doing a web server. I'd really only use a client for a one-off script or if I'm doing transactions which aren't supported by pools (transactions are not covered in this course but it's if multiple queries have to happen all at once or not all). Otherwise I'd stick to pools. One isn't any harder to use than the other.

So let's see how to connect to a database.