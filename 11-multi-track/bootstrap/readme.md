# Bootstrap

Screencasts:

- [Part 1](http://youtu.be/Nerq19rQFrc)
- [Part 2](http://youtu.be/iTeqXPIvgys)
- [Part 3](http://youtu.be/O-sh4Hb3FUw)

## Learning Objectives

- Explain the benefits (and shortcomings) of using a design framework.
- Describe the use cases for Bootstrap as a library versus as a framework.
- List 10 useful classes from the Bootstrap library.
- Compare and contrast Bootstrap with other design frameworks (e.g., Foundation and Material Design).

## Intro

> "Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web."

Bootstrap is the visual theme on which much of the modern web is based. For instance, the styling of Github's readmes and markdown files is based very heavily on Bootstrap.

Bootstrap was born in 2011 as Twitter Blueprint. The fact that it's ubiquitious now speaks to how much of a need there was for it: prior to Bootstrap, there were lots of mini-frameworks you could use, but trying to run 35 stylesheets at the same time creates a tremendous headache.

As has been discussed, you can make the most amazing back-end functionality ever, but if the front-end doesn't look presentable you'll have a difficult time selling it.

Unless you're specifically trying to show off your CSS skills, it's often better to spend 15 minutes making your app look good with Bootstrap than it is to spend 3 days writing your own CSS. Why?

The obvious reason is that one takes you 15 minutes, the other takes 3 days, and time is money. And of course, there are those clients who are non-tech-savvy and think you'll have written all the CSS yourself no matter what you do.

Also, Bootstrap is written with responsive and/or mobile-first design in mind, replacing hand-rolled media queries with more intuitive and semantic class names. Clients and employers of all levels of tech-savviness will appreciate that you've prioritized these qualities.

AND, unlike your hand-rolled CSS, Bootstrap is [well documented](http://getbootstrap.com/) and therefore easily replicable and sharable throughout the development community.

## Getting Started

### Download Options

- You can grab it from a [CDN](http://getbootstrap.com/getting-started/#download-cdn).

``` html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    ```

``` html
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
```

- You can [download the complied and minified CSS, JS, and fonts](http://getbootstrap.com/getting-started/#download) and include them manually.

- You can [download the uncompiled source code as SASS or LESS](http://getbootstrap.com/getting-started/#download) (which we'll touch on later), pick the components you want, and compile the subset that you need.

### You're Also Gonna Need jQuery...

`<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>`

…if you want to use Bootstrap's JS components.

### Document Setup

Since Bootstrap is written with mobile in mind, they recommend configuring the viewport with a meta tag in the head:

``` html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

This ensures "proper rendering and touch zooming". If you want to disable zooming on mobile devices, you can add:

``` html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

### Containers

Bootstrap requires that you organize site contents using one of two `"container"` classes:

- `<div class="container">` gives you a responsive, fixed-width container
- `<div class ="container-fluid">` creates a full width container that spans 100% of your viewport.

[This Bootply snippet](http://www.bootply.com/render/CK6xB6cRuE) demonstrates the difference between container and container-fluid.

Both types of containers are responsive, and both allow you to implement Bootstrap's grid system inside of them.

### Grid System Basics

We'll talk in more detail about grid systems in general, and about Bootstrap's grid in particular, this afternoon. In summary, the [Bootstrap grid](http://getbootstrap.com/css/#grid) is built of `.col-[device size]-[number]` divs inside of `.row` divs, e.g.:

``` html
<div class="container">
  <div class="row">
    <div class="col-md-3"></div>
  	<div class="col-md-9"></div>
  </div>
</div>
```

The device sizes are:

- `xs` (phones, less than 768px)
- `sm`  (tablets, 768px and up)
- `md`(desktops, 992 px and up)
- `lg`(big desktops, 1200px and up)

The numbers indicate how many 1/12ths of the viewport width you would like that column to occupy, so `class="col-md-9 col-sm-12"` would be 9/12ths the width of a desktop screen, and 12/12ths the width of a tablet screen.

## We Never Go Out of Style...

### Out-of-the-box, Bootstrap styles some elements

For starters, Bootstrap implements baseline styles for links and typography, as well as using the styles from `normalize.css` to improve cross-browser performance. For instance, you'll notice changes with `<button>`, `<mark>`, `<code>`, `<samp>`, `<kbd>`, `<pre>`, `<abbr>`...

These are all standard HTML elements, and browsers have default styling for all of them. For instance, on pretty much every browser anything inside `<code>`, `<kbd>`, and `<pre>` will be in a monospace font.

### Out-of-the-box, Bootstrap *doesn't* style most elements

For instance, `<button>` with Bootstrap doesn't change too many properties, compared to your browser's default styling: it has square corners and a slightly different gradient, which goes a long way toward making it look "cleaner" and more "modern",  that's pretty much it.

The bulk of Bootstrap's customizing power lies in its dozens of components, which are implemented through a combination of CSS classes and jQuery plugins.

### You do: Bootstravenger Hunt

As a class, we're going to compile an appendix to the Bootstrap documentation, providing tips and tricks on the implementation of some of Bootstrap's Greatest Hits.

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

Each group should create Codepen demo of their three components and write up the answers to the following questions for each:

- What is it?
- What's it good for?
- Where can I read more about it?
- Any tips/tricks for implementation? _(Think: What value can I add to the existing docs?")_

Be prepared to share! It may be helpful to split into subgroups so you can divide and conquer...

## Making it Your Own

### Customization

Some use "Bootstrap-y" as a perjorative — a shorthand for "generic and uninspired". I wonder what those people would say to [these](https://bootstrapbay.com/blog/built-with-bootstrap/) or [these](http://builtwithbootstrap.com/).

You can assemble a custom download or modify an existing configuration at http://getbootstrap.com/customize/

### Bootstrap-SASS

As many of you noticed in preparing your demos, implementing customized Bootstrap elements can easily get repetitive and difficult to read. Straight Bootstrap also verges on violating separation of concerns, with all those visually-oriented classnames muddying up your HTML.

For instance, if I wanted to make a small "delete" button, I'd write something like this:

``` html
<button class="btn btn-danger btn-xs">Delete</button>
```

That's a lot of `btn`'s...

#### ...so why does Bootstrap have such repetitive class names?

This is one place where you sort-of see Bootstrap trying to straddle the line between being a framework and being a library.

**You insert a library into your code; you insert your code into a framework.**

It's not unlikely that some Bootstrap user will want to make their own CSS class called `.danger` that is completely unrelated to Bootstrap. It's extremely unlikely, however, that anyone is going to create their own class called `.btn-danger`.

Bootstrap's "library personality" wants to be as unobtrusive as possible and not conflict with any classes users might be defining, so it engages in this sort of **classnamespacing**.

#### We can use SASS to DRY up our Bootstrap!

Bootstrap is written in LESS, which is like SASS but written in Javascript, but there's an [official SASS port!](http://getbootstrap.com/css/#sass)

The [Github README for bootstrap-sass](https://github.com/twbs/bootstrap-sass) details a number of ways to incorporate this "Sass-powered version of Bootstrap 3" into your applications.

Today, we're going to use [Bower](https://github.com/twbs/bootstrap-sass#c-bower):

- `npm install -g bower`


- `gem install sass`
- `bower install bootstrap-sass`

#### We Do: An InFORMED Case Study

First, touch an `index.html` that contains this form:

``` html
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

Then, touch a stylesheet called `form-styles.scss`  that contains this:

``` scss
@import "bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss";

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

Also, touch `form-styles.css` and leave it blank.

Next, **and this is a big one**, in your terminal, run`sass form-styles.scss form-styles.css`. Now I only need to `<link rel="stylesheet" href="form-styles.css" />` to load **all** of Bootstrap **plus** the changes you just made! Take a look at your CSS file...

Finally, remove all of the classes on your `div` elements, except for `"form-horizontal"` on the first one.

``` html
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

#### You Do: BootSassify the `btn`  situation

## Homework

Bootstrapify (or [Foundation](http://foundation.zurb.com)-ify or [Materialize](http://materializecss.com)-ify or [Picnic](http://picniccss.com)-ify or [Pure](http://purecss.io/)-ify or…) something that you built earlier in the course. If you don't want to overwrite your previous styling, you're welcome to work on an branch. Open an issue with a link to your re-styled homework/project/lab [here](https://github.com/ga-dc/bootstrap-ify).

## Questions

- What's the difference between a framework and a library?

- Name two Bootstrap classes and explain what they do.

- What's the difference between a glyphicon and a jumbotron and a Megatron?

- Give an example of a situation in which you might want to use Bootstrap, versus one in which you might not.

  ​

## Helpful References

http://getbootstrap.com/components/

http://getbootstrap.com/css/

http://getbootstrap.com/customize/

https://github.com/twbs/bootstrap-sass

http://www.tutorialspoint.com/bootstrap/

http://bootsnipp.com/

http://tutorialzine.com/2015/06/12-time-saving-bootstrap-examples/

http://builtwithbootstrap.com/

https://bootstrapbay.com/blog/built-with-bootstrap/
