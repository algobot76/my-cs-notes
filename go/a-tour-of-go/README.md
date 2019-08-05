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

### More types: structs, slices, and maps

#### Pointers

- A pointer holds the memory address of value.

```go
func main() {
  i, j := 42, 2701

  p := &i         // point to i
  fmt.Println(*p) // read i through the pointer
  *p = 21         // set i through the pointer
  fmt.Println(i)  // see the new value of i

  p = &j         // point to j
  *p = *p / 37   // divide j through the pointer
  fmt.Println(j) // see the new value of j
}
```

#### Structs

- A `struct` is a collection of fields.

```go
type Vertex struct {
  X int
  Y int
}

func main() {
  v := Vertex{1, 2}
  v.X = 4
  fmt.Println(v.X)
}
```

#### Pointers to structs

- You can use `p.X` instead of `(*p).X` to access a field of a struct via its pointer.

#### Struct Literals

```go
type Vertex struct {
  X, Y int
}

var (
  v1 = Vertex{1, 2}  // has type Vertex
  v2 = Vertex{X: 1}  // Y:0 is implicit
  v3 = Vertex{}      // X:0 and Y:0
  p  = &Vertex{1, 2} // has type *Vertex
)
```

#### Arrays

```go
func main() {
 var a [2]string
 a[0] = "Hello"
 a[1] = "World"
 fmt.Println(a[0], a[1])
 fmt.Println(a)

 primes := [6]int{2, 3, 5, 7, 11, 13}
 fmt.Println(primes)
}
```

#### Slices

- A slice is a dynamically-sized, flexible view into the elements of an array.
- A slice is a reference to the underlying array.
- A slice can be specified with two indices: `a[low : high]`.
- A slice has both a length and a capacity:
  - length: number of elements in the slice
  - capacity: number of elements in the underlying array
- Zero value of a slice is `nil` (nil slice), with `0` length and `0` capacity.

#### Creating a slice with make

```go
a := make([]int, 5) // len(a) = 5
b := make([]int, 0, 5) // len(b) = 0, cap(b) = 5
```

#### Appending to a slice

- You can add new elements to a slice with `append`.

```go
// append works on nil slices.
s = append(s, 0)
// The slice grows as needed.
s = append(s, 1)
// We can add more than one element at a time.
s = append(s, 2, 3, 4)
```

#### Range

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
  for i, v := range pow {
    fmt.Printf("2**%d = %d\n", i, v)
  }
}
```

- `i`: index
- `v`: value
- You can skip `i` or `v` with `_`.

#### Maps

- A map maps keys to values.
- Zero value of a map is `nil`. A `nil` map has no keys, nor can keys be added.

```go
var m map[string]Vertex

m = make(map[string]Vertex)
m["Bell Labs"] = Vertex{
  40.68433, -74.39967,
}
fmt.Println(m["Bell Labs"])
```

or

```go
var m = map[string]Vertex{
  "Bell Labs": Vertex{
    0.68433, -74.39967,
  },
  "Google": Vertex{
    37.42202, -122.08408,
  },
}
```

or

```go
var m = map[string]Vertex{
  "Bell Labs": {40.68433, -74.39967},
  "Google":    {37.42202, -122.08408},
}
```

#### Mutating maps

- Insert/update: `m[key] = elem`
- Retrieve: `elem = m[key]`
- Delete: `delete(m, key)`
- Test if a key already exists: `elem, ok = m[key]`
  - If `key` in `m`: `ok` is `true`, `false` otherwise.
  - If `key` not in `m`: `elem` is the zero value.

#### Function values

- Functions can be used as arguments/return values.

```go
func compute(fn func(float64, float64) float64) float64 {
  return fn(3, 4)
}

func main() {
  hypot := func(x, y float64) float64 {
    return math.Sqrt(x*x + y*y)
  }
  fmt.Println(hypot(5, 12))

  fmt.Println(compute(hypot))
  fmt.Println(compute(math.Pow))
}
```

#### Function closures

- A closure is a function value that references variables from outside its body.

```go
func adder() func(int) int {
  sum := 0
  return func(x int) int {
    sum += x
    return sum
  }
}

func main() {
  pos, neg := adder(), adder()
  for i := 0; i < 10; i++ {
    fmt.Println(
      pos(i),
      neg(-2*i),
    )
  }
}
```
