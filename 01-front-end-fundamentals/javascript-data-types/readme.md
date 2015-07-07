# LEARNING OBJECTIVES
- Describe the role Javascript plays alongside HTML and CSS.
- Discuss Javascript as the "programming language of the web".
- Set up and use Node to run Javascript on the command line.
- List and describe the primitive data types.
- Describe uses of mathematical operators in Javascript.
- Define type coercion.
- Describe data structures and use arrays to store data types.
- Practice proper JS syntax and semantic variable naming.

# HTML, CSS and Javascript (20min)
HTML (content), CSS (style) and Javascript (behavior) as the main components of front-end web development.
- Q: Sum up the roles HTML and CSS play on a website in a couple of sentences.
  - HTML: Structure
  - CSS: Styling
  - JS: ???

Think-Pair-Share: students identify Javascript features in the Facebook news feed.
- 3 minutes: individual research.
- 3 minutes: discuss and compare findings in pairs.
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
  - Javascript defines what happens on a page depending on how you interact with it.
- No Refreshes / User Experience
  - When I comment on a post, Facebook is able to process my new comment and render it on the page without refreshing the entire page.
  - Gives the page a much smoother user experience compared to a static page that doesn't have this sort of functionality.
- Communication with a server
  - Javascript is somehow telling a server that (a) a user has done something, (b) save that interaction and (c) display the results of that interaction to all other users.
- Not an exhaustive list of Javascript properties, but we'll go over these and more in more detail later on in the course.

So, to the main three components of front-end web development up in one word each...
- HTML: Structure
- CSS: Styling
- Javascript: Behavior

# JS: The Programming Language of the Web (5min)
Javascript is considered to be THE "programming language of the web."

Before we dive into why that's the case, let's look at the first part of that statement...
- ST-wg: What's a programming language?
  - What can it do that a markup language like HTML can't?
  - It let's us do things! It lets us act on information, manipulate it, display it, pretty much whatever we want.
- Javascript enables us to do all that in a browser.
  - Using the tools you learned in the pre-work (e.g., data types, loops, functions).

Why is it the dominant programming language of the web?
- Barriers to entry for learning Javascript are very low.
  - No additional software required to run it. Just a text editor and a browser.
    - You can even run it directly in the browser via its Javascript console.
      - Ex. Hide images on the GA website.
      - You'll learn more about the browser Javascript console when you start adding Javascript to the websites you make in this class.
- On top of that, it's supported by all web browsers.
- Javascript has evolved since its creation.
  - One of the biggest additions to JS was AJAX, which allows use to reload parts of a page without refreshing the entire thing (just like on Facebook). Big implications for User Experience.
- A lot of frameworks and libraries -- like Backbone and jQuery -- have emerged that enable us to do so much more -- and do it quickly -- with Javascript.
- It's not the best. It has its problems...
  - Some say it's messy. Uses a lot of syntax compared to other languages like Ruby and Python.
  - Slow in its initial form.
- Nevertheless, Javascript is used by nearly every site on the web, so we might as well learn to utilize it.

# NODE (5min)
What is it?
- Javascript runtime environment.
- Allows us to run Javascript code on our computers.

Installation
- Command line:   `$ brew install node`
- Take a minute or two to install. Raise your hand if you run into any issues.

Uses
- REPL
  - “Read-Eval-Print Loop”.
  - Programming environment that lets us run Javascript code one line at a time.
  - What does it do?
    1. (R)eads our code.
    2. (E)valuates it.
    3. (P)rints it to the console.
    4. Then it (L)oops back to the beginning, ready to (R)ead the next line of code we feed it.
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

## Numbers (10min)

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

  - Q: Modulus has a pretty handy use case: to check if a number is even.
    - A number is even if it is divisible by 2.
    - Check if a number is even: `NUMBER % 2`
      - What should this return?

      ```javascript
      // Returns 0 if even.
      4 % 2;
      => 0

      // Returns 1 if odd.
      5 % 2;
      => 1
      ```

NaN ("Not a number")
- A special number...that's not a number?

    ```javascript
    typeof NaN
    => "number"
    ```

  - You usually get NaN when the result of a math operation is not real (e.g., dividing 0 by 0, multiplying strings together).

    ```javascript
    0/0;
    => NaN
    ```

- You can test whether a value is a valid number using the `isNaN()` function.

    ```javascript
    // isNaN returns false if used on a valid number.
    var myFavoriteNumber = 5;
    isNaN( myFavoriteNumber );
    => false
    ```

## Strings (10min)
Strings are words in javascript!

We instantiate strings using the "string literal" form.

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
  // String indexes are 0-based, so the index of a string's first character is 0.
  var greetings = "Hi there Andy!";
  greetings.search( "Andy" );
  => 9

  // .slice(): return and store a portion of a string.
  var greetings = "Hi there Andy!";
  var buddy = greetings.slice( 9, 13 );
  => "Andy"
  ```

- More examples [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
  - Slack to class.

## Booleans (5min)
Two values: `true`, `false`.  

Oftentimes you'll be producing boolean values when comparing two values
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
  - If I'm not mistaken, the only thing that's inherently `null` in Javascript is `null` itself!
  - Can you imagine a situation where that would be useful?
    - Placeholder for a variable that you know will be replaced with an actual value later on.


So the main difference between `undefined` and `null` is intention. Other than that, they're both...nothing.

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

# CODING EXERCISE #1 (30min)
Temperature conversion (Part I): [https://github.com/ga-dc/temperature_converter](https://github.com/ga-dc/temperature_converter)  
- Get started by forking and cloning this exercise repo. Raise your hand if you run into any problems.
- Spend 10 minutes working on Steps 1-3 under the Instructions.
- After check-in, spend 10 more minutes on Step 4.

# Composite Data Types

Composite data types are collections that allow us to store multiple data types.
- There are two kinds in Javascript. What are they?

## Arrays (15min)
- Ordered collection of related data types.
- Organized by index.
  - Indexing begins at 0 (e.g., first element in an array has an index of 0, the second has an index of 1, and so on).

There are two ways to instantiate an array...  

  ```javascript
  // Instantiate with an array literal.
  var mountRushmore = [ "Washington", "Jefferson", "Roosevelt", "Lincoln" ];

  // Can also instantiate using the Array constructor.
  var mountRushmore = new Array( "Washington", "Jefferson", "Roosevelt", "Lincoln" );

  // Be careful when using the Array constructor. If you feed it a single numerical value, it will create an empty array of that length.
  var numbers = new Array( 5 );
  => [ , , , , ]

  // ...but if you feed it anything else, it will create a single-value array.
  var animals = new Array( "dog" );
  => [ "dog" ]
  ```

Accessing array values...  

  ```javascript
  // Indexing begins at 0.
  // How do I access the first, second and third elements of the array?
  mountRushmore[0];
  => "Washington"
  mountRushmore[1];
  => "Jefferson"
  mountRushmore[2];
  => "Roosevelt"

  // You can also place arrays within arrays.
  var letters = [ ["a","b","c"], ["d","e","f"], ["g","h","i"] ];

  // How would I go about accessing the letter "f" in the above array? Walk me through it.
  letters[1][2];
  => "f"
  ```

Array methods
- There are a lot of useful methods that come with Javascript we can use to inspect and modify arrays. To learn what some of them are...

### Pair Exercise (5min)

Given the array `var planeteers = [ "Looting", "Wind", "Fire", "Water", "Heart", "Polluting" ]`, use MDN documentation to find methods that accomplish the following...
- Returns the length of the array.
- Returns the position of "Water".
- Removes "Polluting" from the end of the array.
- Removes "Looting" from the front of the array.
- Adds `"Earth"` to the front of the array.
- Reverses the array order.

- This exercise is a good way to familiarize yourselves with the Mozilla Developer Network's javascript documentation, a go-to source when looking up anything Javascript-related.
  - [MDN Array Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  - Navigating documentation is a great skill to have. Some sets of documentation are harder to navigate than others, but if you have a sense of how to dig through a massive trove of information like MDN or RubyDocs, you'll become a much more efficient programmer.

## Objects (5min)
The other composite data type
- Like arrays, can store multiple values in a single data collection.
- Unordered collection whose collections are stored as key-value pairs.

- Example:

  ```javascript
  var teacher = {
    name: "Adrian",
    age: 101,
    class: "WDI6",
    city: "Washington"
  }
  ```

- Let's make one together...
  - Using all the data types we've gone over so far (except for `undefined` and `null`)

  ```javascript
  // Help me make a pizza object. What data types should I use?
  var pizza = {
    slices: 8,
    size: "large",
    toppings: [ "cheese", "pepperoni" ],
    crust: "stuffed"
  };
  ```

- Why would you use an object over an array?
- Will go into these in-depth later this week.

# Syntax & Semantic Naming

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

- Use to explain the purpose or reasoning behind a piece of code.
- Help out other developers and future you.
  - If anything, it will help us out when grading your projects!

## Semantic Variable Naming (5min)
Q: Take a moment to look at the following variables. Rank them from lowest to highest according to how well you think each one is named.

```javascript
var x = 5;
var red = "red";
var myFavoriteAnimal = "jackalope";
```

The purpose of a variable needs to be evident in the name.
- Nope: `var x = 5;`
- Yup: `var myFavoriteNumber = 5;`  

The name of a variable cannot be tied to a particular value. What if it changes?
- Nope: `var red = "red"`
- Yup: `backgroundColor = "red"`  

# BREAK (10min)

# CODING EXERCISE #2 (20min)

Temperature conversion (Part II): [https://github.com/ga-dc/temperature_converter](https://github.com/ga-dc/temperature_converter)  

# Closing

1. What role does Javascript play on a website?
2. What are the five primitive data types?
3. What are the two composite data types? When would you use each?
4. What is an example of type coercion?
5. What is an example of a semantically-named variable?

# Homework

[https://github.com/ga-dc/js-basics-hw](https://github.com/ga-dc/js-basics-hw)

# Sample Quiz Questions
1. When would you use an array over an object? And vice-versa?
2. What is the difference between `undefined` and `null`?
3. Provide an example of a semantically-named variable. Explain your choice.
