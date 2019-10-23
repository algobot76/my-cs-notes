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
