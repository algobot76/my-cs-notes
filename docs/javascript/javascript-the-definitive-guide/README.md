# JavaScript: The Definitive Guide

[[toc]]

## Chapter 5. Objects

### 5.1 Introduction to Objects

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

### 5.2 Creating Objects

#### 5.2.1 Object Literals

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

#### 5.2.2 Creating Objects with `new`

```javascript
let o = new Object();  // Create an empty object: same as {}.
let a = new Array();   // Create an empty array: same as [].
let d = new Date();    // Create a Date object representing the current time
let r = new Map();     // Create a Map object for key/value mapping
```

#### 5.2.3 Prototypes

Every object has a second object "prototype" and the first object inherits properties from the prototype.

Objects created by object literals have the same prototype (`Object.prototype`).

Objects created by `new` inherit from the prototype of the constructor.

- `new Object()` is the same as `{}`

`Object.prototype` has no prototype: no inherited properties.

#### 5.2.4 `Object.create()`

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

### 5.3 Querying and Setting Properties

To get/set the value of a property, use dot(`.`) or square bracket(`[]`) operators:

```javascript
let author = book.author;       // Get the "author" property of the book.
let name = author.surname;      // Get the "surname" property of the author.
let title = book["main title"]; // Get the "main title" property of the book.

book.edition = 7;                   // Create an "edition" property of book.
book["main title"] = "ECMAScript";  // Change the "main title" property.
```

#### 5.3.2 Inheritance

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

#### 5.3.3 Property Access Errors

Attempt to set the property of `null`/`undefiend` raises a `TypeError`.

Attempt to set property `p` of an object `o` fails (and raises a `TypeError` in strict mode) if:

- `o` has an own property `p` that is read-only.
- `o` has an inherited property `p` that is read-only.
- `o` does not have an own property `p`/an inherited property `p` with a setter method, and `o`'s `extensible` attribute is `false`.

### 5.4 Deleting Properties

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

### 5.5 Testing Properties

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

### 5.6 Enumerating Properties

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

#### 5.6.1 Property Enumeration Order

1. String properties whose names are non-negative integers (arrays and array-like objects) in numeric order from smallest to largest.
2. All remaining properties with string names in order in which they were added (or the order they appear in object literals).
3. Properties whose names are Symbols in order they were added.

_Note_: A property will not be enumerated if a property by that same name has already been enumerated, or even if a non-enumerable property by the same name has already been considered.

### 5.7 Extending Objects

`Object.assign()` takes two+ arguments:

- First argument is the target object (modified and returned).
- Other arguments are the source objects (not modified).

The own properties (including those whose names are Symbols) of the source objects are added to/used to override the existing properties of the target object in argument list order:

```javascript
o = Object.assign({}, defaults, o);

o = {...defaults, ...o}; // alternative
```

### 5.8 Serializing Objects

`JSON.stringify()` converts an object to a string which could be restored by `JSON.parse()`:

- Objects, arrays, strings, finite numbers, `true`, `false`, and `null` are supported.
- `NaN`, `Infinity`, `-Infinity` are serialized to `null`.
- Functions, RegExp, Error, and `undefined` cannot be serialized/restored.
- Only `enumerable` own properties can be serialized. Those cannot be serialized are omitted.
- Optional arguments are available for customization.

### 5.9 Object Methods

#### 5.9.1 The `toString()` Method

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

#### 5.9.2 The `toLocaleString()` Method

`toLocaleString()` method returns a localized string representation of the object:

- `Date` and `Number` have customized versions of `toLocaleString()` method.
- `Array`'s  `toLocaleString()` method invokes the `toLocaleString()` method of each object in an array.

#### 5.9.3 The `valueOf()` Method

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

#### 5.9.4 The `toJSON()` Method

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

### 5.10 Extended Object Literal Syntax

#### 5.10.1 Shorthand Properties

```javascript
let x = 1, y = 2;
let o = { x, y };
o.x + o.y  // => 3
```

#### 5.10.2 Computed Property Names

```javascript
const PROPERTY_NAME = "p1";
function computePropertyName() { return "p" + 2; }

let p = {
    [PROPERTY_NAME]: 1,
    [computePropertyName()]: 2
};

p.p1 + p.p2 // => 3
```

#### 5.10.3 Symbols as Property Names

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

#### 5.10.5 Shorthand Methods

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

#### 5.10.6 Property Getters and Setters

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

## Chapter 6. Arrays

### 6.1 Creating Arrays

#### 6.1.1 Array Literals

```javascript
let empty = [];                 // An array with no elements
let primes = [2, 3, 5, 7, 11];  // An array with 5 numeric elements
let misc = [ 1.1, true, "a", ]; // 3 elements of various types + trailing comma
let table = [base, base+1, base+2, base+3];
let b = [[1,{x:1, y:2}], [2, {x:3, y:4}]];
let count = [1,,3]; // Elements at indexes 0 and 2. No element at index 1
let undefs = [,,];  // An array with no elements but a length of 2
```

#### 6.1.2 The Spread Operator

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

#### 6.1.3 The `Array()` Constructor

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

#### 6.1.4 `Array.of()`

```javascript
Array.of()        // => []; returns empty array with no arguments
Array.of(10)      // => [10]; can create arrays with a single numeric argument
Array.of(1,2,3)   // => [1, 2, 3]
```

#### 6.1.5 `Array.from()`

`Array.from(iterable)` creates a copy of an iterable or array-like object, similar to `[...iterable]`.

- Accepts a second argument - a map function to call on every element of the array (more efficient than `map` as the mapping is being performed while the array is being built than it is to build the array and then map it to another array).

### 6.2 Reading and Writing Array Elements

Read/write an element of an array using the `[]` operator.

Array indexes are converted to strings (same for regular objects).

Indexes are property names that are integers between 0 and 2^32-2 (including floating-point numbers e.g. 1.00).

- Negative numbers or non-integers are converted to strings and treated as regular property names.
- `length` is updated as needed so no "out of bound" error.

### 6.3 Sparse Arrays

A sparse array does not have contiguous indexes starting at 0.

- `length` > the number of elements.
- Looking up elements in a sparse array will take as much time as regular object property lookup.
- Omitted elements do not exist.

### 6.4 Array Length

Each array has a `length` property and it has two special behaviors:

- If you assign a value to an array element whose index `i` >= `length`, `length` is set to `i+1`.
- If you set `length` to a non-negative integer `n` < `length`, elements with indexes >= `n` are removed.

### 6.5 Adding and Deleting Array Elements

You can modify an array with the following methods:

- `push()` adds one+ values to the end of an array.
- `unshift()` inserts a value at the beginning of an array and shifts the existing elements to higher indexes.
- `pop()` removes and returns  the last element, reducing `length` by 1.
- `shift()` removes and returns the first element, reducing `length` by 1; shits all elements down to an index one lower than their current index.
- `splice()` is a general purpose method to change an array.

`delete` replaces the element with `undefined`, but does not change `length`.

### 6.6 Iterating Arrays

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

### 6.7 Multidimensional Arrays

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

### 6.8 Array Methods

#### 6.8.1 Array Iterator Methods

##### FOREACH()

`forEach()` method iterates through an array, invoking a given function for each element:

- No way to terminate before all elements have been passed.

```javascript
let data = [1,2,3,4,5], sum = 0;
// Compute the sum of the elements of the array
data.forEach(value => { sum += value; });          // sum == 15

// Now increment each array element
data.forEach(function(v, i, a) { a[i] = v + 1; }); // data == [2,3,4,5,6]
```

##### MAP()

`map()` method passes each element on which it is invoked to a given function, and returns an array containing the values returned by the function.

- Does not modify the original array.

```javascript
let a = [1, 2, 3];
a.map(x => x*x)    // => [1, 4, 9]
```

##### FILTER()

`filter()` method returns a subset of an array given a predicate.

```javascript
a = [5, 4, 3, 2, 1];
a.filter(x => x < 3)        // => [2, 1]; values less than 3
a.filter((x,i) => i%2 == 0) // => [5, 3, 1]; every other value
```

Close gaps in a sparse array:

```javascript
let dense = sparse.filter(() => true);
```

Close gaps and remove `undefined`/`null`:

```javascript
a = a.filter(x => x !== undefined && x !== null);
```

##### FIND() & FINDINDEX()

`find()`/`findIndx()` returns a matching element or the index of a matching element for a given predicate:

- Returns `undefined`/-1 if no matching element is found.

```javascript
a = [1,2,3,4,5];
a.findIndex(x => x == 3)  // => 2; the value 3 appears at index 2
a.findIndex(x => x < 0)   // => -1; no negative numbers in the array
a.find(x => x % 5 == 0)   // => 5: this is a multiple of 5
a.find(x => x % 7 == 0)   // => undefined: no multiples of 7 in the array
```

##### EVERY() & SOME()

`every()`/`some()` apply a predicate to an array, and then returns `true`/`false`:

- `every()` applies the predicate to every element of the array. It returns `true` if and only if the predicate returns `true` for all elements.
- `some()` returns `true` if there exists at least one element for which the predicate returns `true`, returns `false` if and only if the predicate returns `false` for all elements.

```javascript
a = [1,2,3,4,5];
a.every(x => x < 10)      // => true: all values are < 10.
a.every(x => x % 2 === 0) // => false: not all values are even.

a = [1,2,3,4,5];
a.some(x => x%2===0)  // => true; a has some even numbers.
a.some(isNaN)         // => false; a has no non-numbers.
```

##### REDUCE() & REDUCERIGHT()

`reduce()`/`reduceRight()` combines the elements of an array with a your function to produce a single value:

- `reduce()` uses the first element as the initial value if no initial value argument is given. It raises `TypeError` if the array is empty and the initial value is not given.
- `reduceRight()` processes the array from highest index to lowest index.

```javascript
let a = [1,2,3,4,5]
a.reduce((x,y) => x+y, 0)          // => 15; the sum of the values
a.reduce((x,y) => x*y, 1)          // => 120; the product of the values
a.reduce((x,y) => (x > y) ? x : y) // => 5; the largest of the values

// Compute 2^(3^4).  Exponentiation has right-to-left precedence
let a = [2, 3, 4]
a.reduceRight((acc,val) => Math.pow(val,acc)) // => 2.4178516392292583e+24
```

#### 6.8.2 Adding arrays with `concat()`

The `concat()` method returns a new array that contains the elements from the original array followed by each of the arguments to `concat()`:

```javascript
let a = [1,2,3];
a.concat(4, 5)          // => [1,2,3,4,5]
a.concat([4,5],[6,7])   // => [1,2,3,4,5,6,7]; arrays are flattened
a.concat(4, [5,[6,7]])  // => [1,2,3,4,5,[6,7]]; but not nested arrays
a                       // => [1,2,3]; the original array is unmodified
```

#### 6.8.3 Stacks and Queues with `push()`, `pop()`, `shift()` and `unshift()`

```javascript
let stack = [];       // stack == []
stack.push(1,2);      // stack == [1,2];
stack.pop();          // stack == [1]; returns 2
stack.push(3);        // stack == [1,3]
stack.pop();          // stack == [1]; returns 3
stack.push([4,5]);    // stack == [1,[4,5]]
stack.pop()           // stack == [1]; returns [4,5]
stack.pop();          // stack == []; returns 1
```

- Use `push(...values)` to flatten an array.

```javascript
let q = [];            // q == []
q.push(1,2);           // q == [1,2]
q.shift();             // q == [2]; returns 1
q.push(3)              // q == [2, 3]
q.shift()              // q == [3]; returns 2
q.shift()              // q == []; returns 3
```

_Note_: `unshift()` inserts all elements at once:

```javascript
let a = [];            // a == []
a.unshift(1)           // a == [1]
a.unshift(2)           // a == [2, 1]
a = [];                // a == []
a.unshift(1,2)         // a == [1, 2]
```

#### 6.8.4 Subarrays with `slice()`, `splice()`, `fill()` and `copyWithin()`

##### SLICE()

`slice()` returns a subarray of a specified array:

- two arguments => start and end
- one argument => start only
- negative values for arguments => relative offsets from the last element

```javascript
let a = [1,2,3,4,5];
a.slice(0,3);    // Returns [1,2,3]
a.slice(3);      // Returns [4,5]
a.slice(1,-1);   // Returns [2,3,4]
a.slice(-3,-2);  // Returns [3]
```

##### SPLICE()

`splice()` is a general-purpose method for inserting or removing elements from an array:

- first argument => start index
- second argument => number of elements to be deleted (default: all elements from the start index)
- other arugments => elements to be inserted

```javascript
let a = [1,2,3,4,5,6,7,8];
a.splice(4)    // => [5,6,7,8]; a is now [1,2,3,4]
a.splice(1,2)  // => [2,3]; a is now [1,4]
a.splice(1,1)  // => [4]; a is now [1]

let a = [1,2,3,4,5];
a.splice(2,0,'a','b')  // => []; a is now [1,2,'a','b',3,4,5]
a.splice(2,2,[1,2],3)  // => ['a','b']; a is now [1,2,[1,2],3,3,4,5]
```

##### FILL()

`fill()` sets the elements of an array/slice of an array to a specific value in place, and returns the modified array:

- first argument => value to set elements to
- second argument => start index (default: 0)
- third argument => end index (default: `length`)

```javascript
let a = new Array(5);   // Start with no elements and length 5
a.fill(0)               // => [0,0,0,0,0]; fill the array with zeros
a.fill(9, 1)            // => [0,9,9,9,9]; fill with 9 starting at index 1
a.fill(8, 2, -1)        // => [0,9,8,8,9]; fill with 8 at indexes 2, 3
```

##### COPYWITHIN()

`copyWithin()` copies a slice of an array to a new position within the array in place, and returns the modified array, without changing the length:

- first argument => destination index
- second argument => index of the first element to be copied (default: 0)
- third argument => end of the slice of the elements to be copied (default: `length`)

```javascript
let a = [1,2,3,4,5]
a.copyWithin(1)       // => [1,1,2,3,4]: copy array elements up one
a.copyWithin(2, 3, 5) // => [1,1,3,4,4]: copy last 2 elements to index 2
a.copyWithin(0, -2)   // => [4,4,3,4,4]: negative offsets work, too
```

#### 6.8.5 Array Searching and Sorting Methods

##### INDEXOF() &LASTINDEXOF()

`index()`/`lastIndexOf()` returns the index of a specified element in an array. Returns -1 if not found:

- `index`() searches the array from the beginning to end; `lastIndexOf()` searches the array from end to beginning.
- They take a second optional argument to specify the start index. Negative values are treated as the offsets from the end.

```javascript
a = [0,1,2,1,0];
a.indexOf(1)       // => 1: a[1] is 1
a.lastIndexOf(1)   // => 3: a[3] is 1
a.indexOf(3)       // => -1: no element has value 3
```

##### INCLUDES()

`includes()` takes a single argument and returns `true` if the array contains that value or `false` otherwise:

- `indexOf()` cannot detect `NaN` but `includes()` can.

```javascript
let a = [1,true,3,NaN];
a.includes(true)            // => true
a.includes(2)               // => false
a.includes(NaN)             // => true
a.indexOf(NaN)              // => -1; indexOf can't find NaN
```

##### SORT()

`sort()` sorts an array in place and returns the sorted array:

- Alphabetical order by default (temporarily converting non-string elements to strings).
- Undefined elements sorted to the end.
- A comparison function is needed to control sort order.

```javascript
let a = ["banana", "cherry", "apple"];
a.sort(); // a == ["apple", "banana", "cherry"]

let a = [33, 4, 1111, 222];
a.sort();                 // a == [1111, 222, 33, 4]; alphabetical order
a.sort(function(a,b) {    // Pass a comparator function
           return a-b;    // Returns < 0, 0, or > 0, depending on order
       });                // a == [4, 33, 222, 1111]; numerical order
a.sort((a,b) => b-a);     // a == [1111, 222, 33, 4]; reverse numerical order
```

##### REVERSE()

`reverse()` reverses an array in place and returns the reversed array:

```javascript
let a = [1,2,3];
a.reverse();   // a == [3,2,1]
```

#### 6.8.6 Array to String Conversions

`join()` converts all elements to strings and concatenates them, returning the result string:

```javascript
let a = [1, 2, 3];
a.join()               // => "1,2,3"
a.join(" ")            // => "1 2 3"
a.join("")             // => "123"
let b = new Array(10)  // An array of length 10 with no elements
b.join('-')            // => '---------': a string of 9 hyphens
```

#### 6.8.7 Static Array Functions

`Array.isArray()` check if a value is an array:

```javascript
Array.isArray([])     // => true
Array.isArray({})     // => false
```

### 6.9 Array-Like Objects

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

### 6.10 Strings as Arrays

Strings behave like read-only arrays of UTF-16 Unicode characters:

Can invoke array methods using `Function.call`.

## Chapter 7. Functions

### 7.1 Defining Functions

#### 7.1.1 Function Declarations

Examples of function declarations:

```javascript
// Print the name and value of each property of o.  Return undefined.
function printprops(o) {
    for(let p in o)
        console.log(p + ": " + o[p] + "\n");
}

// Compute the distance between Cartesian points (x1,y1) and (x2,y2).
function distance(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy);
}

// A recursive function (one that calls itself) that computes factorials
// Recall that x! is the product of x and all positive integers less than it.
function factorial(x) {
    if (x <= 1) return 1;
    return x * factorial(x-1);
}
```

- Prior to ES6, function declarations were only allowed at the top-level within a JS file/within another function (not legal in body of loops, conditionals or other blocks).
- In the strict mode of ES6, function declarations are allowed within blocks (not visible outside).

#### 7.1.2 Function Expressions

Examples of function expressions:

```javascript
// This function expression defines a function that squares its argument.
// Note that we assign it to a variable
const square = function(x) { return x*x; }

// Function expressions can include names, which is useful for recursion.
const f = function fact(x) { if (x <= 1) return 1; else return x*fact(x-1); };

// Function expressions can also be used as arguments to other functions:
[3,2,1].sort(function(a,b) { return a-b; });

// Function expressions are sometimes defined and immediately invoked:
let tensquared = (function(x) {return x*x;}(10));
```

Function declaration vs. function expression:

- Function declaration declares a variable and assigns a function object to it.
- Function expression does not declare a variable: you can assign the newly-defined function object to a constant or variable.
- In the declaration form, function objects are created before code runs (functions are hoisted).
- In the expression form, a function does not exist until its expression is evaluated; before it is invoked, you must be able to refer to it.

#### 7.1.3 Arrow Functions

Examples of arrow functions:

```javascript
const sum = (x, y) => x + y;
const constant_func = () => 42;

const f = x => { return { value: x }; };  // Good: f() returns an object
const g = x => ({ value: x });            // Good: g() returns an object
const h = x => { value: x };              // Bad: h() returns nothing
const i = x => { v: x, w: x };            // Bad: Syntax Error
```

- Arrow functions inherit the value of `this` from the environment in which they are defined.
- Arrow functions do not have `prototype` property (cannot be used as constructor functions for new classes).

#### 7.1.4 Nested Functions

```javascript
function hypotenuse(a, b) {
    function square(x) { return x*x; }
    return Math.sqrt(square(a) + square(b));
}
```

### 7.2 Invoking Functions

JS functions can be invoked in 5 ways:

- as functions
- as methods
- as constructors
- indirectly through their `call()` and `apply()` methods
- implicitly, via JS language features that do not appear like normal function invocations

#### 7.2.1 Function Invocation

Examples of function invocation:

```javascript
printprops({x:1});
let total = distance(0,0,2,1) + distance(2,1,3,5);
let probability = factorial(5)/factorial(13);
```

- Each argument expression is evaluated, and the resulting values become the arguments to the function.
- For regular function invocation, the return value becomes the value of the invocation expression.
- If the interpreter reaches the end, the return value is `undefined`.
- If the interpreter executes a `return`, the return value is the value after the `return` or `undefined` if `return` has not value.
- In nonstrict mode, the invocation context (the `this` value) is the global object.
- In strict mode, the invocation context is `undefined`.
- Arrow functions always inherit the `this` value that is in effect where they are defined.

```javascript
// Define and invoke a function to determine if we're in strict mode.
const strict = (function() { return !this; }());
```

_Note_: Most browsers and Node do not support tail optimization.
