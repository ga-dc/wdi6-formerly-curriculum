require 'spec_helper'
require_relative '../lib/ordinalize'

test_cases = {
  1=>"1st",
  2=>"2nd",
  3=>"3rd",
  4=>"4th",
  10=>"10th",
  11=>"11th",
  12=>"12th",
  13=>"13th",
  14=>"14th",
  20=>"20th",
  21=>"21st",
  22=>"22nd",
  23=>"23rd",
  24=>"24th",
  100=>"100th",
  101=>"101st",
  102=>"102nd",
  103=>"103rd",
  104=>"104th",
  110=>"110th",
  111=>"111th",
  112=>"112th",
  113=>"113th",
  114=>"114th",
  120=>"120th",
  121=>"121st",
  122=>"122nd",
  123=>"123rd",
  124=>"124th",
  321=>"321st",
  324=>"324th"
}

describe "Ordinalize::convert" do
  test_cases.each do |num, ordinal|
    it "converts #{num} to #{ordinal}" do
      expect(Ordinalize.convert(num)).to eq(ordinal)
    end
  end
end