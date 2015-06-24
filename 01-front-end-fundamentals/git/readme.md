# Intro to Git

## Summary

This lesson aims to teach you both the fundamentals (both conceptual and
mechanical), of using git, as well as how to use git with Github to share
changes.

## Learning Objecitves

### Conceptual

- Explain what version control is and why developers use it
- List the main components of a git repository and how they relate:
  - repo, working tree, index (aka staging area), commit
- Describe what a git remote repository is.
- Differentiate between git as a tool, and github as a service
- Define and differentiate between forking and cloning

### Mechanical
- Initialize a local git repository
- Add and commit changes to a git repository
- Add a remote repository, and push/pull changes to that remote
- Use the 'fork, clone, and pull request' model to submit assignments
- Un-initialize a git repository

## Resources

[Interactive Git Cheetsheet](http://ndpsoftware.com/git-cheatsheet.html)
[Github Guides](https://guides.github.com)
[Github Training](https://training.github.com/kit/)
[Git Immersion - Interactive Course](http://gitimmersion.com/lab_05.html)
[Pro Git](http://git-scm.com/book/en/v2) - An in-depth free PDF book for those wanting to understand git deeper
[GitUp - Interactive Commit Visualizer](http://gitup.co)


## Outline

### The Purpose of Version Control (10 minutes)

Think about how you've managed tracking changes to a file over time (perhaps
with other people).

Questions:
**What problems did we face?**
**How might a Version control system like solve these?**

Here are some problems we face as developers, and how git solves them:

##### Reverting to past versions

Git allows us to make save points at any time. These save points are called
'commits'. Once a save point is made, it's permanent, and allows us to go back
to that save point at any time. From there, we can see what the code looked like
at that point, or even start building off that version.

##### Keeping track of what each version 'meant'

Every commit has a description (commit message), which allows us to describe
what changed to make that commit. This is usually a description of what features
were added or what bugs were fixed.

Additionally, git supports tagging, which allows us to mark a specific commit
as a specific version of our code (e.g. '2.4.5').

##### Comparing changes to past versions
Pending Description

##### Sharing changes
Pending Description

##### Collaborating / discussing changes
Pending Description

##### Fearlessness in making changes
Pending Description

### Core Concepts of Git Repositories (40 minutes)

This section aims to introduce the core use of git, as well as the fundamental
concepts of how git works (and associated terms).

#### Exercise 1: Create a Repository and Committing Locally

Students should:
1. download and install the [Github for Mac client](https://mac.github.com).
2. initialize a git repository in their `resume` folder.
3. make an initial commit with the current version of their code (all files)
4. modify a file (e.g. index.html) and create a new commit, with an appropriate message
5. repeat previous step (committing) but this time, change two files.
6. look at the 'history' tab to see the log of commits, and what changed

#### Terms and Concepts (Core Git)

* **repository** - collection of commits (save points of the working tree)
* **working tree** - the folder (and it's files and sub-folders, that are in the repository)
* **commit** - a snapshot of the working tree at a giving time (along with a message of what changed)
* **the index** - a staging area where we list changes we want to commit
* **branch** - a label on a commit (it's the ancestry of the commit that constitutes what we usually consider the 'branch')
* **tag** - also a label for a commit, but it never changes
* **master** / development - conventional names for branches
* **HEAD** - what is currently checked out.

Instructor should diagram the various components of a git repository, and how
they relate.

** Insert diagram here **

### Break (10 minutes)
### Remote Repositories and Github (30 minutes)

#### Exercise 2: Publish to a remote repository on Github

1. open the resume repo in the Github client
2. ensure you have at least one commit
3. click the 'publish' button in the upper right corner
4. give the repo a name and description, and ensure it's public, then push it
5. open the repo on github, and explore the code there
6. make a change locally, commit it, and sync it
7. open the repo on github, and note that the changes have synced

#### Terms and Concepts (Remotes)

* **remote** - another repository that can be syncronized with a remote
* **github** - a service that hosts git remote repositories, and provides a web app to interact / collaborate on them
* **clone**  - download an entire remote repository, to be used as a local repository
* **fetch**  - downloading the set of changes (commits) from a remote repository
* **merge**  - taking two histories (commits),
* **pull**   - fetching changes and merging them into the current branch
* **push**   - sending changes to a remote repository and merging them into the specified branch
* **merge conflict** - when two commits conflict, and thus can't be merged automatically.

Instructor should diagram the clone/push/pull process.

** Insert diagram here **

### Break (5 minutes)
### Forking & Pull Requests (30 minutes)

#### Exercise 3: Fork, Clone and create a Pull Request

1. fork the ****** repo to your personal account
2. clone the repository to your computer
3. make a change to your local repo, commit it, and push (sync) it to your remote
4. use github.com to create a pull request to the upstream repository
5. make additional local changes, and commit/push them to your remote
6. verify that the pull request is updated

#### Terms and Concepts (Forking and Pull Requests)

* **fork** - make a copy of a repo on github under a different account, used for OSS collaboration
* **pull request** - a github feature which allows a user to suggest and discuss changes to a repo they have forked

Instructor should diagram the fork/clone/pull request process, and how it relates
to HW submission.

** insert diagram here **

### Closing

Review
