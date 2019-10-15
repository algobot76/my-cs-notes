# Solutions

## LeetCode 50. Pow(x, n)

Python:

```python
class Solution:
    def myPow(self, x, n):
        if n < 0:
            x = 1 / x
            n = -n
        ans = 1
        while n:
            if n % 2:
                ans *= x
            x *= x
            n //= 2
        return ans
```

## LeetCode 102. Binary Tree Level Order Traversal

### BFS

Python:

```python
from collections import deque


class Solution:
    def levelOrder(self, root):
        if root is None:
            return []

        queue = deque([root])
        result = []
        while queue:
            level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            result.append(level)
        return result

```

Java:

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> ans = new ArrayList<>();
        if (root == null) {
            return ans;
        }

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode n = q.poll();
                level.add(n.val);
                if (n.left != null) {
                    q.offer(n.left);
                }
                if (n.right != null) {
                    q.offer(n.right);
                }
            }
            ans.add(level);
        }

        return ans;
    }
}
```

- Use the size of the queue determine how many nodes exist on the current level.
- __Time Complexity__: `O(n + m)`
  - `n` = number of nodes
  - `m` = number of edges
- __Extra Space__: `O(w)`
  - `w` = max width of the binary tree

## LeetCode 127. Word Ladder

Python:

```python
from collections import deque, defaultdict


class Solution:
    def __init__(self):
        self.combs = defaultdict(list)

    def ladderLength(self, beginWord, endWord, wordList):
        if endWord not in wordList:
            return 0
        for word in wordList:
            for i in range(len(word)):
                self.combs[word[:i] + '*' + word[i + 1:]].append(word)

        start_queue = deque([(beginWord, 1)])
        end_queue = deque([(endWord, 1)])
        start_visisted = {beginWord: 1}
        end_visited = {endWord: 1}

        while start_queue and end_queue:
            start_word, dist = start_queue.popleft()
            for i in range(len(start_word)):
                temp = start_word[:i] + "*" + start_word[i + 1:]
                for word in self.combs[temp]:
                    if word in end_visited:
                        return dist + end_visited[word]
                    if word not in start_visisted:
                        start_visisted[word] = dist + 1
                        start_queue.append((word, dist + 1))

            end_word, dist = end_queue.popleft()
            for i in range(len(start_word)):
                temp = end_word[:i] + "*" + end_word[i + 1:]
                for word in self.combs[temp]:
                    if word in start_visisted:
                        return dist + start_visisted[word]
                    if word not in end_visited:
                        end_visited[word] = dist + 1
                        end_queue.append((word, dist + 1))

        return 0
```

## LeetCode 133. Clone Graph

### BFS

Python:

```python
from collections import deque


class Solution:
    def cloneGraph(self, node):
        root = node
        if node is None:
            return node
        nodes = self.get_nodes(node)
        mapping = {}
        for node in nodes:
            mapping[node] = Node(node.val, [])
        for node in nodes:
            new_node = mapping[node]
            for neighbor in node.neighbors:
                new_neighbor = mapping[neighbor]
                new_node.neighbors.append(new_neighbor)
        return mapping[root]

    def get_nodes(self, node):
        queue = deque([node])
        result = set([node])
        while queue:
            node = queue.popleft()
            for neighbor in node.neighbors:
                if neighbor not in result:
                    result.add(neighbor)
                    queue.append(neighbor)
        return result

```

## LeetCode 153. Find Minimum in Rotated Sorted Array

### Binary Search

Python:

```python
class Solution:
    def findMin(self, nums):
        if not nums:
            return -1

        start = 0
        end = len(nums) - 1
        target = nums[-1]
        while start + 1 < end:
            mid = (start + end) // 2
            if nums[mid] <= target:
                end = mid
            else:
                start = mid

        return min(nums[start], nums[end])
```

## LeetCode 200. Number of Islands

### BFS

Python:

```python
from collections import deque


class Solution:
    def numIslands(self, grid):
        if not grid or not grid[0]:
            return 0
        islands = 0
        visited = set()
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == '1' and (i, j) not in visited:
                    self.bfs(grid, i, j, visited)
                    islands += 1
        return islands

    def bfs(self, grid, x, y, visited):
        q = deque([(x, y)])
        visited.add((x, y))
        while q:
            x, y = q.popleft()
            for dx, dy in [(1, 0), (0, -1), (-1, 0), (0, 1)]:
                nx = x + dx
                ny = y + dy
                if not self.is_valid(grid, nx, ny, visited):
                    continue
                q.append((nx, ny))
                visited.add((nx, ny))

    def is_valid(self, grid, x, y, visited):
        m = len(grid)
        n = len(grid[0])
        return 0 <= x < m and 0 <= y < n and (x, y) not in visited and grid[x][y] == '1'

```

- Iterate through each element of the grid.
- If we encounter `1`, we use BFS to find any neighbor that is connected to the cell.
- Don't forget to implement `is_valid` method to check if a cell is out-of-bound.
- _Time Complexity_: `O(mn)
- _Extra Space_: `O(1)`

## LeetCode 207. Course Schedule

### Topological Order

Python:

```python
from collections import deque


class Solution:
    def canFinish(self, numCourses, prerequisites):
        edges = {i: [] for i in range(numCourses)}
        degrees = [0 for i in range(numCourses)]

        for i, j in prerequisites:
            edges[j].append(i)
            degrees[i] += 1

        queue = deque([])
        count = 0

        for i in range(numCourses):
            if degrees[i] == 0:
                queue.append(i)

        while queue:
            node = queue.popleft()
            count += 1

            for x in edges[node]:
                degrees[x] -= 1
                if degrees[x] == 0:
                    queue.append(x)

        return count == numCourses
```

Java:

```java
class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List[] graph = new ArrayList[numCourses];
        int[] inDegree = new int[numCourses];

        for (int i = 0; i < numCourses; i++) {
            graph[i] = new ArrayList<Integer>();
        }
        for (int i = 0; i < prerequisites.length; i++) {
            inDegree[prerequisites[i][0]]++;
            graph[prerequisites[i][1]].add(prerequisites[i][0]);
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < inDegree.length; i++) {
            if (inDegree[i] == 0) {
                q.offer(i);
            }
        }
        int count = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            count++;
            List<Integer> courses = graph[curr];
            for (int i = 0; i < courses.size(); i++) {
                int next = courses.get(i);
                inDegree[next]--;
                if (inDegree[next] == 0) {
                    q.offer(next);
                }
            }
        }

        return count == numCourses;
    }
}
```

- We use the `prerequisites` to build a graph
- Since topological order only exists on a DAG.
- If there is a topological order, it is possible to finish all courses; otherwise it is impossible.
- We need to count the number of courses in the topological order.
- __Time Complexity__: `O(n)`
- __Space Complexity__: `O(n)`

## LeetCode 210. Course Schedule II

### Topological Order

Python:

```python
from collections import deque


class Solution:
    def findOrder(self, numCourses, prerequisites):
        edges = {i: [] for i in range(numCourses)}
        degrees = [0 for i in range(numCourses)]

        for i, j in prerequisites:
            edges[j].append(i)
            degrees[i] += 1

        queue = deque([])
        count = 0

        for i in range(numCourses):
            if degrees[i] == 0:
                queue.append(i)

        result = []
        while queue:
            node = queue.popleft()
            count += 1
            result.append(node)

            for x in edges[node]:
                degrees[x] -= 1
                if degrees[x] == 0:
                    queue.append(x)

        return result if count == numCourses else []

```

Java:

```java
class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        int[] ans = new int[numCourses];
        List[] graph = new ArrayList[numCourses];
        int[] inDegree = new int[numCourses];

        for (int i = 0; i < numCourses; i++) {
            graph[i] = new ArrayList<Integer>();
        }
        for (int i = 0; i < prerequisites.length; i++) {
            inDegree[prerequisites[i][0]]++;
            graph[prerequisites[i][1]].add(prerequisites[i][0]);
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < inDegree.length; i++) {
            if (inDegree[i] == 0) {
                q.offer(i);
            }
        }
        int count = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            ans[count] = curr;
            count++;
            List<Integer> courses = graph[curr];
            for (int i = 0; i < courses.size(); i++) {
                int next = courses.get(i);
                inDegree[next]--;
                if (inDegree[next] == 0) {
                    q.offer(next);
                }
            }
        }

        if (count == numCourses) {
            return ans;
        } else {
            return new int[0];
        }
    }
}
```

- Similar to LeetCode 207.

## LeetCode 297. Serialize and Deserialize Binary Tree

Python:

```python
from collections import deque


class Codec:

    def serialize(self, root):
        """Encodes a tree to a single string.

        :type root: TreeNode
        :rtype: str
        """
        if root is None:
            return ''

        queue = deque([root])
        order = []
        while queue:
            node = queue.popleft()
            order.append(str(node.val) if node else '#')
            if node:
                queue.append(node.left)
                queue.append(node.right)
        return ' '.join(order)

    def deserialize(self, data):
        """Decodes your encoded data to tree.

        :type data: str
        :rtype: TreeNode
        """
        if not data:
            return None

        order = [TreeNode(int(val)) if val != '#' else None for val in
                 data.split()]
        root = order[0]
        fast_index = 1
        nodes = [root]
        slow_index = 0
        while slow_index < len(nodes):
            node = nodes[slow_index]
            slow_index += 1
            node.left = order[fast_index]
            node.right = order[fast_index + 1]
            fast_index += 2

            if node.left:
                nodes.append(node.left)
            if node.right:
                nodes.append(node.right)
        return root

```

## LeetCode 685. Find K Closest Elements

### Binary Search

Python:

```python
class Solution:
    def findClosestElements(self, arr, k, x):
        right = self.find_upper_closest(arr, x)
        left = right - 1

        ans = []
        for _ in range(k):
            if self.is_left_closer(arr, x, left, right):
                ans.append(arr[left])
                left -= 1
            else:
                ans.append(arr[right])
                right += 1

        return sorted(ans)

    def find_upper_closest(self, arr, x):
        start = 0
        end = len(arr) - 1
        while start + 1 < end:
            mid = (start + end) // 2
            if arr[mid] >= x:
                end = mid
            else:
                start = mid

        if arr[start] >= x:
            return start
        if arr[end] >= x:
            return end

        return end + 1

    def is_left_closer(self, arr, x, left, right):
        if left < 0:
            return False
        if right >= len(arr):
            return True
        return x - arr[left] <= arr[right] - x

```

### Sorting

Java:

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        List<Integer> nums = Arrays.stream(arr)
                .boxed()
                .sorted(Comparator.comparingInt(n -> Math.abs(n - x)))
                .collect(Collectors.toList());
        List<Integer> ans = nums.subList(0, k);
        ans.sort(Comparator.naturalOrder());
        return ans;
    }
}
```

## LeetCode 852. Peak Index in a Mountain Array

### Binary Search

```python
class Solution:
    def peakIndexInMountainArray(self, A):
        if not A:
            return -1

        start = 0
        end = len(A) - 1
        while start + 1 < end:
            mid = (start + end) // 2
            if A[mid] > A[mid + 1]:
                end = mid
            else:
                start = mid

        return start if A[start] > A[end] else end

```

### Linear Search

```python
class Solution:
    def peakIndexInMountainArray(self, A):
        if not A:
            return -1

        prev = A[0]
        for i in range(len(A)):
            if A[i] < prev:
                return i - 1
            prev = A[i]
```

---

## LintCode 127. Topological Sorting

### BFS

Python:

```python
from collections import deque


class Solution:
    """
    @param: graph: A list of Directed graph node
    @return: Any topological order for the given graph.
    """

    def topSort(self, graph):
        indegrees = self.get_indegrees(graph)
        order = []
        start_nodes = [node for node in graph if indegrees[node] == 0]
        queue = deque(start_nodes)
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in node.neighbors:
                indegrees[neighbor] -= 1
                if indegrees[neighbor] == 0:
                    queue.append(neighbor)
        return order

    def get_indegrees(self, graph):
        indegrees = {
            x: 0 for x in graph
        }

        for node in graph:
            for neighbor in node.neighbors:
                indegrees[neighbor] += 1
        return indegrees
```

## LintCode 458. Last Position of Target

### Binary Search

Python:

```python
class Solution:
    """
    @param nums: An integer array sorted in ascending order
    @param target: An integer
    @return: An integer
    """

    def lastPosition(self, nums, target):
        if not nums or target is None:
            return -1

        start = 0
        end = len(nums) - 1

        while start + 1 < end:
            mid = (start + end) // 2
            if nums[mid] < target:
                start = mid
            elif nums[mid] > target:
                end = mid
            else:
                start = mid

        if nums[end] == target:
            return end
        elif nums[start] == target:
            return start
        else:
            return -1

```
