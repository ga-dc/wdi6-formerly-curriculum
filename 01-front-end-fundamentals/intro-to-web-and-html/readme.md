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

## The purpose of this class

We'll be going over how the web works, and then, more interestingly, how to make a website using HTML and CSS.

##### Have you used a website-builder like Squarespace or Wix or Wordpress or Drupal before?
##### Why are we going into HTML and CSS and code in general, when there are services that make websites for you without you having to touch a line of code?

The analogy I like to use to explain this is Microsoft Word. Out-of-the-box, you can use Word to make a document that looks 75% like what you had in mind. In order to make it 100% like what you had in mind, you either need to know Word *extremely* well, or you just need to use another program.

##### Have you ever had the experience of spending 3 hours on a Word document just trying to get your stupid image to align the right way?

Content Management Systems, aka CMS-es, aka or website-builders, will quickly give you a website that looks pretty OK. If "pretty OK" is all you want, and your intent is just to get a web store online as quickly as possible, then a CMS is the way to go.

If, however, you want to have a site that's 100% the way you want it, and to have complete control over your appearance and product, then you need to pop the hood and use code.

## Let's talk about how the web works

##### Are you familiar with Morse Code?

The web basically works exactly the same way as Morse Code, except instead of dots and dashes we use ones and zeros, and things go really fast.

![Picture](http://i.imgur.com/AfiaMQP.png)

### Here's my metaphor
It's Februray 12th, 1864. The rulers of the world are all sending telegrams, via Morse Code, to the White House wishing President Lincoln a happy 55th birthday.

President Lincoln is really busy, so he's written a generic "thanks for the birthday wishes" response on a piece of paper and put it in the Presidential Filing Cabinet.

Whenever a birthday message is received in Washington, the Presidential Telegraph Operator gets Lincoln's response from the filing cabinet, translates it into Morse Code, and sends it back.

Queen Victoria writes out a message. She gives it to her Royal Telegraph Operator. He sends it to Washington as Morse Code.

The Presidential Telegraph Operator in Washington hears the Morse Code, and translates it into English. He sees it's a birthday message. He gets Lincoln's response from the filing cabinet, translates it into Morse Code, and sends it back.

Queen Victoria's telegraph operator translates Lincoln's response from Morse Code into English. He gives the response to the Queen.

### Here's what happens in reality
An author writes a file which contains content. She puts it in a computer called a host.

Whenever a user wants the content, their web browser sends a request to the host. An application on the host called a server retrieves the file from inside the host and responds with its content.

The user's browser translates the content into a webpage and displays it on the screen.

### Let's break it down into keywords

Here are some of the important words I just used:
- User
- Browser
- Content
- File
- Host
- Server
- Request
- Response

A host is just a computer, a lot like yours.

A server is an application that lives on the host computer, receives requests made to it, and sends responses as digital pulses.

A browser is an application that lives on your computer, sends requests, and translates the response's digital pulses into the stuff you see.

We need the browser because information can only be sent one "bit" at a time -- that is, a single zero or one.
- *This is why your internet service provider advertises speeds in "megabits" or "gigabits", rather than "megabytes" or "gigabytes": you can't send eight zeroes or ones at a time.*

## Quick interjection: the Cloud

![The cloud](http://i.imgur.com/xDGYGZV.jpg)

"The Cloud" is a way of storing data on the Internet. It's a misleading term because it sounds like you're saving data into thin air. Really, you're just saving data on a bunch of host computers. That way, if one host goes down, another host's got your back.

## To own a website...

...you need two things:
- A domain
- A host

A host is a computer on which you put your files. This computer has an application called a server that responds to requests for files.

Each host computer has a "phone number", called an IP address. A domain is like a phone directory listing for that number.
- When I tell Siri to "find me a plumber", she searches the phone directory for a phone number listed under "plumber".
- When you enter "Google" into your browser, your browser searches the domain name registry for an IP address listed under "Google."

My host costs $6 a month. Domains are usually $15 a year.

Any computer can be a host
##### If you enter in your address bar the IP address at which my computer is currently connected, you'll be able to access my computer.

### Adding files to your host

It's just like adding files to a computer: drag and drop into a folder.

A webpage is a file written mainly in a language called HTML. Web browsers turn digital impulses into HTML, and then turn that HTML into something visual.

This is called *abstraction*: taking something super granular and turning it into something easier to grasp. For example, turning digital signals into HTML, or turning HTML into a visual webpage.

Next, we'll get into HTML, but first, let's take a...

# Break!

## Building a website

All you need to build a website is a computer, and two pieces of software: a web browser (Chrome, Safari, Firefox, Internet Explorer), and a text editor.

### Text editors

When I started, my text editor was TextEdit, which is in the Applications folder of any Mac. The Windows equivalent is NotePad.

##### Go ahead and open TextEdit on your Mac, or Notepad on your PC. On a Mac, it's inside your Applications folder. You can also use Spotlight to find it.

The text editor you use doesn't matter. The only thing that matters is that it has to be *plain text*.

A text editor is *not* plain text if it secretly hides a bunch of code inside the files you make. This is how Word records whether text should be bold, italic, red, blue, and so on. This is called *rich text*.

A text editor is *plain text* if, when you look at a file, you see *everything* inside it -- no hidden code.

For example, if I create and save a blank Word document, it's actually about 20 kilobytes. If I create and save a blank document in TextEdit, it's 0 bytes. If I look at a Word document in TextEdit, I see a heinous mess, which is all the hidden code.

##### Please go to `File > Preferences` in TextEdit. In the `New Document` tab, make sure `Plain Text` is selected at the top instead of `Rich Text`. Also, un-select all of the `Options` at the bottom. On the `Open and Save` tab, select `Display HTML files as HTML code instead of formatted text`. Then, quit and re-open TextEdit.

### Now we're ready to learn HTML

You may think you know HTML, but you're probably doing it *wrong*. HTML done right makes creating a website a breeze. HTML done wrong means you do lots and lots of deleting, writing a little bit, and deleting again.



*(Pass out business cards.)*
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
  
- What is the difference between:
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
- `<img src />` and `<a href>`
  - Attributes modify the element
- `<div>` and `<span>`
  - Elements to use when you're not sure what else to use
- `<iframe />`
  - A "window" to another webpage
- `file://` vs `http://`
  - `file` looks on the current computer for a file; `http` makes a request to another computer
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
  - Anatomy
    - Selectors
      - "Select" an element for modification
    - Properties
      - The thing being modified
    - Values
      - To what the property is being set
  - Colors
    - RGB / Hex
    - A color is represented like this: `#ff00ff`
      - That's actually 3 values squished together
        - Each pixel has 3 lights: red, blue, green
        - The first two characters say how bright the red should be, then blue, then gree
        - This is in the hexadecimal, or base-16, system. The minimum is 00, and the maximum is `ff == 16 * 16 == 256`
      - `ff00ff` means "red is full-blast, green is off, and blue is full-blast"
        - That is: purple
      - Could also be written as `f0f`. `abc` means `aabbcc`

## Putting it all together
  - HTML is function, CSS is form, JS is behavior
  - Inspect in Chrome dev tools

## Homework

https://github.com/ga-dc/html_resume

## Quiz Questions

- Which of the following is the best way to center the text in div?
    - `<div><center></center></div>`
    - `<div align="center"></div>`
    - `<style>div{ text-align:center; }</style>`
    - `<div style="text-align:center;"></div>`
- Why do we write `<img />` and not `<img></img>`?
- Why is it important to keep semantics (HTML) separate from style (CSS)?

