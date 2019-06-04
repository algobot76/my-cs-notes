# LeetCode Patterns

## BFS

### Variant 1

```java
Queue<T> q = new LinkedList<>();
Set<T> s = new HashSet<>();
s.add(start);
q.offer(start);
while(!q.isEmpty()) {
    T head = q.poll();
    for (T neighbor : head.neighbors) {
        if (!set.contains(neighbor)) {
            s.add(neighbor);
            q.offer(neighbor);
        }
    }
}
```

### Variant 2

```java
Queue<T> q = new LinkedList<>();
Set<T> s = new HashSet<>();
s.add(start);
q.offer(start);
while(!q.isEmpty()) {
    int size = q.size();
    for (int i = 0; i < size; i++) {
        T head = q.poll();
        for (T neighbor : head.neighbors) {
            if (!set.contains(neighbor)) {
                s.add(neighbor);
                q.offer(neighbor);
            }
        }
    }
}
```

### Use a dummy head in BFS

```java
Queue<T> q = new LinkedList<>();
q.offer(start);
q.offer(null);
int currentLevel = 0;
while(q.size() > 1) {
    T head = q.poll();
    if (head == null) {
        currentLevel++;
        q.offer(null);
        continue;
    }
    for (all neighbors of head) {
        q.offer(neighbor);
    }
}
```

## Matrix

### Move in 4 directions

```java
int[] dx = {1, 0, -1, 0};
int[] dy = {0, 1, 0, -1};
for (int i = 0; i < m; i++) {
  int nx = point[0] + dx[i];
  int ny = point[1] + dy[i];
  // ...
}
```
