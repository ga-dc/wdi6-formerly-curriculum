# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Sku.create [
  { code: 'a1', name: 'Cola', price: 150, quantity: 10 },
  { code: 'a2', name: 'Dr. Pepper', price: 150, quantity: 5 },
  { code: 'a3', name: 'Root Beer', price: 150, quantity: 1 },
  { code: 'b1', name: 'Sprite', price: 150, quantity: 5 },
  { code: 'b2', name: 'Ginger Ale', price: 100, quantity: 5 },
  { code: 'b3', name: 'Fruit Punch', price: 100, quantity: 0 },
  { code: 'c1', name: 'Grape', price: 100, quantity: 5 },
  { code: 'c2', name: 'Spring Water', price: 200, quantity: 5 },
  { code: 'c3', name: '', price: 150, quantity: 0 }
]