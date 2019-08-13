# Programming in Scala

## 1. A Scalable Language

- Scala is object-oriented.
- Scala is functional.
- Scala is compatible.
- Scala is concise.
- Scala is high-level.
- Scala is statically typed.

## 2. First Steps in Scala

### Define variables

```scala
val msg = "Hello, world!"
```

- `msg` has `String` type (inferred by Scala compiler).
- Immutable.

```scala
val greeting = "Hello, world!"
```

- Similar to the previous snippet, but mutable.

### Define a function in Scala

```scala
def max(x: Int, y: Int): Int = {
  if (x > y) x
  else y
}
```

or

```scala
def max(x: Int, y: Int): Int = if (x > y) x else y
```

(another example)

```scala
def greet() = println("Hello, world!")
```

- It returns `Unit` type, which is similar to `void` in Java.

### Iterate with `for` and `foreach`

```scala
args.foreach(arg => println(arg))
```

or

```scala
args.foreach((arg: String) => println(arg))
```

or

```scala
for (arg <- args)
  println(arg)
```
