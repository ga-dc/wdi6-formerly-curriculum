# Bootstrap

Screencasts:
- [Part 1](http://youtu.be/Nerq19rQFrc)
- [Part 2](http://youtu.be/iTeqXPIvgys)
- [Part 3](http://youtu.be/O-sh4Hb3FUw)

## Leaning Adjectives

- Explain the benefits (and shortcomings) of using a design framework.
- Describe the use cases for Bootstrap as a library versus as a framework.
- List 10 useful classes from the Bootstrap library.
- Compare and contrast Bootstrap with other front-end frameworks (e.g., Foundation and Material Design).

## [Check out this awesome app we made](http://ga-dc.github.io/grumblr_backbone/)

### This is a Backbone app

[Here's the source code.](http://github.com/ga-dc/grumblr_backbone)

Quick crash course in Backbone: The HTML is pretty much just a template that uses Handlebars syntax. I define the models being used in the application (Grumbles and Comments in this case), and Backbone takes care of all the AJAX calls and stuff for me.

Feel free to poke around in the code using Dev Tools.

### But just *using* the app as a regular user

...it looks pretty nice, right? Much to my chagrin, we actually didn't write any of the CSS for this page. We wrote no CSS at all. Bootstrap gives you a stylesheet that includes a metric ton of classes. Add the classes to your HTML, and you've got the "look and feel" of your site taken-care-of.

Bootstrap is the visual theme on which much of the modern web is based. For instance, the styling of Github's readmes and markdown files is based very heavily on Bootstrap.

Bootstrap was born in 2011 as Twitter Blueprint. The fact that it's ubiquitious now speaks to how much of a need there was for it: prior to Bootstrap, there were lots of mini-frameworks you could use, but trying to run 35 stylesheets at the same time creates a tremendous headache.

### Bootstrap is a godsend for developers

As has been discussed, you can make the most amazing back-end functionality ever, but if the front-end doesn't look presentable you'll have a difficult time selling it.

Bootstrap lets you make a polished-looking app with minimal effort. As a result, many websites today look very "Bootstrappy".

Unless you're specifically trying to show off your CSS skills, it's often better to spend 15 minutes making your app look good with Bootstrap than it is to spend 3 days writing your own CSS. Why?

The obvious reason is that one takes you 15 minutes, the other takes 3 days, and time is money. And of course, there are those clients who are non-tech-savvy and think you'll have written all the CSS yourself no matter what you do.

Also, Bootstrap is written with responsive and/or mobile-first design in mind, replacing hand-rolled media queries with more intuitive and semantic class names. Clients and employers of all levels of tech-savviness will appreciate that you've prioritized these qualities.

AND, unlike your hand-rolled CSS, Bootstrap is [well documented](http://getbootstrap.com/) and therefore easily replicable and sharable throughout the development world.

## Let's download Bootstrap

- You can grab it from a CDN.
  - `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">`
- You can download `bootstrap.css` or the minified version, `bootstrap.min.css`.
  - https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css
- You can download the uncompiled source code as SASS or LESS (which we'll touch on later), pick the components you want, and compile that.
  - http://getbootstrap.com/getting-started/#download

### Containers

Bootstrap sections a page with "container", as in `<div class="container">` You're not supposed to put a container inside another container.

Inside a container, you can use Bootstrap's built-in grid system. It lets you break a page up into 12 columns. You do this by writing something like:

```html
<div class="container">
  <div class="col-md-3"></div>
  <div class="col-md-9"></div>
</div>
```

This indicates how many columns you want to appear on which size screen. So a div with `class="col-lg-9 col-sm-12"` would be 9/12ths the width of a desktop screen, and 12/12ths the width of a mobile screen.

`xs` (phones), `sm` (tablets), `md` (desktops), `lg` (big desktops)

We'll talk in more detail about grid systems in general, and about Bootstrap's grid in particular, this afternoon...

### Out-of-the-box, Bootstrap styles some elements

For starters, Bootstrap implements baseline styles for links and typography, as well as using the styles from `normalize.css` to improve cross-browser performance. For instance, you'll notice changes with `<button>`, `<mark>`, `<code>`, `<samp>`, `<kbd>`, `<pre>`, `<abbr>`...

These are all standard HTML elements, and browsers have default styling for all of them. For instance, on pretty much every browser anything inside `<code>`, `<kbd>`, and `<pre>` will be in a monospace font.

The bulk of Bootstrap's customizing power, however, lies in its dozens of classes.

### You do: Bootstravenger Hunt

As a class, we're going to build a collaborative cheat sheet for some of the bootstrap classes and elements. Each group should create a demo of their three elements/classes and write up the answers to the following questions:

- What is it?
- What's it good for?
- Where can I read more about it?
- Any tips/tricks for implementation?


**Group One**
- Popover
- Scrollspy
- Affix

**Group Two**
- Jumbotron
- Well
- Glyphicon

**Group Three**
- Badge
- Progress bar
- List groups

**Group Four**
- Navbar
- Dropdowns
- Panels

**Group Five**
- Carousel
- Modal
- Tooltip


### Out-of-the-box, Bootstrap *doesn't* style most elements

For instance, `<button>` with Bootstrap doesn't change too many properties, compared to your browser's default styling: it has square corners and a slightly different gradient, which goes a long way toward making it look "cleaner" and more "modern",  that's pretty much it.

Bootstrap gives you several different colors you can use for text and buttons to indicate things like errors, warning, success messages, and so on. They are:

```
Muted, important, success, info, warning, and danger
```

You can also change the size of a button. If I wanted to make a small "delete" button, I'd write something like this:

```html
<button class="btn btn-danger btn-xs">Delete</button>
```

### That's not very DRY, is it?

There's a lot of this in Bootstrap: having 38 different classes that all start with `btn`. It would be a lot less annoying if we could make the button look like this:

```html
<button class="btn danger xs">Delete</button>
```

#### ...so why does Bootstrap have such repetitive class names?

This is one place where you sort-of see Bootstrap trying to straddle the line between being a framework and being a library.

**You insert a library into your code; you insert your code into a framework.**

It's not unlikely that some Bootstrap user will want to make their own CSS class called `.danger` that is completely unrelated to Bootstrap. It's extremely unlikely that anyone's going to create their own class called `.btn-danger`.

Bootstrap's "library personality" wants to be as unobtrusive as possible and not conflict with any classes users might be defining. This is the personality that's prevailing over the Bootstrap's other half, the "framework personality," which would use `.danger` and include documentation saying that users **should not** create classes called `.danger`.

When we use Bootstrap as a framework, it's often


## Bootstrap is great for styling forms... but not DRY

Look at how un-DRY this code is:

```html
<form class="grumbleForm">
  <div class="form-horizontal">
    <fieldset class="form-group">
      <label class="control-label col-sm-3">Title:</label>
      <div class="col-sm-9"><input class="form-control" type="text" name="title" value="{{ title }}"></div>
    </fieldset>
    <fieldset class="form-group">
      <label class="control-label col-sm-3">By:</label>
      <div class="col-sm-9"><input class="form-control" type="text" name="authorName" value="{{ authorName }}"></div>
    </fieldset>
    <fieldset class="form-group">
      <label class="control-label col-sm-3">Content:</label>
      <div class="col-sm-9"><textarea class="form-control" name="content">{{ content }}</textarea></div>
    </fieldset>
    <fieldset class="form-group">
      <label class="control-label col-sm-3">Photo URL:</label>
      <div class="col-sm-9"><input class="form-control" type="text" name="photoUrl" value="{{ photoUrl }}"></div>
    </fieldset>
    <fieldset class="form-group">
      <label class="control-label col-sm-3">&nbsp;</label>
      <div class="col-sm-9">
        <button class="btn submit btn-primary">Submit</button>
        <button class="btn cancel">Cancel</button>
      </div>
    </fieldset>
  </div>
</form>
```

**If only** there was some way to not have to write `form-group` three million times!


### Customizing Bootstrap

It's easy in some ways. Check out how many colors and dimensions and stuff you can change here, with a big fat "Compile and Download" button at the bottom:

http://getbootstrap.com/customize/

But let's say there's something else you want to customize.

### You can add in your own stylesheet and classes...

...but there's always the chance that your styles will conflict with those of Bootstrap, meaning you'll need to write `!important` everywhere or juggle IDs.

### You could edit the Bootstrap CSS itself...

...but it's enormous and generally it's discouraged to edit open-source code. For one thing, it's *huge*. For another, if you ever want to update your Bootstrap to the newest version you'll have to copy over all your changes.

### You could pick and choose the Bootstrap components you want...

...but if I look in `grumblr/assets/stylesheets/bootstrap/less` I can see that there are a zillion different stylesheets, and I really don't feel like having to write `<link rel="stylesheet">` for each one.

### So what if we could modify the Bootstrap CSS without touching it?

We can use SASS to make some changes and pre-compile Bootstrap!

Bootstrap is written in LESS, which is like SASS but written in Javascript, but there's an official SASS port.

### bootstrap-sass

Download bootstrap-sass like so:

- `gem install sass`
- `bower install bootstrap-sass`

### You do: Sassify a form!

## You do: Redesign a homework!

## Questions

- What's the difference between a framework and a library?
- Name two Bootstrap classes and explain what they do.
- What's the difference between a glyphicon and a jumbotron and a Megatron?
- Give an example of a situation in which you might want to use Bootstrap, versus one in which you might not.
