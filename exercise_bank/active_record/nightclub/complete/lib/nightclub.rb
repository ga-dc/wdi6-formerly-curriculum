require 'active_record'

I18n.enforce_available_locales = false
$connection = ActiveRecord::Base.establish_connection("postgres://localhost/nightclub")

class Clubber < ActiveRecord::Base
  validates :name,
    presence: true,
    length: {
      minimum: 2
    }

  validates :age,
    presence: true,
    numericality: {
      only_integer: true,
      greater_than_or_equal_to: 21,
      less_than: 60
    }

  validates :gender,
    presence: true,
    inclusion: {
      in: %w(f m)
    }

  validate :validate_gender_ratio

  def validate_gender_ratio
    if gender == 'm'
      males = Clubber.where(gender: 'm').count()
      females = Clubber.where(gender: 'f').count()
      
      if males*2 >= females
        errors.add(:gender_ratio, "requires twice as many females in the nightclub")
      end
    end

    return errors.empty?
  end

  def format_gender
    case gender
    when "m"
      "male"
    when "f"
      "female"
    end
  end

  def format_record
    return "[#{id}] #{name} (#{age} year old #{format_gender})"
  end
end
