## APIs

Are used to connect front and back ends. In principle they are connected by data that they send between each other.

Frontend sends requests to the backend with data to be processed and usually receives output to display it or instantiate some app changes.

### Query Parameters

Usually GET and POST request are sent, frontend usually includes some data in the URL parameters or 

### WEB APIs

These enable remote access to functionality from the backend components and allows interactions between different services. Web APIs are usually accessed through HTTP requests. Other apps also have they own way of doing API.

WEB API example, let's say we have found a weather app on the internet that has an API that is publicly available to be used to access weather data. We could send requests as an URL with parameters of city name or id and retrieve JSON data from the weather app. 

Usually `SOAP` or `REST` web API standards are applied when developing and publishing such APIs

## SOAP

SOAP - simple object access. Shares data through `XML`, where requests are made through HTTP and bodies of such requests are formed also in `XML`. Frontend application have to be programmed to parse this information.
Example `XML`:
```xml
<?xml version="1.0"?>

<soap:Envelope
xmlns:soap="http://www.example.com/soap/soap/"
soap:encodingStyle="http://www.w3.org/soap/soap-encoding">

<soap:Header>
</soap:Header>

<soap:Body>
  <soap:Fault>
  </soap:Fault>
</soap:Body>

</soap:Envelope>
```

SOAP is used for transferring structured data (e.g. entire class object) or binary data and is often used to serialize objects, which enables sharing of complex data between applications. 

## REST

REST - Representational State transfer. Requests are made by supplying data through URL path (e.g. `search/users/1` )or a body and response returns data in a JSON format (e.g. {userId: 1, username: pypypupu})

REST APIs expect input passed through the URL path, *without specifying name or type?*. REST let's to break up web application functionality into smaller APIs and web app becomes more modular and scalable.

Usually response format is `JSON`, but we also can encounter `XML`, `x-www-form-urlencoded`, or even raw data.

Request example:
`GET /category/posts/`
JSON response:
 ```json
 {
  "100001": {
    "date": "01-01-2021",
    "content": "Welcome to this web application."
  },
  "100002": {
    "date": "02-01-2021",
    "content": "This is the first post on this web app."
  },
  "100003": {
    "date": "02-01-2021",
    "content": "Reminder: Tomorrow is the ..."
  }
}
```