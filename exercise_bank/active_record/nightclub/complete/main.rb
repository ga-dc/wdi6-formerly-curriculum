require_relative 'lib/nightclub'

# Prints all clubbers in the nightclub:
def print_clubbers
  puts "# Current clubbers: #"

  Clubber.all().each do |clubber|
    puts clubber.format_record
  end
end

# Adds clubbers to the nightclub:
def add_clubber
  while true
    puts "Enter the clubber's name:"
    name = gets.chomp

    puts "Enter the clubber's age:"
    age = gets.chomp.to_i

    puts "Enter the clubber's gender (m/f):"
    gender = gets.chomp

    clubber = Clubber.new(name: name, age: age, gender: gender)

    if clubber.save
      print_clubbers()
    else
      puts "## Errors: ##"
      clubber.errors.full_messages.each do |error|
        puts '- ' + error
      end
    end

    puts "Add another clubber? (y/n)"
    break unless gets.chomp.include?("y")
  end
end

# Removes clubbers from the nightclub:
def remove_clubber
  while true
    puts "Enter the clubber ID to remove:"
    id = gets.chomp.to_i

    if Clubber.exists?(id) && Clubber.destroy(id)
      print_clubbers()
    else
      puts "# Clubber could not be removed #"
    end

    puts "Remove another clubber? (y/n)"
    break unless gets.chomp.include?("y")
  end
end

# Main menu app:
while true
  puts "## Welcome to Club WDI ##"
  print_clubbers()

  puts "# What would you like to do? #"
  puts "1. Add a clubber"
  puts "2. Remove a clubber"
  puts "3. Quit"
  action = gets.chomp.to_i

  case action
  when 1
    add_clubber()
  when 2
    remove_clubber()
  when 3
    $connection.disconnect!
    break
  end
end