# Git Tricks

*Add your tricks below this line*

## Git Autocorrect Help
* Configure your terminal to make assumptions about typos.
* Example: git pusj => git push
* Code:
* git config --global help.autocorrect 3
* Result:
* Entering git pusj will return the following...
* WARNING: You called a Git command named 'pusj', which does not exist.
* Continuing under the assumption that you meant 'push'
in 0.3 seconds automatically...
