def is_palindrome?(number)
  return number.to_s == number.to_s.reverse
end

def has_2_3_dig_factors?(number)
  three_dig_nums = (100..999).to_a
  products = []
  three_dig_nums.each do |first_factor|
    three_dig_nums.each do |second_factor|
      product = first_factor * second_factor
      products << product
    end
  end
  return products.include?(number)
end

starting_number = 998001

while !(is_palindrome?(starting_number) && has_2_3_dig_factors?(starting_number))
  starting_number -= 1
end

puts starting_number