## v0.2.0

#### `combos.UNDEF`

Include `combos.UNDEF` in an array of values to make the value optional.

```js
import combos from 'combos';

const permutations = combos({
  greeting: ['Hello', 'Hi'],
  name: ['Jeremy', combos.UNDEF],
});

// 'greeting' has 2 possible values
// 'name' has 2 possible values where one state is being absent
// Therefore, the final array will have 2*2 = 4 possible objects.

// Output with 4 different objects:
// =================================
// [ { greeting: 'Hello', name: 'Jeremy' },
//   { greeting: 'Hi',    name: 'Jeremy' },
//   { greeting: 'Hello'                 },
//   { greeting: 'Hi'                    } ]
```

## v0.1.0

### Initial Release
