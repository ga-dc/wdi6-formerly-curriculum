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
var handleClickEvent = function(){
  console.log("I was clicked!")
}
button.addEventListener("click", handleClickEvent);
```

...it's like you're saying...

```js
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

## Color Scheme Switcher Continued

Let’s start with a working solution and improve it.

    $ cd ~/wdi/exercises/color-scheme-switcher
    $ git checkout origin/solution

1. Replace inline styles with class manipulation.
2. Use the same function for all event handlers  
3. Use one event listener

### 1. Classes instead of inline styles

Manipulating classes with JavaScript instead of manipulating inline styles allows us to separate our concerns.
All style-related things will be in a css file (see how easy it is to add a new theme at the end!)

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
