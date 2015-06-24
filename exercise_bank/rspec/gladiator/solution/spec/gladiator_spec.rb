require 'spec_helper'
require_relative '../lib/gladiator'

describe Gladiator do
  subject(:gladiator){Gladiator.new("Ajax", "Long Sword")}

  describe "#name" do
    it "has a name" do
      expect( gladiator.name ).to eq("Ajax")
    end
  end

  describe "#weapon" do
    it "has a weapon" do
      expect( gladiator.weapon ).to eq("Long Sword")
    end
  end
end