require 'spec_helper'
require_relative '../lib/too'

# Write a function too_to_to that removes repeating letters from a string

describe "too_to_to" do
  it "works for two letters" do
      expect(too_to_to("oo")).to eq("o")
  end

  it "works for multiple repetitions of a letter within a single word" do
      expect(too_to_to("whaaaaaaaaat?")).to eq("what?")
  end

  it "works for multiple words" do
      expect(too_to_to("soooooooo cool")).to eq("so col")
  end

  it "works with capital letters" do
      expect(too_to_to("THIS IS AMAZZZZING")).to eq("THIS IS AMAZING")
  end

end