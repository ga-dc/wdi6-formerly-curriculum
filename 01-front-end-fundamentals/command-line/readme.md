#	Your Work Environment

##	Controlling your world

---

##	Framing (before Objectives)

Introduce students to the command line.  Giving them a brief taste before sharing the Learning Objectives.

_"You just learned that mentors are all around you.  I'd like to introduce you to your closest and best mentor."_ <picks up computer>

> This is your computer, there are many like it, but this one is yours.  
> Your computer is your best friend.  You must master it like you master your life.  
> Your computer without you is useless.

_Think about that..._

> My computer, without me, is useless.

pause

- Let's start owning it.
- Let's start playing with it.
- Let's create something today.


_Let me show you the command center of the computer._

_Open your computers._
(say the following while demonstrating)  
_"Hold down the Command key and press Space.  You will see this written as "cmd+space".  This is Spotlight search.  You can use this to find stuff on your computer.  Right now, we want our "Terminal".  Press Enter._

_You are now in the terminal.  As a developer, you will spend a lot of time here, telling your computer what to do.  Giving it very precise orders.  It can only do what we tell it to do._

Type "give me rice"

You should see:

    $ give me rice
    -bash: give: command not found

_Your computer got lost right from the start. _

_Don't worry about memorizing the commands.  We'll cover all this again.  Just observe._

Type `cd`.
Type `pwd -P`.  _This is YOUR home dir.  We'll spend a lot of time here.  Once again, don't worry about notes, we come back here, more slowly, in a second._
Now type: `$ ls`

That is a listing of the files in this folder or directory.

_"Let's confirm that." `open .` <split screen w/ Terminal and Finder>
Compare.

Now type: `$ ls -l`.  The same files.  Different view.

---

## Learning Objectives

- Setup your working directory for WDI
- Compare and Contrast CLI to GUI
- Describe the anatomy of a command (statement, flags, arguments)
- Know where to go for help
- List common commands
- List unsafe commands
- Manage folders and files (using Finder and Shell)
- Explain the difference between relative and absolute path

---

## I DO: Share the first 3 lessons of the Command Line

_We just learned 3 very important lessons._

Type `$ give me rice` again.

STWC: What did the computer know about giving me rice?
Nada.  Zip.  Zero. Zilch.

### Lesson One. Start with what you know.

You build upon what you know.

You also have to start with something the computer already knows and build on that.

Then I had you type `cd`.  Why?  It's ok to be wrong.  That's how we move forward.
Leading questions.


### Lesson Two: Where?

You have to care about *where* you are.

Type `open .`

STWC: What did that do?

This dot ".", is a shortcut, an abbreviation for the current dir.  This command opens my current dir in finder.  If I was somewhere else, it would open a different dir.

```
ls # lists the current dir
```

### Lesson Three:  Be precise.

 I control the computer, by telling it **precisely** what I want.

_This will become more obvious as you go through the exercises.  But I want to highlight that **everything** you type in is important._

- Type `ls -l` and press enter
- Type `ls -w` and press enter
- Type `ls -a` and press enter

The same files.  Different view.


## We do:  The Terminal

> Why would we use it, instead of the pretty GUI?

Walk through the following steps (without setup/clarification)
Work with students to write the steps of what we just did on the board.

1.	Type `ls`
	-	What do you see?

2.	Type `echo 'Hi there!' > hello.txt`, then `ls`

	-	What happened?

3. Type `open hello.txt -e`

	-	What happened?

Note:

1.	Get a list of the files in the current dir

2.	Create a new text file called "hello.txt" and populate it.

3.	Open that file to view it.

---

###	Following the steps on the board, do the same stuff WITHOUT the Command Line.

---

###	Which way was easier?

---

## Demo

Now, close your computers for a second and watch this:
```
open . # watch in Finder
ls
```
_Take note of the contents_
```
COUNTER=0
while [ $COUNTER -lt 50 ]; do
    touch sample_file_$COUNTER.txt
    let COUNTER=COUNTER+1
done
```
```
ls
```
Brief overview of the code.
```
ls sample*
```
_Are those the files I just added?  And only those?_

> Say bye.  

_Don't try this at home.  The `rm` command can be dangerous.  We'll cover this soon._
```
rm sample*
ls
```

_Now THAT'S power._

---

###	This is called the "command line", also "shell", also "bash".

-	The command line / shell / bash is a way of interacting with your computer without using a fancy graphical interface

---

CFU: Shout Out, write on board
###	Why do programmers work in the command line?

---

###	Brief history of Command Line

-	The command line is an interface to your computers's services.  To it's operating system.

-	Brief history
  - We started on the command line (ok, really, keypunch cards).
  - In 1984, [Apple introduced the Macintosh]( https://www.youtube.com/watch?v=axSnW-ygU5g&noredirect=1), the first, mass-marketed computer featuring a GUI.

-	What is a **GUI**?
  - Graphical User Interface.  The typical OSX or Windows interface.

- The Terminal
  -	OSX is BSD (Berkeley Software Distribution ).  Based on Unix.

	-	A **shell** is a program that interacts with your operating system. The **terminal** runs the shell. Used to be an physical computer. Now just an app.

	-	Might look familiar to old folks using old computers: no mouse

-	Discuss difference between bash, shell, terminal, CLI
  - bash is a shell.
  - terminal runs a shell
  - CLI (command line interface) is the mode.

---

## Lesson One: start with what it knows.  The basic command.

###	Anatomy of a command

-	Example

	-	Give someone a haircut

		-	Haircut style is a flag

		-	Person getting haircut is argument

		-	`haircut --mohawk Matt`
    - `haircut --mullet "Billy Ray Cyrus"`

-	Command: `haircut`

-	Flag: `-t mohawk`

	-	The command's options

-	Argument: `Matt`

	-	The input that's being processed by the command

- Other examples
  -	`say Hello`
  -	`say -v ?`

---

## Sometimes it makes sense.

_When you need someone's assistance, what do you ask for?_
Help.

`gem --help`
It's not always that helpful.
`ls --help`
`ruby --help`

---

## You Do: T&T (1 min)

What version of ruby are we using?
Who wrote ruby?  When?

You can find this within ruby's help.

Discuss `ruby --help`

---

###	Namespaces and double-dashes

-	Discuss `--` vs `-`
  -	`ruby --version`
  -	`ruby -v`

-	What does `ruby` do?

- Keyboard shortcuts, Hot Keys
  - Stop a process: Ctrl + c
  -	Copy/Paste: Cmd + c, Cmd + v
  -	Clear screen: Ctrl + k
  - Front/end of line: Ctrl + a, Ctrl + e

-	`brew install tree`
  -	What does brew do?

---

## You Do: Research `man` (3 min)

Let's do a little research.  The developers of each of these commands has provided a manual.  Let's google it.  If you know the answer, please don't spoil it.
- Find the manuals for:
  - ls
  - cd
  - ruby

Results on board: html pages, `man`

-	Type `man ruby`

-	Introduce manuals
	-	Things in brackets are optional
	-	Structure of the manual

---

## Lesson Two: Know where you are.

###	Every command is executed in the context of the current folder

-	`pwd`
-	`pwd -P`

-	`cd ~`

-	`ls`

-	`cd Desktop`

-	Go up with `..`

	-	`cd ..`

-	`cd` Drag and drop

-	`cd ~`

	-	Shortcut to home folder regardless of where you are

-	Tab completion

-	Other funky punctuation: `$`

###	Absolute vs relative

-	Your current frame of reference

-	Mailing addresses: Domestic vs international vs interplanetary vs universe

-	`open` a file using an absolute path, then a relative path
  - `ls`: lists current dir
  - `ls ~`:  lists you home directory.

---

### We DO: Our working dir

Since it's important to know where we are.  Let's create a place to do our work.  Our working directory.

How do we get back to our home dir?
`cd` or `cd ~`

Review home dir.

Now, let's create a working dir.  How would I make a dir name "ga"?
Recommend lower case, separated by underscores, no spaces or special characters.

`mkdir wdi`

now, we want to work in here.  How do we get there?

`cd wdi`

This is the relative path. Starting from where we are, we go down into the `wdi` dir.
What is the absolute path?
  `cd ~/wdi`

We have 4 major things that we do in class:
- exercises
  - each exercise will be a separate directory in here
- lessons (pbj)
  - this is a read-only repository of the WDI lessons.
- projects
  - You will work on 4 week-long projects.  They will live here.
- sandbox
  - our play area.  For quick exercises.  One-offs.
  - If it's not an assigned exercise, it goes here.

(3 min) Let's make these now.  

Commands:
```
cd ~/wdi
mkdir exercises
mkdir pbj
mkdir projects
mkdir sandbox
```


When complete, you should see:
```
$ tree -C ~/wdi
wdi
├── Rakefile
├── installfest.yml
├── exercises
├── pbj
├── projects
└── sandbox
```

Bonus: Feel free to create a readme file to describe each directory.

---

##	Commands exercise

###	13m) You do: Pair up, assign groups, and figure out what each command does.

Each column is related commands.

Play with the commands and figure out:

-	How would you describe what the command does?

-	For what (if anything) is the command's name an abbreviation?

-	Identify a useful flag for each command

|1|2|3|4|
|---|---|---|---|
|`touch`	|`cat`		|`pwd`		|`history`	|
|`mkdir`	|`head`		|`tree`		|`mv`		|
|`ls`		|`tail`		|`open`		|`cp`		|

-	`ls -a`

-	`cp -R`

-	`mkdir -p`

-	Not worth time to memorize everything; know how to look it up

--

### You Do: To OZ! (20 min)

https://github.com/ga-dc/to_oz

---

###	10m) We do: The dangerous commands

####	rm

  ```
  cd ~/wdi/sandbox
  touch hello.txt
  rm hello.txt
  ```

-	What does `rm` stand for?

-	Why is this "dangerous"?
```
  cd ~/wdi/exercises/to_oz/OZ
	mkdir CandyLand
	rm CandyLand
```

-	Why didn't it work?

```
	rm -d CandyLand
```

-	What does `-d` stand for?

```
	mkdir CandyLand
	touch CandyLand/judge.txt
	rm -d CandyLand
```

-	Why didn't it work?

```
	rm -r CandyLand
```

-	What does `-r` stand for?

	-	Recursion

-	Safety check against deleting stuff you don't mean to delete.

-	Be **super careful** with `rm -r`.

---

####	sudo

- Super User DO
- Acting as Admin.
-	You probably do NOT need to use `sudo`.
- As Spiderman knows all too well... !["With great power, comes great responsibility"](http://treasure.diylol.com/uploads/post/image/288655/resized_how-i-feel-when-i-introduce-some-one-to-reddit-enhancement-suite-meme-generator-with-great-power-comes-great-responsibility-2e50d9.jpg)

---

###	Ding Dong the Witch is Dead.

https://github.com/ga-dc/to_oz#ding-dong-the-witch-is-dead

---

##	Closing

1.	What is the absolute path to the default WDI working dir?
2. Name 2 unsafe commands
3. How do we found out what flags we can pass to `ls`?
4. Can we create files with finder?
5. Where can go for help?

Answers (think first!):
1. `~/wdi`
2. `rm`, `sudo`
3. `ls --help`, `man ls`
4. no
5. man, --help, google, peers instructors

---

## Homework

https://github.com/ga-dc/command_line_fu

---

## Sample Quiz Questions

- Why would a developer prefer the command line over a GUI?
- Write a command to list only files beginning with your first name.  Label the parts of the command.
- Where can we find help for shell commands?
- Describe 4 bash commands for managing folders and files.
- Describe 2 unsafe commands
- You are currently in the "code" folder in the below file tree. How would you get to the folder that contains "beach.png" using the command line?
```
home
├── documents
│   └── code
├── photos
│   ├── headshot.jpg
│   └── summer_vacation_2014
│       └── beach.png
└── videos
```
