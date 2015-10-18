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

### Before we go on...

Usually when we do anything with functions, we put parentheses after the function name. Here, we have `handleClickEvent` without any parens.

Try adding parentheses at the end of this line:

```js
button.addEventListener("click", handleClickEvent())
```

Refresh your page. What was different? Why?

## Callbacks

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

Some elements, like `<a>`, have a default action they do -- going to another webpage, in this case. You can prevent that default action with an Event property called `preventDefault`.

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

## Making something draggable and droppable with removeEventListener

Replace your `script.js` with the following code:

```js
var button = document.querySelector("button")
var elementStartX, elementStartY;
var mouseStartX, mouseStartY, mouseCurrentX, mouseCurrentY;
button.addEventListener("mousedown", startDragging);
function startDragging(e){
  elementStartX = button.offsetLeft;
  elementStartY = button.offsetTop;
  mouseStartX = e.clientX;
  mouseStartY = e.clientY;
  window.addEventListener("mousemove", drag);
  window.addEventListener("mouseup", stopDragging);
}
function stopDragging(){
  window.removeEventListener("mousemove", drag);
  window.removeEventListener("mouseup", stopDragging);
}
function drag(e){
  mouseCurrentX = e.clientX;
  mouseCurrentY = e.clientY;
  button.style.left = elementStartX + (mouseCurrentX - mouseStartX) + "px";
  button.style.top = elementStartY + (mouseCurrentY - mouseStartY) + "px";
}
```

Then, add in a tiny bit of CSS into your `<head>`:

```css
button{
  position:absolute;
  top:0px;
  left:0px;
}
```

### Turn and talk

- Why are the `mousemove` and `mouseup` event listeners attached to `window` instead of to `button`? (What happens if you change them to being on `button`?)
- What's the purpose of removing the event listeners?
- Why do we **have** to use named functions here, instead of anonymous functions?
- What information do the `offsetLeft`, `offsetTop`, `e.clientX`, and `e.clientY` properties give you?
- Open the "elements" part of the inspector -- the bit that shows all of the HTML. What's happening to the `<button>` element?
- What's the difference between `function startDragging(e)` and `var startDragging = function(e)`?

## Timing functions

Let's look at timing functions -- that is, Javascript's way of making something happen every `x` seconds.

Replace the contents of your `script.js` with this:

```js
function sayHello(){
  console.log("Hi there!")
}
setInterval(sayHello, 1000);
```

### Turn and talk

- What does the number in `setInterval` indicate?
- Replace `setInterval` with `setTimeout`. What's the difference?

We'll make it more interesting by having the timer start on a click event, and stop on another click event.

Put a "start" and a "stop" button in your HTML:

```html
<button id="start">Start</button>
<button id="stop">Stop</button>
```

Then, replace the contents of your `script.js` with this:

```js
var start = document.getElementById("start");
var stop = document.getElementById("stop");
var singAnnoyingSong = function(){
  console.log("I know a song that gets on everybody's nerves...")
}
var songTimer;
start.addEventListener("click", function(){
  songTimer = setInterval(singAnnoyingSong, 100);
});
stop.addEventListener("click", function(){
  clearInterval(songTimer);
});
```

### Turn and talk

- What happens when you click the "start" button a bunch of times in a row?
  - Why?
  - How is this different from events?
  - When you do this, why doesn't the "stop" button seem to work?
- How is `clearInterval` different from `removeEventListener`?
- Give `singAnnoyingSong` an argument of `e`, like we did for the event listeners. What information does it contain?

## Making your own callbacks

We've done a lot of stuff with callbacks today, passing them as arguments into built-in Javascript functions. But we haven't tried passing them into functions we wrote ourselves.

We're going to create a script that shows your interal monologue over the course of a normal weekday. Create three functions: one that `console.logs` something you think to yourself on waking up, another something you think during your commute, and that last something you think when you get to GA.

Then, create a function called `averageMorning` that takes three arguments, `first`, `then`, and `lastly`.

These three arguments represent three functions. Inside `averageMorning`, call `first`, `then`, and `lastly`, in order.

Then, call the `averageMorning` function itself, passing in as arguments the three functions you wrote.

The result should be something like this:

```js
function haveBreakfast(){
  console.log("Gotta have my Pops!")
}
function commute(){
  console.log("What an interesting smell on Metro this morning...")
}
function workAtGA(){
  console.log("At work! Now I can promote RobertAKARobin.com through the disguise of teaching again.")
}
function averageMorning(first, then, lastly){
  console.log("This is my internal monologue on a normal weekday")
  first();
  then();
  setTimeout(lastly, 5000);
}
averageMorning(haveBreakfast, commute, workAtGA);
```

## IIFEs

Want to see something really crazy? We can define *and* call the `averageMorning` function all at once, without needing `averageMorning()` on a separate line. Just delete a couple things, and put in two extra parens:

```js
(function averageMorning(first, then, lastly){
  console.log("This is my internal monologue on a normal weekday")
  first();
  then();
  setTimeout(lastly, 5000);
}(haveBreakfast, commute, workAtGA));
```

This is called an **Immediately-Invoked Function Expression**, which is a fancy way of saying "a function that runs as soon as it gets defined." You can do this with anonymous functions too:

```js
(function(){
  var x;
  for(x = 2; x < 10; x++){
    console.log(x + " black spiders! Ah ah ahh!")
  }
  console.log("I lahv counting! Ah ah ahh!")
}());
```

This seems kind of pointless, right? The advantage is that it keeps variables from cluttering up your browser. When Javascript comes to the end of a function, it "forgets" all of the data it generated inside that function to free up memory. Keeping everything inside functions and IIFEs can have a significant impact on the performance of your website since it takes less memory to run.

## Asynchronicity

Give your internal monologue code a "farewell" message that runs at the end:

```js
(function averageMorning(first, then, lastly){
  console.log("This is my internal monologue on a normal weekday")
  first();
  then();
  setTimeout(lastly, 5000);
  console.log("...and that's my day!")
}(haveBreakfast, commute, workAtGA));
```

Wait, what? The farewell came before the "at GA" message!

With everything else we've seen, Javascript executes one line of code, then when it's done, executes the next line of code. This is called being **synchronous**.

However, some operations in Javascript are **asynchronous**, meaning Javascript goes on to the next line of code without waiting for the previous line to complete.

This is limited mostly to timing functions, and operations where Javascript is loading data from some other website.

### Why doesn't Javascript wait for these operations to complete before going to the next line of code?

Because otherwise the webpage would just "hang" until the operation completes. The browser can't do anything while Javascript is actively running. We've seen this when we've encountered infinite loops. Asyncrhonicity is a way of preventing the computer from freezing.

This risk is potentially the greatest when Javascript is making requests to other webpages. There's no way of knowing how long the request will take to complete. It could be near-instant, but if the target server is having a bad day, it could take who-knows-how-long. You don't want the operability of your computer to be at the mercy of some random computer somewhere else.

In the internal monologue app we made, anything we want to be sure happens **after** those 5 seconds of commuting should go inside the `lastly` callback. This way, we can be certain that it will run only when the 5 seconds are up.

-----

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
