require 'spec_helper'
require_relative '../lib/calc'

describe Calculator do

  describe "#add" do
    it "adds two positive numbers" do
      expect(Calculator.new.add(2, 2)).to eq(4)
    end

    it "adds a negative and positive number" do
      expect(Calculator.new.add(-1, 2)).to eq(1)
    end
  end

  describe "#subtract" do
    it "subtracts numbers" do
      expect(Calculator.new.subtract(11, 7)).to eq(4)
    end
  end

  describe "#power" do
    it "raises one number to the power of another number"
  end

  describe "#sum" do
    it "computes the sum of an empty array"
    it "computes the sum of an array of one number"
    it "computes the sum of an array of two numbers"
    it "computes the sum of an array of many numbers"
  end

  describe "#multiply" do
    it "multiplies two numbers"
    it "multiplies several numbers"
  end

  describe "#factorial" do
    it "computes the factorial of 0"
    it "computes the factorial of 1"
    it "computes the factorial of 2"
    it "computes the factorial of 5" 
    it "computes the factorial of 10"
  end

end