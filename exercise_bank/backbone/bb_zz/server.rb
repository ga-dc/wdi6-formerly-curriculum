require 'sinatra'
require 'sinatra/reloader'
require 'httparty'
require 'json'
require 'uri'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end