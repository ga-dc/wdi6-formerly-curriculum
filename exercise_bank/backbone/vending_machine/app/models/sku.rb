class Sku < ActiveRecord::Base
  validates :code, presence: true, length: {minimum: 2, maximum: 2}
  validates :price, presence: true
  validates :quantity, presence: true
end
