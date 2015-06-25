# LEARNING OBJECTIVES
- Describe the role Javascript (JS) plays alongside HTML and CSS.
- Define JS as a programming language.
- Set up and use Node to manipulate JS data types.
- List JS data types and how each is used.
- Describe composite data types and use arrays and objects to store data types.
- Practice proper JS syntax and semantic variable naming.
- Explain what a variable is and the role memory allocation plays in storing data types.

# HTML, CSS and Javascript (20min)
- HTML (content), CSS (style) and Javascript (behavior) as the pillars of web development
- Think-Pair-Share: students identify Javascript features in the Facebook news feed.
  - 5 minute individual
  - 5 minute pair discussion
  - Think about what functionality the site has after it has loaded.
  - Optional: Make it interesting and turn off Javascript in your browser.
    - Chrome > Preferences > Content Settings > Javascript > "Do not allow..."
    - What works differently? What doesn't work?

# JS as a Programming Language (5min)
- What is a programming language?
  - Allows us to transform data.
  - With a programming language, we can create a program that, given an input, produces a desired output.
  - Compared to a "markup" or "stylesheet" language, which define the presentation and styling of data on the web.
  - [MORE]
- What features does Javascript have?
  - Can run on both the client (browser) and server.
  - Supported by every browser.
- Question: what tools are part of our JS toolbox?
  - Opportunity for students to list off prework components (e.g., data types, loops, conditionals)

# NODE (5min)
- What is it?
  - Javascript runtime environment.
  - Runs JS code on our computer (among other things).

- Installation
  - Command line:   `$ brew install node`
  - Not working? Follow along with [REPL.it](http://www.repl.it).

- Uses
  - REPL
    - “Read-Eval-Print Loop”.
    - Run JS code one line at a time.
    - Command line:   `$ node`
  - Run entire JS files.
    - Command line:   `$ node FILENAME`

# Primitive Data Types
- Basic building blocks of Javascript.
- Five primitive data types.
  1. Numbers
  2. Strings
  3. Booleans
  4. Undefined
  5. Null
- We usually save data types of all kinds, primitive and otherwise, to variables.
```javascript
// For example...
var myClass = "WDI6";
```

## Numbers (5min)
- No distinction between integers and floats
  ```javascript
  typeof 5
  => "number"

  typeof 5.5
  => "number"
  ```
- Operators and order of operations
  - `+, -, *, /`
  - P.E.M.D.A.S. (Parentheses, Exponents, Multiplication, Division, Addition, Subtraction)
  - % (Modulo)
    - Returns the remainder of a division operation
    ```javascript
    // What is the remainder of 12 / 5?
    12 % 5
    => 2
    ```
    - Often used as a check for evenness: `NUMBER % 2`
    ```javascript
    // Returns 0 if even
    4 % 2
    => 0

    // Returns 1 if odd
    5 % 2
    => 1
    ```
- The Math object
  - There are number of useful, more complex math operations available to us as part of the Math object
  - Example:
  ```javascript
  // Generates a random decimal between 0 and 1.
  Math.random();
  ```
  - Other useful functions...
    - [ADD]
    - Visit (MDN)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math] to see more.
- NaN

## Strings (5min)
- String literals
    ```javascript
    // Can use single quotes to instantiate a string...
    var greeting = 'Hello!';

    /// ...or double quotes.
    var greeting = "Hi there!";
    ```
- Escape sequences
  - [ADD]
- Concatenation
  - You can join strings using the `+` operator.
      ```javascript
      var city = "Washington, ";
      var state = "DC";
      var location = city + state;
      // => "Washington, DC"
      ```
  - You can't use other math operators on strings.
    - [ADD]
- Methods: substring, slice, toUpperCase, etc.
  - [ADD]

## Booleans (5min)
- True, False
- Comparisons (==, ===, <, >)
  - Briefly mention these are used in conditionals

## Undefined & Null (5min)
- Undefined: automatically applied to a variable with no value
- Null: an explicitly-assigned non-value

# BREAK (10min)

# CODING EXERCISE #1 (15min)
- Temperature conversion

# Composite Data Types

## Arrays (15min)
// include why we use arrays, what advantages does an ordered collection provide
- Ordered collection of data types.
- How to instantiate and access an array.
- Exercise: students identify useful array methods on MDN and familiarize themselves with JS documentation.
  - 5 minute individual research
- Useful methods: push/pop, shift/unshift, etc.

## Objects (5min)
- Unordered, key-value based collections.
- Only a brief mention since they'll be covered on Thursday.

# Variables

## Syntax (5min)
- camelCase
- semicolons
- // Comments

## Semantic Naming (5min)
- The purpose of a variable needs to be evident in the name
  - Nope: var x = 5;
  - Yup: var myFavoriteNumber = 5;

## Memory Allocation (5min)
- Use diagram of memory allocation (either whiteboard or slide) to demonstrate...
  - What happens in memory when you create a variable?
  - What happens when you direct a variable to a new memory location?
  - What happens to a memory location with no variable pointing to it?

# BREAK (10min)

# CODING EXERCISE #2 (15min)
- ???
