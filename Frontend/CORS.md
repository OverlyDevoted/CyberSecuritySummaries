[Information synthesized from this video](https://www.youtube.com/watch?v=4KHiSt0oLJ0)

# Cross-origin resource sharing

## Same-origin policy

CORS is a default browser policy that forces an application to request resources only from the same-origin locations unless specified otherwise in the server. 

So example.com opened in browser may request resources only from the same-origin, in this case - example.com.

On the other hand if the request is made to the website on the other origin like on foo.com, then it's a cross-origin request. Then the request may resolve in two ways. Either the server allows serving to cross-site origin and sends back a response or it does not allow that and does not send a proper response back.

Whether a response goes through is determined by the Access-Control-Allow-Origin header in the response nd Origin header in the request header. If they match the proper request is send.

Your owned servers need to be configured what origins they can send proper responses to or use a wildcard `*` symbol, which would symbolize that any origin can request the server.