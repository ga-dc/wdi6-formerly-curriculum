class Student
  def initialize(name)
    @name = name
    @energy_level = 100
    @smarts = 0
  end

  def name
    return @name
  end

  def energy_level
    return @energy_level
  end

  def smarts
    return @smarts
  end

  def break
    @energy_level = 100
  end

  def code
    if energy_level == 100
      @energy_level = 0
      @smarts += 1
    end
  end
end