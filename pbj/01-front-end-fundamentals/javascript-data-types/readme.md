function, form, behavior

# LEARNING OBJECTIVES
- Describe the role Javascript plays alongside HTML and CSS.
- Explore Javascript as the "programming language of the web".
- Set up and use Node to run Javascript on the command line.
- List and describe the primitive data types.
- Describe data structures and use arrays to store data types.
- Practice proper JS syntax and semantic variable naming.
- Explain the role memory allocation plays in storing data types as variables.

# HTML, CSS and Javascript (20min)
HTML (content), CSS (style) and Javascript (behavior) as the pillars of web development.

Think-Pair-Share: students identify Javascript features in the Facebook news feed.
- 5 minutes: individual research.
- 5 minutes: discuss and compare findings in pairs.
- Think about...
  - What functionality the site has after it has loaded.
  - What categories you could group some of these features under.
- Q's for students
  - Why would you say that's a Javascript feature?

Exercise result categories
- Interactivity
  - Click something, something happens.
    - Like: increment Like counter.
    - Comment: submit comment, appended to post.
- Communication with a server
  - Interactions saved and immediately viewable by other users.

Post-Exercise: Turn off browser Javascript and reload Facebook.
- Chrome > Preferences > Content Settings > Javascript > "Do not allow..."
- What functionality has changed? Been removed?

# JS: The Programming Language of the Web (5min)
Javascript is considered to be THE "programming language of the web."

Before we dive into "Why?", let's first answer: what is a programming language?
- Q: What are the classes thoughts?
  - Especially when compared to a markup language like HTML.
- Lets us do things! Act on information.
- Javascript enables us to do all that in a browser.
  - Using the tools you learned in the pre-work (e.g., data types, loops, functions).

Why is it the dominant programming language of the web?
- Not because it's "the best." It has its problems...
  - Some say it's messy -- a lot of syntax! -- compared to other languages like Ruby and Python.
  - Slow in its initial form.
- Gradual rise in popularity
  - Created in 1995 by Brendan Eich (in only 10 days!) for the Netscape browser.
  - Was considered to be inferior to established languages like Java.
  - Embraced by Google. Made JS faster through Chrome's V8 virtual machine. Use AJAX in major web apps like Gmail and Maps.
  - Rise of frameworks and libraries like Angular and Backbone make it easier to create apps.
- Now it's used by nearly every website.
  - Cross-browser support.
  - Doesn't require any additional software to run in the browser.

# NODE (5min)
What is it?
- Javascript runtime environment.
- Allows us to run Javascript code on our computers.

Installation
- Command line:   `$ brew install node`
- Not working? Follow along with [REPL.it](http://www.repl.it).

Uses
- REPL
  - “Read-Eval-Print Loop”.
  - Run Javascript code one line at a time.
  - Command line:   `$ node`
- Run entire Javascript files.
  - Command line:   `$ node FILENAME`

# Primitive Data Types

## Intro (5min)
Primitive data types are the building blocks of Javascript.
- Whenever you do anything in Javascript, you are creating and changing these basic pieces of information.

There are five primitive data types. ST-wg: What are they?
  1. Numbers
  2. Strings
  3. Booleans
  4. Undefined
  5. Null

We store data types in variables.
- Format: `var NAME = DATA;`

  ```javascript
  // For example...
  var myClass = "WDI6";

  // After instantiation you can then reference variables by just their name, without "var".
  myClass;
  => "WDI6"

  // Variables can not only store single data types but also expressions.
  var multiplication = 5 * 2;
  => 10
  ```

- Javascript is a "dynamic" or "untyped" language, meaning a variable can switch between data types.

  ```javascript
  // This change is valid in Javascript.
  var myFavoriteNumber = 5;
  var myFavoriteNumber = "five";
  ```

## Numbers (5min)

In Javascript, numbers are numerical values -- straightforward!
  - All numbers are of type "number," regardless of format (e.g., integer, float/decimal).

  ```javascript
  // The "typeof" operator returns the data type of a value
  typeof 5;
  => "number"

  typeof 5.5;
  => "number"
  ```

Operations
- Math in Javascript follows the same rules you've known since elementary school math.
- Basic operators: `+, -, *, /`

  ```javascript
  // Addition
  10 + 2;
  => 12

  // Subtraction
  10 - 2;
  => 8

  // Multiplication
  10 * 2;
  => 20

  // Division
  10 / 2;
  => 5
  ```

- Order of precedence: P(E)MDAS (Parentheses, Multiplication, Division, Addition, Subtraction)

  ```javascript
  // This would be interpreted as...
  // Go through step by step with class.
  ( 4 + 2 ) * ( 12 / 3 );
  => 6 * 4
  => 24

  // How would this be interpreted?
  // Like operators are processed from left-to-right. In this case, division happens before multiplication.
  ( 8 / 4 * 2 ) + 1
  => ( 2 * 2 ) + 1
  => 5
  ```

- % (Modulus)
  - Returns the remainder of a division operation.

    ```javascript
    // What is the remainder of 12 / 5?
    12 % 5;
    => 2
    ```

  - Q: Modulus has a pretty handy use case. Anybody know what it is?
    - Use it to check if a number is _____.
    - Often used as a check for evenness: `NUMBER % 2`

      ```javascript
      // Returns 0 if even.
      4 % 2;
      => 0

      // Returns 1 if odd.
      5 % 2;
      => 1
      ```

The Math object
- Javascript also comes with a library of more complex math operations as part of the Math object.
- Syntax: `Math.operationName();`
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

NaN ("Not a number")
- A special number...that's not a number?
  - Technically, its data type is "number."

    ```javascript
    typeof NaN
    => "number"
    ```

  - You usually get NaN when the result of a math operation is not real (e.g., dividing by zero, square root of a negative number, weird math).

    ```javascript
    5/0;
    => NaN
    ```

- You can test whether a value is a valid number using the `isNaN()` function.

    ```javascript
    // isNaN returns false if used on a valid number.
    var myFavoriteNumber = 5;
    isNaN( myFavoriteNumber );
    => false
    ```

## Strings (5min)
String literals

  ```javascript
  // Can use single quotes to instantiate a string...
  var greeting = 'Hello!';

  /// ...or double quotes.
  var greeting = "Hi there!";
  ```  

Escape sequences
- Sometimes you will need to use special characters or formatting in strings that can't be entered the same way as you would in a word processor. In these cases, you use "escape sequences".
- Syntax: backslash + letter (e.g., `"\n"`).
- Examples:

  ```javascript
  // "\n" = new line
  "Hello\nGoodbye"
  =>"Hello"
  =>"Goodbye"

  // "\t" = tab
  "\tOnce upon a time..."
  => "     Once upon a time..."
  ```

- More examples [here](http://www.javascriptkit.com/jsref/escapesequence.shtml).  

Concatenation
- Like numbers, you can add strings together using `+`.

  ```javascript
  var city = "Washington, ";
  var state = "DC";
  var location = city + state;
  => "Washington, DC"
  ```

- You can't, however, use other math operators on strings.

  ```javascript
  // Q: What do you think happens when we try to subtract strings from each other?
  // When using the "-" operator, the operands are treated as numbers.
  "hamburger" - "ham"
  => NaN

  // The same goes for multiplication and division.
  "hamburger" * 3
  => NaN
  ```

String methods
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

- More examples [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

## Booleans (5min)
Two values: `true`, `false`.  

Oftentimes you'll be producing boolean values when making comparisons or logical operations
- Comparison operators: `==`, `===`, `<`, `>`, `<=`, `>=`

  ```javascript
  1 === 1
  => true

  1 === 2
  => false

  // Does anybody know the difference between === and ==?
  1 == "1"
  => true
  ```

- Logical operators: `&&`, `||`, `!`
  - Not going to focus on these too much right now since you'll be using them more this week during your conditionals class.

## Undefined & Null (5min)
Values that indicate the lack of a meaningful value.
- Anybody else find that weird? How is there more than one data type for nothing?
- Q: What's the difference?

Undefined: automatically applied to a variable with no value.  

  ```javascript
  // A primitive data type of type undefined with only one value: "undefined".
  typeof undefined;
  => "undefined"

  // Any property that has not been assigned a value is "undefined".
  var nothing;
  => undefined

  // A function with no defined return value has a return value of "undefined".

  // You won't find yourself assigning "undefined" to a value. That's where "null" comes in.
  var nothing = undefined;
  ```

Null: an explicitly-assigned non-value.
  - Javascript will never set anything to `null` by itself. `null` only appears when you tell it to.
  - Can you imagine a situation where that would be useful?


So the main difference between `undefined` and `null` is intention. Other than that, they're pretty similar.

### Type Coercion
Javascript will try to make sense of any strange operations you throw at it.
- By "strange", I mean subtracting a number from a string, or multiplying `null` by 100.
- It does this through something called "type coercion" -- converting data types.

You might encounter this when dealing with numerical values but for whatever reason some of them are in string form.
  - Q: Have students guess what the results of the following code examples are...

  ```javascript
  // In some cases Javascript is helpful and converts strings to numbers in the correct way.
  "3" - "2"
  => 1

  // ...but sometimes it doesn't. In this example, the + operator acts as if it's concatenating two strings.
  "3" + "2"
  => 32

  // And this?
  "five" * 5;
  => NaN
  ```

When in doubt, convert data types that should be numbers using `parseInt()`.

```javascript
// parseInt converts a string to a number value, if available.
parseInt( "3" );
=> 3

parseInt( "burrito" );
=> NaN
```

There are other examples of type coercion, but the point here isn't to remember them all. Just be aware that sometimes Javascript will fire weird results back at you with no explanation. Sometimes, type coercion might be the culprit.

# BREAK (10min)

# CODING EXERCISE #1 (20min)
Temperature conversion: [https://github.com/ga-dc/temperature_converter](https://github.com/ga-dc/temperature_converter)  

# Data Structures / Composite Data Types

## Arrays (15min)
Why do we use arrays?  
- Store multiple values in a single data collection.
- Ordered collection of related data types.
- Organized by index.
  - Indexing begins at 0 (e.g., first element in an array has an index of 0, the second has an index of 1, and so on).

How to instantiate an array and access its values.  

  ```javascript
  // Instantiate.
  var mountRushmore = [ "Washington", "Jefferson", "Roosevelt", "Lincoln" ];

  // Can also instantiate like this...
  var mountRushmore = new Array( "Washington", "Jefferson", "Roosevelt", "Lincoln" );

  // Access the first, second and third element of the array.
  mountRushmore[0];
  => "Washington"
  mountRushmore[1];
  => "Jefferson"
  mountRushmore[2];
  => "Roosevelt"

  // You can also place arrays within arrays.
  var letters = [ ["a","b","c"], ["d","e","f"], ["g","h","i"] ];

  // How would I go about accessing the letter "f" in the above array?
  letters[1][2];
  => "f"
  ```

Array methods
- There are a lot of useful methods that come with Javascript we can use to inspect and modify arrays. To learn what some of them are...

Exercise: Given the array `var planeteers = [ "Looting", "Wind", "Fire", "Water", "Heart", "Polluting" ]`, use MDN documentation to find methods that accomplish the following...
- Returns the length of the array.
- Returns the position of "Water".
- Removes "Polluting" from the end of the array.
- Removes "Looting" from the front of the array.
- Adds `"Earth"` to the front of the array.
- Reverses the array order.

- Good way to familiarize yourselves with the Mozilla Developer Network's javascript documentation, a go-to source when looking up anything Javascript-related.
  - [MDN Array Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)



Students find useful array methods on MDN based on question prompts.
- 5 minutes: individual research
- Examples: push/pop, shift/unshift, length.

## Objects (5min)
Why use objects?
- Store multiple values in a single data collection.
- Stored according to key-value pairs, not any particular order.

  ```javascript
  var pizza = {
    slices: 8,
    size: "large",
    toppings: [ "cheese", "pepperoni" ],
    crust: "stuffed"
  };
  ```

- Will go into these in-depth later this week.

# Syntax & Variables

## Syntax (5min)
Variable syntax
- Should be named using camelCase lettering.
  - First letter of first word lowercase. First letter of remaining words uppercase.
  - No spaces or punctuation between words.

  ```javascript
  // camelCase
  var pizzaTopping = "pepperoni";
  ```

Semicolons
- General practice is to end every line with a semi-colon.
- Usage depends on the developer.

Comments
- Q: Why would you use comments?
  - Talked about this in the HTML class. Same reasoning applies.
- Types of comments
  ```javascript
  // Single line

  /*
    Multiple
    line
    comments
  */
  ```

- Use to explain the purpose or reasoning behind a chunk of code.
- Help out other developers and future you.
  - If anything, it will help us out when grading your projects!

## Semantic Naming (5min)
Q: Which of these would you say is the best named variable? Why?

```javascript
var x = 5;
var red = "red";
var myFavoriteAnimal = "jackalope";
```

Semantic: "the purpose of text beyond its definition"  
- Thanks Robin!

The purpose of a variable needs to be evident in the name.
- Nope: `var x = 5;`
- Yup: `var myFavoriteNumber = 5;`
The name of a variable cannot be tied to a particular value. What if it changes?
- Nope: `var red = "red"`
- Yup: `backgroundColor = "red"`
Sounds simple, but so many people don't follow this simple rule.

## Memory Allocation (5min)
Use diagram of memory allocation (either whiteboard or slide) to demonstrate...
- What happens in memory when you create a variable?
- What happens when you direct a variable to a new memory location?
- What happens to a memory location with no variable pointing to it?

# BREAK (10min)

# CODING EXERCISE #2 (20min)

# Homework

[https://github.com/ga-dc/js-basics-hw](https://github.com/ga-dc/js-basics-hw)

# Sample Quiz Questions
1. When would you use an array over an object? And vice-versa?
2. What is the difference between `undefined` and `null`?
3. Provide an example of a semantically-named variable. Explain your choice.
