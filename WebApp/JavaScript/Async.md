JavaScript has an mechanism to perform operations pseudo-asynchronously. JavaScript still runs a single-threaded engine, but it simulates asynchronicity by ordering operations so that they are non-blocking and can be performed later at any time of the applications runtime.

## Asynchronicity using callbacks 
Callbacks are functions that are called when some criteria is met *Like a HTTP response is received from another web server*. 
```javascript
function loadData(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.send();
}

loadData('https://jsonplaceholder.typicode.com/posts', function(data) {
  console.log(JSON.parse(data));
});
```

## Asynchronicity using promises
Promises are objects that can wait for some response to occur while not blocking other parts of the program. When the promise is resolved or rejected a callback function can be performed on the received response.

## Async/await