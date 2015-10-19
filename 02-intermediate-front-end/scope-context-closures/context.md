# Context

## Learning Objectives

- Explain Javascript 'context' and what the value of the 'this' keyword refers to
- Explain what the default context of Javascript executing in the browser is.
- Use the 'this' keyword to set and retrieve a property in a Javascript function
- Use bind to create a new method bound to an object context
- Use apply/call to execute a method in a different context

## References

* [Understanding Scope and Context in JavaScript](http://ryanmorr.com/understanding-scope-and-context-in-javascript/)
* [Understand JavaScript’s “this”](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/)
* [Everything you wanted to know about JavaScript scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)

## What is context

Context is feature of the Javascript language related to how and when/where
functions are invoked (aka called).

In short, the context is the object that a function is 'attached' to. (Though
we'll see that context can change under certain circumstances).

Every time a Javascript function is called, a context is determined / set. That
context is always an object, and can be referenced in the function definition
(code) using a special keyword in JS, `this`.

Here's an example of the most common way context is determined for a function:
when a method is called on an object, that object becomes the context:

```js
var instructor = {
  name: "Adam Bray",
  favoriteFood: "Spicy Miso Ramen",
  sayHello: function() {
    console.log("Hi! My name is " + this.name + ", and my favorite food is " + this.favoriteFood);
  }
}

instructor.sayHello() // for this function invocation, `this` is `instructor`
```

This feature allows not just 'getting' property info on objects, but also
setting properties. Consider this example:

```js
var xwing = {
    pilot: null,

    setPilot: function(newPilot) {
        this.pilot = newPilot;
        this.notifyUpdate();
    },

    notifyUpdate: function() {
        console.log('This X-Wing has changed!');
    }
};

xwing.setPilot("Luke Skywalker");
// >> "This X-Wing has changed!"

console.log(xwing.pilot);
// >> "Luke Skywalker"
```

## Default Context

When a function is called, but it's not a method on an object, and no context
is otherwise assigned (see later sections), then the context is set to the
default context. In a browser, the default context is the `window` object.

In node.js, the default object is called the global object.

```js
function revealThis() {
  console.log(this);
}

revealThis();
```

Note that it is very rare to intentionally use `this` to refer to the window
object. Usually this happens when we mistakenly use this incorrectly (a very
easy/common mistake for new and even experienced JS developers).

## Gotcha With `this`

### Exercise - Write, Pair, Share (5 minutes)

Consider the following example:

```js
var instructor = {
  name: "Adam Bray",
  favoriteFoods: ["Ramen", "Cap'n Crunch", "Butter"],
  displayFoods: function() {
    this.favoriteFoods.forEach(function(food) {
      console.log(this.name + " likes " + food);
    })
  }
}

instructor.displayFoods();
```

Using what we know about context, predict what the value of this will be on both
lines where if is used.

### Answer

In the first case, `this` behaves like we would expect, (it references
`instructor` since it's inside a function attached to an `instructor`.

In the second case, `this` is inside an anonymous function, so it refers to the
global object.

Note that this issue frequently appears anytime we use a callback / anonymous
function, such as:

* using `setTimeout()` or `setInterval()` to schedule callbacks
* using `forEach()` or other iteration functions
* for event listeners passed into `someElement.addEventListener()`

## Fixes for the global `this` gotcha

### Store `this` in another variable

One trick is to store the `this` you want in another variable, commonly named
`self` or `that`.

```js
var instructor = {
  name: "Adam Bray",
  favoriteFoods: ["Ramen", "Cap'n Crunch", "Butter"],
  displayFoods: function() {
    var self = this;
    this.favoriteFoods.forEach(function(food) {
      console.log(self.name + " likes " + food);
    })
  }
}

instructor.displayFoods();
```

**Mini-exercise**: Use what we know about scope to explain why this works.

### Bind

Another way is to use the bind method on the function to force the function to
always use the specified value as it's context.

```js
var instructor = {
  name: "Adam Bray",
  favoriteFoods: ["Ramen", "Cap'n Crunch", "Butter"],
  displayFoods: function() {
    this.favoriteFoods.forEach(function(food) {
      console.log(this.name + " likes " + food);
    }.bind(this))
  }
}

instructor.displayFoods();
```

## Exercise: Cat Surprise

Fork [this codepen](http://codepen.io/adambray/pen/domXyg?editors=101).

Notice that it's broken! Fix the JS so that clicking the image correctly alerts us to Mr. McWhiskertons' favorite pastimes.

## Call/Apply

There are two other ways to invoke a function and change the context, which are
very similar: `call` and `apply`.

Here's an example of how to use call:

```js
function sayHello() {
  console.log("Hi! My name is " + this.name);
}

var person = {name: "Manatee the Railyard Toreador"};
var cat = {name: "Hobbles McGillicudy"};
sayHello.call(person);
sayHello.call(cat);
```

`call` also lets us pass in the arguments to the function:

```js
function sayHello(favColor) {
  console.log("Hi! My name is " + this.name + " and I like " + favColor);
}

var person = {name: "Manatee the Railyard Toreador"};
var cat = {name: "Hobbles McGillicudy"};
sayHello.call(person, "blue");
sayHello.call(cat, "peachpuff");
```

`apply` works almost exactly like `call`, only you pass in *array* of arguments
instead of a comma-separated list.

See the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
for more.

## Summary

Note that #1 is included here for correctness, we haven't covered object constructors yet, but will soon.

> 1. Is the function called with `new` (**new binding**)? If so, `this` is the newly constructed object.
>     `var supreme_pizza = new Pizza()`
> 2. Is the function called with `call` or `apply` (**explicit binding**), even hidden inside a `bind` *hard binding*? If so, `this` is the explicitly specified object.
>     `var baked_pizza = bake.call( raw_pizza )`
> 3. Is the function called with a context (**implicit binding**), otherwise known as an owning or containing object? If so, `this` is *that* context object.
>     `var baked_pizza = raw_pizza.bake()`
> 4. Otherwise, default the `this` (**default binding**). If in `strict mode`, pick `undefined`, otherwise pick the `global` object.
>     `var probably_wont_work = bake()`
>
> Source: [You-Dont-Know-JS/ch2.md](https://github.com/getify/You-Dont-Know-JS/blob/58dbf4f867be0d9c51dfc341765e4e4211608aa1/this%20&%20object%20prototypes/ch2.md)
