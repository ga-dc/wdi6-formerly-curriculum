require_relative '../lib/anagram'

describe "#anagram?" do
  it "returns true for 2 words that are anagrams" do
    expect(anagram?("steven", "events")).to be_true
  end

  it "returns false for 2 words that are not anagrams" do
    expect(anagram?("drew", "granger")).to be_false
  end

  it "returns false for 2 words that have the same letters but are different lengths" do
    expect(anagram?("kevin", "keevin")).to be_false
  end

end

describe "#find_anagrams" do
  it "doesn't return any for no matches" do
    expect(find_anagrams("bing", %w(enlists google inlets banana))).to eq([])
  end

  it "returns one match" do
    expect(find_anagrams("listen", %w(enlists google inlets banana))).to eq(["inlets"])
  end

    it "returns multiple matches" do
    expect(find_anagrams("listen", %w(enlists google inlets banana enlist))).to include("enlist")
    expect(find_anagrams("listen", %w(enlists google inlets banana enlist))).to include("inlets")
  end
end