# Sinatra & REST

- Explain what REST is and why we use it
- List the HTTP request verbs
- Describe what Sinatra is and what it is used for
- Describe the roles of WEBrick and Rack, and where they reside in the web application stack
- Distinguish between a route and a path
- Build a Sinatra app that responds to HTTP requests
- Define routes using Sinatra
- Define routes with URL parameters and access those parameters
- Use erb to create reusable views and templates
- Use a global template - layout.erb
- Use forms to submit POST and GET requests

## REST

or, REpresentational State Transfer is a convention for making HTTP requests. We use REST to remove
redundancy in network requests and agree on routes and what they do.

Every HTTP request consists of a request **method** and **path** 

| Method | Path | Usage |
| --- | --- | --- |
| GET | `/students/:id?` | Read information about a student or students |
| POST | `/students` | Creates a new student |
| PUT | `/students/:id` | Updates existing student with all new content |
| PATCH | `/students/:id` | Updates existing student with partially new content |
| DELETE | `/students/:id` | Deletes a student

### You do:

Create routes for the following requests. The first one is done for you.

1. Create a new animal
  - `POST /animals`
2. Delete an animal
3. Update an existing homework assignment
4. Create a new class at GA.
5. View all students in WDI.
6. Update the info for an animal with 3 as its id.
7. Update homework submission #32 for assignment #3

## Postman

So far, we know how to make GET requests only. We do this by visiting a URL in a browser. The browser then
initiates a GET request to the provided path (the URL you entered.)

Form submissions initiate POST requests. (example here submitting a form to restful.link)

Postman allows us to easily test different types of requests.

## Sinatra

>Sinatra is a DSL for quickly creating web applications in Ruby with minimal effort

```ruby
# myapp.rb
require 'sinatra'

get '/' do
  'Hello world!'
end
```

But since we might want to share this code, let's create a Gemfile and add sinatra-contrib

```ruby
# Gemfile.rb

source https://rubygems.org/

gem 'sinatra'
gem 'sinatra-contrib'
```

bundle install, and require sinatra's reloader:

```ruby
# myapp.rb
require 'sinatra'
require 'sinatra/reloader'

get '/' do
  'Hello Jesse!'
end

get '/:name' do
  "Hello, #{params[:name]}"
end
```

## You do: 99 Bottles of Beer

https://github.com/ga-dc/99_bottles_of_beer

## Sinatra Views

We do: Convert 99 bottles to use views

## Sinatra Assets

any files in the `public` folder will be served as static assets

## You do: Pair Programming Bot

https://github.com/ga-dc/pair_programming_bot

## We do: Forms

Use example with GET and POST.

Forms with a GET action are useful for search forms.

Forms with a POST action are useful for creating new things.

## You do: Ultimate Complement

https://github.com/ga-dc/emergency_compliment
