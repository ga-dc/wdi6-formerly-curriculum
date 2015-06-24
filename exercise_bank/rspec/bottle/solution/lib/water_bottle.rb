class WaterBottle
  def initialize
    @empty = true
  end

  def empty?
    return @empty
  end

  def fill
    @empty = false
  end

  def drink
    if empty?
      return "The bottle is empty"
    else
      @empty = true
      return "Water"
    end
  end
end