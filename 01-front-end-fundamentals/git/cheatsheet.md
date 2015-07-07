# Summary

## Local Repo Actions

### Create a repo
* git init

### Making Changes
* modify / save files (make changes)
* git add <file1> <file2> ...
* git commit -m "descriptive message"

## Remote Actions

### Cloning
* git clone <url> - download a repo from the URL, including all it's history, auto setup as remote

### Putting an existing repo on github
* create on github
* locally:
  * git remote add origin github_url
  * git push -u origin master  - this tells git to push to origin master by default

### Syncing changes
* git pull [remote_name] [branch_name] - fetch changes and merge them in
* git push [remote_name] [branch_name] - push changes to a remote repo

* Best practice is:
  1. git pull
  2. make changes until you reach a savepoint
  3. git pull
  4. git add / commit
  5. git push

### Fork & PR Model

Forking and Pull Requests are features of Github (not git).

1. Go to the repo you want to fork, and click the 'fork' button.
2. Clone your fork using `git clone fork_repo_url`
3. Make changes, add, commit.
4. Push changes to your fork on GH: `git push origin master`
5. Open a pull request by clicking the Pull Request link on your fork page.
