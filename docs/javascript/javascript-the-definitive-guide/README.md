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
