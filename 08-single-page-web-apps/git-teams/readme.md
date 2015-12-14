# Git Team Workflow

## Learning Objectives
- Distinguish between git workflow models to organize code changes and collaborate as a team
- Use branches and pull requests to isolate changes tied to specific features
- Efficiently and correctly resolve merge conflicts
- Explain the difference between `rebase` and `merge`

## Review Basic Git Workflow - Intro (5 mins) - ST-WG

Although you've all been using Git and Github for over a month, you've largely been doing so individually. In the wild, software development rarely takes place in this kind of workflow. When you are working in the industry, you will likely be part of a development team. You will definitely be part of a development team as you complete Project 3. Clear, replicable version control practices, combined with good communication, can make collaboration easier and more efficient. In order to build up to that, we need to make sure we're building on a solid foundation of Git basics.

### Why Use Version Control?
When you're working on a project, you sometimes want to be able to retrace your steps, or even revert your project to a previous state.  And often (particularly in the workplace) you need a way to effectively collaborate on a single project without stepping on each others' toes. Version control tools address all of these needs.

### Why Git?
Git, apart from being free and open source, is also in many ways a superior system to many older version control tools (such as Subversion) because it is a "distributed" version control tool. This means that there is no centralized approval structure for making changes to the project; instead, every student who clones the repository has their own complete copy, which they can then edit and change. This makes it much easier to use when working in groups.

>In addition, Git is much better at handling branching and merging, two big topics we'll be covering today.

### How Does Git Work?
Git works by creating ['snapshots'](https://git-scm.com/book/en/v1/Getting-Started-Git-Basics), which record the current state of a repo. Each snapshot represents the state of the project at some moment in time.

To create a new snapshot, we use `git add` to select (or "stage") a file or files that have changed since our last snapshot, and `git commit` to actually create a new snapshot which includes those changes.

## Review Git Branching (10 mins)

A branch in git is just a label on a particular commit in a repository, along with all of its history (parent commits). When we commit, the current branch label moves forward to the new commit. Another way to say that is the branch label always stays at the tip of the branch.

> `HEAD` indicates the point on the repository that we're reading from. When we run `git branch`, new branches get added at wherever `HEAD` points. If 'HEAD' is pointing at the end of a branch, it also means that new commits will be added to that branch.

![Git Branch Diagram](https://www.atlassian.com/git/images/tutorials/collaborating/using-branches/01.svg)

> From [Atlassian - Git Branching Tutorial](https://www.atlassian.com/git/tutorials/using-branches/git-branch)

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

## You Do: Emergency Compliment - Setup (5 min)

Form pairs. To start:
- One student should fork and clone the [starter-code](https://github.com/ga-dc/emergency_compliment) to their GitHub
- Add the second student as a collaborator to this repository
- The second student should clone the newly-forked repo, so they have a local copy and can start working

```bash
git checkout git-teams-starter
npm install
```
And to run your app:
```bash
nodemon index.js
```
View app on `http://localhost:3000`

## Single-Remote Workflows (15 min)

### Centralized Workflow

How It Works: The remote repo has one single branch on it, master. All collaborators have separate clones of this repo. They can each work independently on separate things. However, before they push, they need to run git fetch/git pull to make sure that their master branch isn't out of date.

**(+)** Very simple

**(-)** Collaboration is kind of clunky.

### Feature Branch Workflow

How It Works: This workflow is very similar to the 'Centralized' workflow. The biggest difference is that there are branches (which helps to keep feature-related commits isolated), and that instead of pushing changes up directly, collaborators (a) push up changes to a new remote branch rather than master, and (b) submit a pull request to ask for them to be added to the remote repo's master branch.

**(+)** Better isolation than Centralized model, but sharing is still easy. Very flexible.

**(-)** Sometimes it's too flexible - it doesn't distinguish in any meaningful way between different branches, and that lack of structure can be problematic for larger projects.

## You Do: Merging: The Good, The Bad, and The Ugly (20 min)

**Throughout today's exercises, we will use the `git-teams-starter` branch where we would usually use `master`.**

***The Good***
- *Student 1* Check out a new feature branch and create `views/edit.hbs` and add the appropriate code
  > **Hint:** You may need to look into [Method Override](https://github.com/expressjs/method-override#override-using-a-query-value) for your form's action!

- *Student 2* Check out a new feature branch and add a route for `/compliments/:id/edit` to `index.js`
- *Both Students* Commit you changes and push them to the remote repo. Open a pull request on Github to merge the changes from your feature branch into `git-teams-starter`. If there are no conflicts, merge your pull request. If there are, you might need to  `git pull` the latest changes, then `commit` again. Once your changes are successfully merged, delete your feature branches, check out `git-teams-starter`, and `pull`.

**Pro Tips**:

1. If you already have an `emergency_compliment` repo, you can clone it down and give it a different name using: `git clone <repo url> <name for repo>`
2. Make sure you are starting your branches from an `git-teams-starter`
3. If you need to get more branches, or had forked previously, you are going to want to set the `ga-dc` version of `emergency-compliment` as your `upstream` remote.
4. Be mindful of the commands you are running, e.g. careful not to run `git checkout -b` when you are trying to switch between branches, this will create new branches.

Next, try to break it!!!!
***The Bad AND The Ugly***
- **Student 1** Check out a new feature branch and add an `update` method to `complimentsController`
- **Student 2** Check out a new feature branch and add a `edit` method to `complimentsController`
- **Both Students** Commit you changes and push them to the remote repo. Open a pull request on Github to merge the changes on your feature branch into `git-teams-starter`.
- **Student 1** Merge your changes into `git-teams-starter` on GitHub.
- **Student 2** Check your PR -- there should be a merge conflict!

When you finish:

Don't worry about writing any code to resolve the merge conflict now, instead, decide between your group how to think about and outline the steps for the next commit.

Some things to consider:

1. Who will resolve the conflict?
2. What are the necessary commands you will need to run to incorporate those changes?
3. What kind of system and channels best allow developers to prevent, and resolve merge conflicts most effectively?

## BREAK (10 min)

## Resolving Merge Conflicts (10 min)
In cases like the one we have created, instead of directly merging, Git asks the user to manually resolve the conflicts. In your project files, after trying to merge, those conflicts usually look something like this:
```
  <<<<<<< HEAD
  var x = 1,
      y = 2;
  =======
  var x;
  >>>>>>> other_branch
```
The first section is the version that exists on the current branch; the second section is the version that exists on the branch you're trying to pull in. Figure out which version of the code makes the most sense moving forward, delete the version that doesn't and all the extra stuff that Git adds (<<<<<<<, =======, etc.) and run `git commit` to finalize the merge.

For example, if we decided we only needed var x, delete the other "stuff":

`var x;`
Now, we have only the code we need and can git commit.

## You Do: `Git Pull (Merge Conflicts)` (10 min)

- **Student 2**
``` bash
git checkout git-teams-starter
git pull origin git-teams-starter
git push <remote> <your-branchname>
```
- **Both Students** On one machine, look over the merge conflict, resolve it locally, commit, and push.

- **Student 1** Pull down the changes to `git-teams-starter`


## Rebasing (15 min)

[Document Dive](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/)

While merging represents one path for combining different branches, there is another common path called rebase. Rebasing works differently than merging. Rather than combining the finished data from two different branches via a single commit, it combines the two branches themselves, rearranging them and, effectively, re-writing history.

Here's what a rebase looks like. Suppose we have two branches, a master and a feature branch.

One day, someone makes a commit onto the master branch. We want to include those changes into our feature branch, so that our code doesn't conflict with theirs. From our feature branch, if we run the command `git pull --rebase <remote> <branch>`, we can tell git to rewrite the history of our feature branch as if the new commit on master had always been there.

Rebase is extremely useful for cleaning up your commit history, but it also carries risk; when you rebase, you are in fact discarding your old commits and replacing them with new (though admittedly, similar) commits, and this can seriously screw up a collaborator if you're working in a shared repo. **The golden rule for git rebase is "Only rebase before sharing your code, never after."**

Like git merge, git rebase also sometimes runs into merge conflicts that need to be resolved. The procedure for doing this is almost the same; once you fix the conflicts, run `git rebase --continue` to complete the rebase.

## You Do: Resolve Merge Conflicts w/ Rebase (20 min)

**Both Students**

1. Check out a new feature branch.
- Create `views/layout.hbs` - don't forget the {% raw %}`{{{body}}}`{% endraw %} inside the `<body></body>` tags.
- Add `app.use('/static', express.static(__dirname + '/public'));` to your `index.js`
- Create a directory called `public` and add a stylesheet called `styles.css` inside of it. Write some CSS.
- Link to your stylesheet from the `<head>` of `layout.hbs`.
- Both students commit your changes.
- **Student 1** push branch and make a pr, and merge your changes.
- **Student 2** then try to do the same thing.
- **Student 2** grab the necessary changes with `git pull --rebase` and resolve any merge conflicts with `git rebase --continue`.

## The Human Side: Communication (10 mins)

### Why do code reviews?

Jeff Atwood (co-founder of Stack Exchange, and a smart dude) has written a
[great summary](http://blog.codinghorror.com/code-reviews-just-do-it/) which I
encourage you to read. The short verion? Code review can reduce the number of
errors in our programs dramatically.

In addition we believe that learning to read code critically is an important
part of improving our own code. After all, to improve our own code, we must read
it, looking for ways to improve it.

Additionally, many work environments practice some form of code review, so it's
good to get practice in giving feedback to others now. Even if your future
workplaces don't have a formal code review process, you may find them so helpful
that you implement your own informal practices with your teammates!

Interested to read more about [code reviews?](https://github.com/ga-dc/project2-code-review/blob/master/code_review_primer.md)

### Integration Manager Workflow (Distributed Workflow)

These approaches all use multiple remote repos; typically, everyone has their own fork of the 'original' project (the version of the repo that's publicly visible and is managed by the project maintainer), and changes are submitted via pull request.

How It Works: One collaborator plays the role of 'Integration Manager'. This means that they are responsible for managing the official repository and either accepting or rejecting pull requests as they come in.

**(+)** One student integrates all changes, so there's consistency.

**(-)** Could get overwhelming for large projects.

## Quiz Questions
- Identify the syntax needed to create a new branch. How about creating a new branch and switching to it?
- Why should you never work on the same files on different branches?
- Explain the difference between rebase and merge

## Cheat Sheets
- [Github Official](https://training.github.com/kit/downloads/github-git-cheat-sheet.pdf)
- [Interactive Git](http://ndpsoftware.com/git-cheatsheet.html#loc=stash;) (Uses slightly different terminology that we're used to, but nifty)

## Rebase vs Merge
![Rebase vs Merge](https://raw.githubusercontent.com/gitforteams/diagrams/master/flowcharts/rebase-or-merge.png)

## Further Reading
- [Jesse's blog post!](https://jesse.sh/rebases/)
- [Git Worklows Overview](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Git Teams](http://gitforteams.com/)
