# Concurrency in Go

[[toc]]

## Chapter 3. Go’s Concurrency Building Blocks

### Goroutines

- Go program has at least one goroutine: the main goroutine.
- A goroutine is a function that is running concurrently.
- Goroutines are not OS threads/green threads.
- Go uses a M:N scheduler for scheduling goroutines. The scheduler maps `M` green threads to `N` OS threads. Goroutines are schedules onto green threads.
- Go follows the fork-join model.
  - "fork" means at any point in the program, it can split off a child branch of execution to be run concurrently with its parent.
  - "join" means at some point in the future, these concurrent branches of execution will join back together (join point).
- Goroutines are extraordinarily lightweight.

---

```go
var wg sync.WaitGroup
sayHello := func() {
    defer wg.Done()
    fmt.Println("hello")
}
wg.Add(1)
go sayHello()
wg.Wait()
```

- `Add` should be called outside goroutines.

```go
var wg sync.WaitGroup
for _, salutation := range []string{"hello", "greetings", "good day"} {
    wg.Add(1)
    go func(salutation string) {
        defer wg.Done()
        fmt.Println(salutation)
    }(salutation)
}
wg.Wait()
```

- Pass a copy of `salution` to each goroutine to make sure they have the correct value of `salution`.

### The `sync` Package

#### `WaitGroup`

Use `WaitGroup` to wait for a set of concurrent operations to complete when you don't care/you have other means to collect their results.

```go
var wg sync.WaitGroup

wg.Add(1)
go func() {
    defer wg.Done()
    fmt.Println("1st goroutine sleeping...")
    time.Sleep(1)
}()

wg.Add(1)
go func() {
    defer wg.Done()
    fmt.Println("2nd goroutine sleeping...")
    time.Sleep(2)
}()

wg.Wait()
fmt.Println("All goroutines complete.")
```

#### `Mutex` and `RWMutex`

`Mutex` guards critical sections of your program.

```go
var count int
var lock sync.Mutex

increment := func() {
    lock.Lock()
    defer lock.Unlock()
    count++
    fmt.Printf("Incrementing: %d\n", count)
}

decrement := func() {
    lock.Lock()
    defer lock.Unlock()
    count--
    fmt.Printf("Decrementing: %d\n", count)
}

// Increment
var arithmetic sync.WaitGroup
for i := 0; i <= 5; i++ {
    arithmetic.Add(1)
    go func() {
        defer arithmetic.Done()
        increment()
    }()
}

// Decrement
for i := 0; i <= 5; i++ {
    arithmetic.Add(1)
    go func() {
        defer arithmetic.Done()
        decrement()
    }()
}

arithmetic.Wait()
fmt.Println("Arithmetic complete.")
```

- Always call `Unlock` with the `defer` statement.

---

`RWMutex` is similar to `Mutex` except that you can have multiple readers as long as no one is holding the writer block.

```go
producer := func(wg *sync.WaitGroup, l sync.Locker) {
    defer wg.Done()
    for i := 5; i > 0; i-- {
        l.Lock()
        l.Unlock()
        time.Sleep(1)
    }
}

observer := func(wg *sync.WaitGroup, l sync.Locker) {
    defer wg.Done()
    l.Lock()
    defer l.Unlock()
}

test := func(count int, mutex, rwMutex sync.Locker) time.Duration {
    var wg sync.WaitGroup
    wg.Add(count+1)
    beginTestTime := time.Now()
    go producer(&wg, mutex)
    for i := count; i > 0; i-- {
        go observer(&wg, rwMutex)
    }

    wg.Wait()
    return time.Since(beginTestTime)
}

tw := tabwriter.NewWriter(os.Stdout, 0, 1, 2, ' ', 0)
defer tw.Flush()

var m sync.RWMutex
fmt.Fprintf(tw, "Readers\tRWMutext\tMutex\n")
for i := 0; i < 20; i++ {
    count := int(math.Pow(2, float64(i)))
    fmt.Fprintf(
        tw,
        "%d\t%v\t%v\n",
        count,
        test(count, &m, m.RLocker()),
        test(count, &m, &m),
    )
}
```

#### `Cond`

`Cond` is a rendezvous point for goroutines waiting for or announcing the occurrence
of an event.

```go
c := sync.NewCond(&sync.Mutex{})
c.L.Lock()
for conditionTrue() == false {
    c.Wait()
}
c.L.Unlock()
```

- `Lock` is necessary because the call to `Wait` automatically calls `Unlock` on the Locker when entered.
- `Unlock` is necessary because the call to `Wait` automatically calls `Lock` on the Locker when exits.

---

```go
c := sync.NewCond(&sync.Mutex{})
queue := make([]interface{}, 0, 10)

removeFromQueue := func(delay time.Duration) {
    time.Sleep(delay)
    c.L.Lock()
    queue = queue[1:]
    fmt.Println("Removed from queue")
    c.L.Unlock()
    c.Signal()
}

for i := 0; i < 10; i++{
    c.L.Lock()
    for len(queue) == 2 {
        c.Wait()
    }
    fmt.Println("Adding to queue")
    queue = append(queue, struct{}{})
    go removeFromQueue(1*time.Second)
    c.L.Unlock()
}
```

- `Signal` notifies the waiting goroutine that something has occurred.

#### `Once`

`Once` ensures that only one call to `Do` ever calls the function passed in, even on different goroutines. It only counts the number of times `Do` is called, not how many times unique functions passed into `Do` are called.

```go
var count int

increment := func() {
    count++
}

var once sync.Once

var increments sync.WaitGroup
increments.Add(100)
for i := 0; i < 100; i++ {
    go func() {
        defer increments.Done()
        once.Do(increment)
    }()
}

increments.Wait()
fmt.Printf("Count is %d\n", count) // Count is 1
```

#### `Pool`

`Pool` creates and make available a fixed number, or pool, of things for use.

- Use `Pool` when you have concurrent processes that require objects, but dispose of them very rapidly after instantiation.
- Use `Pool` when construction of these objects could negatively impact memory.
- Make sure the objects in a `Pool` are roughly homogenous.

```go
myPool := &sync.Pool{
    New: func() interface{} {
        fmt.Println("Creating new instance.")
        return struct{}{}
    },
}

myPool.Get()
instance := myPool.Get()
myPool.Put(instance)
myPool.Get()
```
