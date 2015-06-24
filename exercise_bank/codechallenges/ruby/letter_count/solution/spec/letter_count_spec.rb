require 'spec_helper'
require_relative '../lib/letter_count'

describe "#letter_count" do
  it "works for single letters" do
    expect(letter_count("cow")).to eq( {"c" => 1, "o" => 1, "w" => 1} )
  end


  it "works for repeated letters" do
    expect(letter_count("moon")).to eq( {"m" => 1, "o" => 2, "n" => 1} )
  end

  it "works for multiple words" do
    expect(letter_count("Hey diddle diddle")).to eq( {"h"=>1, "e"=>3, "y"=>1, "d"=>6, "i"=>2, "l"=>2} )
  end
end