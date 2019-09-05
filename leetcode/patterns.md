# LeetCode Patterns

## Queue

### Implement a queue

Java:

```java
class MyQueue {
    private ArrayList<Integer> elements;
    private int pointer;

    public MyQueue() {
        this.elements = new ArrayList<>();
        pointer = 0;
    }

    public int size() {
        return this.elements.size() - pointer;
    }

    public boolean empty() {
        return this.size() == 0;
    }

    public void add(Integer e) {
        this.elements.add(e);
    }

    public Integer poll() {
        if (this.empty()) {
            return null;
        }
        return this.elements.get(pointer++);
    }
}
```

Python:

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

Java:

```java
Queue<T> queue1 = new LinkedList<>();
Queue<T> queue2 = new LinkedList<>();
queue1.offer(startNode);
int currentLevel = 0;

while (!queue1.isEmpty()) {
   int size = queue1.size();
    for (int i = 0; i < size; i++) {
        T head = queue1.poll();
        for (all neighbors of head) {
            queue2.offer(neighbor);
        }
    }
    Queue<T> temp = queue1;
    queue1 = queue2;
    queue2 = temp;

    queue2.clear();
    currentLevel++;
}
```

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

Java:

```java
public int doubleBFS(UndirectedGraphNode start, UndirectedGraphNode end) {
    if (start.equals(end)) {
        return 1;
    }
    Queue<UndirectedGraphNode> startQueue = new LinkedList<>();
    Queue<UndirectedGraphNode> endQueue = new LinkedList<>();
    startQueue.add(start);
    endQueue.add(end);
    int step = 0;
    Set<UndirectedGraphNode> startVisited = new HashSet<>();
    Set<UndirectedGraphNode> endVisited = new HashSet<>();
    startVisited.add(start);
    endVisited.add(end);
    while (!startQueue.isEmpty() || !endQueue.isEmpty()) {
        int startSize = startQueue.size();
        int endSize = endQueue.size();
        step ++;
        for (int i = 0; i < startSize; i ++) {
            UndirectedGraphNode cur = startQueue.poll();
            for (UndirectedGraphNode neighbor : cur.neighbors) {
                if (startVisited.contains(neighbor)) {
                    continue;
                } else if (endVisited.contains(neighbor)) {
                    return step;
                } else {
                    startVisited.add(neighbor);
                    startQueue.add(neighbor);
                }
            }
        }
        step ++;
        for (int i = 0; i < endSize; i ++) {
            UndirectedGraphNode cur = endQueue.poll();
            for (UndirectedGraphNode neighbor : cur.neighbors) {
                if (endVisited.contains(neighbor)) {
                    continue;
                } else if (startVisited.contains(neighbor)) {
                    return step;
                } else {
                    endVisited.add(neighbor);
                    endQueue.add(neighbor);
                }
            }
        }
    }
    return -1;
}
```

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

### Topological sorting

- [127. Topological Sorting](https://www.lintcode.com/problem/topological-sorting/description)

Java:

```java
public class Solution {
    /**
     * @param graph: A list of Directed graph node
     * @return: Any topological order for the given graph.
     */
    public ArrayList<DirectedGraphNode> topSort(ArrayList<DirectedGraphNode> graph) {
        HashMap<DirectedGraphNode, Integer> map = new HashMap();
        for (DirectedGraphNode node : graph) {
            for (DirectedGraphNode neighbor : node.neighbors) {
                if (map.containsKey(neighbor)) {
                    map.put(neighbor, map.get(neighbor) + 1);
                } else {
                    map.put(neighbor, 1);
                }
            }
        }

        ArrayList<DirectedGraphNode> result = new ArrayList<DirectedGraphNode>();

        Queue<DirectedGraphNode> q = new LinkedList<DirectedGraphNode>();
        for (DirectedGraphNode node : graph) {
            if (!map.containsKey(node)) {
                q.offer(node);
                result.add(node);
            }
        }

        while (!q.isEmpty()) {
            DirectedGraphNode node = q.poll();
            for (DirectedGraphNode n : node.neighbors) {
                map.put(n, map.get(n) - 1);
                if (map.get(n) == 0) {
                    result.add(n);
                    q.offer(n);
                }
            }
        }

        return result;
    }
}
```

Python:

```python
class Solution:
    """
    @param graph: A list of Directed graph node
    @return: Any topological order for the given graph.
    """
    def topSort(self, graph):
        node_to_indegree = self.get_indegree(graph)

        # bfs
        order = []
        start_nodes = [n for n in graph if node_to_indegree[n] == 0]
        queue = collections.deque(start_nodes)
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in node.neighbors:
                node_to_indegree[neighbor] -= 1
                if node_to_indegree[neighbor] == 0:
                    queue.append(neighbor)

        return order

    def get_indegree(self, graph):
        node_to_indegree = {x: 0 for x in graph}

        for node in graph:
            for neighbor in node.neighbors:
                node_to_indegree[neighbor] += 1

        return node_to_indegree
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
