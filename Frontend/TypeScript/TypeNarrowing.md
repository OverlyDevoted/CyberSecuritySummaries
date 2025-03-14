# Type narrowing

Is a process of ensuring that proper types are used and decisions are made on appropriate types

## Type guard

Used to check if a variable is of a certain type. When type guard is used, TypeScript expects the variable to be of that type and will automatically check it's usage

```ts
const printName = (name: number | string): void => {
  if (typeof name === "string") {
    //string
  }
};
```

## Truthiness narrowing

Used to check whether a variable is truthy before using it

```ts
const printName = (name?: string): void => {
  if (name) {
    //string type
  }
};
```

## Equality narrowing

Check if both variables are equal, then the types of both variables must be the same

## `In` operator narrowing

Checks if an object or its prototype chain has a property with a name.

```ts
const getOptions = (component: Select | Checkbox) => {
    if('option' in component) {
        //checkbox type
        return
    }
    //select type
};
```

## `instanceof` narrowing

Used to check whether a value is an instance of another value. More specifically, in JavaScript x `instanceof Foo` checks whether the prototype chain of x contains `Foo.prototype`.

```ts
const printDate = (x: Date | string) => {
    if(x instanceof Date) {
        //date type
    }
    else {
        //string type
    }
}
```

## Assignment narrowing 

Typescript narrows the type based on the assigned value

```ts
let id: string | number;
id = 123;
console.log(typeof id); // number
id = "123";
console.log(typeof id); // string
```

It's recommended to use type narrowing instead of type assertion as it's more type-safe.
