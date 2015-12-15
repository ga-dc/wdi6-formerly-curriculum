# Intro to HTML and CSS

## Learning Objectives

* List and describe the role of the 3 fundamental web technologies (HTML5, CSS, JS)
* Describe the purpose of HTML tags, and list a few common ones
* Describe the general structure of an HTML page
* Build a simple HTML page that has semantic markup
* Describe the structure of a CSS rule
* List common CSS Selectors (element, class, id)
* Use CSS to apply basic styles to an HTML page

## Core Languages of the Web

There are three languages that make up web pages:
* HTML - Defines the content, structure, and meaning of a page
* CSS - Describes the styles and layout for a page
* JS - Adds interactivity to a page

## What is HTML?

HTML is a language that describes the *content*, *structure* and *semantics* of
a web page.

In other words, it's how we define what's in our web page (text, images, video)
in a way that a computer can understand and display. By using tags, we can
relate content, and give the computer information about what that content means.

## HTML Tags

HTML pages are built of text surrounded by tags. Tags are wrapped in angle
brackets, and usually consist of an opening and closing tag.

Here's an example:

```html
<p>What does a cloud wear on its butt?</p>
<p>Thunderpants.</p>

<h1>My favorite things</h1>
<ul>
  <li>Whiskers on kittens</li>
  <li>Brown paper packages</li>
  <li>Schnitzel with noodles</li>
</ul>
```

### Exercise: Tag Matching (5 minutes)

[See if you can match the descriptions of elements and special characters on the left to what they describe on the right.](http://ga-dc.github.io/html_tag_matching/)

## HTML Page Structure

So far, we've just looked at little snippets of HTML. Let's take a look at a
minimal page, so we can see what's required to define a whole page:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Sweet Joke Page</title>
  </head>
  <body>
    <header>
      <h1>Adam's Favorite Jokes</h1>
    </header>
    <main>
      <ul class="jokes">
        <li>
          <h2>What does a cloud wear on its butt?</h2>
          <p>Thunderpants.</p>
        </li>
        <li>
          <h2>What do you call a cow with no legs?</h2>
          <p>Ground beef.</p>
        </li>
      </ul>
    </main>
    <footer>
      <p><a href="http://github.com/adambray">Check out my GitHub Profile!</a></p>
    </footer>
  </body>
</html>
```

### HTML Tag Attributes

Note that some of these tags have additional text inside of them, such as
`class="jokes"` or `href="http://github.com/adambray"`

Attributes give the browser a bit more information about the tag. Some common
attributes:

* class & id - used for styling and JS
* href - defines where a link points to
* src - defines where an image tag's image file is

### Exercise: Bel Air Biography (15 minutes)

Let's re-create (this page)[http://ga-dc.github.io/belair_biography/] using
wood tiles!

## CSS

Right now, our pages just have content and structure, but only the most basic
*style* (which is coming from browser defaults).

To add style, we need to write CSS. CSS is usually written in a separate file
which we `link` into the web page.

For now, we'll use [Codepen](http://codepen.io) to play with HTML & CSS, as it
makes it easier to explore.

CSS Consists of style rules:

```css
p {
  color: red;
  font-size: 20px;
}
```

Note the syntax here.
1. We start by selecting (identifying) what part of the page the rule applies to.
2. In curly braces, we define one or more declarations.
3. Each declaration contains a property, then a colon, then the value, and ends with
a semi-colon.

There are a few common ways to select elements:
* by tag name
* by class
* by ID

Some more examples:

```html
<header>
  <h1>Adam's Favorite Jokes</h1>
</header>
<main>
  <ul class="jokes">
    <li>
      <h2>What does a cloud wear on its butt?</h2>
      <p>Thunderpants.</p>
    </li>
    <li>
      <h2 id="favorite-joke">What do you call a cow with no legs?</h2>
      <p>Ground beef.</p>
    </li>
  </ul>
</main>
```

```css
/* by tag name*/
h2 {
  font-size: 32px;
}
p {
  color: red;
  font-size: 24px;
}

/* by class */
.jokes {
  border: 1px solid black;
  width: 200px;
}

/* by ID */
#favorite-joke {
  color: blue;
}
```

## Javascript Demo

It's out of scope of today's lesson to go into detail on JS, but let's take a
quick look at some code to see the role that JS plays. In short, JS is the only
real programming language for the web. HTML and CSS are markup languages, which
means they just describe the page and its style. JS allows us to write programs
which react to use actions, make requests for data and more.

### Demo: showing / hiding punchlines

### Javascript vs jQuery

A common question is "What is the difference between Javascript and jQuery".

In short, jQuery is a library for JS, which means it's written in JS, and adds
pre-written code to help us write cleaner JS. It's primarily designed to solve a
few problems:

* finding and manipulating elements on the page
* adding common interactions (drag and drop, etc)
* requesting data from another server
