## HTTP requests

basic format of an `http` request is as follows
VERB (GET,POST,DELETE,PUT,..) /resource/locator HTTP/1.1
Header1: Value1
Header2: Value2
...
\< Body of requests >

Usual Request Headers:
 - Host: Indicates the desired host handling the request
 - Accept: Indicates what MIME type(s) are accepted by the client; often used to specify json or XML output for webservices
 - Cookie: Passes cookie data to the server
 - Referer: Page leading to this request (note: this is not passed to other servers when using HTTPS on the origin)
 - Authorization: Used for 'basic auth' pages (mainly). Takes the form "Basic \< base64' username:password \>". Sometimes websites that use this basic auth can be decrypted with Burp application

## Cookies

Cookies are sent with each request made to the server they are scoped for. Sometimes cookies are for specific domains and sometimes its only for the root domain and it will apply to any subdomains. And this has security implications. And if you can set cookies where you are not suppose to, that could also be a security breach. HTTP in nature is stateless, so cookies help remind the state of client session. Cookies are most often used for storing authentication information, it's usually encoded into some cipher.
SO
Cookies added for .example.com can be read by any subdomain of example.com
Cookies added for a subdomain can only be read in that subdomains and its subdomains
A subdomain can set cookies for its own subdomains and parent, but it can't set cookies for sibling domains
E.g. test.example.com can't set cookies on test2.example.com, but can set them on example.com and foo.test.example.com

Cookie vulnerabilities are a big issue, because the hierarchy rules are often not considered when implementing logic with them. Sometimes you see people scoping cookies where unauthorized code or insecure code is running alongside secure code and can access the same cookies and manipulate the cookies of parent domains of subdomains.

### Flags for `Set-Cookie` header

 - Secure: the cookie will only be accessible to https pges
 - HTTPOnly: the cookie cannot be read by Javascript

 ## `HTTP` - HyperText Transfer Protocol
 It's an application level protocol used to get resources from the `WWW` (World Wide Web)

*Hypertext* - text that contains links to other resources and text that can be easily interpreted by readers

HTTP communicaions consists of a client and a server. A client makes a request to the server for a resource. The server processes the request and returns requested resources. The default port for http communications is `80`, though it can be done through any port. HTTP requests are used to retrieve website resources. We enter **Fully Qualified Domain Name** as a **Uniform Resource Locator** to reach the desired website.

So to make a HTTP request for a resource we enter an **URL**. The structure of an URL looks like this:

![http://admin:password@inlanefreight.com:80/dashboard.php?login=true#status](/hackthebox/images/url.bmp)

| Component | Example | Description |
| - | - | - |
| Scheme | `http://` or `https://` | Identifies the protocol |
| User Info | `admin:password@` | Optional component that contains credentials use to authenticate to the host
| Host | inlanefreight.com | Hostname or an IP that points to the server |
| Port | `:80` | Denotes through which port access the server. If no port specified `80` for `http` will be user or `443` for `https` |
| Path | `/dashboard.php` | This points to the resource that is being accessed, which can be a file or a folder. If no path is specified server returns the default index `index.html` |
| Query String | `?login=true` | Starts with `?` and consists of a parameters, in this case `login` and a value (e.g. `true`). Multiple parameters can be specified seperated with a ampersand `&` |
| Fragments | `#status` | Fragments are processsed by the browser client-side to locate sections within the primary resource | 

## HTTP flow

![HTTP flow](/hackthebox/Images/httpflow.bmp)

When the users enters a URL into the browser the browser send the request to a <mark>DNS</mark> server to resolve the domain and get the IP address for the server. 
DNS looks it up and returns it to the client. All domain names need to be resolved into an IP address, otherwise we can't send requests. 

Usually, browsers cache resolved domain names. On linux `/etc/hosts` file contains resolved hostnames. We can manually add DNS info into the file.

Once the browser gets the IP it sends a `GET` request to specified port for a specified resource. If getting resource at the root path `/`. Then, the server returns a `index.html`.

In that case the contents of an `index.html` are read and returned by the web server as an HTTP response. The response contains a status code (e.g. `200 OK`) which indicates a successful transaction. And then the browser renders the received `index.html` file.

## HTTP request sending tools

HTTP requests can be sent by a browser or by command-line tool like `cURL` (client URL). 

cURL allows to send requests to servers, primarily by HTTP along with some other protocols. cURL can be used for scripts, automation for sending web requests from the command line which is necessary for web penetration testing. In the command line
`curl http://host.com`
as it's a command line tool, it does not render HTML/CSS or run JavasScript, but rather it outputs the raw received resource

We can also download a file by adding the `-O` argument
`curl -O inlanefreight.com/index.html`
 
```If we want no output we can use the -s (silent) flag```

HTTP is insecure because all the data transfered is in clear-text. Which is a subject for the Man-in-the-middle (MiTM)attacks. The sent data can be viewed basically.
A HTTPS was invented to prevent that issue. With HTTPS all data is encrypted

```Although the data transferred through the HTTPS protocol may be encrypted, the request may still reveal the visited URL if it contacted a clear-text DNS server. For this reason, it is recommended to utilize encrypted DNS servers (e.g. 8.8.8.8 or 1.1.1.1), or utilize a VPN service to ensure all traffic is properly encrypted.```

## HTTPS communication flow

![HTTPS flow](/hackthebox/images/httpsflow.bmp)

This flow is also called a TLS 

[More about TLS handshakes](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/)

But the gist of it is:
1. Browser sends a HTTP request to a server
2. Server redirects to HTTPS
3. Client then connects to the server via HTTPS which is called a "client hello" packet giving info about itself
4. Then server exchanges the SSL certificate which is called the "server hello"
5. Then Client then verifies the certificate and sends key/certificate of its own to the server and an encrypted handshake
6. Then a server sends confirms the encryption method and session keys and sends back an encrypted handshake
7. And all further communication is encrypted 

```HTTP downgrade attack. Is when a MiTM setups a proxy HTTP server to which all the requests are proxied to. That way the hacker can read all the transferred data in clear-text```

cURL can also communicate with servers that use HTTPS. But if the SSL certificate for the server is outdated or invalid, then the request would be abandoned.

To ignore potentially insecure SSL we can use the `-k` tag for the curl. Useful when using self-signed certificates for localhost development.

## HTTP Requests

![HTTP Request](/hackthebox/Images/httprequest.bmp)

HTTP request consist of

| Field | Example | Description |
| - | - | - |
| Method | GET | Specifies the action to perform | 
| Path | The path to the resources requested. This can be also suffixed with a query string (e.g. ?login=adam) |
| Version | HTTP/1.1 | Denotes the HTTP version |

Then we got the headers. They are key-value pairs that specify request attributes.

And then a request ends with request body and data.

HTTP 1.X sends requests as clear-text and uses \n to seperate different fields and requests. While HTTP 2.X sends requests as binary data in a dictionary form.

## HTTP Response

![HTTP Response](/hackthebox/Images/httpresponse.bmp)

1. HTTP version and status
2. Then the headers, similar to the request
3. And then we got the response body in the form of HTML or JSON, images, css, js, pdf and more/

To see full HTTP requests and HTTP response with *cURL* we can use `-v` verbose flag.

## HTTP Methods and Codes

HTTP method specifies method for accessing a resource and specifies for the server how to handle the request. Some others allow receiving, sending forms and other information.

`-v` with cURL, lets us preview full request and let's us see all the headers. In the Method header we would see what method us used in the request. 

### HTTP Methods

| Method | Description |
| - | - |
| `GET` | Request a specific request. Additional data can be supplied with parameters in the URL link `?param=value` |
| `POST` | Purpose of this method is to send data to the server. It accepts a wide array of different data: Images, PDF, binary data, JSON. This data is appended to the request body after headers. | 
| `HEAD` | It's similar to `GET`, but instead of returning the requested resource it returns it's size |
| `PUT` | Creates a new resource on the server. This method is prone to security vulnerabilities, so a proper handling of this request should be considered  |
| `DELETE` | Deletes an existing resource. If not properly secured it could lead to DoS if critical files are deleted |
| `OPTIONS` | Returns information about the server, such as methods accepted by it |
| `PATCH` | Applies modifications to the server |

[There are more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

### HTTP response codes

All HTTP requests return a response with a status code. Status code describes if it was processed successfully.

| Type | Description |
| - | - |
| 1xx | Provides information and does not affect the processing of the request |
| 2xx | Identifies a successful request |
| 3xx | Returned when server redirects client |
| 4xx | Signifies improper request **from the client**. |
| 5xx | Returned when there's an issue **with the server responding** |

[Here's a full list of status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## GET 

Default browser request method. And it's used to obtain resources from the server. After loading resources browser then can request different resources.

Usually you will encounter that server somehow authenticates through it own means by just sending form data (that you fill up) to server through PUT and respond with authentication tokens to validate all further requests. By there's also basic HTTP authentication which is handled directly by the web server without interacting with the webpage.

In cURL to provide basic auth we add an `-u` flag.

`curl name:password url`
or
`curl http://admin:admin@<SERVER_IP>:<PORT>/`

Basic auth encodes data in base64 and sets the Authorization header to Basic YWRtaW46YWRtaW4=.While more modern authorization (e.g. `JWT`) sets the header to Bearer.

We can also authenticate by manually setting the Authorization header. (e.g. in cURL with `-H` flag)

### Challenge

I had to send requests in the browser, saw that js file was using php file for sending queries, used that php file with a parameter `?search=flag` and got the flag.

## POST

HTTP `POST` places parameters inside of the URL. This has some benefits

- **Lack of logging**: Server may transfer large items, and it would not be efficient for server to log all uploaded files as a part of requested URL, as is the case with GET request.
- **Less encoding requirements**: URL meant to be shared, that means it need to conform that it has to be converted back to letters.
- **More data can be sent**: There is a maximum URL length. Usually it's good to keep an URL below 200 characters.

In cURL we can form `POST` with a `-x POST` flag and then append our body data with a `-d` flag.
Example:
`curl -X POST -d 'username=admin&password=admin' http://<SERVER_IP>:<PORT>/`
Sometimes cURL redirects and we can do that with a `-L` tag.

If authentication is cookie based, after getting authenticated we can view the `Set-Cookie` response header and copy the value for future requests. Cookies can be sent with a `-b` flag.

In browsers, cookies are stored in `Storage` tab in devtools. And we can also add the Cookie through devtools. 

Sending cookies (or being authenticated) can be also used for XSS attacks.

### Challenge

To solve this challenge, I had to login through curl (or couldve done that through browser) to get a cookie:
`curl -X POST -d "username=admin&password=admin" http://83.136.254.234:35718/ -i`
Then with a cookie make a post for with a content type header `Content-Type: application/json` and send a query string.
`curl "http://83.136.254.234:35718/search.php" -X POST -H "Content-Type: application/json" -H "Cookie: PHPSESSID=9bhrenjugvoi51nu0j62bletqt" -d "{""search"":""flag""}" `

## CRUD

`| jq` flag in cURL will format the JSON

Usually not everybody can do all the CRUD operations for safety reasons. So to use the functions a cookie or authentication header would be provided to allow such operations.

### READ

Sometimes parameters from screen are extracted from URL fragment like in this curl request. Search in this way is usually done with restAPI.

`curl http://<SERVER_IP>:<PORT>/api.php/city/london | jq`

To get all records in the example we would use

`curl http://<SERVER_IP>:<PORT>/api.php/city/ | jq`

### CREATE

REST usually includes method for all data manipulation types. So wiht create we can create new data entries.

`curl -X POST 94.237.48.48:53522/api.php/city/ -d "{""city_name"":""VILNIUS"", ""country_name"":""LT""}" -H "Content-Type: application/json"`

You can also write javascript code to execute it in the browser. So you can use `fetch` to write HTTP requests

```
await fetch("http://94.237.48.48:53522/api.php/city", {
    "credentials": "omit",
    "headers": {
        "Content-Type":"application/json"
    },
    "body":"{\"city_name\":\"Kaunas\",\"country_name\":\"LT\"}",
    "method": "POST",
    "mode": "cors"
});
```

### UPDATE 

We can update entries in the database with PUT or PATCH
Difference between PUT and PATCH is that PUT is used to update an entry entirely, replace all of it, while PATCH is used to change just maybe a single attribute of an object, like .city_name of our example website. Sometimes even UPDATE is used in some websites.

`curl -X PUT 94.237.48.48:53522/api.php/city/Kaunas -d "{""city_name"":""MARIJAMPOLE"", ""country_name"":""LDU""}" -H "Content-Type: application/json"`

You can sometimes delete with PUT
`curl -X PUT 94.237.48.48:53522/api.php/city/Vilnius -d "{""city_name"":"""",""country_name"":""""}"`

### DELETE 

`curl -X DELETE 94.237.48.48:53522/api.php/city/marijampole`

### Challenge

Basically, just update a city with PUT method to `city_name` flag, then delete any other city with DELETE, and GET flag again to get flag