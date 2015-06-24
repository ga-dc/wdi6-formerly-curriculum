require_relative '../lib/hexadecimal.rb'

describe Hexadecimal do
  
  describe "#to_decimal" do
    it "converts 1 in hex to 1 in decimal" do
      expect(Hexadecimal.new("1").to_decimal).to eq(1)
    end

    it "converts a in hex to 10 in decimal" do
      expect(Hexadecimal.new("a").to_decimal).to eq(10)
    end

    it "converts 25 in hex to 37 in decimal" do
      expect(Hexadecimal.new("25").to_decimal).to eq(37)
    end

    it "converts a1 in hex to 161 in decimal" do
      expect(Hexadecimal.new("a1").to_decimal).to eq(161)
    end

    it "converts ff in hex to 255 in decimal" do
      expect(Hexadecimal.new("ff").to_decimal).to eq(255)
    end
  end

end