# A Tour of C++

## 1 The Basics

### Hello, World!

```cpp
#include <iostream>

int main()
{
    std:count << "Hello, World!\n";
}
```

---

### Initialization

```cpp
double d1 = 2.3
double d2 {2.3}
auto d3 = 2.3
```

---

### Constants

- `const`
  - "I promise not to change this value"
  - Value of a `const` is calculated at run time.
- `constexpr`
  - "to be evaluated at compile time"
  - allows placement of data in read-only memory

For a function to be used in a const expression, it must be defined by `constexpr`. And it must be rathe simple and have no side effects. Also, a `constexpr` function can accept non-constant-expression-arguments.

```cpp
constexpr double square(double x) { return x*x;}

constexpr double num1 = 1.4*square(17) // Ok
constexpr double num2 = 1.4*square(v) // error: v is not a const expression
```

---

### Pointers, Arrays, and References

```cpp
T a[n] // T[n]: a is an array of Ts
T* p // T*: p is a pointer to T
T& r // T&: r is a referene to T
T f(A) // T(A): f is a function taking an argument of type A rturning a result of type T
```

## 2 User-Defined Types

### Structures

Accessing members of a `struct`:

```cpp
void f(Vector v, Vector& rv, Vector* pv)
{
    int i1 = v.sz; // access through name
    int i2 = rv.sz; // access through reference
    int i3 = pv->sz; // access through pointer
}
```

---

### Unions

```cpp
struct Entry {
    string name;
    variant<Node*, int> v;
}

void f(Entry* pe)
{
    if (holds_alternative<int>(pe->v)) // does *pe hold an int?
        cout << get<int>(pe->v) // get the int
    // ...
}
```

---

### Enumerations

Initialize an enum with a `int`:

```cpp
Color x = Color{5}; // Ok, but verbose
Color y {6}; // Ok
```

## 3 Modularity

### Error Handling

A function that should never throw an exception can be declared `noexcept`.

```cpp
void user(int sz) noexcept
{
    Vector v(sz);
    iota(&v[0], &v[sz], 1);
    // ..
}
```

3 ways to report errors:

1. throwing an exception
   - a rare error
   - an error that cannot be handled by an immediate caller
   - new kinds of errors can be added in lower-modules of an application so that higher-level modules are not written to cope with such errors
   - no suitable return path for errors
   - the return path of a function is made more complicated or expensive by a need to pass both a value and an error indicator back, possibly leading to the use of out-parameters, non-local error-status indicators, or other workarounds
   - the error has to be transmitted up to a call chain to an "ultimate caller"
   - the recovery from errors depends on the results of several function calls, leading to the lead to maintain local state between calls and complicated control structures
   - the function that found the error was a callback, so the immediate caller may not even know what function was called
   - an error implies that some "undo action" is needed
2. returning an error code
   - a failure is normal and expected
   - an immediate caller can reasonably be expected to handle the failure
3. terminating the program
   - an error that we cannot recover from
   - error-handling is based on restarting a thread, process, or computer whenever a non-trivial error is detected
   - add `noexcept` to a function so that a `throw` will turn into a `terminte()`

`static_assert` can be used to find errors at compile time.

```cpp
static_assert(4<=sizeof(int), "intergers are too small") // check integer size
```

---

### Structure Binding

```cpp
complex<double> z = {1, 2};
auto [re,im] = z+2; // re=3; im=2
```
