require 'active_record'
require 'pry'

I18n.enforce_available_locales = false
$connection = ActiveRecord::Base.establish_connection("postgres://localhost/puppy")

class Puppy < ActiveRecord::Base
  validates :name,
    length: {
      minimum: 3
    }

  validates :age,
    numericality: {
      less_than_or_equal_to: 2,
      message: "is too old to be a puppy"
    }

  validate :name_cuteness

  def name_cuteness
    if name[-1] != 'y' && name[-2..-1] != 'ie'
      errors.add(:name_cuteness, "is not sufficiently cute.")
    end
  end
end

binding.pry