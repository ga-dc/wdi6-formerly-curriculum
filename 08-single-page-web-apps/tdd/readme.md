## Learning Objectives

* Explain the methodology behind Test Driven Development (TDD).
* Review RSpec and general testing syntax.
* Describe Jasmine.
* List components of a Jasmine test.
* Implement TDD using Jasmine.
* Use different Jasmine matchers.

## Do You Test? (5 / 5)

**THINK-PAIR-SHARE**: We’ve already applied Test Driven Development to Ruby. To get us back in that mindset, spend the next few minutes to think-pair-share on:

* Why test?
* Why not test?
* What problem does testing solve?

For those of you who answered no, why not?
* **Time.** It's a waste of my time and effort to test.
* **It's too much.** I can test just fine using the console.
* **App complexity.** My app is too simple to require testing.

Why should we?
* **Bug detection.** Quickly identify unanticipated errors.
* **Code Quality.** Create standards for our code before writing it.
* **Time.** Shorten development time through bug detection.
* **Documentation.** Tests act as a documentation of sorts for how our code should work. Helpful to other developers and shareholders.
* **Jobs.** Testing is a job requirement across the board.

## Everybody Does It (5 / 10)

Testing is essential when working on large, complex projects.
* Take Ember.js for example. [If you look at the framework's repo](https://github.com/emberjs/ember.js#how-to-run-unit-tests), it comes packaged with a ton of tests.
* So many moving parts. And so many people contributing to them. Can you imagine how crazy this would get without testing?

## Test-Driven Development

### The Process (5 / 15)

![tdd flowchart](img/tdd-flowchart.png)

TDD step by step.
  1. **Think.** What do we want our code to do?
  2. **Write a test.** This test must fail. Why?
  3. **Run your test.** Seeing red.
  4. **Write code.** How can we make this test pass?
  5. **Test passes.** Green light.
  6. **Refactor and Repeat.**

### Unit Testing (5 / 20)

We've already encountered TDD once with RSpec. Back then, we engaged in "Unit Testing."
* Addresses the **what** of testing, while TDD covers the **when** and **why**.
* Test the most basic component of an application. Not necessarily the smallest.

Here's a sample from Matt's lesson, in which we tested the functionality of a Person class.
* In particular the Person class' constructor method.
* In a Unit test we can test any facet of a person.
  * In can be a property (e.g., does this person have a name?)
  * It can be a method (e.g., can this person talk?)

```ruby
# Let's test the Person class.
describe Person do

  # Specifically, let's test its constructor method.
  describe "Constructor" do

    # Before each test, let's create and store a Person instance in @matt.
    before(:each) do
      @matt = Person.new("Matt")
    end

    # Test 1: @matt should be an instance of Person.
    it "should create a new instance of class Person" do
      expect(@matt).to be_an_instance_of(Person)
    end

    # Test 2: @matt should have a name.
    it "should have a name" do
      expect(@matt.name).to_not be_nil
    end
  end
end
```

We'll be doing this again when testing Javascript.

## Jasmine

Today we're diving into the world of Javascript testing.
* One JS testing framework is Jasmine.
  * Not the only one. There's [Mocha](https://mochajs.org/), [QUnit](https://qunitjs.com/) and more...
* It bills itself as a "Behavior Driven Development" framework...

## Behavior-Driven Development (5 / 25)

What does "Behavior Driven Development" mean and how is it different from TDD?
* BDD informs **which** tests we should be running.
  * What is the purpose of your application? What are your user stories?
  * Make sure that your tests reflect the direction and purpose of your application.
  * BDD is less concerned with the granularity of your tests and more with whether they test the key functionality of your application.
* BDD is not defined by what functions or keywords you use to test your code.
  * It's a process to simplify and refine the number of tests you are running.
* We've already started implementing it.
  * Verbose test descriptions. Can be read in plain English.
  * In today's in-class example, we'll be creating a basic Calculator application and testing its key features.

## Meet Jasmine (10 / 35)

Here's a sample Jasmine test from their [documentation](http://jasmine.github.io/2.1/introduction.html)...

```js
describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });
});
```

Does any of it look familiar?
* What similarities does it have with RSpec?
  * `describe`, `it`, `expect`
  * Fortunately, we get to work with the same testing syntax as we do in Ruby.
* Look at them side-by-side...

![ruby js test side by side](img/ruby-js-side-by-side.png)

Ruby aside, does this Jasmine test remind you of anything from WDI weeks 1-2?
* Getting some strong callback vibes from this...
* That's because `describe`, `beforeEach` and `it` are just functions!

Let's break down the format of a test.
* No need to code along here. We'll make our own tests later in this class.

**1. Suite**

```js
describe( "A person", function(){
  // Specs go here.
});
```

A "suite" is the highest-level container in our test file.
* A suite defines what we are testing. Oftentimes, this is an object.
* Indicated using the `describe` function.
* Takes two arguments: (1) a string, (2) a function
  * (1) The string is the name of what we are testing
  * (2) The function contains the actual tests

```js
describe( "A person", function(){
  // Specs go here.
});
```

**2. Spec**

```js
describe( "A person", function(){

  it( "should be named Adrian", function(){
    // Expectations go here.
  });

  it( "should be 28 years old", function(){
    // Expectations go here.
  });
});
```

In the "spec," we target a specific part of the suite.
* In the above example, we test to see if this person is named Adrian and is 28 years old.

**3. Expectations**

```js
describe( "A person", function(){

  it( "is named Adrian", function(){
    var person = { name: "Adrian", age: 28 };
    var name = person.name;
    expect( name ).toBe( "Adrian" );
  });

  it( "should be 28 years old", function(){
    var person = { name: "Adrian", age: 28 };
    var age = person.age;
    expect( age ).toBe( 28 );
  });
});
```

Expectations are the meat-and-potatoes of our tests.
* Begins with code content. In this case, saves the name of the person in question to a variable.
* Last line is the actual expectation.
  * Begins with `expect`. Takes one argument, the variable whose value we are testing.
  * Followed by a **matcher** (e.g., `toBe`), which tests the expectation in a particular way.
    * `toBe` isn't Jasmine's only matcher. Along with equality you can check for greater/less than, null and more.
    * A full list of Jasmine's native matchers can be found [here](http://jasmine.github.io/edge/introduction.html#section-Expectations).
    * If you're feeling adventurous, you can even [create your own custom matcher](http://jasmine.github.io/2.0/custom_matcher.html).

**4. Refactor**

Could we make these tests DRYer?
* We instantiate the `person` variable twice. Is there a function available that will let us do this once?

```js
describe( "A person", function(){

  beforeEach( function(){
    var person = {
      name: "Adrian",
      age: 28
    };
  });

  it( "is named Adrian", function(){
    var name = person.name;
    expect( name ).toBe( "Adrian" );
  });

  it( "should be 28 years old", function(){
    var age = person.age;
    expect( age ).toBe( 28 );
  });
});
```

## Getting Started

First, we're going to install jasmine-node globally.
* `$ npm install  -g jasmine-node`
* Now we can use Jasmine across projects.

## What are we going to test?

During this lesson we are going to write tests for and create a calculator application.
* We're going to stick with Javascript here. No HTML/CSS at the moment.

## Let's get to work (20 / 55)

### Create your JS files.

Switch into your in-class folder and create the following.
* Our calculator: `$ touch calculator.js`
* Our test folder: `$ mkdir spec`
* Our test file: `$ touch spec/calculator-spec.js`

### Create our first test.

Before we write any of our calculator code, we're going to create a test.
* Let's start simple and create a test for our calculator's add functionality.
* But first, let's prepare our spec file so that it can actually test our calculator.

```js
// spec/calculator-spec.js

// Not unlike Ruby, `require` lets us reference `calculator.js` in our spec file.
// Now, any functions defined in calculator.js can be referenced using the format `calculator.functionName`.

var calculator = require( "../calculator" )
```

Let's break this test down according to its parts. First, **the suite**.
* What should our suite look like?

```js
var calculator = require( "../calculator" )

describe( "a calculator", function(){

  describe( "addition method", function(){
    // Tests for our addition function will go in here.
  });

})
```

Next up, let's make **a spec**.
* Let's test if our addition function can add 2 and 2 together.
* What should our spec look like?

```js
var calculator = require( "../calculator" )

describe( "addition method", function(){
  it( "should add two numbers", function(){
    // Expectations go in here.
  })
});
```

And finally, let's create **the expectations** for our test.
* What should our add function look like?

```js
var calculator = require( "../calculator" )

describe( "addition method", function(){
  it( "should add two numbers", function(){
    // Let's store the sum of our addition function.
    // Because our add function will be stored in calculator.js, we can reference it as such...
    var sum = calculator.add( 2, 2 );

    // Now what do we expect that sum to be?
    expect( sum ).toBe( 4 );
  })
});
```

That looks like a good test to me. Let's run it!
* From your in-class folder, run: `$ jasmine-node spec`
* What error do we get?

![failed add test](img/failed-add-test.png)

Of course, it failed. Let's create that addition function.

```js
// calculator.js

exports.add = function(){

}
```

`exports`? What's that?
* With `exports` we can, well, "export" `add` or any other function in `calculator.js` to another javascript file.
  * Say we had an `accounting.js` file. We could give it full calculator functionality by `require`ing `calculator.js`.

Moving on. Let's fill out our `add` function.

```js
exports.add = function( addend1, addend2 ){
  return ( addend1 + addend2 );
};
```

Let's run our test again.

![passed add test](img/passed-add-test.png)

### We Do: Let's do the same for subtract. (5 / 60)
* Create the test - run your test - create the function - run your test.

## Object-Oriented Javascript (5 / 65)

You've already spent some time this week stepping up your OOJS game.
* So you might be wondering why we're exporting our calculator methods individually.
* Let's reformat our calculator into a Javascript object and "export" it to our spec file.
* How do we go about doing that?
  * `module.exports`! Help me set that up.
  * What's the different between `exports.functionName` and `module.exports`?
* Won't require any changes to our tests. Just `calculator.js`.
  * Why is that?

```js
// calculator.js

// Think of `module.exports` as a collection of `exports.functionName`'s.
// Here it's set to an object that contains all of our calculator functionality.
// Imagine that `module.exports` was replaced with `var calculator`.

module.exports = {
  add: function( addend1, addend2 ){
    return ( addend1 + addend2 );
  },

  subtract: function( minuend, subtrahend ){
    return ( minuend - subtrahend );
  },

  // The rest of your calculator methods go here.
}
```

## Break (10 / 75)

## Exercise: Build Out Our Calculator (15 / 90)

Follow the same process and add some functionality to our calculator.
  1. Multiplication
  2. Division
  3. Square
  4. Exponential
  5. Average

[Here's the calculator solution](https://github.com/ga-dc/jasmine-calculator) in case you need some guidance.

### Bonus
Implement `beforeEach` so that it initializes a `total` variable before each test.
* Create a test that verifies the value of `total` after running multiple methods.
  * e.g., Make sure `total` is the correct value after running `calculator.add` and `calculator.subtract` in a single test.
* Reset the value of total using `afterEach`.

Test and add some advanced functionality.
* [Factorial](http://www.mathsisfun.com/definitions/factorial.html)
* [Logarithmic](https://www.mathsisfun.com/algebra/logarithms.html)

Test for error messages when your calculator makes an invalid operation.
* For example, test to make sure that your calculator returns a helpful error message when it tries to divide by 0.

## Exercise (Cont.): Add Some Matchers (10 / 100)

We've already played around with one matcher in our test expectations: `.toBe( )`
* Implement the following functions using the indicated matchers...
  * `.isNegative`: use `.not.` to check whether an input is negative. If it is, the expectation should return true.
  * `.isGreaterThan`: use `.toBeGreaterThan()` to check whether the first of two arguments is greater than the second. If it is, the expectation should return true.
* Need help? Look at the [Jasmine Documentation](http://jasmine.github.io/2.0/introduction.html#section-Matchers).

[Here's the calculator solution](https://github.com/ga-dc/jasmine-calculator) in case you need some guidance.

### Bonus

* `.isEven`: use `.toMatch()` to check if a value is even.
  * **Hint:** requires Regex
* [Create your own custom matcher](http://jasmine.github.io/2.0/custom_matcher.html).

## Break (10 / 110)

## Exercise + Homework: Clock Hands (30 / 140)

With the remaining time in class I'd like you to create this [Clock Hands angle calculator](https://github.com/ga-dc/sundial) using a TDD approach.
* Combine problem solving with TDD.
* There is no single way to do this, so feel free to create whatever tests you would like.
* While you're together, I encourage you to tackle this exercise pair-programming style.
  * First, outline the problem. Think about not only how to approach it but what tests you will need to support it.
  * Keep switching off: have one person write a test and the other write the code to make it pass.

## Questions + Closing (10 / 150)

## Additional Reading

* [Difference Between TDD and BDD](https://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)
* [Jasmine Documentation](http://jasmine.github.io/2.1/introduction.html)
* [Creating Custom Matchers in Jasmine](http://jasmine.github.io/2.0/custom_matcher.html)
* [Testing AJAX Calls with Jasmine](http://jasmine.github.io/2.1/ajax.html)
