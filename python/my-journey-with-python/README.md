# My Journey with Python

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

## Misc

### Use `==` to compare two dictionaries

The `==` operator recursively checks each key and each value.

References:

- [What does the == operator actually do on a Python dictionary?](https://stackoverflow.com/questions/17217225/what-does-the-operator-actually-do-on-a-python-dictionary)
