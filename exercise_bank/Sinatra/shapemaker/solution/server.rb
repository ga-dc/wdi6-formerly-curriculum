require 'sinatra'
require 'sinatra/reloader'

get '/' do
  erb :index
end

get '/multiples' do
  @number_squares = params[:num].to_i
  erb :multiples
end