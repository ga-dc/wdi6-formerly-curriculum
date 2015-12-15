# Intro to Web Technology (for PMI)

## Learning Objectives

### Computer Basics
* Describe the general design of computer hardware (RAM, HDD/SSD, CPU)
* Describe how software is built in layers of abstractions
* Differentiate between Operating Systems, Services, and Application Software

### Fundamentals of the Internet / Web
* Name the four basic parts of the Internet protocol suite (the TCP/IP 'stack')
* Explain the client-server model, and the role of each
* Describe the basics of the HTTP protocol, and explain what an HTTP Request is
* Explain the parts of a url in detail
* Describe, in simple terms, the premise of REST.

## Introduction and Framing (10 minutes)

After introductions, take a quick survey of what students are hoping to get our of today's session.

Outline at a high level what we'll be covering:
* Basics of Computer SW/HW
* Basics of the Internet / Web
* Fundamentals of Web Design
* Basics of Web Applications

Based on your feedback, we plan to offer an additional lesson after christmas
break.

## Computer Basics (15 minutes)

Computers are built of common hardware components, with the goal of running
software.

Almost all computers today are built using the same general design, with the
following components:

* CPU (Central Processing Unit) - This is the 'heart' of the computer, or the main chip. It performs all computation (artihmatic, comparisons, caclulations). The speed of this chip has a large impact on how quick a computer can run software. The speed of a CPU is measured in GHz.
* RAM (Random Access Memory) - This is the 'working memory' of a computer. Data and programs are loaded into this memory while they're being used, since this memory is very fast. However, RAM is expensive and not permanent (it gets erased when the computer shuts down), so it can't be used to store data long-term. The amount of RAM (measured in GB) is a factor in how many programs / services a computer can run at one time, and how much data it can process quickly.
* Hard Drive / Solid State Drive (HDD/SSD) - This is the permanent storage of a computer (like a filing cabinet). It's slow to access (compared to RAM), but much cheaper per GB, and permanent. SSDs are newer and more expensive, but also much faster and more reliable compared to mechanical HDDs.
* GPU (Graphics Processing Unit) - Most computers (except servers) have a GPU used to handle the display of graphics much more quickly than a CPU could.
* Network cart (NIC) - this is the component that connects to the network. It could be a wifi card, or an ethernet card. This determines how quickly a computer can transfer data over the network to other computers.

Almost all computers follow this general design, whether they are a laptop, a
desktop, or a server. Servers tend to be much more powerful, and optimized for
raw speed, as they have to handle lots of computers connecting to them and
asking for data.

### Software

Without software, computers are useless. In general, software is built in layers,
where each layer depends on the ones beneath it.

Let's start at the bottom and work our way up:

*BIOS / UEFI / Firmware* - This is the basic software that's on the machine.
It's job is to get all the components turned on and talking to each other, and
to start the operating system. The firmware is rarely updated, but can be if
needed. It's what you see when you first start the comptuer.

*Operating System* - The OS provides the fundamental services that run the
computer. These include things like: allowing multiple programs to run at once,
drivers (which allow the computer to use hardware like the SSD, GPU, NIC, etc).
The OS also provides fundamental software to enable graphics, networking, and
reading/writing files.

There are three common OSs:
* Microsoft Windows
* Mac OS X
* Linux (aka GNU/Linux)

Many servers run linux because it's free, well-known by many developers, and
there is a wealth of software useful for servers.

*Services* - Services are pieces of software that enable functionality that runs
in the background. These apps alone don't provide much functionality, but allow
Applications to be written that use them. Common examples would be database
services and web services, email services.

*Application Software* - These are the apps that perform some useful
functionality for a user. Examples could be MS Office, a web browser, or even
a web application running on a server.

## Fundamentals of the Internet (45 minutes)

The internet is main network that connects most computers in the world. In
theory, any computer connected to the internet should be able to communicate
with any other computer also connected. In practice, that's not always true, but
it's basically the case.

There are lots of services built on top of the internet: e-mail, FTP, the web,
and tons of apps.


### Exercise: Research Core Technologies of the Internet (25 minutes)

The internet (and the services on top of it) is built in layers of technologies,
each depending on the ones below. (This is a common theme in computing).

At each layer, there are standards (or protocols) that define how computers
communicate with each other.

In groups of two, take 10 minutes to research one of the following, and present
back to the class:

* Link layer
  * IEEE 802.11
  * IEEE 802.3
* Internet layer
  * IP
  * DNS
* Transport layer
  * TCP/IP
  * UDP
* Application layer
  * HTTP
  * IMAP

![Image](http://upload.wikimedia.org/wikipedia/commons/c/c4/IP_stack_connections.svg)

### HTTP: The protocol of the Web (10 minutes)

By far, the most popular application protocol is HTTP(S), which is the protocol
for the web.

Like most protocols, HTTP is built around the *client-server model*. In the
client server model, the client makes HTTP *requests* to the server. The server
will then reply with an HTTP *response*.

The most common clients are web browsers, but other apps like mobile or desktop
apps can make HTTP requests.

That server response is usually one of 2 things:
* An HTML web page
  * this page will then be displayed by a web browser
* Raw data in the form of JSON (or more rarely XML)
  * this raw data is used by another computer program, such as a Mobile or Front-end app

### URLs (5 minutes)

URLs are how we identify 'resources' (files, pages, data, etc) on the internet.

URLs have a few major parts:

```
http://www.kittengifs.com:80/popular-gifs#results?term=cute&page=2
|-----|-----------------|---|-----------|--------|----------------|
   |           |          |       |          |           |
 protocol    host       port    path     fragment  query-string
```

* Protocol - what protocol, or language we're speaking
* Host - what server are we connecting to
* Port (optional) - what port on that server
* Path - what are we requesting from this server (i.e. what file or data)
* Fragment - used to scroll to a specific part of the page
* Query String - used to include additional information about what we're requesting

### RESTful Routes

When building a web application, we have a lot of choices about how to structure
the 'routes'. In other words, what the URLs for our application will look like.

The most common choice for routes in a modern application is the REST design.

Note that we haven't mentioned it, but every HTTP request contains a VERB and a
PATH.

Here are some example RESTful routes for a music application.

| Verb    | Path                    | Function |
|---------|-------------------------|----------------------------|
| GET     | /artists                | get a list of all artists  |
| GET     | /artists/drake          | get more info on the artist named drake |
| GET     | /artists/new            | get a form to create a new artist |
| POST    | /artists                | create a new artist |
| GET     | /artists/drake/edit     | get a form to edit Drake |
| PUT     | /artists/drake          | send data to update Drake |
| DELETE  | /artists/drake          | delete the Drake artist  |
