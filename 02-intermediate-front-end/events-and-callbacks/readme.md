# Events and Callbacks

- Explain the concept of a 'callback' and how we can pass functions as arguments to other functions
- Describe the difference between asynchronous and synchronous program execution
- Explain why callbacks are important to asynchronous program flow
- Identify when to reference a function and when to invoke a function
- Describe what an anonymous function is and when you would use one
- Pass a named function as a callback to another function
- Pass an anonymous function as a callback to another function

## Set up

You should have an `index.html` and a `script.js`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Events and Callbacks Practice</title>
  </head>
  <body>
    <button>Click me!</button>
    <script src="script.js"></script>
  </body>
</html>
```

```js
// script.js
console.log("I'm working!")
```

## Events Continued

Last time we set up click handlers for elements in the DOM.

```js
var button = document.querySelector("button")
var handleClickEvent = function(){
  console.log("I was clicked!")
}

button.onclick = handleClickEvent
//or
button.addEventListener("click", handleClickEvent)
```

Using `button.onlick = handleClickEvent` is the same as writing:

```html
<button onlick="handleClickEvent()">Click me!</button>
```

Because `onclick` is a DOM attribute which references a function, you can only have one click handler per DOM element.

`addEventListener` is much more common and allows multiple event handlers for one DOM object.

### Callbacks

Last time, I made a mistake by expecting the `handleClickEvent` to fire twice in the below example.

```js
button.addEventListener("click", handleClickEvent)
button.addEventListener("click", handleClickEvent)
```

To explain why that only fired once, let's look at a simpler object, like a car:

```js
var car = {
  make: "Toyota",
  model: "Echo",
  driver: "Robin"
}
car.driver = "Andy"
```

If I say `car.driver = "Andy"` that doesn't **add** a new driver; it just **overwrites** the old one.

The browser basically stores elements and events like this:

```js
var button = {
  events: {
    click: {

    },
    mouseover: {

    },
    keydown: {

    }
    // all the other event types...
  }
}
```

When you add a `click` listener called `handleClickEvent` like this...

```js
var button = document.querySelector("button")
var handleClickEvent = function(){
  console.log("I was clicked!")
}
button.addEventListener("click", handleClickEvent);
```

...it's like you're saying...

```js
var button = document.querySelector("button")
button.events.click.handleClickEvent = function(){
  console.log("I was clicked!")
}
```

> Note: This second bit wouldn't actually work. It's just for illustration.

So now the browser's stored version of the element would look like this:

```js
var button = {
  events: {
    click: {
      handleClickEvent: function(){
        console.log("I was clicked!")
      }
    },
    mouseover: {

    },
    keydown: {

    }
    // all the other event types...
  }
}
```

Notice that a property was added with the name of the callback we were using. If you add a **second** event listener called `handleClickEvent`, it would just overwrite the old one.

If instead of `handleClickEvent` the callback was called `bananaHammock`, the `button` object would look like this:

```js
var button = {
  events: {
    click: {
      bananaHammock: function(){
        console.log("I was clicked!")
      }
    },
    mouseover: {

    },
    keydown: {

    }
  }
}
```

If I do `button.addEventListener("click", bananaHammock)` **twice**, the second time doesn't **add** a new click listener called "bananaHammock"; it just **overwrites** the old listener called "bananaHammock".

Javascript will **never** let an object look like this:

```js
var button = {
  events: {
    click: {
      bananaHammock: function(){
        console.log("This totally won't work!")
      },
      bananaHammock: function(){
        console.log("I'm overwriting the last bananahammock!")
      }
    },
    mouseover: {

    },
    keydown: {

    }
    // all the other event types...
  }
}
```

That would completely defeat the purpose of objects having key/value pairs.

### Code along

Make sure your code looks like this:

```js
var button = document.querySelector("button")
var handleClickEvent = function(){
  console.log("I was clicked!")
}
button.addEventListener("click", handleClickEvent)
button.addEventListener("click", handleClickEvent)
```

Test it out, just to make sure that click event doesn't happen twice.

Now create two different callbacks, one called `handleClickEvent` and one called `otherClickEventHandler`:

```js
var button = document.querySelector("button")
var handleClickEvent = function(){
  console.log("I was clicked!")
}
var otherClickEventHandler = function(){
  console.log("I'm firing on the same click!")
}
button.addEventListener("click", handleClickEvent)
button.addEventListener("click", otherClickEventHandler)
```

Both fire on one click. That's because they have different names. 

## Anonymous functions

Now try using what's called an **anonymous function** -- a nameless function -- to make "I was clicked!" get `console logged` twice: 

```js
var button = document.querySelector("button")
button.addEventListener("click", function(){
  console.log("I was clicked!")
})
button.addEventListener("click", function(){
  console.log("I was clicked!")
})
```

Those two functions look identical, so how come Javascript fired the event twice?

When functions don't have a name, Javascript sort-of "makes up" a name for them to use internally. As a result, that button object probably looks something like this:

```js
var button = {
  events: {
    click: {
      98x872bsjy37i: function(){
        console.log("I was clicked!")
      },
      2hhj3726ksha7: function(){
        console.log("I was clicked!")
      }
    },
    mouseover: {

    },
    keydown: {

    }
    // all the other event types...
  }
}
```

This gives us a way of "cheating" to make `handleClickEvent` fire twice:

```js
var button = document.querySelector("button")
var handleClickEvent = function(){
  console.log("I was clicked!")
}
button.addEventListener("click", handleClickEvent)
button.addEventListener("click", function(){
  handleClickEvent()
})
```

Or with two anonymous functions:

```js
var button = document.querySelector("button")
var handleClickEvent = function(){
  console.log("I was clicked!")
}
button.addEventListener("click", function(){
  handleClickEvent()
})
button.addEventListener("click", function(){
  handleClickEvent()
})
```

## You do: Color Scheme Switcher 

Clone this repo. Remember to use the SSH URL now, instead of HTTPS!

[Color Scheme Switcher](https://github.com/ga-dc/color-scheme-switcher)

## The event object

Back in the code we were using in-class:

```js
var button = document.querySelector("button")
var handleClickEvent = function(){
  console.log("I was clicked!")
}
button.addEventListener("click", handleClickEvent);
```

Now, you're going to make a small change by adding an argument to the anonymous function, and `console.logging` it:

```js
var button = document.querySelector("button")
var handleClickEvent = function(e){
  console.log("I was clicked!")
  console.log(e)
}
button.addEventListener("click", handleClickEvent);
```

The `e` stands for `event`.

#### Turn and talk

With your partner, try clicking the button and exploring what properties the MouseEvent object contains. Look for:

- A way to figure out what element was clicked on
- A way to tell the position of the mouse when it clicked

### Other events

Let's explore some other events. Add a text input field into the HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Events and Callbacks Practice</title>
  </head>
  <body>
    <button>Click me!</button>
    <input placeholder="Type here!" />
    <script src="script.js"></script>
  </body>
</html>
```

#### You do

With your partner, add an event listener for the `keyup` event to the input. Explore the Event object again. Look for:

- A way to tell which key was pressed

#### We do

Your code should look something like:

```js
var button = document.querySelector("button")
var input = document.querySelector("input")
var handleClickEvent = function(e){
  console.log("I was clicked!")
  console.log(e)
}
var handleKeyboardEvent = function(e){
  console.log("You used the keyboard!")
  console.log(e)
}
button.addEventListener("click", handleClickEvent);
input.addEventListener("keyup", handleKeyboardEvent);
```

There are actually two ways to tell which key is pressed.

One is the `keyIdentifier` property. This is largely unique to Chrome. If you type the `d` character, `e.keyIdentifier` is `U+0044`, which represents the Unicode number for the lowercase `d` character. If you hit the Shift key, `e.keyIdentifier` is `Shift`.

A much more cross-browser way of telling which key is pressed is using the `keyCode` property. For `d`, `e.keyCode` is `68`. For Shift, it's `16`.

#### You do

Find the keyCodes for:

- Enter
- Tab
- Delete

#### You do

There are several other events that come up with the `input` tag. See if you can figure out the difference between:

- `keyup`
- `keydown`
- `keypress`
- `change`
- `focus`
- `blur`

There are a bunch of different browser events you can use in Javascript, all [listed at W3Schools](http://www.w3schools.com/jsref/dom_obj_event.asp).

> Yeah, yeah, I know, no-one likes W3Schools, but this list is accurate and easy-to-read.

### &larr; &larr; &rarr; &rarr; &uarr; &darr; &uarr; &darr; a b &larrhk;

There's a famous cheat code used in old Konami arcade games: you press up, up, down, down, left, right, left, right, 'b', 'a', and then 'start'. This code is so famous that many websites have secret functions for when users enter the Konami Code (with 'Enter' replacing 'start').

Try it out at [Konami Code Sites](http://konamicodesites.com/).

Some of those are now defunct. But my personal favorite is [Vogue.co.uk](http://www.vogue.co.uk/)

This is possible on these websites thanks to Javascript event listeners.

#### Turn and talk

You've seen how to detect one keypress. **How might you make something happen after a specific series of keypresses?**

## Event Defaults

Back in the code we were using in-class, replace your button with a link to, say, Google:

```html
<body>
  <a href="http://google.com">Click me!</a>
</body>
```

Now, add an event listener to that link that brings up a `prompt` box, asking the user if they want to go to Google.

```js
var link = document.querySelector("a")
var handleClickEvent = function(e){
  var input = prompt("You sure you want to go to Google?")
}
link.addEventListener("click", handleClickEvent);
```

The problem is we don't know how to stop them from going to Google! They go anyway, whether they hit 'OK' or 'Cancel'.

Some elements, like `<a>`, have a default action they do -- going to a link, in this case. You can prevent that default action with an Event property called `preventDefault`.

```js
var link = document.querySelector("a")
var handleClickEvent = function(e){
  e.preventDefault();
  var input = prompt("You sure you want to go to Google?")
}
link.addEventListener("click", handleClickEvent);
```

Now, no matter what the user clicks, they won't go to Google.

In order to make it so they that **do** go to Google on clicking OK, but **don't** on clicking 'Cancel', we can use the fact that when you click 'Cancel' on a `prompt`, it returns `null`:

```js
var button = document.querySelector("a")
var handleClickEvent = function(e){
  if(prompt("You sure you want to go to Google?") === null){
    e.preventDefault();
  }
}
button.addEventListener("click", handleClickEvent);
```

// TODO: Timing functions, and callback hell?

### 2. One Event Handler to Rule them all

```js
function switchTheme(event){
  console.log(event.target.className)
  //or
  console.log(this)
}
```

### 3. One Event Listener

```js
var buttons = document.querySelector("ul")
buttons.addEventListener("click", function(event){
  if(event.target.tagName == "LI"){
    switchTheme(event) 
  }
})
```

## You do: Cash Register Exercise

https://github.com/ga-dc/cash-register

Let’s handle the form submission together

```js
var form = document.querySelector("form")
var userInput = document.querySelector("#newEntry")
form.addEventListener("submit", function(event){
  event.preventDefault()
  console.log(userInput.value)
})
```

## Homework

<https://github.com/ga-dc/timer_js>

## Sample Quiz Questions

1. What is the difference between synchronous and asynchronous program execution?
2. Define a function that takes a function as an argument and invokes the argument when the function is called.
