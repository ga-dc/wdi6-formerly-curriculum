# jQuery

## Screencasts

- https://vimeo.com/150819686
- https://vimeo.com/150819684
- https://vimeo.com/150819685

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
- add elements to the DOM using jQuery objects and functions
- change elements in the DOM using jQuery objects and functions
- add event listeners to elements in the DOM using jQuery objects and functions
- loop through jQuery objects using the `each()` method

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

https://github.com/ga-dc/jquery-inclass-blawg

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

### Exercise: Refactor the ATM

Replace the "vanilla" JS dom elements and methods with jQuery methods.

Reference: [https://api.jquery.com/](https://api.jquery.com/)

## Addition

### I do - append/appendTo (10/20)
- `.append()`
  - the selector expression preceding the method is the container into which the content(argument) is inserted as the last child

  ```javascript
    $(".awesome").append("<div>this div is appended</div>")
    // this would add the div as the last child in it to all elements with class awesome
  ```

- `.appendTo()`
  - the content precedes the method, either as a selector expression or as markup created on the fly, and it is inserted into the target container(argument) as the last element

  ```javascript
    $("<div>this div is appended</div>").appendTo($(".awesome"))
    // same thing as above
  ```

### You do - prepend/prependTo (10/30)
- Go into the [jquery docs](https://api.jquery.com/) to learn about prepend/prependTo
- Add 2 elements to each div as the first child of that div
- make sure to use both `.prepend()` and `.prependTo()`

- `.prepend()`
  - same as append but inserts the specified content(argument) as the first child

  ```javascript
    $(".awesome").prepend("<div>this div is prepended</div>")
    // this would add the div as the first child in it to all elements with class awesome
  ```

- `.prependTo()`
  - same as appendto but the content precedes the method call is inserted as the first child of the target container(argument)

  ```javascript
    $("<div>this div is prepended</div>").prependTo($(".awesome"))
    // same thing as above
  ```

  > Think about how facebook statuses work. When we add a new status, does it go to the bottom of the list? or is it right at the top? Maybe they're using a prepend here ...

### `.html()`/`.text()` (10/40)
- `.html()`
  - get or set the HTML contents
    - get: no argument, know that it returns the innerHTML of the first jQuery object

    ```javascript
      $(".awesome").html()
      // returns the innerHTML of the first element in the jQuery object
    ```

    - set: one argument that you want the html content to be

    ```javascript
      $(".awesome").html("this is awesome!")
      // returns the innerHTML of the of all elements in the jQuery object to be "this is awesome!"
    ```

- `.text()`
  - get or set the text contained, it will strip the HTML elements
  - same as `.html()` only it returns the text of all jQuery objects selected for the getter portion

### Removal
#### I do (remove) (5/45)
- `.remove()`
  - removes the jquery object it is called on, as well as bound events and everything inside it

  ```javascript
    $(".awesome").remove()
  ```

#### You do (empty) (5/50)
- In the `index.html`, create some dummy content that is children of the the second div with class awesome.
- Then using jquery, remove all of those child elements.

- `.empty()`
  - removes all the child elements of the jquery object it is called on

  ```javascript
    $(".awesome").empty()
  ```

  > Note: when we call the above code, we'll actually be emptying all content from any element with the class of 'awesome'

### Other (30/110)
- `.hide()`
  - changes elements style to have `display:none`

  ```javascript
    $(".awesome").hide()
    // returns the innerHTML of the first element in the jQuery object
  ```

- `.show()`
  - changes a `display:none` to `display:block` or whatever it initially was

  ```javascript
    $(".awesome").show()
    // returns the innerHTML of the first element in the jQuery object
  ```

- `.addClass()`
  - does not replace existing classes
  - pass in argument of 1 string to add 1 or more classes

  ```javascript
    $(".awesome").addClass("add three classes")
    // adds the classes add, three and classes to all elements in the jQuery object returned
  ```

- `.removeClass()`
  - pass in argument of 1 string remove 1 or more classes

  ```javascript
    $(".awesome").removeClass("add three classes")
    // removes the classes add, three and classes to all elements in the jQuery object selected
  ```

- `.children()`
  - returns a jQuery object that contains all the child elements of the jQuery object it is called on.

  ```javascript
    $(".awesome").children()
  ```


- `.each()`
  - loops through collections of jquery objects

  ```javascript
    $(".awesome").each(function(index){
      $(this).html("this html element has the index of ()" + index + ") in the each function")
    })
  ```

> note what the context of `$(this)` is. This refers to each of the elements being looped through.

> This also is actually the second time in this lesson a jquery function requires a callback, can you think of the other?

- `.on()`
  - a way to create event listeners
  - takes two arguments normally
    - first argument is the event(lots of them)
    - second argument is the callback

    ```javascript
      $(".awesome").on("click", function(){
        console.log($(this))
      })
    ```

> What is `$(this)` here? Refers to the jquery object you called `.on` on, as long as you're in the scope of the `.on` function

## You do: Pixart

[https://github.com/ga-dc/pixart_js](https://github.com/ga-dc/pixart_js)


