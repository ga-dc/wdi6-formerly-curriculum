class Drink < ActiveRecord::Base
  belongs_to :fridge

  def to_s
    return name
  end
end