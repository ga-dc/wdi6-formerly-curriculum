# Events and Callbacks

- Explain the concept of a 'callback' and how we can pass functions as arguments to other functions
- Describe the difference between asynchronous and synchronous program execution
- Explain why callbacks are important to asynchronous program flow
- Identify when to reference a function and when to invoke a function
- Describe what an anonymous function is and when you would use one
- Explain JS context and what the value of the `this` keyword refers to
- Explain what the default context of JS in the browser is
- Pass a named function as a callback to another function
- Pass an anonymous function as a callback to another function

## Events Continued

Last time we set up click handlers for elements in the DOM.

```js
var button = document.querySelector("button")
button.onclick = handleClickEvent

//or

button.addEventListener("click", handleClickEvent)
```

Because `onclick` is a DOM attribute which references a function, you can only have
one click handler per DOM element.

`addEventListener` is much more common and allows multiple event handlers for one DOM object.

Last time, I made a mistake by expecting the `handleClickEvent` to fire twice in the below example.

```js
button.addEventListener("click", handleClickEvent)
button.addEventListener("click", handleClickEvent)
```

### Callbacks

To understand why `handleClickEvent` only fires once, we need to understand how callbacks work.

`addEventListener` is a DOM method implemented in native code (not Javascript), though we can create
a function or two to mimic its capabilities

```js
var app = {
  listenForA: function(eventName, andThenDo){
    app[eventName] = andThenDo
  },
  simulateA: function(eventName){
    app[eventName]() 
  }
}

app.listenForA("click", handleClick)
app.simulateA("click")
function handleClick(){
  console.log("an event happened")
}
```

And if we wanted to know what type of event happened, invoke the callback with an argument:

```js
var app = {
  listenForA: function(eventName, andThenDo){
    app[eventName] = andThenDo
  },
  simulateA: function(eventName){
    if (typeof app[eventName] == "function")
      app[eventName](eventName) 
  }
}

app.listenForA("click", handleEvent)
app.listenForA("hover", handleEvent)
app.simulateA("click")
app.simulateA("hover")

function handleEvent(event){
  console.log("a "+event+" happened")
}
```

or, anonymously

```js
app.listenForA("hover", function(event){
  console.log("a "+ event + " happened") 
})
app.simulateA("hover")
```

## Color Scheme Switcher Continued

Let’s start with a working solution and improve it.

1. Replace inline styles with class manipulation.
2. Use the same function for all event handlers  
3. Use one event handler


