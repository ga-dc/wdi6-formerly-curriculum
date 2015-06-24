def triplet?(a,b,c)
  a**2 + b**2  == c**2
end

(1..332).each do |a|
  (a+1..500).each do |b|
    c = 1000 - a -b
    if triplet?(a,b,c)
      puts a*b*c
    end
  end
end