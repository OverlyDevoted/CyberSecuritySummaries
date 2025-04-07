## @Service and @Component

Are simple annotations that Spring will initialize inside of it's context. These dependencies will be injected whenever they are needed.

## @SpringBootApplication

It's an umbrella annotation and has several other annotations references inside. Usually this annotation is used to mark the spring boot application entry point. These are the main annotations: 

1. `@Configuration` (inside of `@SpringBootConfiguration`) - annotates a configuration class, it's a place where Spring should scan for components during it's scanning phase
2. `@ComponentScan` - searches for components, services, configurations that get injected into the context.
3. `@EnableAutoConfiguration` - One of the Spring benefits is the 'sensible defaults' fact. This provides auto configuration and dependencies. Dependencies in this case are the packages that Spring boot starters provide. Imagine all the dependencies you can select during the initializr phase. 


