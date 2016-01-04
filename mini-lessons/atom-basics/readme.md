# Atom

## Learning Objectives

* List common shortcuts for manipulating text
* List common shortcuts for navigating files
* Install and use common plugins to increase efficiency

## Framing

There are 3 tools we use the most as web developers:

1. Web Browser
2. Terminal / Shell
3. Text Editor

Today, we're going to focus on the preferred text editor for WDI, **Atom**.

As programmers, our main jobs really is to write and manipulate lots of text
across lots of files. Thus, you'll be spending a lot of time in your text
editor, and productivity gains in using it will have a very large impact in
your efficiency.

It's not just about raw speed though, getting comfortable using our text editor
will allow us to enter and stay in 'flow', where our code output keeps up with
our thoughts.

## Useful Shortcuts

My advice would be to pick 2 or 3 new shortcuts at the beginning of each week,
and making it a goal to use those shortcuts as often as possible for that week.

Maybe even put them on a sticky note on your computer or some other method that
will frequently remind you of them.

### Modifier Keys

Here are the primary modifier keys for Macs:

* ⇧ - Shift  
* ⌘ - Command / CMD
* ⌥ - Option  / OPT / ALT
* ⌃ - Control / CTRL

### Text Manipulation

Note that many of these cursor shortcuts work in almost any Mac application, so
try them outside of Atom!

#### Cursor

| Shortcut | Action |
|----------|--------|
| ⌘ + Left/Right | Move the cursor to the beginning / end of the line |
| ⌘ + Up/Down | Move the cursor to the beginning / end of the document |
| ⌥ + Left/Right | Move the cursor between words |
| ⌥ + backspace | delete to the beginning of the word |

**Note**: Add SHIFT to select in addition to moving the cursor.

#### Multi-Cursor

| Shortcut | Action |
|----------|--------|
| ⌘ + click | Create a new cursor where you clicked |
| ⇧ + ⌃ + Up/Down | Create a new cursor above below the current one |

#### Selection

| Shortcut | Action |
|----------|--------|
| ⌘ + l | Select the current (l)ine. Press again to select the next line |
| ⌘ + d | Select the current wor(d). Press again to select the next instance of that word |
| ⌘ + ⌃ + g | Select all instances of the current word |

#### Text Manipulation

| Shortcut | Action |
|----------|--------|
| ⌘ + / | Comment out the current line |
| ⌘ + ⌃ + Up/Down | Move the current line up / down |
| ⌘ + f | Find in the current file |
| ⇧ + ⌘ + f | Find in all files in the current project |

### General Navigation

| Shortcut | Action |
|----------|--------|
| ⌘ + , | Open preferences |
| ⌃ + g | Go to line |
| ⌘ + p | Go to file |
| ⌘ + r | Go to symbol |
| ⌘ + ⇧ + p | Toggle Command Palette |

### Cheatsheet

If you want to see more shortcuts, check out this great [cheatsheet for Atom
shortcuts](http://d2wy8f7a9ursnm.cloudfront.net/atom-editor-cheat-sheet.pdf).

## Plugins

Atom, like many text editors, supports plugins to add new or modify existing
functionality.

### Exercise: Find an Atom Plugin

Take 5 minutes to search the web for Atom plugins you think might be useful for
us as web developers. At the end of the 5 minute period, let's share those
plugins that we think will be really useful.

--------------------------------------------------------------------------------

### Recommended Plugins

**[emmet](https://atom.io/packages/emmet)** allows us to use the emmet system for quickly typing out HTML.

**[file-icons](https://atom.io/packages/file-icons)** improves the file icons in the sidebar

**[linter](https://atom.io/packages/linter)** is a general package to allow 'linting', or error checking our code in Atom.
  * [linter-jshint](https://atom.io/packages/linter-jshint) adds support for JS
  * [linter-ruby](https://atom.io/packages/linter-ruby) adds support for Ruby
  * [csslint](https://atom.io/packages/csslint) adds support for CSS
**[ruby-block](https://atom.io/packages/ruby-block)** adds highlighting based on where our cursor is to help us see the structure of our code

**[javascript-snippets](https://atom.io/packages/javascript-snippets)** lets us type out shortcuts for common JS code and it will expand out to the full text.

**[csscomb](https://atom.io/packages/csscomb)** helps us keep our CSS neat and tidy by sorting our properties within each rule according to convention.

**[auto-complete+](https://atom.io/packages/autocomplete-plus)** is a core package in Atom, but you should look at this and see about installing more 'providers' which enhance the auto-complete functionality.
