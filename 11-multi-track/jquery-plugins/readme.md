# jQuery Plugins
## Screencasts
[Part 1](https://youtu.be/ZkaP-uhnwQ0)
[Part 2](https://youtu.be/dMwINJ00ahc)
[Part 3](https://youtu.be/wLfWZviLvsQ)

## Learning Objectives

- Define what a jQuery plugin is
- Describe where to find existing jQuery Plugins (and how to install them)
- Research and utilize a published jQuery Plugin
- Describe the basic structure of a jQuery Plugin
- Write your own jQuery Plugin
- Utilize an Immediately Invoked Function Expression (IIFE) to locally scope jQuery


## Framing (10)
Today, we'll be learning about jQuery plugins. In the big picture of things programming, the TLDR version of today is extending jQuery functionality. As far as programming goes, we're not learning anything radically new. Many of the plugins that are out there are functionalities you're capable of building yourself. Only, now you don't have too. You can just use other people's stuff, it's great.

What are jQuery Plugins?

Officially, plugins are "simply a new method that we use to extend jQuery's prototype object."  In practice, they enable to us to extend jQuery's functionality, from adding simple methods to jQuery objects (think `$()` or stuff wrapped in cash) to the [jQuery UI plugin](http://jqueryui.com) that is maintained by the jQuery team.

> jQuery UI is a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library. Whether you're building highly interactive web applications or you just need to add a date picker to a form control, jQuery UI is the perfect choice.

Think about the `.hide()` method in jquery. Under the hood its changing some css property using javascript. Much in the same way that jquery abstracts functionality from javascript, we can leverage javascript/jQuery to build our own jquery methods. This opens up a bunch of doors.

So you can see, they can be simple or rather complex.

But, you may be asking yourselves, "Why do we care?" <pause>

You tell me.  Check out these demos.

- [isotope](http://codepen.io/desandro/full/nFrte)
- [tablesorter](http://tablesorter.com/docs/#Demo)

Q. Why do we care?
---

> A. Encapsulation of really cool functionality, so we can reuse and share. We stand on the shoulders of giants. There's no need to recreate the wheel if it already exists.

## Familiarize with published plugins

Let's familiarize ourselves with jQuery plugins by investigating a couple.  How do we use them?

### Research existing plugins (T/P/S)(10/20)
- [isotope.metafizzy.co](http://isotope.metafizzy.co)
- [packery.metafizzy.co](http://packery.metafizzy.co)
- [tablesorter](http://tablesorter.com/docs/#Introduction)

Look at the docs in these plugins. Think about - What does it take to utilize a plugin?

> Steps for utilizing
- include/install
- initialize/configure/customize


## Basic anatomy of a jQuery Plugin?

What else can we expect from jQuery plugins?  How do we use them?

### Group work: (10/10: 20/40)

#### Individually for 10m:

Start in https://learn.jquery.com/plugins/

Review some random plugins:
- look for commonality
- look for patterns
- look for convention

#### Break into groups for 10m.  

When we get back together, we will be answering these questions, together.

Questions:
1. Where do we find jQuery Plugins?<br>
2. What is the basic anatomy of a jQuery Plugin?<br>
3. What do we add to our app to utilize them?<br>
4. Name some ways to install/initialize a jQuery plugin.

---

#### Answers (5/45)

1. Where?
  Officially a large list of Plugins have moved to: https://www.npmjs.com/browse/keyword/jquery-plugin

  Unofficially, google is your best bet.

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

## I do - Fixed Content plugin

Let's actually implement a jquery plugin together.

The plugin we'll be using is [FixedContent.js](https://github.com/jeremychurch/FixedContent.js)

### Fixed Content Source (5/50)

The first thing I want to do is take a look at this source code so we can get a better understanding of plugins. The source code can be found [here](https://github.com/jeremychurch/FixedContent.js/blob/master/jquery.fixedcontent.js)

It's a little scary, but let's look at some parts we can identify

```javascript
(function($) {
  // this is just using regular jquery to basically say if there is something with a class of js_fixedcontent, do something
  if ($('.js_fixedcontent').length > 0) {
    // this is where the jquery prototype is extended to now include fixedcontent,
    // just like how you can call .hide on a jquery object, you can now call .fixedcontent
    $.fn.fixedcontent = function(options){
      // check out the source for the actual function def.
    };

    // calling the method defined above on anything with class js_fixed_content
    $('.js_fixedcontent').fixedcontent();

  }

}(jQuery));
```

> One thing we can note is this is an immediately invoked function expression. Where else have we seen this? (ST - WG). We need to use an IIFE in order for this plugin to work well with jQuery and other plugins. When we put all of this code into an IIFE, we need to pass the function `jQuery` and name the parameter `$`. If you'd like to know more about this, check this [link](https://learn.jquery.com/plugins/basic-plugin-creation/#protecting-the-alias-and-adding-scope) out.

### Break (10/60)

### Implementation (15/75)
Let's create some a folder and some files we'll need for this application in the terminal:

```bash
mkdir fixedcontent_demo
cd fixedcontent_demo
touch index.html
touch script.js
touch fixedContent.js
touch styles.css
```

Copy and paste the content from [here](https://raw.githubusercontent.com/jeremychurch/FixedContent.js/master/jquery.fixedcontent.js) into `fixedContent.js`

Use the content found in this [gist](https://gist.github.com/andrewsunglaekim/27d439df8ab05b6b176c) as the dummy html content for the `index.html`:

If we open up the index page we can see that the h1 remains at the top regardless of our scrolling!

Because of `$('.js_fixedcontent').fixedcontent();` in `fixedContent.js` we don't even have to call it in our script file. You can see inside the documentation that you can customize some of the default values. You might have something like this in your `script.js`:

```js
$(".js_fixedcontent").fixedcontent({
   marginTop: 24,
   minWidth: 767,
   zIndex: 500
 });
```

### Pair up: Use a plugin!(25/90)
For 5 minutes:

- With your partner, pick a plugin from these links
  - http://tutorialzine.com/2015/04/our-favorite-jquery-plugins-and-libraries-for-spring-2015/
  - http://www.creativebloq.com/jquery/top-jquery-plugins-6133175
  - http://designshack.net/articles/javascript/40-awesome-jquery-plugins-you-need-to-check-out/

- Try and pick something you think you could reasonably attempt to code a small demo in 20 minutes

For 20 minutes:
- Attempt to install & utilize.  

You've only got 20 minutes, so focus on installation and easy demo.


## Your Own Plugin - We do (30/120)

Let's try and understand plugins a little bit deeper by creating our own custom made jQuery plugin. We'll be modeling our plugin after the one in these [jQuery docs](https://learn.jquery.com/plugins/basic-plugin-creation/#basic-plugin-authoring)

Lets start by creating all the files we'll need:

```bash
mkdir greenify
cd greenify
touch index.html
touch script.js
touch greenify.js
```

> Here we're just making a regular old `index.html` and `script.js`. Initially we'll be defining most of our plugins functionality in `script.js` and then we'll abstract the plugin portion to `greenify.js`. `greenify.js` will eventually be the jQuery plugin we'll be building.

In `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Greenify Demo</title>
</head>
<body>
  <!-- some headers we'll be using as click event listeners -->
  <h1>Make a div</h1>
  <h2>Make em green</h2>
  <h3>Add a green div</h3>
  <!-- including jquery and script files we'll need -->
  <script src='https://code.jquery.com/jquery-2.1.4.min.js'></script>
  <script src='greenify.js'></script>
  <script src='script.js'></script>
</body>
</html>
```

We'll be adding different bits of functionality in `script.js` incrementally throughout the next bit.

First add the following code to `script.js`

```js
$(document).ready(function(){
  $("h1").on("click", function(){
    $("body").append($("<div>jQuery plugins are cool!</div>"))
  })
})
```

We haven't added anything new just yet, all we've done is added an event listener to an `h1` that adds a `div` to the `body`. Let's now define our jQuery plugin and use it in a click event on the `h2`.

In `script.js`:

```js
$(document).ready(function(){
  (function($){
    $.fn.greenify = function(){
      this.css("color", "green")
      return this
    }
  })(jQuery);

  $("h1").on("click", function(){
    $("body").append($("<div>jQuery plugins are cool!</div>"))
  })

  $("h2").on("click", function(){
    $("div").greenify()
  })
})
```

If we click the `h2`, we can see all the `div`'s generated by the `h1` click event are now green.

> Here we are using `$.fn` as a prototype for the jQuery object such that we can extend the prototypes functionality. Also note that the syntax of the IIFE is very similar to the `fixedContent` plugin we utilized earlier.

## An Aside - We've seen these before - IIFE's (5/125)

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

### Common mistake

If you forget to wrap your IIFE in parens, you will get `SyntaxError: Function statements must have a name.`

## Leverage your existing plugin

Make a plugin... using a plugin!

Add this to our `script.js`:

```js
$(document).ready(function(){
  (function($){
    $.fn.greenify = function(){
      this.css("color", "green")
      return this
    }

    // added this function that uses the greenify function we defined above
    $.fn.addGreenDiv = function(){
      this.append($("<div>jQuery plugins are really really cool!</div>").greenify())
      return this
    }
  })(jQuery);

  $("h1").on("click", function(){
    $("body").append($("<div>jQuery plugins are cool!</div>"))
  })

  $("h2").on("click", function(){
    $("div").greenify()
  })

  $("h3").on("click", function(){
    $("body").addGreenDiv()
  })
})
```

Click on that `h3` and you should see a green `jQuery plugins are really really cool!`

## Don't break the chain!

Something we haven't talked about is the fact that we return `this` in our plugin definition. If we try out our code as it stands, it works great. Try removing

```js
return this
```

You'll see that that the `h1` and `h2` functionalities are still working great, but the `h3` no longer works. Why do you think this is? (ST - WG)

In our `addGreenDiv` function we call greenify on a hard coded div. If `greenify` doesn't have an explicit return(ie. missing `return this`), it returns `undefined` it appends something that is `undefined`.

jQuery functions, by convention, are chainable.  We should remember to return the jQuery object so other methods can be chained.

```js
// allow jQuery chaining
return this;
```

## Make it a plugin
Our `script.js` is getting to cluttery. And our plugin definition is getting mixed in with our logic. Let's abstract this functionality into a plugin we can use in the future at any time!

Remember that `greenify.js` file? What do you think goes in there?

In `greenify.js`:

```js
(function($){
  $.fn.greenify = function(){
    this.css("color", "green")
    return this
  }

  $.fn.addGreenDiv = function(){
    this.append($("<div>jQuery plugins are really really cool!</div>").greenify())
    return this
  }
})(jQuery);
```

> make sure to get rid of any duplicate code in your `script.js` and require `greenify.js` in your `index.html`

## You do - Contribute to greenify (10/135)

- Submit a pull request against [greenify](https://github.com/ga-dc/greenify) with a sick new feature to the greenify plugin

> In order to submit a PR you will need to fork and clone the above repo.

## You do: GIF of the Day (Rest of class, HW!)

https://github.com/ga-dc/gif_of_the_day



## Conclusion

- Where do we find jQuery Plugins?
- What are the 2 steps for utilizing a jQuery Plugin?
- What is the basic anatomy of a jQuery plugin?
- Why doe we love IIFEs?


## Additional Resources

- http://www.sitepoint.com/how-to-develop-a-jquery-plugin/
- http://blog.npmjs.org/post/111475741445/publishing-your-jquery-plugin-to-npm-the-quick
- http://www.jquery-tutorial.net/introduction/method-chaining/


