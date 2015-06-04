require 'spec_helper'
require_relative '../lib/longest'

# Write a function longest_word that given a string returns the longest word

describe "longest_word" do
  it "finds the longest word" do
      expect(longest_word("Beware the Jubjub bird, and shun
      The frumious Bandersnatch!")).to eq("Bandersnatch")
  end

  it "ignores punctuation" do
      expect(longest_word("Beware the Jabberwock, my son!
      The jaws that bite, the claws that catch!!!!!!!!!")).to eq("Jabberwock")
  end
end
