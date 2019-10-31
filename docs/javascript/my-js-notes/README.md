# My JS Notes

## `== null`

`==` does type coercion to try to get the values on both sides to match. `a == null` returns `true` if `a` is `null` or `undefined`.

Links:

- [JavaScript checking for null vs. undefined and difference between == and ===
](https://stackoverflow.com/questions/5101948/javascript-checking-for-null-vs-undefined-and-difference-between-and)

## `void 0`

`void 0` returns `undefined`. `void 0` and `undefined` are the same, exact for older browsers, where `undefined` can be redefined.

```javascript
console.log(undefined);
var undefined = 1;
console.log(undefined); // => 1
```

For better compatibility, use `void 0`.

Links:

- [void operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void)
- [Should I use `void 0` or `undefined` in JavaScript [duplicate]](https://stackoverflow.com/questions/19369023/should-i-use-void-0-or-undefined-in-javascript)

## Falsy values

In JavaScript, `false`, `null`, `0`, `""`, `undefined`, `NaN` are falsy.

## Check if a coll
ection should be iterated as array/object

```javascript
const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
const isArrayLike = collection =>{
  let length;
  if (!collection.hasOwnProperty('length')) {
    return false;
  } else {
    length = collection.length;
  }
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
}
```

_Note_: This snippet is derived from a helper function called `isArrayLike` in [Underscore.js](https://underscorejs.org/).
