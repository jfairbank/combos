# combos

[![Travis branch](https://img.shields.io/travis/jfairbank/combos/master.svg?style=flat-square)](https://travis-ci.org/jfairbank/combos)
[![npm](https://img.shields.io/npm/v/combos.svg?style=flat-square)](https://www.npmjs.com/package/combos)

Generate all possible permutations of an object's key-value pairs. Combos
takes all the possible values an object's keys can have and creates all possible
combinations of those values for each key.

This is perfect for reducing duplication in tests when multiple versions of
an object should produce the same test results. This could be especially useful
with React components and nontrivial prop combinations.

## Install

    $ npm install combos

## Usage

Import/require the `combos` function and provide it with an object. The keys of
the object are the keys you desire to have in your final objects. The values are
an array, containing all possible values that given key can have. The return
value is an array containing every version of the object with all possible
combinations of the values.

A simple example helps explain:

```js
// Simple example
// ES2015
import combos from 'combos';

// ES5
const combos = require('combos');

// Given an object shape of
// {
//   greeting: string,
//   name: string,
// }

// Generate all possible combinations.
// (Note: you don't have to restrict each
// array of values to all have the same type.)
const permutations = combos({
  greeting: ['Hello', 'Hi'],
  name: ['Jeremy', 'Jet'],
});

// 'greeting' has 2 possible values
// 'name' has 2 possible values
// Therefore, the final array will have 2*2 = 4 possible objects.

// Output with 4 different objects:
// =================================
// [ { greeting: 'Hello', name: 'Jeremy' },
//   { greeting: 'Hi',    name: 'Jeremy' },
//   { greeting: 'Hello', name: 'Jet'    },
//   { greeting: 'Hi',    name: 'Jet'    } ]
```

More complex example:

```js
import combos from 'combos';

const permutations = combos({
  greeting: ['Hello', 'Hi'],
  isChecked: [true, false],
  flag: [1, 2, 4],
});

// 'greeting' has 2 possible values
// 'isChecked' has 2 possible values
// 'flag' has 3 possible values
// Therefore, the final array will have 2*2*3 = 12 possible objects.

// Output with 12 different objects:
// =================================
// [ { greeting: 'Hello', isChecked: true,  flag: 1 },
//   { greeting: 'Hi',    isChecked: true,  flag: 1 },
//   { greeting: 'Hello', isChecked: false, flag: 1 },
//   { greeting: 'Hi',    isChecked: false, flag: 1 },
//   { greeting: 'Hello', isChecked: true,  flag: 2 },
//   { greeting: 'Hi',    isChecked: true,  flag: 2 },
//   { greeting: 'Hello', isChecked: false, flag: 2 },
//   { greeting: 'Hi',    isChecked: false, flag: 2 },
//   { greeting: 'Hello', isChecked: true,  flag: 4 },
//   { greeting: 'Hi',    isChecked: true,  flag: 4 },
//   { greeting: 'Hello', isChecked: false, flag: 4 },
//   { greeting: 'Hi',    isChecked: false, flag: 4 } ]
```

Keeping a value constant:

```js
import combos from 'combos';

const permutations = combos({
  greeting: ['Hello', 'Hi'],
  name: ['Jeremy'],
});

// 'greeting' has 2 possible values
// 'name' has 1 possible value
// Therefore, the final array will have 2*1 = 2 possible objects.

// Output with 2 different objects:
// =================================
// [ { greeting: 'Hello', name: 'Jeremy' },
//   { greeting: 'Hi',    name: 'Jeremy' } ]
```
