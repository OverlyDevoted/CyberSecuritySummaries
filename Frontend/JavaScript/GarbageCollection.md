## Garbage collection

Is responsible for cleaning out memory of unused objects. Usually it is performed automatically and is invisible.

Concept - Reachability

Reachable values are those that are accessible somehow and they are guaranteed to be stored in memory.

Base set of reachable values is:
- Currently executing functions, its local variables and parameters
- Other functions on the current stack and their internals
- Global variables

These are called roots

- Any other value is considered reachable from root by a reference or by a chain of references

```js
let user = {name: "Fred"} //reachable
let user = null; //object part becomes unreachable so it's collected
```

## Internal garbage collection algorithms

The basic algorithm is called "Mark-and-sweep"

Steps:
- Takes roots and marks (remembers) them
- Then it visits and marks all references from them
- Then it visits all marked objects and marks their references. All visited objects are remembered, so as not to visit the same object twice in the future
- And so until every reachable references (from roots) are visited
- All objects except marked are removed

## Garbage collector optimizations

- Generational collection
- Incremental collection
- Idle-time collection