require 'pry'

class Person
  def intitialize()
    puts("new person created")
  end
end

binding.pry
# bob = Person.new # "new person created"

puts "program compelte" # fixes an issue with binding.pry if it's the last line of a program
