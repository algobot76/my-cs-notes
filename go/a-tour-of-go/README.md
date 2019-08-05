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

#### Exported names

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

#### Basic types

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

#### Zero values

- `0` for numeric types.
- `false` for the boolea type.
- `""` for strings.

#### Type conversions

```go
i := 42
f := float64(i)
u := uint(f)
```

#### Type inference

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

#### Numeric constants

- High-precision values.
- An untyped constant takes the type needed by its context.

### Flow control statements: for, if, else, switch and defer

#### For

- init statement `;` condition `;` post statement
  - init and post statements are optional

"while" in Go:

```go
func main() {
  sum := 1
  for sum < 1000 {
    sum += sum
  }
  fmt.Println(sum)
}
```

Infinite loop:

```go
func main() {
  for {
  }
}
```

#### If and else

```go
func pow(x, n, lim float64) float64 {
  if v := math.Pow(x, n); v < lim {
    return v
  } else {
    fmt.Printf("%g >= %g\n", v, lim)
  }
  // can't use v here, though
  return lim
}

func main() {
  fmt.Println(
  pow(3, 2, 10),
  pow(3, 3, 20),
  )
}
```

#### Switch

```go
func main() {
 fmt.Println("When's Saturday?")
 today := time.Now().Weekday()
 switch time.Saturday {
 case today + 0:
    fmt.Println("Today.")
  case today + 1:
    fmt.Println("Tomorrow.")
  case today + 2:
    fmt.Println("In two days.")
  default:
    fmt.Println("Too far away.")
  }
}
```

#### Defer

- `defer` defers the execution of a function until the surrounding function returns
- `defer` statements are pushed onto a stack (LIFO).
