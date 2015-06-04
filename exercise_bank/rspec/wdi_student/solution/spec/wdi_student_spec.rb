require_relative '../lib/wdi_student'
require_relative 'spec_helper'

describe Student do
  subject(:steve){ Student.new("Flash Steve")}

  describe "::new" do
    it "has a name" do
      expect( steve.name ).to eq("Flash Steve")
    end

    it "starts with energy" do
      expect( steve.energy_level ).to eq(100)
    end

    it "has no smarts" do
      expect( steve.smarts ).to eq(0)
    end
  end

  describe "#break" do

    it "makes you not tired" do
      steve.code
      steve.break
      expect(steve.energy_level).to eq(100)
    end

  end

  describe "#code" do

    context "student has coded once" do
      before do
        steve.code
      end

      it "reduces energy" do
        expect( steve.energy_level ).to eq(0)
      end

      it "adds smarts" do
        expect( steve.smarts ).to eq(1)
      end

    end

    context "steve has coded twice" do
      before do
        steve.code
        steve.code
      end

      it "should not add smarts when tired" do
        expect( steve.smarts ).to eq(1)
      end

    end

  end

end