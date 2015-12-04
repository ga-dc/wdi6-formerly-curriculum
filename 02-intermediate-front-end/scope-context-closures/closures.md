# Closures

## Learning Objectives

- Define what a closure is
- Explain why closures are used
- Write a function that uses a closure to control access to data
- Explain why and from what we are trying to protect data


## References
#### Closure

* [Getting Closure](http://markdaggett.com/blog/2013/02/25/getting-closure/)
* [Understand closures with ease](http://javascriptissexy.com/understand-javascript-closures-with-ease/)  
* [Closure FAQ](http://jibbering.com/faq/notes/closures)
* [Closure Use Cases](http://www.bennadel.com/blog/2134-a-random-exploration-of-closure-use-cases-in-javascript.htm)
* [Everything you wanted to know about JavaScript scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)


## What are Closures

Closure is the property of function such that it can access variables in the same scope, i.e. scope chain, it was declared in. Even when that function is operating outside of that scope.

A function is called a "closure" because it "closes around" some variables and functions. It's like an envelope containing variables and functions. When you send that envelope around, it still contains all the same variables and functions.

All functions in JS are closures. Effectively, this means:

1. We can pass functions around by putting them in variables or referencing them by name.
2. Functions can be passed in as arguments to other functions.
3. Functions can return other functions.
4. No matter how they are passed around, a function 'remembers' the variables in scope at the time of it's definition.

### Exercise: Turn & Talk

Where have we seen examples of 1-3 (even possibly 4) in practice already?

## Storing Functions

We've already seen that we can store functions in variables:

```js
var sayHello = function() {
  console.log("hello!");
}

sayHello();
```

## Passing Functions as Arguments

We've already see passing functions as arguments in the case of event listeners:

```js
function alertUser() {
  console.log("Warning!");
}

var button = document.getElementById("big-red-button")
button.addEventListener("click", alertUser);

// or
var button = document.getElementById("big-red-button")
button.addEventListener("click", function() {
  console.log("Warning!");
});
```

### Returning Functions / Remembering Scope

```js
function sayHelloGenerator(){
  var prefix = "Hello ";

  function hey(name){
    return prefix + name;
  };

  return hey;
};

var sayHey = sayHelloGenerator();

// "Hello Bart"
var msg = sayHey("Bart");
console.log(msg);
```

#### Exercise:

1. Write the scope diagram for the code above, and describe what happens as it runs step by step.

## Another (More Complex) Example

The key to understanding closure is to know that a function declared in a scope can **ALWAYS** access other variables in that scope.

**Even when that function is executing outside of the declaring function**

```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(  add5(2) );  // 7
console.log(  add10(2) ); // 12
```

## Encapsulation.

Encapsulation is a software concept where one seperates the implementation from the interface that is used by clients.

It's often good to *hide* the details of how something is being done from outside code, that is the client code.

This will reduce the knowledge needed by the client.

For example, when we drive our cars we don't worry about the specifics of the engine or drivetrain. We interface with the car using the gas pedal, brake and steering wheel.

The engine and drivetrain are part of the car's implementation.

The gas pedal, brake pedal and steering wheel are the car's interface to client, the driver.

**Create a file `js/makePerson.js`**

Below is a people factory. Give it a name and an age and it'll create a person.
That is, it will create objects that represent a specific person.

```js
function makePerson( fullName, currentAge ){
  var _name = fullName;  // 1
  var _age = currentAge;  // 1

  var person = {   // 2  and 3
    getName: function(){
      return( _name );
    },

    getAge: function(){
      return( _age - 10 );
    }
  };

  return( person );
}

// Create a new person instance.
var bob = makePerson( "Bob", 45 ); //5

// Check to see if the age property exists in a public
// portion of the person instance.
// 7
console.log("Can we access the Bob's _age?")
console.log("_age" in bob)  

// Get the age using the accessors.
// 8
console.log("Age is (little lie here):")
console.log(bob.getAge())
);

```

1. By convention, private variable are prefixed by an underscore.  
2. We are creating an object literal, `{ ... }`. This will have two properties, getName and getAge. The value for both of these properties are functions.  
3. We assign this object literal to the variable person.  
4. We return the object person to the calling function.
5. We use the factory to create a "bob" person.  
6. We check to see if we can access the private variable `_age` outside of the factory function. **We can't**  
7. We get bob's age by calling the getAge method. *Of course it lies*. And we're hiding the lie!


Note, the interface to the object 'bob' is two functions/methods, getName and getAge. That's all that client code needs to know about bob.

The implementation are the private variables `_name`, `_age` and the code inside the getName and getAge functions.

Client code does **NOT** need to be concerned with implementation details. Only with the interface.
