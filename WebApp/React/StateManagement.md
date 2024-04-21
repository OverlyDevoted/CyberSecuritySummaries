## Prop drilling

It's passing props down the component tree from the ancestor to a child nested deeply inside.

## Context API

It let's parent component to provide data to the entire tree below it, this let's us avoid prop drilling.

It's designed to share data that can be considered global for a tree of react components. E.g. current authenticated user, theme, preferred language

It can not only pass the state, but can also provide setters

Cons:

- Great for passing data to deeply nested components
- Simple and lightweight. Great for simpler application
- It does not provide the same level of control over data flow as React or React query

## More state managers

### Redux

- Is used for complex data flows
- It provides a single, immutable state tree that you can access from any component, a clear data flow and a lof of flexibility
- Requires a lot of boilerplate and may be an overkill for simple apps

### Zustand

- It provides lower learning curve and usage is similar to React Hooks
- May be the choice ideal for smaller apps
- If your app would necessitate more features with significant complexity, Redux is probably a better choice  

### React query

- It is designed to fetch, cache and synchronize state with the server
- Automatically caches data, dedupes multiple requests and keeps the data, fresh by re-fetching it in the background
- It's not a general purpose state manager, and it requires asynchronous APIs   