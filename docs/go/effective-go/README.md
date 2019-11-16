# Effective Go

[[toc]]

## Commentary

- Go provides block comments (`/* */`) and line comments (`//`).
- Line comments are the norm.
- Block comments are mostly package comments.
- Each package should have a package comment (in at least one file).
- Doc comments work best as complete sentences.
- Doc comments starts with the name of the item it describes.

<!-- TODO: Names -->

<!-- TODO: Semicolons -->

## Control Flows

### If

- Simple `if`:

```go
if x > 0 {
    return y
}
```

- Set up a local variable:

```go
if err := file.Chmod(0664); err != nil {
    log.Print(err)
    return err
}
```

- Guard against a sequence of error conditions:

```go
f, err := os.Open(name)
if err != nil {
    return err
}
d, err := f.Stat()
if err != nil {
    f.Close()
    return err
}
codeUsing(f, d)
```

### For

- `for` in Go unifies `for` and `while`:

```go
// Like a C for
for init; condition; post { }

// Like a C while
for condition { }

// Like a C for(;;)
for { }
```

- Loop over an array, slice, string, or map, or read from a channel:

```go
for key, value := range oldMap {
    newMap[key] = value
}
```

```go
for key := range m {
    if key.expired() {
        delete(m, key)
    }
}
```

```go
sum := 0
for _, value := range array {
    sum += value
}
```

### Switch

- Go's `switch` are more general than C's:

```go
func unhex(c byte) byte {
    switch {
    case '0' <= c && c <= '9':
        return c - '0'
    case 'a' <= c && c <= 'f':
        return c - 'a' + 10
    case 'A' <= c && c <= 'F':
        return c - 'A' + 10
    }
    return 0
}
```

```go
func shouldEscape(c byte) bool {
    switch c {
    case ' ', '?', '&', '=', '#', '+', '%':
        return true
    }
    return false
}
```

- `break` can be used to terminate `switch` early.
- type `switch`:

```go
var t interface{}
t = functionOfSomeType()
switch t := t.(type) {
default:
    fmt.Printf("unexpected type %T\n", t)     // %T prints whatever type t has
case bool:
    fmt.Printf("boolean %t\n", t)             // t has type bool
case int:
    fmt.Printf("integer %d\n", t)             // t has type int
case *bool:
    fmt.Printf("pointer to boolean %t\n", *t) // t has type *bool
case *int:
    fmt.Printf("pointer to integer %d\n", *t) // t has type *int
}
```

<!-- TODO: Functions -->

## Data

### Allocation with `new`

- `new` doesn't initialize the memory, it only zeros it.
- `new(T)` allocates zeroed storage for a new item of type T and returns its address, a value of type `*T`.

```go
p := new(SyncedBuffer)  // type *SyncedBuffer
var v SyncedBuffer      // type  SyncedBuffer
```

### Constructors and composite literals

- A composite literal is an expression that creates a new instance each time it is evaluated.

```go
func NewFile(fd int, name string) *File {
    if fd < 0 {
        return nil
    }
    f := File{fd, name, nil, 0}
    return &f // it's ok to return the address of a local variable
}
```

- By labeling the elements explicitly as `field:value` pairs, the initializers can appear in any order.
- Missing ones left as their respective zero values.

```go
return &File{fd: fd, name: name}
```

- Composite literals can also be created for arrays, slices, and maps.

```go
a := [...]string   {Enone: "no error", Eio: "Eio", Einval: "invalid argument"}
s := []string      {Enone: "no error", Eio: "Eio", Einval: "invalid argument"}
m := map[int]string{Enone: "no error", Eio: "Eio", Einval: "invalid argument"}
```

### Allocation with `make`

- `make` creates slices, maps, and channels only.
- It returns an initialized (not zeroed) value of type `T` (not `*T`).

```go
var p *[]int = new([]int)       // allocates slice structure; *p == nil; rarely useful
var v  []int = make([]int, 100) // the slice v now refers to a new array of 100 ints

// Unnecessarily complex:
var p *[]int = new([]int)
*p = make([]int, 100, 100)

// Idiomatic:
v := make([]int, 100)
```

### Arrays

- Arrays are values. Assigning one array to another copies all the elements.
- If you pass an array to a function, it will receive a copy of the array.
- The size of an array is part of its type.

To pass a pointer to an array:

```go
func Sum(a *[3]float64) (sum float64) {
    for _, v := range *a {
        sum += v
    }
    return
}

array := [...]float64{7.0, 8.5, 9.1}
x := Sum(&array)  // Note the explicit address-of operator
```

### Slices

- Slices hold references to an underlaying array.
- If you assign one slice to another, both refer to the same array.
- If a function takes a slice argument, changes it makes to the elements of the slice will be visible to the caller.

```go
var n int
var err error
for i := 0; i < 32; i++ {
    nbytes, e := f.Read(buf[i:i+1])  // Read one byte.
    n += nbytes
    if nbytes == 0 || e != nil {
        err = e
        break
    }
}
```

- The length of a slice may be changed as long as it still fits within the limits of the underlying array.
- The capacity of a slice can be accessed by using the `cap` function.

```go
func Append(slice, data []byte) []byte {
    l := len(slice)
    if l + len(data) > cap(slice) {  // reallocate
        // Allocate double what's needed, for future growth.
        newSlice := make([]byte, (l+len(data))*2)
        // The copy function is predeclared and works for any slice type.
        copy(newSlice, slice)
        slice = newSlice
    }
    slice = slice[0:l+len(data)]
    copy(slice[l:], data)
    return slice // must be returned as slice itself (pointer, length, capacity) is passed by value
}
```

<!-- TODO: Two-dimensional slices -->

### Maps

- The key can be of any type for which the equality operator is defined.
- Slices cannot be used as keys because equality is not defined on them.
- If you pass a map to a function that changes the contents of the map, the changes will be visible in the caller.

Use composite literal syntax to construct a map:

```go
var timeZone = map[string]int{
    "UTC":  0*60*60,
    "EST": -5*60*60,
    "CST": -6*60*60,
    "MST": -7*60*60,
    "PST": -8*60*60,
}
```

Fetch data from a map:

```go
attended := map[string]bool{
    "Ann": true,
    "Joe": true,
    ...
}

if attended[person] { // will be false if person is not in the map
    fmt.Println(person, "was at the meeting")
}
```

Distinguish a missing entry from a zero value:

```go
func offset(tz string) int {
    if seconds, ok := timeZone[tz]; ok {
        return seconds
    }
    log.Println("unknown time zone:", tz)
    return 0
}
```

Delete a map entry:

```go
delete(timeZone, "PDT")  // Now on Standard Time
```

<!-- TODO: Printing -->

### Append

Append elements to a slice:

```go
x := []int{1,2,3}
x = append(x, 4, 5, 6)
fmt.Println(x) // [1 2 3 4 5 6]
```

Append a slice to another:

```go
x := []int{1,2,3}
y := []int{4,5,6}
x = append(x, y...)
fmt.Println(x) // [1 2 3 4 5 6]
```

## Initialization

### Constants

- Created at compile time, even when defined as locals in functions.
- Can only be numbers, characters (runes), strings, or booleans.
- Expressions that define constants must be constant expressions.

```go
type ByteSize float64

const (
    _           = iota // ignore first value by assigning to blank identifier
    KB ByteSize = 1 << (10 * iota)
    MB
    GB
    TB
    PB
    EB
    ZB
    YB
)
```

### Variables

- Can be initialized just like constants but the initializer can be a general expression computed at run time.

```go
var (
    home   = os.Getenv("HOME")
    user   = os.Getenv("USER")
    gopath = os.Getenv("GOPATH")
)
```

### The `init` function

- Set up state.
- Called after all the variable declarations in the package have evaluated their initializers.
- Evaluated only after all the imported packages have been initialized.

```go
func init() {
    if user == "" {
        log.Fatal("$USER not set")
    }
    if home == "" {
        home = "/home/" + user
    }
    if gopath == "" {
        gopath = home + "/go"
    }
    // gopath may be overridden by --gopath flag on command line.
    flag.StringVar(&gopath, "gopath", gopath, "override default GOPATH")
}
```
