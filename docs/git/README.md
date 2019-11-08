# Git

[[toc]]

## Snippets

### Remove all your local git branches but keep master

```bash
git branch | grep -v "master" | xargs git branch -D
```

#### References

- [Remove all your local git branches but keep master](https://coderwall.com/p/x3jmig/remove-all-your-local-git-branches-but-keep-master)
