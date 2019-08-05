# A Tour of Go

## Basics

### Packages, variables, and functions

#### Packages

- Every Go program is made up of packages, e.g. `fmt`.
- Program start running in the `main` package.

#### Imports

```go
import (
  "fmt"
  "math"
)
```

#### Exported Names

- An exported name starts with a capital letter.
- Unexported names cannot be accessed outside the package.

#### Functions

- A function takes zero or more arguments.
- A function can return any number of results.
- A type comes after a variable name.

#### Variables

- A variable is defined by using the keyword `var`. e,g, `var java bool`.
- A variable can be defined with an initializer.
  ```go
  var java = true
  ```
- Also, you can use the `:=` operator instead.
  ```go
  java := true
  ```

#### Basic Types

```
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32
     // represents a Unicode code point

float32 float64

complex64 complex128
```

#### Zero Values

- `0` for numeric types.
- `false` for the boolea type.
- `""` for strings.

#### Type Conversions

```go
i := 42
f := float64(i)
u := uint(f)
```

#### Type Inference

- When the RHS is typed, the new variable is of that same type.
  ```go
  var i int
  j := i // j is an int
  ```
- When the RHS is an untyped numeric constant, the new variable can be an `int`, `float64`, or `complex128` depending on the precision of the constant.
  ```go
  i := 42           // int
  f := 3.142        // float64
  g := 0.867 + 0.5i // complex128
  ```

#### Constants

- Declared with the `const` keyword.
- Cannot be declared with `:=`.

#### Numeric Constants

- High-precision values.
- An untyped constant takes the type needed by its context.
