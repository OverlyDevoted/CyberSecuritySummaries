The reason behind using client-side data storage is **performance**. It's much faster to retrieve data from client-side storage than from a server as server introduces network latency to receiving data.

They are usually used to save personal preferences (theme settings, etc.) and as a back-up plan for cases when internet connection get. 

Server and client-side are stateless. Client-side storages are important as they let us preserve states

## Cookies

Used for:

- Session management. Keeping users logged in, remembering preferences
- Personalization. Used to track what content user has viewed to build personalized ads
- Tracking. For any data that could be tracked while browsing. Cart-items

Cookies are a way to save current client state, and they are usually used for communication between the client and server.

Term `cookie` comes from `magic cookie` term, which means data used for communication between different applications.

Cookies saved for the domain are always sent with every HTTP request.

## `localStorage` and `sessionStorage`

Domain-scoped storage used for storing data that will not be be sent to any server. It's purely for preserving state client-side state or sessions states.