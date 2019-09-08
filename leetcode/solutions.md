# Solutions

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
