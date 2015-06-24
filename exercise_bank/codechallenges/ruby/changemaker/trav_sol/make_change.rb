require 'pry'

def make_change(cents)
  quarters = cents / 25
  cents_left = cents - (quarters * 25)
  dimes = cents_left / 10
  cents_left = cents_left - (dimes * 10)
  nickels = cents_left / 5
  cents_left = cents_left - (nickels * 5)
  return [quarters, dimes, nickels, cents_left]
end
