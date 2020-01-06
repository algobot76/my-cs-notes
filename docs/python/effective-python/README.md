# Effective Python (2nd Edition)

[[toc]]

## Pythonic Thinking

### Item 1: Know which version of Python you're using

Use the `--version` flag:

```bash
$ python --version
Python 2.7.10
```

```bash
$ python3 --version
Python 3.8.0
```

Use the `sys` module:

```python
import sys
print(sys.version_info)
print(sys.version)
```

### Item 2: Follow the PEP8 style guide

#### Whitespace

- Use spaces instead of tabs for indentation.
- Use four spaces for each level of syntactically significant indenting.
- Lines should be 79 characters in length or less.
- Continuations of long expressions onto additional lines should be indented by four extra spaces from their normal indentation level.
- In a file, functions and classes should be separated by two blank lines.
- In a class, methods should be separated by one blank line.
- In a dictionary, put no whitespace between each key and colon, and put a single space before the corresponding value if it fits on the same line.
- Put one—and only one—space before and after the = operator in a variable assignment.
- For type annotations, ensure that there is no separation between the variable name and the colon, and use a space before the type information.

#### Naming

- Functions, variables, and attributes should be in lowercase_underscore format.
- Protected instance attributes should be in _leading_underscore format.
- Private instance attributes should be in __double_leading_underscore format.
- Classes (including exceptions) should be in CapitalizedWord format.
- Instance methods in classes should use self, which refers to the object, as the name of the first parameter.
- Class methods should use `cls`, which refers to the class, as the name of the first parameter.

#### Expressions and Statements

- Use inline negation (`if a is not b`) instead of negation of positive expressions (`if not a is b)`.
- Don’t check for empty containers or sequences (like `[]` or `''`) by comparing the length to zero (`if len(somelist) == 0`). Use `if not somelist` and assume that empty values will implicitly evaluate to `False`.
- The same thing goes for non-empty containers or sequences (like `[1]` or '`hi'`). The statement `if somelist` is implicitly `True` for non-empty values.
- Avoid single-line `if` statements, `for` and `while` loops, and except compound statements. Spread these over multiple lines for clarity.
- If you can’t fit an expression on one line, surround it with parentheses and add line breaks and indentation to make it easier to read.
- Prefer surrounding multiline expressions with parentheses over using the `\` line continuation character.

#### Imports

- Always put `import` statements (including `from x import y`) at the top of a file.
- Always use absolute names for modules when importing them, not names relative to the current module’s own path. For example, to import the `foo` module from within the `bar` package, you should use `from bar import foo`, not just `import foo`.
- If you must do relative imports, use the explicit syntax `from . import foo`.
- Imports should be in sections in the following order: standard library modules, third-party modules, your own modules. Each subsection should have imports in alphabetical order.

### Item 3: Know the differences between `bytes` and `str`

`bytes` contain raw, unsigned 8-bit values; `str` contains Unicode code points.

Two helpers to convert `bytes` to `str` and vice versa:

```python
def to_str(bytes_or_str):
    if isinstance(bytes_or_str, bytes):
        value = bytes_or_str.decode('utf-8')
    else:
        value = bytes_or_str
    return value  # Instance of str
```

```python
def to_bytes(bytes_or_str):
    if isinstance(bytes_or_str, str):
        value = bytes_or_str.encode('utf-8')
    else:
        value = bytes_or_str
    return value  # Instance of bytes
```

`bytes` and `str` are not compatible with each other: you cannot use `+`, `>`, `<` and `==` between a `bytes` instance and a `str` instance.

`%` works with format strings for each type:

```python
print(b'red %s' % b'blue') # b'red blue'
print('red %s' % 'blue') # red blue
```

You can pass a `bytes` instance to a `str` format string using `%`:

```python
print('red %s' % b'blue') # red b'blue'
```

If you read/write data to/from a file, always open the file using a binary mode (`rb` or `wb`):

```python
with open('data.bin', 'wb') as f:
    f.write(b'\xf1\xf2\xf3\xf4\xf5')
```

```python
with open('data.bin', 'rb') as f:
    data = f.read()

assert data == b'\xf1\xf2\xf3\xf4\xf5'
```

If you read/write Unicode data to/from a file, pass the `encoding` parameter to `open`:

```python
with open('data.bin', 'r', encoding='cp1252') as f:
    data = f.read()

assert data == 'ñòóôõ'
```

- `cp1252` is a legacy Windows encoding

### Item 4: Prefer interpolated f-strings over C-style format strings and `str.format`

You can use dicts with C-style and `str.format`:

```python
old_template = (
    'Today\'s soup is %(soup)s, '
    'buy one get two %(oyster)s oysters, '
    'and our special entrée is %(special)s.')
old_formatted = template % {
    'soup': 'lentil',
    'oyster': 'kumamoto',
    'special': 'schnitzel',
}

new_template = (
    'Today\'s soup is {soup}, '
    'buy one get two {oyster} oysters, '
    'and our special entrée is {special}.')
new_formatted = new_template.format(
    soup='lentil',
    oyster='kumamoto',
    special='schnitzel',
)

assert old_formatted == new_formatted
```

Compare C-style, `str.format` and f-strings:

```python
for i, (item, count) in enumerate(pantry):
    old_style = '#%d: %-10s = %d' % (
        i + 1,
        item.title(),
        round(count))

    new_style = '#{}: {:<10s} = {}'.format(
        i + 1,
        item.title(),
        round(count))

   f_string = f'#{i+1}: {item.title():<10s} = {round(count)}'

   assert old_style == new_style == f_string
```

### Item 5: Write helper functions instead of complex expressions

- Write the repeated logic into helper functions.
- `if`/`else` is more readable than `or`/`and`.

### Item 6: Prefer multiple assignment unpacking over indexing

Unpacking allows assigning multiple values in a single statement:

```python
item = ('Peanut butter', 'Jelly')
first, second = item # Unpacking
print(first, 'and', second) # Peanut butter and Jelly
```

Unpacking can be used to swap indexes:

```python
def bubble_sort(a):
    for _ in range(len(a)):
        for i in range(1, len(a)):
            if a[i] < a[i-1]:
                a[i-1], a[i] = a[i], a[i-1] # Swap

names = ['pretzels', 'carrots', 'arugula', 'bacon']
bubble_sort(names)
print(names) # ['arugula', 'bacon', 'carrots', 'pretzels']
```

Unpacking can be used in `for` loops and similar constructs, such as comprehensions and generator expressions:

```python
for rank, (name, calories) in enumerate(snacks, 1):
    print(f'#{rank}: {name} has {calories} calories')
```

### Item 7: Prefer `enumerate` over `range`

Instead of using `range`:

```python
for i in range(len(flavor_list)):
    flavor = flavor_list[i]
    print(f'{i + 1}: {flavor}')
```

Use `enumerate`:

```python
for i, flavor in enumerate(flavor_list, 1):
    print(f'{i}: {flavor}')
```

### Item 8: Use `zip` to process iterators in parallel

Instead of using `range`:

```python
longest_name = None
max_count = 0

for i in range(len(names)):
    count = counts[i]
    if count > max_count:
       longest_name = names[i]
       max_count = count

print(longest_name)
```

Use `zip`:

```python
for name, count in zip(names, counts):
    if count > max_count:
        longest_name = name
        max_count = count
```

Use `itertools.zip_longest` when two lists do not have the same length.

### Item 9: Avoid `else` blocks after `for` and `while` loops

- The `else` block after a loop runs only if the loop body did not encounter a `break` statement.
- Avoid using `else` blocks after loops because their behavior is not intuitive and can be confusing.

### Item 10: Prevent repetition with assignment expressions

Instead of writing like this:

```python
def make_lemonade(count):
    ...
def out_of_stock():
    ...

count = fresh_fruit.get('lemon', 0)
if count:
    make_lemonade(count)
else:
    out_of_stock()
```

Use `:=`:

```python
if count := fresh_fruit.get('lemon', 0):
    make_lemonade(count)
else:
    out_of_stock()
```

Another example:

```python
bottles = []
while True:                    # Loop
    fresh_fruit = pick_fruit()
    if not fresh_fruit:        # And a half
        break

    for fruit, count in fresh_fruit.items():
        batch = make_juice(fruit, count)
        bottles.extend(batch)
```

```python
bottles = []
while fresh_fruit := pick_fruit():
    for fruit, count in fresh_fruit.items():
        batch = make_juice(fruit, count)
        bottles.extend(batch)
```
