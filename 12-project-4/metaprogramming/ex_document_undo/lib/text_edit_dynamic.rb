module TextEditor
  class Document
    def initialize
      @contents = ""
      @snapshots = []
      @reverted  = []
    end

    attr_reader :contents

    def add_text(text, position=-1)
      redo_method =   { name: :insert, args: [position, text] }

      if position < 0
        undo_method = { name: :slice!, args: [(position - text.length + 1)..position] }
      else
        undo_method = { name: :slice!, args: [position...(position + text.length)] }
      end

      snapshot(true, undo_method, redo_method)
      contents.insert(position, text)
    end

    def remove_text(first=0, last=contents.length)
      removed_text = contents.slice!(first...last)

      redo_method = { name: :slice,   args: [first...last] }
      undo_method = { name: :insert,  args: [first, removed_text] }

      snapshot(true, undo_method, redo_method)
    end

    def snapshot(tainted, undo_method, redo_method)
      @reverted = [] if tainted
      @snapshots << {undo: undo_method, redo: redo_method}
    end

    def undo
      return if @snapshots.empty?
      current_snapshot = @snapshots.pop
      @reverted << current_snapshot
      contents.send(current_snapshot[:undo][:name], *current_snapshot[:undo][:args])
    end

    def redo
      return if @reverted.empty?
      current_reverted = @reverted.pop
      snapshot(false, current_reverted[:undo], current_reverted[:redo] )
      contents.send(current_reverted[:redo][:name], *current_reverted[:redo][:args])
    end

  end
end
