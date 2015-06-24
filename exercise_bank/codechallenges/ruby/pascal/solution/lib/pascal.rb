class Integer
  def fact
    (1..self).reduce(:*) || 1
  end
end

def n_choose_r(n, r)
  n.fact / (r.fact * (n-r).fact)
end

def pascal(n)
  row = []
  0.upto(n) do |r|
    row << n_choose_r(n,r)
  end
  row
end
