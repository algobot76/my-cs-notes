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

### 3.3 Querying and Setting Properties

To get/set the value of a property, use dot(`.`) or square bracket(`[]`) operators:

```javascript
let author = book.author;       // Get the "author" property of the book.
let name = author.surname;      // Get the "surname" property of the author.
let title = book["main title"]; // Get the "main title" property of the book.

book.edition = 7;                   // Create an "edition" property of book.
book["main title"] = "ECMAScript";  // Change the "main title" property.
```

#### 3.3.2 Inheritance

Suppose you query the property `x` in the object `o`:

- If `o` does not have an own property with that name, the property `x` is queried via the prototype chain until `x` is found or `null` prototype is reached.

```javascript
let o = {};               // o inherits object methods from Object.prototype
o.x = 1;                  // and it now has an own property x.
let p = Object.create(o); // p inherits properties from o and Object.prototype
p.y = 2;                  // and has an own property y.
let q = Object.create(p); // q inherits properties from p, o, and...
q.z = 3;                  // ...Object.prototype and has an own property z.
let f = q.toString();     // toString is inherited from Object.prototype
q.x + q.y                 // => 3; x and y are inherited from o and p
```

Suppose you assign to the property `x` of the object `o`:

- If `o` already has an own (noninherited) property named `x`, then the assignment simply changes the value of this existing property. Otherwise, the assignment creates a new property named `x` on the object `o`.
- If `o` previously inherited the property `x`, that inherited property is now hidden by the newly created own property with the same name.
- If `o` inherits a read-only property named `x`, the assignment is not allowed.
- If `o` inherits the property `x`, and that property is an accessor property with a setter method, then that setter method is called (only called on `o` not on the prototype object) rather than creating a new property `x` in `o`.
- Prototype chain is never modified.

#### 3.3.3 Property Access Errors

Attempt to set the property of `null`/`undefiend` raises a `TypeError`.

Attempt to set property `p` of an object `o` fails (and raises a `TypeError` in strict mode) if:

- `o` has an own property `p` that is read-only.
- `o` has an inherited property `p` that is read-only.
- `o` does not have an own property `p`/an inherited property `p` with a setter method, and `o`'s `extensible` attribute is `false`.

### 3.4 Deleting Properties

`delete` removes a own (non-inherited) property. (To delete an inherited property, you must delete it from the prototype object).

```javascript
let o = {x: 1};    // o has own property x and inherits property toString
delete o.x         // => true: deletes property x
delete o.x         // => true: does nothing (x doesn't exist) but true anyway
delete o.toString  // => true: does nothing (toString isn't an own property)
delete 1           // => true: nonsense, but true anyway
```

`delete` cannot remove a property that has `configurable` attribute of `false`. (`TypeError` in strict mode, `false` in non-strict mode).

`delete` a `configurable` property of the global object:

```javascript
this.x = 1;     // Create a configurable global property (no let or var)
delete x;       // And delete it (SyntaxError in strict mode)

delete this.x   // This works in strict mode
```

### 3.5 Testing Properties

`in` operator tests whether an object has the own/inherited property of a specified name:

```javascript
let o = { x: 1 };
"x" in o         // => true: o has an own property "x"
"y" in o         // => false: o doesn't have a property "y"
"toString" in o  // => true: o inherits a toString property
```

`hasOwnProperty()` method tests whether an object has the own property of a specified name:

```javascript
let o = { x: 1 };
o.hasOwnProperty("x")        // => true: o has an own property x
o.hasOwnProperty("y")        // => false: o doesn't have a property y
o.hasOwnProperty("toString") // => false: toString is an inherited property
```

`propertyIsEnumerable()` method tests whether an object has the own property of a specified name and whether it is `enumerable`:

```javascript
let o = { x: 1 };
o.propertyIsEnumerable("x")  // => true: o has an own enumerable property x
o.propertyIsEnumerable("toString")  // => false: not an own property
Object.prototype.propertyIsEnumerable("toString") // => false: not enumerable
```

`!==` can make sure the property is not `undefined`:

```javascript
let o = { x: 1 };
o.x !== undefined        // => true: o has a property x
o.y !== undefined        // => false: o doesn't have a property y
o.toString !== undefined // => true: o inherits a toString property
```

`in` operator can distinguish between a property that does not exist and a property that has a value of `undefined`:

```javascript
let o = { x: undefined };  // Property is explicitly set to undefined
o.x !== undefined          // => false: property exists but is undefined
o.y !== undefined          // => false: property doesn't even exist
"x" in o                   // => true: the property exists
"y" in o                   // => false: the property doesn't exists
delete o.x;                // Delete the property x
"x" in o                   // => false: it doesn't exist anymore
```
