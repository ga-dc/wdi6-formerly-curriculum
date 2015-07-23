---

## What is RSpec?

  - RSpec is a testing framework for the Ruby programming language.  It's a Domain Specific Language for writing live specifications about your code.
  - Released on May 18, 2007

---

## What does an RSpec test look like?

~~~~ ruby
describe User do
  context 'with admin privileges' do
    before :each do
      @admin = Admin.get(1)
    end

    it 'should exist' do
      expect(@admin).not_to be_nil
    end

    it 'should have a name' do
      expect(@admin.name).not_to be_false
    end
  end

  #...
end
~~~~

---

## Getting set up

- Make sure you are in the proper directory.
- Create a file to work in called person.rb
- In the terminal:

~~~~ sh
  rspec --init
~~~~

---

## What just happened?

- We added a hidden .rspec file that puts rspec in our directory.

- We created a spec directory that will hold the files necessary for tsting with RSpec.

  - Let's look inside the spec directory.

   - spec_helper.rb

---


## Let's Play a bit.
- Create a file called person_spec.rb
  - Open person_spec.rb
    - require 'spec_helper'
    - require_relative '../person'
  - Write this into this person_spec.rb file.

~~~~ ruby
describe Person do
  before :each do
    @randy = Person.new
  end
end
~~~~

---

## Run RSpec
- In the terminal, in the proper directory
~~~~ sh
rspec
~~~~

- What happens?

---

## Code

- We need to have a class called Person

~~~~ ruby
class Person

end
~~~~

~~~~ sh
rspec
~~~~

---

## Let's write our first test

~~~~ ruby
describe "#new" do
  it "should create a new instance of class Person" do
    expect(@randy).to be_an_instance_of(Person)
  end
end
~~~~

- What code would we need to write to satisfy this test?

~~~~ sh
rspec
~~~~

---

## Code!

~~~~ ruby
class Person
  def initialize
  end
end
~~~~

---

## More tests

~~~~ ruby
describe "#say_hello" do
  it "should be expected to say offer a greeting" do
    expect(@randy.say_hello).to eql("Hola!")
  end
end
~~~~

- What code would we need to write to satisfy this test?

~~~~ sh
rspec
~~~~

---

## Code

~~~~ ruby
class Person
  def initialize
  end

  def say_hello
    "Hola!"
  end
end
~~~~

---

## More More Tests!

~~~~ ruby
describe "#verify_sentience" do
  it "is expected to not respond negatively" do
    expect(@randy.verify_sentience).to_not be(false)
  end
end
~~~~

- What code would we need to write to satisfy this test?

~~~~ sh
rspec
~~~~

---

## Code!

~~~~ ruby
class Person
  def initialize
  end

  def say_hello
    "Hola!"
  end

  def verify_sentience
    true
  end
end
~~~~

---

## All the tests!

~~~~ ruby
describe Person do
  before :each do
    @randy = Person.new
  end

  describe "#new" do
    it "should create a new instance of class Person" do
      expect(@randy).to be_an_instance_of(Person)
    end
  end #End describe #new

  describe "#say_hello" do
    it "should be expected to say say hello" do
      expect(@randy.say_hello).to eql("Hola!")
    end
  end #End describe #say_hello

  describe "#verify_sentience" do
    it "is expected to not respond negatively" do
      expect(@randy.verify_sentience).to_not be(false)
    end
  end #End describe #verify_sentience
end
~~~~

---

## Mocks & Stubs
- Stubbing and Mocking makes your component examples independent of other components.
- You can stub methods on objects to let them return whatever you like.
- And you can use mock objects to replace instances of other classes.

---

## Example

~~~~ ruby
book = instance_double("Book", :pages => 250)
allow(book).to receive(:title) { "The RSpec Book" }
allow(book).to receive(:title).and_return("The RSpec Book")

~~~~

---

## Expect an error?

~~~~ ruby
describe ValidatingWidget do
  it "fails validation with no name (using error_on)" do
    ValidatingWidget.new.should have(1).error_on(:name)
  end

  it "fails validation with no name (using errors_on)" do
    ValidatingWidget.new.should have(1).errors_on(:name)
  end
~~~~

---

## Expect an error?
~~~~ ruby
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
~~~~

---

## Exercises:

Scrabble scoring COde Retreat

Break it into small pieces and have pairs iterate, then switch pairs and repeat.


---

## Homework:

http://testfirst.org/learn_ruby

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
