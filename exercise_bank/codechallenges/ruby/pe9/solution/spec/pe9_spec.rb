require_relative '../lib/pe9.rb'

describe "#triplet?" do
  it "returns true for a pythagorean triplet" do
    expect( triplet?(5,12,13) ).to be_true
  end  

  it "returns false for not a pythagorean triplet" do
    expect( triplet?(10,20,30) ).to be_false
  end  
end