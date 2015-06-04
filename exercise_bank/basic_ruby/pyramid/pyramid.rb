puts "What character do you want to make a triangle from?"
char = gets.chomp

puts "How many rows do you want your triangle to be?"
number = gets.to_i

puts "Here\'s your pyramid!"
count = 0
while count <= number
  puts (char * (count * 2 + 1)).center(number * 2 + 1)
  count += 1
end