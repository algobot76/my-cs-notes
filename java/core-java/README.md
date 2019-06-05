# Core Java

## Chapter 8: Generic Programming

### 8.2 Defining a Simple Generic Class

```java
public class Pair<T> {
    private T first;
    private T second;

    public Pair() {
        first = null;
        second = null;
    }

    public Pair(T first, T second) {
        this.first = first;
        this.second = second;
    }

    public T getFirst() {
        return first;
    }

    public T getSecond() {
        return second;
    }

    public void setFirst(T newValue) {
        first = newValue;
    }

    public void setSecond(T newValue) {
        second = newValue;
    }
}
```

- `T` is a type variable.
- A generic class can have more than one type variable.

### 8.3 Generic Methods

```java
class ArrayAlg {
    public static <T> T getMiddle(T.. a) {
        return a[a.length / 2];
    }
}
```

- A generic method can be defined within an ordinary class.
- Compiler may reports an error if:

    ```java
    double middle = ArrayAlg.getMiddle(3.14, 1729, 0);
    ```

  - To fix it, write all the parameters as `double` values.

#### 8.4 Bounds for Type Variables

```java
class ArrayAlg {
    public static <T extends Comparable> T min(T[] a) {
        if (a == null || a.length == 0) {
            return null;
        }
        T smallest = a[0];
        for (int i = 0; i < a.length; i++) {
            if (smallest.compareTo(a[i]) > 0) {
                smallest = a[i];
            }
        }

        return smallest;
    }
}
```

- `T` is a subtype of `Comparable` (a bound for `T`).
- A type variable can have multiple bounds, e.g. `T extends Comparable & Serializable`.
