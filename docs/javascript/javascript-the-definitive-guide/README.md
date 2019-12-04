# JavaScript: The Definitive Guide

[[toc]]

## Chapter 3. Objects

### 3.1 Introduction to Objects

An object is an unordered collection of properties.

An object can inherit properties from a "prototype" object, e.g. methods.

A value that is not a string, a number, `true`, `false`, `null`, or `undefined` is an object.

An object is mutable and manipulated by reference.

A property has a name and a value:

- Name can be any string (even the empty string).
- No duplicate names.
- An object has its own properties (properties defined directly on the object) and those inherited from a prototype object.

Each property has three property attributes:

- `writable`: whether the value of the property can be set.
- `enumerable`: whether the property name is returned by a `for/in` loop.
- `configurable`: whether the property can be deleted or its attributes can be altered.

### 3.2 Creating Objects

#### 3.2.1 Object Literals

```javascript
let empty = {};                           // An object with no properties
let point = { x: 0, y: 0 };               // Two properties
let p2 = { x: point.x, y: point.y+1 };    // More complex values
let book = {
    "main title": "JavaScript",           // Property names include spaces,
    "sub-title": "The Definitive Guide",  // and hyphens, so use string literals
    for: "all audiences",                 // for is reserved, but no quotes
    author: {                             // The value of this property is
        firstname: "David",               // itself an object.
        surname: "Flanagan"
    }
};
```

#### 3.2.2 Creating Objects with `new`

```javascript
let o = new Object();  // Create an empty object: same as {}.
let a = new Array();   // Create an empty array: same as [].
let d = new Date();    // Create a Date object representing the current time
let r = new Map();     // Create a Map object for key/value mapping
```

#### 3.2.3 Prototypes

Every object has a second object "prototype" and the first object inherits properties from the prototype.

Objects created by object literals have the same prototype (`Object.prototype`).

Objects created by `new` inherit from the prototype of the constructor.

- `new Object()` is the same as `{}`

`Object.prototype` has no prototype: no inherited properties.

#### 3.2.4 `Object.create()`

```javascript
let o1 = Object.create({x: 1, y: 2});     // o1 inherits properties x and y.
o1.x + o1.y  // => 3

let o2 = Object.create(null);             // o2 inherits no props or methods.

let o3 = Object.create(Object.prototype); // o3 is like {} or new Object().
```

`Object.create()` can be used to guard against unintended (but non-malicious) modification of an object by a library function that you don't have control over:

```javascript
let o = { x: "don't change this value" };
library.function(Object.create(o));  // Guard against accidental modifications
```
