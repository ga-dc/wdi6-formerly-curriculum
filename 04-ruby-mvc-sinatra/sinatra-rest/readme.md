# Sinatra & REST

## Screen Casts
[Sinatra 1](https://www.youtube.com/watch?v=ddLEgAjsyP0)
[Sinatra 2](https://www.youtube.com/watch?v=4gilpAcCHpI)
[Sinatra 3](https://www.youtube.com/watch?v=8HYqwTGbrIY)
[Sinatra 4](https://www.youtube.com/watch?v=p8ZhfoMsqaM)
[Sinatra 5](https://www.youtube.com/watch?v=K1DtJCOsrpU)


## LO's
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

Following from that, Sinatra is to web apps what jQuery is to webpages.

When I say "web app", I mean something that involves users sending data to me, and me doing something with that data to change the user's expereience. Sinatra is one way of turning that concept into reality. Other ways include Rails, Node.js, Django, PHP, etc.

### Useful Links

- [Intro to Sinatra](http://www.sinatrarb.com/intro.html)
- [Sinatra in the wild](http://www.sinatrarb.com/wild.html)
- [Sinatra Documentation](http://www.sinatrarb.com/documentation.html)
- [Sinatra Recipes](http://recipes.sinatrarb.com/)

# Your very first Sinatra app!

Let's create a folder to work in. Create a file called `app.rb` and `Gemfile`. The file name doesn't matter, but it's easier if we all use the same one.

```bash
$ mkdir sinatra_intro
$ cd sinatra_intro
$ touch app.rb
$ touch Gemfile
```

Let's make sure we include our sinatra dependency in the `Gemfile`

```ruby
source 'https://rubygems.org'

gem 'sinatra'
```

Then run a `bundle install` in the terminal.

Inside `app.rb`, write:

```ruby
require 'sinatra'

get '/' do
  return 'Hello world!'
end
```

We'll talk about what `get` means later on.

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


(ST-WG) Do you think that the developers of facebook created/updated the facebook application right on [https://www.facebook.com](https://www.facebook.com)? Were all the changes/updates tested on that server? I hope not!

We need a way to develop in our own environment before we just put it on the web. As such, we're going to use our computers as local servers to host our applications until we move it to a production domain. In this way we can test/write code freely in our development environment.

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


#[Next: Views](views.md)

### Sample Quiz Questions

- List the 5 HTTP request methods. How do they relate to the 4 CRUD actions?
- What is the purpose of Sinatra's `layout.erb` file?
- Write an html `<script>` tag that links to a js file in `public/js/app.js`
- What's the difference between PATCH and PUT?
- What's the difference between `#{ }`, `<% %>`, and `<%= %>`?
