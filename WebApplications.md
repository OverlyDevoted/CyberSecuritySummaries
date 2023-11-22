# Web applications

These are programs that usually run on the browser. Web applications adopt client-server architecture. Client is a browser, and server is an application that browser sends HTTP requests to retrieve resources.

## Static vs Dynamic websites
Static site content cannot be changed real-time. It's used for blogs or some websites without the need to change information displayed on the server. These sites were mainly in Web 1.0

Dynamic sites are the opposites and are used in Web 2.0.

Dynamic site key differences:
- Being modular
- Running on any display size
- Running on any platform without being optimized

## Differences between web applications and native operating system apps

- Can run independently on any browser (some functionalities may be missing)
- All users use the same version of the website, because they download the current website version from the server
- less efficient, can't utilize hardware or OS specific APIs, less capabilities, but this is slowly changes, more and more websites use modern frameworks that enable OS capabilities

## Web applications distribution

There are platforms where you can make your own website. These are some open-source platforms:
- WordPress
- OpenCart
- Joomla
More closed-source:
- Wix
- Shopify
- DotNetNuke

## Security risk in Web applications

Since public web apps on open network can be accessed by anyone, a right person that knows how to use tools with wrong intentions can gain access to servers which may contain sensitive data.

That is why it's important for an organization to pen test their applications and fix any security vulnerabilities

To properly pentest web applications, we need to understand how they work, how they are developed, and what kind of risk lies at each layer and component of the application depending on the technologies in use.

[Websites are tested against OWASP](https://github.com/OWASP/wstg/tree/master/document/4-Web_Application_Security_Testing)

Standard procedure to pentest a website is to test:
- Frontend. The goal is to find any Sensitive Data Exposure and Cross-Site Scripting (XSS).
- Back end. Core web application, then we enumerate the technologies that server uses and check for exploitable flaws. Websites are tested from both unauthorized state(if we can authorized through unusual means) authorized (can we access sensitive data)

We often find SQL injection vulnerabilities on web applications that use Active Directory for authentication. This usually does not lead to password leaks, but it's possible to get emails, which then can be used for password spraying. Which means trying to login from different emails with one password, than the other and so on

A few more real-world examples of web application attacks and the impact are as follows:
| Flaw | Description |
| - | - |
| SQL injection | Used to obtain data from the database. |
| File inclusion | Reading source code to find hidden pages or directories, which exposes additional functionality that can be used to gain remote code execution |
| Unrestricted file upload | If any file type is allowed we could upload any file, load it on the website which would execute code if the file had that |
| Insecure direct object referencing (IDOR) | Can be combined with Broken access control this can be used to access another users file or functionaliy. Example would be editing other user's profile by accessing an url `/user/701/edit-profile` and if we change `701` to `702` and then we may change data. |
| Broken access control | Example: we register to a website, and for example it POSTS to the server data: `username=bjones&password=Welcome1&email=bjones@inlanefreight.local&roleid=3`. What if we intercept the request, we can change roleid and then we can possible get an access to admin privileges |

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

## Web application architecture

Web app architecture is divided into three different layers

| Layers | Description |
| - | - |
| Presentation layer | Consists of UI which enables the client to communicate data with the application and system |
| Application layer | Insures that all client requests are correctly processed. Authorization, privileges and data sent is validated there |
| Data layer | Closely works with application layers as it supplies data to it, and its the layer where the data is stored |

## Microservices

Are independent components of a web application, which are mainly programmed for one task only.

For a store web app example we could program these microservices:
- Register
- Search
- Payments
- Ratings
- Reviews 

These components communicate with the client and with each other. Communication between themselves is stateless, which means that the request and the response are independent.
The use of microservices is considered service-oriented architecture (SOA), built as a collection of different automated functions focused on a single business goal.

They can be written in different programming languages.
Microservice advantage:
- Agility
- Flexible scaling
- Easy deployment
- Reusable code
- Resilience

### Serverless

AWS, GCP, Azure Cloud providers offer serverless architecture. They help build system infrastructures without having to worry about servers. The services are run in stateless containers (e.g. Docker). All server stuff is handled by the cloud provider: scalability, provision, maintaining servers.

## Architecture security

Is important to understand different architectures when doing penetration testing, because the vulnerabilities may lie not in the some bad code, but at the architectural level.

An web app may have its core functionality secure, however due to lack of proper access control a Role-Based access Control attack may be done to gain privileges and used to gain private information. 

# Front end vs Back end

Main Back end components for a web application

| Component | Description |
| - | - |
| Back end Servers | The hardware and operating systems that host all other components and are usually run on Windows, Linux or containers |
| Web servers | Web servers handle HTTP requests and connections. (Apache, Nginx, IIS) |
| Databases | Databases store and share data needed for the web app. (MySQL, MSSQL, Oracle, PostgreSQL) and some non relational (MongoDB, NoSQL) |
| Development frameworks | Development frameworks are used to develop the of a Web application. Some well-known development frameworks are: Laravel(PHP), ASP.NET(C#), SPRING(JAVA), DJANGO(PYTHON), and EXPRESS (NODEJS/JAVASCRIPT) |

For security reasons sometimes all back end components are separated into their own isolated logic separations using containers with Docker. To maintain logical separation and mitigate the impact of vulnerabilities, different components of the web application, such as the database, can be installed in one Docker container, while the main web application is installed in another, thereby isolating each part from potential vulnerabilities that may affect the other container(s). Its possible to separate into their own servers but its more resource intensive and harder to maintain.

Back end fits into Data access layer

Backend stacks:
| Combinations | Components |
| - | - |
| LAMP | Linux, Apache, MySQL, PHP |
| WAMP | Windows, Apache, MySQL, PHP |
| WINS | Windows, IIS, .NET, SQL SERVER |
| MAMP | macOS, Apache, MySQL, PHP |
| XAMPP | Crossplatform, Apache, MySQL, PHP/PERL | 

## Securing Front/Back ends

For an example: A website could have a search with SQL injection, XSS or Command injection vulnerabilities

Whitebox pentesting - is looking at the code and looking for possible security issues, vulnerabilities, invalid input validation. 

As we know, we almost always have code for the frontend, but the same cannot be said about the backend. That's why when checking for vulnerabilities **blackbox pentesting** is done (not when backend is opensource). Local file inclusion vulnerabilities let's us retrieve files from the server, possibly backend code which could give us more insight into how the backend works and even disclose sensitive data.

Top 20 security mistakes made by front-end developers:
| No. | Mistake |
| - | - |
| 1. | Permitting invalid data to enter the database | 
| 2. | Focusing on a system as a whole | 
| 3. | Establishing personally developed security methods | 
| 4. | Treating security to be your last step | 
| 5. | Developing plain text password storage | 
| 6. | Creating weak passwords | 
| 7. | Storing unencrypted data in the database | 
| 8. | Depending excessively on the client side | 
| 9. | Being too optimistic | 
| 10. | Permitting variables via the URL path name | 
| 11. | Trusting third-party code | 
| 12. | Hard-coding backdoor accounts | 
| 13. | Unverified SQL injections | 
| 14. | Remote file inclusions | 
| 15. | Insecure data handling | 
| 16. | Failing to encrypt data properly | 
| 17. | Not using a secure cryptographic system | 
| 18. | Ignoring layer 8 | 
| 19. | Review user actions | 
| 20. | Web application firewall misconfigurations | 

Theses mistakes lead to OWASP top 10 vulnerabilities for web applications:

| No. | Mistake |
| - | - |
| 1. | Broken access control | 
| 2. | Cryptographic failures | 
| 3. | Injection | 
| 4. | Insecure design | 
| 5. | Security misconfiguration | 
| 6. | Vulnerable and outdated components | 
| 7. | Identification and authentication failures | 
| 8. | Software and data integrity failures | 
| 9. | Security Logging and monitoring failures | 
| 10. | Server-side request forgery | 

# HTML *should i really be writing a compendium entry for this?...* 

## URL encoding *apparently yes!!!*

Otherwise called percent-encoding. URL's can only use ASCII encoding (256 symbols), which means all other characters have to be encoded in this URL encoding. URL encoding replaces unsafe ASCII characters with a % symbol followed by two hexadecimal digits.

For example single quotes `'` get replaced with `%27` which is then understood by browsers. URL also cannot have any spaces in them, so a space is encoded in `%20` or `+`. Other encodings:

| Character | Encoding |
| - | - |
| space | %20 |  
| ! | %21 |  
| " | %22 |  
| # | %23 |  
| $ | %24 |  
| % | %25 |  
| & | %26 |  
| ' | %27 |  
| ( | %28 |  
| ) | %29 |

[More](https://www.w3schools.com/tags/ref_urlencode.ASP)

```Burp suite has a built-in decoder/encoder ```

## HTML verbatim 
The `<head>` element usually contains elements that are not directly printed on the page, like the page title, while all main page elements are located under `<body>`. Other important elements include the `<style>`, which holds the page's CSS code, and the `<script>`, which holds the JS code of the page, as we will see in the next section.

And each of these elements is called a DOM. Defined by W3C as:
```Document Object Model (DOM) is a platform ad language-neutral interface that allows programs and script to dynamically access and update the content, structure, and style of a document```

DOM is separated into 3 parts:
- Core DOM - standard model for all document types
- XML DOM - standard for XML documents
- HTML DOM - standard for HTML documents

# CSS *hmm.. wonder about this one..*

## CSS usages

They can be used to style XML based hierarchical applications, SVG items and is used on modern mobile development platforms to design mobile app UI.

## CSS Frameworks
- Bootstrap
- SASS
- Foundation
- Bulma
- Pure

# Javascript

Javascript is in control of functionality for the web page. Without it, webpage is static and would not have much interaction.

## Javascript frameworks

- Angular
- React
- Vue
- jQuery

[More frameworks](https://en.wikipedia.org/wiki/Comparison_of_JavaScript-based_web_frameworks)

# Sensitive data exposure

All frontend components interact with client. Therefore, if they are attacked, they do not pose a direct threat on the core backend. They put an end-user in danger of being attacked and exploited. Front end vulnerabilities could be leveraged to gain access to admin privileges.

Most attacks are focused on the backend ant its functionality, but sometimes frontend vulnerabilities can let us to get into hidden sub-pages.

**Sensitive data exposure** - the availability of sensitive data in clear text. And it's found in the source code.

You can access webpage HTML source code by prefixing `view-source:` to an URL.

Sometimes credentials, hashes, exposed links, directories user information. Which could further be leveraged to gain access to other web system components.

There are automation tools that help reading HTML source code for possible vulnerabilities

## Prevention

Unused code, credentials should not be left, so it's important to review code before publishing it to the public. 
There are Javascript code packing or obfuscation tools that reduce the chances of exposing sensitive data.

## Sensitive Data Exposure Challenge
Check HTML for password which was Sensitive Data Exposure `HiddenInPlainSight`

# HTML Injections

Major aspect of front end security is validating and sanitizing accepted user input. Which often is done in the back-end, but sometimes it never reaches it and the data is used for front-end only, that's why it's still important to sanitize input.

So HTML Injections occurs when unfiltered user supplied data is rendered on the webpage. Sometimes a user could get control of making his input displayed in some way.

We could **inject HTML** as external login forms to get their login data from malicious *server. 

**Web defacing** is changing the appearance of a website, which may cause reputation loss for a server.

# XSS

Often if you can inject HTML u will be able to perform an **XSS**. Which is JavaScript injected into HTML, which could possibly give us access to the backend.

XSS Types:
| Type | Description |
| - | - |
| Reflected XSS | Occurs when user input is displayed after processing (e.g. search result or error message) |
| Stored XSS | Is when user input is stored into the backend database and the is displayed in the webpage (e.g. posts, comments) |
| DOM XSS | When user input is directly shown in the HTML DOM object (e.g. vulnerable username or page title) |

With injected JavaScript it is possible to retrieve session cookies, and we get session cookies of other users we could do authenticated commands through other users. 

[OWASP XSS prevention cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

## XSS Challenge

Inject some javascript. Injected with: `<img src="" onerror="console.log(document.cookie)">`

# Cross-Site Request Forgery (CSRF)

Is also caused by unfiltered user input. These utilize XSS to perform queries, API calls on a web app that the victim is currently authenticated to. This allows attacker perform actions as an authenticated user. 
These attacks could also utilize URL parameters for getting access

A common CSRF attack is to gain high privileged access to a web application is by supplying a JavaScript payload that automatically changes victims password to the value set by an attacker. Once the paylaod is viewed by  victim (e.g. comment with XSS)

## CSRF Prevention
There should be measures to filter and sanitize user input in the backend, but it is always important to do that also in the frontend if it would be displayed somewhere on the frontend.

**Sanitization** - Removing special characters and non-standard character from user input before displaying it
**Validation** - Ensuring that submitted user input matches the expected format (e.g. submitted email matches email format (e.g. with REGEX))

Additionally not only on user input submit should be sanitized and validated, but also when it's displayed.

Another solution is [web application firewall (WAF) ](https://en.wikipedia.org/wiki/Web_application_firewall), it checks HTTP for any malicious user input. But it still can be bypassed.

Also there are Headers that help prevent CSRF (e.g. anti-CSRF token or X-XSS-Protection)

[CSRF cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
From that cheatsheet: ```Remember that any Cross-Site Scripting (XSS) can be used to defeat all CSRF mitigation techniques!```

# Back end components
## Web Server
Web server is an application that runs on the backend server, which handles all of the HTTP traffic from the client-side browser, routes it to the requested pages and responds to client browser

Web server responds with HTTP and it has many status codes that it returns, that describes response  
| Status Code | Description |
| - | - |
| 200 OK | Request succeeded |
| 201 Created | Indicates that request succeeded and a resource was created on the server |
| 301 Moved permanently | The URL of the requested resource has been moved permanently |
| 302 Found | The URL of the request has been changed temporarily |
| 400 Bad request | Request can't be processed due Invalid syntax |
| 401 Unauthorized | Unauthenticated attempt to access page |
| 403 Forbidden | Client does not have access to the server |
| 404 Forbidden | The server can't find requested resource |
| 405 Method Not Allowed | The request method is known by the server and has been disabled or cannot be used |
| 408 Request Timeout | This response is sent by server on an idle connection, even without client request |
| 500 Internal Server Error | Server has encountered error it doesn't know how to handle |
| 502 Bad Gateway | The server while working as a gateway to get response needed to handle request received a bad request |
| 504 Gateway Timeout | Server is acting as gateway and can't get a response |

When server receives a request it's then responsible to route it to the destination.

Web servers are utilized to run web applications and they handle HTTP requests.
## Popular Web Servers
### Apache (used by 40% of web apps)
Usually used with `PHP` and supports `.NET`, `Python`, `Perl` and even OS languages like `Bash` through `CGI`.
Apache can be extended to support more languages.
### Nginx (used by 30% of web apps)
Focuses on serving many concurrent web request with relatively low memory and CPU usage by utilizing asynchronous architecture. This makes it reliable. Also it's open-source which can be contributed to.
### IIS (15%)
Is developed and maintained by Microsoft and mainly runs on Microsoft Windows Servers. Used to host apps developed for the Microsoft .NET network. But can host we application developed with other languages (e.g. `PHP`), or host `FTP`. 
Is optimized for Active Directory integration and includes Windows Auth.

## Databases