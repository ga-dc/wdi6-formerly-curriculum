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

REST, or REpresentational State Transfer is a convention for making HTTP requests. We use REST to remove redundancy in network requests and agree on routes and what they do.

Knowing REST is important because the vast majority of web developers have agreed to follow this same convention.

Every HTTP request consists of a request **method** and **path** 

### Restful Routes

**Route = Method + Path**

Following a route results in an **action**. Here are some examples:

| Method | Path | Action |
| --- | --- | --- |
| GET | `/students` | Read information about all students |
| GET | `/students/:id` | Read information about a student |
| POST | `/students` | Creates a new student |
| PUT | `/students/:id` | Updates existing student with all new content |
| PATCH | `/students/:id` | Updates existing student with partially new content |
| DELETE | `/students/:id` | Deletes a student

#### Path Parameters

What's up with the `:id` thing?

This works similarly to Ruby methods and Javascript functions. For example:

```ruby
def say_hi name
  puts "Hey there, #{name}!"
end
```

This is a `say_hi` method that has an argument called `name`. An argument lets us pass some data into the method so the method can manipulate the data somehow.

The `PATCH` route above is kind of like this imaginary method:

```ruby
def patch_student id
  Student.find(id).update
end
```

> This is so easy-to-read it looks like pseudo-code, but it's actually ActiveRecord, which we'll learn later!

These symbols which you see in paths are like method arguments: they're a way of passing data to the action.

### You do:

Write out the routes for the following requests. The first one is done for you.

1. Create a new animal
  - `POST /animals`
2. Delete an animal
3. Update an existing homework assignment
4. Create a new class at GA.
5. View all students in WDI.
6. Update the info for an animal with 3 as its id.
7. Update homework submission #32 for assignment #3

## Sinatra

Sinatra is a **DSL** for quickly creating web applications in Ruby with minimal effort.

A Domain-Specific Language is something defined by the makers of an application to standardize how others interact with their application.

This is similar to how in jQuery you begin everything with `$` -- you're still writing Javascript, but you're writing it in a specific way in order to interact with this thing someone else built.

Following from that, Sinatra is to web apps what jQuery is to webpages. We have this idea of REST methods send to paths making things happen -- Sinatra is one way of turning that concept into reality. Other ways include Rails, Node.js, Django, PHP, etc.

### Useful Links

- [Intro to Sinatra](http://www.sinatrarb.com/intro.html)
- [Sinatra in the wild](http://www.sinatrarb.com/wild.html)
- [Sinatra Documentation](http://www.sinatrarb.com/documentation.html)
- [Sinatra Recipes](http://recipes.sinatrarb.com/)

Your very first Sinatra app!

Create a file called `app.rb`. The file name doesn't matter, but it's easier if we all use the same one.

Inside it, write:

```ruby
require 'sinatra'

get '/' do
  'Hello world!'
end
```

Then, in your console, run the file the way you'd run any Ruby file:

```sh
$ ruby app.rb
```

You should see something like:

```
[2015-10-30 13:57:04] INFO  WEBrick 1.3.1
[2015-10-30 13:57:04] INFO  ruby 2.2.1 (2015-02-26) [x86_64-darwin14]
== Sinatra (v1.4.6) has taken the stage on 4567 for development with backup from WEBrick
```

> There'll be lots of little Sinatra-isms here.

Believe it or not, that's it! You now have a server running on your computer. If you go to `localhost:4567` in your browser, you should see "Hello world!"

Note that this isn't a server anyone else can see, but it's still a server.

## The Console

#### Where did that `4567` come from?

This is the **port number** of the server we're using. Don't worry about it too much -- just know that to access a Sinatra app on your computer you'll always use `localhost:4567`, unless someone changes it.

#### Refresh that "hello world" page in your browser

Watch your terminal as you do so. See how the tab with Sinatra in it updates every time? This is your **server log**. Sinatra tells Ruby to `puts` some information it thinks you might find useful every time you get an HTTP request.

The server log is super-useful! Right underneath `get '/' do`, write `puts "Hi there"`. Now quit Sinatra with **Control + C** and restart it with `ruby app.rb`. Refresh your webpage a couple times. See how it prints "Hi there" each time?

#### Getting user input

Let's make this app dynamic and have it say your name. So far, the way we'd do that is by adding `gets.chomp`. Let's try that here:

```rb
require 'sinatra'

get '/' do
  name = gets.chomp
  "Hi there, #{name}!"
end
```

Quit and restart Sinatra, and refresh `localhost:4567`.

Notice how the webpage is still loading? The spinner is still going round and round. It's doing that because the server is all hung up: Ruby won't let it do anything until we've entered some input for `gets`.

So try writing your name in the Terminal console, then hitting return.

#### We have a way of getting user input... Why isn't it practical?

Because (hopefully) no-one else will be able to access your server log!

**You will never have any reason to use `gets` again.** So don't!

#### We've seen one other way of passing in data today...?

Instead of `get '/'`, try `get '/:name'`:

```rb
require 'sinatra'

get '/:name' do
  "Hi there, #{params[:name]}!"
end
```

Now go to `localhost:4567/yourname`. See your name show up?

`params` is a hash that is generated with every request made to your server. It contains any path parameters -- and some other stuff, as we'll see later.

Now try going to `localhost:4567` without your name at the end. We get a 404 page. This is because we're telling Sinatra, "Hey, this route will always have this path parameter in it." Sinatra doesn't have a route defined without a path parameter,so it throws an error.

The same thing happens if you go to `localhost:4567/yourname/lastname`: Sinatra doesn't have a route defined that has two path parameters.

### Moar Routes

Let's make two more routes: one with no path params, and one with two path params.

```rb
require 'sinatra'

get '/' do
  "Hi there!"
end

get '/:name' do
  "Good to see you, #{params[:name]}."
end

get '/:firstname/:lastname' do
  "Your name is #{params[:lastname]}. #{params[:firstname]} #{params[:lastname]}"
end
```

You can have as many path params as you want!

#### So where does this text come from?

`get` is a method. Whatever is returned by that method is what is spit out in the web browser by Sinatra.

#### How can this work if `return` isn't anywhere?

We're using implicit return here. Put in `return` and it works the same way!

Try putting some HTML in one of those strings, like `"<h1>Hi there!</h1>"`. It works! Obviously writing `DOCTYPE` and everything else in here would get really annoying, so later we'll learn how to use Sinatra templates.

But we already have an app that generates different HTML based on user input. This is your first back-end app!

# BREAK

### I'm getting tired of quitting and restarting.

Fortunately, there's a gem that will automatically restart Sinatra every time a change is made to your `app.rb`.

Let's create a Gemfile:

```ruby
source 'https://rubygems.org/'

gem 'sinatra'
gem 'sinatra-contrib'
```

This should create a `Gemfile.lock`, which you don't need to touch.

`bundle install`, and require sinatra's reloader in your `app.rb`:

```ruby
require 'sinatra'
require 'sinatra/reloader'

get '/' do
  "<h1>Hi there!</h1>"
end

get '/:name' do
  "Good to see you, #{params[:name]}."
end

get '/:firstname/:lastname' do
  "Your name is #{params[:lastname]}. #{params[:firstname]} #{params[:lastname]}"
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
