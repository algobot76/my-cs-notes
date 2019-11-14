# My Go Notes

## The Laws of Reflection

Source: https://blog.golang.org/laws-of-reflection

### The first law of reflection

## Maximum/minimun values of `int` and `unit`

```go
const MaxUint = ^uint(0)
const MinUint = 0
const MaxInt = int(MaxUint >> 1)
const MinInt = -MaxInt - 1
```

Links:

- [The maximum value for an int type in Go](https://stackoverflow.com/questions/6878590/the-maximum-value-for-an-int-type-in-go)
