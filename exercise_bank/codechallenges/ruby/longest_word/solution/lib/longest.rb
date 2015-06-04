def longest_word(string)
  string.scan(/\w+/).max_by {|word| word.length}
end