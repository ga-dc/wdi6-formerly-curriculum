# jQuery Plugins

## Learning Objectives

- Define what a jQuery plugin is
- Describe where to find existing jQuery Plugins (and how to install them)
- Research and utilize a published jQuery Plugin
- Describe the basic structure of a jQuery Plugin
- Write your own jQuery Plugin
- Utilize an Immediately Invoked Function Expression (IIFE) to locally scope jQuery


## Framing

What are jQuery Plugins?

Officially, plugins are "simply a new method that we use to extend jQuery's prototype object."  In practice, they enable to us to extend jQuery's functionality, from adding simple methods to jQuery objects (think `$()`) to the [jQuery UI plugin](http://jqueryui.com) that is maintained by the jQuery team.

> jQuery UI is a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library. Whether you're building highly interactive web applications or you just need to add a date picker to a form control, jQuery UI is the perfect choice.

So you can see, they can be simple or rather complex.

But, you may be asking yourselves, "Why Matt?, Why do we care?" <pause>

You tell me.  Check out these demos.

- [isotope](http://codepen.io/desandro/full/nFrte)
- [tablesorter]http://tablesorter.com/docs/#Demo

Q. Why do we care?
---

> A. Encapsulation of really cool functionality, so we can reuse and share.


## Utilizing a published plugin

Let's familiarize ourselves with jQuery plugins by investigating a couple.  How do we use them?

### Research existing plugins (T/P/S:7/3/5; 15 min)
- [isotope.metafizzy.co](http://isotope.metafizzy.co)
- [packery.metafizzy.co](http://packery.metafizzy.co)
- [tablesorter]http://tablesorter.com/docs/#Introduction

Q. What are the 2 common steps for utilizing a plugin?
---

> A. 2 Steps for utilizing
- include/install
- initialize/configure/customize


## Basic anatomy of a jQuery Plugin?

What else can we expect from jQuery plugins?  How do we use them?

### Group work: (10/10: 20 min)

Start in https://learn.jquery.com/plugins/
Review some random plugins:
- look for commonality
- look for patterns
- look for convention

Break into groups.  When we get back together, we will be answering these questions, together.

Questions:
1. Where do we find jQuery Plugins?
2. What is the basic anatomy of a jQuery Plugin?
3. What do we add to our app to utilize them?
4. Name some ways to install/initialize a jQuery plugin.

---


> Answers:

1. Where?
  Surprise. Plugins have moved to: https://www.npmjs.com/browse/keyword/jquery-plugin

2. Basic Anatomy?
  Initialize with:
  - a single function
  - pass options

  Some have supporting functions

3. What do we add?
  - Include vendor's javascript file
  - [maybe] add provided css
  - update our css using documented classes
  - initialize with jQuery, js, or (sometimes) html

4. How to install?
  - Download, jQuery
  - CDN, jQuery
  - Node, Vanilla JS
  - Rails, HTML


### Pair up: Use it (15 min)

- Pick a plugin.
- Pick one installation method and attempt to install & utilize.  
- After 7 minutes, install using the next method.

You've only got 7 minutes, so focus on installation and easy demo.

Q. Which do you prefer?  Why?
---

Q. What was common to both?
---


## Your Own Plugin - Tutorial (30 min)

https://github.com/ga-dc/diy_plugin

## Break (10 min)

## What's an IIFE? (20 min)

An Immediately Invoked Function Expression (IIFE), is exactly what it sounds like... a function that is invoked immediately.

```js
(function(){
  // add some code here,
  //   including other functions.

})() // and then invoke it immediately
```

See those trailing parens?  We define an anonymous function and immediately invoke it.

Why would we do that?  Read
- [jQuery Best Practices](http://gregfranko.com/blog/jquery-best-practices/)
- [I love my IIFE](http://gregfranko.com/blog/i-love-my-iife/)

Q. Why do we use an IIFE?
---

> A.
- to locally scope jQuery.  
- To use the $ without fear of corruption from another library.


## Your Own Plugin: GIF of the Day (60 min)

https://github.com/ga-dc/gif_of_the_day

## Don't break the chain!

jQuery functions, by convention, are chainable.  We should remember to return the jQuery object so other methods can be chained.

```js
// allow jQuery chaining
return this;
```

Chaining example:
```js
$("#welcome").text("Hello, world!").css("color", "blue");
```


## Conclusion

- Where do we find jQuery Plugins?
- What are the 2 steps for utilizing a jQuery Plugin?
- What is the basic anatomy of a jQuery plugin?
- Why doe we love IIFEs?


## Additional Resources

- http://www.sitepoint.com/how-to-develop-a-jquery-plugin/
- http://blog.npmjs.org/post/111475741445/publishing-your-jquery-plugin-to-npm-the-quick
- http://www.jquery-tutorial.net/introduction/method-chaining/
