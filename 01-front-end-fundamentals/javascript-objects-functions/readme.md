# Objects and Functions

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

### Function declaration

``` javascript
function square(number) {
  return number * number;
}
```

### Function expression

``` javascript
var square = function (number) {
  return number * number;
}
```

### Recognize the parts

TODO: diagram here

[Fist to five]

### Understand the difference

The difference is subtle, but important. The first function declaration is assigning an "anonymous" function to a variable.
The second function declaration is a named function. The practical difference is:

>Named functions are processed before any code is executed, meaning you can call functions before they are declared. This behavior is known as **hoisting**.

#### Arguments

JavaScript is flexible (i.e. it let's you do what you want) and this flexibility while empowering can also make debugging (i.e. tracking down the root of errors in your code) very difficult. A great example of this is in JavaScript's expectations of arguments.

```js
// define a function which takes two arguments
var areEqual = function (a, b) {
  return a === b;
}
// call function with two equal arguments
areEqual('cat', 'cat');
// returns true as expected
areEqual(1, 2);
// returns false as expected
areEqual(1);
// returns false... why?
areEqual();
// returns true... wat?

```
What is going on here?

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
