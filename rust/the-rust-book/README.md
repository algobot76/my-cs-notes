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

```rust
fn longest<'a>(x: &'a str, y: &str) -> &'a str {
    x
}
```

- No need to add a lifetime to `y` since it has nothing to do with `x` or the return value.

```rust
fn longest<'a>(x: &str, y: &str) -> &'a str {
    let result = String::from("really long string");
    result.as_str()
}
```

- This is invalid because the reference returned doesn't refer to one of the parameters and might be a dangling reference.

#### Lifetime Annotations in Struct Definitions

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.')
        .next()
        .expect("Could not find a '.'");
    let i = ImportantExcerpt { part: first_sentence };
}
```

- An instance of `ImportantExcerpt` struct holds a reference to the first sentence of the `String` owned by the variable `novel`.
- `ImportantExcerpt` can't outlive the reference it holds in its `part` field.

#### Lifetime Elision

- __Input lifetimes__: lifetimes on function or method parameters.
- __Output lifetimes__: lifetimes on return values.

There are 3 rules used by Rust to determine lifetimes of references when there are no explicit annotations:

1. Each parameter that is a reference gets its own lifetime parameter.
2. If there exactly one input lifetime parameter, that lifetime is assigned to all output lifetime parameters.
3. If there are input lifetime parameters, but one of them is `&self` or `&mut self` because this is a method, the lifetime of `self` is assigned to all output lifetime parameters.

#### The Static Lifetime

- `'static` means this reference can live for the entire duration of the program.
- All string literals have the `'static` lifetime.