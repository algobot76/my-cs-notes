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

