#	Your Work Environment

##	Developing an intimate relationship with your computer

---

##	Framing (before Objectives)

Introduce students to the command line.  Giving them a brief taste before sharing the Learning Objectives.

_"You just learned that mentors are all around you.  I'd like to introduce you to your closest and best mentor."_ <picks up computer>

> This is your computer, there are many like it, but this one is yours.  
> Your computer is your best friend.  You must master it like you master your life.  > Your computer without you is useless.

_Repeat after me._

> My computer, without me, is useless.

pause

> Let's start owning it.
> Let's start playing with it.
> Let's create something today.


_Let me show you the command center of the computer._

_Open your computers._
(say the following while demonstrating)  
_"Hold down the Command key and press Space.  You will see this written as "CMD+Space".  This is Spotlight search.  You can use this to find stuff on your computer.  Right now, we want our "Terminal".  Press Enter._

_You are now in the terminal.  As a developer, you will spend a lot of time here, telling your computer what to do.  Giving it very precise orders.  It can only do what we tell it to do._

Type "give me rice"

You should see:

    $ give me rice
    -bash: give: command not found

_Your computer got lost right from the start.  _

_Don't worry about memorizing the commands.  We'll cover all this again.  Just observe._

Type `$ cd`.
Type `pwd -P`.  _This is YOUR home dir.  We'll spend a lot of time here.  Once again, don;t worry about notes, we come back here, more slowly, in a second._
Now type: `$ ls`

That is a listing of the files in this folder or directory.

_"Let's confirm that." `open .` <split screen w/ Terminal and Finder>
Compare.

Now type: `$ ls -l`.  The same files.  Different view.

---

## Learning Objectives

- Explain benefits of using a shell
- Describe the anatomy of a command (statement, flags, arguments)
- Explain the difference between relative and absolute path
- Manage folders and files (using Finder and Shell)
- Create a working dir for a new project
- List common commands
- List unsafe commands
- (optional) Explain the role of File Permissions in POSIX env.

---

## I DO: Share the first 3 lessons of the Command Line

_We just learned 3 very important lessons._

Type `$ give me rice` again.

Prompt: What did the computer know about giving me rice?
Nada.  Zip.  Zero. Zilch.

### Lesson One.  You have to start with something the computer already knows and build on that.

- Build on knowledge.

Then I had you type `cd`.  Why?  It's ok to be wrong.  That's how we move forward.
Leading questions.


### Lesson Two: You have to care about where you are.

- Where

_This will become more obvious as you go through the exercises.  But I want to highlight that **everything** you type in is important._

Type `ls -l`.  The same files.  Different view.

### Lesson Three: I control it.  By telling it **precisely** what I want.

- Precise

## We do:  The Terminal

Think, Pair Share:

The terminal:
> What do you think this is?  
> What does it do?
> Have you used something similar?


-	Type `ls`
	-	What do you see?

-	Type `echo 'Hi there!' > hello.txt`, then `ls`

	-	What happened?

-	Type `open hello.txt -e`

	-	What happened?
	- Type "Hi there!" into the file.

---

###	What are the steps of what we just did?

Work with students to write the steps of what we just did on the board.

1.	Open your Home folder

2.	Create a new text file called "hello.txt"

3.	Open it and write "Hi there!"

---

###	Following the steps on the board, do the same stuff WITHOUT the Command Line.

---

###	Which way was easier?

Now, close your computers for a second and watch this:
```
COUNTER=0
while [ $COUNTER -lt 20 ]; do
    touch sample_file_$COUNTER.txt
    let COUNTER=COUNTER+1
done
```
`ls`
`ls sample*`
_Are those the files I just added?  And only those?_
_Say bye.  Don't try this at home.  The `rm` command can be dangerous.  We'll cover this soon._
`rm sample*`
`ls`

_Now THAT'S power._

---

###	This is called the "command line", also "shell", also "bash".

-	The command line / shell / bash is a way of interacting with your computer without using a fancy graphical interface

---
CFU: Shout Out, write on board
###	Why would programmers so often work in the command line?

---

###	Brief history of Command Line

-	The command line is an interface to your operating system's services.

-	What is a **GUI**?

-	Brief history

	-	Based on Unix

	-	A **shell** is a program that interacts with your operating system. The **terminal** runs the shell. Used to be an physical computer. Now just an app.

	-	Might look familiar to old folks using old computers: no mouse

-	Difference between bash, shell, terminal, CLI

---

## Lesson One: start with what it knows.  The basic command.

###	Anatomy of a command

-	Command

-	Flag

	-	The command's options

-	Argument

	-	The input that's being processed by the command

-	Example

	-	Give someone a haircut

		-	Haircut style is a flag

		-	Person getting haircut is argument

		-	`haircut --mohawk Matt`
    - `haircut --mullet "Billy Ray Cyrus"`

	-	`-` vs `--`

-	Argument is usually a file

-	`say 'Hello'`

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



###	Namespaces and double-dashes

-	`brew install tree`

	-	What does brew do?

-	`ruby --version`

-	`ruby -v`

-	`ruby`

-	Ctrl + C

-	Ctrl + K

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

---

##	Commands exercise

###	13m) You do: Pair up, assign groups, and figure out what each command does.

Each column is related commands.

Play with the commands and figure out:

-	How would you describe what the command does?

-	For what (if anything) is the command's name an abbreviation?

-	Identify a useful flag for each command

|A|B|C|D|
|-|-|-|-|
|`touch`	|`cat`		|`pwd`		|`history`	|
|`mkdir`	|`head`		|`tree`		|`mv`		|
|`ls`		|`tail`		|`open`		|`cp`		|

-	`ls -a`

-	`cp -R`

-	`mkdir -p`

-	Not worth time to memorize everything; know how to look it up

---

## We DO: Our working dir

Since it's important to know where we are.  Let's create a place to do our work.  Our working directory.

How do we get back to our home dir?
`cd` or `cd ~`

Review home dir.

Now, let's create a working dir.  How would I make a dir name "ga"?
Recommend lower case, separated by underscores, no spaces or special characters.

`mkdir ga`

now, we want to work in here.  How do we get there?

`cd ga`

--

### You Do: To OZ! (20 min)

---

###	10m) We do: The dangerous commands

####	rm

	touch hello.txt
	rm hello.txt

-	What does `rm` stand for?

-	Why is this "dangerous"?

  cd OZ
	mkdir CandyLand
	rm EmeraldCity

-	Why didn't it work?


	rm -d EmeraldCity

-	What does `-d` stand for?


	mkdir CandyLand
	touch CandyLand/judge.txt
	rm -d CandyLand

-	Why didn't it work?


	rm -r CandyLand

-	What does `-r` stand for?

	-	Recursion

-	Safety check against deleting stuff you don't mean to delete.

-	Be **super careful** with `rm -r`.

---


####	sudo

-	Think twice about it

---

###	Ding Dong the Witch is Dead.

---

#	Closing

-	Don't summarize for them in closing. Ask them to define for me. Closing should be an assessment (of sorts)
