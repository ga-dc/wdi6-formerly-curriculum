class Food < ActiveRecord::Base
  belongs_to :fridge

  def to_s
    return "Name: #{name} Vegan: #{is_vegan}"
  end
end
