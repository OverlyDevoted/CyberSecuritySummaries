What is Spring, Spring Framework and Spring Boot

**Spring** is the brand

**Spring Framework** is a base framework that abstracts a lot of layers for creating a backend microservice application, it handles HTTP protocol implementation.

**Spring boot** is a collection of different Spring based applications that provide many different additions, like MVC, Kafka integration, Logger integrations and many many other things.

## REST APIs in Spring

An REST API is implemented in a three layers application pattern and it contains (as an example checkout the JavaScript/ExpressJS example image.png, also this [rail architecture](https://github.com/rails/rails), they use varied verbatim but describe similar concepts):

- Controller: specifies concrete endpoints. 
> *Also it says contains logic for responses, but it seems it's a nice segmentation to have them inside service functions, same as in javascript, but adhering to separation of concerns it makes more sense to make service more functional-paradigm-like and not have them handle response but only data processing and informing about the results*
- Service: business logic
- Repository: data access logic 

Core features:
IOC - inversion of control container. Is a tool that helps to streamline the configuration and management of Java objects.

IOC uses dependency injection or dependency injection patterns to provide objects reference during run time.

AOP - aspect oriented programming - increases modularity by separating cross cutting concerns to functions that span across the application. It does so by adding behavior to existing code (an advice) without modifying the code, instead separately specifying which code is modified via a "pointcut" specification, such as "log all function calls when the function's name begins with 'set'". This allows behaviors that are not central to the business logic (such as logging) to be added to a program without cluttering the code of core functions. 

DAF - data access framework
