# Unit Testing with RSpec (5m)
- Explain the purpose Unit testing
- Explain what role RSpec plays in testing
- Explain the TDD/BDD Mantra
- Describe RSpec's basic syntax
- Define the role of expectations and matchers
- Explain why isolating tests is a best practice
- List common expectations and the scenarios they support
- Differentiate between testing return values and side effects
- Describe why we avoid testing internal implementation


## Unit Testing (10m)

As our applications increase in complexity, we need a saftey net.  We need something to ensure that we "Do no harm".  We need a battery of automated tests.  These are specifications about YOUR code that you can run to ensure your code is doing what it should.  

Think back to the way you code.  You create a part of a web page, then you browse to that page to test it.  To ensure that it is doing as you expect.  Then you add another feature.  And test both features.  Then you add a third feature and test... just the third feature.  Imagine if you had a battery of automated specs, which run against your code, so you can see if your new changes fit your new requirements and EVERY requirement that came before this.

There a few levels of testing. Acceptance tests verify our apps at the lvel of user interaction.  They visit web pages, click on links, validate the DOM.  Integration tests check the interaction between objects.  Unit tests check the smallest level.  The functionality of a specific method.

Sandi Metz (author of POODiR), has a talk titled "The Magic Tricks of Testing".  

She discuses that:
- Unit tests stand in contrast to integration tests
- Unit tests focus on small pieces of code, like single objects
- The intent is to ensure the correct functioning of your app at the atomic level
- These tests are conducted in isolation, without reference to external objects, as much as possible (using mocks and stubs as placeholders when necessary)

She propounds that our Unit Tests should be:
- Thorough
- Stable
- Fast
- Few

They need to be thorough enough to identify an issue at the moment when it occurs.  They need to be stable so that we can trust them.  No [flickering tests](http://sk176h.blogspot.com/2013/05/flickering-scenario.html).  They need to be fast so that we can run all our tests every time we make a change - or we will stop running them.  They need to be few so...  They need to be few so that... awww, go watch the talk already.


### What is RSpec?

RSpec is a testing framework for the Ruby programming language.  RSpec makes it easier to write tests.  It's a Domain Specific Language for writing live specifications about your code.  It was released on May 18, 2007, so it's benn around for a while.  It is the defacto testing framework.

The reading discussed TDD/BDD.  Indicating that testing is as much about design, helping you to architect a maintainable application, as it is about creating a body of regression tests.  In this lesson, we are focusing on the safety net.  Design is hard, BDD makes it easier, but need the basic skills first.

Today, don't worry about *when* you write your tests.  **Just focus on writing tests.**  Later, when you are more comfortable writing tests, you can begin to use them to drive your design.

---

## Let's look at an example (30m)

I don't expect you to type this with me, but this code is available at [rspec_person_example](https://github.com/ga-dc/rspec_person_example)


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

### What does an RSpec specification (or "test") look like?

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

`describe` is a keyword provided by RSpec (part of its DSL).  Here it indicates that a `Person` is the "Unit Under Test".  First we show examples of what we can expect as we construct new people.  Then, we describe the functionality of the `greeting` method, specifically within the specific context of each language.  This is ruby code, indicating how our library (or model) code should behave.

## Test Isolation
Returning to the top, we see `@matt` being instantiated.

```
before(:each) do
  @matt = Person.new("Matt")
end
```

When running unit tests, we expect each test to run "in isolation".  To be separate for every other test.  These tests manipulate our system.  They add rows to the Database. They change existing information.  They configure and tests the results.  We don't want the configuration and/or changes in one test to affect other tests.

RSpec uses this convention:
1. Setup
2. Test
3. Teardown

The setup is run prior to each test and a teardown is run following each test, which resets our system.

## Expectation and Matcher
After the setup (`before`), we see our first spec or "expectation".
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


### Exercise: Getting familiar (15m)

We are going to use a website called LearnRuby to practice reading specifications.

Follow these instructions carefully, if you think you are lost, re-read the instructions, I expect you missed a step.  Due to Learn Ruby's setup, you will use `rake` instead of `rspec`.  The rake task is configuring and running rspec.

These exercises increase in complexity.  They will exercise your ruby knowledge and your RSpec knowledge at the same time.  If you ever find yourself getting ahead, feel free to do any of these exercises.    Conversely, if you feel a little lost, back up.  Do some of the exercises we skipped.

Let's start at the very beginning.  What a very fine place to start.

http://testfirst.org/learn_ruby#install

1. Start from `wdi/exercises`.
2. `git clone git://github.com/alexch/learn_ruby.git`
3. Learn Ruby expects a particular version of RSpec.
```
gem install rspec --version '< 3.0'
```
4. LearnRuby uses the legacy "should " syntax. To avoid deprecation warnings, let's configure rspec to allow this syntax. Make sure your "learn_ruby/rspec_config.rb" file has this last line:
``` ruby
# learn_ruby/rspec_config.rb
RSpec.configure do |c|
  c.fail_fast = true
  c.color = true
  c.expect_with(:rspec) { |with| with.syntax = :should }
end
```
5. Once you get the materials, open learn_ruby/index.html in your favorite web browser. Further instructions await therein.

We'll continue together through the first few steps.

Continue with 00_hello.  We'll do this for 8 minutes.

## Break (10m)

## Wrapping up the example review (20m)

### Context

As we move into the the description of the `greeting` method, we see our first "context": `"for default language (English)"`.  Within this block, we expect the language of our person to be "English" and we will write specs accordingly.  You can see this as we move down through each supported language.

Where did `@matt` come from? `before(:each)`  How about `bob` and `tony`?

`subject` is another part of the RSpec DSL.  We found that the subject of each test was an important componenet, so we made it a first class citizen.  While we still setup some things in `before` blocks, you will usually see the item "under test" defined in a `subject` block.

The following subject block indicates that there will be a variable named `bob` available within this block of specs.  You can expect it to be assigned a person, named "Bob".
```
subject(:bob) { Person.new("Bob") }
```

The code within the block is assigned to the dynamically created variable.  This variable is named after the symbol.  So, during these specs, the variable `bob` will hold a reference to the person under test.

### Review and play

Let's review those results again (`$ rspec`).  See where they come from?  Now, let's review `describe`, `context`, `it`, "expectations", and "matchers", by changing our code and see the specs fail.  Take a few minutes to adjust the code and run the specs a few times.  Play with it.  See how your actions in the code AND in the specs affect the output.

Ok, let's change everything back.  Are we back to Green?  Good.

---

### Exercise: Support another language (15m)
Let's take a few minutes to specify that a Person can greet in Spanish too. We'll stick to the specification for now, then add the implementation in a minute.

In Spanish, we should greet with "Hola me llamo Maria."  

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

### Think, pair, share.  What aren't we testing? (5m)
Let's take a few minutes to think about what we aren't testing.

Sit quietly for 1 minutes.  Think like a tester.  What code exists that aren't testing.  What examples would be good to clarify what our code can do?

Next, we'll discuss with our pair for 2 minutes.
Then, we'll share a few examples with the class.


### Exercise: Implement your suggestions. (15m)

- Specify the setters for :name, :language
- Specify that we utilize the passed name
- Specify the response to an Unsupported language
  - What expectation would we use for this?

## Break (10m)

## What are we expecting? (25m)

### Specify State or Side-effects

Sandi breaks Unit tests in two groups: Queries and Commands.  So far, we've been specifying the expected return value of methods.  That covers the Queries.  We can also specify the expected side-effects.  A Command performs some action and we can assert that commands do what they are supposed to.  Does this method do what it should do to our system?

Think back to [oop_monkey](https://github.com/ga-dc/oop_monkey).  Remember that our app kept track of the foods that our monkey ate?

In  [monkey_spec.rb](https://github.com/ga-dc/oop_monkey/blob/master/spec/monkey_spec.rb), we saw an example of specifying the side-effect.

> Q. What changes when `matt.eat("banana")`?  How can we verify this?

---

A. "banana" is added to `matt.foods_eaten`.

```
it "can eat a food (a string)" do
  matt = Monkey.new("Matt", "Mandrill")
  matt.eat("banana")
  matt.eat("PB&J")

  # we can make more general expectations, like expect(this_array) to include something
  expect(matt.foods_eaten).to include("banana")
  expect(matt.foods_eaten).to include("PB&J")
end
```

This is specifying what side-effect `#eat` has on our system.

### Demo: "Change" Matcher

> Q. How could we test this using the ["change" matcher](http://www.relishapp.com/rspec/rspec-expectations/v/3-3/docs/built-in-matchers/change-matcher)?

```
expect { do_something }.to change(object, :attribute)
```

---

```
describe '#eat(food)' do
  it "adds the passed food to #foods_eaten" do
    matt = Monkey.new("Matt", "Mandrill")
    # specify via side-effect
    expect { matt.eat("banana") }.to change{matt.foods_eaten.size}.by(1)
  end
end
```

Notice how a block is used to delay execution.  `#expect` controls when to run `matt.eat("banana")`.  

> Q. Why does it need to do this?

---

A. Because it needs to record the count before and after that code is run.

While checking for side-effects is perfectly reasonable, this particular check is pretty weak.  Just checking that the count increases, does not verify that foods_eaten contains the "banana".  Our `#eat` method could have added anything to `#foods_eaten`.

### How many Matchers are there?
Let's review the available Matchers in the [RSpec documentation](https://www.relishapp.com/rspec/rspec-expectations/docs/built-in-matchers).  The RSpec docs are great!  They are a mix of specifications and documentation as live documents.  Written using the "relish" app to ensure they keep pace with the code.  Make sure you are on the version that corresponds to your installed library (v3.3).

Don't miss "Predicate matchers"!

### We avoid testing implementation
Here's something else we aren't testing.  We aren't testing that `greeting` uses a `select/case` statement.  That would be testing the internal implementation. Let's be clear, I should be free to write whatever code I want, inside of the `greeter` method, in order to achieve the results the specs indicate. Let's say our team creates a new translation library.  I should be able to swap out my naive implementation and replace it with that.  To do that we test against the interface of the class -- the public methods -- not the internal implementation.  The following code tells the ItalianTranslator to translate this phrase from English.

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

My test does not change.  The new code still returns a phrase in Italian.  `tony.greeting.should eql("Ciao, mi chiamo Tony.")` still passes.  The internal implementation is free to change.

While I can say that `tony.greeting` should call `ItalianTranslator.convert_from`, I *probably* don't want to.  That binds me to the *current* implementation.

---

### Exercise (optional): Add farewell. (15m)

Add support for farewell, for each language.  
- Decide on the functionality you want.
- Specify the requirements
- Avoid testing the implementation

---

## It depends (10m)

All of these "rules"come with the caveat, "If it makes more sense to break the rules.  Break them."

For instance, if ItalianTranslator utilized a 3rd party, external service, I probably just want to check that I am calling it correctly.  And that's where mocks and stubs come in.

## Mocks & Stubs
Sometimes our Unit Under Test must interact with other object.  If these objects are difficult to setup or their response may be slow or non-deterministic -- like an external service that we contact via te internet.  It can make sense to mock out the other object, to create a "fake" object that supports the interface you need but returns a fixed, expected value.  This makes your component examples independent of other components.
- You can use mock objects the replace the entire object, just supporting the interface you need (the methods and attribute that your Unit Under Test actually interacts with).
- You can stub specific methods on "real" objects to let them return whatever you like.

Earlier, I passed in `TranslatorItalian` and I called the `convert_from` method on it.  If that was a service somewhere else on the web, then my unit tests probably do not wan tot call it.
---

### Mock Example

``` ruby
# create mock object that will act like my 3rd party translator
translator = instance_double("ItalianTranslator")
# make this double *support* the method I need AND return the value I want.
allow(translator).to receive(:convert_from).and_return("Ciao, mi chiamo Tony.")
# is the same as...
allow(translator).to receive(:convert_from) { "Ciao, mi chiamo Tony." }
```

So then when I use this *mock* in my tests, `tony` returns the phrase I expect and I can test that I process that result correctly.

---

## Conclusion (10m)

### Review

1. The practice of TDD provides a safety net of regression tests and tends to improve `______________`.
2. What is the TDD Mantra?  Explain each step.
3. What 2 commands are used to indicate what we are testing now?
4. Why is isolating tests a good practice?
5. What are the two main categories of things we test for?  And how do they differ?
6. What is the downside of testing internal implementation?


### TATFT

The ruby community drank the testing koolaid.  We've felt the benefits.  Rails was the first web framework that supported testing out of the box.  The generators create a skeleton test, encouraging you to get in there and fill it out.

Every single person that comes in here to talk to you - from alumni to seasoned veteran - espouses the importance of testing.  It's a learning curve.  It will be slow... at first.  Stick with it.  Keep at it.  Climb that curve.  Impress your interviewers.

---

## Homework:

Scoring a Scrabble game.
Break it into small pieces and have pairs iterate, then switch pairs and repeat.

https://github.com/ga-dc/scrabbler

---

## Want more? Need clarification?

There are plenty of exercises in TestFirst.org.  We recommend a path in [Learn Ruby via RSpec]( https://github.com/ga-dc/learn_ruby_via_rspec)

---

## References:
- ["The RSpec Book", David Chelimsky](https://pragprog.com/book/achbd/the-rspec-book).  It's a little dated (as most tech. book are), but full of wisdom.
- [Magic Tricks of Testing - Sandi Metz](https://www.google.com/search?client=safari&rls=en&q=sandi+metz+magic+trick+of+testing&ie=UTF-8&oe=UTF-8)

---

## Additional Resources

- [Code School RSpec](https://www.codeschool.com/courses/testing-with-rspec)
- [RSpec for Newbies](http://code.tutsplus.com/tutorials/ruby-for-newbies-testing-with-rspec--net-21297)
- Mocks & Stubs]
  - https://www.relishapp.com/rspec/rspec-mocks/docs
  - http://www.martinfowler.com/bliki/TestDouble.html
- RSpec Cheatsheets:
  - https://www.anchor.com.au/wp-content/uploads/rspec_cheatsheet_attributed.pdf

## Review Answers
---

1. design/architecture/maintainability.
2. Red, Green, Refactor.  We write a test that fails, indicating that the freature is not supported.  Then, we adjust code until it passes (turns Green).  Lastly, we refactor our app using the knowledge we gained from supporting the spec.
3. `describe` and `context`
4. It ensures our tests are stable, eliminates confusing dependencies, and minimizes "flickering" tests.
5. Queries and Commands.  For Queries we verify return values, while we check side-effects for Commands.
6. Testing internal implementation makes it really hard to refactor away from that implementation.
