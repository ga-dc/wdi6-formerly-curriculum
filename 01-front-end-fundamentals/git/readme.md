# Intro to Git

## Summary

This lesson aims to teach you both the fundamentals (both conceptual and
mechanical), of using git, as well as how to use git with Github to share
changes.

## Learning Objecitves

### Conceptual

- Explain what version control is and why developers use it
- List the main components of a git repository and how they relate:
  - repo, working tree, index (aka staging area),  commit
- Describe what a git remote repository is.
- Differentiate between git as a tool, and github as a service
- Define and differentiate between forking and cloning

### Mechanical
- Initialize a local git repository
- Add and commit changes to a git repository
- Push and pull changes to a remote repository
- Use the 'fork, clone, and pull request' model to submit assignments
- Un-initialize a git repository

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

Additionally, git supports tagging

##### Comparing changes to past versions
##### Sharing changes
##### Collaborating / discussing changes
##### Fearlessness in making changes

### Core Concepts of Git Repositories (40 minutes)

**I DO** (20 minutes)

Have students watch as instructor initializes an existing project as a
repository, adds files, and makes the first commit.

Instructor should use the whiteboard to diagram the parts of git involved (repo,
working tree, index, commits).

* Terms
  * **repository** - collection of commits (save points of the working tree)
  * **working tree** - the folder (and it's files and sub-folders, that are in the repository)
  * **commit** - a snapshot of the working tree at a giving time (along with a message of what changed)
  * **the index** - a staging area where we list changes we want to commit
  * **branch** - a label on a commit (it's the ancestry of the commit that constitutes what we usually consider the 'branch')
  * **tag** - also a label for a commit, but it never changes
  * **master** / development - conventional names for branches
  * **HEAD** - what is currently checked out.

#### Exercise (15 minutes)

1. Initialize a personal page repo.
2. Make an initial commit
3. Make a small change
4. Commit that change
5. Revert back to (checkout) the original version of your code
6. Switch back to (checkout) your latest version
