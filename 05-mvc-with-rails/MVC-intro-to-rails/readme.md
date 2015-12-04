# MVC - Intro to Rails

## Learning Objectives
- Explain what Ruby on Rails is and it's architectural components (rMVC)
- Explain the lifecycle of an HTTP request in Ruby on Rails
- Explain how Convention over Configuration relates to Ruby on Rails
- List the most common folders in a rails application and describe their purpose
- Compare and contrast the structure Sinatra and Rails apps
- Create a new Ruby on Rails application
- Build a Rails App with a RESTful interface
- Follow Rails naming conventions when creating models, views and controllers
- Use error driven development in Rails to identify common errors and implement solutions for them.

## Opening Framing (5/5)
So we've learned about Sinatra, your very first web framework! It's great. It's an awesome tool to get a simple web app up and running quickly. So why would we ever want to learn Rails? So Sinatra is kind of like a shovel for web development. Rails is kind of like a nuclear powered back hoe for web development. We need to know how to work a shovel before we get the keys to the back hoe. Many of the same conventions you used in Sinatra will transition into rails, but more importantly, there's a lot more. Rails is a heavy duty web framework that follows relatively strict conventions in order to streamline our web development process.

> It is designed to make programming web applications easier by making assumptions about what every developer needs to get started. It makes the assumption that there is the "best" way to do things, and it's designed to encourage that way - and in some cases to discourage alternatives. - Ruby on Rails guide

> Rails is a framework with lots of rules/conventions. Pay attention to the conventions you'll need to follow for rails throughout the week.

## rMVC (10/15)

![rMVC](http://i.stack.imgur.com/Sf2OQ.png)

The design pattern that rails is built around is rMVC - router, model, view and controller.

Life Cycle of the request/response in Rails:

1. A user of our web application submits a request to our application's server. It can come in a myriad of ways. Maybe someone typing in a URL and hitting enter or maybe a user submitting a form on our application.

2. The request hits the router of the application.

3. The application then either doesn't recognize the route (error) or it does recognize it(route) and sends it to a controller.

4. Once the request hits the controller, it's then going to query the database through Active Record(the model) for the information specified in the controller.

5. Once the controller has the information from the model that it needs it sends it to the view

6. The view takes the objects from the controller and sends a response to the user.

Let's take a look at some rails code.

## Rails folder/file structure (15/30)
The first thing that I want to do, is just create a new rails applications. But I think first what we should do is ensure we have rails. `$ gem install rails`. Next I want to actually create my rails application:

```bash
$ rails new tunr -d postgresql
```

> the reason we pass in the `-d` flag with and argument of `postgresql`. Is we want to specify that the database layer of our application to be postgresql instead of the default sqlite3. Postgres is just a bit more robust and is the DBMS we've been using.

You can see already there are many folders and files generated from just that one command.

![Rails folder structure](images/rails_folders.png)

It can be quite daunting at first. It'll take some getting used to, but more importantly, you're already familiar with a lot of the stuff in rails we'll be using. Additionally, you can ignore a lot of the other stuff until you need to incorporate some weird gem/dependency. So we started learning about "convention over configuration" during the class for Active Record. As we scale to a rails size application, We can quickly see the need for conventions in such a massive framework. Specifically for folder and file structure, rails can be quite particular about how we name things. Throughout this week we'll be going through a bunch of different conventions we need to follow.

The first folder we'll talk about is the `app` folder:

![Rails app folder](images/rails_app.png)

This folder is the the most important folder in your entire application. It'll have pretty much most of the programs functionality resting in it.

- `assets` - This will be where all of your CSS, JS, and image files belong.
- `controllers` - This folder will contain all controllers.(ST - WG) What do controllers do for us?
- `helpers` - This is where you can define any helper methods for your application
- `mailers` - Won't be covering mailers in the scope of this class. Mailers are utilized to send and receive email within a rails application. But it's pretty simple, if you want to learn more about it. You can look [here](http://guides.rubyonrails.org/action_mailer_basics.html)
- `models` - this folder will contain our AR models.
- `views` - This folder contains all of the views in this application.

> These folders are easily the most important part of your application. Not to say the other parts aren't.

The `bin` folder contains binstubs. Not going over this in the scope of this class, but basically they're used as wrappers around ruby gem executables(like pry) to be used in lieu of `bundle exec`

The `config` is another folder that's pretty important. The file you'll most be visiting is `routes.rb` This is the router in rMVC.

The `db` folder is one you'll be working in for a bit of time as well. This contains the seed file but additionally it will also contain your migrations which you'll be going over in the next class.

In the main directory there are a couple of files your familiar with, the `Gemfile` and `Gemfile.lock`

## Tunr Port to Rails
The sinatra app we'll be working with is located [here](https://github.com/ga-dc/sinatra_tunr_to_rails)

Please make sure you create the database, upload the schema and seed your database.

### Configuring models and DB (10/40)
If you want to work from the same Sinatra app that I will be working with, it can found [here](https://github.com/ga-dc/sinatra_tunr_to_rails)
The first thing that I want to do is connect our rails app to the tunr db that we made in our Sinatra version. We want to go into the `config/database.yml` file:

```yml
development:
  <<: *default
  database: tunr_db
  # instead of tunr_development
```

The next thing that I want to do is port my model definitions. All you need to do is create the exact same model files in the sinatra_tunr for the `app/models` folder in the rails app. Create two files `app/models/artist.rb` and `app/models/song.rb` and fill the contents.

`app/models/artist.rb`:
```ruby
class Artist < ActiveRecord::Base
  has_many :songs, dependent: :destroy
end
```

`app/models/song.rb`:

```ruby
class Song < ActiveRecord::Base
  belongs_to :artist
end
```

Let's run `$ rails console` and play with our models to test for a good connection to the database(5m to make sure everyone has a connection to the database):

### Routes (the non rails way) (15/55)
> One thing to note here, is that we will be defining routes very explicitly in this section. This isn't really the rails way to do this. We'll be learning later this week how to do this better, but for now, the way were doing is for 2 reasons.
- its a way for us to transition our Sinatra tunr app into rails
- its a way to learn how to explicitly define a route, because we'll learn about some helper methods later and we need to know what they do for us.

Great, now that we've established a connection to our database let move on to building out our routes.

Basically what were doing here is mapping out what the different routes of our application will be just like our controllers in sinatra did for us. Let's pull from the artists controller first. Here's an example before/after for the first one:

```ruby
# in sinatra
get "/artists" do
  @artists = Artist.all
  erb(:"artists/index")
end

post "/artists" do
  @artist = artist.create!(params[:artist])
  redirect("/artists/#{@artist.id}")
end

# Becomes this in routes.rb:
get "artists" => "artists#index"
post "artists" => "artists#create"
```

> the actions for put/delete requests are update/destroy

### BREAK + You do - create the rest of the routes including all the song routes (20/75)
For the next part of the class

## Error Driven Development (30/105)
I'm going to be using error driven development to show some common errors and their solutions.

Alright, I want to go ahead and test one of these routes out. In the terminal start up your rails server `$ rails s` And open a new terminal tab `cmd + "t"` and type `rake routes`. This shows you every route that is defined in `config/routes.rb`

Lets go into our browser and go to `http://localhost:3000/mispelledartists` and we'll see:

![no route error](images/no_route.png)

Basically, this error is saying, you made a request, but i don't know what to do with it because the request's route hasn't been defined.

Now lets try this url `http://localhost:3000/artists` and we'll see:

![routing error](images/routing_error.png)

So the application receives the request and says, `/artists` I know what to do here.

Specifically, it's seeing this line of code in `config/routes.rb`:

```ruby
get "artists" => "artists#index"
```

> Because this line of code exists, the router knows how to respond request at the `artists` path. On the right side of the hash rocket `"artists#index"` its specifying the controller and an action within that controller. In this case, when a user of our site accesses the `artists` path(`http://localhost:3000/artists`), that request will be sent to the artists controller and execute the index action inside that controller.

After getting the request, the router sort of sends this request to the artists controller. But really whats happening is the router is telling the controller to perform some action.

Since we don't have a controller, we finally hit this error above. `unintialized constant ArtistsController` that means we have to create that controller. All controllers we create will go in the `app/controllers/` directory. So let's go ahead and create out `ArtistsController` now.

In the terminal:

```bash
$ touch app/controllers/artists_controller.rb
```

In `app/controllers/artists_controller.rb`:

```ruby
class ArtistsController < ApplicationController

end
```

> Note the syntax in the file as well as the class definition. These are conventions of controllers in rails.

Let's refresh our page:
<br>
![unknown_action](images/unknown_action.png)

Oh noes another error. When we go to `http://localhost:3000/artists` our router says it knows where to send it. It's sending it to the artists controller and expects it to do the index action. Unfortunately we haven't defined it yet, so it's unknown. Lets go ahead and define one now

In `app/controllers/artists_controller.rb`:

```ruby
class ArtistsController < ApplicationController

  def index

  end
end
```

> in rails methods defined in our controllers are known as `actions`

Great let's reload:
![template_missing](images/template_missing.png)

Another one .... We'll get more into this later. But this one is yelling at us for not having a view(template) yet. Specifically in this case, the index view. So let's create that. Let's first make a directory and file in the terminal:

```bash
$ mkdir app/views/artists
$ touch app/views/artists/index.html.erb
```

> Note the conventions here. We needed to make an `artists` folder to put the `index.html.erb` in it. When we define an `action` in our controller, rails knows to render the view corresponding to the controller and action. In this example, because were calling the `index` action in the `artists_controller`, it'll look for the `index` view in the `artists` folder.

Inside `app/views/artist/index.html.erb`:
Just put `<h1>Hello World</h1>`

And finally:

![hello_world](images/hello_world.png)

Hooray! That's really awesome. But not all that useful. Really what we want is all of the artists. If only we had some existing code and we can just copy stuff, we do! Lets take a look at our artist index view in our sinatra app.

```ruby
<h2>Artists <a href="/artists/new">(+)</a></h2>

<ul>
  <% @artists.each do |artist| %>
    <li>
      <a href="/artists/<%= artist.id %>">
        <%= artist.name %>
      </a>
    </li>
  <% end %>
</ul>
```

Yep, looks good, lets shove all this stuff into the `app/views/artist/index.html.erb`.

Let's refresh the page:

![no_method_error](images/no_method_error.png)

When we look at this error it says `undefined method 'each' for nil:NilClass`

That's because `@artists` isn't defined yet and we can't call `.each` on nil. Let's define that now in the index action of our artists controller. In `app/controllers/artists_controller.rb`:

```ruby
class ArtistsController < ApplicationController

  def index
    @artists = Artist.all
  end
end
```

### You do - THE REST OF IT. (45/145)
We've already done all of the code in Sinatra. All you're doing is changing the code from a sinatra app to a rails app.
#### Port Controller File

- copy the contents of the Sinatra Controllers and convert each block into a method/action on the rails app. Make sure the method/action names match what you have defined in the router.
- convert all `redirect()` statements to `redirect_to()`. Replace all `erb()` statements with `render()` statements.(or omit them if the name of the file matches the controller and action name)

#### Copy Views

Copy over the `views/artists` folder into `app/views` in our Rails app. We used
the Rails convention in Sinatra, so the only thing we have to do is rename
each file from something like `new.erb` to `new.html.erb`.

Also, copy over the `layout.erb` file into
`app/views/layouts/application.html.erb`. Make sure to keep the Rails' generated
content in the `<head>` though.

#### Fix Authenticty Token Issues

Rails protects us from an attack called a Cross-Site Forgery Request or 'CSRF'.
It does this by embedding a unique key into each form it generates for us, and
rejecting non-GET requests without the key.

To allow us to use non-Rails forms (until tomorrow), we need to comment out the
following line in `application_controller.rb`:

```ruby
    protect_from_forgery with: :exception
```

and inside `config/application.rb`
```ruby
config.action_controller.permit_all_parameters = true
```

### Run rails server
Run rails server and test out your site. It's not all too much different from Sinatra. Except it splits the conerns of routing from controllers, and makes assumptions about what your files are called.

## Closing(5/150)
Review LO's
