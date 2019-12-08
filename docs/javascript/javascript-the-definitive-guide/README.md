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

### 3.6 Enumerating Properties

`for/in` loop iterates over `enumerable` properties (own/inherited). To guard against enumerating inherited properties, add an explicit check:

```javascript
for(let p in o) {
    if (!o.hasOwnProperty(p)) continue;       // Skip inherited properties
}

for(let p in o) {
    if (typeof o[p] === "function") continue; // Skip all methods
}
```

Alternatives:

- `Object.keys()` returns an array of the names of the `enumerable` own properties (NO non-enumerable, inherited, or properties whose names are Symbols).
- `Object.getOwnPropertyNames()` returns an array of the names of all own properties as well, as long as their names are strings.
- `Object.getOwnPropertySymbols()` returns own properties whose names are Symbols (both `enumerable` and non-`enumerable`).
- `Reflect.ownKeys()` returns all own property (both `enumerable` and non-`enumerable`) names (both strings and Symbols).

#### 3.6.1 Property Enumeration Order

1. String properties whose names are non-negative integers (arrays and array-like objects) in numeric order from smallest to largest.
2. All remaining properties with string names in order in which they were added (or the order they appear in object literals).
3. Properties whose names are Symbols in order they were added.

_Note_: A property will not be enumerated if a property by that same name has already been enumerated, or even if a non-enumerable property by the same name has already been considered.

### 3.7 Extending Objects

`Object.assign()` takes two+ arguments:

- First argument is the target object (modified and returned).
- Other arguments are the source objects (not modified).

The own properties (including those whose names are Symbols) of the source objects are added to/used to override the existing properties of the target object in argument list order:

```javascript
o = Object.assign({}, defaults, o);

o = {...defaults, ...o}; // alternative
```

### 3.8 Serializing Objects

`JSON.stringify()` converts an object to a string which could be restored by `JSON.parse()`:

- Objects, arrays, strings, finite numbers, `true`, `false`, and `null` are supported.
- `NaN`, `Infinity`, `-Infinity` are serialized to `null`.
- Functions, RegExp, Error, and `undefined` cannot be serialized/restored.
- Only `enumerable` own properties can be serialized. Those cannot be serialized are omitted.
- Optional arguments are available for customization.

### 3.9 Object Methods

#### 3.9.1 The `toString()` Method

`toString()` methods takes no arguments and returns a string that represents the value of the object on which it is invoked.

```javascript
let s = { x: 1, y: 1 }.toString();  // s == "[object Object]"

let point = {
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; }
};
String(point)    // => "(1, 2)": toString() is used for string conversions
```

#### 3.9.2 The `toLocaleString()` Method

`toLocaleString()` method returns a localized string representation of the object:

- `Date` and `Number` have customized versions of `toLocaleString()` method.
- `Array`'s  `toLocaleString()` method invokes the `toLocaleString()` method of each object in an array.

#### 3.9.3 The `valueOf()` Method

`valueOf()` method is called when an object needs to be converted to a primitive type rather than a string.

```javascript
let point = {
    x: 3,
    y: 4,
    valueOf: function() { return Math.hypot(this.x, this.y); }
};
Number(point)  // => 5: valueOf() is used for conversions to numbers
point > 4      // => true
point > 5      // => false
point < 6      // => true
```

#### 3.9.4 The `toJSON()` Method

`toJSON()` method returns a serializable string representation of an object, which is invoked by `JSON.stringify()`.

- `Object.prototype` does not define a `toJSON()` method.

```javascript
let point = {
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; },
    toJSON: function() { return this.toString(); }
};
JSON.stringify([point])   // => '["(1, 2)"]'
```

### 3.10 Extended Object Literal Syntax

#### 3.10.1 Shorthand Properties

```javascript
let x = 1, y = 2;
let o = { x, y };
o.x + o.y  // => 3
```

#### 3.10.2 Computed Property Names

```javascript
const PROPERTY_NAME = "p1";
function computePropertyName() { return "p" + 2; }

let p = {
    [PROPERTY_NAME]: 1,
    [computePropertyName()]: 2
};

p.p1 + p.p2 // => 3
```

#### 3.10.3 Symbols as Property Names

```javascript
const extension = Symbol("my extension symbol");
let o = {
    [extension]: { /* extension data stored in this object */ }
};
o[extension].x = 0; // This won't conflict with other properties of o
```

- Every Symbol is different, so they are good for making unique property names (used to define safe extension mechanism for objects).
- Symbol is a primitive value and the argument in `Symbol()` is a string used for debugging only.

#### 3.10.4 Spread Operator

```javascript
let position = { x: 0, y: 0 };
let dimensions = { width: 100, height: 75 };
let rect = { ...position, ...dimensions };
rect.x + rect.y + rect.width + rect.height // => 175

let o = { x: 1 };
let p = { x: 0, ...o };
p.x   // => 1: the value from object o overrides the initial value
let q = { ...o, x: 2 };
q.x   // => 2: the value 2 overrides the previous value from o.
```

_Note_:

- The spread operator only spreads the own properties of an object.
- If an object has `n` properties, the spreading process is an `O(n)` operation.

#### 3.10.5 Shorthand Methods

```javascript
let square = {
    area() { return this.side * this.side; },
    side: 10
};
square.area() // => 100

const METHOD_NAME = "m";
const symbol = Symbol();
let weirdMethods = {
    "method With Spaces"(x) { return x + 1; },
    [METHOD_NAME](x) { return x + 2; },
    [symbol](x) { return x + 3; }
};
weirdMethods["method With Spaces"](1)  // => 2
weirdMethods[METHOD_NAME](1)           // => 3
weirdMethods[symbol](1)                // => 4
```

#### 3.10.6 Property Getters and Setters

Accessor properties are defined by getters and setters:

- Different from data properties that only hold a simple value.
- No `writable` attribute.
- getter + setter => read/write property
- getter only => read-only property
- setter only => write-only property
- Getter and setter have the same name.

```javascript
let o = {
    // An ordinary data property
    dataProp: value,

    // An accessor property defined as a pair of functions
    get accessorProp() { return this.dataProp; },
    set accessorProp(value) { this.dataProp = value; }
};
```

## Chapter 4. Arrays

### 4.1 Creating Arrays

#### 4.1.1 Array Literals

```javascript
let empty = [];                 // An array with no elements
let primes = [2, 3, 5, 7, 11];  // An array with 5 numeric elements
let misc = [ 1.1, true, "a", ]; // 3 elements of various types + trailing comma
let table = [base, base+1, base+2, base+3];
let b = [[1,{x:1, y:2}], [2, {x:3, y:4}]];
let count = [1,,3]; // Elements at indexes 0 and 2. No element at index 1
let undefs = [,,];  // An array with no elements but a length of 2
```

#### 4.1.2 The Spread Operator

```javascript
let a = [1, 2, 3];
let b = [0, ...a, 4];  // b == [0, 1, 2, 3, 4]
let digits = [..."0123456789ABCDEF"];
// digits == ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
```

The spread operator can be used to create a shallow copy of an array:

```javascript
let original = [1,2,3];
let copy = [...original];
copy[0] = 0;  // Modifying the copy does not change the original
original[0]   // => 1
```

#### 4.1.3 The `Array()` Constructor

`Array()` constructor can be used to create an array.

- no arguments => empty array (same as `[]`)

```javascript
let a = new Array();
```

- a single numeric argument => empty array with the specified length
  - No values/indexes stored in the array.

```javascript
let a = new Array(10);
```

- two are more arguments => arguments become the elements of the created array

```javascript
let a = new Array(5, 4, 3, 2, 1, "testing, testing");
```

#### 4.1.4 `Array.of()`

```javascript
Array.of()        // => []; returns empty array with no arguments
Array.of(10)      // => [10]; can create arrays with a single numeric argument
Array.of(1,2,3)   // => [1, 2, 3]
```

#### 4.1.5 `Array.from()`

`Array.from(iterable)` creates a copy of an iterable or array-like object, similar to `[...iterable]`.

- Accepts a second argument - a map function to call on every element of the array (more efficient than `map` as the mapping is being performed while the array is being built than it is to build the array and then map it to another array).

### 4.2 Reading and Writing Array Elements

Read/write an element of an array using the `[]` operator.

Array indexes are converted to strings (same for regular objects).

Indexes are property names that are integers between 0 and 2^32-2 (including floating-point numbers e.g. 1.00).

- Negative numbers or non-integers are converted to strings and treated as regular property names.
- `length` is updated as needed so no "out of bound" error.

### 4.3 Sparse Arrays

A sparse array does not have contiguous indexes starting at 0.

- `length` > the number of elements.
- Looking up elements in a sparse array will take as much time as regular object property lookup.
- Omitted elements do not exist.

### 4.4 Array Length

Each array has a `length` property and it has two special behaviors:

- If you assign a value to an array element whose index `i` >= `length`, `length` is set to `i+1`.
- If you set `length` to a non-negative integer `n` < `length`, elements with indexes >= `n` are removed.

### 4.5 Adding and Deleting Array Elements

You can modify an array with the following methods:

- `push()` adds one+ values to the end of an array.
- `unshift()` inserts a value at the beginning of an array and shifts the existing elements to higher indexes.
- `pop()` removes and returns  the last element, reducing `length` by 1.
- `shift()` removes and returns the first element, reducing `length` by 1; shits all elements down to an index one lower than their current index.
- `splice()` is a general purpose method to change an array.

`delete` replaces the element with `undefined`, but does not change `length`.

### 4.6 Iterating Arrays

`for/of` loop:

```javascript
let letters = [..."Hello world"];  // An array of characters for testing
let string = ""
for(let letter of letters) {
    string += letter
}
string  // => "Hello world"; we reassembled the original text

let everyother = ""
for(let [index, letter] of letters.entries()) {
    if (index % 2 == 0) everyother += letter;  // letters at even indexes
}
everyother  // => "Hlowrd"
```

`forEach()`:

- Aware of sparse arrays and does not invoke your function for non-existent elements.

```javascript
let uppercase = ""
letters.forEach(letter => {  // Note arrow function syntax here
    uppercase += letter.toUpperCase();
});
uppercase  // => "HELLO WORLD"
```

`for` loop:

- Should test the array elements before using them.

```javascript
// Save the array length into a local variable
for(let i = 0, len = letters.length; i < len; i++) {
   // loop body remains the same
}

// Iterate backwards from the end of the array to the start
for(let i = letters.length-1; i >= 0; i--) {
   // loop body remains the same
}
```

### 4.7 Multidimensional Arrays

```javascript
// Create a multidimensional array
let table = new Array(10);               // 10 rows of the table
for(let i = 0; i < table.length; i++)
    table[i] = new Array(10);            // Each row has 10 columns

// Initialize the array
for(let row = 0; row < table.length; row++) {
    for(col = 0; col < table[row].length; col++) {
        table[row][col] = row*col;
    }
}

// Use the multidimensional array to compute 5*7
table[5][7]  // => 35
```

### 4.9 Array-Like Objects

You can iterate an array-like object like an array:

```javascript
let a = {};  // Start with a regular empty object

// Add properties to make it "array-like"
let i = 0;
while(i < 10) {
    a[i] = i * i;
    i++;
}
a.length = i;

// Now iterate through it as if it were a real array
let total = 0;
for(let j = 0; j < a.length; j++)
    total += a[j];
```

Check if an object is array-like:

```javascript
// Determine if o is an array-like object.
// Strings and functions have numeric length properties, but are
// excluded by the typeof test. In client-side JavaScript, DOM text
// nodes have a numeric length property, and may need to be excluded
// with an additional o.nodeType != 3 test.
function isArrayLike(o) {
    if (o &&                                // o is not null, undefined, etc.
        typeof o === "object" &&            // o is an object
        isFinite(o.length) &&               // o.length is a finite number
        o.length >= 0 &&                    // o.length is non-negative
        o.length===Math.floor(o.length) &&  // o.length is an integer
        o.length < 4294967295) {            // o.length < 2^32 - 1
        return true;                        // Then o is array-like
    } else {
        return false;                       // Otherwise it is not
    }
}
```

Indirectly invoke array functions using `Function.call`.

```javascript
let a = {"0":"a", "1":"b", "2":"c", length:3};     // An array-like object
Array.prototype.join.call(a, "+")  // => "a+b+c"
Array.prototype.map.call(a, x => x.toUpperCase())  // => ["A","B","C"]
Array.prototype.slice.call(a, 0)   // => ["a","b","c"]: true array copy
```
