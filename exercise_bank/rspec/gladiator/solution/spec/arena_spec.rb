require 'spec_helper'
require_relative '../lib/arena'
require_relative '../lib/gladiator'

describe Arena do
  subject(:arena) { Arena.new("The Coliseum") }
  let(:achilles) { Gladiator.new("Achilles", "Spear") }
  let(:flintstone) { Gladiator.new("Flintstone", "Club") }
  let(:triton) { Gladiator.new("Triton", "Trident") }
  let(:odysseus) { Gladiator.new("Odysseus", "Spear")}

  describe "#name" do
    it "has a name" do
      expect( arena.name ).to eq("The Coliseum")
    end
  end

  describe '#gladiators' do
    it "contains gladiators" do
      expect( arena.gladiators ).to_not eq nil
    end
  end

  describe '#add_gladiator' do
    context "when there are no gladiators in the arena" do
      it "can add a single gladiator to the arena" do
        arena.add_gladiator(achilles)
        expect( arena.gladiators.size ).to eq(1)
      end

      it "can add a two gladiators to the arena" do
        arena.add_gladiator(achilles)
        arena.add_gladiator(flintstone)
        expect( arena.gladiators.size ).to eq(2)
      end
    end

    context "when there are already 2 gladiators in the arena" do
      before do
        arena.add_gladiator(achilles)
        arena.add_gladiator(flintstone)
      end

      it "can't add more gladiators to the arena" do
        arena.add_gladiator(triton)
        expect( arena.gladiators.size ).to eq(2)
        expect( arena.gladiators.include?(triton) ).to be_false
      end
    end
  end

  describe "#fight" do
    context "when there are no gladiators in the arena" do
      it "does nothing" do
        arena.fight
        expect( arena.gladiators.size ).to eq(0)
      end
    end

    context "when there is one gladiator in the arena" do
      before do
        arena.add_gladiator(achilles)
      end

      it "does nothing " do
        arena.fight
        expect( arena.gladiators.size ).to eq(1)
      end
    end

    context "when triton and achilles are in the arena" do
      before do
        arena.add_gladiator(triton)
        arena.add_gladiator(achilles)
      end

      it "trident kills spear" do
        arena.fight
        expect( arena.gladiators ).to eq([triton])
      end
    end

    context "when achilles and flintstone are in the arena" do
      before do
        arena.add_gladiator(achilles)
        arena.add_gladiator(flintstone)
      end

      it "spear kills club" do
        arena.fight
        expect( arena.gladiators ).to eq([achilles])
      end
    end

    context "when flintstone and triton are in the arena" do
      before do
        arena.add_gladiator(flintstone)
        arena.add_gladiator(triton)
      end

      it "club kills trident" do
        arena.fight
        expect( arena.gladiators ).to eq([flintstone])
      end
    end

    context "when achilles and odysseus are in the arena" do
      before do
        arena.add_gladiator(achilles)
        arena.add_gladiator(odysseus)
      end

      it "weapon tie kills both" do
        arena.fight
        expect( arena.gladiators.size ).to eq(0)
      end
    end
  end
end