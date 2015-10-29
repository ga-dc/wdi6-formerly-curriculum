# Variables
my_favorite_animal = "flying squirrel"

# Parentheses Optional
  # set up
number = 3
  # with parens
if ( number == 3 )
  puts( "It's a 3!")
end
  # without parens
if number == 3
  puts "It's a 3!"
end

# Puts and Gets
  # puts
puts "Hello, Ruby!"
  # gets
puts "How old are you?"
user_input = gets.chom.to_i
# *if in REPL need to respond to gets before inputting next line*
puts user_input

# Strings
name = "John"
full_name = "John\nDoe"
puts full_name
  # Concatenation
"Hello " + "there!"
  # String multiplication
"Hello there! " * 3

  # Interpolation
  # Easy Concatenation
my_name = "Adrian"
puts "Hi my name is: " + my_name

  # Type error concatenation
class_number = 984
puts "I am teaching WDI " + class_number

  # Interpolation avoiding type error
class_number = 984
puts "I am teaching WDI #{class_number}"

# Nil
something = "A thing"
something.nil?

something = nil
something.nil?

# .object_id
a = 10
b = a
a.object_id
b.object_id

# BANG !
a = "cheeseburger"
b = a
b.upcase!
a

# Symbols and immutability
favorite_animal = :dog
puts favorite_animal
other_favorite_animal = :killer_whale
another_favorite_animal = :"flying squirrel"
  # convert symbols to strings
favorite_animal = :dog
favorite_animal.to_s
favorite_animal = :dog

#Arrays
  # definition
numbers = [ 1, 2, 3 ]
animals = [ "dog", "cat", "horse" ]
  # access
animals[0]
  # modify
animals[1] = "elephant"
animals
  # operations on arrays
numbers = [ 1, 2, 3 ]
more_numbers = [ 4, 5, 6, ]
lots_of_numbers = numbers + more_numbers
lots_of_numbers - [ 4, 5, 6 ]
numbers * 3

# .push & .pop
numbers = [ 1, 2, 3, 4, 5 ]
numbers.push( 6 )
numbers.push( 7, 8, 9 )
numbers.pop

# .sort
numbers = [ 3, 1, 5, 2, 4 ]
numbers.sort

# .delete
numbers = [ 3, 1, 2, 2, 4 ]
numbers.delete( 2 )
numbers

# .shuffle
numbers = [ 1, 2, 3, 4, 5 ]
numbers.shuffle

# Ranges
(1..5).to_a
("a".."z").to_a

# Hashes
wdi_class = {
  teacher: "John",
  students: [ "Yacko", "Wacko", "Dot" ],
  classroom: 2,
  in_session: true,
  schedule: {
              morning: "Ruby Basics",
              afternoon: "Enumerables"
            }
}
  # access
wdi_class[:teacher]
  # modify
wdi_class[:teacher] = "Jack"

# Hash methods
  # .keys
wdi_class.keys
  # .merge
classroom = {
  room: 1
}
locations = {
  location_one: "DC",
  location_two: "NY",
  location_three: "Boston"
}
silly_hash = classroom.merge( locations )

# If-Else (lecture notes reflect .rb file)
puts "Welcome to the Iron Rattler! How tall are you (in feet)?"
height = gets.chomp

if height < 4
  puts "Sorry, you'll fly out of your seat if we let you on."
elsif height < 7
  puts "All aboard!"
else
  puts "If you value your head, you should not get on this ride."
end

# Case
puts "Hello there! Give me a language: "
language = gets.chomp.to_s

case language
when "spanish"
  puts "Hola!"
when "french"
  puts "Bonjour!"
when "wookie"
  puts "URRAAGGARHRHH"
else
  puts "I don't know #{language}!"
end

# Methods
  # A method that doubles a number. A number-to-be-doubled is taken in as an argument.
  # Explicit return
def double( number )
  doubled_number = number * 2
  return doubled_number
end
  # implicit return
def double( number )
  doubled_number = number * 2
  doubled_number
end
  # default arguments (with a side-effect!)
def double( number=5 )
  doubled_number = number * 2
  puts "Your doubled number is #{doubled_number}"
  doubled_number
end
