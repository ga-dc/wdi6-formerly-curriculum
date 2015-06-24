names = []

while true
  puts "#{names.length} so far. Enter a student name, or type 'done':"
  name = gets.chomp

  break if name == "done"
  names.push(name)
end

puts "You collected #{names.length} student names."
puts "The names are: #{names.join(', ')}"