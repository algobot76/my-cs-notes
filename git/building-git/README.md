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

#### 2.2.1. `.git/COMMIT_EDITMSG`

- The last commit message.

#### 2.2.2. `.git/index`

- A cache that stores info about each file in the current commit and which version of each file should be present.
- Updated when you run `git add`.
- Info stored in `index` is used to build the next commit.

#### 2.2.3. `.git/logs`

- `logs` contains history for different branches. It is used by `reflog`.

#### 2.2.4 `.git/refs/heads/master`

- A file that records which commit is at the tip of the master branch.

### 2.3 Storing objects

- The files with hexadecimal names in `.git/objects` = content stored under version control.

#### 2.3.1 The `cat-file` command

```
$ git cat-file -p 2fb7e6b97a594fa7f9ccb927849e95c7c70e39f5

tree 88e38705fdbd3608cddbe904b67c731f3234c45b
author James Coglan <james@jcoglan.com> 1511204319 +0000
committer James Coglan <james@jcoglan.com> 1511204319 +0000

First Commit
```

- `tree` represents your whole tree of files.
- `author` and `commiter` are info about the auther's name, email address, and a Unix timestamp + timezone offset.

```
$ git cat-file -p 88e38705fdbd3608cddbe904b67c731f3234c45b
100644 blob ce013625030ba8dba906f756967f9e9ca394464a     hello.txt
100644 blob cc628ccd10742baea8241c5924df992b5c019f71     world.txt
```

- Git creates a tree for every directory, including the root. Each tree represents the contents for each directory.
- Each entry in a tree is either a tree (subdirectory) or a blob (regular file).

#### 2.3.2 Blobs on disk

- Git uses the DEFALTE algorithm to compress objects stored in `.git/objects`.
- Git stores blobs by prepending them with the world `blob`, a space, the length of the blob, and a null type.

#### 2.3.3 Trees on disk

- Git generates a string for each entry consisting its mode in text (e.g. `100641), a space, its filename, a null type, ID (in binary).
- Git concatentates all these entries into a single string, then prepends the word `tree`, a space, and the length of the rest of the content.

#### 2.3.4 Commits on disk

- A commit is stored as a series of headers, followed by the message.
- `tree`: all commits refer to a single tree that represents the state of your files at that point in the history.
- `author`: name + email + Unix timestamp
- `commiter`: same as `auther` in most cases; could be changed when someone else amends the commit or cherry-picks it into another branch.