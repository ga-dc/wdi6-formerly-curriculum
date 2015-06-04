require 'benchmark'

###############
### Setup!
###############

def linear(n)
  return n + 1
end

def single_loop(n)
  total = 0
  n.times do |number|
    total += number
  end
  return total
end

def nested_loop(n)
  total = 0
  n.times do |number|
    n.times do |inner_num|
      n.times do |way_inner_num|
        total += way_inner_num
      end
    end
  end
  return total
end

###############
### Thunderdome
###############
puts "Ready, steady, Go!"
# http://www.ruby-doc.org/stdlib-1.9.3/libdoc/benchmark/rdoc/Benchmark.html
# http://rubylearning.com/blog/2013/06/19/how-do-i-benchmark-ruby-code/

iterations = 10 # Run the test mutliple iterations to make sure we get a meaningful number.
n = 100

# (10) is padding for headers so we get nice looking output
Benchmark.bmbm(10) do |bm|
  # The times for some benchmarks depend on the order in which items are run. 
  # These differences are due to the cost of memory allocation and garbage collection.
  # To avoid these discrepancies, the bmbm method is provided. 
  # `bmbm` first runs the code as a 'rehearsal' to force any initialization that needs to happen and 
  # and ensure that the system is fully initialized and the benchmark is fair.

  bm.report("Linear") do
    iterations.times do
      linear(n)
    end
  end

  bm.report("Single Loop") do
    iterations.times do
      single_loop(n)
    end
  end

  bm.report("Nested Loop") do
    iterations.times do
      nested_loop(n)
    end
  end

end