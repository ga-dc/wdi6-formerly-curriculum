# jQuery: Part I

## Learning Objectives

- Differentiate between a Javascript library and framework.
- Define jQuery as a JS library.
- Define what a CDN ("Content Delivery Network") is and how to use one.
- Use jQuery selectors to select DOM elements.
- Differentiate between DOM and jQuery objects.
- Explain when to use Vanilla JS vs. jQuery.
- Demonstrate how to use Vanilla JS and jQuery in the same document.
- Compare code examples in Vanilla JS and jQuery.

## Selecting DOM elements using Vanilla JS

Q: How do we select an `li` element using Vanilla JS?
- We'll revisit this after talking about jQuery for a bit...
- [Add event listener? Anything else?]

## What is jQuery?

Javascript library
- What is a library?
  - vs. Framework

Condense JS code into more concise methods
- Includes...
  - DOM and CSS manipulation
  - Event listeners
  - AJAX
  - Animations

Most popular Javascript library

## Setting up jQuery
Download
- [https://jquery.com/download/](https://jquery.com/download/)
- Uncompressed vs. Minified
  - Note: semicolons important for minified JS

Import
- What is a CDN?
  - Serve content to end-users with high availability and high performance.
  - Variations.
- Include with a `<script>` tag in HTML.
  - `<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>`
  - Where to put in HTML?
    - How/when is Javascript processed by the browser?

## jQuery Selectors

The most basic concept of jQuery is to "select some elements and do something with them."  

`$( "li" ).html();`
- The selector: `$( "li" )`
  - Select a DOM element by its CSS selector.

    ```javascript
    // By tag
    $( "p" );

    // By class
    $( ".contact" );

    // By id
    $( "#logo" );

    // Mix it up
    $( "div#logo p.contact" );

    // Using pseudo-selectors
    $( "ul:nth-child(2)" )

    ```

  - jQuery essentially runs `document.querySelectorAll()` on the DOM element you are selecting.
- Method: `.html()`
  - You cannot chain JS and jQuery methods!

We Do: What would `$( "li" ).html();` look like in Javascript?
  - Let's try some more JS to jQuery conversion with an exercise...

Pair Exercise: recreate Javascript selectors using jQuery
- Reference: [https://api.jquery.com/](https://api.jquery.com/)

## jQuery vs. Vanilla JS

Syntax
- Intuitive, concise, abstracts JS

Easier
- AJAX

Speed
- Vanilla JS is faster. Only relevant, however, when dealing with large amounts of code.
- [http://www.sitepoint.com/jquery-vs-raw-javascript-1-dom-forms/](http://www.sitepoint.com/jquery-vs-raw-javascript-1-dom-forms/)

You should be familiar with both, but use whichever one you feel more comfortable with.

Alright, let's dive into some jQuery!

## $( document ).ready()
