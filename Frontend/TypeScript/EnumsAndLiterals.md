Enums are useful for defining states

```typescript
enum GameState {
    init = "Initializing",
    idle = "Initialized",
    loading = "Starting",
    playing = "In-Game",
    end = "Post-Game",
}

const checkState = (state: GameState): boolean => GameState.idle === state

console.log(checkState(GameState.idle));
```

Type Literals are great for defining constraints to type

```typescript
const dice:1|2|3|4|5|6 = 4;
```
A more sophisticated example with functional overloads
```typescript
function sendEvent(name: "checkout", data: { price: number }): void;
function sendEvent(name: "addToCart", data: { productId: number }): void;
function sendEvent(name: string, data: unknown): void {
    console.log(`${name} and the data ${JSON.stringify(data)}`);
}

sendEvent("checkout", { price: 3241 });7
```