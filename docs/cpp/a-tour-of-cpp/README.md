# A Tour of C++

[[toc]]

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

<!-- TODO: Finish the reset of 5 -->

<!-- TODO: 6 -->

<!-- TODO: 7 -->

<!-- TODO: 8 -->

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

<!-- TODO: 10 -->

## 11 Containers

### Vector

Vector initialization:

```cpp
vector<int> v1 = {1, 2, 3, 4}; // size is 4
vector<string> v2; // size is 0
vector<Shape*> v3(23); // size is 23; initial element value is nullptr
vector<double> v4(32, 9.9) // size is 32; initial element value is 9.9

vector<Shape> vs; // No, don't - there is no room for a Circle or a Similey
vector<Shape*> vps: // better, but potential resouce leaks
vector<uniqe_ptr<Shape>> vups: // OK
```

---

### List

```cpp
list<Entry> phone_book = {
    {"David HUme", 123456},
    {"Karl Popper", 234567},
    {"Bertrand Arthur William Russell", 345678}
}

int get_number(const string& s)
{
    for (const auto& x : phone_book)
        if (x.name == s)
            return x.number;
    return 0; // 0 reprents "number not found"
}

void f(const Entry& ee, list<Entry>::iterator p, list<Entry>::iterator q)
{
    phone_book.insert(p,ee); // add ee before the element referred to by p
    phone_book.erase(q) // remove the element referred to by q
}
```

---

### Unordered Map

Define a hash function for a struct:

```cpp
struct Record {
    string name;
    int product_code;
}

struct Rehash {
    size_t operator()(const Record& r) const
    {
        return hash<string>()(r.name) ^ hash<int>()(r.product_code);
    }
}
```

---

### Map vs Unordered Map

- A `map` requires an ordering function (the default is `<`) and yields an ordered sequence.
- An `unordered_map` requires a hash function and does not maintain an order among its elements.
- Given a good hash function, an `unordered_map` is much faster than a `map` for large containers. However, with a poor hash function, its is worse than a `map` in terms of works-case bahavior.

---

### Container Overview

#### Standard Container Summary

- `vector<T>`: a variable-size vector
- `list<T>`: a doubly-linked list
- `forward_list<T>`: a singly-linked list
- `deque<T>`: a double-ended queue
- `set<T>`: a set (a `map` with just a key with no value)
- `multiset<T>`: a set in which a value can occur many times
- `map<T>`: an associative array
- `multimap<T>`: a map in which a key can occur many times
- `unordered_map<K,V>`: a map using a hashed lookup
- `unordered_multimap<K,V>`: a multimap using a hashed lookup
- `unordered_set<T>`: a set using a hashed lookup
- `unordered_multiset<T>`: a multiset using a hashed lookup

#### Standard Container Operation (partial)

- `value_type`: the type of an element
- `p=c.begin()`: `p` points to first element of `c`; also `cbegin()` for an iterator to `const`
- `p=c.end()`: `p` points to one-past-the-last element of `c`; also `cend()` for an iterator to `const`
- `k=c.size()`: `k` is the number of elements in `c`
- `c.empty()`: Is `c` empty?
- `k=c.capacity()`: `k` is the number of elements that `c` can hold without a new allocation
- `c.reserve(k)`: Make the capacity `k`
- `c.resize(k)`: Make the number of elements `k`; added elements have the value of `value_type{}`
- `c[k]`: The `k`th element of `c`; no range checking
- `c.at(k)`: The `k`th element of `c`; if out of range, throw `out_of_range`
- `c.push_back(x)`: Add `x` at the end of `c`; increase the size of `c` by one
- `c.emplace_back(a)`: Add `value_type{a}` at the end of `c`; increase size of `c` by one
- `q=c.insert(p,x)`: Add `x` before `p` in `c`
- `q=c.erase(p)`: Remove element at `p` from `c`
- `=`: Assignment
- `==`, `!=`: Equality of all elements of `c`
- `<`, `<=`, `>`, `>=`: Lexicographical order

## 12 Algorithms

### Use of Iterators

Use iterators to implement `find_all`:

```cpp
template<typename T>
using Iterator = typename T::iterator

template<typename C, typename V>
vector<Iterator<C>> find_all(C&c, V v)
{
    vector<Iterator<C>> res;
    for (auto p=c.begin(); p!=c.end(); ++p)
        if (*p==v)
            res.push_back(p)
    return res;
}
```

---

### Iterator Types

An iterator is an object of some type.

- holds enough info for doing its job
- its type depends on its container and its job
- `++` yields an iterator that refers to the next element
- `*` yields the element it refers to

---

<!-- TODO: 12.4 -->

### Predicates

Search a `map<string,int>` for the first value larger than 42:

```cpp
auto p = find_if(m.begin(), m.end(), [](const pair<string,int>& r) { return r.second>2 })
```

---

### Algorithm Overview

#### Selected Standard Algorithms

- `f=for_each(b,e,f)`: For each element `x` in [`b`:`e`) do `f(x)`
- `p=find(b,e,x)`: `p` is the first `p` in [`b`:`e`) so that `*p==x`
- `p=find_if(b,e,f)`: `p` is the first `p` in [`b`:`e`)  so that `f(*p)`
- `p=count(b,e,x)`: `n` is the number of elements `*q` in [`b`:`e`) so that `*q==x`
- `p=count(b,e,f)`: `n` is the number of elements `*q` in [`b`:`e`)  so that `f(*q)`
- `replace(b,e,v,v2)`: Replace elements `*q` in [`b`:`e`) so that `*q==v` with `v2`
- `replace_if(b,e,f,v2)`: Replace elements `*q` in [`b`:`e`) so that `f(*q)` with `v2`
- `p=copy(b,e,out)`: Copy [`b`:`e`) to [`out`:`p`)
- `p=copy_if(b,e,out,f)`: Copy elements `*q` in [`b`:`e`) so that `f(*q)` to [`out`:`p`)
- `p=move(b,e,out)`: Move [`b`:`e`) to [`out`:`p`)
- `p=unique_copy(b,e,out)`: Copy [`b`:`e`) to [`out`:`p`); don't copy adjacent duplicates
- `sort(b,e)`: Sort elements of [`b`:`e`) using `<` as the sorting criterion
- `sort(b,e,f)`: Sort elements of [`b`:`e`) using `f` as the sorting criterion
- `(p1,p2)=equal_range(b,e,v)`: [`p1`:`p2`) is the subsequence of the sorted sequence [`b`:`e`) with the value `v`; basically a binary search for `v`
- `p=merge(b,e,b2,e2,out)`: Merge two sorted sequences [`b`:`e`) and [`b2`:`e2`) into [`out`:`p`)
- `p=merge(b,e,b2,e2,out,f)`: Merge two sorted sequences [`b`:`e`) and [`b2`:`e2`) into [`out`:`p`) using `f` as the comparison

<!-- TODO: 12.7 - 12.9 -->

<!-- TODO: 13 -->
