# Intro to the Web and HTML

## Learning Objectives

- Diagram the relationship between a server and a browser, including responses and requests.
- Explain the difference between http:// and file://.
- Semantically structure a given document using HTML without regard to style.
- List commonly-abused HTML elements.
- Label the components of an HTML element and its tags.
- List commonly-used special characters.
- Run a website through a validator and fix its errors accordingly.
- Identify the different roles of HTML, CSS, and Javascript on a given webpage.
- Link to a given file using either absolute and relative paths.
- Use Chrome Dev Tools to inspect an element.

## How the web works

[Picture](http://i.imgur.com/AfiaMQP.png)

### The example
It's Februray 12th, 1864. The rulers of the world are all sending telegrams to the White House wishing President Lincoln a happy 55th birthday.

Queen Victoria writes out a message. She gives it to the Royal Telegraph Operator. He taps it in to the telegraph machine as Morse Code.

A telegraph operator in Washington hears the Morse Code, and translates it back into English.

President Lincoln is really busy, so he's written out a generic "thanks for the birthday wishes" response on a piece of paper and put it in the Presidential Filing Cabinet.

Whenever a birthday message is received in Washington, the Presidential Telegraph Operator translates Lincoln's response into Morse Code and sends it back.

Queen Victoria's telegraph operator translates Lincoln's response from Morse Code into English.

### The reality
An author writes a file of content, and puts it in a computer called a host.

Whenever a user wants the content, their web browser sends a request to the host's server. The server retrieves the file from the host and responds with its content.

The user's browser translates the content into a webpage and displays it on the screen.

### Break it down

Keywords
- User
- Browser
- Content
- File
- Host
- Server
- Request
- Response

A host is just a computer, a lot like yours.

A server is an application that lives on the host computer, receives requests made to it, and sends responses.

A browser is an application that lives on your computer, sends requests, and translates responses into the stuff you see.

We need the browser because information can only be sent one "bit" at a time -- that is, a single zero or one.
- This is why your internet service provider advertises speeds in "megabits" or "gigabits", rather than "megabytes" or "gigabytes": you can't send eight zeroes or ones at a time.

## The cloud

http://i.imgur.com/xDGYGZV.jpg

## Owning a website

Need two things
- Domain
- Host

A host is a place to put your files, with a server application that responds to requests for files.

Each host as a "phone number", called an IP address. A domain is like a phone directory listing for that number.
- When I tell Siri to "find me a plumber", she searches the phone directory for a phone number listed under "plumber".
- When you enter "Google" into your browser, your browser searches the domain name registry for an IP address listed under "Google."

My host is $6 a month. Domains are usually $15 a year.

Any computer can be a host
- Show my IP address and have them go to it, see it's on my computer

### Adding files to your host

A lot like adding files to a computer: drag and drop into a folder

# Break!

## Building a website

- Requirements
  - A text editor
  - A web browser
- **Pass out business cards.**
  - The minimum code required to have a website
- Webpages made up of elements
  - **Pay attention:** You may think you know HTML, but you probably do it **wrong**.
  - Anatomy of an element
    - Open tag
    - Close tag
    - Contents of tag gives you a hint about contents of element
  - Rules of HTML
    - Elements must close
    - Elements must nest
      - Parents, children
      - Why indentation is important
  - Exceptions
    - Self-closing
    - DOCTYPE
    - Comments
- Anatomy of a webpage
  - head and body
  - header, main, footer
- Special characters
  - Encoding
    - Every character is represented in computer memory as a sequence of 1s and 0s
    - "Standard" characters are the ones every computer encodes the same way
      - letters, numbers, some punctuation
      - Different countries, operating systems, etc, will encode characters differently
    - "Special" characters are the ones that change from country to country, operating system to operating system
      - Seen gibberish characters in MS Word before?
  - Special characters represented with special tags that all web browsers recognize
    - Like HTML tags, contents gives you a hint

### We do: Tag matching

There are 130+ tags and thousands of special characters, but you'll only use a few of them 99% of the time

http://ga-dc.github.io/html_tag_matching/
  
- head
- header
- heading

## Semantics vs style

- Which of the tags we looked at say anything about the way things should look?
- HTML is a "markup" language
  - What does it mean to "mark up" a paper?
    - Add a layer on meaning on top of it without changing the words
  - Writing HTML is more like taking a bunch of dialogue and splitting it up into lines, with actor suggestions
    - "This is delivered off-stage", "This is happy", etc.
  - HTML tells you the **function** of words
    - aka the semantic value
- Styling
  - is done with a completely different language, called CSS
  - Show RobertAKARobin.com source code
    - All my CSS is off in its own file. **Why?**
- Why are semantics and style separate?

It's efficient:
```
<p>Hello.</p>
<p>My name is Joe.</p>

<p><red>Hello.</red></p>
<p><red>My name is Joe.</red></p>
```
...much easier to just say "every paragraph should be red."

It makes code cleaner:
www2.warnerbros.com/spacejam/movie/jam.htm

- When writing HTML, **think only of the semantics**

### Bad tags
```
<br />
<hr />
<small>
<big>
<b>
<i>
<u>
<center>
<font>
<marquee>
<blink>
```

### You do: Make the Fresh Prince website

http://ga-dc.github.io/belair_biography/

# Break!

## Wrapping up
- `<div>` and `<span>`
  - Elements to use when you're not sure what else to use
- `file://` vs `http://`
- `<img src />` and `<a href>`
  - Attributes modify the element
- Absolute vs relative paths
  - **Show** that `http://ga-dc.github.io/belair_biography/bball.jpg` and `bball.jpg` both work
    - First is absolute, second is relative
    - Relative is location relative the current file; absolute is location relative the entire internet
  - **Ask:** How do I get to the bathroom?
  - **If I told my mom in Montana how to get to this bathroom, what would I need to say?**
  - File navigation
    - `..` is go up one folder, `folder/` is go down

### You do: Navigate DC

On whiteboards!

https://github.com/ga-dc/dc_directory_tree

## Styling

- Using CSS
  - http://ga-dc.github.io/belair_biography/belair.css
  - Selectors, properties, and values
  - Colors
    - RGB / Hex
- HTML is function, CSS is form, JS is behavior
- Inspect in Chrome dev tools

## Homework

https://github.com/ga-dc/html_resume
