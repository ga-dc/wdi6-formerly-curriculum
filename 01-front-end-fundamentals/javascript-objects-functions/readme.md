# Objects and Functions

## Learning Objectives (5 / 5)

### Objects
- Compare objects and key-value stores to arrays as data structures.
- Explain the difference between object properties and methods.
- Create objects using object literal syntax.
- Compare adding and retrieving properties to objects using dot and bracket notation.
- Use `delete`.
- Iterate over the keys of an object to return and manipulate values.
- Explain nested data structures.
- Write an object method.

### Functions
- Describe what a JavaScript function is.
- Recognize the parts of a function.
- Write a function in JavaScript using a declaration and an expression.
- Define hoisting.
- Differentiate between referencing and invoking a function.
- State the difference between a function's output and side effects.

### What have you learned so far in Javascript?

* Data Types
* Data Collections
* Conditionals

## Arrays Review (5 / 10)

Arrays are a complex data type - usually referred to as an ordered list.

**How do we retrieve elements from an array?**

Using an index.

## Objects (5 / 15)

```js
var car = {
  make: "Honda",
  model: "Civic",
  year: 1997
}
```

Objects too are a complex data type - usually referred to as an *unordered* list (or dictionary/hash/map).
* They are a collection of key-value pairs called properties.
* The keys which we explicitly state when defining a property are analogous to our array indexes. They are how we access the associated value (more below).


### Turn and Talk: Real-Life Data Collections (10 / 25)

Would you reorganize the below real-life examples into an array, object or both? Spend **5 minutes** discussing them with a partner.

1. Books in a Library
2. Menu items at a fast food restaurant
3. Definitions in a dictionary
4. List of students in WDI
5. List of all GA courses ordered by city

### Interacting with Objects (10 / 35)

#### Create

We already saved a sample object to a `car` variable. We did this using **object literal notation**.

```js
var car = {
  make: "Honda",
  model: "Civic",
  year: 1997

  // NOTE: Keys with a "-" in their name must be surrounded by quotation marks.
  "tire-type": "Goodyear"
}
```

#### Read

To access object properties, we use either dot (`.property`) or bracket (`["property"]`) notation.

```js
console.log( car.make );
console.log( car["make"] );

// NOTE: When accessing properties whose keys have a "-" in them, you must use bracket notation.
console.log( car["tire-type"] );
```

#### Update

To update an object property, we place it on the left side of an assignment statement.

```js
car.year = 2003
```

We can also create brand new properties for an object after it's initialized using this method.

```js
// Now our car has a smell property equal to "Leathery Boot". We did not initially declare this property.
car.smell = "Leathery Boot"
```

#### Delete

If you want to delete an object property entirely, use the `delete` keyword.
* This deletes the whole key-value pair, not just the value.
* You won't do this often.

```js
delete car.smell
```

#### Iterating

Like arrays, you can use a loop to iterate through an object. Say we want to print out all of an object's keys...

```js
// Iterate through object keys
for (attribute in car) {
  console.log( attribute );
}
```
> Knowing this, how could we go about getting all the values in an object?

Javascript objects also have native methods that take care of this for us...
```js
// .keys()
Object.keys( car );

// .getOwnPropertyNames()
Object.getOwnPropertyNames( car );
```

### Nested Collections (5 / 40)

Object properties aren't limited to simple data types. We can also nest collections inside of collections.

```js
var car = {
  make: "Honda",
  model: "Civic",
  year: 1997,

  // An array within an object.
  gears: ["Reverse", "Neutral", "1", "2", "3", "4"],

  // An object within an object.
  engine: {
    horsepower: "6 horses",
    pistons: 12,
    fast: true,
    furious: false
  }
}
```

In the above examples, how do we access...
* "Neutral" (i.e., array value within an object).
* "6 horses" (i.e., object value within an object).

### You Do: Model WDI Student (5 / 45)

Create a variable named `wdiStudent` and assign it to an object literal.
* Give your student at least three properties.
  * One must have a key that contains a hyphen.
  * One must contain an array or object.
* Update two properties, one of which is the hyphenated.
* Give your student a new property using dot or bracket notation.
* Delete one attribute.
* Iterate through and print out all of the student's key-value pairs.

### Break (10 / 55)

### You Do: Big Ol' Twitter Object (15 / 70)

As this course continues you will encounter plenty of Javascript objects in the wild. Spend **10 minutes** on the following...
* Follow the link below and answer the questions in bold.
* Along with each answer, write down how we would access the property in question.
* Let's do the first one together...

[Twitter JSON Exercise](https://github.com/ga-dc/big_ole_twitter_object)

## Functions

### Intro (5 / 75)

The content of an object isn't limited to properties. We can also give objects functionality in the form of **methods**.
* Before we do that, however, we should review functions.

What’s a function?
* A reusable block of Javascript code.
* Simply put, a function is a block of code that takes an input, process that input and then produces an output.
* Fundamental component of Javascript.
* Analogy: Quizno's Oven

### Recognize the parts (10 / 85)

#### Function Container

```js
function multiply(){

}
```

#### Input ("Arguments" or "Parameters")

```js
function multiply( num1, num2 ){

}
```
#### Output and Side Effects

```js
function multiply( num1, num2 ){
  console.log( num1 * num2 );
  return num1 * num2;
}
```
* Output: return value.
* Side Effects: e.g., print statements.

Q. Does a function need an input, output and/or side effects to work?
---

> A. Short answer. No.  Note: There is always an output (undefined). Discuss.

#### Calling and Referencing a Function (5 / 90)

We've defined a function. Now we need to call it...

```js
// Call the multiply function.
multiply( 2, 5 );

// What happens if we reference the function without parentheses?
multiply;
```

### Why do we use functions? (5 / 95)

Say we wanted the square of a number without using the above function. How would we do that?


Benefits of functions
* Reusability.
* DRYness.
* Naming convention (describes intent).

### Function Declarations and Expressions (5 / 100)

There are two ways to define or declare a function...

#### Declaration

``` javascript
function multiply( num1, num2 ) {
  return num1 * num2;
}
```

#### Expression

``` javascript
var multiply = function ( num1, num2 ) {
  return num1 * num2;
}
```

#### Declarations vs. Expressions

Both do the same thing and run the same chunk of code. But they are different.
* What differences do you notice?

**Function declarations** define functions without assigning them to variables.

**Function expressions** save anonymous functions to variables.

While we call/reference functions defined through declarations and expressions the same way, they do have a subtle but important difference...

> Declarations are processed before any code is executed, meaning you can call functions before they are declared. This behavior is known as **hoisting**.


### Hoisting (10 / 110)

What do you think will happen when we run the below code...
```js
multiply( 3, 5 );
var multiply = function( num1, num2 ){           // NOTE: This is a function expression
  return num1 * num2;
}
```

Surely the same thing will happen when we run the below code...

```js
multiply( 3, 5 );
function multiply( num1, num2 ) {               // NOTE: This is a function declaration
  return num1 * num2;
}
```
> We can successfully call the square function before declaring it. When our script file loads, it essentially processes all function declarations first, and then runs the rest of our Javascript from top to bottom.

Knowing this, what will happen each time we call `express` and `declare` in the below example?

```js
express();        // What happens when we run this function at this point in the code?
declare();        // What about now?        

var express = function() {
    console.log('Function expression called.');
};

express();        // ???
declare();        // ???

function declare() {
    console.log('Function declaration called.');
}
```

This is a neat feature, but can you think of a potential pitfall of "hoisting" too often?
* Code organization and readability.

## Methods (15 / 125)

Methods are functions that are attached to some object.

```js
// Our car now has a drive method...
var car = {
  make: "Honda",
  model: "Civic",
  color: "red",
  drive: function(){
    console.log("vroom vroom");
  },

  // Methods can take arguments
  gps: function( location ){
    console.log( "Beep boop, driving to " + location );
  }
}

// We can run the car's two methods like so...
car.drive();
car.paint( "blue" );
console.log( "Car color is: " + car.color );
```

With methods as part of our Javascript toolbox, we now have a cool interface with which we can interact with our objects.
* Why would custom methods be a preferred way to modify object properties vs. using object literal notation?

We've only scratched the surface for objects. We're going to dive much deeper into them later on in the course.

## Exercise + Homework: Calculator (15 / 140)

[Javascript Calculator](https://github.com/ga-dc/js-calculator)

## Closing, Q&A (10 / 150)

---

## Further Reading

* [Javascript Scoping and Hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html)
