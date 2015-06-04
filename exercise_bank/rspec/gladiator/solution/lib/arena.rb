class Arena
  def initialize(name)
    @name = name
    @gladiators = []
  end

  def name
    return @name
  end

  def gladiators
    return @gladiators
  end

  def add_gladiator(gladiator)
    if gladiators.size < 2
      gladiators << gladiator
    end
  end

  def fight
    beats = { "Trident" => "Spear", "Spear" => "Club", "Club" => "Trident" }

    if gladiators. size == 2
      if gladiators.first.weapon == gladiators.last.weapon
        gladiators.clear
      elsif beats[gladiators.first.weapon] == gladiators.last.weapon
        gladiators.delete_at(1)
      else
        gladiators.delete_at(0)
      end
    end
  end
end