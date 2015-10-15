# LEARNING OBJECTIVES
- Describe the role Javascript plays alongside HTML and CSS.
- List and describe the primitive data types.
- Describe uses of mathematical operators in Javascript.
- Define type coercion.
- Define and use complex data types.
- Explain the difference between `prompt` and `console.log`
- Practice proper JS syntax and semantic variable naming.
- Differentiate between true & false && truthy & falsey
- Describe why control flow is utilized in computer programming
- Write an if, else if, and else statement in JS
- Write a for loop and while loop in JS and differentiate between them
- Utilize loops to iterate through complex data types

# HTML, CSS and Javascript (20/20)
HTML (content), CSS (style) and Javascript (behavior) as the main components of front-end web development.
- Q: Sum up the roles HTML and CSS play on a website in a couple of sentences.
  - HTML: Structure
  - CSS: Styling
  - JS: ???

Think-Pair-Share: students identify Javascript features in Cookie Clicker.
- 3 minutes: Go look at it.
- 3 minutes: Discuss and compare findings in pairs.
- Think about what functionality the site has after it has loaded.
- Q's for students
  - Why would you say a particular feature is "run" by Javascript instead of, say, CSS?

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

# JS: The Client-Side Programming Language of the Web (5/25)

- Brief history: Created in 10 days by Brendan Eyck, of Mozilla. *Not* related to Java in any way but its name.
  - "Java" is to "Javascript" as "ham" is to "hamster"

- ST-wg: What's a programming language?
  - What can it do that a markup language like HTML can't?
  - It let's us do things! It lets us act on information, manipulate it, display it, pretty much whatever we want.
- Javascript enables us to do all that in a browser.
  - Using the tools you learned in the pre-work (e.g., data types, loops, functions).

## Why is it the dominant programming language of the web?
- Barriers to entry for learning Javascript are very low.
  - No additional software required to run it. Just a text editor and a browser.
    - You can even run it directly in the browser via its Javascript console.
      - Ex. Hide images on the GA website.
      - You'll learn more about the browser Javascript console when you start adding Javascript to the websites you make in this class.
- On top of that, it's supported by all web browsers.
- Javascript has evolved since its creation.
  - One of the biggest additions to JS was AJAX, which allows use to reload parts of a page without refreshing the entire thing (just like on Facebook). Big implications for User Experience.
- A lot of frameworks and libraries -- like Backbone and jQuery -- have emerged that enable us to do so much more -- and do it quickly -- with Javascript.

# Setting up our environment (5/30)

## First, create your HTML and JS

- `index.html` and `script.js`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Yo</title>
    <script src="script.js"></script>
  </head>
  <body>

  </body>
</html>
```

## Next, open the site in Chrome, and open the Dev Tools

- Command + Option + I
- The "Console" is a REPL
  - “Read-Eval-Print Loop”.
  - Programming environment that lets us run Javascript code one line at a time.
  - What does it do?
    1. (R)eads our code.
    2. (E)valuates it.
    3. (P)rints it to the console.
    4. Then it (L)oops back to the beginning, ready to (R)ead the next line of code we feed it.

> `⌘ + ⌥ + i` enters you in the the chrome dev tools(if you're using chrome...) Here you can do a bunch of stuff like inspect elements and looks at the html. More importantly for this class though, is it allows you to access the console which interacts with the JS you loaded to your page. In our case we'll see that interaction with the code below

In your `script.js` file add the following:
```js
console.log("hello world")
```

> console.log() is just a way to log something, in this case our REPL.  

# Primitive Data Types

## Intro (5/35)
Primitive data types are the building blocks of Javascript.
- Whenever you do anything in Javascript, you are creating and changing these basic pieces of information.

There are five primitive data types.

### ST-wg: What are they?

  1. Numbers
  2. Strings
  3. Booleans
  4. Undefined
  5. Null

We store data types in variables. A variable is a "bucket" that holds data. You can pass the bucket around, empty it, refill it, etc.

- Format: `var NAME = DATA;`

  ```javascript
  // For example...
  var myClass = "WDI7";

  // After instantiation you can then reference variables by just their name, without "var".
  myClass;
  => "WDI7"

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

## Numbers (10/45)

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

### NaN ("Not a number")
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

## Undefined & Null (5/50)
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

## Strings (10/60)
Strings are words in javascript!

We instantiate strings using the "string literal" form.

```javascript
// Can use single quotes to instantiate a string...
var greeting = 'Hello!';

/// ...or double quotes.
var greeting = "Hi there!";
```  

### Escape sequences
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

### Concatenation
- Like numbers, you can add strings together using `+`.

  ```javascript
  var city = "Washington, ";
  var state = "DC";
  var address = city + state;
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

# Syntax & Semantic Naming

## Syntax (5/65)
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

# Prompt (5/70)

We've learned alot about basic data types, but it'd be nice if we had a way of getting user input into our browser! We'll learn some ways to use forms and such later in the course, but for now, we'll be getting user input using the `prompt()` function.

At any point in our JS code, if we write `prompt()`, a pop up box will open in our browser for a user to enter in text.

```js
// prompts user and stores value in the variable
var valueOfPrompt = prompt()
// logs value stored
console.log(valueOfPrompt)
```

You can also pass in a string as an argument to have the pop up box contain that string as a ... prompt.

```js
var age = prompt("How old are you?")
```

# CODING EXERCISE #1 + Break (20/90)
Temperature conversion (Part I): [https://github.com/ga-dc/temperature_converter](https://github.com/ga-dc/temperature_converter)  

# Composite Data Types

Composite data types are collections that allow us to store multiple data types.
- There are two kinds in Javascript. What are they?

## Arrays (10/100)
- Ordered collection of related data types.
- Organized by index.
  - Indexing begins at 0 (e.g., first element in an array has an index of 0, the second has an index of 1, and so on).

There are two ways to instantiate an array...  

```javascript
// Instantiate with an array literal.
var mountRushmore = [ "Washington", "Jefferson", "Roosevelt" ];

// Can also instantiate using the Array constructor.
var mountRushmore = new Array( "Washington", "Jefferson", "Roosevelt" );

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

mountRushmore.push("Lincoln");

mountRushmore[3];
=> "Lincoln"

// You can also place arrays within arrays.
var letters = [ ["a","b","c"], ["d","e","f"], ["g","h","i"] ];

// How would I go about accessing the letter "f" in the above array? Walk me through it.
letters[1][2];
=> "f"
```

Array methods
- There are a lot of useful methods that come with Javascript we can use to inspect and modify arrays. To learn what some of them are...
  - `.length`
  - `.push`
  - `.indexOf`
  - `.reverse`

> There are many more, but these are the most widely-used.

- Documentation
  - [MDN Array Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  - Navigating documentation is a great skill to have. Some sets of documentation are harder to navigate than others, but if you have a sense of how to dig through a massive trove of information like MDN or RubyDocs, you'll become a much more efficient programmer.

## Booleans (105/110)
Two values: `true`, `false`.  

Oftentimes you'll be producing boolean values when comparing two values
- Comparison operators: `==`, `===`, `<`, `>`, `<=`, `>=`

```javascript
1 === 1
=> true

1 === 2
=> false

1 == "1"
=> true
```

> What is the differences between the last two? When using `===`, it checks for both the data type and value. `==` only checks for value. Under the hood, though, `==` converts the data type to the same data type and then executes comparison.

## true vs false (5/115)
So we all know the boolean values of `true` and `false` But there is also a concept of "truthy" and "falsey" In Javascript, the following things are "falsey":
- false
- 0 (zero)
- "" (empty string)
- null
- undefined
- NaN (a special Number value meaning- Not-a-Number!)

> Everything else is "truthy". Why might we need this programmatic concept of "truthy" and "falsey"?(ST-WG)

## Comparison Operators (5/120)

- `&&`
- `||`
- `!`

What do the following evaluate too? (ST-WG)

```js
true && false
true || false
5 > 12 && 12 >= 12
17 > 12 || 4 <= 4
```

Demonstrate comparison operators in node

- `<`, `<=`
- `>`, `>=`
- `!=`, `!==`
- `==`, `===`

```javascript
55 == "55"
=> true
55 === "55"
=> false
```

## Conditionals (15/135)

// Have an example somewhere where one of the more unusual "falsey" values (e.g., empty string) triggers a conditional.

write and narrate through the following code (10m)

```javascript
var age = 24;
if(age < 18) {
  console.log("You're too young to enter this club! Get outta here")
}
else if(age >= 18 && age < 21){
  console.log("Come on in! But no Drinking!!")
}
else{
  console.log("Come on in!")
}
```

Conditionals will always follow this pattern. There is a key word(if, else if, else). Followed by an expression that will evaluate to true or false in parentheses. Then followed by code to execute when condition is met.

## Whitelisting vs Blacklisting
What's wrong with the following code?:

```javascript
var age = 24;
if(age > 21){
  console.log("Come on in!")
}
else if(age > 75){
  console.log("Come on in, but I don't know if this is the place for you!")
}
else{
  console.log("get outta here youngin!")
}
```


# BREAK (10min)


## Loops(15/150)

### For loop
There are two ways to write a for loop.

#### The first:

```javascript
for(var i = 0; i < 10; i++){
  console.log(i)
}
```
The first part is the keyword `for`.
Followed by 3 parts `;` separated in parentheses.
- The first part instantiates the iteratee. Essentially gives you access to this value in your code block as i. It starts at 0 in this case.
- The second part is the comparison expression. That means this code will continue to execute until this expression evaluates to false.
- The third and final part is how much the iteratee is incremented after each execution of the loop

#### The second:

```javascript
// instantiate an array of names
var names = ["adam", "matt", "andy", "adrian", "robin", "jesse"]
for(i in names){
  console.log(names[i])
}
```

- Again this for loop starts with the keyword `for`.
- In parentheses contains the iteratee followed by the keyword `in` followed by the complex data type you would like to iterate over(array or object)
- In the brackets contains the code you would like executed for each iteration of the loop

### You Do - Write a for loop that prints odd numbers to 100. Do not use conditionals

### While Loop(15m)
```javascript
var i = 0;
while(i < 10){
  console.log(i)
  // don't increment at first
}
```
#### ST-WG
What are the differences between `for` and `while`?

// Through example or pose question to students, have them recreate the same odd-number-printing
// for loop using a while loop.

### Additional Exercises

# CODING EXERCISE #2 (20min)

Temperature conversion (Part II): [https://github.com/ga-dc/temperature_converter](https://github.com/ga-dc/temperature_converter)  

### You do - Fizzbuzz(can use conditionals)(20m)

### Homework
- [Choose your own adventure](https://github.com/ga-dc/choose_your_own_adventure_js)
- [JS Basics Quiz](https://github.com/ga-dc/js-basics-hw)

# Review Questions
1. When would you use an array over an object? And vice-versa?
- What is the difference between `undefined` and `null`?
- Provide an example of a semantically-named variable. Explain your choice.
- What role does Javascript play on a website?
- What are the five primitive data types?
- What are the two composite data types? When would you use each?
- What is an example of type coercion?
- What is an example of a semantically-named variable?
