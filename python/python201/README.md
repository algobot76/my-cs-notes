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

### Chapter 4 - The functools modules

#### Caching with functools.lru_cache

`lru_cache` wraps a function with a memoizing callable that saves up to the `maxsize` most recent calls.

#### functools.partial

`partial` creates a new function with partial application of the arguments and keywords that you pass to it.

```python
from functools import partial


def add(x, y):
    return x + y

add_two = partial(add, 2)
print(add_two(3))
```

#### Function Overloading with functools.singledispatch

`singledispatch` transforms a regular function into a single dispatch generic function. Note that `singledispatch`  only happens based on the first argument's type.

#### functools.wraps

`wraps` fixes docstrings and names of decorated functions.

### Chapter 7 - Iterators and Generators

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

### Chapter 8 - The itertools Module

#### count(start=0, step=1)

`count` returns evenly spaced values starting with the number you pass in as its `start` parameter. It also accepts a `step` parameter.

```python
from itertools import count


for i in count(10):
    if i > 20:
        break
    else:
        print(i)
```

or

```python
from itertools import count
from itertools import islice


for i in islice(count(10), 20):
    if i > 20:
        break
    else:
        print(i)
```

#### cycle(iterable)

`cycle` creates an iterator that cycles through a series of values infinitely.

```python
from itertools import cycle


for letter in cycle('abc'):
    print(letter)
```

#### repeat(object)

`repeat` returns the same object over and over again unless you specify the `times` parameter.

#### accumulate(iterable)

`accumulate` returns accumulated sums or the accumulated results of a two argument function that you can pass to `accumulate`.

```python
from itertools import accumulate
from operator import mul


print(list(accumulate(range(1,5), mul)))
```

#### chain(*iterables)

`chain` takes a series of iterables and basically flatten them down into one long iterable.

```python
from itertools import chain


my_list = list(chain(['foo', 'bar'],[1, 2, 3]))
print(my_list)
```

#### chain.from_iterable(iterable)

Similar to `chain`, but it accepts a nested list instead.

```python
from itertools import chain


my_list = list(chain.from_iterable(['hello', list(range(5))]))
print(my_list)
```

#### compress(data, selectors)

`compress` filters the first iterable with the second.

```python
from itertools import compress


letters = 'ABCDEFG'
bools = [True, False, True, True, False]
print(list(compress(letters, bools)))
```

#### dropwhile(predicate, iterable)

`dropwhile` drops elements as long as the filter criteria is `True`.

```python
from itertools import dropwhile


print(list(dropwhile(lambda x: x<5, [1, 4, 6, 4, 1])))
```

#### filterfalse(predicate, iterable)

`filterfalse` only returns those values that evaluated to `False`.

```python
from itertools import filterfalse


print(list(filterfalse(lambda x: x<5, [1, 4, 6, 4, 1])))
```

#### groupby(iterable, key=None)

`groupby` returns consecutive keys and groups from your iterable.

```python
from itertools import groupby


vehicles = [('Ford', 'Taurus'), ('Dodge', 'Durango'),
            ('Chevrolet', 'Cobalt'), ('Ford', 'F150'),
            ('Dodge', 'Charger'), ('Ford', 'GT')]

sorted_vehicles = sorted(vehicles)

for key, group in groupby(sorted_vehicles, lambda make: make[0]):
    for make, model in group:
        print('{model} is made by {make}'.format(model=model,
                                                 make=make))
        print ("**** END OF GROUP ***\n")
```

#### islice(iterable, start, stop)

`islice` returns selected elements from the iterable.

```python
from itertools import count
from itertools import islice


for i in islice(count(), 3, 15):
    print(i)
```

#### starmap(function, iterable)

`starmap` creates an iterator that can compute using the function and iterable provided.

```python
from itertools import starmap
from operator import add


for item in starmap(add, [(2, 3), (4, 5)]):
    print(item)
```

#### takewhile(predicate, iterable)

`takewhile` is the opposite of `dropwhile`.

```python
from itertools import takewhile


print(list(takewhile(lambda x: x<5, [1, 4, 6, 4, 1])))
```

#### tee(iterable, n=2)

`tee` creates `n` iterators from a single iterable.

#### zip_longest(*iterables, fillvalue=None)

`zip_longest` can zip two iterables together. If the iterables do not have the same lenght, you can also specify a `fillvalue`.

```python
from itertools import zip_longest


for item in zip_longest('ABCD', 'xy', fillvalue='BLANK'):
    print(item)
```

#### combinations(iterable, r)

`combinations` creates an iterator from an iterable that is some length long. `combinations` does not produce repeat values if all the input elements are unique.

```python
from itertools import combinations


print(list(combinations('WXYZ', 2)))
```

#### combinations_with_replacement(iterable, r)

```python
from itertools import combinations_with_replacement


print(list(combinations_with_replacement('WXYZ', 2)))
```

#### product(*iterables, repeat=1)

`product` creates Cartesian products fro a series of input iterables.

```python
from itertools import product


arrays = [(-1, 1), (-3, 3), (-5, 5)]
print(list(product(*arrays)))
```

#### permutations

`permutations` return successive `r` length permutations of elements from an iterable.

```python
from itertools import permutations


print(list(permutations('WXYZ', 2)))
```
