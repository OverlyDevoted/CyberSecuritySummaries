Prep

What is Hibernate and JPA

JPA is a specification of high-level database interaction API. Usually it's used to create persistence frameworks which help with developing interactions with database in a object-oriented way.

To create a SPRING BOOT app:

1. Add dependencies

Common dependencies:
- Spring web
- Spring Data JPA (Hibernate)
- JDBC API
- Postgres driver
- H2
- Spring security
- Lombok

1.1. Create a docker-compose with needed services

2. Configure basic application.properties

Include database connection things

spring.datasource.url=jdbc:postgresql://localhost:5423/posgres
spring.datasource.username=postgres
spring.datasource.password=12345

Include hibernate settings
spring.jpa.hibernate.ddl-auto=update - There are many different values based on what you are doing with persistence. If using hibernate it will be auto.

record
@FunctionalInterface
static in functional interface
implementing
permits
sort