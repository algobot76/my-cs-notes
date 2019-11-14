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
