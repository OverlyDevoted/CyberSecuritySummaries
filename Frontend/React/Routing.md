# Routing

## React router

It provides a way to do client-side routing for single page applications. It means that we can simulate having routes without actually triggering a full page reload.

React router is a library that provides navigational components

- Keeps your UI in sync with the URL
- Use location path for rendering different components
- Lazy loading
- History navigation
- Declarative approach to routing

## `<BrowserRouter>`

It uses HTML5 history API (`pushState` and `replaceState` and the `popstate` events) to keep your UI in sync with the URL and it's a wrapper that enalbes react-router

Whenever location changes `<Routes>` look through all its child routes to find the best match and renders that branch of the UI

`<Route>` may be nested to indicate nested UI, which also correspond to nested URL paths

Parent routes render their child routes by rendering an `<Outlet>`

`<Link>` allows user to navigate around the application

It's a good idea to save nested-route strings in constants

Wrap your routes with context providers if you need to be accessible in all application routes