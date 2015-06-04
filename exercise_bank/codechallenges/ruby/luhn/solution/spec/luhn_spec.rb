require 'spec_helper'
require_relative '../lib/luhn'

describe "Luhn" do
  
  describe "#valid?" do

    it "is not valid for numbers that don't fit the algorithm" do
      expect(valid?(1234567890123456)).to be_false
    end

    it "it works for a 16 digit number" do
      expect(valid?(4408041234567893)).to be_true
    end

    it "it works for a 14 digit number" do
      expect(valid?(38520000023237)).to be_true
    end

    it "it works for a 13 digit number" do
      expect(valid?(4222222222222)).to be_true
    end

  end

end