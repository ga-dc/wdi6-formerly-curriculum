# Intermediate Git

## Learning Objectives

- Explain what a branch is in git
- Create, merge and delete branches on local and remote repositories
- Describe how branching and merging allows for collaboration during development
- Resolve a merge conflict

## References

* [Git Book - Git Branching - Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
* [Atlassian - Git Branching Tutorial](https://www.atlassian.com/git/tutorials/using-branches)
* [Interactive Git Branching Tutorial](http://pcottle.github.io/learnGitBranching/)

## Review Git Basics

Quickly review the basics of git:

1. What is the most common workflow for creating save points while working
locally?
2. What commands are used to share changes (commits) between repos?
3. Describe the fork/clone model, and how it is used for HW submission.

## What are Branches?

A branch in git is just a label on a  particular commit in a repository, along
with all of it's history (parent commits).

What makes a branch special in git (vs a tag), is that we're always *on* a
specific branch, and when we commit, the current branch label moves forward to
the new commit. Another way to say that is the branch label always stays at the
tip of the branch.

![Git Branch Diagram](https://www.atlassian.com/git/images/tutorials/collaborating/using-branches/01.svg)
> The diagram above visualizes a repository with two isolated lines of development, one for a little feature, and one for a longer-running feature. By developing them in branches, it’s not only possible to work on both of them in parallel, but it also keeps the main master branch free from questionable code.

> From [Atlassian - Git Branching Tutorial](https://www.atlassian.com/git/tutorials/using-branches/git-branch)

## Why Branches

Branches are useful for many reasons, but some of the most common ones:

1. To allow experimentation. By switching to a new branch, we can experiment,
and if the experiemnt fails, we can delete it and easily switch back to master
(or another branch of our choice). If it succeeds, we can merge those changes
into master.
2. To allow work to proceed on multiple features (or by multiple people) without
interfering. When a feature is complete, it can be merged back into master.
3. To allow easy bug fixes on a stable version while features are being developed.


## Example

(Use GitUp to demo visually what's happening).

1. Start with last night's HW repo (e.g. timer_js)
2. Create a new branch (`git branch experimental`, `git checkout experimental`)
3. Create 2 commits doing something a bit crazy.
4. Switch back to master branch (`git checkout master`) and make a reasonable change / commit.
5. Switch back to 'experiment' branch (`git checkout experiment` ).
6. Make one more commit. Decide it's ready to go.
7. Checkout master, and merge in experimental (`git checkout master`, `git merge experimental`).

### Playtime

Spend a few minutes creating branches, commiting to them, switching and deleting.

## Common Commands for Managing Branches

* `git branch <new_branch_name>` - create a new branch
* `git checkout <branch_name>` - switch to a specific branch (checks out tip commit and makes branch active)
* `git checkout -b <new_branch_name>` - create a new branch and check it out in one step
* `git branch` - list local branches (`-a` lists local and remote)
* `git branch -d <branch_to_delete>` - delete a branch
  * will not let you delete if branch isn't merged into another branch (i.e. would cause data loss)
  * `git branch -D <branch_to_delete>` - over-rides and deletes a non-merged branch
* `git merge <branch_name>` - merges `<branch_name>` into the current branch, creating a new merge commit in the process


## Exercise - Pushing and PRs from Branches

Many OSS projects request that you create pull requests from a non-master branch.

1. Go to your PBJ repo.
2. Create and switch to a branch called 'suggestion'
3. Make a small improvement to this repo (perhaps add something to the `git-tricks.md` file in this folder).
4. Commit, and push that change to your remote called 'origin' (your fork)
5. Create a pull request from that branch to the upstream (ga-dc) master branch

## Merge Conflicts

When we try to merge to branches (or commits from the same branch from a remote), changes may conflict. In this case, git will stop and ask us to fix the issues manually.

To do so:

1. Locate which files contain conflicts using `git status`
2. Open those files and fix the conflicts. (Look for the '<<<<', '====', and '>>>>' which will guide you to the conflict)
3. Commit the fixes.


## Exercise - Merge Conflicts

1. Pair up with someone.
2. Pick somone as the 'primary', and the 'secondary'.
3. The primary should create a repo and add the secondary as a collaborator (search github for how to do this)
4. Both members should clone the repo, and make changes on master branch.
5. Practice making commits and push/pull them.
6. Purposefully both make changes and commit them, such that they are on the same line.
7. Practice resolving the commit. Repeat and let the other partner resolve the new conflict.

## Homework

1. Read one or more of the references above. Perhaps follow the last interactive
tutorial (it's really good).

2. Create a github issue on the PBJ repo (not a pull request like usual)
describing at least one thing you learned.

3. For the rest of the week, submit all your HW pull requests on a 'topic' branch.
Name your branch something like "bobs_solution".
