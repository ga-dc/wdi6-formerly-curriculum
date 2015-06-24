require 'httparty'
require 'uri'
require 'pry'

WUNDERGROUND_KEY = ENV["WUNDERGROUND_KEY"]
binding.pry
city = ARGV[0]
state = ARGV[1]

encoded_city = URI.encode(city)
# weather =  HTTParty.get("http://api.openweathermap.org/data/2.5/weather?q=#{encoded_city}")

current =  HTTParty.get("http://api.wunderground.com/api/#{WUNDERGROUND_KEY}/conditions/q/#{state}/#{encoded_city}.json")
hourly = HTTParty.get("http://api.wunderground.com/api/#{WUNDERGROUND_KEY}/hourly/q/#{state}/#{encoded_city}.json")
current_conditions =  "THE CURRENT TEMPERATURE IS: #{current["current_observation"]["temp_f"]} DEGREES F"
hourly_forecast =  hourly["hourly_forecast"].map do|forecast|
  "#{forecast['FCTTIME']['civil']} : #{forecast['temp']['english']} degrees F"
end

puts current_conditions
puts hourly_forecast
