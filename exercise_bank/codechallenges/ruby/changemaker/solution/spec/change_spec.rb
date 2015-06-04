require 'spec_helper'
require_relative '../lib/change'

#Write a function make change that takes a number of cents as input and returns an array of how to make change for that amount
#The format is an array with the number of quarters, dimes, nickels and then pennies
#Return the combination that takes the least number of coins

describe "make_change" do
  it "makes change for 1" do
      expect(make_change(1)).to eq([0,0,0,1])
  end

  it "makes change for 5" do
      expect(make_change(5)).to eq([0,0,1,0])
  end

  it "makes change for 7" do
      expect(make_change(7)).to eq([0,0,1,2])
  end

  it "makes change for 12" do
      expect(make_change(12)).to eq([0,1,0,2])
  end

  it "makes change for 25" do
      expect(make_change(25)).to eq([1,0,0,0])
  end

  it "makes change for 65" do
      expect(make_change(65)).to eq([2,1,1,0])
  end

end