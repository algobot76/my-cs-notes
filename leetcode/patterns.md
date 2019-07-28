# LeetCode Patterns

## Queue

### Implement a queue

```python
class MyQueue:
    def __init__(self):
        self.elements = []
        self.pointer = 0

    def size(self):
        return len(self.elements)-pointer

    def empty(self):
        return self.size() == 0

    def add(self, e):
        self.elements.append(e)

    def poll(self):
        if self.empty():
            return None
        pointer += 1
        return self.elements[pointer-1]
```

## Linked List

### Reverse a linked list

```java
public ListNode reverseList(ListNode head) {
    if (head == null || head.next == null) {
        return head;
    }

    ListNode newHead = null;
    while (head != null) {
        ListNode next = head.next;
        head.next = newHead;
        newHead = head;
        head = next;
    }

    return newHead;
}
```

### Find the midpoint

```java
public ListNode findMid(ListNode head) {
    ListNode fast = head;
    ListNode slow = head;
    while (fast != null && fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
}
```

## Binary Search

```java
public int findPosition(int[] nums, int target) {
    if (nums == null || nums.length == 0) {
        return -1;
    }

    int start = 0, end = nums.length - 1;
    while (start + 1 < end) {
        int mid = start + (end - start) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            start = mid;
        } else {
            end = mid;
        }
    }

    if (nums[start] == target) {
        return start;
    }
    if (nums[end] == target) {
        return end;
    }
    return -1;
}
```

<!-- TODO: Add topological sorting -->

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
