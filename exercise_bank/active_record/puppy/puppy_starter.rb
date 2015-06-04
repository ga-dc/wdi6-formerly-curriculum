require 'active_record'
require 'pry'

I18n.enforce_available_locales = false
$connection = ActiveRecord::Base.establish_connection("postgres://localhost/puppy")

class Puppy < ActiveRecord::Base

end

binding.pry