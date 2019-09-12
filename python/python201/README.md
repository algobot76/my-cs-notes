# Python 201

## Part I - The Intermediate Modules

### Chapter 2 - The collections module

#### ChainMap

A `ChainMap` links multiple mappings together such that they end up being a single unit.

```python
from collections import ChainMap


car_parts = {'hood': 500, 'engine': 5000, 'front_door': 750}
car_options = {'A/C': 1000, 'Turbo': 2500, 'rollbar': 300}
car_accessories = {'cover': 100, 'hood_ornament': 150, 'seat_cover': 99}
car_pricing = ChainMap(car_parts, car_options, car_accessories)
print(car_pricing['hood'])
print(car_pricing['Turbo'])
```

#### Counter

A `Counter` provides some useful methods:

- `elements` returns an iterator over the elements that are in the dictionary, but in an arbitrary order.
- `most_common` returns the top most common `n` items.
- `substract` accepts an iterable or mapping and the uses that argument to subtract.

```python
from collections import Counter


counter = Counter('superfluous')
other_counter = Counter('super')

print(counter['u'])
print(list(counter.elements()))
print(counter.most_common(2))

counter.subtract(other_counter)
print(counter)
```

#### defaultdict

`defaultdict` assigns a zero value to any key it doesn't already have in it.

```python
from collections import defaultdict


sentence = 'The red for jumped over the fence and ran to the zoo for food'
words = sentence.split(' ')
d = defaultdict(int)
for word in words:
    d[word] += 1

print(d)
```

#### deque

`deque` is a double-ended queue, which is thread-safe and supports efficient appends and pops from either side of the `deque`. It access a `maxlen` argument which sets the bounds for the `deque`. Learn more about `deque`[here](https://docs.python.org/3.7/library/collections.html#collections.deque).

#### namedtuple

`namedtuple` returns a subclass of `tuple` with named fields.

```python
from collections import namedtuple


Parts = namedtuple('Parts', 'id_num desc cost amount')
auto_parts = Parts(id_num='1234', desc='Ford Engine', cost=1200.00, amount=10)
print(auto_parts)
```

```python
from collections import namedtuple


Parts = {'id_num':'1234', 'desc':'Ford Engine', 'cost':1200.00, 'amount':10}
parts = namedtuple('Parts', Parts.keys())(**Parts)
print(parts)
```

#### OrderedDict

`OrderedDict` keeps track of the order of the keys as they are added. Learn more about `OrderedDict` [here](https://docs.python.org/3.7/library/collections.html#collections.OrderedDict).

### Chapter 7. Iterators and Generators

#### Iterators

An iterator is an object that will allow you to iterate over a container. It is implemented via two distinct methods: `__iter__` and `__next__`.

- `__iter__` provides iteration support.
- `__next__` returns the next item in the container.

Iterable is an object that has `__iter__` defined; Iterator is an object has has both `__iter__` and `__next__` defined.

```python
my_list = [1, 2, 3] # list is an iterable not an iterator
for num in my_list:
    print(num)

# make it an iterator
my_iter = iter(my_list)
print(next(my_iter))
print(next(my_iter))
print(next(my_iter))
```

Create a custom iterator:

```python
class Doubler:
    def __init__(self):
        self.number = 0

    def __iter__(self):
        return self

    def __next__(self):
        self.number += 1
        return self.number * self.number

d = Doubler()
count = 0
for num in d:
    print(num)
    if count > 10:
        break
    count += 1
```

#### Generators

A generator works by "saving" where it last left off (or yielding) and giving the calling function  a value. It returns a `StopIteration`, if it has been exhausted. It can be used together with the `for ... in ..` syntax.

```python
def doubler_generator():
    number = 2
    while True:
        yield number
        number *= number

d = doubler_generator()
print(next(d))
print(next(d))
print(next(d))
```

```python
def string_generator():
    yield 'Python'
    yield 'rocks'
    yield 'so do you!'

sg = string_generator()
for s in sg:
    print(s)
```
