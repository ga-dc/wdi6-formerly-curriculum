# Functions and Objects

## Learning Objectives

### Functions
- Describe a JavaScript function
- Write a function in JavaScript using a declaration and an expression
- Recognize the parts of both
- Explain arguments (introduce scope)
- Compare and contrast the two (explain hoisting)
- Distinguish referencing and invocation
- State the difference between Output and Side Effects
- Show why functions are important and give an example

### Objects
- Discuss datatypes (simple datatypes vs. collections)
- Define an object literal (empty and populated)
- Compare and contrast objects and arrays
- Identify and differentiate two modes of element retrieval
- Compare retrieval and updating of properties
- Explain property deletion (contrast array)
- Introduce namespace
- Use functions as properties (methods)
- Use nested data structures


## Functions

[Check-in] How do we feel about functions?

### What

What is a function?

1. In math
2. In programming (Turn and talk about prework)
3. Define (Stop and Jot)

### How

#### Function declaration

``` javascript
function square(number) {
  return number * number;
}
```

#### Function expression

``` javascript
var square = function (number) {
  return number * number;
}
```

#### Recognize the parts of both

TODO: diagram here

[Fist to five]

#### Arguments

``` javascript
var sameStrings = function (string1, string2) {
  return string1 === string2;
}

var sameThreeStrings = function (string1, string2, string3) {
  return string1 === string2 && string2 === string3;
}
```

[Think pair share]
- Identify parts of function in code example
- Explain flow of application (node repl)


#### Hoisting

code example

[Fist to five]

#### Invocation vs referencing

code example


#### Output vs Side Effects

[Turn and talk] what does the return statement do?

code example

### Why

Show why functions are important and giving an example
'An idea should be represented at exactly one point in code'

maybe code example

[Whip around] - functions of popular web apps

## BREAK (10 min)

## Objects

[Check-in] How do we feel about objects?

### What

#### Simple datatypes

- number
- string
- booleans

#### Collections

- arrays
  - index
  - values
- objects
  - keys
  - values

[F2F] once for arrays and once for objects

### How

#### Define an object literal

code example

#### Read

- [] notation
- . notation

#### Update/Create

code example

#### Delete

code example

#### Why

code example introducing namespace and properties

#### Values can be of any datatype

- Nested data structures
- Methods
