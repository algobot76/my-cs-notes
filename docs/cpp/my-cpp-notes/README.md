# My C++ Notes

[[toc]]

## STL

### `std::move`

#### What is it?

A converter between ways the compiler considers an expression's value.

#### What does it do?

When you use `std::move(x)`, you allow the compiler to cannibalize `x`. If `x` has a buffer in memory, after `std::move()`

#### When should it be used?

An example use case: swapping two objects with less copying.

```cpp
template <class T>
swap(T& a, T& b) {
    T tmp(a);   // we now have two copies of a
    a = b;      // we now have two copies of b (+ discarded a copy of a)
    b = tmp;    // we now have two copies of tmp (+ discarded a copy of b)
}
```

```cpp
template <class T>
swap(T& a, T& b) {
    T tmp(std::move(a));
    a = std::move(b);
    b = std::move(tmp);
}
```

#### References

- [What is std::move(), and when should it be used?](https://stackoverflow.com/a/27026280/9639472)

## Snippets

### Create a random string

```cpp
std::string random_string( size_t length )
{
    auto randchar = []() -> char
    {
        const char charset[] =
        "0123456789"
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "abcdefghijklmnopqrstuvwxyz";
        const size_t max_index = (sizeof(charset) - 1);
        return charset[ rand() % max_index ];
    };
    std::string str(length,0);
    std::generate_n( str.begin(), length, randchar );
    return str;
}
```

#### References

- [How do I create a random alpha-numeric string in C++?](https://stackoverflow.com/a/12468109/9639472)
