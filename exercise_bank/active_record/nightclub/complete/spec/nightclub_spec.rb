require 'spec_helper'
require_relative '../lib/nightclub'

describe Clubber do
  let(:clubber) { Clubber.new }

  it { should ensure_length_of(:name).is_at_least(2) }
  it { should validate_numericality_of(:age).is_greater_than_or_equal_to(21) }
  it { should validate_numericality_of(:age).is_less_than(60) }
  it { should ensure_inclusion_of(:gender).in_array(%w(f m)) }

  context "#gender_ratio validation" do
    before {
      clubber.name = "Leslie"
      clubber.age = 21
    }

    after {
      Clubber.destroy_all()
    }

    it "should always be valid for females" do
      clubber.gender = "f"
      clubber.valid?
      expect( clubber.errors.has_key?(:gender_ratio) ).to eq false
    end

    it "should be invalid for males when ratio is below 2:1" do
      clubber.gender = "m"
      clubber.valid?
      expect( clubber.errors.has_key?(:gender_ratio) ).to eq true
    end

    it "should be valid for males when ratio is at least 2:1" do
      Clubber.create(name: "Sally", age: 21, gender: 'f')
      clubber.gender = "m"
      clubber.valid?
      expect( clubber.errors.has_key?(:gender_ratio) ).to eq false
    end
  end

  context "#format_gender" do
    it "should return 'female' when gender is 'f'" do
      clubber.gender = "f"
      expect( clubber.format_gender ).to eq "female"
    end

    it "should return 'male' when gender is 'm'" do
      clubber.gender = "m"
      expect( clubber.format_gender ).to eq "male"
    end
  end
end

$connection.disconnect!