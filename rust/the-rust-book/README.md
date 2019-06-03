# The Rust Book

## Chapter 10: Generic Types, Traits, and Lifetimes

### Validating References with Lifetimes

#### Preventing Dangling References with Lifetimes

```rust
{
    let r;

    {
        let x = 5;
        r = &x;
    }

    println!("r: {}", r);
}
```

- `r` declared in outer scope.
- `x` declared in inner scope.
- We're trying to assign the reference of `x` to `r`.
- Lifetime of `x` ends when the inner scope ends, i.e. `r` is referring to a value that has gone out of scope.

#### The Borrow Checker

```rust
{
    let r;                // ---------+-- 'a
                          //          |
    {                     //          |
        let x = 5;        // -+-- 'b  |
        r = &x;           //  |       |
    }                     // -+       |
                          //          |
    println!("r: {}", r); //          |
}                         // ---------+
```

- Rust uses the borrow checker to determine whether all borrows are valid.
- `'a` = lifetime of `r`
- `'b` = lifetime of `x`
- `b'` < `'a` => compile error

A fix:

```rust
{
    let x = 5;            // ----------+-- 'b
                          //           |
    let r = &x;           // --+-- 'a  |
                          //   |       |
    println!("r: {}", r); //   |       |
                          // --+       |
}                         // ----------+
```

#### Generic Lifetimes in Functions

```rust
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {}", result);
}
```

```rust
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

- Rust can't compile the code because it doesn't know whether referenced return by `longest` referes to `x` or `y`.

#### Lifetime Annotation Syntax

```rust
&i32        // a reference
&'a i32     // a reference with an explicit lifetime
&'a mut i32 // a mutable reference with an explicit lifetime
```

- `'a` is a convention frequently used by the Rust community.

#### Lifetime Annotations in Function Signatures

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

- `x` and `y` have the same lifetime as `'a`.
- The string sliced returned by `longest` also has the same lifetime as `'a`.
- `'a` = the smaller of the lifetimes of `x` and `y`.

More examples:

```rust
fn main() {
    let string1 = String::from("long string is long");

    {
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("The longest string is {}", result);
    }
}
```

- The above snippet is valid.
  - `string1` is valid until the end of the outer scope.
  - `string2` is valid until the end of the inner scope.
  - `result` is valid until the end of the inner scope.


```rust
fn main() {
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("The longest string is {}", result);
}
```

- The above snippet is invalid.
  - `result` is valid until the end of the outer scope.
  - `string2` is only valid until the end of the inner scope!!!
  - So Rust can't compile the code.

#### Thinking in Terms of Lifetimes
