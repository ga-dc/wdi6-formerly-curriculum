100.times do
  Word.create(word: Faker::Company.bs.split(' ').first)
end