module TextEditor

  # Naïve implementation by Gregory T. Brown.
  # Has a fatal flaw: memory footprint grows
  # with number-of-revisions x length-of-document.
  class Document
    def initialize
      @contents = ""
      @snapshots = []
      @reverted  = []
    end

    attr_reader :contents

    def add_text(text, position=-1)
      snapshot(true)
      contents.insert(position, text)
    end

    def remove_text(first=0, last=contents.length)
      snapshot(true)
      contents.slice!(first...last)
    end

    def snapshot(tainted=false)
      @reverted = [] if tainted
      @snapshots << @contents.dup
    end

    def undo
      return if @snapshots.empty?

      @reverted << @contents
      @contents = @snapshots.pop
    end

    def redo
      return if @reverted.empty?

      snapshot
      @contents = @reverted.pop
    end

  end
end
