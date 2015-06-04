puts "Max?"
max = gets.chomp.to_i
puts "First Multiple?"
first_multiple = gets.chomp.to_i
puts "Second Multiple?"
second_multiple = gets.chomp.to_i

def sum_for_one_multiple(max, multiple)
    n = (max - 1) / multiple
    return n * (n + 1) / 2 * multiple
end

def sum_for_two_multiples(max, first_multiple, second_multiple)
    return sum_for_one_multiple(max, first_multiple) + sum_for_one_multiple(max, second_multiple) - sum_for_one_multiple(max, first_multiple * second_multiple)
end

puts "The sum of all multiples of "+first_multiple.to_s+" and "+second_multiple.to_s
puts "That are below the number "+max.to_s+" is : "+sum_for_two_multiples(max, first_multiple, second_multiple).to_s