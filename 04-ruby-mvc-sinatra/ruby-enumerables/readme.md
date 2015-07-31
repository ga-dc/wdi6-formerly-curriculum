### Learning Objectives
* Use Ruby loops to iterate over code blocks.
* Define what a Ruby enumerable method is.
* Identify useful Ruby enumerables, including `.each`, `.map` and `.select`.
* Use enumerables to traverse, sort and modify collections.

### Loops (30min)

Enumerables are Ruby methods that use loops to interact with data collections in special ways.
* But before we talk about enumerables, let's see how traditional loops work in Ruby...
* You will use these!

Q: What loops did we use in Javascript?
- Q: Write out in JS, convert to Ruby.
- In Ruby, we have a few more at our disposal...

#### While

Like Javascript, runs the loop while a condition is true.

```ruby
# Prints out numbers from 1 to 10
counter = 1
while( counter <= 10 ) do
  puts counter
  counter = counter + 1
end
```

#### Until

Runs the loop until a condition is true (or while that condition is false).
* Essentially the opposite of `while`

```ruby
# Prints out numbers from 1 to 10
counter = 1
until( counter > 10 ) do
  puts counter
  counter += 1
end
```

#### For

Similar to Javascript's for-in loop
* Don't need to end loop-opener with `do`.
* The `i`'s in the below examples can be replaced with any variable (e.g., `number`)

```ruby
# Prints out numbers from 1-10
numbers = [1,2,3,4,5,6,7,8,9,10]
for i in numbers
  puts i
end

# Can also do this using a range
for i in (1..10)
  puts i
end
```

#### Times

Runs a loop a set number of times

```ruby
# Says "Hello!" five times
5.times do
  puts "Hello!"
end

# If you use an iteration variable, automatically increments it for each loop.
5.times do |i|
  puts i
end
# => 1
# => 2
# => 3
# => 4
# => 5
```

#### Break

`break` lets us end -- or "break" out of -- a loop.
* Q: What numbers do you expect to see on the screen when we run this `for` loop?

```ruby
numbers = [1,2,3,4,5,6,7,8,9,10]
for number in numbers
  puts number
  if number == 5
    break
  end
end
```

#### Next

`next` lets us skip to the next iteration of a loop.
* Q: What numbers do you expect to see on the screen when we run this `for` loop?

```ruby
numbers = [1,2,3,4,5,6,7,8,9,10]
for i in numbers
  if i%2 == 0
    next
  else
    puts i
  end
end
```

### Loops Exercise: 99 Bottles of Beer (10min)

You know how the song goes...
* "99 bottles of beer on the wall. 99 bottles of beer. Take one down. Pass it around. 98 bottles of beer on the wall."
* "98 bottles of beer on the wall. 98 bottles of beer..."

...and so on. Your job is to replicate the song in its entirety 4 times, each time using one of the loops we just went over: `while`, `until`, `for` and `times`.

**BONUS:** Use `next` so that the song only covers odd numbers.

### Enumerables

#### What Are Enumerables?

Ruby's Enumerable methods allow us to traverse, search and sort data collections (i.e., arrays and hashes).
* [Documentation](http://ruby-doc.org/core-2.2.2/Enumerable.html)

#### Useful Enumerables

##### Each (20min)

The king of enumerables, and the one you will most likely be using the most.
* Iterates through and performs an action(s) on a collection.
* Does not permanently modify the collection.

If we were to emulate `.each` using plain ol' Ruby, it would look something like this...

```ruby
# A loop that prints out the doubled value of each item in an array
numbers = [ 1, 2, 3, 4, 5 ]
for number in numbers
  puts number * 2
end
```

But `.each` looks like this, using the code block format...

```ruby
numbers = [ 1, 2, 3, 4, 5 ]
numbers.each do |number|
  puts number * 2
end

# Alternate syntax
numbers = [ 1, 2, 3, 4, 5 ]
numbers.each { |number| puts number * 2 }
```

**DIAGRAM:** EACH

###### Code Block Format

**WHITEBOARD:** You'll notice we wrote out the `.each` example in two ways: multi-line and single-line.

Multi-line
* `.each` - method name
* `do` - keyword that begins block of code
* `|number|` - iteration variable; represents an individual value in the array
  - Common syntax is to name the variable the singular version of the collection. In this case, use `number` for `numbers`.
  - Some enumerables may have more than one of these.
* `end` - closes code block

Single-line
* `.each` - method name
* { } - replaces `do` and `end`; contains the iteration variable and code block
* `|number|` - iteration variable

#### Exercise: Practice Each (10min)

Use `each` to do the following...  

* Say hello to everybody in the below array of names (sample output: `Hello [person's name]!`).

```ruby
names = [ "Brian", "Chad", "Yakko", "Wacko", "Dot" ]
```

* Print out the squared values of every number in this numbers array.

```ruby
numbers = [ 1, 3, 9, 11, 100 ]
```

* Print out the Celsius values for an array containing Fahrenheit values.

```ruby
fahrenheit_temps = [ -128.6, 0, 32, 100, 134 ]
```

* Insert all the values in the `artists` array into the `ninja_turtles` array.

```ruby
artists = [ "Leonardo", "Donatello", "Raphael", "Michelangelo" ]
ninja_turtles = []
```

* **Bonus:** Print out every possible combination of the below ice cream flavors and toppings.

```ruby
flavors = [ "vanilla", "chocolate", "strawberry", "butter pecan", "cookies and cream", "rainbow" ]
toppings = [ "gummi bears", "hot fudge", "butterscotch", "rainbow sprinkles", "chocolate sprinkles" ]
```

Can I get a quick fist-of-five on how you feel about `each` and enumerables so far?
* If you feel good about this then you'll have no problem taking on other enumerables. Even the crazy ones.

### BREAK (10min)

##### Map (5min)

Map does the same thing as `each`, but it also generates a new collection with new values based on the code block. Say we want to double our `numbers` array and store it in a new variable...

```ruby
numbers = [ 1, 2, 3, 4, 5 ]
doubled = numbers.map do |number|
  number * 2
end
doubled
# => [ 2, 4, 6, 8, 10 ]

# Alternate syntax
numbers = [ 1, 2, 3, 4, 5 ]
doubled = numbers.map { |number| number * 2 }
doubled
```

**NOTE:** We did not have to type out any variable assignment in the code block!

**DIAGRAM:** MAP

### Group Exercise: Documentation Dive (25min)

Instructions: Each group will spend **10 minutes** using Ruby documentation to look up an assigned enumerable. Prepare your own definition of what it does and whiteboard an example.
* You can test your example in Ruby/Pry.
* [Documentation](http://ruby-doc.org/core-2.2.2/Enumerable.html)

Groups
* **Group 1:** Each With Index
* **Group 2:** Reject
* **Group 3:** Find
* **Group 4:** Select
* **Group 5:** Partition
* **Group 6:** Inject/Reduce

**Bonus:** If you find yourself with extra time, you can:
* Pick out another enumerable that wasn't assigned to a group.
* ...and/or think of another example for your assigned enumerable.

### BREAK (10min)

### Coding Exercise + Homework: High Card (Rest of Class)

Combines your knowledge of Ruby basics and enumerables...  

[High Card](https://github.com/ga-dc/high_card)
