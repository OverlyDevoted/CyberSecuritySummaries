# Ways to make types from other types

## Omit<Type, Keys>

Create a new type by omiting keys from another type

## keyof

Create a variable that can be instantiated with any type inside specified type

## `[key in keyof T] : K` 

Turn all the keys of type `T` into type `K`

## Pick<Type, Keys>

Create a new type by selecting keys from a specified type

## Partial<Type>

Make a new type from a specified type, but all keys. *with a question mark which indicates optional*

## Readonly<Type>

To make all or certain keys readonly

## Required<Type>

Makes partial keys required

## ReturnType<Type>

Sets the type to function return type

## Record<Keys, Value>

Forms a type from given `Keys` and `Value`

[More utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) 

```typescript
type User = {
    id: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    nickName: string;
    age: number;
    isLithuanian: boolean;
};

type UserUpdatedType = Omit<User, "id" | "email">;

let user: UserUpdatedType = {
    password: "XX",
    name: "XXX",
    surname: "XXX",
    nickName: "XXX",
    age: 0,
    isLithuanian: false
}


//use case
//for filtering the types and for creating a variable that could use any of the types defined in the type
type FilteredUser = keyof UserUpdatedType;
const useris: FilteredUser = "password"

console.log(useris)


//use case
//for converting a type to some common type. Maybe useful for a form
type UserStringified = {
    [key in keyof User]: string;
}
const userStringified: UserStringified = {
    id: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    nickName: "",
    age: "",
    isLithuanian: ""
}


//Pick. Picks properties from a type
type PickedUser = Pick<User, "nickName" | "email">
const pickedUser: PickedUser = {
    email: "",
    nickName: ""
}


// Pick with additional properties
type PickedAndAdded = Pick<User, "age" | "isLithuanian"> & { nationality: "Lithuanian" | "Latvian" | "Estonian" };
const usermanas: PickedAndAdded = {
    age: 52,
    isLithuanian: false,
    nationality: "Estonian"
}

// Partial. Make some of the type properties partial
type PartialUser = Partial<User>;

const partialUser: PartialUser = {
    name:"Roberto",
    age:41
}

user = {...user, ...partialUser};
console.log(user)
```
## Grouping by some property

```typescript
type MyUser = {
    id: string
    name: string
    email?: string
    ethnicity: "Black" | "Caucassian" | "Asian" | "Indian"
}

type OmittedUser = Partial<Record<MyUser["ethnicity"], Omit<MyUser, "ethnicity">[]>>

const groupById = (arr: MyUser[]): OmittedUser => {
    return arr.reduce((accum: OmittedUser, cur) => {
        const { ethnicity, id, ...other } = cur;
        const res = accum.hasOwnProperty(ethnicity) ? [...accum[ethnicity] ?? [], other] : [other]
        return {
            ...accum,
            [ethnicity]: res
        }
    }, {})
}

const user1: MyUser = {
    id: "123",
    name: "Popeye",
    email: "poppylover@gmail.com",
    ethnicity: "Caucassian"
}
const user2: MyUser = {
    id: "15",
    name: "Jin Jinny",
    email: "jinhater@gmail.com",
    ethnicity: "Caucassian"
}
const user3: MyUser = {
    id: "532",
    name: "Alabama",
    ethnicity: "Black"
}
const user4: MyUser = {
    id: "15",
    name: "Richard Ramirez",
    email: "penta@gmail.com",
    ethnicity: "Caucassian"
}
console.log(groupById([user1, user2, user3, user4]))
```