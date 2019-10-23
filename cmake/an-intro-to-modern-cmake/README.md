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
