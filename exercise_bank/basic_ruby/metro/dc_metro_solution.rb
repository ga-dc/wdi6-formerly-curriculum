red = ['woodley park', 'dupont circle', 'farragut north', 'metro center', 'judiciary square', 'union station']
turquoise = ['crystal city', 'metro center', 'shaw-howard', 'beltwater']
orange = ['farragut west', 'mcpherson sq', 'metro center', 'federal triangle', 'smithsonian', "l'enfant plaza"]

dc_metro = {}
dc_metro[:red] = red
dc_metro[:turquoise] = turquoise
dc_metro[:orange] = orange


puts "Welcome to the DC Metro!"
puts "What line would you like to get on? (Red, Turquoise, or Orange)"
line = gets.chomp.downcase

if dc_metro.has_key?(line.to_sym)
  puts "The stops on the #{line} line are: " + dc_metro[line.to_sym].join(', ')
else
  puts "Sorry, not a valid line."
end

puts "What stop are you getting on?"
start = gets.chomp.downcase

if !dc_metro[line.to_sym].include?(start)
  puts "That's not a stop on the #{line} line!"
else
  puts "What line would you like to get off?"
  dest_line = gets.chomp.downcase
  puts "The stops on the #{dest_line} line are: " + dc_metro[dest_line.to_sym].join(', ')
  puts "What stop would you like to get off?"
  dest = gets.chomp.downcase
  if !dc_metro[dest_line.to_sym].include?(dest)
    puts "That's not a stop on the #{line} line!"
  else
    distance = (dc_metro[dest_line.to_sym].index(dest) - dc_metro[dest_line.to_sym].index("metro center")).abs + (dc_metro[line.to_sym].index("metro center") - dc_metro[line.to_sym].index(start)).abs
    puts "That stop is #{distance} stops away."
  end

end
