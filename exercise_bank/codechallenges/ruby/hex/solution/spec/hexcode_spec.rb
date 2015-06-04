require_relative '../lib/hexcode.rb'

describe Hexcode do
  describe "#to_rgb" do
    it "converts black to black" do
      expect(Hexcode.new("#000000").to_rgb).to eq([0,0,0])
    end

    it "converts red to red" do
      expect(Hexcode.new("#ff0000").to_rgb).to eq([255,0,0])
    end

    it "converts purple to purple" do
      expect(Hexcode.new("#aa90bd").to_rgb).to eq([170,144,189])
    end

    it "converts white to white" do
      expect(Hexcode.new("#ffffff").to_rgb).to eq([255,255,255])
    end
  end
end