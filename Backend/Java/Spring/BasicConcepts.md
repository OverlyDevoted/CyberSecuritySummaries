What is Spring, Spring Framework and Spring Boot

**Spring** is the brand

**Spring Framework** is a base framework that abstracts a lot of layers for creating a backend microservice application, it handles HTTP protocol implementation.

**Spring boot** is a collection of different Spring based applications that provide many different additions, like MVC, Kafka integration, Logger integrations and many many other things.

## REST APIs in Spring

An REST API is implemented in a three layers application pattern and it contains (as an example checkout the ![JavaScript/ExpressJS example image.png](./../../JavaScript/ExpressJS/image.png), also this [rail architecture](https://github.com/rails/rails), they use varied verbatim but describe similar concepts):

- Controller: specifies concrete endpoints. Responsible for communication with clients.  
> *Also it says contains logic for responses, but it seems it's a nice segmentation to have them inside service functions, same as in javascript, but adhering to separation of concerns it makes more sense to make service more functional-paradigm-like and not have them handle response but only data processing and informing about the results*
- Service: business logic. Defines how system works
- Repository: data access logic.

So all files are structured in the way to facilitate this pattern 

Spring is modular by design. Some the main parts of spring are:

- Core Container: Beans, Core, Context, SpEL
- AOP, Aspects, Instrumentation, Messaging
- For data access/integration: JDBC, ORM, OXM, JMS, Transactions
- Web: WebSocket, Servlet, Web, Portlet

Projects, Modules:
- Boot
- MVC
- DI (dependency injection)
- Data access (Transactions)
- Security

Core features:

Coupling - the degree to which a module, class or other construct is directly tied to others

Less coupling means the system is easier to maintain

**SOLI(Dependency inversion)** - depend on abstractions, rather than implementations

If we have a service, a piece of functionality to be used in other places it should be used as an abstraction. We know what functionality the services provides, but we don't know it's implementation. Our consumption of the service should not care for it's dependencies.

Inversion of control - is a design principle, where **custom-written portions of o a computer program** receive **flow of control** from an external source (e.g. framework) 

Component - a glob of code to be used without change when writing an application that is out of control of the component writers. Without change means that the application does not change source code of the component, it may only configure it in certain ways.

Service - is similar to component. Main difference is that component is meant to be used locally - it's a jar file, assembly, dll. A service will be used remotely through some interface, either synchronous or async (web service, messaging system, RPC, APIs?).

```java
class MovieLister...

  public Movie[] moviesDirectedBy(String arg) {
      List allMovies = finder.findAll();
      for (Iterator it = allMovies.iterator(); it.hasNext();) {
          Movie movie = (Movie) it.next();
          if (!movie.getDirector().equals(arg)) it.remove();
      }
      return (Movie[]) allMovies.toArray(new Movie[allMovies.size()]);
  }
```

The point is the `finder` object, more precisely how we connect the lister object with a particular finder object. Another constraint is that the method moviesDirectedBy has to be completely independent of how all the movies are being stored. All the method does is refer to a finder and all the finder knows is how to respond to `findAll` call.

```java
public interface MovieFinder {
  List findAll();
}
```

```java
class MovieLister...

  private MovieFinder finder;
  public MovieLister() {
    finder = new ColonDelimitedMovieFinder("movies1.txt");
  }
```

Now let's say we have a problem. Our friend wants to use the MovieLister class. But now there is a problem what if they have a completely different form of storing their movie listing: a SQL database, an XML file, a web service, or just another format of text file? Since we have MovieFinder interface implemented we need to find a way to get an instance of the right finder implementation.

As you can see MovieLister now depends on MovieFinder and it's implementation ColonDelimitedMovieFinder. We would prefer it if it were only dependent on the interface, but then how do we make an instance to work with?

Plugin - links classes during configuration rather than compilation. The implementation class for the finder isn't linked to the program at compile time as we don't know what our friends might use. Instead we want lister to work with any implementation, and for that implementation to be **plugged** in at some point, out of my hands. How can we make that link so that the lister class is ignorant of the implementation class, but can still talk to an instance to do the needed work.

So the core problem is how do we assemble these plugins into an application? and universally they all do it using **Inversion of Control**.

Inversion of control - the standard way of program is that it asks me to input name, the inversion would be that I input it somewhere and some event happens

IoC - inversion of control container. Is a tool that helps to streamline the configuration and management of Java objects.

IoC uses dependency injection or dependency injection patterns to provide objects reference during run time.

AOP - aspect oriented programming - increases modularity by separating cross cutting concerns to functions that span across the application. It does so by adding behavior to existing code (an advice) without modifying the code, instead separately specifying which code is modified via a "pointcut" specification, such as "log all function calls when the function's name begins with 'set'". This allows behaviors that are not central to the business logic (such as logging) to be added to a program without cluttering the code of core functions. 

DAF - data access framework
