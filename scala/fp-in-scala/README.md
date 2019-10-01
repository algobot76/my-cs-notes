# Functional Programming in Scala

## 1. What is functional programming?

FP is based on the premise that we construct programs with pure functions (functions with no side effects).

Side effects are:

- Modifying a variable
- Modifying a data structure in place
- Setting a field on an object
- Throwing an exception or halting with an error
- Printing to the console or reading user input
- Reading from or writing to a file
- Drawing on the screen

---

An example with side effects:

```scala
class Cafe {
  def buyCoffee(cc: CreditCard): Coffeee = {
    val cup = new Coffee()
    cc.charge(cup.price)
    cup
  }
}
```

or

```scala
class Cafe {
  def buyCoffee(cc: CreditCard, p: Payments): Coffee = {
    val cup = new Coffe()
    p.charge(cc, cup.price)
    cup
  }
}
```

- Charging a credit card involves some interaction with the outside world => side effect
- Difficult to test
- Difficult to reuse

An example without side effects:

```scala
class Cafe {
  def buyCoffee(cc: CreditCard): (Coffee, Charge) = {
    val cup = new Coffee()
    (cup, Charge(cc, cup.price))
  }

  def buyCoffees(cc: CreditCard, n: Int): (List[Coffee], Charge) = {
    val purchases: List[(Coffee, Charge)] = List.fill (n) (buyCoffee(cc))
    val (coffees, charges) = purchases.unzip
    (coffees, charges.reduce((c1, c2) => c1.combine(c2)))
  }
}

case class Charge(cc: CreditCard, amount: Double) {
  def combine(other: Charge): Charge =
    if (cc == other.cc)
      Charge(cc, amount + other.amount)
    else
      throw new Exception("Can't combine charges to different cards")
}
```

- Doesn't contact the credit card company
- Easy to reuse
- Able to test without mocks

Also, it is to assemble business logic around charges

```scala
def coalesce(charges: List[Charge]): List[Charge] =
  charges.groupBy(_.cc).values.map(_.reduce(_ combine _)).toList
```

---

A function `f` with input type `A` and output type `B` is a computation that relates every value `a` of type `A` to exactly one value `b` of type `B` such that `b` is determined solely by the value of `a`.

Referential transparency (RT) is a property of expression in general and not just functions. An expression is RT referentially transparent if it can be replaced by its result without changing the meaning of the program. A function is pure if calling it with RT arguments is also RT.
