# An Introduction to Modern CMake

## Do's and Don'ts

### CMake Anti-patterns

- Do not use global functions.
- Don't add unneeded PUBLIC requirements.
- Don't GLOB files.
- Link to built files directly.
- Never skip PUBLIC/PRIVATE when linking.

### CMake Patterns

- Treat CMake as code.
- Think in targets.
- Export your interface.
- Write a Config.cmake file.
- Make ALIAS targets to keep usage consistent.
- Combine common functionality into clearly documented functions or macros.
- Use lowercase function names.
- Use `cmake_policy` and/or range of versions.

## Introduction to the Basics

```cmake
cmake_minimum_required(VERSION 3.8)

project(Calculator LANGUAGES CXX)

add_library(calclib STATIC src/calclib.cpp include/calc/lib.hpp)
target_include_directories(calclib PUBLIC include)
target_compile_features(calclib PUBLIC cxx_std_11)

add_executable(calc apps/calc.cpp)
target_link_libraries(calc PUBLIC calclib)
```

- `add_library` supports `STATIC`, `SHARED`, or `MODULE`.
  - For a header-only library, use `INTERFACE`.

### Variables and the Cache

Set a variable:

```cmake
set(MY_VARIABLE "value")
```

```cmake
set(MY_LIST "one" "two")
```

Use `${}` syntax to access a variable.

### Control Flow

```cmake
if("${variable}")
    # True if variable is not false-like
else()
    # Note that undefined variables would be `""` thus false
endif()
```

### Macros and Functions

- Macros don't have a scope.
- To make a variable in a function visible from outside, use `PARANT_SCOPE`.

```cmake
function(SIMPLE REQUIRED_ARG)
    message(STATUS "Simple arguments: ${REQUIRED_ARG}, followed by ${ARGV}")
    set(${REQUIRED_ARG} "From SIMPLE" PARENT_SCOPE)
endfunction()

simple(This)
message("Output: ${This}")
```

### How to Structure Your Project

```
- project
  - .gitignore
  - README.md
  - LICENCE.md
  - CMakeLists.txt
  - cmake
    - FindSomeLib.cmake
    - something_else.cmake
  - include
    - project
      - lib.hpp
  - src
    - CMakeLists.txt
    - lib.cpp
  - apps
    - CMakeLists.txt
    - app.cpp
  - tests
    - CMakeLists.txt
    - testlib.cpp
  - docs
    - CMakeLists.txt
  - extern
    - googletest
  - scripts
    - helper.py
```
