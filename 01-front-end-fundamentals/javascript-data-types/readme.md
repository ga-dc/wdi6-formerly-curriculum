# TO DO
- Mini-assessment at end of each data type
  - Use Node to type our three quick questions each. Have them answered table by table.

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
  - Q's for responses
    - Why would you say that's a Javascript feature?
- Post-Exercise: Turn off browser Javascript and reload Facebook.
  - Chrome > Preferences > Content Settings > Javascript > "Do not allow..."
  - What functionality has changed? Been removed?

# JS: The Programming Language of the Web (5min)
- Q: What is a programming language?
    - ...compared to a markup language like HTML?
  - Lets us...
    - Act on information.
    - Control our computer.
    - Display data.
    - Transform data. Input in, output out!
    - ...and more!
  - [MORE]
- The Programming Language of the Web
  - It's not necessarily the best, but it's used by everybody.
  - Was not always popular...
    - Created in 1995 by Brendan Eich (in only 10 days!) for the Netscape browser.
  - Cross-browser support.
- Question: what tools are part of our JS toolbox?
  - Opportunity for students to list off prework components (e.g., data types, loops, conditionals)

# NODE (5min)
- What is it?
  - Javascript runtime environment.
  - Allows us to run Javascript code on our computers.

- Installation
  - Command line:   `$ brew install node`
  - Not working? Follow along with [REPL.it](http://www.repl.it).

- Uses
  - REPL
    - “Read-Eval-Print Loop”.
    - Run Javascript code one line at a time.
    - Command line:   `$ node`
  - Run entire Javascript files.
    - Command line:   `$ node FILENAME`

# Fundamental Data Types
- Basic building blocks of Javascript.
- Five fundamental data types.
  1. Numbers
  2. Strings
  3. Booleans
  4. Undefined
  5. Null
- We usually save data types of all kinds, primitive and otherwise, to variables.
```javascript
// For example...
var myClass = "WDI6";

// You can declare multiple variables at a time. Use "var" once, and separate each variable with a comma.
var myClass = "WDI6",
    myCity = "DC";
```

## Numbers (5min)
- No distinction between integers and floats
  ```javascript
  typeof 5;
  => "number"

  typeof 5.5;
  => "number"
  ```
- Operators and order of operations
  - `+, -, *, /`
  - P(E)MDAS (Parentheses, Exponents, Multiplication, Division, Addition, Subtraction)
  - % (Modulo)
    - Returns the remainder of a division operation
    ```javascript
    // What is the remainder of 12 / 5?
    12 % 5;
    => 2
    ```
    - Often used as a check for evenness: `NUMBER % 2`
    ```javascript
    // Returns 0 if even
    4 % 2;
    => 0

    // Returns 1 if odd
    5 % 2;
    => 1
    ```
- The Math object
  - There are number of useful, more complex math operations available to us as part of the Math object
  - Examples:
  ```javascript
  // Math.random(): Returns a random decimal between 0 and 1.
  Math.random();

  // Math.floor(n): Returns the largest integer less than or equal to a number.
  Math.floor( 3.14 )
  => 3

  // .random() and .floor() often used in tandem.
  // Returns a random whole number between 1 and 10.
  Math.floor(Math.random() * 10) + 1
  ```
  - See more @ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math).
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
  - Sometimes you will need to use special characters or formatting in strings that can't be entered the same way as you would in a word processor. In these cases, you use "escape sequences".
  - Examples:
  ```javascript
  // "\n" = new line
  "Hello\nGoodbye"
  =>"Hello"
  =>"Goodbye"

  // "\t" = tab
  "\tOnce upon a time..."
  =>"     Once upon a time..."
  ```
  - More examples [here](http://www.javascriptkit.com/jsref/escapesequence.shtml).
- Concatenation
  - Join strings using `+`.
  ```javascript
  var city = "Washington, ";
  var state = "DC";
  var location = city + state;
  // => "Washington, DC"
  ```
  - You can't use other math operators on strings.
  ```javascript
  // When using the "-" operator, the operands are treated as numbers.
  "hamburger" - "ham"
  => NaN

  // Same goes for multiplication and division.
  "hamburger" * 3
  => NaN
  ```
- String methods
  - Javascript comes with methods you can use to inspect and modify strings.
  - Examples:
  ```javascript
  // .search(): find the starting index of a string value.
  var greetings = "Hi there friend!";
  greetings.search( "friend" );
  => 9

  // .slice(): return and store a portion of a string.
  var greetings = "Hi there friend!";
  var buddy = greetings.slice( 9, 15 );
  => "friend"
  ```
  - More examples [here](http://www.w3schools.com/js/js_string_methods.asp).

### Math with Numbers & Strings
- Math can get weird when your numbers are in string form.
```javascript
// In some cases Javascript is helpful and converts strings to numbers in the correct way.
"3" - "2"
=> 1

// ...but sometimes it doesn't. In this example, the + operator acts as if it's concatenating two strings.
"3" + "2"
=> 32
```

- When in doubt, can convert data types that should be numbers using `parseInt()`.
```javascript
// parseInt converts a string to a number value, if available.
parseInt( "3" );
=> 3

parseInt( "burrito" );
=> NaN
```

## Booleans (5min)
- True, False
- Comparisons (==, ===, <, >)
  - Briefly mention these are used in conditionals

## Undefined & Null (5min)
- Undefined: automatically applied to a variable with no value
- Null: an explicitly-assigned non-value

# BREAK (10min)

# CODING EXERCISE #1 (20min)
- Temperature conversion

# Composite Data Types

## Arrays (15min)
// include why we use arrays, what advantages does an ordered collection provide
- Why do we use arrays?
  - Ordered collection of data types.
  - Organized by index.
- How to instantiate and access an array.
- Exercise: students identify useful array methods on MDN and familiarize themselves with JS documentation.
  - 5 minute individual research
- Useful methods: push/pop, shift/unshift, etc.

## Objects (5min)
- Unordered, key-value based collections.
- Only a brief mention since they'll be covered on Thursday.

# Syntax & Variables

## Syntax (5min)
- camelCase
- semicolons
  - General practice is to end ever line with a semi-colon.
  - Technically don't need them. Usage depends on the developer.
  - Rare cases where lack of semicolons will cause your code to fail.
    - [WHAT ARE THEY?]
- // Comments
  - [WHAT ARE GOOD COMMENTING PRACTICES?]
  - [WHAT ARE SOME GOOD EXAMPLES? BAD EXAMPLES?]
- (Mention indenting code? Not Javascript-specific but readability is key!)

## Semantic Naming (5min)
- Q: Which of these would you say is the best named variable? Why?
  ```javascript
  var x = 5;
  var red = "red";
  var myFavoriteAnimal = "jackalope";
  ```
- The purpose of a variable needs to be evident in the name.
  - Nope: `var x = 5;`
  - Yup: `var myFavoriteNumber = 5;`
- The name of a variable cannot be tied to a particular value. What if it changes?
  - Nope: `var red = "red"`
  - Yup: `backgroundColor = "red"`
- Sounds simple, but so many people don't follow this simple rule.

## Memory Allocation (5min)
- Use diagram of memory allocation (either whiteboard or slide) to demonstrate...
  - What happens in memory when you create a variable?
  - What happens when you direct a variable to a new memory location?
  - What happens to a memory location with no variable pointing to it?

# BREAK (10min)

# CODING EXERCISE #2 (20min)

# Homework

[https://github.com/ga-dc/js-basics-hw](https://github.com/ga-dc/js-basics-hw)
