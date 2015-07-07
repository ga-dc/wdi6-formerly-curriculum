# Git Tricks

Bundle the Repository
Similar to the git archive command, git bundle turns a repository into a single file. However, in this case, the file retains the versioning information of the entire project. Try running the following command.

git bundle create ../repo.bundle master

It’s like we just pushed our master branch to a remote, except it’s contained in a file instead of a remote repository. We can even clone it using the same git clone command:

cd ..
git clone repo.bundle repo-copy -b master
cd repo-copy
git log
cd ../my-git-repo
The log output should show you the entire history of our master branch, and repo.bundle is also the origin remote for the new repository. This is the exact behavior we encountered when cloning a “normal” Git repository.

Bundles are a great way to backup entire Git repositories (not just an isolated snapshot like git archive). They also let you share changes without a network connection. For example, if you didn’t want to configure the SSH accounts for a private Git server, you could bundle up the repository, put it on a jump drive, and walk it over to your co-worker’s computer. Of course, this could become a bit tiresome for active projects.

We won’t be needing the repo.bundle file and repo-copy folder, so go ahead and delete them now.
