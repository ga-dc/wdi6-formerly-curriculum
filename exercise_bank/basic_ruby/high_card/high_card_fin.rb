# 1. Create a deck:
def deck_o_cards
  values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
  suits = ['hearts', 'diamonds', 'clubs', 'spades']
  deck = []

  values.each_with_index do |v, i|
    suits.each do |s|
      deck.push({
        score: i,
        value: v,
        suit: s,
      })
    end
  end

  return deck.shuffle
end


# 2. Collect players:
deck = deck_o_cards
players = []

# Collect names:
while true
  puts "#{players.length} so far. Enter a player name, or type 'play':"
  name = gets.chomp

  break if name == "play"
  players.push(name)
end


# 3. Map players into cards
cards = players.map do |player|
  deck.pop
end


# 4. Find highest score
scores = cards.map do |card|
  card[:score]
end

high_score = scores.max


# 5. Select winners
winners = []

scores.each_with_index do |score, index|
  winners.push(players[index]) if score == high_score
end

puts "Winner(s): #{winners.join(', ')}"
puts cards