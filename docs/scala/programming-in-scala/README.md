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

## 4. Classes and Objects

### 4.1 Classes, Fields, and methods

```scala
class ChecksumAccumulator {
  private var sum = 0
  def add(b: Byte): Unit = { sum += b}
  def checksum(): Int = ~(sum & 0xFF) + 1
}
```

- To create an instance of `ChecksumAccumulator`, e.g. `val acc = new ChecksumAccumulator`
- You cannot change `acc`'s reference to the existing `ChecksumAccumulator` instance. But the value of `sum` can be modified.
- No need to explicitly use `return` .
- `b` is a `val` by default.
- By default, members are public in Scala.
- A method that is executed only for its side effects is called a procedure.

### 4.2 Semicolon inference

A line ending is treated as a semicolon unless one of the following conditions is true:

1. The line in question ends in a word that would not be legal as the end of a statement, such as a period or an infix operator.
2. The next line begins with a word that cannot start a statement.
3. The line ends while inside parentheses `(...)` or brackets `[...]`, because these cannot contain multiple statements anyway.

### 4.3 Singleton objects

```scala
import scala.collection.mutable
object ChecksumAccumulator {
  private val cache = mutable.Map.empty[String, Int]
  def calculate(s: String): Int =
    if (cache.contains(s))
        cache(s)
      else {
        val acc = new ChecksumAccumulator
        for (c <- s)
            acc.add(c.toByte)
        val cs = acc.checksum()
        cache += (s -> cs)
        cs
    }
}
```

- The `ChecksumAccumulator` object is called the `ChecksumAccumulator` class's companion object.
- The `ChecksumAccumulator` class is called the `ChecksumAccumulator` object's companion class.
- You can treat the `calculate` method like a static method. And a singleton object is a holder of such static methods.
- A singleton object cannot take parameters.

### 4.4 A Scala Application

```scala
import ChecksumAccumulator.calculate

object Summer {
  def main(args: Array[String]) = {
    for (arg <- args)
      println(arg + ": " + calculate(arg))
  }
}
```

### 4.5 The App Trait

```scala
import ChecksumAccumulator.calculate

object FallWinterStringSummer extends App {
  for (season <- List("fall", "winter", "spring"))
    println(season + ": " + calculate(season))
}
```
