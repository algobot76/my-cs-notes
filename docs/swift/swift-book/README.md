# The Swift Programming Language

[[toc]]

## The Basics

### Constants and Variables

#### Declaring Constants and Variables

A constant is declared with `let`; a variable is declared with `var`.

```swift
let maximumNumberOfLoginAttempts = 10
var currentLoginAttempt = 0
```

#### Type Annotations

A type annotation is placed after a constant/variable.

```swift
var welcomeMessage: String
```

#### Naming Constants and Variables

Constant/variable names can be any character except that:

- whitespaces, math symbols, arrows, private-use Unicode scalar values, or line- and box-drawing characters
- First character cannot be a number.
- Surround a reserved Swift keyword with ` if you want to use it as a constant/variable.
- The value of a variable can be changed with another value of a compatible type; The value of a constant cannot be changed after it's set.
- A constant/variable cannot be declared with the same name again.

#### Printing Constants and Values

```swift
print(friendlyWelcome)
// Prints "Bonjour!"
```

### Comments

```swift
// This is a comment.
```

```swift
/* This is also a comment
but is written over multiple lines. */
```

```swift
/* This is the start of the first multiline comment.
 /* This is the second, nested multiline comment. */
This is the end of the first multiline comment. */
```

### Semicolons

Swift does not require a `;`, but it is needed to separate two statements on the same line.

### Integers

#### Integer Bounds

Use `min`/`max` to find the minimum/maximum values of an integer type.

```swift
let minValue = UInt8.min // minValue is equal to 0, and is of type UInt8
let maxValue = UInt8.max // maxValue is equal to 255, and is of type UInt8
```

#### Int

`Int` has the same size as the current systems's native word size.

- 32-bit system -> `Int32`
- 64-bit system -> `Int64`

#### UInt

`UInt` (unsigned) has the same size as the current systems's native word size.

- 32-bit system -> `UInt32`
- 64-bit system -> `UInt64`

### Floating-Point Numbers

Floating-point types represent a much wider range of values than integer types.

- `Double` -> 64-bit floating-point number (at least 15 decimal digits)
- `Float` -> 32-bit floating-point number (6 decimal digits)

### Type Safety and Type Inference

Type-checking performs type checks when compiling code and lags any mismatched types as errors.

Type inference enables a compiler to deduce the type of a particular expression automatically when it compiles your code, simply by examining the values you provide.

### Numeric Literals

- decimal -> no prefix
- binary -> `0b` prefix
- octal -> `0o` prefix
- hexadecimal -> `0x` prefix

`exp` in decimal:

- `1.25e2` means `1.25*10^2` or `125.0`.
- `1.25e-2` means `1.25*10^(-2)` or `0.0125`.

`exp` in hexadecimal:

- `0xFp2` means `15*2^2` or `60.0`.
- `0xFp-2` means `15*2^(-2)` or `3.75`.

Numeric literals have extra formatting to make them easier to read.

```swift
let paddedDouble = 000123.456
let oneMillion = 1_000_000
let justOverOneMillion = 1_000_000.000_000_1
```
