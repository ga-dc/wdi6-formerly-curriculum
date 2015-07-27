# Unit Testing with RSpec
- Explain the purpose unit testing
- Explain what role RSpec plays in testing
- Explain the TDD/BDD Mantra
- Describe RSpec's basic syntax
- Define the role of expectations and matchers
- Explain why isolating tests is a best practice
- List common expectations and the scenarios they support
- Differentiate between testing return values and side effects
- Describe why we avoid testing internal implementation

---

## What is RSpec?

  - RSpec is a testing framework for the Ruby programming language.  It's a Domain Specific Language for writing live specifications about your code.
  - Released on May 18, 2007

These are specifications about YOUR code that you can run to ensure your code is doing what it should.  Think back to the way you code.  You create a part of a web page, then you browse to that page to test it.  To ensure that it is doing as you expect.  Then you add another feature.  And test bot features.  Then you add a third feature and test... just the third feature.  Imagine if you had a battery of automated specs, which run against your code, so you can see if your new changes fit your new requirements and EVERY requirement that came before this.

The reading discussed TDD/BDD.  Indicating that testing is as much about design, helping you to architect a maintainable application, as it is about creating a body of regression tests.  In this lesson, we are focusing on the safety net.  Design is hard, BDD makes it easier, but need the basic skills first.

---

## Let's look at a rspec_person_example


When I run `rspec` in the `rspec_person_example` dir, what do we see?

```
Person
  Constructor
    should create a new instance of class Person
    should have a name
    should default #language to 'English'
  #greeting
    for default language (English)
      should offer a greeting in English
    when language is 'Italian'
      should offer a greeting in Italian

Finished in 0.00565 seconds (files took 0.14281 seconds to load)
5 examples, 0 failures
```

This tells me quite a bit about a Person.  I see that Person should have a Constructor that accepts name and (possibly) language.  From the constructor, I see the Person might support many languages, starting with English.  Then, I see that a Person can greet in English or Italian.


Let's review `spec/person_spec.rb`.  This is the specification for a Person.  It indicates how we can expect a Person to function.  We can trust it to act in this manner.  Here, we see what some examples of how to initialize a Person.



```
rspec_person_example/
├── models
│   └── person.rb
└── spec
    ├── person_spec.rb
    └── spec_helper.rb

2 directories, 3 files
```

We have a Person model and a Person spec (a specification or test). This is the typical RSpec convention.  Specs live under the spec directory and echo the models in our system with the `_spec` suffix.

---

## What does an RSpec specification (or "test") look like?

``` ruby
require_relative '../models/person'  # a reference to our code

describe Person do
  describe "Constructor" do
    before(:each) do
      @matt = Person.new("Matt")
    end

    it "should create a new instance of class Person" do
      expect(@matt).to be_an_instance_of(Person)
    end

    it "should have a name" do
      expect(@matt.name).to_not be_nil
    end

    it "should default #language to 'English'" do
      expect(@matt.language).to eq("English")
    end
  end

  describe "#greeting" do
    context "for default language (English)" do
      subject(:bob) { Person.new("Bob") }

      it "should offer a greeting in English" do
        expect(bob.greeting).to eql("Hello, my name is Bob.")
      end
    end

    context "when language is 'Italian'" do
      subject(:tony) { Person.new("Tony", "Italian") }

      it "should offer a greeting in Italian" do
        # legacy syntax - the old DSL
        tony.greeting.should eql("Ciao, mi chiamo Tony.")
        # equivalent to:
        # expect(tony.greeting).to eql("Ciao, mi chiamo Tony.")
      end
    end
  end
end
```

### The Spec
The first line is a reference to our library code.  We need to access to the classes we have written.

Well skim through the code, gaining a high level knowledge of what is expected, then we'll return to hash out the details.

`describe` is a new keyword provided by RSpec (part of its DSL).  Here it indicates that a `Person` is the "Unit Under Test".  First we show examples of what we can expect as we contruct new people.  Then, we describe the functionality of the `greeting` method, specifically within the specific context of each language.  This is ruby code, indicating how our library (or model) code should behave.

### Test Isolation
Returning to the top, we see `@matt` being instantiated.
  Introduce isolation.
  1. Setup
  2. Test
  3. Teardown

### Expectation and Matcher
Then we see our first spec or "expectation".
```
expect(@matt).to be_an_instance_of(Person)
```

RSpec assertions have two components: expectation and matcher.

We expect `@matt` to be something.  We identify that "something" with a Matcher:

> Expectation: `expect(@matt).to `

> Matcher: `be_an_instance_of(Person)`

Everything else exists to support Expectations and Matchers.

### Legacy syntax (should)

In addition to `expect(iut).to matcher`, RSpec supports another syntax: `should`.   That expectation is slightly different.  It uses the older `should` syntax.  

You may see this:
```
it "should default #language to 'English'" do
  expect(@matt.language).to eq("English")
end
```
Written as:
```
it "should default #language to 'English'" do
  @matt.language.should eq("English")
end
```

The underlying implementation of "should" was "messy". You can see that they had to dynamically adjust our library code `@matt.language` to support the `should` method.

The new syntax works like jQuery's `$()` syntax.  We use `expect(IUT)` to "wrap" the Item Under Test, so that it supports the `to` method.  The `to` method accepts a matcher.

While we adjust the use of parenthesis for readability, we are really passing the "matcher" to the "expectation".


### Exercise: Getting familiar

LearnRuby: 00 Hello World

We are going to use a website called LearnRuby to practice reading specifications.

Follow these instructions carefully, if you think you are lost, re-read the instructions, I expect you missed a step.

These exercises increase in complexity.  They will exercise your ruby knowledge and your RSpec knowledge at the same time.  If you ever find yourself getting ahead, feel free to do any of these exercises.    Conversaly, if you feel a little lost, back up.  Do some of the exercises we skipped.

Let's start at the very beginning.  DO the introduction and "00 Hello World".  What a very fine place to start.

http://testfirst.org/learn_ruby

`git clone git://github.com/alexch/learn_ruby.git`


### Context

As we move int the the description of the `greeting` method.  We see our first "context": `"for default language (English)"`.  Within this block, we expect the language of our person to be "English" and we will write specs accordingly.  You can see this as we move down through each supported language.

Where did `@matt` come from? `before(:each)`  How about `bob` and `tony`?

`subject` is another part of the RSpec DSL.  We found that the subject of each test was an important componenet, so we made it a first class citizen.  While we still setup some things in `before` blocks, you will usually see the item "under test" defined in a `subject` block.

The following subject block indicates that there will be a variable named `bob` available within this block of specs.  You can expect it to be assigned a person, named "Bob".
```
subject(:bob) { Person.new("Bob") }
```

 The code within the block is assigned to the dynamically created variable.  This variable is named after the symbol.  So, during these specs, the variable `bob` will hold a reference to the person under test.


---

Let's review those results again (`$ rspec`).  See where they come from?  Now, let's review `describe`, `context`, `it`, "expectations", and "matchers", by changing our code and see the specs fail.  Take a few minutes to adjust the code and run the specs a few times.  Play with it.  See how your actions in the code AND in the specs affect the output.

Ok, let's change everything back.  Are we back to Green?  Good.

---

### Think, pair, share.  Support another language
Let's take a few minutes to specify that a Person can greet in Spanish too. We'll stick to the specification for now, then add the implementation in a minute.

In spanish, we should greet with "Hola me llamo Maria."  

---

```
context "when language is 'Spanish'" do
  subject(:maria) { Person.new("Maria", "Spanish") }

  it "should offer a greeting in Spanish" do
    expect(maria.greeting).to eql("Hola me llamo Maria.")
  end
end
```

---

```
when /spanish/i
  "Hola me llamo #{name}."
```

---

### Think, pair, share.  What aren't we testing?
Let's take a few minutes to think about what we aren't testing.

Sit quietly for 2 minutes.  Think like a tester.  What code exists that aren't testing.  What examples would be good to clarify what our code can do?

Next, we'll discuss with our pair for 4 minutes.
Then, we'll share a few examples with the class.

- That we are using the passed `name` argument.
- What happens with an unsupported language

---

### Exercise: Implement your suggestions.

- Specify that we utilize the passed name
- Specify the response to an Unsupported language

I recommend that you review the available Matchers in the [RSpec documentation](???).  These are live documents, written using "relish" to ensure they keep pace with the code.

---

### We avoid testing implementation
Here's something else we aren't testing.
We aren't testing that `greeting` uses a `select/case` statement.  That would be testing the internal implementation. Let's be clear, I should be free to write whatever code I want, inside of the `greeter` method, in order to achieve the results the specs indicate. Let's say our team creates a new translation library.  I should be able to swap out my naive implementation and replace it with that.  The following code tells the ItalianTranslator to translate this phrase from English.

```
tony = Person.new("tony", ItalianTranslator)
```
I would replace the code in `greeting` with:
```
def greeting
  phrase = "Hello, my name is #{name}"
  language.convert_from(phrase, :en)
end
```

-----

### Exercise: Add farewell.

Add support for farewell, for each language.

---



## Mocks & Stubs
- Stubbing and Mocking makes your component examples independent of other components.
- You can stub methods on objects to let them return whatever you like.
- And you can use mock objects to replace instances of other classes.

---

## Example

``` ruby
book = instance_double("Book", :pages => 250)
allow(book).to receive(:title) { "The RSpec Book" }
allow(book).to receive(:title).and_return("The RSpec Book")

```


## Expect an error?
``` ruby
describe Object, "#non_existent_message" do
  it "should raise" do
    expect{Object.non_existent_message}.to raise_error(NameError)
  end
end

describe Object, "#public_instance_methods" do
  it "should not raise" do
    expect{Object.public_instance_methods}.to_not raise_error(NameError)
  end
end
```

---

Exercise: 00_hell0_world

http://testfirst.org/learn_ruby, 00_hello_world

Note: Follow these directions closely.  They will walk you through each step.  Due to learn_ruby's setup, you will use `rake` instead of `rspec`.  The rake task is configuring and running rspec.

---

Now that you have had some small exercises to cement the language

## Exercise:

Scoring a Scrabble game.
Break it into small pieces and have pairs iterate, then switch pairs and repeat.

https://github.com/ga-dc/scrabbler

---

## Homework:

http://testfirst.org/learn_ruby
01 Temperature
02 Calculator
03 Simon Says
08 Book Titles

---

## References:
- "The RSpec Book", David Chelimsky
- Magic Tricks of Testing - Sandi Metz

---

## Additional Resources

- RSpec Cheatsheets:

  - https://www.anchor.com.au/wp-content/uploads/rspec_cheatsheet_attributed.pdf
  - https://gist.github.com/byplayer/965857

- Code School RSpec:

  - https://www.codeschool.com/courses/testing-with-rspec

- RSpec for Newbies:

  - http://code.tutsplus.com/tutorials/ruby-for-newbies-testing-with-rspec--net-21297

- Mocks & Stubs
  - http://rubydoc.info/gems/rspec-mocks/frames
  - http://rubydoc.info/gems/rspec-mocks/frames

---


## TDD vs. BDD

A brief history

Emergent design

## Why BDD?

Limited self discipline.
Environment that leads us in the right direction.

“BDD puts the focus on behavior instead of structure, and it does so at every level of development.”

Excerpt From: David Chelimsky. “The RSpec Book (for Matthew Scilipoti).” iBooks.

## Given, When, Then, the BDD triad

I have found that most of the problems that software development teams face are communication problems.  So I get excited when I read something like this:

> “BDD aims to help communication by simplifying the language we use to describe scenarios in which the software will be used: Given some context, When some event occurs, Then I expect some outcome.” -- David Chelimsky


Given, When, Then, the BDD triad

## Why RSpec?
“We use RSpec to write executable examples of the expected behavior of a small bit of code in a controlled context.”

Excerpt From: David Chelimsky. “The RSpec Book (for Matthew Scilipoti).” iBooks.



## DSL?

We hypothesized that a focus on behavior could

!!! Use examples from



## Exercise: Mini Code Retreat

scrabble

https://github.com/ga-dc/bowling_game

## Homework:

http://testfirst.org/learn_ruby

## References:
- "The RSpec Book", David Chelimsky
- Magic Tricks of Testing - Sandi Metz
