# My Python Notes

[[toc]]

## Built-in Functions

### `getattr`

We can use `getattr` to access an attribute with a dynamic variable.

```python
somevar = 'foo'
getattr(x, somevar)
```

References:

- [Why use setattr() and getattr() built-ins?](https://stackoverflow.com/a/19123719)

## Type Checking

### Check if an object is a number

Check if the object is an instance of `numbers.Number`.

_Note_:

```python
isinstance(True, numbers.Number) # True
```

References:

- [How can I check if my python object is a number? [duplicate]
](https://stackoverflow.com/questions/4187185/how-can-i-check-if-my-python-object-is-a-number)

### Check if an object is a dict

```python
from collections.abc import Mapping

foo = dict()
isinstance(foo, Mapping)
```

References:

- [How to check if a variable is a dictionary in Python? [duplicate]](https://stackoverflow.com/questions/25231989/how-to-check-if-a-variable-is-a-dictionary-in-python)

## Magic Methods

### `__new__`

The magic method `__new__` has the following use cases:

- create a singleton pattern
- dynamically extend classes from external modules without editing the source
- and more ...

References:

- [Official Documentation](https://docs.python.org/3.7/reference/datamodel.html#object.__new__)
- [What are the use cases for Python's `__new__`?
](https://stackoverflow.com/questions/12835176/what-are-the-use-cases-for-pythons-new)
- [Cast base class to derived class python (or more pythonic way of extending classes)](https://stackoverflow.com/questions/3464061/cast-base-class-to-derived-class-python-or-more-pythonic-way-of-extending-class/4714744#4714744)

### `__init__` vs. `__call__`

```python
class Foo:
    def __init__(self, a, b, c):
        # ...

x = Foo(1, 2, 3) # __init__
```

```python
class Foo:
    def __call__(self, a, b, c):
        # ...

x = Foo()
x(1, 2, 3) # __call__
```

- `__init__` initializes an instance.
- `__call_` makes an instance callable.

#### References

- [What is the difference between `__init__` and `__call__`?](https://stackoverflow.com/questions/9663562/what-is-the-difference-between-init-and-call)

## Built-in Types

### Use `==` to compare two dictionaries

The `==` operator recursively checks each key and each value.

#### References

- [What does the == operator actually do on a Python dictionary?](https://stackoverflow.com/questions/17217225/what-does-the-operator-actually-do-on-a-python-dictionary)

## `heapq`

### Heapify a list of objects

- Method 1: Define `__lt__` magic method.
- Method 2: Use tuples as elements in a heap.

#### References

- [How to heapify by field from custom objects](https://stackoverflow.com/questions/11989178/how-to-heapify-by-field-from-custom-objects)

## Flask

### Use a logger in a flask blueprint

```python
from flask import current_app


current_app.logger.info('grolsh')
```

or

```python
# core.py
from werkzeug.local import LocalProxy
from flask import current_app

logger = LocalProxy(lambda: current_app.logger)


# views.py
from core import logger

@mod.route("/")
def index():
    logger.info("serving index")
```

References:

- [In Flask: How to access app Logger within Blueprint
](https://stackoverflow.com/questions/16994174/in-flask-how-to-access-app-logger-within-blueprint)

## Misc

### Execute `main()` in `__main__`

```python
def main():
    try:
        doSomething()
        return 0
    except:
        return 1


if __name__ == "__main__":
    exit (main())
```

#### References

- [What does this mean exit (main())](https://stackoverflow.com/questions/5280203/what-does-this-mean-exit-main)

### Only call a function once

```python
from functools import wraps


def run_once(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not wrapper._called:
            wrapper._called = True
            return func(*args, **kwargs)
    wrapper._called = False
    return wrapper

@run_once
def foo():
    print('foo')

foo()
foo()
```
