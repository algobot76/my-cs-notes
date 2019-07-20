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

- Create `user2` from `user1`:

```rust
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    ..user1
};
```

#### Using Tuple Structs without Named Fields to Create Different Types

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
```

- Structs are defined like tuples (called __tuple structs__).
- `black` and `origin` have different types.

#### Unit-Like Structs Without Any Fields

- A __unit-like__ struct is a struct without any fields.
- It can be used to implement a trait on some type and you don't have any data to store in the type itself.

### An Example Program Using Structs

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!("rect1 is {:#?}", rect1);
}
```

### Method Syntax

- Add a method called `area` to `Rectangle`:

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

- Add a method called `can_hold` to `Rectangle`:

```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```

#### Associated Functions

```rust
impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}
```

- An __associated function__ is defined in an `impl` block but it doesn't work with an instance of the struct it works with.
- To call an associated function, we use the `::` operator, e.g. `let sq = Rectangle::square(3)`.

#### Multiple `impl` Blocks

- It's possible to have multiple `impl` blocks for the same struct.

## 6. Enums and Pattern Matching

### Defining an Enum

- Define an enum called `IPAddrKind` for IP addresses:

```rust
enum IpAddrKind {
    V4,
    V6,
}
```

#### Some Examples

- `IpAddrKind`

```rust
enum IpAddrKind {
    V4,
    V6,
}

struct IpAddr {
    kind: IpAddrKind,
    address: String,
}

let home = IpAddr {
    kind: IpAddrKind::V4,
    address: String::from("127.0.0.1"),
};

let loopback = IpAddr {
    kind: IpAddrKind::V6,
    address: String::from("::1"),
};
```

- `Message`

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
impl Message {
    fn call(&self) {
        // method body would be defined here
    }
}

let m = Message::Write(String::from("hello"));
m.call();
```

#### The `Option` Enum and its Advantages Over Null Values

- Definition of `Option`:

```rust
enum Option<T> {
    Some(T),
    None,
}
```

- Read [this](https://doc.rust-lang.org/std/option/enum.Option.html) to learn how to use it.

### The `match` Control Flow Operator

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

- Each `match` expression has arms. Each arm has two parts: a pattern and some code. E.g.
  - Pattern: `Coin::Penny`.
  - Code: `1`.
  - `=>` is an operator that separates the pattern and the code.

#### Patterns that Bind to Values

```rust
enum UsState {
    Alabama,
    Alaska,
    // --snip--
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        },
    }
}
```

#### Matching with `Option<T>`

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
```

#### Matches Are Exhaustive

```rust
// error
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        Some(i) => Some(i + 1),
    }
}
```

- The `plus_one` function doesn't cover the `None` case, and this will be reported by the Rust compiler.
- All the matches in Rust must be exhaustive.

#### The `_` Placeholder

```rust
let some_u8_value = 0u8;
match some_u8_value {
    1 => println!("one"),
    3 => println!("three"),
    5 => println!("five"),
    7 => println!("seven"),
    _ => (),
}
```

- `_` will match all the other possible cases.

### Concise Control Flow with `if let`

You can rewrite this:

```rust
let mut count = 0;
match coin {
    Coin::Quarter(state) => println!("State quarter from {:?}!", state),
    _ => count += 1,
}
```

into this:

```rust
let mut count = 0;
if let Coin::Quarter(state) = coin {
    println!("State quarter from {:?}!", state);
} else {
    count += 1;
}
```

## 8. Common Collections

### Storing Lists of Values with Vectors

#### Creating a New Vector

```rust
let v: Vec<i32> = Vec::new();
```

```rust
let v = vec![1, 2, 3];
```

#### Updating a Vector

```rust
let mut v = Vec::new();

v.push(5);
v.push(6);
v.push(7);
v.push(8);
```

#### Dropping a Vector Drops Its Values

- When a vector gets dropped, all of its contents are also dropped.

#### Reading Elements of Vectors

```rust
let v = vec![1, 2, 3, 4, 5];

let third: &i32 = &v[2]; // method 1
println!("The third element is {}", third);

match v.get(2) { // method 2
    Some(third) => println!("The third element is {}", third),
    None => println!("There is no third element."),
}
```

- If the index is out of bound, e.g. `100`:
  - Method 1: it causes the program to panic.
  - Method 2: it returns `None` without panicking.

#### Iterating Over the Values in a Vector

- Read each element of an array:

```rust
let v = vec![100, 32, 57];
for i in &v {
    println!("{}", i);
}
```

- Update each element of an array:

```rust
let mut v = vec![100, 32, 57];
for i in &mut v {
    *i += 50;
}
```

#### Using an Enum to Store Multiple Types

```rust
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
```

### Storing UTF-8 Encoded Text with Strings

#### What Is a String?

- Rust only have one string type: `str`.
- Rust's standard library provides `String`.
- Rust's standard library also provides other string types e.g. `OsString`, `OsStr`, `CString`, and `CStr`.

#### Creating a New String

```rust
let mut s = String::new();
```

```rust
let data = "initial contents";

let s = data.to_string();

// the method also works on a literal directly:
let s = "initial contents".to_string();
```

```rust
let s = String::from("initial contents");
```

#### Updating a String

- Append a string:

```rust
let mut s = String::from("foo");
s.push_str("bar");
```

```rust
let mut s1 = String::from("foo");
let s2 = "bar";
s1.push_str(s2);
println!("s2 is {}", s2);
```

- Append a character:

```rust
let mut s = String::from("lo");
s.push('l');
```

- Concatenate strings:

```rust
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = s1 + "-" + &s2 + "-" + &s3;
```

```rust
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = format!("{}-{}-{}", s1, s2, s3);
```

- Iterate over a string:

```rust
for c in "नमस्ते".chars() {
    println!("{}", c);
}
```

```rust
for b in "नमस्ते".bytes() {
    println!("{}", b);
}
```

- Rust doesn't support indexing into a string!!!
  - A `String` is a wrapper over `Vec<u8>`.
    - An English letter is represented in one byte.
    - One Unicode character is represented in two bytes.
    - Meaning of the element at a specific index can be ambiguous: byte or character?
  - Performance concern: Rust has to walk through the contents from the  beginning to the index to determine how many valid characters there are.

### Storing Keys with Associated Values in Hash Maps

#### Creating a New Hash Map

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
```

```rust
use std::collections::HashMap;

let teams  = vec![String::from("Blue"), String::from("Yellow")];
let initial_scores = vec![10, 50];

let scores: HashMap<_, _> = teams.iter().zip(initial_scores.iter()).collect();
```

#### Hash Maps and Ownership

```rust
use std::collections::HashMap;

let field_name = String::from("Favorite color");
let field_value = String::from("Blue");

let mut map = HashMap::new();
map.insert(field_name, field_value);
// field_name and field_value are invalid at this point, try using them and
// see what compiler error you get!
```

#### Accessing Values in a Hash Map

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team_name = String::from("Blue");
let score = scores.get(&team_name); // Some(&10)

for (key, value) in &scores {
    println!("{}: {}", key, value);
}
```

#### Updating a Hash Map

- Overwrite a value:

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Blue"), 25);
```

- Only insert a value if the key has no value:

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);

scores.entry(String::from("Yellow")).or_insert(50);
scores.entry(String::from("Blue")).or_insert(50);
```

- Update a value based on the old value:

```rust
use std::collections::HashMap;

let text = "hello world wonderful world";

let mut map = HashMap::new();

for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
}
```

## 9. Error Handling

### Unrecoverable Errors with `panic!`

- `panic!` prints a failure message, unwinds and cleans up the stack, then quits.

#### Using a `panic!` Backtrace

- To activate the backtrace of rust:

```
$ RUST_BACKTRACE=1 cargo run
```

### Recoverable Errors with `Result`

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

- `OK`: success case
- `Err`: failure case

An example:

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => {
            panic!("Problem opening the file: {:?}", error)
        },
    };
}
```

#### Matching on Different Errors

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => panic!("Problem opening the file: {:?}", other_error),
        },
    };
}
```

- `error.kind()` returns a variant of the `ErrorKind` enum.

Rewrite the above example in an idiomatic way:

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {:?}", error);
            })
        } else {
            panic!("Problem opening the file: {:?}", error);
        }
    });
}
```

#### Shortcuts for Panic on Error: `unwrap` and `expect`

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt").unwrap();
}
```

- `unwrap` returns the value in `Ok`.

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt").expect("Failed to open hello.txt");
}
```

- `expect` provides good error messages.

#### Propagating Errors

```rust
use std::io;
use std::io::Read;
use std::fs::File;

fn read_username_from_file() -> Result<String, io::Error> {
    let f = File::open("hello.txt");

    let mut f = match f {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut s = String::new();

    match f.read_to_string(&mut s) {
        Ok(_) => Ok(s),
        Err(e) => Err(e),
    }
}
```

#### A Shortcut for Propagating Errors: the `?` Operator

Rewrite the previous code snippet:

```rust
use std::io;
use std::io::Read;
use std::fs::File;

fn read_username_from_file() -> Result<String, io::Error> {
    let mut s = String::new();

    File::open("hello.txt")?.read_to_string(&mut s)?;

    Ok(s)
}
```

- The `?` operator can only be used in functions that return `Result`.

### To `panic!` or Not to `panic!`

#### Guidelines for Error Handling

- Panic when it's possible for you code to end up in a bad state.
  - __Bad state__: some assumption, guarantee, contract, or invariant has been broken.
    - It's not expected to happen occasionally.
    - You code after this point needs to rely on not being in this bad state.
    - No good way to encode this info in the types you use.
- When a failure is expected, use `Result`.
- You can use Rust's type system for error checking.

#### Creating Custom Types for Validation

An example of using types for validation in a guessing game:

```rust
pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {}.", value);
        }

        Guess {
            value
        }
    }

    pub fn value(&self) -> i32 {
        self.value
    }
}
```

## 10. Generic Types, Traits, and Lifetimes

### 10.1 Generic Data Types

#### In Function Definitions

```rust
fn largest<T>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }

    largest
}
```

- _Note_: Rust won't compile this code. It will be fixed latter.
- `T`: a type parameter.
- `&[T]`: a slice of values of type `T`.

#### In Struct Definitions

```rust
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 };
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 };
}
```

#### In Enum Definitions

```rust
enum Option<T> {
    Some(T),
    None,
}
```

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

#### In Method Definitions

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}
```

#### Performance of Code Using Generics

- Generics don't affect performance due to monomorphization.
- __Monomorphization__: process of turning generic code into specific code by filling in the concrete types that are used when compiled.
