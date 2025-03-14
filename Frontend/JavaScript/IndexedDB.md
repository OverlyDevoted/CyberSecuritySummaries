# IndexedDB

Is a low-level API for storing client-side storage for any structured data, including files/blobs.

## Databases 

Highest level storage unit. Databases are used to store object stores. IndexedDB, may contain multiple databases.

## Object stores

Used to store key-value pairs. Conceptually is similar to SQL tables.

## Indexes

Let's do queries based on object features.

## Features

1. key-value pairs are saved.

Compared to `localStorage` or `sessionStorage` more complex data structure can be saved, such as objects, files, blobs 

2. Transactional 

Ensures read-write operation integrity between multiple web application instances 

3. Asynchronous

Read-write operations are asynchronous and uses promises. 

4. IndexedDB is a NoSQL database 

Queries return cursors, which stores the results of a query. It can be traversed or iterated when query returns multiple records. 

5. Same-origin policy

Means database is domain, protocol and port specific.

## Usage

1. Checking if client supports `IndexedDB`

```javascript
if (!window.indexedDB) {
    console.log(`Your browser doesn't support IndexedDB`);
    return;
}
```

2. Opening connection

```javascript
const request = indexedDB.open('CRM', 1);
```

First argument specifies database name, second version.

3. Capturing connection state

```javascript
request.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
};

request.onsuccess = (event) => {
    // add implementation here
};
```

After opening a connection to a database a `onupgradeneed` event is called. It's used to instantiate object stores and indexes 

```javascript
request.onupgradeneeded = (event) => {
     let db = event.target.result;

     // create the Contacts object store 
     // with auto-increment id
     let store = db.createObjectStore('Contacts', {
         autoIncrement: true
     });

     // create an index on the email property
     let index = store.createIndex('email', 'email', {
         unique: true
     });
 };
 ```

- We grab the reference to the database. 
- Create an object store called `Contacts`
- Then create an index for storing `email`

4. Inserting data

Here's an example function for inserting a contact into `Contacts` object store

```javascript
function insertContact(db, contact) {
    // create a new transaction
    const txn = db.transaction('Contacts', 'readwrite');

    // get the Contacts object store
    const store = txn.objectStore('Contacts');
    //
    let query = store.put(contact);

    // handle success case
    query.onsuccess = function (event) {
        console.log(event);
    };

    // handle the error case
    query.onerror = function (event) {
        console.log(event.target.errorCode);
    }

    // close the database once the 
    // transaction completes
    txn.oncomplete = function () {
        db.close();
    };
}
```

After successfully opening a connection to a database in the `onsuccess` we can add a callback to insert some data

```javascript
request.onsuccess = (event) => {
     const db = event.target.result;

     insertContact(db, {
         email: 'john.doe@outlook.com',
         firstName: 'John',
         lastName: 'Doe'
     });

     insertContact(db, {
         email: 'jane.doe@gmail.com',
         firstName: 'Jane',
         lastName: 'Doe'
     });
};
```

5. Reading data

```javascript
function getContactById(db, id) {
    const txn = db.transaction('Contacts', 'readonly');
    const store = txn.objectStore('Contacts');

    let query = store.get(id);

    query.onsuccess = (event) => {
        if (!event.target.result) {
            console.log(`The contact with ${id} not found`);
        } else {
            console.table(event.target.result);
        }
    };

    query.onerror = (event) => {
        console.log(event.target.errorCode);
    }

    txn.oncomplete = function () {
        db.close();
    };
};
```

To call this function, we have to first open connection 

```javascript
request.onsuccess = (event) => {
    const db = event.target.result;
    getContactById(db, 1);
};
```

6. Indexed data read

We can retrieve data by supplying our indexed `email`

```javascript
function getContactByEmail(db, email) {
    const txn = db.transaction('Contacts', 'readonly');
    const store = txn.objectStore('Contacts');

    // get the index from the Object Store
    const index = store.index('email');
    // query by indexes
    let query = index.get(email);

    // return the result object on success
    query.onsuccess = (event) => {
        console.log(query.result); // result objects
    };

    query.onerror = (event) => {
        console.log(event.target.errorCode);
    }

    // close the database connection
    txn.oncomplete = function () {
        db.close();
    };
}
```

7. Retrieving all data from a object store

```javascript
function getAllContacts(db) {
    const txn = db.transaction('Contacts', "readonly");
    const objectStore = txn.objectStore('Contacts');

    objectStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
            let contact = cursor.value;
            console.log(contact);
            // continue next record
            cursor.continue();
        }
    };
    // close the database connection
    txn.oncomplete = function () {
        db.close();
    };
}
```

8. For deleting data

```javascript
function deleteContact(db, id) {
    // create a new transaction
    const txn = db.transaction('Contacts', 'readwrite');

    // get the Contacts object store
    const store = txn.objectStore('Contacts');
    //
    let query = store.delete(id);

    // handle the success case
    query.onsuccess = function (event) {
        console.log(event);
    };

    // handle the error case
    query.onerror = function (event) {
        console.log(event.target.errorCode);
    }

    // close the database once the 
    // transaction completes
    txn.oncomplete = function () {
        db.close();
    };
}
```