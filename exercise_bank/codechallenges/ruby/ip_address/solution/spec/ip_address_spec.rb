require 'spec_helper'
require_relative '../lib/ip_address'

describe "#valid_ip?" do
  it "returns true if input is between '0.0.0.0' and '255.255.255.255'" do
    expect(valid_ip?("127.0.0.1")).to be_true
  end

  it "returns false if any number is greater than 255" do
    expect(valid_ip?("255.255.256.10")).to be_false
  end

  it "returns false if any number is less than 0" do
    expect(valid_ip?("127.0.0.-2")).to be_false
  end
end