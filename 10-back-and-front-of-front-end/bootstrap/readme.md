# Bootstrap

## Leaning Adjectives

- Explain the benefits (and shortcomings) of using a design framework.
- Describe the use cases for Bootstrap as a library versus as a framework.
- List 10 useful classes from the Bootstrap library.
- Compare and contrast Bootstrap with other front-end frameworks (e.g., Foundation and Material Design).

## [Check out this awesome app we made](http://ga-dc.github.io/grumblr_backbone/)

Looks pretty nice, right? Much to my chagrin, we actually didn't write any of the CSS for this page. We wrote no CSS at all. Bootstrap gives you a stylesheet that includes a metric ton of classes. Add the classes to your HTML, and you've got the "look and feel" of your site taken-care-of.

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

Bootstrap gives you several different colors you can use for text and buttons to indicate things like errors, warning, success messages, and so on.

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

This is one place where you see Bootstrap trying to straddle the line between being a framework and being a library.

**You insert a library into your code; you insert your code into a framework.**


## So let's download Bootstrap

- You can grab it from a CDN.
  - `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">`
- You can download `bootstrap.css` or the minified version, `bootstrap.min.css`.
  - https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css
- You can download the uncompiled source code as SASS or LESS, pick the components you want, and compile that.
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

- The middle value indicates the viewport width for which you want a particular container to be optimized.
  - `xs` (phones), `sm` (tablets), `md` (desktops), `lg` (big desktops)


- Meta viewport
  - `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `fn` + F2 in Chrome to select all rendered HTML

- Using Bootstrap piecemeal (LESS or SASS) instead of compiled
  - Bootstrap SASS `git@github.com:twbs/bootstrap-sass.git`

- Compile our own Bootstrap
  -`gem install sass`
  -`bower install bootstrap-sass`
  -`sass captainVonBootsTrapp.scss captainVonBootsTrapp.css`

- Useful tags
  - `<mark> <code> <kbd> <pre> <samp>`
- Color classes
  - For `text-` and `bg-`
  - Muted, important, success, info, warning, danger
- Typography classes
  - list-inline, dl-horizontal, pre-scrollable
- Alerts can have fades
