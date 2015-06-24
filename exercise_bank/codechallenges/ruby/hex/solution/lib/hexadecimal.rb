class Hexadecimal

  BASE = 16
  VALUES = Hash[(("0".."9").to_a + ("a".."f").to_a).zip((0..15).to_a)]

  def initialize(hex_value)
    @hex_value = hex_value
  end

  def hex_value
    @hex_value
  end

  def to_decimal
    dec_value = 0
    hex_value.reverse.chars.each_with_index do |digit, index|
      dec_value += VALUES[digit]* BASE**index
    end
    return dec_value
  end

end