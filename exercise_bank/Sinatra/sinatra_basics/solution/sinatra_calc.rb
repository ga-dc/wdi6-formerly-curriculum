require 'sinatra'

history = {}
last_id = 0

get '/' do
  "Welcome to the Sinatra Calculator."
end

get '/calculator' do
  "These are the calculations you've done: #{history.values.join(' , ')}"
end

get '/calculator/:id' do
  id = params[:id].to_i
  history[id] || "Id not found!"
end

# To do the post, type this curl command into your terminal once your server is running
# curl -X POST -F first=5 -F second=10 http://localhost:4567/calculator/add
post '/calculator/:operation' do
  id = (last_id += 1)
  operation = params[:operation]
  first = params[:first].to_i
  second = params[:second].to_i
  case operation
  when "add"
    result = first + second
  when "subtract"
    result = first - second
  when "multiply"
    result = first * second
  when "divide"
    result = first / second
  end
  history[id] = "If you #{operation} #{first} and #{second} you get #{result}"
end

get '/mta/:on/:off' do
  n = ['ts', '34th', '28th', '23rd', 'us']
  on_stop_index = n.index(params[:on])
  off_stop_index = n.index(params[:off])
  trip_length = (on_stop_index - off_stop_index).abs
  "Your trip length from #{on} to #{off} is #{trip_length} stops."
end