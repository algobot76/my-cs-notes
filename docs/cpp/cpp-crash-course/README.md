# C++ Crash Course

[[toc]]

## Chapter 9. Functions

### Lambda Expressions

Lambda expressions construct unnamed function objects succinctly.

#### Usage

```
[captures] (parameters) modifiers -> return-type { body}
```

- `captures`: member variables of the function object
- `parameters`: arguments required to invoke the function object
- `body`: the function object's code
- `specifiers`: e.g. `constexpr`, `mutable`, `noexcept`, and `[[noreturn]]`

#### Lambda Parameters and Bodies

```cpp
#include <cstdio>
#include <cstdint>

template <typename Fn>
void transform(Fn fn, const int* in, int* out, size_t length) {
  for(size_t i{}; i<length; i++) {
    out[i] = fn(in[i]);
  }
}

int main() {
  const size_t len{ 3 };
  int base[]{ 1, 2, 3 }, a[len], b[len], c[len];
  transform([](int x) { return 1; }, base, a, len);
  transform([](int x) { return x; }, base, b, len);
  transform([](int x) { return 10*x+5; }, base, c, len);
  for (size_t i{}; i < len; i++) {
    printf("Element %zd: %d %d %d\n", i, a[i], b[i], c[i]);
  }
}
```

#### Default arguments

```cpp
#include <cstdio>

int main() {
  auto increment = [](auto x, int y = 1) { return x + y; };
  printf("increment(10)    = %d\n", increment(10));
  printf("increment(10, 5) = %d\n", increment(10, 5));
}
```

#### Generic Lambdas

Generic lambdas are lambda expression templates. You specify `auto` instead of a concrete type.

```cpp
int main() {
  constexpr size_t len{ 3 };
  int base_int[]{ 1, 2, 3 }, a[len];
  float base_float[]{ 10.f, 20.f, 30.f }, b[len];
  auto translate = [](auto x) { return 10 * x + 5; };
  transform(translate, base_int, a, l);
  transform(translate, base_float, b, l);

  for (size_t i{}; i < l; i++) {
    printf("Element %zd: %d %f\n", i, a[i], b[i]);
  }
}
```

#### Lambda Return Types

You can use `->` to specify the return type of a lambda.

```cpp
[](int x, double y) -> double { return x + y; }
```

You can also use `decltype` with generic lambdas.

```cpp
[](auto x, double y) -> decltype(x+y) { return x + y; }
```

#### Lambda Captures

Lambda captures inject into the lambda. The injected objects help to modify the behaviour of the lambda. A lambda can capture by reference or by value (default).

```cpp
int main() {
  char to_count{ 's' };
  auto s_counter = [to_count](const char* str) {
    size_t index{}, result{};
    while (str[index]) {
      if (str[index] == to_count) result++;
      index++;
    }
    return result;
  };
  auto sally = s_counter("Sally sells seashells by the seashore.");
  printf("Sally: %zd\n", sally);
  auto sailor = s_counter("Sailor went to sea to see what he could see.");
  printf("Sailor: %zd\n", sailor);
}
```

|   Capture List   |                                       Meaning                                       |
| :--------------: | :---------------------------------------------------------------------------------: |
|      `[&]`       |                            Default capture by reference                             |
|     `[&,i]`      |                 Default capture by reference; capture `i` by value                  |
|      `[=]`       |                              Default capture by value                               |
|     `[=,&i]`     |                  Default capture by value; capture i by reference                   |
|      `[i]`       |                                Capture `i` by value                                 |
|      `[&i]`      |                              Capture `i` by reference                               |
|     `[i,&j]`     |                   Capture `i` by value; capture `j` by reference                    |
|    `[i=j,&k]`    |                Capture `j` by value as `i`; capture `k` by reference                |
|     `[this]`     |                       Capture `enclosing object` by reference                       |
|    `[*this]`     |                         Capture `enclosing object` by value                         |
| `[=,*this,i,&j]` | Default capture by value; capture `this` and `i` by value; capture `j` by reference |

- You are not allowed to modify variables passed by value unless you add the `mutable` keyword to the lambda expression.
- A change to a variable passed by value does not modify the variable in the outer scope.

#### `constexpr` Lambda Expressions

All lambda expressions are `constexpr` as long as the lambda can be invoked at compile time. You can optionally make the `constexpr` declaration explicit.

```cpp
[] (int x) constexpr { return x * x; }
```
