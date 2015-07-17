  require 'pry'

class Person
  def initialize(initial_name)
    @name = initial_name
  end

  def introduce
    puts "Hello, I'm #{@name}"
  end
end


# 1. Each instance gets a unique value for that var
# 2. Can be used anywhere in the class

me     = Person.new("Adam Bray")
me.introduce # prints "Hello, I'm Adam Bray"

jesse  = Person.new("Jesse Shawl")
jesse.introduce # prints "Hello, I'm Jesse Shawl"

binding.pry


puts "program complete" # fixes an issue with binding.pry if it's the last line of a program
