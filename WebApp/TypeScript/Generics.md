# Generics

## Simple generics

```typescript
    const getLast = <T>(arr: T[]): number => arr.length-1;
```

## Multiple generics

```typescript
    const makeArr = <T, K>(...arg: [T, K]): [T, K] => arg
    const arr = makeArr(1,"1");
```

We can predefine types before use

```typescript
    const arr = makeArr<string, number>("a", 1)
```

We can set a default type

```typescript
const makeArr = <T = number, K>(...arg: [T, K]): [T, K] => arg
```

## Extending generic

You can extend generic. This puts constraints on the generic of what it must contain

```typescript
 const getFullName = <T extends { firstName: string, lastName: string }>(person: T): T => {
    return {
      ...person,
      firstName: "ok",
      lastName: "ew"
    }
  }
```

In this case return value couldn't be returned without the properties `firstName` and `lastName`.

```typescript
type PrimitiveType = string | number | boolean;
const extendArr = <T extends PrimitiveType>(val: T, times: number): T[] => {
    let res: T[] = []
    for (let i = 0; i < times; i++) {
      res.push(val);
    }
    return res;
}
```

`T` generic must be either string, number or boolean

## Type checking

You can check if a certain object is of type

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```