require_relative '../make_change.rb'

describe "make_change" do
  it "makes change for 1" do
    expect(make_change(1)).to eq([0,0,0,1])
  end

  it "makes change for 0" do
    expect(make_change(0)).to eq([0,0,0,0])
  end

  it "makes change for 60" do
    expect(make_change(60)).to eq([2, 1, 0, 0])
  end

  it "makes change for 99" do
    expect(make_change(99)).to eq([3, 2, 0, 4])
  end

  it "makes change for 84" do
    expect(make_change(84)).to eq([3, 0, 1, 4])
  end
end
