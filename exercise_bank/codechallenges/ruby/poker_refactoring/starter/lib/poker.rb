class Hand
  def initialize(cards)
    @cards = cards
  end

  def values
    myfavoritestnumbersintheworld = []
    @cards.each do |mycard|
      value = mycard[0]

                if value == "A"

  myfavoritestnumbersintheworld << 1
  elsif value == "T"
  myfavoritestnumbersintheworld << 10


  elsif value == "J"
  myfavoritestnumbersintheworld.push(11)
  elsif value =="Q"
  myfavoritestnumbersintheworld << 12
  elsif value == "K"
  myfavoritestnumbersintheworld.push(13)
  else
  myfavoritestnumbersintheworld.push(value.to_i)
  end
    end
    myfavoritestnumbersintheworld
  end

  def suits
    mycardarray = Array.new
    for card in @cards do
    mycardarray << card.split("")[1]
    end
    return mycardarray
  end

  def straight?
    ordered_values = values.sort
    is_straight = true
    ordered_values.each_with_index do |value, index| 
    if index > 0
      if value != (ordered_values[index - 1] + 1)
    is_straight = false
    end
      end
    end
    is_straight
  end

  def flush?
    is_flush = true
    suits.each_with_index do |suit, index| 
    if index > 0
    if suit != (suits[index - 1])
    is_flush = false
    end
    end
    end
    is_flush
  end

  def full_house?
    ordered_values = values.sort
    if values.count(ordered_values[0]) == 2
      if values.count(ordered_values[-1]) == 3
        true
      end
    elsif values.count(ordered_values[-1]) == 2
      if values.count(ordered_values[0]) == 3
        true
      end
    else
      false
    end
      

  end

  def four_of_a_kind?
    ordered_values = values.sort
    if ordered_values[0] == ordered_values[1] && ordered_values[1] == ordered_values[2] && ordered_values[2] == ordered_values[3]
      true
    elsif ordered_values[1] == ordered_values[2] && ordered_values[2] == ordered_values[3] && ordered_values[3] == ordered_values[4]
      true
    else
      false
    end
  end

  def best_hand
        ordered_values = values.sort
    is_straight = true
    ordered_values.each_with_index do |value, index| 
    if index > 0
    if value != (ordered_values[index - 1] + 1)
    is_straight = false
    end
    end
    end
    is_flush = true
    suits.each_with_index do |suit, index| 
    if index > 0
    if suit != (suits[index - 1])
    is_flush = false
    end
    end
    end

    if is_straight && is_flush
      "Straight Flush"
    elsif four_of_a_kind?
      "Four of a Kind"
    elsif full_house?
      "Full House"
    elsif flush?
      "Flush"
    elsif straight?
      "Straight"
    else
      "Not much"
    end
  end

end



