require 'pry'

class Person
  attr_accessor :name
  attr_reader :hunger_level

  def initialize(initial_name, initial_hunger_level)
    @name = initial_name
    @hunger_level = initial_hunger_level
  end

  def introduce
    return "Hello, I'm #{name}"
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
  def yell(words)
    return words.upcase
  end

  def introduce
    return "Hello, I'm #{name}".upcase
  end
end

binding.pry

# adam = Person.new("Adam", 10)
# bob = LoudPerson.new("Bob", 10)
#
# puts bob.name
# puts bob.introduce
#
# bob.hunger_level = 5
# puts bob.hunger_level

puts "this line fixes a bug in binding.pry if it's the last line in a program"
