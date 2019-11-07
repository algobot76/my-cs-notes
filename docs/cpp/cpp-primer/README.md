# C++ Primer

[[toc]]

## Chapter 1 Getting Started

<!-- TODO: Add more contents of CH1 -->

::: tip  Defined Terms

- __argument__: Value passed to a function.
- __assignment__: Obliterates an object's current value and replaces that value by a new one.
- __block__: Sequence of zero or more statements enclosed in curly braces.
- __buffer__: A region of storage used to hold data. IO facilities often store input (or output) in a buffer and read or write the buffer independently from actions in the program. Output buffers can be explicitly flushed to force the buffer to be written. By default, reading `cin` flushes `cout`; `cout` is also flushed when the program ends normally.
- __built-in type__: Type, such as `int`, defined by the language.
- __cerr__: `ostream` object tied to the standard error, which often writes to the same device as the standard output. By default, writes to `cerr` are not buffered. Usually used for error messages or other output that is not part of the normal logic of the program.
- __character string literal__: Another term for string literal.
- __cin__: `istream` object used to read from the standard input.
- __class__: Facility for defining our own data structures together with associated operations. The class is one of the most fundamental features in C++. Library types, such as `istream` and `ostream`, are classes.
- __class type__: A type defined by a class. The name of the type is the class name.
- __clog__: `ostream` object tied to the standard error. By default, writes to `clog` are buffered. Usually used to report information about program execution to a log file.
- __comments__: Program text that is ignored by the compiler. C++ has two kinds of comments: single-line and paired. Single-line comments start with a `//`. Everything from the `//` to the end of the line is a comment. Paired comments begin with a `/*` and include all text up to the next `*/`.
- __condition__: An expression that is evaluated as true or false. A value of zero is false; any other value yields true.
- __cout__: `ostream` object used to write to the standard output. Ordinarily used to write the output of a program.
- __curly brace__: Curly braces delimit blocks. An open curly (`{`) starts a block; a close curly (`}`) ends one.
- __data structure__: A logical grouping of data and operations on that data.
- __edit-compile-debug__: The process of getting a program to execute properly.
- __end-of-file__: System-specific marker that indicates that there is no more input in a file.
- __expression__: The smallest unit of computation. An expression consists of one or more operands and usually one or more operators. Expressions are evaluated to produce a result. For example, assuming `i` and `j` are `int`s, then `i + j` is an expression and yields the sum of the two `int` values.
- __for statement__: Iteration statement that provides iterative execution. Often used to repeat a calculation a fixed number of times.
- __function__: Named unit of computation.
- __function body__: Block that defines the actions performed by a function.
- __function name__: Name by which a function is known and can be called.
- __header__: Mechanism whereby the definitions of a class or other names are made available to multiple programs. A program uses a header through a `#include` directive.
- __if statement__: Conditional execution based on the value of a specified condition. If the condition is true, the `if` body is executed. If not, the `else` body is executed if there is one.
- __initialize__: Give an object a value at the same time that it is created.
- __iostream__: Header that provides the library types for stream-oriented input and output.
- __istream__: Library type providing stream-oriented input.
- __library type__: Type, such as `istream`, defined by the standard library.
- __main__: Function called by the operating system to execute a C++ program. Each program must have one and only one function named `main`.
- __manipulator__: Object, such as `std::endl`, that when read or written "manipulates" the stream itself.
- __member function__: Operation defined by a class. Member functions ordinarily are called to operate on a specific object.
- __method__: Synonym for member function.
- __namespace__: Mechanism for putting names defined by a library into a single place. Namespaces help avoid inadvertent name clashes. The names defined by the C++ library are in the namespace `std`.
- __ostream__: Library type providing stream-oriented output.
- __parameter list__: Part of the definition of a function. Possibly empty list that specifies what arguments can be used to call the function.
- __return type__: Type of the value returned by a function.
- __source file__:Term used to describe a file that contains a C++ program.
- __standard error__: Output stream used for error reporting. Ordinarily, the standard output and the standard error are tied to the window in which the program is executed.
- __standard input__: Input stream usually associated with the window in which the program executes.
- __standard library__: Collection of types and functions that every C++ compiler must support. The library provides the types that support IO. C++ programmers tend to talk about "the library", meaning the entire standard library. They also tend to refer to particular parts of the library by referring to a library type, such as the "`iostream` library", meaning the part of the standard library that defines the IO classes.
- __standard output__: Output stream usually associated with the window in which the program executes.
- __statement__: A part of a program that specifies an action to take place when the program is executed. An expression followed by a semicolon is a statement; other kinds of statements include blocks and `if`, `for`, and `while` statements, all of which contain other statements within themselves.
- __std__: Name of the namespace used by the standard library. `std::cout` indicates that we’re using the name `cout` defined in the std namespace.
- __string literal__: Sequence of zero or more characters enclosed in double quotes ("`a string literal`").
- __uninitialized variable__: Variable that is not given an initial value. Variables of class type for which no initial value is specified are initialized as specified by the class definition. Variables of built-in type defined inside a function are uninitialized unless explicitly initialized. It is an error to try to use the value of an uninitialized variable. _Uninitialized variables are a rich source of bugs_.
- __variable__: A named object.
- __while statement__: Iteration statement that provides iterative execution so long as a specified condition is true. The body is executed zero or more times, depending on the truth value of the condition.
- __() operator__: Call operator. A pair of parentheses "`()`" following a function name. The operator causes a function to be invoked. Arguments to the function may be passed inside the parentheses.
- __++ operator__: Increment operator. Adds `1` to the operand; `++i` is equivalent to `i = i + 1`.
- __+= operator__: Compound assignment operator that adds the right-hand operand to the left and stores the result in the left-hand operand; `a += b` is equivalent to `a = a + b`.
- __. operator__: Dot operator. Left-hand operand must be an object of class type and the right-hand operand must be the name of a member of that object. The operator yields the named member of the given object.
- __:: operator__: Scope operator. Among other uses, the scope operator is used to access names in a namespace. For example, `std::cout` denotes the name `cout`from the namespace `std`.
- __= operator__: Assigns the value of the right-hand operand to the object denoted by the left-hand operand.
- __-- operator__: Decrement operator. Subtracts `1` from the operand; `--i` is equivalent to `i = i - 1`.
- __<< operator__: Output operator. Writes the right-hand operand to the output stream indicated by the left-hand operand: `cout << "hi"` writes `hi` to the standard output. Output operations can be chained together: `cout << "hi" << "bye"` writes  `hibye`.
- __>> operator__: Input operator. Reads from the input stream specified by the left-hand operand into the right-hand operand: `cin >> i` reads the next value on the standard input into `i`. Input operations can be chained together: `cin >> i >> j` reads first into `i` and then into `j`.
- __# include__: Directive that makes code in a header available to a program.
- __== operator__: The equality operator. Tests whether the left-hand operand is equal to the right-hand operand.
- __!= operator__: The inequality operator. Tests whether the left-hand operand is not equal to the right-hand operand.
- __<= operator__: The less-than-or-equal operator. Tests whether the left-hand operand is less than or equal to the right-hand operand.
- __< operator__: The less-than operator. Tests whether the left-hand operand is greater than or equal to the right-hand operand.
- __>= operator__: Greater-than-or-equal operator. Tests whether the left-hand operand is greater than or equal to the right-hand operand.
- __> operator__: Greater-than operator. Tests whether the left-hand operand is greater than the right-hand operand.

:::

## Chapter 2 Variables and Basic Types

### Section 2.1 Primitive Built-in Types

#### Arithmetic Types

|     Type      |              Meaning              |  Minimum Size  |
| :-----------: | :-------------------------------: | :------------: |
|    `bool`     |              boolean              |       NA       |
|    `char`     |             character             |     8 bits     |
|   `wchar_t`   |          wide character           |    16 bits     |
|  `char16_t`   |         Unicode character         |    16 bits     |
|  `char32_t`   |         Unicode character         |    32 bits     |
|    `short`    |           short integer           |    16 bits     |
|     `int`     |              integer              |    16 bits     |
|    `long`     |           long integer            |    32 bits     |
|  `long long`  |           long integer            |    64 bits     |
|    `float`    |  single-precision floating-point  | 6 sig. digits  |
|   `double`    |  double-precision floating-point  | 10 sig. digits |
| `long double` | extended-precision floating-point | 10 sig. digits |

#### Type Conversions

- When we assign one of  non-`bool` arithmetic types to a `bool` object, the result is `false` if the value is `0` and `true` otherwise.
- When we assign a `bool` to one of the other arithmetic types, the resulting value is `1` if the `bool` is `true` and `0` if the `bool` is `false`.
- When we assign a floating-point value to an object of integral type, the value is truncated. The value stored is the part before the decimal point.
- When we assign an integral value to an object of floating-point type, the fractional part is zero. Precision may be lost if the integer has more bits than the floating-point type can accommodate.
- If we assign an out-of-range value to an object of unsigned type, the result is the remainder of of the value modulo the number of values the target type can hold.
- If we assign an out-of-range value to an object of signed type, the result is undefined.

::: tip Defined Terms

- __address__: Number by which a byte in memory can be found.
- __alias declaration__: Defines a synonym for another type: `using` _name_ = _type_ declares _name_ as a synonym for the type _type_.
- __array__: Data structure that holds a collection of unnamed objects that are accessed by an index.
- __auto__: Type specifier that deduces the type of a variable from its initializer.
- __base type__: type specifier, possibly qualified by `const`, that precedes the declarators in a declaration. The base type provides the custom type on which declarators in a declaration can build.
- __bind__: Associating a name with a given entity so that uses of the name are uses the underlying entity. For example, a reference is a name that is bound to an object.
- __byte__: Smallest addressable unit of memory. On most machines a byte is 8 bits.
- __class member__: Part of a class.
- __compound type__: A type that is defined in terms on another type.
- __const__: Type qualifier used to define objects that may not be changed. `const` objects must be initialized, because there is no way to give them a value after they are defined.
- __const pointer__: Pointer that is `const`.
- __const reference__: Colloquial synonym for reference to `const`.
- __const expression__: Expression that can be evaluated at compile time.
- __constexpr__: Variable that represents a const expression.
- __conversion__: Process whereby a value of one type is transformed into a value of another type. The language defines conversions among the built-in types.
- __data member__: Data elements that constitute an object. Every object of a given class has its own copies of the class' data members. Data members may be initialized when declared inside the class.
- __declaration__: Asserts the existence of a variable, function, or type defined elsewhere. Names may not be used until they are defined or declared.
- __decltype__: Type specifier that deduces the type of a variable or an expression.
- __default initialization__: How objects are initialized when no explicit initializer is given. How class type objects are initialized is controlled by the class. Objects of built-in type defined at global scope are uninitiated and have undefined values.
- __definition__: Allocates storage for a variable of a specified type and optionally initializes the variable. Names may not be used until they are defined or declared.
- __escape sequence__: Alternative mechanism for representing characters, particularly for those without printable representations. An escape sequence is a backslash followed by a character, three or fewer octal digits, or an `x` followed by a hexadecimal number.
- __global scope__: The scope that is outside all other scopes.
- __header guard__: Preprocessor variable used to prevent a header from being included more than once in a single file.
- __identifier__: Sequence of characters that make up a name. Identifiers are case-sensitive.
- __in-class initializer__: Initializer provided as part of the declaration of a class data member. In-class initializers must follow an `=` symbol or be enclosed inside curly braces.
- __in scope__: Name that is visible from the current scope.
- __initialized__: A variable given an initial value when it is defined. Variables usually should be initialized.
- __ inner scope__: Scope that is nested insdie another scope.
- __integeral types__: See arithmetic type.
- __list initialization__: Form of initialization that uses curly braces to enclose one or more initializers.
- __literal__: A value such as a number, a character, or a string of characters. The value cannot be changed. Literal characters are enclosed in single quotes, literal strings in double quotes.
- __local scope__: Colloquial synonym for block scope.
- __low-level const__: A  `const` that is not top-level. Such `const`s are interal to the type and are never ignored.
- __member__: Part of class.
- __nonprintable character__: A character with no visible representation, such as a control character, a backspace, newline, and so on.
- __null pointer__: Pointer whose value is 0. A null pointer is valid but does not point to any object.
- __nullptr__: Literal constant that denotes the null pointer.
- __object__: A region of memory that has a type. A variable is an obejct that has a name.
- __outer scope__: Scope that encloses another scope.
- __pointer__: An object that can hold the address of an object, the address one past the end of an object, or zero.
- __pointer to const__: Pointer that can hold the address of a `const` obejct. A pointer to `const` may not be used to change the value of the obejct to which it points.
- __preprocessor__: Program that runs as part of compilation of a C++ program.
- __preprocessor variable__: Variable managed by the preprocessor. The preprocessor replaces each preprocessor variable by its value before our program is compiled.
- __reference__: An alias for another object.
- __reference to `const`__: A reference that may not change the value of the object to which it refers. A reference to `const` may not be bound to a `const` object, a non`const` object, or the result of an expression.
- __scope__; The portion of a program in which names have meaning. C++ has several levels of scope:
  - __global__: names defined outside any other scope
  - __class__: names defined inside a class
  - __namespace__: names defined inside a namespace
  - __block__: names defined inside a block

  Scopes nest. Once a name is declared, it is accessible until the end of the scope in which it was declared.
- __separate compilation__: Ability to split a program into multiple separate source files.
- __signed__: Integer type that holds negative or positive values, including zero.
- __string__: Library type representing variable-length sequences of characters.
- __struct__: Keyword used to defined a class.

:::
