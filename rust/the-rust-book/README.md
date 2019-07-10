# The Rust Book

## 3. Common Programming Concepts

### Variables and Mutability

#### Differences between Variables and Constants

- Constants
  - Can't use `mut` with constants.
  - Declare constants with `const` instead of `let`.
  - Type must be annotated.
  - Can declare in any scope.
  - Only set to a constant expression, not to the result of a function call or any other value that could only be computed at runtime.
  - Valid for the entire time with the scope.

#### Shadowing

```rust
let x = 5;
let x = x + 1;
let x = x * 2;
```

- The second `let` statement shadows `x` and the third `let` statement shadows `x` as well.

```rust
let spaces = "   ";
let spaces = spaces.len();
```

- Shadowing allows you to change the type of a variable.

### Data Types

#### Scalar Types

- A scalar type represents a single value.
- 4 primary types: integers, floats, Booleans, and characters.

##### Integer

- A number without a fractional component.
- Signed/unsigned (e.g. `i32` and `u32`).
- Each signed variant: `-2^(n-1)` - `2^(n-1) - 1`.

##### Floating-Point

- 2 primitive types: `f32`, `f64`.

##### Numeric Operations

- Rust supports `+`, `-`, `*`, `/`, `%`.

##### Boolean

- `true` or `false`.

##### Character

- `char` represents a Unicode Scalar Value.

#### Compound Types

- Compound types can group multiple values into one type.
- 2 primitive compound types: tuples and arrays.

##### Tuple

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);
let (x, y, z) = tup; // destructuring
let five_hundred = tup.0;
let six_point_four = tup.1;
let one = tup.2;
```

- A comma-separated list of values inside parentheses.
- Each position has a type and the types don't have to be the same.
- The values of a tuple can be accessed by either destructuring/period (`.`).

##### Array

```rust
let a = [1, 2, 3, 4];

let first = a[0];

let invalid = a[10]; // invalid => runtime error
```

- A comma-separated list of values inside square brackets.
- Each value can be accessed by a corresponding index.
- An invalid index causes a runtime error.

### Functions

#### Function Parameters

```rust
fn main() {
    another_function(5, 6);
}

fn another_function(x: i32, y: i32) {
    println!("The value of x is: {}", x);
    println!("The value of y is: {}", y);
}
```

- `x` and `y` are __parameters__/__arguments__.
- You must declare types for each parameter (e.g. `i32`).
- Parameters can have different types.

#### Statements and Expressions in Function Bodies

- __Statements__: instructions that perform some action and don't return a value.
- __Expressions__: evaluate to a resulting value.

```rust
fn main () {
    let x = 5;
    let y = {
        let x = 3;
        x + 1
    };
}
```

- `let y = {...};` is a statement.
- `{...}` is a block.
- `x + 1` has no semicolon and is an expression.

#### Functions with Return Values

```rust
fn plus_one(x: i32) -> i32 {
    x + 1
}
```

- `-> i32` specifies the type of the return value.

### Comments

- A __comment__ starts with `//`.

### Control Flow

#### If Expressions

```rust
fn main() {
    let number = 3;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
```

- The condition of every `if` expression must be a boolean. It cannot be values other than booleans.
- __Arms__: blocks of code associated with the condition in an `if` expression.
- Rust also supports `else if`.

```rust
fn main() {
    let condition = true;
    let number  = if condition {
        5
    } else {
        6
    }
}
```

- You can combine a `let` statement with an `if` expression.
- The return value in each arm must have the same type.

### Repetitions with Loops

#### `loop`

```rust
fn main() {
    loop {
        println!("again!");
    }
}
```

- The `println!` statement is repeatedly executed.
- Use `CTRL-C` to halt the loop.

#### `while`

```rust
fn main () {
    let mut number = 3;

    while number != 0 {
        println!("{}!", number);
        number = number - 1;
    }

    println!("LIFTOFF!!!");
}
```

#### `for`

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    for element in a.iter() {
        println!("The value is: {}", element);
    }
}
```

- Use `for` to iterate the array `a`.
- Replace `a.iter()` with `a.rev()` if you want to iterate backward.

## 4. Understanding Ownership

### What is Ownership?

#### Ownership Rules

- Each variable in Rust has a variable that's called its owner.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

#### Variable Scope

```rust
{ // s is not valid here, it's not yet declared
    let s = "hello"; // s is valid from this point forward

    // do stuff swith s
} // this scope is now over, and s is no longer valid
```

#### Ways Variables and Data Interact: Move

```rust
let s1 = String::form("hello");
let s2 = s1; // s1 is no longer valid here

println!("{}, world!", s1); // error
```

- `s2` is a copy of `s1`'s pointer, length, and capacity.
- `s1` is moved into `s2` (`s1` is no longer valid).
- Rust doesn't have to free anything when `s1` goes out of scope.
- Only `s2` is valid and will be freed when it goes out of scope.

#### Ways Variables and Data Interact: Clone

```rust
let s1 = String::from("hello");
let s2 = s1.clone(); // data of s1 is copied

println!("s1 = {}, s2 = {}", s1, s2); // both s1 and s2 are valid
```

#### Ways Variables and Data Interact: Copy

```rust
let x = 5;
let y = x; // x not moved into y

println!("x = {}, y = {}", x, y); // both x and y are valid
```

- Size of an integer has a known size at compile time, so Rust stores `x` and `y` on the stack.
- Types with the `Copy` trait can be stored on the stack.
- We can't annotate a type with the `Copy` trait if any part of it has implemented the `Drop` trait.

#### Ownership and Functions

```rust
fn main() {
    let s = String::form("hello"); // s comes into scope
    take_ownership(s); // s's value moves into the function
                       // and is no longer valid here
    let x = 5; // x comes into scope
    makes_copy(x); // x would move into the function
                   // but i32 is Copy, so it's ok to sitll
                   // use x afterward
} // both x and s go out of scope. But because s's value was moved, nothing special happens

fn takes_ownership(some_string: String) { // some_string comes into scope
    println!("{}", some_string);
} // some_string goes out of scope and `drop` is called

fn makes_copy(some_integer: i32) {
    println1("{}", some_integer);
}
```

#### Return Values and Scope

```rust
fn main() {
    let s1 = gives_ownership(); // gives_onwsership moves its return value into s1
    let s2 = String::form("hello"); // s2 comes into scope
    let s3 = takes_and_gives_back(s2); // s2 is moved into takes_and_gives_back, which also moves its return value to s3
} // s3 goes out of scope and is dropped. s2 goes out of scope but was moved, so nothing happens. s1 goes out of scope and is dropped.

fn gives_ownership() -> String {
    let some_string = String::form("hello");
    some_string
}

fn takes_and_give_back(a_string: String) -> String {
    a_string
}
```

### References and Borrowing

```rust
fn main() {
    let s1 = String::form("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len();
}
```

- `s` is a reference to `s1`.
- `s` doesn't have the ownership of the value of `s1`.
- When `s` goes out of scope, the value it refers to is not dropped.
- This is also called __borrowing__.
- References are immutable by default.

#### Mutable References

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

- `&mut` makes a reference mutable.
- Only one mutable reference at a time.


```rust
let mut s = String::from("hello");

let r1 = &s; // no problem
let r2 = &s; // no problem
let r3 = &mut s; // BIG PROBLEM

println!("{}, {}, and {}", r1, r2, r3);
```

```rust
let mut s = String::from("hello");

let r1 = &s; // no problem
let r2 = &s; // no problem
println!("{} and {}", r1, r2);
// r1 and r2 are no longer used after this point

let r3 = &mut s; // no problem
println!("{}", r3);
```

- You can have immutable references and mutable references within the same scope, but you can't mix them.

#### Dangling References

```rust
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String { // returns a reference to a string
    let s = String::from("hello"); // s is a new string
    &s // reference to the string s
} // &s goes out of scope, and is dropped. Its memory goes away.
// Danger!
```

```rust
fn no_dangle() -> String {
    let s = String::from("hello");
    s // ownership is moved out, and nothing is deallocated
}
```

#### The Rules of References

- At any given time, you can have either one mutable reference or any number of immutable references.
- References must always be valid.

### The Slice Type

- __Slice__ lets you reference a contiguous sequence of elements in a collection rather than the whole collection.

#### String Slices

```rust
let s = String::from("hello");

let slice = &s[1..3]; // (1, 3]
let slice = &s[..2]; // (0, 2)
let slice = &s[3..]; // (3, len]
let slice = &s[..] // (0, 0]
```

```rust
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
```

##### String Literals are Slices

```rust
let s = "hello, world!";
```

- The type of `s` is `&str`, which is an immutable reference.

##### String Slices as Parameters

```rust
fn first_word(s: &str) -> &str {
```

- This allows us to use `first_word` on both `&String` and `&str`.

#### Other Slices

```rust
let a = [1, 2, 3, 4, 5];

let slice = &a[1..3];
```

- The type of slice is `&[i32]`.

## 5. Using Structs to Structure Related Data

### Defining and Instantiating Structs

- Define a struct called `User`:

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
```

- Create an instance of `User`:

```rust
let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
```

- Change the value of the `email` field of `user1`:

```rust
let mut user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};

user1.email = String::from("anotheremail@example.com");
```

- Define a `build_user` function that returns a `User` instance with the given email and username:

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email，
        username,
        active: true,
        sign_in_count: 1,
    }
}
```

## 10. Generic Types, Traits, and Lifetimes

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