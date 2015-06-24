# Check if two words are anagrams of each other
def anagram?(w1, w2)
  w1.chars.sort == w2.chars.sort
end

# Check each word in the word list
def find_anagrams(base_word, word_list)
  word_list.select do |word|
    anagram?(base_word, word)
  end
end
