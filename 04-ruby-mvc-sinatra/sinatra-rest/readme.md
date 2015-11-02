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
We've learned about databases using SQL. We've also learned about objects in ruby. But we haven't seen any HTML since Unit 1! What gives? How are we going to display all of the things in our database? How can we create a UI to execute CRUD functionality on our different ruby objects?

Sinatra is a **DSL** for quickly creating web applications in Ruby with minimal effort.

A Domain-Specific Language is something defined by the makers of an application to standardize how others interact with their application.

This is similar to how in jQuery you begin everything with `$` -- you're still writing Javascript, but you're writing it in a specific way in order to interact with this thing someone else built.

Following from that, Sinatra is to web apps what jQuery is to webpages. We have this idea of REST methods send to paths making things happen -- Sinatra is one way of turning that concept into reality. Other ways include Rails, Node.js, Django, PHP, etc.

### Useful Links

- [Intro to Sinatra](http://www.sinatrarb.com/intro.html)
- [Sinatra in the wild](http://www.sinatrarb.com/wild.html)
- [Sinatra Documentation](http://www.sinatrarb.com/documentation.html)
- [Sinatra Recipes](http://recipes.sinatrarb.com/)

# Your very first Sinatra app!

Let's create a folder to work in. Create a file called `app.rb`. The file name doesn't matter, but it's easier if we all use the same one.

```bash
$ mkdir sinatra_intro
$ cd sinatra_intro
$ touch app.rb
```

Inside `app.rb`, write:

```ruby
require 'sinatra'

get '/' do
  return 'Hello world!'
end
```

We'll talk about what `get` means later on.


(ST-WG) Do you think that the developers of facebook created/updated the facebook application right on [https://www.facebook.com](https://www.facebook.com)? We're all the changes/updates tested on that server? I hope not!

We need a way to develop in our own environment before we just put it on the web. As such, we're going to use our computers as local servers to host our applications until we move it to a production domain. In this way we can test/write code freely in our development environment.

Now, in your console, run the file the way you'd run any Ruby file:

```sh
$ ruby app.rb
```

You should see something like:

```
[2015-10-30 13:57:04] INFO  WEBrick 1.3.1
[2015-10-30 13:57:04] INFO  ruby 2.2.1 (2015-02-26) [x86_64-darwin14]
== Sinatra (v1.4.6) has taken the stage on 4567 for development with backup from WEBrick
```

> See the "has taken the stage" thing? There'll be lots of little Sinatra puns here and there.

Believe it or not, that's it! You now have a server running on your computer. It can respond to requests, just like any other server. To test that out, go to `localhost:4567` in your browser. You should see "Hello world!"

> Note that this isn't a server anyone else can see, but it's still a server.

### Where does that `4567` come from?

This is the **port number** of the server we're using. Don't worry about it too much -- just know that to access a Sinatra app on your computer you'll always use `localhost:4567`, unless someone changes it.

### The URL

The `/` in `get '/'` is the URL to which someone needs to go to make this bit of Ruby run.

Change it to `get '/hi'`:

```ruby
require 'sinatra'

get '/hi' do
  return 'Hello world!'
end
```

Now refresh your browser, which should be at `localhost:4567/`. You should get a page saying "Sinatra doesn't know this ditty." That's Sinatra's 404 page. It's saying, "I don't know what to do when someone goes to `/`".

So instead, try going to `localhost:4567/hi`. Now you should get your "Hello world!". You've told Sinatra, "When someone goes to this URL, run this bit of Ruby."

Change your code back to `get '/'` for now -- it's less to type.

## The Console

### Refresh that "hello world" page in your browser

Watch your terminal as you do so. See how the tab with Sinatra in it updates every time? This is your **server log**. Sinatra automatically tells Ruby to `puts` some information it thinks you might find useful every time you get an HTTP request.

The server log is super-useful! Right underneath `get '/' do`, write `puts "Hi there"`.

```ruby
require 'sinatra'

get '/' do
  puts 'Hi there'
  return 'Hello world!'
end
```

Now quit Sinatra with **Control + C** and restart it with `ruby app.rb`. Refresh your webpage a couple times. See how it prints "Hi there" each time?

#### `puts "Hi there"` has to come before `return 'Hello world!'`. Why?

#### What happens if you remove the `return` and just have `'Hello world!'`? Why?

## Getting user input

Let's make this app dynamic and have it say your name. So far, the way we'd do that is by adding `gets.chomp`. Let's try that here:

```rb
require 'sinatra'

get '/' do
  name = gets.chomp
  return 'Hi there, #{name}!'
end
```

Quit and restart Sinatra, and refresh `localhost:4567`.

Notice how the webpage is still loading? The spinner is still going round and round. It's doing that because the server is all hung up: Ruby won't let it do anything until we've entered some input for `gets`.

So try writing your name in the Terminal console, then hitting return.

#### We have a way of getting user input... But we'd never use `gets` on an actual web app. Why not?

Because (hopefully) no-one else will be able to access your server log!

**You will never have any reason to use `gets` again.** So don't!

### I'm getting tired of quitting and restarting.

Fortunately, there's a gem that will automatically restart Sinatra every time a change is made to your `app.rb`.

Let's create a Gemfile:

```ruby
source 'https://rubygems.org/'

gem 'sinatra'
gem 'sinatra-contrib'
```

> Sinatra-contrib is a gem that packages a lot of functionality. One of those functionalities is `sinatra/reloader`, which detects every time you save your `app.rb` file and restarts the server so that it uses the newest version of the file.

`bundle install`, and require sinatra's reloader in your `app.rb`:

This should create a `Gemfile.lock`, which you don't need to touch.

## Path Parameters

Change `get '/'` to `get '/:name'`:

```rb
require 'sinatra'
require 'sinatra/reloader'

get '/:name' do
  return "Hi there, #{params[:name]}!"
end
```

### Experiment 1

Now go to `localhost:4567/yourname`. See your name show up?

#### Now go to what you may have expected, `localhost:4567/:name`. What shows up?

### Experiment 2

Now change it to `get '/test:name'`.

```rb
require 'sinatra'
require 'sinatra/reloader'

get '/say_hi:name' do
  return "Hi there, #{params[:name]}!"
end
```

Go to `localhost:4567/say_hirobin`. You should see "robin" show up!

### Experiment 3

One last experiment: change it to `get '/say_hi:name/hello`.

```rb
require 'sinatra'
require 'sinatra/reloader'

get '/say_hi:name/hello' do
  return "Hi there, #{params[:name]}!"
end
```

Go to `localhost:4567/say_hirobin/hello`. It still shows "robin"!

### Experiment 4

Now change it to `get '/say_hi/:name'`.

```rb
require 'sinatra'
require 'sinatra/reloader'

get '/say_hi:name/hello' do
  return "Hi there, #{params[:name]}!"
end
```

Go to `localhost:4567/say_hi/robin`. Still works?

### The params hash

Putting a colon `:` in front of `name` turned it into a variable called a path parameter.

This works similarly to Ruby methods and Javascript functions. For example:

```ruby
def say_hi name
  puts "Hi there, #{name}!"
end
```

```js
function say_hi(name){
  console.log("Hi there, " + name + "!");
}
```

This is a `say_hi` method that has an argument called `name`. An argument lets us pass some data into the method so the method can manipulate the data somehow.

`params` is a hash that is generated with every request made to your server. It contains any path parameters -- and some other stuff, as we'll see later.

Now try going to `localhost:4567/say_hi` without your name at the end. We get a 404 page. This is because we're telling Sinatra, "Hey, this path will always have this parameter in it." Sinatra doesn't have a path defined *without* a path parameter,so it throws an error.

The same thing happens if you go to `localhost:4567/yourname/lastname`: Sinatra doesn't have a path defined that has two path parameters.

### Moar Paths

Let's make two more paths: one with no path params, and one with two path params.

```rb
require 'sinatra'
require 'sinatra/reloader'

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

Try putting some HTML in one of those strings, like `"<h1>Hi there!</h1>"`. It works!

We already have an app that generates different HTML based on user input. This is your first back-end app!

Obviously writing `DOCTYPE` and everything else in here would get really annoying, so later we'll learn how to use Sinatra templates. I imagine writing all of your HTML in one string ... ugh

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

# BREAK

# REST

Now that we've had a break, we'll take a REST! (*Pause for effect.*)

We've been seeing that `get` word a lot. It has to do with HTTP requests. Remember: a server's job is to respond to HTTP requests. In order to talk about how Sinatra functions, we need to talk about how HTTP requests work.

Every HTTP request consists of a request **method** and **path**. The **path** is the URL to which the request is being sent. That's pretty familiar. However, your browser always sends that request in a particular *way* that gives the server a hint as to the "point" of the request. This "particular way" is the **method**.

### For example

You could consider me speaking to the class to be an HTTP request. I'm the browser. You all are the server. The path is the classroom(who/what i'm saying it to). The method is how I'm talking(what kind of things/actions i want).

If my method is "talking in a normal voice", you can infer that the point of my request is for you all to just absorb some information.

If my method is "YELLING IN A LOUD VOICE", you can infer that the point of my request is for you all to start behaving yourselves right this second.

### REST

Browsers have different "ways of talking" to servers. These are called **methods**. REST, or REpresentational State Transfer, is a convention for what these methods should be to standardize all the communication between browsers and servers.

Knowing REST is important because the vast majority of web developers have agreed to follow this same convention.

"GET" is one of these methods. It means the browser just wants to read (or "get") some information. When you write `get '/say_hi' do`, you're telling your Sinatra server how to respond when a browser says, "Hey, I'd like to get some information from the `say_hi` path."

We make requests all the time -- especially GET requests. Everytime you go to your browser, enter a URL, and hit enter, you're actually making a GET request.

### REST Methods

REST defines five main methods, each of which corresponds to one of the CRUD functionalities.

| Method | Crud functionality |
|---|---|
|GET| read |
|POST| create |
|PUT| update |
|PATCH| update |
|DELETE| delete |

So, wait -- there are 5 REST methods, but only 4 CRUD methods?

PUT and PATCH are both used for updating. Whenever you update your Facebook profile you're probably making a PUT or PATCH request. The difference is PUT would be intended to completely replace your profile, whereas PATCH would be intended to just change a few fields of your profile.

PUT rewrites data; PATCH just changes parts of data.

### What's the difference at a technical level between a GET and a POST request?

There really isn't a whole lot of difference. The browser sends the request more-or-less the same way. The difference is in how the data comprising the request is "packaged".

We'll see this in greater detail later. For now, just think that, say, a GET request is sent in a plain old white envelope, while a POST request is sent in a red envelope with "ACTION REQUIRED" written on it.

### RESTful Routes

A **route** is a **method** plus a **path**:

**Route = Method + Path**

Each route results in an **action**.

REST provides a template for the way different paths should look:

| Method | Path | Action |
| --- | --- | --- |
| GET | `/students` | Read information about all students |
| POST | `/students` | Create a new student |
| GET | `/students/1` | Read information about the student whose ID is 1 |
| PUT | `/students/1` | Update the existing student whose ID is 1 with all new content |
| PATCH | `/students/1` | Update the existing student whose ID is 1 with partially new content |
| DELETE | `/students/1` | Delete the existing student whose ID is 1 |

Note that the path doesn't contain any of the words describing the CRUD functionality that will be executed. That's the method's job.

Let's check out the [ESPN website](http://espn.go.com/). If we go to a specific player's webpage, we can see this same sort of structure in the URL.

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

# BREAK

# Sinatra Views

## We do: Sinatra Views

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

## Passing Variables to Views

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
