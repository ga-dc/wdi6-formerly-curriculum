# Objects, Functions and DOM

## Learning Objectives

- Discuss datatypes (simple datatypes vs. collections)
- Compare objects and key-value stores to arrays as data structures
- Explain the difference between object properties and methods
- Create empty objects and objects with multiple properties and methods using object literal syntax
- Compare adding and retrieving properties to objects using dot and bracket notation
- Use `delete`
- Iterate over the keys of an object to return and manipulate values
- Introduce namespace
- Explain nested data structures
- Write an object method
- Describe what a JavaScript function is
- Recognize the parts of a function
- Write a function in JavaScript using a declaration and an expression
- Define hoisting
- Differentiate between referencing and invoking a function
- State the difference between Output and Side Effects

## Datatype Review

### Simple datatypes

- number (e.g. `0`, `1`, `-1`, `0.5`, `1e10`)
- string (e.g. `"Hello World!"`, `"A"`, `""`)
- booleans (i.e. `true` or `false`)

### Collections

- arrays (e.g. `[1, 2, 3]`, `['a', 'b', 'c']`, `['a', 1, 'cat']`, `[]`)
  - index
  - values
- objects (e.g. `{'name': 'John', 'nationality': 'USA', 'age': 84}`)
  - keys (e.g. `'name'`)
  - values (e.g. `'John'`)

## Arrays Review

Arrays are a complex data type - usually referred to as an ordered list.

**How do we retrieve certain elements from an array?**

Using an index.

## Objects

Objects too are a complex data type - usually referred to as an *unordered* list (or dictionary, or hash, or map...). They are a collection of key-value pairs called properties. The keys which we explicitly state when defining a property are analogous to our array indexes. They are how we access the associated value (more below).

What kinds of things in the world fit into an array? What kinds of things fit into key-value pairs?

Things to consider:

- Books in a Library
- Menu items at a fast food restaurant
- Definitions in a dictionary
- List of students in WDI
- List of all GA courses ordered by city

### Create

```js
var car = {
  make: "Honda",
  model: "Civic",
  year: 1997
}
```

### Read

```js
console.log(car.make)
console.log(car["make"])
```

### Update

```js
car.year = 2003
car.smell = "Leathery Boot"
```

### Delete

```js
delete car.smell
```

### Iterating

```js
for (attribute in car) {
  console.log(attribute);
}
```

*What does this allow us to do?*

### Namespace

### Nested Collections

The values in a collection can be any simple datatype or another collection. This means we can have an array of arrays, an array of objects... pretty much whatever you can think of.

What kinds of things in the world would fit into an array of objects? What about an object containing arrays?

[Twitter object exercise]

## You Do: Model WDI Student

Create a variable named wdiStudent and assign it to an object literal - `{}`

Add three attributes, with at least one key that has a hyphen in the name, like "first-name"

Delete one attribute

## Functions

Review from the prework - what’s a function?

There are two ways to define or declare a function:

```js
var eat = function(){
  console.log("nom nom")
}

//or

function eat(){
  console.log("nom nom")
}
```

The difference is subtle, but important. The first function declaration is assigning an "anonymous" function to a variable.
The second function declaration is a named function. The practical difference is:

>Named functions are processed before any code is executed, meaning you can call functions before they are declared. This behavior is known as **hoisting**.

### Input, Output, and Side Effects

the input(s) to a function are known as arguments, or parameters:

```js
function eat(someFood){
  console.log("nom nom, i <3 "+ someFood)
}

eat("pizza")
```

It might feel like the output of this function is the string starting with "nom...", but it’s not! It’s a side-effect.

The output of a function is whatever is `return`ed from a function:

```js
function eat(someFood){
  return "nom nom, i <3 "+ someFood
}

var lunch = eat("pizza")
console.log(lunch)
```

## Methods

Methods are functions that are attached to some object.

```js

var car = {
  make: "Honda",
  model: "Civic",
  drive: function(){
    console.log("vroom vroom")
  }
}
car.drive()
```

## DOM

The [**D**ocument **O**bject **M**odel](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
is a programming interface for HTML.

An HTML *document* is available for us to manipulate as an object, and this object is structured like a tree:

(Not like this one http://hakim.se/experiments/css/domtree/)

![](http://www.tuxradar.com/files/LXF118.tut_grease.diagram.png)

https://css-tricks.com/dom/

### Document

`document`
  - `document.head`
  - `document.body`

Each web page loaded in the browser has its own document object. The Document interface serves as an entry point to the web page's content

`document.body`
  - .children
  - .childNodes
  - .firstChild
  - .lastChild
  - .nextSibling
  - .parentElement
  - .parentNode

### Selecting DOM elements

- document.getElementById
- document.getElementsByTagName
- document.getElementsByClassName
- document.querySelector
- document.querySelectorAll

### Altering DOM Elements

- .textContent
- .innerHTML
- .setAttribute(name, value);
- .id
- .classList.toggle (add, remove, contains)
- .style

### Creating/Removing DOM Elements

- .createElement
- .appendChild
- .removeChild

### You do: Logo hijack

- Open up www.google.com in Chrome or Firefox, and open up the console.
- Find the Google logo and store it in a variable.
- Modify the source of the logo IMG so that it's a Yahoo logo instead.
- Find the Google search button and store it in a variable.
- Modify the text of the button so that it says "Yahooo!" instead.

## Events

- https://developer.mozilla.org/en-US/docs/Web/Events

- .onclick
- .addEventListener
  - click
  - mouseover
- .preventDefault()

## Color Scheme Switcher

- [jessica hische](http://jessicahische.is/)
- [color scheme switcher](https://github.com/ga-dc/color-scheme-switcher)

---

## Homework

<https://github.com/ga-dc/tic_tac_toe>

---

## Sample Quiz Questions:

1. What is the difference between a method and an attribute?
2. What is the difference between `onclick` and `addEventListener?`
