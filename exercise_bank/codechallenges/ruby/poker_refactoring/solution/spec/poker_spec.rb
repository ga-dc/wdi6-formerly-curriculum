require 'spec_helper'
require_relative '../lib/poker'

describe "Hand" do

  describe "#straight?" do
    it "identifies a straight" do
      hand = Hand.new(["As", "2h", "3c", "5h", "4d" ])
      expect(hand.straight?).to be_true
    end

    it "doesn't have false positives" do
      hand = Hand.new(["Ac", "Js", "7c", "Ks", "4s" ])
      expect(hand.straight?).to be_false
    end
  end

  describe "#flush?" do
    it "identifies a flush" do
      hand = Hand.new(["3s", "Js", "9s", "Ts", "4s" ])
      expect(hand.flush?).to be_true
    end

    it "doesn't have false positives" do
      hand = Hand.new(["Ac", "Js", "7c", "Ks", "4s" ])
      expect(hand.straight?).to be_false
    end
  end

  describe "#full_house?" do
    it "identifies a full house" do
      hand = Hand.new(["3s", "3h", "2d", "2c", "3c" ])
      expect(hand.full_house?).to be_true
    end

    it "doesn't have false positives" do
      hand = Hand.new(["3s", "3h", "3d", "2c", "3c" ])
      expect(hand.full_house?).to be_false
    end
  end

  describe "#four_of_a_kind?" do
    it "identifies a four of a kind" do
      hand = Hand.new(["3s", "3h", "3d", "2c", "3c" ])
      expect(hand.four_of_a_kind?).to be_true
    end

    it "doesn't have false positives" do
      hand = Hand.new(["3s", "3h", "2d", "2c", "3c" ])
      expect(hand.four_of_a_kind?).to be_false
    end
  end

  describe "#best_hand" do
    it "identifies a straight flush" do
      hand = Hand.new(["6s", "2s", "3s", "5s", "4s" ])
      expect(hand.best_hand).to eq("Straight Flush")
    end

    it "identifies a four of a kind" do
      hand = Hand.new(["3s", "3h", "3d", "2c", "3c" ])
      expect(hand.best_hand).to eq("Four of a Kind")
    end

    it "identifies a full house" do
      hand = Hand.new(["3s", "3h", "2d", "2c", "3c" ])
      expect(hand.best_hand).to eq("Full House")
    end

    it "identifies a straight" do
      hand = Hand.new(["As", "2h", "3c", "5h", "4d" ])
      expect(hand.best_hand).to eq("Straight")
    end

    it "identifies a flush" do
      hand = Hand.new(["3s", "Js", "9s", "Ts", "4s" ])
      expect(hand.best_hand).to eq("Flush")
    end

    it "identifies everything else as garbage" do
      hand = Hand.new(["3s", "Js", "9c", "Ts", "4s" ])
      expect(hand.best_hand).to eq("Not much")
    end

  end

end