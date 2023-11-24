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
