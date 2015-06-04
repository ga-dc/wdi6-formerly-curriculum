# Check out what a "Greedy algorithm" is. It is a pretty common idea in computer science.
# http://en.wikipedia.org/wiki/Greedy_algorithm
require 'pry'

def make_change(cents)
  coins = [25,10,5,1]
  coins.map do |coin|
    number_of_coin = count_coins(cents, coin)
    cents %= coin
    number_of_coin
  end
end

def count_coins(cents, coin)
  cents / coin
end
