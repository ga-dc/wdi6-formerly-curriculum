require 'pry'

class Person
  def intitialize(initial_name)
    @name = initial_name
  end

  def introduce
    puts "Hello, I'm #{name}"
  end
end

me     = Person.new("Adam Bray")
jesse  = Person.new("Jesse")

binding.pry

# me.introduce # prints "Hello, I'm Adam Bray"
# jesse.introduce # prints "Hello, I'm Jesse Shawl"

puts "program compelte" # fixes an issue with binding.pry if it's the last line of a program
