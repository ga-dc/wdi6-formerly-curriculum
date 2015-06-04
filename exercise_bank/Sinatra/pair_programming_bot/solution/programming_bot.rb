require 'sinatra'

get '/' do
  @direction = "Do you have a test for that?"
  @yes = '/pass'
  @no = '/write_test'
  erb :bot
end

get '/pass' do
  @direction = "Does the test pass?"
  @yes = '/refactor'
  @no = '/write_code'
  erb :bot
end

get "/write_test" do
  @direction = "Write a test."
  @yes = "/pass"
  erb :done
end

get "/refactor" do
  @direction = "Need to refactor?"
  @yes = "/do_refactor"
  @no = "/new_feature"
  erb :bot
end

get "/do_refactor" do
  @direction = "Refactor the code."
  @yes = '/pass'
  erb :done
end

get "/write_code" do
  @direction = "Write just enough code for the test to pass."
  @yes = "/pass"
  erb :done
end

get "/new_feature" do
  @direction = "Select a new feature to implement."
  @yes = "/"
  erb :done
end