# Objects and Functions

## Learning Objectives

- Compare objects and key-value stores to arrays as data structures
- Explain the difference between object properties and methods
- Create empty objects and objects with multiple properties and methods using object literal syntax
- Compare adding and retrieving properties to objects using dot and bracket notation
- Iterate over the keys of an object to return and manipulate values
- Define what a function is
- Define hoisting
- Differentiate between referencing and invoking a function
- Explain what the DOM is and how it is structured
- Select and target DOM elements using a query selector
- Change the attributes or content of a DOM element

## Arrays Review

Arrays are a complex data type - usually referred to as an ordered list.

**How do we retrieve certain elements from an array?**

Using an index.

## Objects

Objects too are a complex data type - usually referred to as an *un*-ordered list. They are
a collection of key-value pairs.

What kinds of things in the world fit into an array? What kinds of things fit into key-value pairs?

Things to consider:

- Books in a Library
- Menu items at a fast food restaurant
- Definitions in a dictionary
- List of students in WDI
- List of all GA courses ordered by city

#### Bonus Thoughts!

What kinds of things in the world would fit into an array of objects? What about an object containing arrays?

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

---

## Sample Quiz Questions:

1. What is the difference between a method and an attribute?
