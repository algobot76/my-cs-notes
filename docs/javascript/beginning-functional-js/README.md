# Beginning Functional JavaScript

[[TOC]]

## Chapter 1: Functional Programming in Simple Terms

### What is Functional Programming?

- A function must always take an argument.
- A function must always return a value.
- A function should act only on its receiving arguments, not the outside world.
- For a given `X`, there will be only one `Y`.

### Referential Transparency

Referential transparency is a property of functions, which means a function returns the same value for the same input. This property enables a process called substitution model.

```javascript
// substitution model
var identity = (i) => { return i }

sum(4, 5) + identity(1)
sum(4, 5) + 1
```

### Imperative, Declarative, Abstraction

Imperative approach to iterate over an array (less abstracted):

```javascript
var array = [1, 2, 3]
for (i=0;i<array.length;i++)
  console.log(array[i])
```

Declarative approach to iterate over an array (more abstracted):

```javascript
var array = [1, 2, 3]
array.forEach((element) => console.log(element))
```

### Functional Programming Benefits

An example of pure vs impure functions:

```javascript
// impure
var percentValue = 5
var calculateTax = (value) => { return value/100 * (100 + percentValue)}
```

```javascript
// pure
var calculateTax = (value, percentValue) => { return value/100 * (100 + percentValue)}
```

- Pure functions are more testable are they don't depend on the external environment.
- Pure functions are easier to reason about.
- Pure functions allow us to run the code in parallel.
- Pure funcitons are cachable as they always return the same value for the same input.

### Pure Function Is a Mathematical Function

- set of all permitted inputs = domain
- set of permissible outputs = codomain

## Chapter 4: Closures and Higher-Order Functions

### Understanding Closures

A closure is an inner function that remembers its context

- access to its own variables
- access to outer function's variables
- access to global variables

### Real World Examples

#### `tap`

```javascript
const tap = (value) => {
  (fn) => (
    typeof(fn) === 'function' && fn(value),
    console.log(value)
  )
}
```

#### `unary`

```javascript
const unary = (fn) =>
  fn.length === 1
    ? fn
    : (arg) => fn(arg)
```

#### `once`

```javascript
const once = (fn) => {
    let done = false;

    return function() {
        return done ? undefined : ((done = true), fn.apply(this, arguments))
    }
}
```

#### `memoized`

```javascript
const memoized = (fn) => {
    const lookupTable = {};

    return (arg) => lookupTable[arg] || (lookupTable[arg] = fn(arg));
}
```

## Chapter 5: Being Functional on Arrays

### `map`

```javascript
const map = (array, fn) => {
  let results = [];
  for (const value of array)
    results.push(fn(value));
  return results;
}
```

### `filter`

```javascript
const filter = (array, fn) => {
  let results = [];
  for (const value of array)
    (fn(value) ? results.push(value) : undefined)
  return results;
}
```

### `concatAll`

```javascript
const concatAll = (array, fn) => {
  let results = [];
  for (const value of array)
    results.push.apply(results, value);
  return results;
}
```

### `reduce`

```javascript
const reduce = (array, fn, initialValue) => {
  let accumulator;

  if (initialValue != undefined)
    accumulator = initialValue;
  else
    accumulator = array[0];

  if (initialValue === undefined)
    for (let i=1; i<array.length; i++)
      accumulator = fn(accumulator, array[i])
  else
    for (const value of array)
      accumulator - fn(accumulator, value)
  return [accumulator]
}
```

### `zip`

```javascript
const zip = (leftArr, rightArr, fn) => {
  let index, results = [];

  for (index = 0; index < Math.min(leftArr.length, rightArr.lenght); index++)
    results.push(fn(leftArr[index], rightArr[index]));

  return results;
}
```
