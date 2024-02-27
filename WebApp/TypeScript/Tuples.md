Initially arrays of union type can have any of the defined types in any position

```typescript
let arr: (string | number | boolean)[] = ["yoshi", 21, false];
console.log(arr)
arr[0] = [arr[1], arr[1] = arr[0]][0]
console.log(arr)
```

The code above would work and we would see that 0 index value swapped with the 1 index value would produce no errors.

Now let's create a **tuple**

```typescript
let tup: [string, number, boolean] = ["mario", 18, true]
```

As we can see, in a tuple, types are index dependent. If we would try to assign a string to index 1 value, we would get a complaint.

Tuples are useful for shortening arguments when calling functions, we can create a tuple object and then spread it out in the argument. 