require "test/unit"
require 'rubygems'

# gem install contest or github.com/citrusbyte/contest
require "contest"

version = ""
loop do
  puts "which version would you like to test?"
  puts "(n)aive"
  puts "(d)ynamic"
  version = gets.chomp.downcase
  break if ["d", "n"].include?(version)
end

case version
when 'd'
  require_relative "../lib/text_edit_dynamic"
when 'n'
  require_relative "../lib/text_edit_naive"
end

class DocumentTest < Test::Unit::TestCase

  setup do
    @doc = TextEditor::Document.new
  end

  test "Document starts with empty content" do
    assert @doc.contents.empty?
  end

  describe "Document#add_text" do
    test "adds text to document contents" do
      @doc.add_text("Hello Document")

      assert_equal "Hello Document", @doc.contents
    end

    test "appends by default" do
      @doc.add_text("Hello Document.")
      @doc.add_text(" How are you?")

      assert_equal "Hello Document. How are you?", @doc.contents
    end

    test "allows inserting text at a specific position in the contents" do
      @doc.add_text "Hal"
      @doc.add_text("skel", 2)

      assert_equal "Haskell", @doc.contents
    end
  end

  describe "Document#remove_text" do

    setup do
      @doc.add_text("Hello World")
    end

    test "deletes from a given position to the content's end by default" do
      @doc.remove_text(5)
      assert_equal "Hello", @doc.contents
    end

    test "can delete between a start and end point" do
      @doc.remove_text(2,9)
      assert_equal "Held", @doc.contents
    end

  end

  describe "Document#undo" do

    setup do
      @doc.add_text "Hello"
    end

    test "can undo add_text operations" do
      @doc.add_text " World"
      @doc.undo

      assert_equal "Hello", @doc.contents

      @doc.add_text "llo Me", 2
      @doc.add_text " Jello"

      assert_equal "Hello Mello Jello", @doc.contents

      @doc.add_text "123", -4

      assert_equal "Hello Mello Je123llo", @doc.contents
      @doc.undo

      assert_equal "Hello Mello Jello", @doc.contents

      @doc.undo

      assert_equal "Hello Mello", @doc.contents

      @doc.undo

      assert_equal "Hello", @doc.contents
    end

    test "can undo remove_text operations" do
      @doc.remove_text(2)
      @doc.undo

      assert_equal "Hello", @doc.contents

      @doc.remove_text(1,3)
      @doc.remove_text(1)

      @doc.undo
      assert_equal "Hlo", @doc.contents

      @doc.undo
      assert_equal "Hello", @doc.contents
    end

  end

  describe "Document#redo" do

    setup do
      @doc.add_text "Hello World"
    end

    test "can redo add_text operations" do
      @doc.add_text " Cup"
      @doc.undo
      @doc.redo

      assert_equal "Hello World Cup", @doc.contents
    end

    test "can undo a redo" do
      @doc.add_text " Cup"
      @doc.undo
      @doc.redo
      @doc.undo

      assert_equal "Hello World", @doc.contents
    end

  end
end
