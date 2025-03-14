# Array methods

| Mutating methods | non-mutating alternative  |
| ---------------- | ------------------------- |
| `copyWithin()`   | -                         |
| `fill()`         | -                         |
| `pop()`          | `slice(0, -1)`            |
| `push()`         | `concat(v1,v2)`           |
| `reverse()`      | `toReversed()`            |
| `shift()`        | `slice(1)`                |
| `sort()`         | `toSorted()`              |
| `splice()`       | `toSpliced()`             |
| `unshift()`      | `toSpliced(0, 0, v1, v2)` |

another non-mutating methods:

- `array.map()`
- `array.filter()`
- `array.reduce()`