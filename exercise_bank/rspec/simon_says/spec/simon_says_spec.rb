require_relative "../lib/simon_says"
    
    
describe Simon do
  describe "::echo" do
    it "should echo hello" do
      Simon.echo("hello").should == "hello"
    end

    it "should echo bye" do
      Simon.echo("bye").should == "bye"
    end
  end


  describe "::shout" do
    it "should shout hello" do
      Simon.shout("hello").should == "HELLO"
    end


    it "should shout multiple words" do
      Simon.shout("hello world").should == "HELLO WORLD"
    end
  end


  describe "::repeat" do
    context "it should repeat one word" do
      it "should repeat" do
        Simon.repeat("hello").should == "hello hello"
      end
    end

    context "it should repeat a word a certain amout of time" do
      it "should repeat" do
        Simon.repeat("hello", 3).should == "hello hello hello"
      end
    end
  end


  describe "::start_of_word" do
    it "returns the first letter" do
      Simon.start_of_word("hello", 1).should == "h"
    end


    it "returns the first two letters" do
      Simon.start_of_word("Bob", 2).should == "Bo"
    end


    it "returns the first several letters" do
      s = "abcdefg"
      Simon.start_of_word(s, 1).should == "a"
      Simon.start_of_word(s, 2).should == "ab"
      Simon.start_of_word(s, 3).should == "abc"
    end
  end


  describe "::first_word" do
    it "tells us the first word of 'Hello World' is 'Hello'" do
      Simon.first_word("Hello World").should == "Hello"
    end


    it "tells us the first word of 'oh dear' is 'oh'" do
      Simon.first_word("oh dear").should == "oh"
    end
  end


  describe "::titleize" do
    it "capitalizes a word" do
      Simon.titleize("jaws").should == "Jaws"
    end


    it "capitalizes every word (aka title case)" do
      Simon.titleize("david copperfield").should == "David Copperfield"
    end


    it "doesn't capitalize 'little words' in a title" do
      Simon.titleize("war and peace").should == "War and Peace"
    end


    it "does capitalize 'little words' at the start of a title" do
      Simon.titleize("the bridge over the river kwai").should == "The Bridge over the River Kwai"
    end
  end
end
