require 'active_record'
require 'pry'

require_relative 'db/connection'
require_relative 'lib/fridge'
require_relative 'lib/food'
require_relative 'lib/drink'

def get_fridge
  puts "Which fridge?"
  puts Fridge.all
  fridge_location = gets.chomp
  return Fridge.find_by(location: fridge_location)
end

def get_food(fridge)
  puts "Which food?"
  puts fridge.foods
  food_name = gets.chomp
  return fridge.foods.find_by(name: food_name)
end

def get_drink(fridge)
  puts "Which drink?"
  puts fridge.drinks
  drink_name = gets.chomp
  return fridge.drinks.find_by(name: drink_name)
end

def get_fridge_input
  fridge_attr = {}
  puts "Where is the fridge at?"
  fridge_attr[:location] = gets.chomp
  puts "What brand is the fridge?"
  fridge_attr[:brand] = gets.chomp
  puts "What is the cubic footage?"
  fridge_attr[:size] = gets.chomp.to_i
  return fridge_attr
end

def get_food_input
  food_attr = {}
  puts "What is the food called?"
  food_attr[:name] = gets.chomp
  puts "What is the weight in lbs?"
  food_attr[:weight] = gets.chomp
  puts "Is it vegan?"
  food_attr[:is_vegan] = gets.chomp
  food_attr[:enter_time] = Time.now
  return food_attr
end

def get_drink_input
  drink_attr = {}
  puts "What is the drink called?"
  drink_attr[:name] = gets.chomp
  puts "What is the size in oz?"
  drink_attr[:size] = gets.chomp
  puts "Is it alcoholic?"
  drink_attr[:is_alcoholic] = gets.chomp
  return drink_attr
end

def menu
  puts "Choose an option:
  1. List all Fridges
  2. Add a Fridge
  3. Delete a Fridge
  4. View all food items in a specific fridge
  5. Add a food item to a fridge
  6. Eat a food item from a fridge
  7. View all drink items in a specific fridge
  8. Add a drink item to a fridge
  9. Consume PART of a drink from a fridge
  10. Consume ALL of a drink from a fridge
  11. Quit"
  return gets.chomp
end

loop do

  choice = menu
  case choice

  when "1"
    puts Fridge.all
  when "2"
    Fridge.create(get_fridge_input)
  when "3"
    fridge = get_fridge
    fridge.destroy
  when "4"
    fridge = get_fridge
    puts fridge.foods
  when "5"
    fridge = get_fridge
    new_food = Food.create(get_food_input)
    new_food.fridge = fridge
    new_food.save
  when "6"
    fridge = get_fridge
    food = get_food(fridge)
    food.destroy
  when "7"
    fridge = get_fridge
    puts fridge.drinks
  when "8"
    fridge = get_fridge
    new_drink = Drink.create(get_drink_input)
    new_drink.fridge = fridge
    new_drink.save
  when "9"
    fridge = get_fridge
    drink = get_drink(fridge)
    puts "What is the new size?"
    new_size = gets.chomp
    drink.size = new_size
    drink.save
  when "10"
    fridge = get_fridge
    drink = get_drink(fridge)
    drink.destroy
  when "11"
    break
  end
end
