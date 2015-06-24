# Building Ruby Familiarity

# In this exercise you will take a first look at some common commands in Ruby.
# The idea here is to build your comfort level with basic Ruby syntax and
# working in the console/pry.

# NOTE: Some of this will be review from the pre-work; some won't.
# Just type them in and see the displayed output.

# Steps:
#   1. Open up a new terminal window
#   2. Launch pry
#   3. Paste a line of code into pry
#   4. Press return
#   5. **Examine the displayed output and try to make sense of what the code did.**
#   6. Repeat steps 3-5 for all lines below in order

trav_age = 54 / 2

puts trav_age

print trav_age

trav_age = 54 / 2.to_f

trav_age = 54.to_f / 2

trav_age = 54 / 2.0

trav_age = 54.0 / 2

trav_age = trav_age.round * 4

def get_character(full_string, index)
  return full_string[index]
end

message_string = "Richard Hessler enjoys discussing wine."

character_1 = get_character(message_string, 8)

character_2 = get_character(message_string, 9)

character_3 = get_character(message_string, 12)

character_4 = get_character(message_string, 19)

message_array = [character_1, character_2]

message_array.push(character_3)

message_array.push(character_3)

message_array.pop()
# WAIT! What just happened to our sweet, sweet array?

puts message_array

message_array.push(character_3)

message_array.push(character_4)

message_array

puts message_array

message_array.join

message_array.join + " dearest students!"

print message_array


value_float_1 = Math.sin(Math::PI / 2)

value_float_2 = Math.cos(Math::PI)

value_float_3 = (value_float_1 + value_float_2)

value_integer_1 = (value_float_1 + value_float_2).to_i


value_float_1 = value_float_1 * 4

value_float_2 *= 5

value_float_2 = value_float_2.abs

value_integer_1 += 8

value_float_4 = value_integer_1 * 3

value_float_3 -= 1


number_array = [value_float_1, value_float_2, value_float_3, value_float_4]

number_array.push(trav_age)

number_array.unshift(value_integer_1)

number_array.push(value_integer_1)

number_array.unshift( Math.sqrt(36) )

number_array.delete_at(5)

number_array.push( [19, 21, 6, 3, 1] )

number_array.flatten!

number_array.each do |current_index|
  puts get_character(message_string, current_index)
end
