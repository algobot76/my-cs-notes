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

## 4 Classes

### An Example of RAII

```cpp
class Vector {
public:
    Vector(int s) :elem{new double[s]}, sz {s} // contructor: acquire resources
    {
        for (int i=0; i!=s; ++i) // initialize elements
            elem[i]=0;
    }
    ~Vector() {delete[] elem;} // destructor: release resources
    // ...
}
```

---

### Abstract Types

```cpp
class Container {
public:
    virtual double& operator[](int) = 0;
    virtual int size() const = 0;
    virtual ~Container(){}
}
```

- `=0` means the function is pure virtual, so it must be implemented in the derived class.

```cpp
class Vector_container :public Container {
public:
    // ...
    double& operator[](int i) override {return v[i];}
    // ...
}
```

- `:public` means `Vector_container` is derived from `Container`.
- `override` is optional but helpful for the compiler to detect mistakes.
- Each class with virtual functions has its own vtbl (virtaul function table). It allows the correct functions to be called.

`dynamic_cast` can be used to check the concrete type of an object.

```cpp
// ...
if (Smiley* p = dynamic_cast<Smiley*>(ps)) { // .. does ps point to a Smiley
    // ... a Smiley, use it
}
else {
    // ... not a Smiley, try something else
}
```

### Avoiding Resource Leaks

`unique_ptr` can be used to avoid resource leaks.

```cpp
class Smiley :public Circle {
    // ...
private:
    vector<uniqe_ptr<Shape>> eys;
    unique_ptr<Shape> mouth;
}
```

- No need to create a destructor for `Smiley`.
- A `unique_ptr` deletes a resource when the `unique_ptr` goes out of scope.

## 5 Essential Operations

### Essential Operations

```cpp
class X {
public:
    X(Sometype); // "ordinary contructor": create an object
    X(); // default constructor
    X(const X&); // copy constructor
    X(X&&); // move constructor
    X& operator=(const X&); // copy assignment: clean up target and copy
    X& operator=(X&&); // move assignment: clean up target and move
    ~X(); // destructor: clean up
    // ...
}
```

An object can be copied or moved:

- as the source of an assignment
- as an object initializer
- as a function argument
- as a function return value
- as an exception

`=default` uses the default constructor; `=delete` indicates default operation should not be used (use of `delete`d functions causes a compile-time error).

The rule of zero: either define all of the essential operations or none (using the default for all).

---

### Conversions

```cpp
class Vector {
public:
    explicit Vector(int s); // no implicit conversion from int to Vector
    // ...
}

Vector v1(7); // Ok
Vector v2 = 7; // error: no implicit conversion from int to Vector
```

## 9 Strings

### Introduction to Strings

```cpp
string name = "Niels Stroustrup";

void m3()
{
    string s = name.substr(6, 10); // s = "Stroustrup"
    name.replace(0, 5); // name becomes "nicholas Stroustrup"
    name[0].toupper(name[0]) // name becomes "Nicholas Stroustrup"
}
```

```cpp
auto s = "Cat"s; // a std::string
auto p = "Dog" // a C-style string: a const char*
```

`string` is implemented using short-string optimization.
    - short strings stored in `string` object
    - long strings placed on free store

---

### String Views

`string_view` is a (pointer, length) pair denoting a sequence of characters. The sequence of characters can be stored in many different ways (including `string` or C-style string).

- Read-only view
- Out-of-range access is unspecified
- Use `at()` for range checking

```cpp
string cat(string_view sv1, string_view sv2)
{
    string res(sv1.length() + sv2.length());
    char* p = &res[0];
    for (char c : sv1) // one way to copy
        *p++ = c;
    copy(sv2.begin(), sv2.end(), p); // another way to copy
    return res;
}
```

- Can be used for character sequences managed in different ways.
- No temporary `string` arguments are created for C-style string arguments.
- Can easily pass substrings.

```cpp
using namespace std::literals::string_view_literals;

string king  = "Harold";
auto s1 = cat(king,"William"); // string and const char*
auto s2 = cat(king,king); // string and string
auto s3 = cat("Edward","Stephen"sv); // const char * and string_view
auto s4 = cat("Canute"sv,king);
auto s5 = cat({&king[0],2},"Henry"sv); // HaHenry
auto s6 = cat({&king[0],2},{&king[2],4}); // Harold
```
