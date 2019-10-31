# Python Tricks

## 2. Patterns for Cleaner Python

### 2.4 Underscores, Dunders, and More

- `_var` indicates a variable or method is intended for internal use.
  - A wildcard import doesn't import `_var`.
- `var_` is used to avoid naming conflicts.
- `__var` is rewritten by Python interpreter in order to avoid naming conflicts in subclasses (name mangling).
- `__var__` is called a magic method.
- `_` indicates that a variable is temporary or insignificant.
