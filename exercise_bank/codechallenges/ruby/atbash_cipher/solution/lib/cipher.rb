require 'pry'
ALPHABET = ("a".."z").to_a


class Cipher
  def encode(word)
    word_as_array = word.downcase.split('')
    solution_array = word_as_array.map do |letter|
      ALPHABET.reverse[ALPHABET.index(letter)]
    end
    solution_array.join
  end
end

cipher = Cipher.new
answer = cipher.encode("hello")
puts answer


