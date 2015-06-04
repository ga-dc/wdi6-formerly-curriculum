class Integer
  def factorial
    (1..self).reduce(:*) || 1
  end
end

def n_choose_r(n, r)
  n.factorial / (r.factorial * (n-r).factorial)
end

# Center element in Pascal's Triangle line 40
n_choose_r(40,20)