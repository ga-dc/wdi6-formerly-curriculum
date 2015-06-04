require 'spec_helper'
require_relative '../lib/reverse'

# Write a method reverse_words that given a string reverses the order of the words

describe "reverse_words" do
  it "reverses the words" do
      expect(reverse_words("We are never ever ever getting back together")).to eq("together back getting ever ever never are We")
  end
end

# Write a method reverse_each_word that given a string reverses the order of the words

describe "reverse_each_word" do
  it "reverses each word" do
      expect(reverse_each_word("We are never ever ever getting back together")).to eq("eW era reven reve reve gnitteg kcab rehtegot")
  end
end

