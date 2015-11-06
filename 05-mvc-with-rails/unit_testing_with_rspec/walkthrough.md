# RSpec

before(:all) do
before(:each) do
let(:varname) do 3 * 3 end

describe
context
it

expect
.to
.to_not

eq != be
match_array
all(be())
be_a
include

rspec --init
rspec -f d

## Why learn this?

We've been using the "Sinatra Reloader" gem pretty much since we first touched Sinatra.

#### Why?

Pretty obviously: it's super-annoying to have to quit and restart Sinatra all the time!

You know what else is super-annoying? Every time you change the "POST" route of Tunr or Sinatra, even just a little bit, you have to go back to `localhost:4567/artists/10/edit` *again*, fill in the form *again*, click "submit" *again*, read the error message *again*, restart Pry *again*... 

Whether or not you noticed, you're spending a **lot** of time just checking to see if your app works. That's time that could be spent adding new features, or even sleeping, Heaven forbid.

*Life doesn't have to be this way.*

Wouldn't it be nice if there was something that would do all that testing for you? Maybe you could just type on command into your Terminal and it would show you everything that works and everything that doesn't?

## Code along

### Set-up

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

#### How would you include those two gems in this file?

To the beginning of this file, add:

```rb
require "rspec"
require "active_record
```

This file also needs to know how to connect with the database, and it needs to know about the apartment and tenant models.

#### How would you connect the file to the database and models?

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
landlord (rspec *+)$ rspec
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

#### Run `rspec` again. Anything crazy going on?

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

#### Run `rspec` again. What's different?

Now there's only one pending test. Instead of two asterisks `**`, you should see a dot and an asterisk `.*`, and something saying `2 examples, 0 failures, 1 pending`. Adding `do...end` makes RSpec think this test is an actual test -- not pending anymore. There's no malfunctioning code inside this test, so RSpec is saying it passes. Asterisk `*` indicates a pending test, and dot `.` indicates a passing test.

This "it...do" syntax reads a little funny. Just imagine whoever wrote this has bad grammar, and think of Oscar Gamble:

![Oscar Gamble](it_do.jpg)

### Actually testing something

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
    expect(apartment).to be_a("Apartment")
  end
  it "has a String for an address" do
    white_house = Apartment.new(address: "1600 Penn Ave")
    expect(white_house.address).to be_a(String)
  end
end
```
