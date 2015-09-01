# Bootstrap

## Leaning Adjectives

- Explain the benefits (and shortcomings) of using a design framework.
- Describe the use cases for Bootstrap as a library versus as a framework.
- List 10 useful classes from the Bootstrap library.
- Compare and contrast Bootstrap with other front-end frameworks (e.g., Foundation and Material Design).

## [Check out this awesome app we made](http://ga-dc.github.io/grumblr_backbone/)

### This is a Backbone app

Quick crash course in Backbone: The HTML is pretty much just a template that uses Handlebars syntax. I define the models being used in the application (Grumbles and Comments in this case), and Backbone takes care of all the AJAX calls and stuff for me.

To get a better idea of what's going on underneath the hood, you can Inspect Element, click on the `<html>` tag, and hit `fn` + `F2`, and it'll show you all of the HTML **after it has been rendered by Javascript**.

Feel free to poke around in the code.

### But just *using* the app as a regular user

...it looks pretty nice, right? Much to my chagrin, we actually didn't write any of the CSS for this page. We wrote no CSS at all. Bootstrap gives you a stylesheet that includes a metric ton of classes. Add the classes to your HTML, and you've got the "look and feel" of your site taken-care-of.

Bootstrap is the visual theme on which much of the modern web is based. For instance, the styling of Github's readmes and markdown files is based very heavily on Bootstrap.

Bootstrap was born in 2011 as Twitter Blueprint. The fact that it's ubiquitious now speaks to how much of a need there was for it: prior to Bootstrap, there were lots of mini-frameworks you could use, but trying to run 35 stylesheets at the same time creates a tremendous headache.

### Bootstrap is a godsend for developers

As has been discussed, you can make the most amazing back-end functionality ever, but if the front-end doesn't look presentable you'll have a difficult time selling it.

Bootstrap lets you make a polished-looking app with minimal effort. As a result, many websites today look very "Bootstrappy".

Unless you're trying to get a job in the realm of visual design, it's better to spend 15 minutes making your app look good with Bootstrap than it is to spend 3 days writing your own CSS. Why?

The obvious reason is that one takes you 15 minutes, the other takes 3 days, and time is money. And of course, there are those clients who are non-tech-savvy and think you'll have written all the CSS yourself no matter what you do.

But...

#### Why might tech-savvy employers actually *prefer* a candidate who spent 15 minutes using Bootstrap to one who spend 3 days writing their own CSS? Doesn't the second way show better work ethic?

Making sure you have a presentable front-end is a lot like making sure you wrote your name on the test before turning it in. Painstakingly writing your name in calligraphy won't get you a better result than chicken-scratching your name; in fact, it'll probably just look like a waste of time.

## Bootstrap's classes have weird names

- Popover
- Scrollspy
- Affix
- Jumbotron
- Well
- Glyphicon
- Badge
- Progress bar
- List groups
- Navbar
- Dropdowns
- Panels
- Carousel
- Modal
- Tooltip

### You do (10): Bootstravenger Hunt

Originally I was going to walk through all of these classes with the class as a group, one-by-one. Then I realized that would take years.

So instead, with your table, Google madly to make a cheat sheet for yourself that includes:
- What each word means
- A URL that shows an example of that word/class in action

#### What did everyone get?

### Out-of-the-box, Bootstrap styles some elements

For instance, you'll notice changes with `<button>`, `<mark>`, `<code>`, `<samp>`, `<kbd>`, `<pre>`, `<abbr>`...

These are all standard HTML elements, and browsers have default styling for all of them. For instance, on pretty much every browser anything inside `<code>`, `<kbd>`, and `<pre>` will be in a monospace font.

Bootstrap takes it a step further by adding additional styling.

### Bootstrap *doesn't* style most elements out-of-the-box

For instance, `<button>` with Bootstrap doesn't look that different from the button resulting from your browser's default styling: it has square corners and a slightly different gradient, but that's pretty much it.

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

But anyway...

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

**If only** there was some way to not have to write `form-group` three milllion times!

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

Bootstrap's written in LESS, which is like SASS but written in Javascript, but there's an official SASS port.

### bootstrap-sass

Download bootstrap-sass like so:

- `gem install sass`
- `bower install bootstrap-sass`

I'm going to make a new stylesheet called `captainVonBootsTrapp.scss` that contains this:

```scss
@import "../bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss";

input,
textarea {
  @extend .form-control;
}
label {
  @extend .control-label;
}
fieldset {
  @extend .form-group;
}
.form-horizontal{
  label{
    @extend .col-sm-3;
  }
  div{
    @extend .col-sm-9;
  }
}
```

Then I'll `touch captainVonBootsTrapp.css`.

Finally, `sass captainVonBootsTrapp.scss captainVonBootsTrapp.css`

Now I only need to `<link rel="stylesheet" href="assets/stylesheets/captainVonBootsTrapp.css" />` and I get **all** of Bootstrap **plus** the changes I made!

This lets me drastically DRY up that form HTML from before:

```html
<form class="grumbleForm">
  <div class="form-horizontal">
    <fieldset>
      <label>Title:</label>
      <div><input type="text" name="title" value="{{ title }}"></div>
    </fieldset>
    <fieldset>
      <label>By:</label>
      <div><input type="text" name="authorName" value="{{ authorName }}"></div>
    </fieldset>
    <fieldset>
      <label>Content:</label>
      <div><textarea name="content">{{ content }}</textarea></div>
    </fieldset>
    <fieldset>
      <label>Photo URL:</label>
      <div><input type="text" name="photoUrl" value="{{ photoUrl }}"></div>
    </fieldset>
    <fieldset>
      <label>&nbsp;</label>
      <div>
        <button class="btn submit btn-primary">Submit</button>
        <button class="btn cancel">Cancel</button>
      </div>
    </fieldset>
  </div>
</form>
```

## Everything else about Bootstrap

...is just picking and choosing the classes you want.

## You do: Redesign Grumblr!

https://github.com/ga-dc/grumblr_css_redesign

## Questions

- What's the difference between a framework and a library?
- Name two Bootstrap classes and explain what they do.
- What's the difference between a glyphicon and a jumbotron and a Megatron?
- Give an example of a situation in which you might want to use Bootstrap, versus one in which you might not.
