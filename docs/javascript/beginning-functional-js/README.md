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
