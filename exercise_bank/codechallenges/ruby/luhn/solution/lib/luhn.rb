class Integer
  def digits
    to_s.chars.map(&:to_i)
  end
end

def valid?(number)
  reversed_digits = number.digits.reverse

  luhn_sum = reversed_digits.each_with_index.map do |num, i|
    i.odd? ? (num * 2).digits.reduce(:+) : num
  end.reduce(:+)

  luhn_sum % 10 == 0
end
