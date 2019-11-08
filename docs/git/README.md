# Git

[[toc]]

## Snippets

### Remove all your local git branches but keep master

```bash
git branch | grep -v "master" | xargs git branch -D
```

#### References

- [Remove all your local git branches but keep master](https://coderwall.com/p/x3jmig/remove-all-your-local-git-branches-but-keep-master)

### Update submodules in git

```bash
git submodule foreach git pull origin master
```

#### References

- [Update Git submodule to latest commit on origin](https://stackoverflow.com/questions/5828324/update-git-submodule-to-latest-commit-on-origin)

### Show authors and commits

```bash
git shortlog -sn
```
