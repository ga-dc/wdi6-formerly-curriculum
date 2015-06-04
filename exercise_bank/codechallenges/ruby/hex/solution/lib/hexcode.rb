class Hexcode
  def initialize(hexcode)
    @hexcode = hexcode
  end

  def hexcode
    @hexcode
  end

  def to_rgb
    red = Hexadecimal.new(hexcode[1..2]).to_decimal
    green = Hexadecimal.new(hexcode[3..4]).to_decimal
    blue = Hexadecimal.new(hexcode[5..6]).to_decimal
    return [red,green,blue]
  end
end