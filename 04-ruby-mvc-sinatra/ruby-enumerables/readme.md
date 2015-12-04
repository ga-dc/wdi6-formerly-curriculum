# Ruby Enumerables: Learning Objectives

- Review Ruby arrays and hashes
- Use Ruby loops to iterate over code blocks.
- Define what a Ruby enumerable method is.
- Identify useful Ruby enumerables, including `.each`, `.map` and `.select`.
- Use enumerables to traverse, sort and modify collections.

## Review: Ruby Collections (15 minutes)

What are the types of collections we have in ruby?

### Arrays

```rb
fruits = ["apple", "banana", "cherry"]

fruits.length # 3
fruits.push("dates")
fruits.length # 4

fruits[0] # apple
fruits[3] # dates

fruits[3] = "durian"
fruits[3] # durian

fruits.join(" ") # "apple banana cherry"
fruits.join(", ") # "apple, banana, cherry"
fruits.join(" and ") # "apple and banana and cherry"
```

### Hashes

Hashes are like javascript objects, but they are a bit more limited:

```rb
instructor = {
  name: "Bob",
  age: 30,
  favorite_foods: ["Cheese Tots", "Cheese Steaks", "Kale Salad"]
}

instructor[:name] # Bob
instructor[:age]  # 30
instructor[:favorite_foods] # ["Cheese Tots", "Cheese Steaks", "Kale Salad"]

instructor[:name] = "Robert"
instructor[:name] # Robert

instructor[:favorite_color] = "red"
instructor[:favorite_color] # red
```

## Loops (30min)

### Review JS Loops (5 minutes)

Q: What loops did we use in Javascript?
---
> A: while, do-while, for, for-in, forEach

Start by reviewing JS `for` loops.

```js
var fruits = ["apple", "banana", "cherry"];
for(var i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

## Looping with Ruby
The closest equivelant to Javascripts for loop is Ruby's each enumerable

```rb
fruits = ["apples", "bananas", "cherries"]
fruits.each do |fruit|
    puts fruit
end

```

Here are some alternate ways of looping

* `loop`
  * loop runs uninterupted until stopped
* `while`
  * runs the loop while the condition is true
* `until`
  * runs the loop while the condition is false
* `.times` (called on a number)
  * runs the loop a specific of times




### `break`

`break` lets us end -- or "break" out of -- a loop.

Q: What numbers do you expect to see on the screen when we run this  loop?
---

```ruby
10.times do |i|
  if i == 5
    break
  end
  puts i
end

```

### `next`

`next` lets us skip to the next iteration of a loop.

Q: What numbers do you expect to see on the screen when we run this  loop?
---

  ```ruby
  10.times do |i|
    if i == 5
      next
    end
    puts i
  end
  ```
## Break (10 minutes)


## Enumerables

### What Are Enumerables?

Ruby's Enumerable methods allow us to traverse, search and sort data collections (i.e., arrays and hashes).
- [Documentation](http://ruby-doc.org/core-2.2.3/Enumerable.html)

### Useful Enumerables

#### Each (20min)

The king (or queen) of enumerables, and the one you will most likely be using the most.
- Iterates through and performs an action(s) on a collection.
- Does not permanently modify the collection.

If we were to emulate `.each` using plain ol' Ruby, it would look something like this...

```ruby
# A loop that prints out the doubled value of each item in an array
numbers = [ 1, 2, 3, 4, 5 ]
i = 0

while(i <= numbers.length) do
  puts numbers[i] * 2
  i = i + 1
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

##### Code Block Format

**WHITEBOARD:** You'll notice we wrote out the `.each` example in two ways: multi-line and single-line.

Multi-line
- `.each` - method name
- `do` - keyword that begins block of code
- `|number|` - iteration variable; represents an individual value in the array
  - Common syntax is to name the variable the singular version of the collection. In this case, use `number` for `numbers`.
  - Some enumerables may have more than one of these.
- `end` - closes code block

Single-line
- `.each` - method name
- { } - replaces `do` and `end`; contains the iteration variable and code block
- `|number|` - iteration variable

### Exercise: Practice Each (10min)

Use `each` to do the following...  

- Say hello to everybody in the below array of names (sample output: `Hello Donald!`).

  ```ruby
  names = [ "Donald", "Daisy", "Huey", "Duey", "Luey" ]
  ```

- Print out the squared values of every number in this numbers array.

  ```ruby
  numbers = [ 1, 3, 9, 11, 100 ]
  ```

- Print out the Celsius values for an array containing Fahrenheit values.

  ```ruby
  fahrenheit_temps = [ -128.6, 0, 32, 140, 212 ]
  ```

- Insert all the values in the `artists` array into the `ninja_turtles` array.

  ```ruby
  artists = [ "Leonardo", "Donatello", "Raphael", "Michelangelo" ]
  ninja_turtles = []
  ```

- **Bonus:** Print out every possible combination of the below ice cream flavors and toppings.

  ```ruby
  flavors = [ "vanilla", "chocolate", "strawberry", "butter pecan", "cookies and cream", "rainbow" ]
  toppings = [ "gummi bears", "hot fudge", "butterscotch", "rainbow sprinkles", "chocolate sprinkles" ]
  ```

Can I get a quick fist-of-five on how you feel about `each` and enumerables so far?
- There are many enumerable methods.  All of them look and feel similar to `each`.

## BREAK (10min)

#### Map (5min)

Map is similar to `each`.  It iterates through each element in the collection,  but `map` generates a new collection with values based on the code block. Say we want to double our `numbers` array and store it in a new array...

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

### Exercise: Practice Map (5min)

Use `map` to do the following...  

- Create an array that appends "Duck" to everybody in this array of first names

  ```ruby
  first_names = [ "Donald", "Daisy", "Daffy" ]

  #=> ["Donald Duck", "Daisy Duck"]
  ```

- Create an array containing the squared values of every number in this array.

  ```ruby
  numbers = [ 1, 3, 9, 11, 100 ]

  # => [1, 9, 81, 121, 10000]
  ```

- Create an array with the Celsius values for these Fahrenheit values.

  ```ruby
  fahrenheit_temps = [ -128.6, 0, 32, 140, 212 ]

  #=> [-89.2, -17.8, 0, 60, 100]
  ```


## Group Exercise: Documentation Dive (25min)

Instructions: Each group will spend **10 minutes** using Ruby documentation to look up an assigned enumerable. Prepare your own definition of what it does and whiteboard an example.
- You can test your example in IRB/Pry.
- [Documentation](http://ruby-doc.org/core-2.2.3/Enumerable.html)

Groups
- **Group 1:** Each With Index
- **Group 2:** Reject
- **Group 3:** Find
- **Group 4:** Select
- **Group 5:** Partition
- **Group 6:** Inject/Reduce

**Bonus:** If you find yourself with extra time, you can:
- Pick out another enumerable that wasn't assigned to a group.
- ...and/or think of another example for your assigned enumerable.

## BREAK (10min)

## Coding Exercise + Homework: High Card (30min)

Combines your knowledge of Ruby basics and enumerables...  

[High Card](https://github.com/ga-dc/high_card)
