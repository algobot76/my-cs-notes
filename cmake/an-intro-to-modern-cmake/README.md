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
