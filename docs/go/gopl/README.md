# The Go Programming Language

## 2. Program Structure

### 2.1 Names

A name begins with a letter/underscore and may have any number of additional letters, digits, and underscores.

Go has 25 keywords(cannot be used as names):

```text
break        default      func         interface    select
case         defer        go           map          struct
chan         else         goto         package      switch
const        fallthrough  if           range        type
continue     for          import       return       var
```

Go also has three dozen predeclared names(could be used as names, but be aware of potential confusion):

- Constants: `true`, `false`, `iota`, `nil`
- Types: `int`, `int8`, `int16`, `int32`, `int64`, `uint`, `uint8`, `uint16`, `uint32`, `uint64`, `uintptr`, `float32`, `float64`, `complex128`, `complex64`, `bool`, `byte`, `rune`, `string`, `error`
- Functions: `make`, `len`, `cap`, `new`, `append`, `copy`, `close`, `delete`, `complex`, `real`, `imag`, `panic`, `recover`

If an entity is declared within a function, it is local to that function.

If declared outside of a function, it is visible in all files of the package to which it belongs.

If the name begins with an upper-case letter, it is  visible and accessible outside of its own package.

Use camelCase for naming.
