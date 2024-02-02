# DOM 

Document object model let's the browser to understand and parse web page structure. According to DOM every HTML element is an object that can be accessed in JavaScript and all elements are the children of root.

When the page is loaded, all the HTML is converted into DOM tree. This let's the browser to interpret user actions. 

The three consists of nodes that contain objects, which as previously stated are generated from the HTML. Every node can have reference to it's `parent` node `children` nodes. Such structure let's browser to dynamically modify element content, attributes, remove or delete elements and much more.

`document` object let's us access the DOM tree and various other attributes. So any element that was created from HTML can be accessed through `document`.  

We can access the object corresponding to HTML's `body` with `document.body`. Then we can change `document.body` style through `document.body.style`. All of the same CSS properties are typed with camelCase when accessed through JavaScript.  

Top nodes for `document` are:
- `document.documentElement` - highest order document node that represents `<html>` element
- `document.body` represents `<body>`
- `document.head` represents `<head>`

## Accessing node children

```javascript
for (let i = 0; i < document.body.childNodes.length; i++) {
  console.log( document.body.childNodes[i] );
}
```

This let's us access each child inside the `<body>`. It's important to know that `document.body.childNodes` does not return an array, but instead it return an Array-like object called NodeList, which element's can be accessed similar to an array. But array manipulation methods map, forEach, filter will not work.

Useful self-explanatory methods:

- firstChild
- lastChild

## Accessing siblings

- nextSibling
- previousSibling

## Accessing parent

- parentNode

## DOM element search methods

- `getElementById` - finds element by ID, if no element found returns `null`
- `getElementsByClassName` - returns `NodeList` of all elements that have a corresponding class
- `getElementsByTagName` - returns `NodeList` by HTML tag
- `querySelector`,`querySelectorAll` - lookup rules are defined somewhat reminiscent to selectors we write in CSS. Also returns `NodeList` or a specific element 

## Dynamically adding DOM elements

1. Create a new DOM element
`const newDiv = document.createElement("div")`
2. Add the element to the DOM as a child of some parent node
`document.body.appendChild(newDiv)`

There are many different methods for adding elements. Some more notable are:
- `append(...args)` - let's to add multiple element with one call
- `prepend(...args)` - add element at the start of the `NodeList`
- `before(arg)` - adds element before itself as a sibling
- `after(arg)` - adds element after itself as a sibling
- `innerHTML = "html_code_as_string"` - Adds HTML code string. Not recommended to use without proper security measurements. Sometimes would be used to add text. To add text use `textContent`