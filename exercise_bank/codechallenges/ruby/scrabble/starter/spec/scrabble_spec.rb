require 'spec_helper'
require_relative '../lib/scrabble'

describe ScrabbleWord do
  describe "#score" do
    it "scores words with a single letter" do
      word = ScrabbleWord.new("a")
      expect( word.score ).to eq 1
    end

    it "scores words with multiple letters" do
      word = ScrabbleWord.new("winter")
      expect( word.score ).to eq 9
    end

    it "is not affected by capitalization" do
      word = ScrabbleWord.new("SnoWMaN")
      expect( word.score ).to eq 12
    end
  end

  describe "#multiplier_score" do
    it "multiplies score by a factor of 2" do
      word = ScrabbleWord.new("snowflake")
      expect( word.multiplier_score(2) ).to eq 38
    end

    it "multiplies score by a factor of 3" do
      word = ScrabbleWord.new("mittens")
      expect( word.multiplier_score(3) ).to eq 27
    end
  end
end