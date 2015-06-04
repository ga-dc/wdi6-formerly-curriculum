require_relative '../lib/pe4'

describe "#is_palindrome?" do
  it "is true for a palindrome" do
    expect(is_palindrome?(995599)).to be_true
  end

  it "is false for not a palindrome" do
    expect(is_palindrome?(895599)).to be_false
  end
end

describe "#has_2_3_dig_factors?" do
  it "is true when there are 2 3 digit factors" do
    expect(has_2_3_dig_factors?(100*100)).to be_true
  end

  it "is false when there are not 2 3 digit factors" do
    expect(has_2_3_dig_factors?(13417)).to be_false
  end
end