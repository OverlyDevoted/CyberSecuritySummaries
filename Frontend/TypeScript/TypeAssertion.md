Sometimes we know more than TypeScript and we have to perform type assertion for certain objects.

```typescript
const myText:any = "Hogwarts"
const charsNum:number = (myText as string).length;
//OR
// const charsNum:number = (<string>myText).length;
```

Another example

```typescript
const myInput = document.getElementById("my-input") as HTMLInputElement;
console.log(myInput.value);
```