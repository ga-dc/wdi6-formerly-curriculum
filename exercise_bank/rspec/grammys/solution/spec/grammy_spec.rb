require_relative "../lib/grammy"
require "spec_helper"

describe Grammy do

  describe "::all" do
    it "returns all of the instances" do
      Grammy.clear
      pop_album = Grammy.new(2014, "Best Pop Vocal Album", "Unorthodox Jukebox by Bruno Mars")
      dance_recording = Grammy.new(2014, "Best Dance Recording", "Clarity by Zedd")
      expect(Grammy.all).to include(pop_album, dance_recording)
    end
  end

  describe "::clear" do
    context "no grammys exist" do
      it "removes all instances of Grammy" do
        Grammy.clear
        expect(Grammy.all.count).to eq(0)
      end
    end

    context "multiple grammys exist" do
      before do
        Grammy.new(2014, "Best Rock Performance", "Radioactive by Imagine Dragons")
        Grammy.new(2014, "Best Rock Album", "Celebration Day by Led Zepplin")
      end

      it "removes all instances of Grammy" do
        Grammy.clear
        expect(Grammy.all.count).to eq(0)
      end
    end
  end

  describe "::save_all" do
    context "multiple grammys exist" do
      before do
        Grammy.clear
        Grammy.new(2014, "Best Rock Performance", "Radioactive by Imagine Dragons")
        Grammy.new(2014, "Best Rock Album", "Celebration Day by Led Zepplin")
      end

      it "saves the grammys in the CSV file" do
        Grammy.save_all("grammys_test.csv")
        f = File.new("grammys_test.csv","r")
        first_line = f.readline.chomp
        f.close
        expect(first_line).to eq "2014|Best Rock Performance|Radioactive by Imagine Dragons"
      end
    end
  end

  describe "::read_all" do
    context "grammys exist in our csv file" do
      before do
        Grammy.clear
        Grammy.new(2014, "Best Rock Performance", "Radioactive by Imagine Dragons")
        Grammy.new(2014, "Best Rock Album", "Celebration Day by Led Zepplin")
        Grammy.save_all("grammys_test.csv")
        Grammy.clear
      end

      it "reads all grammys from our grammy CSV" do
        Grammy.read_all("grammys_test.csv")
        expect(Grammy.all.count).to eq(2)
      end
    end
  end

  describe "::delete" do
    context "grammys exist in our csv file" do
      before do
        Grammy.clear
        @pop_album = Grammy.new(2014, "Best Pop Vocal Album", "Unorthodox Jukebox by Bruno Mars")
        @dance_recording = Grammy.new(2014, "Best Dance Recording", "Clarity by Zedd")
        Grammy.save_all("grammys_test.csv")
      end

      it "removes a grammy that we specify by index" do
        Grammy.delete(0)
        expect( Grammy.all ).not_to include(@pop_album)
        expect( Grammy.all ).to include(@dance_recording)
      end
    end

  end

  describe "#to_s" do
    let(:grammy) { Grammy.new(2014, "Record of the Year", "Get Lucky by Daft Punk") }

    it "returns a string with the year, category and winner" do
      expect(grammy.to_s).to eq("In 2014, the Grammy for Record of the Year went to Get Lucky by Daft Punk")
    end
  end

end