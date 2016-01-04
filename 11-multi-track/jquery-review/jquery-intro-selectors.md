# jQuery: Part I

## Learning Objectives

- Review how to select elements using Vanilla Javascript.
- Differentiate between a Javascript library and framework.
- Define the role that jQuery serves as a library
- Define what a CDN ("Content Delivery Network") is and how to use one.
- Use jQuery selectors to select DOM elements.
- Differentiate between DOM and jQuery objects.
- Explain when and how to use Vanilla JS vs. jQuery.
- Compare code examples in Vanilla JS and jQuery.
- Define `$(document).ready()` and some jQuery methods.

## Selecting DOM elements using Vanilla JS (20min)

Before we talk about jQuery, I want to make sure we're on top of our Javascript -- or as we'll refer to it today, "Vanilla JS" -- selectors.

If I want to select a DOM element using Vanilla JS, how would I do that?
- Q: Somebody demonstrate how to select all the `<p>` elements on a page.

Before we dive into the world of jQuery, let's make sure we've got our Vanilla JS selectors down pat with an exercise...

### Exercise: JS Selector Review (10min)

Follow along with "My Blawg": https://github.com/ga-dc/jquery-inclass-blawg
- Clone: `$ git clone https://github.com/ga-dc/jquery-inclass-blawg.git`
- Open: `$ open index.html`
- We'll be using this as an example throughout today's class.

Instructions: Write down how you would select the following DOM objects on "My Blawg" using Vanilla JS selectors.  
  1. The first `<a>` element on the page.  
  2. All `<a>` elements on the page.  
  3. Using an id, the h1 at the top of the page.  
  4. All elements with class `post`.  
  5. The first element with class `post`.  
  6. The second element with class `post`.  
  7. The HTML content of the first `<p>` element on the page.  

We'll revisit this after talking about jQuery for a bit...  

## Intro to jQuery (10min)

### Javascript library
What is a library?
- Q: Has anybody used a JS library before?
- A collection of Javascript functions and methods that make writing Javascript an easier, smoother and ultimately shorter experience.
- Under the hood, all Javascript libraries are written using Javascript. So technically, there is nothing you can do using a library that can't already be done using Vanilla JS.
- There are tons of them: [https://www.javascripting.com/](https://www.javascripting.com/)
  - Some suited for particular uses like data visualization(D3.js), 3D imaging (Three.js), charts (Chart.js), autocomplete functionality (Typeahead.js) and many more...

Not the same thing as a Javascript framework.
- Not only provides tools like a library does, but also defines the architecture of your code (e.g., syntax, folder structure). Basically, a set of rules you have to follow.
- Examples: AngularJS, Ember.js.


Sometimes "library" and "framework" are used interchangeably, but they are not the same. The difference will be more apparent as you get some experience with both as the course progresses.  

### What is jQuery?
The "Write Less, Do More" JS library
- A general purpose library that provides an alternate and easier way to run Javascript.
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
    - Q: Why would we want something minified?
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

`$( "h2" ).html();`
- The selector: `$( "h2" )`
  - Select a DOM element by its CSS selector.

    ```javascript
    // By tag
    // What does this look like in the console?
    $( "h2" );

    // By class
    $( ".nav-link" );

    // By id
    $( "#click-me" );

    // Q: What does this one select?
    $( "#blog div" );

    // Q: How about this one?
    $( ".post h2" );

    // Q: One more.
    // Yes, you can use CSS pseudo-selectors to select DOM elements!
    $( "div:nth-child(2)" )

    // Q: Last one, promise.
    // You can also select by HTML attribute.
    // Format: tag + [ attributeName='attributeValue' ]
    // Take note of single quotation marks.
    $( "img[ src='img/5.jpeg' ]" )
    ```

  - jQuery runs the equivalent `document.querySelectorAll()` on the DOM element you are selecting.
    - Q: What does `querySelectorAll()` do in Vanilla JS?
    - If you select an element of which there is more than one, jQuery will return all of them.
    - Returns a jQuery object, which functions like an array -- has zero-index, length -- but it's not one!
    - If a jQuery selector returns multiple elements, you can pull out an individual element using the `.eq()` method.

      ```javascript
      // Returns all h2 elements on a page.
      $( "h2" )

      // Returns the second h2 element on a page.
      $( "h2" ).eq(1)
      ```

- Method: `.html()`
  - jQuery comes with tons of methods that we can use to traverse and modify the DOM, among other things.
  - In this example we're looking at `.html()`, which returns the HTML contents of a DOM object.
  - We'll go over a few today, and you'll go over a lot more of them with Andy during your second jQuery class.

We Do: What would `$( "h2" ).html();` look like in Javascript?
  - Let's try some more JS to jQuery conversion with an exercise...

### Exercise: Using jQuery Selectors (10min)

Select the following DOM objects on the Blawg using jQuery selectors.  
  1. All `<a>` elements on the page.
  2. The first `<a>` element on the page.
  3. Using an id, the h1 at the top of the page.  
  4. All elements with class `post`.  
  5. The first element with class `post`.  
  6. The second element with class `post`.  
  7. The HTML content of the first `<a>` element on the page.  
  8. Using a CSS pseudo-selector, the third element with class `post`.
  9. Using an HTML attribute, the fourth `img` on the page.  

Reference: [https://api.jquery.com/](https://api.jquery.com/)

## jQuery Objects vs. DOM Elements (10min)

jQuery objects are not the same thing as DOM elements.
- DOM elements are returned when using Vanilla JS selectors.
  - You can only use Javascript methods on DOM elements.
- A jQuery object is a jQuery-specific collection of DOM elements.

Because of this difference, You CANNOT chain jQuery and Vanilla JS selectors/methods.  

  ```javascript
  // Chaining Vanilla JS is OK.
  document.getElementById( "click-me" ).innerHTML;

  // Same with jQuery.
  $( "#click-me" ).html();

  // You cannot, however, mix the two. This will not work...
  document.getElementById( "click-me" ).html();

  // Neither will this...
  $( "#click-me" ).innerHTML;
  ```

There are some "exceptions" to this no-chaining rule...

You CAN run Vanilla JS inside jQuery, and vice-versa. Let me show you what I mean with another Blawg example...

  ```javascript
  // Select a DOM element with an id of click-me
  var clickMe = document.getElementById( "click-me" );

  // We set up an event listener for clickMe using Vanilla JS
  // But then we execute jQuery code inside that event listener!
  clickMe.addEventListener( "click", function(){
    $( "body" ).css( "background-color", "lemonchiffon" );
  })

  // We can flip that around.
  // You'll learn jQuery event listeners later...
  $( "#click-me" ).on( "click", function(){
    document.body.style.backgroundColor = "lemonchiffon";
  })
  ```

You can also target DOM objects originally selected using Vanilla JS.  

  ```javascript
  // The DOM element(s) is saved to a variable using Vanilla JS.
  var clickMe = document.getElementById( "click-me" );

  // We can then select that same element using jQuery.
  // Note: no quotations marks are used when selecting a variable that contains a DOM element(s).
  $( clickMe );

  // We can inspect...
  clickMeContents = $( clickMe ).html();
  console.log( clickMeContents );
  => "Click Me!"

  // ...and modify them too.
  $( clickMe ).css( "background-color", "pink" );
  ```

## jQuery vs. Vanilla JS (10min)

Q: Now that we've gone over jQuery for a bit, what are some reasons you think somebody would use jQuery over Vanilla JS?
- What about Vanilla JS over jQuery?

Easier
- Abstracts Vanilla JS into shorter, more concise and intuitive syntax
- Reduces development time
- ...but only if you're doing plenty of element selection and event handling!
  - Some people have a tendency to automatically include jQuery, regardless of what they're doing.
  - [needsmorejquery.com/](http://needsmorejquery.com/).

Speed
- Vanilla JS is faster. Only relevant, however, when dealing with large amounts of code.
- [http://www.sitepoint.com/jquery-vs-raw-javascript-1-dom-forms/](http://www.sitepoint.com/jquery-vs-raw-javascript-1-dom-forms/)

Make sure you're familiar with Vanilla JS and jQuery, but use whichever one you feel more comfortable with. Or use both!

Onto some jQuery methods!

## $( document ).ready( ) (5min)

A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness for you. Code included inside `$( document ).ready()` will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.

  ```javascript
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
  // Replaces HTML content of a DOM element of id "title" with 'Adam's Blawg'
  $( "#title" ).html( "Adams's Blawg" );
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
  $( "img" ).attr( "src", "http://ak-hdl.buzzfed.com/static/2013-12/enhanced/webdr07/3/12/anigif_enhanced-buzz-15393-1386091162-37.gif")
  ```

`.css()`
- With a CSS attribute name as an argument, returns the current value of that attribute.

  ```javascript
  // Returns the background color of the body
  $( "body" ).css( "background-color" );
  => "#FAFAFA"
  ```

- With a CSS attribute and value as arguments, replaces the current values of that attribute with the new one.

  ```javascript
  // Sets background color of the body to red
  $( "body" ).css( "background-color", "lemonchiffon" );
  ```

- If a collection is selected, the method is performed on the first item in the collection.

### Exercise: Get 'n' Set (10min)

"Get or "Set" the following values using jQuery selectors and methods.  
  1. Get the HTML content of the second `<p>` element on the page.  
  2. Set the HTML content of the second `<p>` to something else weird.  
  3. Get the background color of the body.  
  4. Set the background color of the body to "burlywood".  
  5. Get the `alt` value of the fourth `<img>` on the page.  
  6. Set the `alt` value of the fourth `<img>` to something else.  

Reference: [https://api.jquery.com/](https://api.jquery.com/)

## Homework: Pixart

[https://github.com/ga-dc/pixart_js](https://github.com/ga-dc/pixart_js)
