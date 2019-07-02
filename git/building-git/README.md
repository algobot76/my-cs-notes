# Building Git

## 2. Getting to know `.git`

### 2.1. The `.git` directory

```
.git
|-- config
|-- description
|-- HEAD
|-- hooks
|  |-- applypatch-msg.sample
|  |-- commit-msg.sample
|  |-- post-update.sample
|  |-- pre-applypatch.sample
|  |-- pre-commit.sample
|  |-- pre-push.sample
|  |-- pre-rebase.sample
|  |-- pre-receive.sample
|  |-- prepare-commit-msg.sample
|  |-- update.sample
|-- info
|  |-- exclude
|
|-- objects
|  |-- info
|  |-- pack
|
|-- refs
   |-- heads
   |-- tags
```

#### 2.1.1. `.git/config`

`.git/config` contains config for the current repo.

```
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
```

- Version 0 of the repo file format.
- Should store each file's mode as reported by the filesystem.
- Not bare => user edits the working copy of files and create commits, rather than just a shared location for multiple users to push and pull commits from.
- Reflog is enabled => all changes in `.git/refs` are logged in `.git/logs`.
