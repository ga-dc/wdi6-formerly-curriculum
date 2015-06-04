puts "Hello, I am C-3P0, human-cyborg relations. What's your name?"

name = gets.chomp

puts "It's a pleasure to meet you, #{name}. Have you ever met a protocol droid before?"

first_protocol_droid = gets.chomp

puts "#{first_protocol_droid}? How interesting, for someone from around these parts."
puts "I'm terribly sorry for prying, but you don't by any chance go by the alias of Obi-Wan Kenobi, do you?"
puts "(Answer \"I do\" or \"I don't\")"

has_alias_obi_wan = gets.chomp.downcase

if has_alias_obi_wan == "i do"
  puts "Oh, marvelous! Simply marvelous! Say hello to R2-D2; he's been looking all over for you."
else
  puts "I've really enjoyed speaking with you, #{name}, but if you'll please excuse me, I have to " +
       "help my friend find someone named Obi-Wan Kenobi."
  puts "(Enter your favorite goodbye phrase)"
  goodbye_phrase = gets.chomp
  puts "#{goodbye_phrase} to you too."
  puts "Well R2, I suppose we'll just have to keep looking."
  puts "R2-D2: (Agreeable droid noises)"
end







