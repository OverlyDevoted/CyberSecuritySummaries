# Learning TypeScript #

Typescript helps avoid potential bugs due to type incompatability, improves intellisense

1. In typescript to define a type for a variable you can do:

`let variable : type`

Also types are inferred, so if you do this:

`let variable = "Hello TypeScript!"`

the type of the `variable` will be `string`

to opt out from type checking we can annotate the variable with any type. It means it will be loosely typed, which basically means default JavaScript behavior.

2. Functions

```typescript
function name(variable1: type, variable2: type): return_type
{
    return return_type_object; (if return_type defined)
}
```

3. One of the ways to define function component for react typescript is:

`const ExampleComponent: React.FC<Props_Type> = () => {}`

Other way

```typescript
export (if default) default function ExampleComponent({property1, }:{property1: type}) {
}
```

4. Destructuring variable (more of a javascript ting *Destructuring assignment*)

We can assing values from an object in several ways:

`const variable = object.property;`

Or we can do the so-called destructuring of an object

`const { property } = object;`

5. Writing custom types

```typescript
type ExampleComponentProps = {
    property1: type,
    property2: type
}
export default function ExampleComponent({property1, property2 }:ExampleComponentProps) {}
```

it's also possible to make optional props properties like this:

```typescript
type ExampleComponentProps = {
    property1?: type;
    property2?: type;
}
```

6. Union types

For example if we had a property that only accepted some predefined string values we could crete a union type

`type UnionType = "string1" | "string2" | "string3"`

Now we can only pass one of these values as a prop to a component 

```typescript
type UnionType = "string1" | "string2" | "string3"
type ExampleComponentProps = {
    property1: UnionType;
    property2: type;
}
export default function ExampleComponent({property1, property2 }:ExampleComponentProps) {}
```

7. Arrays 

`const myArr: number[] = [1,2,34]`

or

```typescript
type ExampleComponentProps = {
    property1: UnionType;
    property2: type[];
}
```

you can also specify the length for the max array elements and it's called **tuple type**, so:

```typescript
type ExampleComponentProps = {
    property1: UnionType;
    property2: [type, type, type, type];
}
```

8. We can also specify objects as a type

```typescript
type ExampleComponentProps = {
    object1: {    
        property1: UnionType;
        property2: type[];
    }
}
```

9. React also has many custom types. One of the types is `React.JSX.Element`, `React.CSSProperties`

10. Record type

For objects you can specify the type for key and the value. 
So for example you had to pass in a prop:

```typescript
<Button borderRadius={{
    'topLeft':5,
    'topRight':5,
    'buttom':10,
    'top':10    
}} />
```
so in the example the component prop `borderRadius` passes an object with keys that are passed in as strings. We would have to modify the type for the component in such a ways that every property could accept keys as strings and values as numbers, so:

```typescript
type ButtonProps{
    borderRadius:{
        topLeft: Record<string, number>
        ... same for the others
    }
}
```

11. Typing functions

So our `Button` component now accepts an onClick prop. So we have to define a type for the onClick property
Use of component:

`<Button onClick={handleClick} />`

Define component:

```typescript
type ButtonProps = {
    onClick: () => void;
}
export default function Button({onClick}:ButtonProps){
    return <button onClick={onClick}>Submit</button>
}
```

`onClick: () => void;` when defining a function as a type for a prop we specify properties in the brackets and then a return type

With properties and return
Use of component:

`<Button onClick={handleClick} />`

Define component:
```typescript
type ButtonProps = {
    onClick: (property1: string) => number;
}
export default function Button({onClick}:ButtonProps){
    return <button onClick={onClick}>Submit</button>
}
```

12. Typing children for React component

`<Button>Click me!</Button>` woould throw error so we need to specify a child prop:

```typescript
type ButtonProps = {
    children: React.ReactNode;
}
export default function Button({children}:ButtonProps){
    return <button>{children}</button>
}
```

`React.ReacNode` is a pretty generous type, it allows React components, html elements, strings to be passed. If we wanted to allow only JSX elements (excludes strings) we could assing type `JSX.Element`

13. `useState` setter function as a prop

 ```typescript
type ButtonProps = {
    setState: React.Dispatch<React.SetStateAction<number>>;
}
export default function Button({setState}:ButtonProps){
    return <button onClick={setState}></button>
}
```

14. Default prop values

```typescript
export default function Button({count = 0}){
    return <button onClick={setState}></button>
}
```

15. `type` and `interface` keywords

object descriptions created with `type` keyword are considered type aliases

`interface` can also describe objects

```typescript
interface CustomType {
    property1: type;
    property2: type;
}
```

but it does not have an equals sign like type, so we have to add properties to the description, while with `type` we can skip that

`type URL = string; // valid`
`inferface URL { url: string } // we have to create property`

also applies to union types, u can't describe them with `interface`

16. Component props

HTML elements have their own attributes, like `<input>` has `type`, `value` and etc. So we can specify that we want attributes of a html element to be props for our component

`type ButtonProps = React.ComponentProps<"button">`

There's also `React.ComponentWithRefs<"component_name">`  and `React.ComponentWithoutRefs<"component_name">`. SO like the name suggest these explicitly state whether component is with refs or without and it's advised to use one of these instead of `React.ComponentProps<"component">`

But it still should be known that you still have to specify which properties will be passed as props for the component. So you can either specify only the ones that can be used, or if you want all to be used you can type `...rest` for the property arguments to have all specified component properties available
```
export default function Button({ type, autoFocus, ...rest}){
    return <button type={type} autoFocus={autoFocus} {...rest} ></button>
}
```

17. Intersecting types with `&`

You can create a types and join them

```
type ButtonProps = {
    color: "red" | "blue" | "green";
    type: "button" | "submit" | "reset";
}

type SuperButtonProps = ButtonProps & {
    size: "md" | "lg";
}

type ComponentButtonProps = `React.ComponentWithoutRefProps<"button">` & SuperButtonProps & {
    autoResize: boolean;
}
```

With interfaces:
```
interface ButtonProps {
    color: "red" | "blue" | "green";
    type: "button" | "submit" | "reset";
}

interface SuperButtonProps extends ButtonProps {
    size: "md" | "lg";
}
```

18. Utilize typescript type inference ability to find types for different variables, function arguments

19. State variables of custom object types
For these you then have to define a type

```
type User = {
    name: string;
    age: number;
}

export default function Button() {
    const [user, setUser] = useState<User>(null);
}
```

but the code above would throw an error because the user can't be null it has to be of type User. This is a common problem when on page load we don't have user data and we are fetching it from somewhere so we then have to specify that the state might be null and to do that we tell it might be null: 
`const [user, setUser] = useState<User | null>(null); `

Now if we accessed value for `user.name` we would get an error that the value might be `null`, so now we have to add optional chaining when accessing variable value - `const name = user?.name` so now the `name` variable will be undefined when the `user` is not yet fetched.

20. Specifying type for `useRef` hook
If we wanted to pass ref to a html component we could specify the type for ref like this:
`const ref = useRef<Element>(null)` or `const ref = useRef<HTMLElement>(null)` or even more specific `const ref = useRef<HTMLButtonElement>(null)` 

21. Specifying type for `useContext` hook

**Research needed**

22. `as const` specifies that a variable will be `readonly`

23. `Omit` utility 
It's used to prune type of some property

```
type User = {
    sessionID: string;
    name: string;
}
type Guest = Omit<User, 'name'>;
```

24. `as` type assertion
You can assert a type for a variable with `as` keyword
```
type ButtonColor = "red" | "blue" | "green"

export default function Button() {
    useEffect(()=>{
        const prev_color = localStorage.getItem("buttonColor") as ButtonColor
    }, [])
    return (<button>Click me!</button>)
}
```

25. Generics

```
const convertArray = <T,>(value: T): T[] => {
    return [value];
}
```

or (the tutorial guy said he likes this other because he does not have to write out `<T,>` which he finds ugly ) 

```
function convertArray<T>(value: T) : T[] {
    return [value]
}
```

26. Generic props

```
type ButtonProps<T> = {
    countValue: T;
    countHistory: T[];
}

export default function Button<T>({countValue, countHistory}:ButtonHistory<T>) {
    return <button>Click me!</button>;
}
```

This also binds the countValue and countHistory to the same type, so when passing them both, they have to be of the same type 

27. Global types
We need a way to specify types that other components can access. For that we can create a `/lib/types.ts` file where we specify all of our types and then just `import { type Color } from './lib/types.ts'`

28. `unknown` type
`unknow ` type is for data, usually fetched from a third-party source and it means that we know nothing about it

so we use something like *Zod* to get the type

29. https://www.youtube.com/watch?v=dLPgQRbVquo