#### What is the difference between synchronous and asynchronous program execution?

##### Synchronous
When code is executed in sequence. A line of code will not run until those before it have been processed.

  ```javascript
  console.log( "First!" );
  console.log( "Second!" );
  console.log( "Third!" );
  ```

##### Asynchronous
When code is run outside of the synchronous control flow. In the below example, "Second!" is only printed once the user clicks a button (i.e., outside of the normal control flow).

  ```javascript
  var button = document.querySelector( "button" );

  function second(){
    console.log( "Second!" );
  }

  // The console will only print "Second!" when the button is clicked.
  // "First!" and "Third!" will be printed to the console before that upon page load.
  console.log( "First!" );
  button.addEventListener( "click", second );
  console.log( "Third!" );
  ```

#### Using jQuery, create an event listener for a `<button>` that, when clicked, changes the background color of the `<body>` to `"Honeydew"`.

  ```javascript
  $( "button" ).on( "click", function(){
    $( "body" ).css( "background-color", "Honeydew" );
  })
  ```

#### Define a function that takes a function as an argument and invokes the argument when the function is called.

  ```javascript
  function invoker( funcToBeInvoked ){
    funcToBeInvoked();
  }

  function helloThere(){
    console.log( "Hello there!" );
  }

  invoker( helloThere );
  ```

#### Which of the following is a CSS selector that targets every `<p>` element that is the third <p> child of its parent?

B: `p:nth-of-type(3)`  

#### Write an example program that tries to access a variable out of scope.

In the below example, `printName()` attempts to access the `intro` variable. `printName()` cannot access `intro` because it is instantiated inside of another function outside of its scope.

  ```javascript
  function myNameIs(){
    var intro = "Hi, my name is: ";
  }

  function printName( name ){
    console.log( intro + name );
  }

  printName( "Andy" );
  ```

If the code was written like the below example, `printName` would be able to access `intro`.

  ```javascript
  var intro = "Hi, my name is: ";

  function printName( name ){
    console.log( intro + name );
  }

  printName( "Andy" );
  ```

#### What is the difference between waterfall and agile workflows?

##### Waterfall

A linear approach to software development. Project stages execute sequentially. You get to the final product fully developed and tested at the very end of the process. Sometimes can be good if you know EXACTLY what you want the end goal to be (i.e., you know: what to build, who to build it for, and how to build it).  

[Waterfall Diagram](https://camo.githubusercontent.com/c62d7fc820ac17da5ba6899ef4a06bd0469d8455/687474703a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f652f65322f576174657266616c6c5f6d6f64656c2e737667)

##### Agile

Agile Software Development is a group of software development methods in which requirements and solutions evolve through collaboration between self-organizing, cross-functional teams.
