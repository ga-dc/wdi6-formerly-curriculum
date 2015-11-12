# RSpec

## Learning Objectives
- List benefits of unit testing, both to the creation process and to the collaboration process
- Describe the difference between `context`, `describe`, and `it`
- Describe the difference between `let`, `before(:each)`, and `before(:all)`
- Plan the creation of a project by reducing it to a series of unit tests
- Contrast unit tests and functional tests
- Add specs to an existing Sinatra app
- Define Test-Driven Development and give an example of why it's useful

## Why learn this?

We've been using the "Sinatra Reloader" gem pretty much since we first touched Sinatra.

#### Why?

> Pretty obviously: it's super-annoying to have to quit and restart Sinatra all the time!

You know what else is super-annoying? Every time you change the "POST" route of Tunr or Sinatra, even just a little bit, you have to go back to `localhost:4567/artists/10/edit` *again*, fill in the form *again*, click "submit" *again*, read the error message *again*, restart Pry *again*...

Whether or not you noticed, you're spending a **lot** of time just checking to see if your app works. That's time that could be spent adding new features, or even sleeping, Heaven forbid.

*Life doesn't have to be this way.*

Wouldn't it be nice if there was something that would do all that testing for you? Maybe you could just type on command into your Terminal and it would show you everything that works and everything that doesn't?

## Where are we headed?

We're going to end up with something like this:

```rb
describe Apartment do
  it "has the class Apartment" do
    apartment = Apartment.new
    expect(apartment).to be_a(Apartment)
  end
  it "has a String for an address" do
    white_house = Apartment.new(address: "1600 Penn Ave")
    expect(white_house.address).to be_a(String)
  end
  describe "#add_tenant" do
    context "when the number of tenants" do
      context "is less than the number of beds" do
        it "adds a tenant" do
          apartment = Apartment.create(num_beds: 3)
          apartment.add_tenant("alice")
          apartment.add_tenant("bob")
          expect(apartment.tenants.count).to eq(2)
        end
      end
      context "is equal to the number of beds" do
        it "does not add a tenant" do
          apartment = Apartment.create(num_beds: 3)
          apartment.add_tenant("alice")
          apartment.add_tenant("bob")
          apartment.add_tenant("carol")
          apartment.add_tenant("don")
          expect(apartment.tenants.count).to eq(3)
        end
      end
    end
  end
end
```

Q. What in there looks familiar?
---


Q. What does `expect(apartment.tenants.count).to eq(3)` mean in regular English?
---

## Set-up

In your `wdi/sandbox` directory:

```sh
$ git clone git@github.com:ga-dc/landlord.git
$ cd landlord
$ git checkout rspec
```

This is a non-Sinatra version of Landlord -- just the ActiveRecord models.

Now let's get the database set up:

```sh
$ bundle install
$ createdb landlord_rspec
$ psql -f db/landlord_schema.sql -d landlord_rspec
```

Now we're ready to rock. Check out this bit from the `readme.md`:

> Define an instance method `add_tenant` on the Apartment class that allows you to add tenants to an existing apartment. Do not add the tenant to the apartment if the number of tenants would exceed the number of beds

If you take a look at `models/apartment.rb`, you can see that this has been defined for us. It's a pretty simple method, so it makes a great candidate for the first test we're going to write.

### Install RSpec

We're going to do some stuff now that you haven't seen before. I want to walk through it first, and then explain what everything is afterward.

The first thing we'll do is install a gem called RSpec. To do this, just add `gem 'rspec'` to the `Gemfile`:

```rb
source "https://rubygems.org"

gem "activerecord"
gem "pg"
gem "rspec"
```

Then, in your Terminal:

```sh
$ bundle install
$ rspec
```

After running `rspec`, you should get a message saying "No examples found." When it says "examples", it means "tests". It's saying, "You haven't written any tests for me to run!"

### Set up the directory

Now, create a folder called `spec`, and a file called `apartment_spec.rb`:

```sh
$ mkdir spec
$ touch spec/apartment_spec.rb
```

"Spec", like "examples", basically means "tests". We're going to put some tests inside this file.

This file requires both the `rspec` gems and the `active_record` gems.

Q. How would you include those two gems in this file?
---

> Require the files that contain the code:

```rb
require "rspec"
require "active_record"
```

This file also needs to know how to connect with the database, and it needs to know about the apartment and tenant models.

Q. How would you connect the file to the database and models?
---

```rb
require_relative "../config/connection"
require_relative "../models/apartment"
require_relative "../models/tenant"
```

To make sure everything's set up properly, run `rspec` again. You should still get "No examples found." If you get anything else, something was set up incorrectly.

### Writing the first tests

We're writing tests that describe the Apartment class. So, after all your `require` lines, write:

```rb
describe Apartment do
```

...and remember, every `do` needs an `end`. Add it.

We're going to write a simple test just to make sure a new Apartment has the class of Apartment... which, of course, it will, but that's OK!

```rb
require "rspec"
require "active_record"
require_relative "../config/connection"
require_relative "../models/apartment"
require_relative "../models/tenant"

describe Apartment do
  it "has the class Apartment"
end
```

Save the file, and run `rspec` again.

Now you should get a message in your Terminal like:

```plain
$ rspec
*

Pending: (Failures listed here are expected and do not affect your suite's status)

  1) Apartment has the class Apartment
       # Not yet implemented
            # ./spec/apartment_spec.rb:8

Finished in 0.00088 seconds (files took 0.61795 seconds to load)
1 example, 0 failures, 1 pending
```

Wow! That's different! This is a list of all the tests we've written. Right now, that's a grand total of one.

There are a couple things to point out here.

- "Not yet implemented"
  - That means that this test doesn't actually test anything yet. Clearly it doesn't -- we just wrote some English, we didn't write any actual code.
- The file and line number
  - This shows the line on which that particular test is found.
- `1 example... 1 pending`
  - "Pending" is another way of saying "not yet implemented", and "example" is another way of saying "test".

Let's add another pending test:

```rb
describe Apartment do
  it "has the class Apartment"
  it "has a String for an address"
end
```

Q. Run `rspec` again. Anything crazy going on?
---

You might have noticed when we ran `rspec` before that there was a little asterisk `*` at the top of the message, and now there are two `**`. This indicates two pending tests.

### It...do

Now add `do` at the end of the first `it` line. Remember, each `do` needs an `end`!

```rb
describe Apartment do
  it "has the class Apartment" do

  end
  it "has a String for an address"
end
```

Q. Run `rspec` again. What's different?
---

> Now there's only one pending test.

Instead of two asterisks `**`, you should see a dot and an asterisk `.*`, and something saying `2 examples, 0 failures, 1 pending`.

Adding `do...end` makes RSpec think this test is an actual test -- not pending anymore. There's no malfunctioning code inside this test, so RSpec is saying it passes. Asterisk `*` indicates a pending test, and dot `.` indicates a passing test.

## Formatting the output

Pass the "format" flag to the rspec command:

```
rspec --color --format documentation
```  

The default format is "progress", it's designed to show the result of many tests, concisely.  Until we have a bunch of tests, I prefer the "documentation" format.  It helps me to ask the right questions.  You can run it with the shorthand, `rspec -c -fd`.

If you prefer this as your default, you can add it to RSpec's configuration file, `~\.rspec`.  Here's mine:

```
--color
--format documentation
```


## Actually testing something

Let's make these tests actually test something. Inside the first test, make (but don't save) a new Apartment and save it to a variable.

```rb
it "has the class Apartment" do
  apartment = Apartment.new
end
```

Now, let's tell the test that we expect that new apartment to be an apartment:

```rb
it "has the class Apartment" do
  apartment = Apartment.new
  expect(apartment).to be_a(Apartment)
end
```

Run `rspec`. The test should still pass.

Read that new line to yourself. We literally wrote "expect apartment to be a apartment". This is totally proper English, except for us using "a" instead of "an"!

...but it's code! The methods that come built-in with RSpec were created in such a way that tests look as English-y as possible.

Now let's make the test **fail**. Let's say we "expect apartment to be a Integer":

```rb
it "has the class Apartment" do
  apartment = Apartment.new
  expect(apartment).to be_a(Integer)
end
```

Run `rspec` and... You got an F! See how it says `F.` with a dot after it? That indicates you have one failing test, and one passing test.

Whenever a test fails, RSpec will put an error message after that test which should give you an idea of why it failed. This message is a little complicated, so let's create a simpler one.

Change the line to:

```rb
expect(apartment.class.to_s).to eq("Integer")
```

Now we're saying, "the name of the apartment's class should equal 'Integer'".

Run `rspec`. This new message is easier to read:

```
expected: "Integer"
  got: "Apartment"
```

On top is what we expected the apartment's class to be; on the bottom is what RSpec actually got when it ran the code.

### The second test

Now we'll change the first test so it passes again, and make the second test pass:

```rb
require "rspec"
require "active_record"
require_relative "../config/connection"
require_relative "../models/apartment"
require_relative "../models/tenant"

describe Apartment do
  it "has the class Apartment" do
    apartment = Apartment.new
    expect(apartment).to be_a(Apartment)
  end
  it "has a String for an address" do
    white_house = Apartment.new(address: "1600 Penn Ave")
    expect(white_house.address).to be_a(String)
  end
end
```

### Moar tests

Finally, we'll test what we originally came here to test, which was the `add_tenant` method.

Replace your tests with this:

```rb
describe Apartment do
  describe "#add_tenant" do
    context "when the number of tenants" do
      context "is less than the number of beds" do
        it "adds a tenant"
      end
      context "is equal to the number of beds" do
        it "does not add a tenant"
      end
    end
  end
end
```

Crazy, right? Breathe, and let's go through it a bit at a time.

You can **nest** as many `describe` blocks as you want. What's the purpose? Just to lump together some tests. **It doesn't affect the code at all.** It's purely to keep things organized visually.

Also, **`context` does literally the exact same thing as `describe`**. They're identical. RSpec makes no difference between them. So why have both? To make your tests more readable from an English standpoint. You can see here I'm using `describe` for when I'm talking about specific objects or methods, and `context` when I'm talking about, well, different contexts. If I replace `describe` with `context`, and vice-versa, the tests will run the exact same way.

**RSpec is all about making tests easy to read from an English standpoint.**

The hash `#` in front of `add_tenant` also doesn't do anything -- it's just what programmers usually use to indicate that something is a method, in the same way they use `$` to indicate a command you should enter in the terminal.

The only things on here that are actual tests are the `it` lines.

**`describe` and `context` are not tests; they just help organize them. Only `it` is a test.**

`it` also is **childless**. `it` cannot have any `describe`, `context`, or `it` blocks inside it.

Now run `rspec`. You should get:

```
  1) Apartment#add_tenant when the number of tenants is less than the number of beds adds a tenant
     # Not yet implemented
     # ./spec/apartment_spec.rb:11

  2) Apartment#add_tenant when the number of tenants is equal to the number of beds does not add a tenant
     # Not yet implemented
     # ./spec/apartment_spec.rb:14
```

Going along with the theme of readability, RSpec takes what we wrote and condenses it into sentences.

### Making the `#add_tenant` tests pass

```rb
require "rspec"
require "active_record"
require_relative "../config/connection"
require_relative "../models/apartment"
require_relative "../models/tenant"


describe Apartment do
  describe "#add_tenant" do
    context "when there is room (<= the number of beds)" do
      it "adds a tenant" do
        apartment = Apartment.create(num_beds: 3)
        apartment.add_tenant("alice")
        apartment.add_tenant("bob")
        expect(apartment.tenants.count).to eq(2)
      end
    end

    context "when it is full (tenants == number of beds)" do
      it "does not add a tenant" do
        apartment = Apartment.create(num_beds: 3)
        apartment.add_tenant("alice")
        apartment.add_tenant("bob")
        apartment.add_tenant("carol")
        apartment.add_tenant("don")
        expect(apartment.tenants.count).to eq(3)
      end
    end
  end
end
```

### DRYing it up

#### Which lines on here repeat?

Usually, you're going to have a whole bunch of tests that all do very similar things. Writing `apartment = Apartment.create` a bunch of times would get tiresome.

Swap out your code with this:

```rb
describe Apartment do
  describe "#add_tenant" do
    before(:each) do
      @apartment = Apartment.create(num_beds: 3)
      # we start with 2 tenants (3 bedrooms)
      @apartment.add_tenant("alice")
      @apartment.add_tenant("bob")
    end

    context "when there is room (<= the number of beds)" do
      it "adds a tenant" do
        @apartment.add_tenant("Third tenant")
        expect(@apartment.tenants.count).to eq(3)
      end
    end

    context "when it is full (tenants == number of beds)" do
      it "does not add a tenant" do
        @apartment.add_tenant("Third tenant")
        @apartment.add_tenant("One too many")
        expect(@apartment.tenants.count).to eq(3)
      end
    end
  end
end
```

What changed? We moved the `Apartment.create`, `alice`, and `bob` into a `before:each` block.  Since the local variable is not available across methods, we converted `apartment` to an instance variable (with `@`). This change also encouraged us to clarify the "third" and "extra" tenant.

Run `rspec`. It should still work.

#### Change the `:each` to `:all`. Run `rspec`. What's different?

**before:each** is a block of code that runs *before each* test inside it. Try adding a `puts "*" * 50` inside `before:each`, then running `rspec`. You should see two lines of asterisks pop up.

**before:all** is the same concept, except it only runs **once**, *before all* the tests inside it have started.

### `before` vs `let`

Now replace the code with this:

```rb
describe Apartment do
  describe "#add_tenant" do
    subject(:apartment) do
      apartment = Apartment.create(num_beds: 3)
      # we start with 2 tenants (3 bedrooms)
      apartment.add_tenant("alice")
      apartment.add_tenant("bob")
      apartment # return the apartment
    end

    context "when there is room (<= the number of beds)" do
      it "adds a tenant" do
        apartment.add_tenant("Third tenant")
        expect(apartment.tenants.count).to eq(3)
      end
    end

    context "when it is full (tenants == number of beds)" do
      it "does not add a tenant" do
        apartment.add_tenant("Third tenant")
        apartment.add_tenant("One too many")
        expect(apartment.tenants.count).to eq(3)
      end
    end
  end
end
```

What changed?  We've identified that "apartment" is the "subject under test", converting the instance variable (@apartment) into the "subject" helper.  This method takes a name (:apartment) and block of code that returns the subject (a new Apartment with tenants).  It provides a method, named "apartment", that we now use throughout our spec.  

This is a way of ensuring the subject is available in every test, just like `before:each` and `before:all`. What's the difference? `subject` is semantic.

Interestingly, we could also replace each use of "apartment" with "subject".

### `let`

RSpec also provides a "let" helper, which works the same way.  You can use it to identify other important components of the specification.

### One big happy family

As you can see, you can have `subject`, `let`, and `before:each` right next to each other.

## The Database

Let's check out something in PSQL:

```sh
$ psql
$ \c landlord_rspec
$ SELECT * FROM tenants;
```

Wow! That's a boatload of tenants! When you use `Apartment.create` or `apartment.tenants.create` in RSpec, it *actually creates data in your database*. For this reason, it's almost always a good idea to have a separate database for your RSpec stuff. (That's why we created a `landlord_rspec` database for this instead of just using your existing `landlord` database.)

## The Flow

Most testing frameworks, including RSpec, follow this flow:

- Setup
- Run
- Teardown

Each spec should run in isolation.  

Notice, these tenant specs are very particular about how many tenants are in the apartment. If they didn't run in isolation, the "full" apartment would end up with multiple "Third tenant".

We setup this spec, using "subject".  It is recreated for each spec (`it/do`).  And, if there is a teardown, it would be run next.  Our teardown here, is that all variables go out scope.  Everything starts fresh.

# Unit testing

RSpec is intended for unit testing. The other type of testing is functional testing. We may visit that later on in the course.

The difference is that "unit tests tell a developer that code is doing things right; functional tests tell a developer that code is doing the right things."

The "units" in unit tests are individual methods. Unit tests are intended to test small, little blocks of code, and make sure a specific input results in a specific output. A good unit test should **not be more than 5 lines long**.

Functional tests have a much wider focus. You'd use functional testing to make sure a sign-in form works, or that a user who doesn't have admin privileges can see this page, while a user who does have admin privlieges can see that page.

Unit testing always should come before functional testing. Functional testing is much less crucial. Unit testing is so important, that...

## Employers give you major bonus points for it

You'll see the term **test coverage** pop up pretty often. People are always aiming for "100% test coverage". If your app has 100% test coverage, that means every single method in your app has a unit test verifying that it works.

For instance, while it's easy and free to write Salesforce apps, Salesforce will only add your app to its "app store" if you've obtained 100% test coverage, and Salesforce's developer team can run your tests and have them all pass.

#### What are the reasons testing is so important? Why would employers love it so much?

# Writing tests

We've asked you to write user stories. Writing unit tests is a very similar process.

When we think of "testing" we tend to think of something you do *after* you've created something. With unit tests, you're encouraged to write the tests *first* before you even start writing actual code.

#### Turn and talk

> Why would you write tests beforehand? Come up with as many reasons as you can. To get started, imagine if instead of a `readme.md` for Landlord you'd been given just the following in a `spec.rb` file:

```
describe Apartment do
  it "has the class Apartment"
  it "has a String for an address"
  describe "#add_tenant" do
    context "when the number of tenants" do
      context "is less than the number of beds" do
        it "adds a tenant"
      end
      context "is equal to the number of beds" do
        it "does not add a tenant"
      end
    end
  end
end
```

### TDD

You've probably already run into the situation of not knowing when an app is "done". You've also probably started an assignment or project only to find there are an overwhelming number of things to do. Then, on top of that, you have all that by-hand, manual testing to do as you make your app.

When you write tests first, you're creating a tidy little checklist for yourself of things to complete. The **goal of unit tests** is that **when all of the tests pass, your app is complete**.

You're used to thinking the other way around: when the app is complete, all the tests should pass. Writing the tests first forces you to think about what an app really *needs* to do to be complete. It forces you to scope things down to your MVP. It forces you to think of your app as a bunch of little pieces, rather than one big behoemeth.

This process of writing the tests **first** is called **Test-Driven Development**, or TDD.

In short: writing out unit tests, even if you just leave them pending, will make this class much easier, and make you look super-marketable.

### Planning with TDD

#### When you were planning Project 1, how did you do it?

Next time you find yourself writing a list of things your app should do, or writing out user stories, or *any* sort of list, try writing that list using the `describe`, `context`, `it` syntax. Even if you never actually write the code that makes these tests pass, this is an extremely effective way of planning that looks really impressive.

We use RSpec to test GArnet, the attendance/homework tracking app. Before any changes get pushed up to our live server, they have to pass all the tests -- an automated system rejects the changes if they don't pass.

[Here's what that looks like. Seem familiar?](https://travis-ci.org/ga-dc/garnet/builds/89503768#L241) Clearly there are a lot of tests that are just pending and don't do anything yet -- almost 60! These dramatically help us plan.

### You do

[Watch this video.](https://www.youtube.com/watch?v=E2evC2xTNWg)

Split up into groups of 4. For 15 minutes, on a whiteboard, work with your group to draft the unit tests for this cereal-delivering robot.

Your goal: When all the tests pass, that mean the robot works. However, you're only writing **pending** tests -- don't actually write the code that would make the tests pass.

Constraints: Try to write everything as `describe`, `context`, and `it` blocks. Method names should start with `#`.

## RSpec tricks

### rspec --init

When you look at repos with RSpec inside them, you're likely to see two files we don't have right now: `.rspec` and `spec_helper.rb`. These files are generated by running RSpec's built-in file generator.

Go back to your `wdi` folder, and create a new directory. It doesn't matter what it's called. `cd` into that directory.

Then, run `$ rspec --init`. This should make those two files. Take a look at `.rspec`. It should have very little in it. Now, take a look at `spec_helper.rb`. It has much more inside. Both of these files are configuration files. Neither of them are necessary unless you want to configure RSpec a certain way.

### rspec -f d

Go back to the `landlord` folder we've been working in today. We're going to run `rspec` again, but this time we're going to give it some additional parameters. Run:

```sh
$ rspec --color -f d
```

This prints out all of your tests in a nicer format with colors. The `-f d` prints out your tests in a nice outline format. Before, The only sentences printed out were pending or failed tests.

Green tests have passed, red have failed, and yellow tests are pending. You may hear us say "Red, Green, Refactor". This is sort-of the mantra of TDD: write tests before you write code ("red" because the tests won't pass without any code), then write the code to make them pass (and turn green), then refactor that code.

You can also print out your tests as HTML. Try running:

```sh
$ rspec -f h -o tests.html
```

The `-f h` says "print this out has HTML", and the `-o` says into which file you want it to be printed. Try opening up that file in Chrome!

### You do: GArnet users

We're going to use a repo pulls some of the User tests and methods from Garnet:

[rspec-user-practice](https://github.com/ga-dc/rspec-user-practice)

You can check out Garnet [here](https://github.com/ga-dc/garnet/tree/master/spec).

Fill in the blanks on the `user_spec.rb` file to make the tests pass!

### You do: Purrspec

[Purrspec](https://github.com/ga-dc/purrspec)

# For example

```rb
describe Model do
  let(:variable) do value end
  before(:all) do
    @variable = value
  end
  before(:each) do
    puts "Hello!"
    @variable = value
  end

  describe "#method" do
    context "some condition" do
      it "should return this" do
        expect(@variable).to eq(value)
      end
    end
    it "should have this class" do
      expect(#method).to be_a(Class)
    end
  end

  it "should not be in this array" do
    expect([array]).to_not include(value)
  end

  describe "#attributes" do
    it "should all be this class" do
      expect([#attributes]).to all(be(Class))
    end
    it "should have the same values as this array" do
      expect([#attributes]).to match_array([array])
    end
  end
end
```
