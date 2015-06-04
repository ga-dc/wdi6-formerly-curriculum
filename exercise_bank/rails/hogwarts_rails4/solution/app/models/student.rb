class Student < ActiveRecord::Base
  belongs_to :house

  before_create :sorting_ceremony

  private

  def sorting_ceremony
    if self.house.nil?
      self.house = House.all.sample
    end
  end

end