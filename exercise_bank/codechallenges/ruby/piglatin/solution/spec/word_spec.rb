require 'spec_helper'
require_relative '../lib/word'

describe Word do

  describe "#original_word" do
    let(:word) { Word.new("bazinga") }

    it "returns the original word" do
      expect( word.original_word ).to eq("bazinga")
    end
  end

  describe "#piglatinize" do
    context "when word begins with a vowel" do
      let(:word) { Word.new("egg") }

      it "returns the same word plus way at the end" do
        expect( word.piglatinize ).to eq("eggway")
      end
    end

    context "when word begins with one consonant" do
      let(:word) { Word.new("happy") }

      it "returns the consonant sound plus ay moved to the back" do
        expect( word.piglatinize ).to eq("appyhay")
      end
    end

    context "when word begins with multiple consonants" do
      let(:word) { Word.new("glove") }

      it "returns the consonant sound plus ay moved to the back" do
        expect( word.piglatinize ).to eq("oveglay")
      end
    end

  end
end
