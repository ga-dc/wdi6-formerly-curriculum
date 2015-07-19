class Person
  attr_accessor :name
  attr_reader :hunger_level

  def intitialize(initial_name, initial_hunger_level)
    @name = initial_name
    @hunger_level = initial_hunger_
  end

  def hunger_level=(new_hunger_level)
    if new_hunger_level < 0
      @hunger_level = 0
    else
      @hunger_level = new_hunger_level
    end
  end

  def demonstrate_using_self
    # GETTERS
      # works, but referencing the instance variable is ususally not ideal
      puts @name

      # even better. this calles the name *method* on the current instance, which
      # returns the underlying instance variable's value. (self is implied)
      puts name

      # explicit use of self, but not necessary, as we see in the above line:
      puts self.name

    # SETTERS

      # works, but NOT GOOD PRACTICE, as we should use the interface (setter
      # method), which enforces valid data
      @hunger_level = -10

      # INCORRECT/DOESN'T WORK, creates a local variable instead of calling the
      # setter method like we want
      hunger_level = 10

      # CORRECT, calls the instance method to set the value
      self.hunger_level = 10
  end
end
