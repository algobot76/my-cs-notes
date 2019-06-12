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
