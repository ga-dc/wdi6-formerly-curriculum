class Movie < ActiveRecord::Base
  validates :title, :poster, :plot, presence: true
  validates :rating, inclusion: 1..5, allow_nil: true
end
