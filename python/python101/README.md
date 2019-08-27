# Python 101

## Chapter 2. All About Strings

- `str()` converts to string
- A string is immutable.
- `+` concatenates strings.
- `lower()`, `upper()`, `strip()`, `capitalize()`
  - `lower()` converts to lowercase.
  - `upper()` converts to uppercase.
  - `strip()` removes leading and trailing white spaces.
  - `capitalize()` capitalizes a string.
- `[<start>:<end>]` used for string slicing.
- string formatting
  - `"I like %s" % "Python"`
  - `"Python is as simple as {0}, {1}, {2}".format("a", "b", "c")`

## Chapter3. Lists, Tuples, and Dictionaries

### Lists

- Create an empty list.

```python
my_list = []
```

or

```python
my_list = list()
```

- Initialize a list with values.

```python
my_list = [1, 2, 3]
my_list2 = ["a", "b", "c"]
my_list3 = ["a", 1, "Python", 5]
my_nested_list = [my_list, my_list2]
```

- Combine lists.

```python
my_list = [1, 2, 3]
my_list2 = ["a", "b", "c"]
combo_list = my_list.extend(my_list2)
```

or

```python
my_list = [1, 2, 3]
my_list2 = ["a", "b", "c"]
combo_list = my_list + my_list2
```

- Sort a list.

```python
alpha_list = [34, 23, 67, 100, 88, 2]
alpha_list.sort() // [2, 23, 34, 67, 88, 100]
```

_Note_: `sort()` is in-place

### Tuples

- Define a tuple and create a slice of it.

```python
my_tuple = (1, 2, 3, 4, 5)
my_tuple[0:3] // (1, 2, 3)
```

- Convert a tuple to a list.

```python
my_list = list(my_tuple)
```

### Dictionaries

- Define a dictionary.

```python
my_dict = {}
another_dict = dict()
my_other_dict = {
    "one":1,
    "two":2,
    "three":3
}
```

- Access a value in a dictionary.

```python
my_other_dict["one"]
```

- Check if a key exists.

```python
<key> in my_other_dict
```

- Get a list of keys.

```python
my_other_dict.keys()
```

## Chapter4. Conditional Statements

### The if statement

```python
if value < 10:
    print("That's a great deal!")
elif 10 <= value <= 20:
    print("I'd still pay that...")
else:
    print("Wow! That's too much!")
```

### Boolean

- `or`, `and`, `not`

### Special characters

- `\n` is a new line.
- `\t` is a new tab.
- Use `\` to escape a character.

### `if __name__ = "__main__"`

- Run this program if this python file is run as a standalone file.

## Chapter 7. Exception Handling

```python
my_dict = {"a":1, "b":2, "c":3}

try:
    value = my_dict["d"]
except KeyError
    print("A KeyError occured!")
else:
    print("No error occurred!")
finally:
    print("The finally statement has executed!")
```

## Chapter 10. Functions

### An Empty Function (the stub)

```python
def empty_function():
    pass
```

### Passing Arguments to a Function

```python
def add(a, b):
    return a + b
```

or

```python
# with default values
def add(a=2, b=3):
    return a + b
```

### Keyword Arguments

```python
def keyword_function(a=1, b=2):
    return a + b

keyword_function(b=4, a=5) # 9
```

### `*args` and `**kwargs`

- `*args`: infinite arguments
- `**kwargs`: infinite keyword arguments

## Chapter 11. Classes

### Create a class

```python
class Vehicle:
    """docstring"""


    def __init__(self, color, doors, tires, vtype):
        """Constructor"""
        self.color = color
        self.doors = doors
        self.tires = tires
        self.vtype = vtype


    def brake(self):
        """
        Stop the car
        """
        return "%s braking" % self.vtype


    def drive(self):
        """
        Drive the car
        """
        return "I'm driving a %s %s!" % (self.color, self.vtype)


if __name__ == "__main__":
    car = Vehicle("blue", 5, 4, "car")
    print(car.brake())
    print(car.drive())
    truck = Vehicle("red", 3, 6, "truck")
    print(truck.drive())
    print(truck.brake())
```

### Subclasses

```python

class Car(Vehicle):
    """
    The Car class
    """


    def brake(self):
        """
        Override brake method
        """
        return "The car class is breaking slowly!"


if __name__ == "__main__":
    car = Car("yellow", 2, 4, "car")
    car.brake()
    'The car class is breaking slowly!'
    car.drive()
    "I'm driving a yellow car
```

## Chapter 12. Introspection

- `type()` tells the type of a variable/value.
- `dir()` tells the methods and attributes of an object.
- `help()` calls the help utility in a Python shell.

## Chapter 16. The os Module

- `os.name` tells info about the platform you are running on.
- `os.environ` returns a dict of environmental variables.
- `os.getenv()` gets the value of an environment variable.
- `os.putenv()` sets the value of an environment variable.
- `os.chdir()` changes the current directory.
- `os.getcwd()` gets the current directory.
- `os.mkdir()` creates a single directory.
- `os.mkdirs()` creates intermediate directories.
- `os.remove()` deletes a file.
- `os.rmdir()` deletes a directory.
- `os.rename()` renames a file/directory.
- `os.startfile()` starts a file with its associated program.
- `os.walk()` gives a way to iterate over a root level path.
- `os.path`
  - `os.path.basename()` returns the filename of a path.
  - `os.path.dirname()` returns the directory portion of a path.
  - `os.path.exists()` checks if a path exists.
  - `os.path.isdir()` / `os.path.isfile()` checks if a path is a directory/file.
  - `os.path.join()` joins one or more path components together.
  - `os.path.split()` splits a path into a tuple that contains the directory and the file.

## Chapter 21. The Threading module

### Writing a Threaded Downloader

```python
import os
import urllib.request

from threading import Thread

class DownloadThread(Thread):
  """
  A threading example that can download a file
  """

  def __init__(self, url, name):
    """Initialize the thread"""
    Thread.__init__(self)
    self.name = name
    self.url = url

  def run(self):
    """Run the thread"""
    handle = urllib.request.urlopen(self.url)
    fname = os.path.basename(self.url)
    with open(fname, "wb") as f_handler:
      while True:
        chunk = handle.read(1024)
        if not chunk:
          break
        f_handler.write(chunk)
    msg = "%s has finished downloading %s!" % (self.name, self.url)
    print(msg)

def main(urls):
  """
  Run the program
  """
  for item, url in enumerate(urls):
    name = "Thread %s" % (item+1)
    thread = DownloadThread(url, name)
    thread.start()

if __name__ == "__main__":
  urls = ["http://www.irs.gov/pub/irs-pdf/f1040.pdf",       "http://www.irs.gov/pub/irs-pdf/f1040a.pdf", "http://www.irs.gov/pub/irs-pdf/f1040ez.pdf", "http://www.irs.gov/pub/irs-pdf/f1040es.pdf", "http://www.irs.gov/pub/irs-pdf/f1040sb.pdf"]
  main(urls)
```

### Using Queues

```python
import os
import threading
import urllib.request

from queue import Queue

class Downloader(threading.Thread):
    """Threaded File Downloader"""

    def __init__(self, queue):
        """Initialize the thread"""
        threading.Thread.__init__(self)
        self.queue = queue

    def run(self):
        """Run the thread"""
        while True:
            # gets the url from the queue
            url = self.queue.get()

            # download the file
            self.download_file(url)

            # send a signal to the queue that the job is done
            self.queue.task_done()

    def download_file(self, url):
        """Download the file"""
        handle = urllib.request.urlopen(url)
        fname = os.path.basename(url)
        with open(fname, "wb") as f:
            while True:
                chunk = handle.read(1024)
                if not chunk: break
                f.write(chunk)

def main(urls):
    """
    Run the program
    """
    queue = Queue()

    # create a thread pool and give them a queue
    for i in range(5):
        t = Downloader(queue)
        t.setDaemon(True)
        t.start()

    # give the queue some data
    for url in urls:
        queue.put(url)

    # wait for the queue to finish
    queue.join()

if __name__ == "__main__":
    urls = ["http://www.irs.gov/pub/irs-pdf/f1040.pdf",
            "http://www.irs.gov/pub/irs-pdf/f1040a.pdf",
            "http://www.irs.gov/pub/irs-pdf/f1040ez.pdf",
            "http://www.irs.gov/pub/irs-pdf/f1040es.pdf",
            "http://www.irs.gov/pub/irs-pdf/f1040sb.pdf"]
    main(urls)
```

## Chapter 22. Working with Dates and Time

### The `datetime` Module

- `datetime.date()` accepts year, month, day.
- `datetime.datetime()` accepts year, month, day, hour, minute, second.
  - `strftime()` creates human-readable string of time.
- `datetime.timedelta()` represents a time duration.

### The `time` Module

- `time.ctime()` converts a time in seconds since the epoch to a string representing local time.
- `time.sleep()` suspends program execution for a given number of seconds.
- `time.strftime()` accepts a `struct_time` object and returns a human-readable string of time.
- `time.time()`returns the time in seconds since the epoch as a floating point number.

## Chapter 25. Decorators

A decorator is a function that accepts another function as an argument and returns a modified version of it.

```python
def bar(func):
  def wrapper():
    val = "The result of %s is %s" % (func(), eval(func()))
    return val
  return wrapper

@bar
def foo():
  return "1+1"

if __name__ == "__main__":
    print(foo()) # The result of 1+1 is 2
```

## Chapter 26. The Lambda

Lambda is an anonymous or unbound function.

```python
import math

square_rt = lambda x: math.sqrt(x)
```
