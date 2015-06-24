require_relative '../lib/word_ladder'

describe "#one_letter_diff?" do
  it "is true for letters that are neighbors" do
    expect(one_letter_diff?("calm", "palm")).to be_true
  end

  it "is false for letters that are not neighbors" do
    expect(one_letter_diff?("calm", "wave")).to be_false
  end

  it "is false for letters the same word" do
    expect(one_letter_diff?("calm", "calm")).to be_false
  end
end

describe "#word_ladder_neighbors" do
  it "find all the neighbors" do
    expect(word_ladder_neighbors("aloe")).to eq(["alae", "alee", "alme", "alow", "floe", "sloe"])
  end
end