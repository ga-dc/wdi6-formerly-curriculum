version = ""
loop do
  puts "which version would you like to test?"
  puts "(n)aive"
  puts "(d)ynamic"
  version = gets.chomp.downcase
  break if ["d", "n"].include?(version)
end

case version
when 'd'
  require_relative "../lib/text_edit_dynamic"
when 'n'
  require_relative "../lib/text_edit_naive"
end


start_time = Time.now

puts "*" * 40
puts "Starting Memory:"
puts "*" * 40
puts `vmmap #{Process.pid} | grep Total`

doc  = TextEditor::Document.new
msg = "X"

[100, 1_000, 10_000, 100_000].each do |x|
  puts
  puts "*" * 40
  puts "Adding #{x} characters, 1 at a time"
  puts "*" * 40

  x.times do
    doc.add_text(msg)
  end

  puts "Current memory footprint:"
  puts `vmmap #{Process.pid} | grep Total`
end


puts "Took #{Time.now - start_time}s to run"
