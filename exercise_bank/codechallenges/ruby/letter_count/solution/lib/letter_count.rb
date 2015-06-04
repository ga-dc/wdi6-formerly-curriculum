def letter_count(string)
  letters = string.downcase.gsub(" ","").chars
  letters.uniq.each_with_object({}) { |letter, hash| hash[letter] = letters.count(letter) }
end