# Shallow and deep copies

Shallow copies are object copies where parent references change but object references inside the object do not.

While deep copies is when the object with all it's property references is copied and no longer are equal with the original object. Meaning changes in properties would not affect parent. Core principal of immutability.

## Immer

immer simplifies handling immutable data structures.

Immutable data structures allow for (efficient change detection). If a reference did not change, then the object did not change. Package makes cloning relatively cheap: unchanged parts of data tree don't need to be copied and are shared in memory with older versions of the same state 

With immutable state we guarantee that we will not change the original, but we will copy it, make changes to the copy and it lives on as a immutable. This may have performance overhead, but may protect from sideeffects, silent mutations. **Immutability is about protecting intent**. Predictability is better than complexity.

What problem does immutability solve?

Copy instead of mutate, you make changes to the copy instead of the original. Then the original and the copy can be used

React rerenders when you pass a new reference to a state value.

### Benefits

Immutability gives an explicit way to introduce change, no silent changes, gives you a way to monitor, undo/redo is available, easier to debug, predictability, in concurrency.

### Downsides

Memory overhead
