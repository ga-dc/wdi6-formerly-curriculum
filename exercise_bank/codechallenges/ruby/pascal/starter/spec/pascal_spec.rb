require 'spec_helper'
require_relative '../lib/pascal'

# write a method pascal that takes a row number as input and returns an array of numbers
# corresponding to the pascal's triangle numbers for that row
# http://en.wikipedia.org/wiki/Pascal's_triangle

describe "pascal" do
    it "it works for 0" do
      expect(pascal(0)).to eq([1])
  end

    it "it works for 1" do
      expect(pascal(1)).to eq([1,1])
  end

    it "it works for 2" do
      expect(pascal(2)).to eq([1,2,1])
  end

      it "it works for 5" do
      expect(pascal(5)).to eq([1,5,10,10,5,1])
  end
end