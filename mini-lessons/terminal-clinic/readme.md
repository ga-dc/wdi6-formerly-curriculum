# Terminal Clinic

## Learning Objectives

- Use hotkeys to speed up your terminal workflow
- Download and customize iTerm
- Configure and customize PS1 environment variable 
- Define aliases and functions to shorten repetitive tasks

## iTerm2

>iTerm2 is a terminal emulator for Mac OS X that does amazing things.

We'll be using iTerm for hotkeys and configuring the starting directory. 
Check out more features on [iTerm's Website](https://www.iterm2.com/features.html)

Download and install the application by clicking on [the download button here](https://www.iterm2.com/)

Configure both a system-wide hotkey and one for toggling fullscreen.

Choose and install a theme - https://github.com/mbadolato/iTerm2-Color-Schemes

## The PS1 Prompt

The PS1 environment variable allows us to customize our prompt.

```
bash-3.2$ PS1="jesse: "
jesse: PS1="\u: "
jesse: PS1="\u@\h: "
jesse@double: PS1="\u@\h:\w "
jesse@double:~/ga/ga-dc/curriculum/mini-lessons/terminal_clinic PS1="\u@\h:\w $ "
jesse@double:~/ga/ga-dc/curriculum/mini-lessons/terminal_clinic $
```

Here are all possible escape sequences - http://www.tldp.org/HOWTO/Bash-Prompt-HOWTO/bash-prompt-escape-sequences.html

echo 'export PS1="\u@\h:\w $ "'  >> ~/.bash_profile

## Aliases

Aliases allow us to configure shortcuts

`alias gl="git log --all --oneline --graph --decorate"`

## Dotfiles

A popular thing that developers do is share their dotfiles.

The idea is:

- create a `dotfiles` repo in your home directory.
- create symbolic links in your homw directory that link to the files in dotfiles.
- share on github!

Here are some popular dotfiles repos:

- https://github.com/jshawl/dotfiles
- https://github.com/adambray/dotfiles
- https://github.com/mathiasbynens/dotfiles
- https://github.com/holman/dotfiles