# Git Tricks
stashing, which conveniently “stashes” away uncommitted changes.

Open up style.css and change the h1 element to:

h1 {
  font-size: 32px;
  font-family: "Times New Roman", serif;
}
Now let’s say we had to make an emergency fix to our project. We don’t want to commit an unfinished feature, and we also don’t want to lose our current CSS addition. The solution is to temporarily remove these changes with the git stash command:

git status
git stash
git status
Before the stash, style.css was listed as “Changed by not updated.” The git stash command hid these changes, giving us a clean working directory. We’re now able to switch to a new hotfix branch to make our important updates—without having to commit a meaningless snapshot just to save our current state.

Let’s pretend we’ve completed our emergency update and we’re ready to continue working on our CSS changes. We can retrieve our stashed content with the following command.

git stash apply
The style.css file now looks the same as it did before the stash, and we can continue development as if we were never interrupted. Whereas patches represent a committed snapshot, a stash represents a set of uncommitted changes. It takes the uncommitted modifications, stores them internally, then does a git reset --hard to give us a clean working directory. This also means that stashes can be applied to any branch, not just the one from which it was created.

In addition to temporarily storing uncommitted changes, this makes stashing a simple way to transfer modifications between branches. So, for example, if you ever found yourself developing on the wrong branch, you could stash all your changes, checkout the correct branch, then run a git stash apply.

*Add your tricks below this line*
