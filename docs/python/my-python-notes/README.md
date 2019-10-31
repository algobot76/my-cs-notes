# My Python Notes

[[toc]]

## Built-in Functions

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

## Tox

### Tox config in the Pallets projects

#### Flask

```ini
[tox]
envlist =
    py{37,36,35,27,py3,py}
    py37-{simplejson,devel,lowest}
    docs-html
    coverage

[testenv]
passenv = LANG
deps =
    pytest
    coverage
    greenlet
    blinker
    python-dotenv

    lowest: Werkzeug==0.15
    lowest: Jinja2==2.10
    lowest: itsdangerous==0.24
    lowest: Click==5.1

    devel: https://github.com/pallets/werkzeug/archive/master.tar.gz
    devel: https://github.com/pallets/markupsafe/archive/master.tar.gz
    devel: https://github.com/pallets/jinja/archive/master.tar.gz
    devel: https://github.com/pallets/itsdangerous/archive/master.tar.gz
    devel: https://github.com/pallets/click/archive/master.tar.gz

    simplejson: simplejson

commands =
    # the examples need to be installed to test successfully
    pip install -q -e examples/tutorial[test]
    pip install -q -e examples/javascript[test]

    # pytest-cov doesn't seem to play nice with -p
    coverage run -p -m pytest --tb=short -Werror {posargs:tests examples}

[testenv:nightly]
# courtesy Python nightly test, don't fail the build in CI
ignore_outcome = true
commands =
    pip install -q -e examples/tutorial[test]
    pip install -q -e examples/javascript[test]
    coverage run -p -m pytest --tb=short -Werror --junitxml=test-results.xml {posargs:tests examples}

[testenv:stylecheck]
deps = pre-commit
skip_install = true
commands = pre-commit run --all-files --show-diff-on-failure

[testenv:docs-html]
deps =
    -r docs/requirements.txt
commands = sphinx-build -W -b html -d {envtmpdir}/doctrees docs {envtmpdir}/html

[testenv:coverage]
deps = coverage
skip_install = true
commands =
    coverage combine
    coverage html
    coverage report

[testenv:coverage-ci]
deps = coverage
skip_install = true
commands =
    coverage combine
    coverage xml
    coverage report
```

#### Jinja

```ini
[tox]
envlist =
    py{37,36,35,27,py3,py}
    docs-html
    coverage
skip_missing_interpreters = true

[testenv]
deps =
    coverage
    pytest
commands = coverage run -p -m pytest --tb=short -Werror --basetemp={envtmpdir} {posargs}

[testenv:docs-html]
deps =
    Sphinx
    Pallets-Sphinx-Themes
    sphinxcontrib-log-cabinet
    sphinx-issues
commands = sphinx-build -b html -d {envtmpdir}/doctrees docs {envtmpdir}/html

[testenv:coverage]
deps = coverage
skip_install = true
commands =
    coverage combine
    coverage html
    coverage report

[testenv:coverage-ci]
deps = coverage
skip_install = true
commands =
    coverage combine
    # Ignoring errors because 2.7.15 and 3.5.5 on Azure can't parse async files.
    coverage xml --ignore-errors
```

#### Werkzeug

```ini
[tox]
envlist =
    py{37,36,35,27,py3,py}
    style
    docs-html
    coverage
skip_missing_interpreters = true

[testenv]
deps =
    coverage
    pytest
    pytest-timeout
    pytest-xprocess
    requests
    requests_unixsocket
    cryptography
    greenlet
    watchdog
commands = coverage run -p -m pytest --tb=short --basetemp={envtmpdir} {posargs}

[testenv:style]
deps = pre-commit
skip_install = true
commands = pre-commit run --all-files --show-diff-on-failure

[testenv:docs-html]
deps =
    Sphinx
    Pallets-Sphinx-Themes
    sphinx-issues
commands = sphinx-build -W -b html -d {envtmpdir}/doctrees docs {envtmpdir}/html

[testenv:coverage]
deps = coverage
skip_install = true
commands =
    coverage combine
    coverage html
    coverage report

[testenv:coverage-ci]
deps = coverage
skip_install = true
commands =
    coverage combine
    coverage xml
    coverage report
```

#### Click

```ini
[tox]
envlist =
    py{37,36,35,27,py3,py}
    docs
    coverage
skip_missing_interpreters = true

[testenv]
deps =
    pytest
    coverage
    colorama
commands = coverage run -p -m pytest --tb=short -Werror --basetemp={envtmpdir} {posargs}

[testenv:docs]
deps = -r docs/requirements.txt
commands = sphinx-build -W -b html -d {envtmpdir}/doctrees docs {envtmpdir}/html

[testenv:coverage]
deps = coverage
skip_install = true
commands =
    coverage combine
    coverage html
    coverage report

[testenv:coverage-ci]
deps = codecov
skip_install = true
commands =
    coverage combine
    coverage xml
```

#### ItsDangerous

```ini
[tox]
envlist =
    py{37,36,35,27,py3,py}
    style
    docs
    coverage
skip_missing_interpreters = true

[testenv]
deps =
    coverage
    pytest
    freezegun
commands = coverage run -p -m pytest -Werror --tb=short --basetemp={envtmpdir} {posargs}

[testenv:style]
deps = pre-commit
skip_install = True
commands = pre-commit run --all-files --show-diff-on-failure

[testenv:docs-html]
deps = -r docs/requirements.txt
commands = sphinx-build -W -b html -d {envtmpdir}/doctrees docs {envtmpdir}/html

[testenv:coverage]
deps = coverage
skip_install = true
commands =
    coverage combine
    coverage html
    coverage report

[testenv:coverage-ci]
deps = coverage
skip_install = true
commands =
    coverage combine
    coverage xml
```

#### MarkupSafe

```ini
tox]
envlist =
    py{37,36,35,34,27,py3,py3,py}
    stylecheck
    docs-html
    coverage-report
skip_missing_interpreters = true

[testenv]
setenv =
    COVERAGE_FILE = .coverage.{envname}
deps =
    pytest-cov
commands = pytest --tb=short --cov --cov-report= {posargs}

[testenv:stylecheck]
deps = pre-commit
skip_install = true
commands = pre-commit run --all-files --show-diff-on-failure

[testenv:docs-html]
deps = -r docs/requirements.txt
commands = sphinx-build -W -b html -d {envtmpdir}/doctrees docs {envtmpdir}/html

[testenv:coverage-report]
setenv =
    COVERAGE_FILE = .coverage
deps = coverage
skip_install = true
commands =
    coverage combine
    coverage html
    coverage report

[testenv:codecov]
passenv = CI TRAVIS TRAVIS_*
setenv =
    COVERAGE_FILE = .coverage
deps = codecov
skip_install = true
commands =
    coverage combine
    codecov
    coverage report
```

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

## Mocking

### `.configure_mock()`

`.cofigure_mock` changes an existing `Mock`. The configurable values include `.side_effect`, `.return_value`, and `.name`.

```python
# Verbose, old Mock
response_mock = Mock()
response_mock.json.return_value = {
    '12/25': 'Christmas',
    '7/4': 'Independence Day',
}

# Shiny, new .configure_mock()
holidays = {'12/25': 'Christmas', '7/4': 'Independence Day'}
response_mock = Mock(**{'json.return_value': holidays})
```

### `patch()`

`patch()` looks up an object in a given module and replaces that object with a `Mock`.

#### `patch()` as a decorator

```python
import unittest
from my_calendar import get_holidays
from requests.exceptions import Timeout
from unittest.mock import patch

class TestCalendar(unittest.TestCase):
    @patch('my_calendar.requests')
    def test_get_holidays_timeout(self, mock_requests):
            mock_requests.get.side_effect = Timeout
            with self.assertRaises(Timeout):
                get_holidays()
                mock_requests.get.assert_called_once()

if __name__ == '__main__':
    unittest.main()
```

#### `patch()` as a context manager

```python
import unittest
from my_calendar import get_holidays
from requests.exceptions import Timeout
from unittest.mock import patch

class TestCalendar(unittest.TestCase):
    def test_get_holidays_timeout(self):
        with patch('my_calendar.requests') as mock_requests:
            mock_requests.get.side_effect = Timeout
            with self.assertRaises(Timeout):
                get_holidays()
                mock_requests.get.assert_called_once()

if __name__ == '__main__':
    unittest.main()
```

#### Patching an object's attributes

`patch.object()` mocks one method of an object instead of the entire object.

```python
import unittest
from my_calendar import requests, get_holidays
from unittest.mock import patch

class TestCalendar(unittest.TestCase):
    @patch.object(requests, 'get', side_effect=requests.exceptions.Timeout)
    def test_get_holidays_timeout(self, mock_requests):
            with self.assertRaises(requests.exceptions.Timeout):
                get_holidays()

if __name__ == '__main__':
    unittest.main()
```

### References

- [Understanding the Python Mock Object Library](https://realpython.com/python-mock-library/)

## Misc

### Use `==` to compare two dictionaries

The `==` operator recursively checks each key and each value.

References:

- [What does the == operator actually do on a Python dictionary?](https://stackoverflow.com/questions/17217225/what-does-the-operator-actually-do-on-a-python-dictionary)

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
