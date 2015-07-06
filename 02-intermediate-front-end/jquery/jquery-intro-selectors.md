To-Do
- How to perform jQuery operations on non-first elements in a collection?

# jQuery: Part I

## Learning Objectives

- Review how to select elements using Vanilla Javascript.
- Differentiate between a Javascript library and framework.
- Define jQuery as a JS library.
- Define what a CDN ("Content Delivery Network") is and how to use one.
- Use jQuery selectors to select DOM elements.
- Differentiate between DOM and jQuery objects.
- Explain when and how to use Vanilla JS vs. jQuery.
- Compare code examples in Vanilla JS and jQuery.
- Define `$(document).ready()` and some jQuery methods.

## Selecting DOM elements using Vanilla JS (20min)

Today we're diving into the wide world of Javascript libraries. In particular, jQuery.
- Q: Anybody have a guess as to what that means?
- You're actually quite familiar with it: it's just plain ol' Javascript!

If I want to select a DOM element using Vanilla JS, how would I do that?
- Q: Somebody tell me how I would select all the `<p>` elements on a page.

Before we dive into the world of jQuery, let's make sure we've got our Vanilla JS selectors down pat with an exercise...

### Exercise: JS Selector Review (10min)

Select the following DOM objects on General Assembly's [website](http://generalassemb.ly) using Vanilla JS selectors.

1. All `h2` elements on the page.
2. The first `h2` element on the page.
3. An element with id `logo`.
4. All elements with class `post`.
5. The first element with class `post`.
6. (Using a CSS pseudo-selector) The second element with class `post`.
7. (Without using a CSS pseudo-selector) The third element with class `post`.

We'll revisit this after talking about jQuery for a bit...  

## Intro to jQuery (10min)

### Javascript library
What is a library?
- A collection of Javascript functions and methods that make writing Javascript an easier, smoother and ultimately shorter experience.
- Under the hood, all Javascript libraries are written using Javascript. So technically, there is nothing you can do using a library that can't already be done using Vanilla JS.
- There are tons of them: [https://www.javascripting.com/](https://www.javascripting.com/)
  - Some suited for particular uses like data visualization(D3.js), 3D imaging (Three.js), charts (Chart.js), autocomplete functionality (Typeahead.js) and many more...

Not the same thing as a Javascript framework.
- Not only provides tools like a library does, but also defines the architecture of your code (e.g., syntax, folder structure).
- Examples: AngularJS, Backbone, Ember.js.


Sometimes "library" and "framework" are used interchangeably, but they are not the same. The difference will be more apparent as you get some experience with both as the course progresses.  

### What is jQuery?
The "Write More, Do Less" JS library
- A general purpose library that provides an alternate and, depending on who you ask, easier means to run Javascript.
- At its core, jQuery lets us select and manipulate DOM elements.
- Can also...
  - Manipulate CSS
  - Event listeners
  - AJAX
  - Animations

Like Javascript, jQuery works in all browsers.  

Because of all this, jQuery is the most popular JS library on the web.  

## Setting up jQuery (10min)

There are two ways to go about including jQuery on a website.
- In both cases, we include the jQuery script file (`jquery-2.1.4.js`) as we would our usual app.js file using `<script>`.
- Q: Where in our HTML should we include the `jquery-2.1.4.js` file?
  - How/when is Javascript processed by the browser?
  - Relative to the `<script>` that includes our `app.js` file?

### Download
- [https://jquery.com/download/](https://jquery.com/download/)
- Minified vs. Uncompressed
  - Minified
    - No whitespace, no comments, shortened variable names.
    - Improve site load time.
    - If something goes wrong with your jQuery code, hard to debug since it's all on one line.
    - Used when a website is ready for production.
  - Uncompressed
    - Unmodified jQuery - can see it all!
    - Will use this in case we need to debug and take a look at what's going on under the hood.
    - Used when a website is in development.

### Import
You don't have to host jQuery yourself. You can pull it from the web via a Content Delivery Network (CDN).

What is a CDN?
- "Serve content to end-users with high availability and high performance."
- Broad term for a distributed system of servers -- sometimes spread across the world -- that serves content to users, whether that's videos, software or, in this case, a Javascript library.
  - In the case of jQuery, this CDN is usually Google.

Include with a `<script>` tag in HTML that links to some URL.
- Keep this handy: `<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>`

## jQuery Selectors (20min)

The most basic concept of jQuery is to "select some elements and do something with them."
- This class, we're going to focus on the "selecting." We'll touch upon the "doing something" if there's time at the end, but you'll learn a lot more about that during Andy's lesson this week.

`$( "li" ).html();`
- The selector: `$( "li" )`
  - Select a DOM element by its CSS selector.

    ```javascript
    // By tag
    $( "h1" );

    // By class
    $( ".className" );

    // By id
    $( "#idName" );

    // Q: What does this one select?
    $( "div #logo" );

    // Q: How about this one?
    $( "p .contact" );

    // Q: One more.
    // Yes, you can use CSS pseudo-selectors to select DOM elements!
    $( "ul:nth-child(2)" )

    // You can also select by HTML attribute.
    // Format: tag + [ attributeName='attributeValue' ]
    // Take note of single quotation marks.
    $( "img[ alt='logo' ]" )
    ```

  - jQuery runs the equivalent `document.querySelectorAll()` on the DOM element you are selecting.
    - If there is more than one of an element you select, jQuery will return all of them.
    - Returns a jQuery object, which functions like an array (but it's not!).
    - If a jQuery selector returns multiple elements, you can select one from the collection by using `[ ]`.
- Method: `.html()`
  - jQuery comes with tons of methods that we can use to traverse and modify the DOM, among other things.
  - In this example we're looking at `.html()`, which returns the HTML contents of a DOM object.
  - We'll go over some more later, especially in your second jQuery class this week.

We Do: What would `$( "li" ).html();` look like in Javascript?
  - Let's try some more JS to jQuery conversion with an exercise...

### Exercise: Using jQuery Selectors (10min)

Select the following DOM objects on General Assembly's [website](http://generalassemb.ly) using jQuery selectors.
1. All `h2` elements on the page.
2. The first `h2` element on the page.
3. An element with id `logo`.
4. All elements with class `post`.
5. The first element with class `post`.
6. (Using a CSS pseudo-selector) The second element with class `post`.
7. (Without using a CSS pseudo-selector) The third element with class `post`.

Reference: [https://api.jquery.com/](https://api.jquery.com/)

## jQuery Objects vs. DOM Elements (10min)

jQuery objects are not the same thing as DOM elements.
- DOM elements are returned when using Vanilla JS selectors.
  - You can only use Javascript methods on DOM elements.
- A jQuery object is a collection of DOM elements.
  - Acts like an array: zero-indexed, surrounded by square brackets, has `.length`.

Because of this difference, You CANNOT chain jQuery and Vanilla JS selectors/methods.  

  ```javascript
  // Chaining Vanilla JS is OK.
  document.getElementById( "bio" ).innerHTML;

  // Same with jQuery.
  $( "#bio" ).html();

  // You cannot, however, mix the two. This will not work...
  document.getElementById( "bio" ).html();

  // Neither will this...
  $( "#bio" ).innerHTML;
  ```

Exception: you can break out of the jQuery chain using `.get()`

You CAN, however, target DOM objects originally selected using Vanilla JS.  

  ```javascript
  // The DOM element(s) is saved to a variable using Vanilla JS.
  var submitButton = document.getElementById( "submit" );

  // We can then select that same element using jQuery.
  // Note: no quotations marks are used when selecting a variable that contains a DOM element(s).
  $( submitButton );

  // We can inspect/modify it too.
  $( submitButton ).html();
  $( submitButton ).css( "width", "50px" );
  ```

## jQuery vs. Vanilla JS (10min)

Syntax
- Intuitive, concise, abstracts JS

Easier
- AJAX

Speed
- Vanilla JS is faster. Only relevant, however, when dealing with large amounts of code.
- [http://www.sitepoint.com/jquery-vs-raw-javascript-1-dom-forms/](http://www.sitepoint.com/jquery-vs-raw-javascript-1-dom-forms/)

You should be familiar with both, but use whichever one you feel more comfortable with. You can even use both.  

Alright, let's dive into some jQuery!

## $( document ).ready( ) (5min)

A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness for you. Code included inside `$( document ).ready()` will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.
- Now you don't have to include script files at the bottom of your HTML. Can keep everything organized in the `<head>` of the document.

  ```javascript
  // Top of app.js
  $( document ).ready( function(){
    // Any code placed in here will only run once the DOM has been fully loaded.
  })
  ```

## Some jQuery Methods (10min)

Sometimes we want to select a particular aspect of a DOM element, like its HTML content or CSS properties.
- That's where jQuery's methods come in.

The jQuery methods we will be going over today are both "getters" and "setters".
- Q: Anybody want to guess what those two terms mean?
  - Getter: returns a value
  - Setter: sets/replaces a value
  - The version of the method that is triggered depends on how many arguments are fed into it.

`.html()`
- Without any arguments, gets the HTML content of a DOM object.

  ```javascript
  // Returns HTML content of a DOM element of id "title"
  $( "#title" ).html();
  # => "My Blawg"
  ```

- With an argument, replaces the HTML content of a DOM object.

  ```javascript
  // Replaces HTML content of a DOM element of id "title" with 'Adrian's Blawg'
  $( "#title" ).html( "Adrian's Blawg" );
  ```

- If a collection is selected, the method is performed on the first item in the collection.

`.attr()`
- With an HTML attribute as an argument, returns the value of that attribute.

  ```javascript
  // Returns image source
  $( "img" ).attr( "src" );
  ```

- With an HTML attribute and value as arguments, replaces the current value of that attribute with the new value.

  ```javascript
  // Sets image source
  $( "img" ).attr( "src", "https://www.google.com/logos/doodles/2015/fifa-women-world-cup-winner-tbd-country-1-5173664725073920.3-hp.jpg")
  ```

`.val()`
- Without any arguments, gets the values of form elements (e.g., `<input>`, `<textarea>`, `<select>`).
- With an argument, replaces the current value of a form element.
- If a collection is selected, the method is performed on the first item in the collection.

`.css()`
- With a CSS attribute name as an argument, returns the current value of that attribute.

  ```javascript
  // Returns the background color of the body
  $( "body" ).css( "background-color" );
  => "#F0F0F0"
  ```

- With a CSS attribute and value as arguments, replaces the current values of that attribute with the new one.

  ```javascript
  // Sets background color of the body to red
  $( "body" ).css( "background-color", "red" );
  ```

- If a collection is selected, the method is performed on the first item in the collection.

### Exercise: Get 'n' Set (10min)
