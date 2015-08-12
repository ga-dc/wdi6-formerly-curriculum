# Let's talk about how the web works

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

My host costs $6 a month. Domains are usually $15 a year. Hosting providers and domain registrars are basically all the same. Just pick one that's within your price range and has documentation you can understand.

Any computer can be a host. In fact, my computer is currently a host running a server. To prove it:

##### If you enter in your address bar the IP address at which my computer is currently connected, you'll be able to access my computer.

### Adding files to your host

It's just like adding files to a computer: drag and drop into a folder.

A webpage is a file written mainly in a language called HTML. Web browsers turn digital impulses into HTML, and then turn that HTML into something visual.

This is called *abstraction*: taking something super granular and turning it into something easier to grasp. For example, turning digital signals into HTML, or turning HTML into a visual webpage.

Next, we'll get into HTML, but first, let's take a...

# Break!
