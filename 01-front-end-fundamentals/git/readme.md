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

* [Interactive Git Cheetsheet](http://ndpsoftware.com/git-cheatsheet.html)
* [Github Guides](https://guides.github.com)
* [Github Training](https://training.github.com/kit/)
* [Git Immersion - Interactive Course](http://gitimmersion.com/lab_05.html)
* [Pro Git](http://git-scm.com/book/en/v2) - An in-depth free PDF book for those wanting to understand git deeper
* [GitUp - Interactive Commit Visualizer](http://gitup.co)


## Outline

### The Purpose of Version Control (10 minutes)

Think about how you've managed tracking changes to a file over time (perhaps
with other people).

Questions:
* **What problems did we face?**
* **How might a Version control system like solve these?**

Here are some problems we face as developers, and how git solves them:

**Reverting to past versions**

Git allows us to make save points at any time. These save points are called
'commits'. Once a save point is made, it's permanent, and allows us to go back
to that save point at any time. From there, we can see what the code looked like
at that point, or even start building off that version.

**Keeping track of what each version 'meant'**

Every commit has a description (commit message), which allows us to describe
what changed to make that commit. This is usually a description of what features
were added or what bugs were fixed.

Additionally, git supports tagging, which allows us to mark a specific commit
as a specific version of our code (e.g. '2.4.5').

**Comparing changes to past versions**

It's often important to see content of the actual changes that were made. This
can be useful when:
* tracking down when and how a bug was introduced
* understanding the changes a team member made so you can stay up-to-date with progress
* reviewing code as a team for correctness or quality/style

Git allows us to easily see these changes (called a `diff`) for any given commit.

**Sharing changes**

Most software is developed on a team. Thus, it's important for us to share our
changes so that others can incorporate them into the version they are working on.

**Collaborating / discussing changes**

In addition to just sharing changes, it is useful to have discussions on those
changes (again for code review). Git doesn't support this out of the box, but
Github does provide this feature. For example, you can add comments to a changed
line or lines in a given commit.

**Fearlessness in making changes**

In developing software, we often want to experiemnt in adding a feature or
refactoring (rewriting) existing code. Because git makes it easy to go back to a
known good state, we can experiement without worrying that we'll be unable to
undo the experiemental work.

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

Visit the [haiku](https://github.com/ga-dc/haiku) repo and follow the instructions
there.

#### Terms and Concepts (Forking and Pull Requests)

* **fork** - make a copy of a repo on github under a different account, used for OSS collaboration
* **pull request** - a github feature which allows a user to suggest and discuss changes to a repo they have forked


Instructor should diagram the fork/clone/pull request process, and how it relates
to HW submission.

** insert diagram here **

### Closing

What problems do we anticipate using git / github?
Review learning objectives.

## Quiz Questions

1. What are the main components of a git repository and how do they relate?
2. Describe the steps of the process for contributing to open source software on
   Github (the same as our homework submission process).

## Appendix - Git CLI Commands

### Creating Repositories

* `git init` - run this command in a folder to turn it into a git repository
  * note: don't init a repo inside an existing repo! (also don't init in your home folder)
OR
* `git clone <URL>` - download (clone) a repo from github (or other remote source)

### Linking an existing repo to github

1. Create the repo on github.com (make sure not to check the 'initialize with readme').
2. Follow the instructions on the new repo's webpage to add as a remote:
3. Change directories to the local repo
  * `cd ~/path/to/repo`
4. Add the github remote, and name it 'origin':
  * `git remote add origin <URL>`
5. Push the existing commits up to the remote called 'origin' , and set it to track master branch:
  * `git push -u origin master`

Once linked, you can just run `git push` to push master branch to master branch

### Committing

1. Add the files you want to commit to the index (equivalent to checking which files you want to commit in the Github GUI app)
  * `git add file1 file2 ...`, or `git add .` will add all changes in the current folder
2. Create the commit:
  * `git commit -m "description message for commit"`
  * if you omit the `-m` and message, then git will open an editor for you to write the message in

### Syncing with a remote (push/pull)

1. `git pull [remote] [branch]` - fetch and merge changes (from the origin and branch specified) and merge them into the current branch.
  * If origin and branch aren't specified, git will default to the tracking branch (usually origin and the remote branch with the same name as the current branch).
  * If no origin/branch are specified, and no tracking branch is set up, git may tell you to specify
2. 'git push [remote] [branch]' - push and merge local changes from the current branch to the specified branch on the remote repo and branch specified.
  * Same rules apply as `git pull` above.

## Homework

### 1. Personal Portfolio Page
Publish a simple portfolio site using github pages. You can find more information on the [github pages guide](https://pages.github.com).
For content, you can create something new, or just copy over your HTML/CSS/[JS] from the admissions process. (You'll likely be modifying replacing this page as the course progresses.)

You'll know you got it working when visiting *your_github_username*.github.io displays your page with proper styling.

### 2. Fork and Clone the PBJ Repo

Fork the [PBJ Repo](https://github.com/ga-dc/pbj) to your personal account. Clone *your fork* to your
computer in your `~/wdi` folder.

NOTE: If you already have a `pbj` folder in your `~/wdi` folder, delete or rename it before you clone.

### Submission

File a github issue, on https://github.com/ga-dc/pbj/issues, with a link to:
* your personal github pages repo
* the URL to see your hosted page.
* a link to the repo you forked

At the *top* of the issue description, please include a block like so (numbers out of 5):

```
comfort_level: 4
completeness: 5
```


### Optional Bonus assignments:
* Create a blog site using jekyll (hosted using a separate repo at **your_github_username*.github.io/blog, this is called a 'project' rep)
* Register for a custom domain name (usually $6 - $10 a year), and associate it with your github project site

You'll find instructions that will help at the bottom of the [github pages guide](https://pages.github.com).
