class Cipher

  ## Two array strategy
  def self.encode(plaintext)
    plain_alphabet = ('a'..'z').to_a
    cipher_alphabet = plain.rotate(13)

    plaintext_array = plaintext.split('')

    ciphertext_array = plaintext_array.map do |char|
      index = plain_alphabet.index(char)
      cipher_alphabet[index]
    end

    ciphertext_array.join

  end

  ## Add 13 to the index strategy
  def self.encode(plaintext)
    plain_alphabet = ('a'..'z').to_a

    plaintext_array = plaintext.split('')

    ciphertext_array = plaintext_array.map do |char|
      plain_index = plain_alphabet.index(char)
      cipher_index = (plain_index + 13) % 26
      plain_alphabet[cipher_index]
    end

    ciphertext_array.join

  end

  def self.encode(plaintext)
    rotated_alphabet = Hash[('a'..'z').zip(('a'..'z').to_a.rotate(13))]
    encoded = plaintext.chars.map { |char| rotated_alphabet[char] }
    return encoded.join
  end

end