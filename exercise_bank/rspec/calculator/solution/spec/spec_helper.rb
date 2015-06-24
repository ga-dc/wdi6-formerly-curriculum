RSpec.configure do |config|
  # Use color in STDOUT
  config.color_enabled = true
  # Use color not only in STDOUT but also in pagers and files
  config.tty = true
  # Use the specified formatter
  config.formatter = :documentation  # :progress, :html, :textmate
  # immediately stop running upon first failure
  config.fail_fast = false
end