# Sinatra & REST

- Explain what REST is and why we use it
- List the HTTP request verbs
- Describe what Sinatra is and what it is used for
- Distinguish between a route and a path
- Build a Sinatra app that responds to HTTP requests
- Define routes using Sinatra
- Define routes with URL parameters and access those parameters
- Use erb to create reusable views and templates
- Access data from global params hash
- Use a global template - layout.erb
- Use forms to submit POST and GET requests

## REST

or, REpresentational State Transfer is a convention for making HTTP requests. We use REST to remove
redundancy in network requests and agree on routes and what they do.

Every HTTP request consists of a request **method** and **path** 

### Restful Routes

**Route = Method + Path**

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

## Sinatra

>Sinatra is a DSL for quickly creating web applications in Ruby with minimal effort

### Useful Links

- [Intro to Sinatra](http://www.sinatrarb.com/intro.html)
- [Sinatra in the wild](http://www.sinatrarb.com/wild.html)
- [Sinatra Documentation](http://www.sinatrarb.com/documentation.html)
- [Sinatra Recipes](http://recipes.sinatrarb.com/)

```ruby
# myapp.rb
require 'sinatra'

get '/' do
  'Hello world!'
end
```

But since we might want to share this code, let's create a Gemfile and add sinatra-contrib

```ruby
# Gemfile

source 'https://rubygems.org/'

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


### We do: Sinatra Views

Convert 99 bottles ex. to use views.

Let's convert the hardcoded strings in our application to take advantage of Sinatra's built-in templating engine: erb.

Create a directory called `views` and a file in that folder called `index.erb`

In your main application file, render the view with the keyword `erb`

Our entire application looks like:

```ruby
require 'sinatra'
get '/' do
  erb :index
end
```

```html
<!-- /views/index.erb -->
This is the home page.
```

### Passing Variables to Views

To share variables from the application with the view, define instance variables:


```ruby
require 'sinatra'
get '/:num_bottles' do
  @num_bottles = params[:num_bottles]
  @next = @num_bottles -= 1
  erb :index
end
```

```html
<!-- /views/index.erb -->
<%= @num_bottles %> of beer on the wall.
<a href='/<%= @next %>'>Take one down.</a>
```

### More complex ruby with erb

If you have a collection to loop through, like an array or a hash, you use
a slightly different syntax:

```html
<!-- /views/index.erb -->
<% @num_bottles.times do |i| %>  <!-- note the missing `=` -->
  bottle #<%= i %> is on the wall. 
<% end %>
<a href='/<%= @next %>'>Take one down.</a>
```

## Sinatra Assets

any files in the `public` folder will be served as static assets

For example, you would create a file `public/css/styles.css`

and link to it with

```html
<link rel="stylesheet" type="text/css" href="/css/styles.css">
```

Instead of copying and pasting this link to each of the views, we can use a global layout view
which will be loaded "around" every other view.

```html
<!-- views/layout.erb -->
<!doctype html>
<html>
  <head></head>
  <body>
    <%= yield %> <!-- load whatever template was called here -->
  </body>
</html>
```

## You do: Pair Programming Bot

https://github.com/ga-dc/pair_programming_bot

## Postman

So far, we know how to make GET requests only. We do this by visiting a URL in a browser. The browser then
initiates a GET request to the provided path (the URL you entered.)

Form submissions initiate POST requests. (example here submitting a form to restful.link)

Postman allows us to easily test different types of requests.

Let's compare the output of GET requests initiated in Postman and in the browser.

## We do: Forms

Forms with a POST action are useful for creating new things.

```html
<form method='post' action='/'>
  <input type='text' name='student-name'>
</form>
```

Any input with a `name` attribute will show up an element of `params`

Forms with a GET action are useful for search forms.

```html
<form method='get' action='/'>
  <input type='search' name='student-name'>
</form>
```

**Question**: What's the benefit of using GET requests with search forms?

## You do: Emergency Complement

https://github.com/ga-dc/emergency_compliment

### Sample Quiz Questions

- List the 5 HTTP request methods. How do they relate to the 4 crud actions?
- What is the purpose of sinatra's `layout.erb` file?
- Write an html `<script>` tag that links to a js file in `public/js/app.js`
