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

Java:

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

Python:

```python
from collections import deque

queue = deque()
seen = set()

seen.add(start)
queue.append(start)
while len(queue):
    head = queue.popleft()
    for neighbor in head.neighbors:
        if neighbor not in seen:
            seen.add(neighbor)
            queue.append(neighbor)
```

### Variant 2

Java:

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

Python:

```python
from collections import deque

queue = deque()
seen = set()

seen.add(start)
queue.append(start)
while len(queue):
    size = len(queue)
    for _ in range(size):
        head = queue.popleft()
        for neighbor in head.neighbors:
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)
```

### Use two queues to implement BFS

Python:

```python
from collections import deque

queue1, queue2 = deque(), deque()
seen = set()

seen.add(start)
queue1.append(start)
currentLevel = 0
while len(queue1):
    size = len(queue1)
    for _ in range(size):
        head = queue1.popleft()
        for neighbor in head.neighbors:
            if neighbor not in seen:
                seen.add(neighbor)
                queue2.append(neighbor)
    queue1, queue2 = queue2, queue1
    queue2.clear()
    currentLevel += 1
```

### Use a dummy head in BFS

Java:

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

Python:

```python
from collections import deque

queue = deque()
seen = set()

seen.add(start)
queue.append(start)
queue.append(None)
currentLevel = 0
while len(queue) > 1:
    head = queue.popleft()
    if head == None:
        currentLevel += 1
        queue.append(None)
        continue
    for neighbor in head.neighbors:
        if neighbor not in seen:
            seen.add(neighbor)
            queue.append(neighbor)
```

### Bidirectional BFS

Python:

```python
from collections import deque

def doubleBFS(start, end):
    if start == end:
        return 1

    startQueue, endQueue = deque(), deque()
    startQueue.append(start)
    endQueue.append(end)
    step = 0

    startVisited, endVisited = set(), set()
    startVisited.add(start)
    endVisited.add(end)
    while len(startQueue) and len(endQueue):
        startSize, endSize = len(startQueue), len(endQueue)
        step += 1
        for _ in range(startSize):
            cur = startQueue.popleft()
            for neighbor in cur.neighbors:
                if neighbor in startVisited:
                    continue
                elif neighbor in endVisited:
                    return step
                else:
                    startVisited.add(neighbor)
                    startQueue.append(neighbor)
        step += 1
        for _ in range(endSize):
            cur = endQueue.popleft()
            for neighbor in cur.neighbors:
                if neighbor in endVisited:
                    continue
                elif neighbor in startVisited:
                    return step
                else:
                    endVisited.add(neighbor)
                    endQueue.append(neighbor)

    return -1
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
