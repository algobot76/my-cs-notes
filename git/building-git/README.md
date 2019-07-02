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

#### 2.1.2. `.git/description`

- Name of the repo.

#### 2.1.3. `.git/HEAD`

- Reference to the current commit.

#### 2.1.4. `.git/info`

- Metadata about the repo.

#### 2.1.5 `.git/hooks`

- `hooks` contains scritps executed by Git.

#### 2.1.6 `.git/objects`

- Database of Git, where all the content tracked by Git is stored.
- `.git/objects/pack` stores objects in an optimized format.
  - At first, every object is stored in its own file (called __loose objects__).
  - On certain events, many individual files are rolled up into a pack (a compressed format).
  - Those packs are stored here.
- `.git/objects/info` stores metadata about packs for use by a remote protocol. It also stores links to other object stores if the repo refers to content that's stored elsewhere.

#### 2.1.7. `.git/refs`

- `refs` stores various kinds of pointers into the `.git/objects` database.

### 2.2. A simple commit

Once you run a commit command, Git shows you the following info about the commit:

- Branch on which the commit is located.
- Abbreviated ID of the commit.
- Commit message.
- File mode of each committed file.
