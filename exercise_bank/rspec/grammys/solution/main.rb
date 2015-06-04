require_relative "lib/grammy"

Grammy.read_all("grammys.csv")

system "clear"

puts "============================"
puts "Welcome to the Grammys!"
puts "============================"

begin

  puts ""
  puts "Choose wisely..."  
  puts " A - Add new Grammy."
  puts " L - List all Grammys."
  puts " D - Delete a Grammy"
  puts " Q - Quit!"
  puts ""
  print " >"

  choice = gets.chomp.downcase

  if choice == "a"
    print "Enter year: "
    year = gets.chomp.to_i
    print "Enter category: "
    category = gets.chomp
    print "Enter winner: "
    winner = gets.chomp

    Grammy.new(year, category, winner)
    Grammy.save_all("grammys.csv")

  elsif choice == "l"
    grammys = Grammy.all

    if grammys.count < 1
      puts "No grammys yet!"
    else  
      grammys.each {|grammy| puts grammy}
    end

  elsif choice == "d"
    grammys = Grammy.all

    if grammys.count < 1
      puts "No grammys yet!"
    else
      puts "Enter the number of the grammy you want to remove"  
      grammys.each_with_index {|grammy, index| puts "#{index}. #{grammy}"}
      index = gets.chomp.to_i
    end

    Grammy.delete(index)
    Grammy.save_all("grammys.csv")

  elsif choice != "q"

    puts "Invalid option..."

  end

end while choice != "q"