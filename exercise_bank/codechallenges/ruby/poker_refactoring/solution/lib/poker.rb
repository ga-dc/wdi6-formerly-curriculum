class Hand
  def initialize(cards)
    @cards = cards
  end

  def values
    @cards.map {|card| map_to_number(card[0])}.sort
  end

  def suits
    @cards.map {|card| card[1]}
  end

  def map_to_number(value)
    letter_key = {"A" => 1, "T" => 10, "J" => 11, "Q" => 12, "K" => 13}
    letter_key[value] || value.to_i
  end

  def straight?
    (values[0]..values[-1]).to_a == values
  end

  def flush?
    suits.uniq.length == 1
  end

  def full_house?
    values.uniq.length == 2 && values[1] != values[3]
  end

  def four_of_a_kind?
    values.uniq.length == 2 && values[1] == values[3]
  end

  def best_hand
    straight? && flush? ? "Straight Flush"
    : four_of_a_kind? ? "Four of a Kind"
    : full_house? ? "Full House"
    : flush? ? "Flush"
    : straight? ? "Straight"
    : "Not much"
  end

end