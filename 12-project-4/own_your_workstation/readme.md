# Own Your Workstation

- display the current git branch in your prompt
- configure rspec to default to color

## Intro

This will be an overview of tools and conventions we use to manage the operation system.  This lesson should provide some of the concepts and skills you need to get started, but mostly, I expect it to whet your appetite.  To encourage you to learn more about your world.

The information in this lesson falls into two categories:
- Configuration
- Installing and updating necessary tools

## Bash: the underlying shell

The "shell" script is your window into the Opersting Systrm. The system that controls your computer. You control (almost) everything through shell scripts. OSX and Almost all Linux distributions default to bash.

Another popular shell is ZSH. I recommend you play with it a little. The scripts aren't exactly the same, but they are similar. When you feel somewhat comfortable, see if OhMyZsh answers your needs.

Let's dive right in. Everyone, start up bash. <pause>.
Every terminal that you open is another instance of Bash.

Now type:
`PS1="/w >"`

Type a few commands.

Q. What happened?
---

> A. You changed your prompt. More explicitly, you changed the value of the Environment Variable that configures your prompt.

Q.  How do I undo?  How do I get back to my regular prompt?
---

> A.  It's just a variable. We simply reassign the original value.

Q. What was the original value?
---

<pause>

- First lesson. We are in control. Control is literally at our fingertips.
- Second lesson:  With great power comes great responsibility. Don't just type in whatever you see in a tutorial. Think about what it means. What will it do to your system?  And third...
- Third lesson: We need safety nets. We need a way to recover from mistakes.  It is important the we can play.  We need to try things.  While playing we will make mistakes. That's how we learn.

So... What is our safety net here?

One way to recover is to reassign the original value. We would need to record the original value someplace.  Like our memory. Or on paper. Or...?

Wait a minute, Matt. When I turn my computer on, it gives me that prompt. It must store it someplace.

Or a configuration file. We lost the information about this prompt for our current session. We can't go "back" to our original value. But, we can open another session. It will use our defaults.

Open a new terminal. Wa la.

## System and User Files

The files on your hard drive fall into basically 2 categories: system files and user files. For either category, these files tend to be either programs, data, or configuration.  On POSIX (Unix-like) systems, everything is controlled by configuration files. Values in a file indicate where your Postgres data is stored. They indicate whether rspec should output in color.  There are no magical databases, like the Registry on Windows. It's all just files. Since it's just files, the organization of those files and the conventions we follow becomes paramount.  Today we are going to talk mostly about user configuration files.
In POSIX systems these are found in your home dir.  It's important enough that typing simply `cd` changes to your home dir.

```
cd
```

Note: this is not the root directory of your hard drive, just the portion set aside for you (`pwd`). There is a separate home dir for every everyone that logs into your system.

```
pwd
```

We are in `/Users/matt`.  

Look at the Users on your system:
```
ls /Users
```

Look at the root dir:
```
ls /
```


## Dot Files

Configuration files are usually stored in your Home dir and are often referred to as "dot files". Their file (or directory) names start with a period, or "dot", indicating that they are hidden, system files.

Action: compare `ls` to `ls -a`

Lots of files. These files are either shell scripts, programs that control your shell, or config files for other programs.  Let's cover the config files first.

## Runtime Configuration

Config files usually end in `rc`. This reference goes back to Unix's grandparent (which had a runcom feature).  Today, we usually translate the the "rc" to "runtime configuration".

```
ls .*rc
```

> Note: I didn't need `-a`

### Configuring pry

Type `pry`

A lot of what you are seeing now is coming from `~/.pryrc`.

```
less .pryrc
```

Look at the rc files:
```
ls -a *rc
```

## Shell Scripts

The two most important shell scripts (for bash) are .bashrc and .bash_profile.  Every time you start a shell, it looks for one of these files.

The shell can be run in non-interactive mode (i.e. cron, programs).  In .bashrc we will configure things that programs need, but humans don't.

You guys are familiar with an interactive (or login) shell. Each time you run Terminal (or iTerm), you are starting another interactive bash shell. During startup, by convention, bash looks for a .bash_profile file in your Home dir. If found, it is loaded.  This mode needs everything the non-interactive mode had, plus things a user needs. Things to make your work easier.  For instance, programs need Environment Variables, they need to know where to find dependencies, and they need functions to be defined.  Users want command aliases (`gcom` for `git checkout master`) and helper functions.

In most Unix OS's, the .bash_profile is only run during the first login, .bashrc is run on each subsequent shell startup.  On OSX, the terminal programs always load `.bash_profile`. So we usually just edit `~/.bash_profile`.

Let's look at your `~/.bash_profile` (review "untouched", shared via slack).

Let's review mine.  What is happening in here?


## Environment Variables

We also provide configuration values through Environment Variables. These are essentially global variables, assigned in "the environment" so that they are available to all programs. The convention is ALL_CAPS.

You can run `set` to see everything, but this has a lot of noise.  Mostly from "rvm".   Try it.  

Action: show `set` as Guest.

## Echo

Echo is the equivalent of `puts` or `console.log`

```
echo $HOME
```
That's how the OS knows your home dir.

Note the dollar sign prefix. Bash uses "$" to "expand" the variable or to "refer to the value of the variable".

### Exercise: GITHUB_USERNAME

```
echo $GITHUB_USERNAME
```

> Q. Where does this value get set?
---

A. .bash_profile. We added this during [InstallFest](https://github.com/ga-dc/installfest/blob/master/installfest.md#github-the-social-network-of-code).

## PATH

Whenever you type in a program name in Terminal, the OS traverses your PATH to find that program, in the order listed.  The early paths take priority.

```
echo $PATH
```


## if/fi

Just like other languages, bash needs to indicate a block of code.  Such as the beginning and end of a conditional.  Bash uses the command and the reverse of the command, i.e. [if/fi](http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO-6.html#ss6.2).


## Unix Pipes

A key to using bash is unix pipes.  Put simply, we pipe information from one program to another. Programs are designed to output information that can be used as the input to another.

Grep is a tool that filters information.

```
ls | grep Do
```

That is the equivalent of:
```
ls Do*
```

`ls` did not need to provide a way to filter it's output.  Unix already provided grep.  There are some that would argue that the `ls` program is more complex than it needs to (it contains unnecessary complexity), because it does NOT need to provide a way to filter it's output.  The OS provides `grep`.

There are tools to process large text files, to extract columns of data, specific lines, and certain values.  

In my home dir, I have a log file from a test of my router: `ping_router_test_20150415.txt`.  It contains a lot of information.

If I just output the file, it's not very helpful.

```
cat ~/ping_router_test_20150415.txt
```

`less` is a program that paginates large portions of text.

```
cat ~/ping_router_test_20150415.txt | less
```

## [Homebrew](http://brew.sh): the missing package manager for OSX

Research these commands:
- brew search
- brew update
- brew outdated
- brew upgrade git

## Ruby gems

Similarly, we need the latest versions

## [Rvm](Rvm.io)
  - rvm get stable
  - rvm list
  - rvm list known

## Next steps?

Since you live in the shell, I highly suggest you spend some time learning about it. Take a tutorial. Play a bit.

## References
- http://apple.stackexchange.com/questions/12993/why-doesnt-bashrc-run-automatically
- http://www.linuxnix.com/2013/04/linuxunix-shell-ps1-prompt-explained-in-detail.html
- http://www.linuxnix.com/2011/08/linux-shell-inbuild-variables-system-admin.html
- [Bash Tutorial](http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html)
- [Homebrew](http://brew.sh)
