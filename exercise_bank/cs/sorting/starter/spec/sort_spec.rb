require 'spec_helper'
require_relative '../lib/sort'

describe "bubble_sort" do
  it "sorts the array" do
      expect([5,3,2,1,4].bubble_sort).to eq([1,2,3,4,5])
  end

  it "sorts the array" do
      expect((1..10).to_a.shuffle.bubble_sort).to eq((1..10).to_a)
  end
end

describe "quick_sort" do
  it "sorts the array" do
      expect([5,3,2,1,4].quick_sort).to eq([1,2,3,4,5])
  end

  it "sorts the array" do
      expect((1..10).to_a.shuffle.quick_sort).to eq((1..10).to_a)
  end

end