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

## Opening Framing
We've learned about databases using SQL. We've also learned about objects in ruby. But we haven't seen any HTML since Unit 1! What gives? How are we going to display all of the things in our database? How can we create a UI to execute CRUD functionality on our different ruby objects? Sinatra. Today you'll be learning about how to create routes and views. In order to talk about how Sinatra functions, we need to talk about how HTTP requests work. Let's talk about REST.

## REST

or, REpresentational State Transfer is a software architectural style(convention) for making HTTP requests. We use REST to remove redundancy in network requests and agree on routes and what they do to create a more maintainable architecture.

Every HTTP request consists of a request **method** and **path**

This is basically your browsers way of communicating with a server. It says to the server, "HEY! I'm about to do create read, update, or delete something on you(method) and I want you to create, read, update or delete HERE(path)"

We make requests all the time. Everytime you go to your browser, enter a url and hit enter, that's what you're doing. Whenever you create/signup for a website you make a request. If you edit a comment or delete a photo, you are making a request.


Method - The Method basically describes the type of request it will be. They will map to the 4 different CRUD functionalities

| Method | Crud functionality |
|---|---|
|GET| read |
|POST| create |
|PUT| update |
|PATCH| update |
|DELETE| delete |

> Though put and patch both update, put replaces all new content whereas patch only partially updates the object replacing only some of its properties.

Path - The path is essentially where the request is sent(the url)

### Examples of RESTful Routes
**Route = Method + Path**

| Method | Path | Usage |
| --- | --- | --- |
| GET | `/students` | Read information about all students |
| GET | `/students/1` | Read information about a student whose id is 1 |
| POST | `/students` | Creates a new student |
| PUT | `/students/1` | Updates existing student with an id of 1 with all new content |
| PATCH | `/students/1` | Updates existing student with an id of 1 with partially new content |
| DELETE | `/students/1` | Deletes the student with the id of 1

> note the path(url) doesn't contain any of the words describing the CRUD functionality that needs to execute, thats the methods job. This is that removal of redundancy we were talking about before.

Let's checkout the [espn website](http://espn.go.com/). If we go to a specific players webpage, we can this same sort of structure in the URL. It's a written a little differently but the concept is the same .

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

>  DSL is short for domain specific language. It's a special library built on top of ruby. In this case, Sinatra is a DSL for quickly creating web applications in Ruby with minimal effort.

### Useful Links

- [Intro to Sinatra](http://www.sinatrarb.com/intro.html)
- [Sinatra in the wild](http://www.sinatrarb.com/wild.html)
- [Sinatra Documentation](http://www.sinatrarb.com/documentation.html)
- [Sinatra Recipes](http://recipes.sinatrarb.com/)


Let's create a folder to work in and a couple of files.

```bash
$ mkdir sinatra_intro
$ cd sinatra_intro
$ touch app.rb
$ touch Gemfile
```

Since we might want to share this code, let's create a Gemfile and add sinatra-contrib

```ruby
# Gemfile

source 'https://rubygems.org/'

gem 'sinatra'
gem 'sinatra-contrib'
```

> sinatra-contrib is a gem that packages alot of functionality. Most notably for us, is that it updates the server to have the latest changes we make to our code. That is to say, as we save a file it should update/restart the server with the newest version of that file.

bundle install, and require sinatra's reloader:

```ruby
# app.rb
require 'sinatra'
require 'sinatra/reloader'

get '/' do
  'Hello Jesse!'
end
```

In the terminal run the following:

```bash
$ bundle exec ruby app.rb
```

This will start the Sinatra server on your local machine. You can visit your page at `http://localhost:4567/`. To make sure our reloader is working lets add some content to our app. In `app.rb`:

> Normally we run our ruby files by just saying `ruby <filename>` we use `bundle exec` here so that the computer knows to run the ruby program with the gems specified in your `Gemfile`

```ruby
get '/:name' do
  "Hello, #{params[:name]}"
end
```

`:name`! What the heck is that. This is a parameter value. Let's look at espn.com again. As we change from player to player you can see that the id's are changing. We need a way to display the same types of content for each player but we need to change the specifics of that content depending on which player your viewing. We can figure out which player's content to use through its id. We need a way to programatically access the values in the url in order to do that. We do this through parameters. If we go to `http://localhost:4567/bob` We will see that `Hello, bob` appears on the web page.

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

> Variables that we want to use in the view `.erb` files need to be instantiated with `@`.

```html
<!-- /views/index.erb -->
<%= @num_bottles %> of beer on the wall.
<a href='/<%= @next %>'>Take one down.</a>
```

> We can write erb tags in two ways. `<% %>` or `<%= %>`. Without the equal sign, the view (`.erb` file) will execute the code only. With an equal sign, the view will execute the code and also place a string that is the return value of the code that was executed.

To see this in action let's update our `app.rb`:

```ruby
get '/' do
  @bob = "bobert"
  erb :index
end
```

In `index.erb`
```html
<p>This is the instance variable @bob in the initial state: <%= @bob %></p>
<p>This is executing and returning using erb tags with equal sign: <%= @bob += "(using equals in erb)" %><p>
<p>This is only executing using erb tags without equal sign: <% @bob += "(not using equals in erb)" %><p>
<p>Final state of @bob : <%= @bob %>

```

> One thing to note about instance variables (`@some_variable`). If we instantiate an instance variable in one of our routes, we can only use it in that route and cooresponding view. Other routes won't be able to utilize it.

### More complex ruby with erb

If you have a collection to loop through, like an array or a hash, you use
a slightly different syntax:

Let's add the following content to `app.rb`:

```ruby
names = ["bobert", "tom", "missy", "kristy"]

get '/' do
  @names = names
  erb :index
end
```

If we wanted to have all of the names in `<p></p>` tags we could do something like this in our `index.erb`
```html
<!-- /views/index.erb -->
<% @names.each do |name| %>  <!-- note the missing `=` -->
  <p><%= name %></p>
<% end %>
```

> As we delve deeper into back end development. The neccessity to iterate through data sets like in the above code snippet becomes extremely important. Instead of names, we might loop through nfl players. And instead of `name` it might look like `player.name`. Depending on the object representing players, it might have multiple different properties like `total_yards`, our `touchdowns_this_season`

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

Forms with a POST action are used for creating new things.

Add this to `index.erb`:

```html
<form method='post' action='/names'>
  <input type='text' name='student_name'>
  <input type='submit'>
</form>
```

Let's try submitting this form. OH NOES. Sinatra doesn't know this diddy.

> Note that when we change whats in the action in the form. The diddy sinatra doesn't know changes to whatever is in that action form.

Add this to `app.rb`:

```ruby
post '/names' do
  names.push(params[:student_name])
end
```

Let's try submitting again. What happened? Hmm, seems like whatever we type in gets rendered. Instead of that, I think it'd be really helpful if we just redirected to our names route after we push the name to the array.

Update `app.rb`:

```ruby
post '/names' do
  names << params[:student_name]
  redirect "names"
end
```

> This is traditionally how post requests work. Where some creation functionality happens and then it redirects to a page.

> Another thing you may have figured out by now, is that we could have `names << params[:student_name]` in a get request, why might this be a bad idea? (ST- WG) It goes against REST! `GET` requests should only be to access information.

Any input with a `name` attribute will show up as an element of `params`

Forms with a GET action are useful for search forms.

```html
<form method='get' action='/names'>
  <input type='search' name='student_name'>
  <input type='submit'>
</form>
```

> Keep an eye out on the URL when you submit this last form, you'll notice that the url changes to whatever the action is as well as contains all of the parameter values from the input tags.

> We can only do `get` and `post` with forms. This is not a limitation on REST, but a limitation on HTML. We will see tomorrow during the lab theres a way to kind of hack around these HTML limitations.

**Question**: What's the benefit of using GET requests with search forms?

## You do: Emergency Complement

https://github.com/ga-dc/emergency_compliment

### Sample Quiz Questions

- List the 5 HTTP request methods. How do they relate to the 4 crud actions?
- What is the purpose of sinatra's `layout.erb` file?
- Write an html `<script>` tag that links to a js file in `public/js/app.js`
