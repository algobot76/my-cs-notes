# Solutions

## LeetCode 102. Binary Tree Level Order Traversal

### BFS

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

## LeetCode 207. Course Schedule

### Topological Order

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
- If there is a tologocial order, it is possible to finish all courses; otherwise it is impossible.
- We need to count the number of courses in the tologocial order.
- __Time Complexity__: `O(n)`
- __Space Complexity__: `O(n)`

## LeetCode 210. Course Schedule II

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