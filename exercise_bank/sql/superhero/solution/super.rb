require 'pg'

# presents users with options
puts "Would you like to:"
puts "(I) See an index of all superheroes"
puts "(C) Create a superhero,"
puts "(R) Read a the values of a particular superhero,"
puts "(U) Update a superhero,"
puts "(D) Destroy a superhero,"
puts "(T) Terminate all caped superheroes"

input = gets.chomp.capitalize
db_conn = PG.connect(:dbname => 'superheroes_db', :host => 'localhost')

def print_values(pg_obj)
  pg_obj.values.each do |entry|
    puts ""
    puts "Name: " + entry[1]
    puts "Alter Ego: " + entry[2]
    puts "Has cape? " + entry[3]
    puts "Superpower: " + entry[4]
    puts "Arch Nemesis: " + entry[5]
  end
end

def get_answer_to(question)
  puts question
  gets.chomp
end

case input
when "I"
  pg_object= db_conn.exec("SELECT * FROM superheroes;")
  puts "Here they are: "
  print_values(pg_object)
when "C"
  name = get_answer_to("Great, what's their name?")
  alter = get_answer_to("What's their alter ego?")
  cape = get_answer_to("True of False: do they have a cape?")
  superpower = get_answer_to("What is their superpower?")
  arch_nemesis = get_answer_to("Who's their arch nemesis?")
  sql_string = "INSERT INTO superheroes (name, alter_ego, has_cape, power, arch_nemesis) " +
               "VALUES ('#{name}', '#{alter}', '#{cape}', '#{superpower}', '#{arch_nemesis}');"
  db_conn.exec(sql_string)
  puts "#{name} is now logged in the superhero database"
when "R"
  input_name = get_answer_to("What's the name of the superhero you want to look at?")
  pg_object = db_conn.exec("SELECT * FROM superheroes WHERE name='#{input_name}'")
  print_values(pg_object)
when "U"
  target = get_answer_to("Interesting. Who do you want to update?")
  new_attribute = get_answer_to("What attribute do you want to update?")
  new_value = get_answer_to("Cool. What value do you want to assign to this value?")

  db_conn.exec("UPDATE superheroes SET #{new_attribute}='#{new_value}'")

  puts "Great. #{target}'s #{new_attribute} value is now #{new_value}."
when "D"
  target = get_answer_to("Oh no! Which superhero do you want to destroy?")
  db_conn.exec("DELETE FROM superheroes WHERE name='#{target}'")
  puts "#{target} is dead."
when "T"
  puts "Woah. That's drastic. But it's done"
  db_conn.exec("DELETE FROM superheroes WHERE has_cape = 'true'")
else
  "You didn't enter a valid command"
end

