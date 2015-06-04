class Nation
  def creed
    return "all men are created equal"
  end

  def rise_up?
    return true
  end
end

class State
  def initialize(name)
    @name = name
    @table = []
  end

  def name
    return @name
  end

  def people
    return [{:ancestors => "slaves"},{:ancestors => "slave-owners"}]
  end

  def table_of_brotherhood
    return @table
  end

  def sit_at_table(person_array)
    person_array.each do |person|
      @table << person
    end
  end
end

class Freedom

end
