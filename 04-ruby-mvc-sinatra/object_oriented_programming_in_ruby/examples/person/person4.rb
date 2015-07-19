require 'pry'

class Person
  def initialize(initial_name, initial_hunger_level)
    @name = initial_name
    @hunger_level = initial_hunger_level
  end

  def introduce
    puts "Hello, I'm #{@name}"
  end

  # GETTERS
  def name
    return @name
  end

  def hunger_level
    return @hunger_level
  end

  # SETTERS
  def name=(new_name)
    @name = new_name
  end

  def hunger_level=(new_hunger_level)
    if new_hunger_level < 0
      @hunger_level = 0
    else
      @hunger_level = new_hunger_level
    end
  end

end

me = Person.new("Adam Bray", 10)
binding.pry


# # Using Getters
# me.name           # returns "Adam Bray"
# me.hunger_level   # returns 10
#
# # Using / Testing Setters
# me.name = "Adam Bray, Esq." # changes name
# me.name                     # returns "Adam Bray, Esq."
#
# me.hunger_level = 5         # changes hunger level
# me.hunger_level             # returns 5
# me.hunger_level = -8        # changes hunger level, according to rules
# me.hunger_level             # returns 0


puts "program complete" # fixes an issue with binding.pry if it's the last line of a program
