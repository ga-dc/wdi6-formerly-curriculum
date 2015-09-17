# Metaprogramming

## Learning Objectives

* Define metaprogramming and list some benefits
* Define reflexivity in the context of Metaprogramming
* List common ways to perform metaprogamming in ruby:
  * `eval`
  * `define_method`
  * `method_missing`
  * `send`
* Blow your minds by thinking about quines

## Outline

**Metaprogramming** - computer programs with the ability to treat programs as their data.

This term encompasses quite a few different scenarios... some examples might include:
* Code that reads other program source and tries to understand it
  * e.g. vulnerability scanners, code quality analysis tools
* Code that generates a new program (writes source code)
  * e.g. macros and script writers
* Code that can `introspect` (read) information about itself. Examples include `Object.keys(some_object)` in JS.
* Running dynamically generated text as code (e.g. taking user input as code)
* A program modifying its own source code / state at run-time

The ability of a programming language to inspect / modify itself (rather than
just read or write code relating to a different program) is called reflection or
reflexivity.

Today we're going to give a quick survey of few different techniques in ruby, to
illustrate the types of metaprogamming available, and some use cases.

### 1. eval

One of the simplest examples of metaprogramming (that actually works in both
ruby and JS) is `eval()`. `eval` is a method that takes a string as input, and
*evaluates* that string as code.

```ruby
eval("1+1") # outputs 2

puts "type some code you'd like to run:"
code_to_run = gets.chomp
eval(code_to_run) # this is dangerous!
```

It's really interesting, and sorta-cool, but here's a tip... don't ever do it!

1. Improper use of eval opens up your code for injection attacks
2. Debugging can be more challenging (no line numbers, etc.)
3. eval'd code executes more slowly (no opportunity to compile/cache eval'd code)

```js
//bad!
function isChecked(optionNumber) {
    return eval("forms[0].option" + optionNumber + ".checked");
}

var result = isChecked(1);

//better
function isChecked(optionNumber) {
    return forms[0]["option" + optionNumber].checked;
}

var result = isChecked(1);
```

### 2. define_method

Consider ActiveRecord's dynamic finder methods...

```ruby
class Artist << ActiveRecord::Base
end

Artist.find_by_nationality("USA")
Artist.find_by_age(27)

Artist.find_by(:age, 27)
```

Do you think ActiveRecord has a pre-defined method called `find_by_nationality()`
or `find_by_age()`?
Nope, or course not! How could they predict all the possible `find_by` methods
we'd need?

Instead, there's some metaprogramming going on!

Here's a simple example of how `define_method` can be used, then we'll consider
how it's used in ActiveRecord.

```ruby
["hello", "goodbye", "sup"].each do |word|
  define_method "say_#{word}" do
    puts word
  end
end

def say_hello
  puts "hello"
end
def say_goodbye
  puts "goodbye"
end
def say_sup
  puts "sup"
end
```

#### Exercise: AR Dynamic Finders

Try writing some psuedo-code to generate the dynamic finders in AR.

Tip:
```ruby
Post.attribute_names # returns [ "id", "title", "content", "author_name" ]
```

**Solution**
```ruby
Post.attribute_names.each do |attr|
  define_method "find_by_#{attr}" do |value|
      where("#{attr} = ?", value)
  end
end
```

### 3. method_missing

`method_missing` is like a chain-saw. It's super powerful, but if you're not
careful, you'll hurt yourself!

`method_missing` is a method that you define, that says what to do when you call
a method on an object, and that method is not defined.

example:

```ruby
class Dog
  def bark
    puts "bark!"
  end
end

fido = Dog.new
fido.bark
fido.roll_over # NoMethodError!
```

But with the power of method_missing:
```ruby
class Dog
  def bark
    puts "bark!"
  end

  def method_missing(method_name, *args)
    puts "I'm not a smart dog, I don't know how to #{method_name} :("
    super
  end
end

fido = Dog.new
fido.bark
fido.roll_over # "I'm not a smart dog, I don't know how to roll_over :("
fido.read_sartre # "I'm not a smart dog, I don't know how to read_sartre :("
```

When you call a method on ruby, Ruby looks for a method defined:

1. On the object directly (singleton methods, outside the scope of this lesson)
2. On the object's class
3. On the object's ancestor classes (all the way up to the BasicObject class)
4. The same process, but this time looking for `method_missing` defined

### 4. send

`send` in ruby allows us to call a method on an object using the name of the
method as **data** (i.e. a string or symbol):

```ruby
my_string = "hello"
my_string.send(:upcase)   # "HELLO"
my_string.send("upcase")  # "HELLO"

puts "what would you like to do to this string?"
method_the_user_wants_to_run = gets.chomp

my_string.send(method_the_user_wants_to_run) # 'olleh' or maybe "Hello"
```

#### Example: Walkthrough the document undo code

See `ex_document_undo/lib`

Demonstrate slowness of naive implementation.

#### Exercise: How might 'send' help us implement undo?


### quines

**Quine** - A program that generates it's own source code (without cheating by
printing itself out).

These are more of an academic exercise than anything, they're not really useful
in real-world programming. But they sure are fun to think about!

#### Ruby Example

```ruby
def quine_method;"def quine_method;;end;puts quine_method()[0, 11] + 34.chr + quine_method + 34.chr + quine_method()[11, quine_method.length-11]";end;puts quine_method()[0, 17] + 34.chr + quine_method + 34.chr + quine_method()[17, quine_method.length-11]
```

re-formatted for readability:
```ruby
def quine_method
  "def quine_method;;end;puts quine_method()[0, 11] + 34.chr + quine_method + 34.chr + quine_method()[11, quine_method.length-11]"
end

puts quine_method()[0, 17] + 34.chr + quine_method + 34.chr + quine_method()[17, quine_method.length-11]
```

#### Crazy Quine Examples

* [A quine that cycles through 100 languages!](https://github.com/mame/quine-relay)
* [A quine that cyles printing itself with an animation of the globe](http://d.hatena.ne.jp/ku-ma-me/20100905/p1)
* [A screencast of that last program in action](http://screencast.com/t/yyoO5UJIPif)
