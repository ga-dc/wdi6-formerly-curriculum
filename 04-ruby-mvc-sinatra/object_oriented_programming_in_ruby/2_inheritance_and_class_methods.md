### Intermediate Object-Oriented Programming in Ruby

- Explain the use of self in Ruby
- Explain the difference between local, instance and class variables
- Define and differentiate between class and instance methods
- Define inheritance in the context of OOP
- Write a Ruby class that inherits from another

## `self` in ruby

In ruby, self is very similar to `this` in Javascript, it refers to the object
the method was called on. Thankfully, however, it's much simpler in Ruby...
because methods can't be called without context (i.e. no callbacks), there's no
`bind` to worry about, `self` always equals the thing the method was called on.

### Exercise on `self` (15 minutes)

Pair up and consider the following example, specifically the `demonstrate_using_self`
method. Talk with your partner for 7 minutes and discuss what effect each line
will have, and which one is the best.

Feel free to run this code and play with it.

```ruby
class Person
  attr_accessor :name
  attr_reader :hunger_level

  def intitialize(initial_name, initial_hunger_level)
    @name = initial_name
    @hunger_level = initial_hunger_
  end

  def hunger_level=(new_hunger_level)
    if new_hunger_level < 0
      @hunger_level = 0
    else
      @hunger_level = new_hunger_level
    end
  end

  def demonstrate_using_self
    # goal is to get our person's name in the best way possible
    # GETTERS
      puts @name
      puts name
      puts self.name

    # goal is to set/update our person's hunger level in the best way possible
    # SETTERS
      @hunger_level = -10
      hunger_level = 10
      self.hunger_level = 10
  end
end
```

You can find the answers in [this file](examples/self.rb).

To sum up:
1. Always use getter/setter methods inside the class instead of instance variables.
  * exception: you can use instance variables inside getter / setter methods themselves
2. To call a *getter* method inside a class, self is optional, e.g. both `self.name` AND `name` works
3. To call a *setter* method inside a class, you MUST use self, e.g. `self.color = red`

## Class vs Instance Review (5 minutes)

It's important to reiterate the difference between the class, and instances
created from that class:

* A class' name is capitalized , e.g. `Person`, and is a template for objects of that class.
* An instance is one specific object created using a class, e.g. `bob = Person.new("Bob", 10)`


## Class vs Instance Methods and Variables (10 minutes)

### Class vs Instance vs Local Variables

Local variables:
  * plain vanilla names, e.g. `current_age`, `favorite_color`
  * only valid in the current method (limited scope)
  * used for temporary values in a class

Instance variables:
  * start with an `@`, e.g. `@name`
  * each instance gets it's own copy (used to store properties/attributes)
  * can be used in any instance method in the class
  * very common in ruby

Class Vars:
  * start with 2 `@`s, e.g `@@person_count`
  * one copy shared between all instances
  * **not very common**, over-use is considered bad practice

### Class vs Instance Methods
Ruby classes can define two types of methods, *instance* and *class* methods. So
far, we've only written instance methods.

* *instance methods* - called on on single instances
* *class methods* - called on the class, deal with the set of objects.

**Examples**

* Instance
  * `adam.speak`
  * `adam.age = 41`
  * `bob.speak`
  * `ferrari.start`
  * `gorilla.eat("banana")`
* Class
  * `Person.new`
  * `Monkey.new`
  * `Monkey.feed_all("banana")`

Instance and Class methods are both common, and ok to use (unlike class
variables, which should be used sparingly).

### Defining class vs instance methods

```ruby
# person6.rb
class Person
  attr_accessor :name
  @@person_count = 0 # class variable

  def initialize(initial_name)
    @@person_count += 1
    @name = initial_name
  end

  # instance method, just like we've seen before
  def introduce
    puts "Hello, I'm #{name}, one of #{Person.person_count} people"
  end

  # class method, notice the `self` in the definition, which refers to the
  # Person class
  def self.person_count
    return @@person_count
  end

end
```

### Exercise (10 minutes)

**[Application Config Class in Ruby](https://github.com/ga-dc/ruby_application_configuration)**

### Turn & Talk (5 minutes)

3 minutes to discuss:

* Can we use instance variables in class methods?
* Can we use class variables in an instance method?

* Can we call instance methods in class methods?
* Can we call class methods inside an instance method?


Answers:
* No, ruby wouldn't know which instance's value to use.
* Yes, the one copy is shared, and all instances can access.

* No, again, instance methods depend on being called on a specific instance,
  class wouldn't know which to choose.
* Yes, the method is shared, and can be used by all instances.


## Inheritance

Just like we get traits from our parents, we can use a feature called
**inheritance** to create multiple classes (children) that share properties and
methods from their parents.

You won't need to write parent / child classes much in this class, but we will
use inheritance to give some of our classes additional functionality, especially
with rails in a few weeks.

Here's an example:
```ruby
class Person
  attr_accessor :name
  attr_reader :hunger_level

  def intitialize(initial_name, initial_hunger_level)
    @name = initial_name
    @hunger_level = initial_hunger_
  end

  def introduce
    puts "Hello, I'm #{name}"
  end

  # Custom setter for hunger_level
  def hunger_level=(new_hunger_level)
    if new_hunger_level < 0
      @hunger_level = 0
    else
      @hunger_level = new_hunger_level
    end
  end

end

class LoudPerson < Person
  def introduce
    puts "HELLO, I'M #{name.upcase}"
  end
end

adam = Person.new("Adam", 10)
bob = LoudPerson.new("Bob", 10)

puts bob.name
puts bob.introduce

bob.hunger_level = 5
puts bob.hunger_level
```

# Homework

[Gladiator!](https://github.com/ga-dc/gladiator)


## Sample Questions

- Explain the use of self in Ruby
- Explain the difference between local, instance and class variables
- Define and differentiate between class and instance methods
