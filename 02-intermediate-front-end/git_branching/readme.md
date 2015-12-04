# Intermediate Git

## Learning Objectives

- Explain what a branch is in git
- Create, merge and delete branches on local and remote repositories
- Describe how branching and merging allows for collaboration during development
- Resolve a merge conflict


## Review Git Basics (5 min)

Quickly review the basics of git:

1. What is the most common workflow for creating save points while working
locally?
2. What commands are used to share changes (commits) between repos?
3. Describe the fork/clone model, and how it is used for HW submission.

## You Do: Branching Overview (15 min)

We are going to start with a [brief tutorial](http://pcottle.github.io/learnGitBranching/).  This is an introduction to branching.

- Do Levels 1-3.  Stop at 4: "Rebase Introduction".
- Take your time:
  - Read all the dialogs.  They are part of the tutorial.
  - Think about what you want to achieve
  - Think about the results you expect *before* you press enter.
- Whenever you see/type `git commit`, it may help to assume changes have been made and staged.  Why else would you "commit"?

## Think/Pair/Share-1/3/6: Why Branches?  (10 min)

You've had a brief overview.  Let's take a minute to think about why they are important, then share with your neighbor, and we'll share what we feel is important.

Q. Why is branching an important part of git?
---

> A. Branches are useful for many reasons, but some of the most common ones:

> 1. To allow experimentation. By switching to a new branch, we can experiment,
and if the experiment fails, we can delete it and easily switch back to master
(or another branch of our choice). If it succeeds, we can merge those changes
into master.
2. To allow work to proceed on multiple features (or by multiple people) without
interfering. When a feature is complete, it can be merged back into master.
3. To allow easy bug fixes on a stable version while features are being developed.


## You Do: Research Git Branching (15 min)

- Read the "Using Branches" of
* [Atlassian - Git Branching Tutorial](https://www.atlassian.com/git/tutorials/using-branches)
  - Let me know when you have reached the "git merge" section
  - You will see references to Subversion(SVN).  SVN is an older version control system.  I don't believe you need to know more than that to understand the comparisons.

## What are Branches? (5 min)

A branch in git is just a label on a  particular commit in a repository, along
with all of it's history (parent commits).

What makes a branch special in git (vs a tag), is that we're always *on* a
specific branch, and when we commit, the current branch label moves forward to
the new commit. Another way to say that is the branch label always stays at the
tip of the branch.

![Git Branch Diagram](https://www.atlassian.com/git/images/tutorials/collaborating/using-branches/01.svg)
> The diagram above visualizes a repository with two isolated lines of development, one for a little feature, and one for a longer-running feature. By developing them in branches, it’s not only possible to work on both of them in parallel, but it also keeps the main master branch free from questionable code.

> From [Atlassian - Git Branching Tutorial](https://www.atlassian.com/git/tutorials/using-branches/git-branch)


## Break? (10 min)

## Example (15 min)

(Use [GitUp](http://gitup.co) to demo visually what's happening).

- Make directory which will contain repo:

  `mkdir git-branching`

  `cd git-branching`

  `git status`

  `>fatal: Not a git repository (or any of the parent directories): .git`

  `git init`

  `>Initialized empty Git repository in /Users/jsm/development/wdi-7/sandbox/git-branching/.git/`

  **Note the change in the CL prompt here**

  `git status`

  ```
  >On branch master

  >Initial commit

  >nothing to commit (create/copy files and use "git add" to track)
  ```
- Create our sample file

  `touch branching.txt`

  **Note the change in the CL prompt here**

- Make initial commt

  `git add branching.txt`

  `git commit -m "initial commit: ..."`

  **Note the change in the CL prompt here**

- Add a line to branching.txt and commit

  [add line branching.txt]

  `git add branching.txt`

  `git commit -m "add line to branching.txt"`

  **Note the change in the CL prompt here**

- Make and checkout a feature branch. Make a change to branching.txt and commit
  `git branch feature`

  `git checkout feature`

  **going forward we will always use `git checkout -b <branch-name>` to the above two commands in one**

  **Note the change in the CL prompt here**

  Add a line to branching.txt

  `git add branching.txt`

  `git commit -m "add line to branching.txt"`

  `git checkout master`

  Switch back and forth between the two with atom open.

- Switch back to master and make a change to branching.txt
  On master, change the first line

  `git add branching.txt`

  `git commit -m "change first line in branching.txt"`

- Checkout the feature branch, merge in changes to master then merge feature into master

  `git checkout feature`

  `git merge master`

  `git checkout master`

  `git merge feature`

  `git branch -d feature`

### FtF and Questions

### You Do: A new project (15 min)

1. Create the structure
 - In ~/wdi/sandbox.  Create a directory and initialize a new repository
 - Create an index.html and commit
 - Fill out html boilerplate and put some elements on the page then commit
- Add some styling
  - Create a branch called "style"
  - Create a stylesheet link it to your html and add some styling to your page then commit
- Add some functionality
  - Create a new branch from master called "alert"
  - Create a script to alert when an element on your page is pressed and commit


## Common Commands for Managing Branches

* `git branch <new_branch_name>` - create a new branch
* `git checkout <branch_name>` - switch to a specific branch (checks out tip commit and makes branch active)
* `git checkout -b <new_branch_name>` - create a new branch and check it out in one step
* `git branch` - list local branches (`-a` lists local and remote)
* `git branch -d <branch_to_delete>` - delete a branch
  * will not let you delete if branch isn't merged into another branch (i.e. would cause data loss)
  * `git branch -D <branch_to_delete>` - over-rides and deletes a non-merged branch
* `git merge <branch_name>` - merges `<branch_name>` into the current branch, creating a new merge commit in the process


## Exercise - Pushing and PRs from Branches (10 min)

Many OSS projects request that you create pull requests from a non-master branch.

1. Fork and Clone https://github.com/ga-dc/git-tricks.
2. Create and switch to a branch called `<your_name>_suggestion`.
3. Add your own "trick".
4. Commit, and push that change to your remote called 'origin' (your fork)
5. Create a pull request from that branch to the upstream (ga-dc) master branch

## Merge Conflicts (5 min)

When we try to merge two branches (or commits from the same branch from a remote), changes may conflict. In this case, git will stop and ask us to fix the issues manually.

To do so:

1. Locate which files contain conflicts using `git status`
2. Open those files and fix the conflicts. (Look for the '<<<<', '====', and '>>>>' which will guide you to the conflict)
3. Commit the fixes.


## Exercise - Merge Conflicts (20 min)

1. Pair up with someone.
- Pick someone as the 'primary', and the 'secondary'.
- The primary should create a repo and add the secondary as a collaborator (search github for how to do this)
- Both members should clone the repo, and make changes on the "master" branch.

Merging commits:

1. Make commits on one computer and push them.
- Pull them to the other computer.
- Repeat the other way.

Merge conflicts:

1. Both students make changes on your respective working dirs, to the same line, of the same file.  Commit and push the changes.
- One collaborator will be forced to solve the merge conflicts, when they pull the changes to the same line.
- Practice resolving the commit.
- Repeat, ensuring the other partner pushes second, forcing them to resolve the new conflict.

## Homework

From this point on, all homework submissions should be a pull request from a feature (or 'topic') branch, named `<your_name>_solution`.


## `git mergetool` (An exercise for the reader)

Some merge conflicts can be quite confusing.  Git provides a way to use a visual tool to assist in resolving the merge conflicts.

If you have installed XCode, an decent tool (opendiff) is used.  For this class, we will use [KDiff3](http://kdiff3.sourceforge.net/).  Here's an [example, with images](http://www.gitguys.com/topics/merging-with-a-gui#Merging_with_kdiff3), including a way to try it first.

- Install via homebrew: `brew install kdiff3`
- Setup KDiff3 as your merge too using [these instructions](http://naleid.com/blog/2012/01/12/how-to-use-kdiff3-as-a-3-way-merge-tool-with-mercurial-git-and-tower-app).  
  - Be sure to skip the "Installation" steps.
  - Stop at "Git Tower Integration"
- When you have a merge conflict, you can type `git mergetool` to see a 3-way merge and the merge results.  Like this: ![](http://naleid.com/images/2012/01/kdiff3_merge_window_fixed.png)


## References

* [Git Book - Git Branching - Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
* [Atlassian - Git Branching Tutorial](https://www.atlassian.com/git/tutorials/using-branches)
* [Interactive Git Branching Tutorial](http://pcottle.github.io/learnGitBranching/)
* [Git Sandbox](http://pcottle.github.io/learnGitBranching/?NODEMO)
