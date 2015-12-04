# Devise! and sessions

## Learning Objectives
- Explain what state is in a web application
- Explain how sessions give state to a web application
- Explain how user authentication utilizes sessions
- Define and then access a session variable in a Rails application.
- Set session hash key value pairs inside of a rails application
- Implement user authentication into a web application utilizing the devise gem
- Implement useful helper methods devise provides
- Differentiate between authentication and authorization

### Opening Framing (10m)

So we've figured out how to implement CRUD functionality into our apps. This is
great, but should anyone using our application be able to do whatever they want?
It would really suck if your buddies could post for you on Facebook or if
someone withdrew money from your banking site.

### T & T
Well, that shouldn't be the case. We need to be able to preserve the "state" of
the application. If a user is logged in, that user should be logged in until he
logs out, persisting the state of that user being logged in.

For the next 5 minutes turn to your partner in class and discuss how we might be
able to prevent people from doing whatever they want on your website.

Here's some talking points:
- What does it mean for a user to be signed in?
- For that matter, what does it mean to be a user? How are we representing that data.
- We've used our backend to store data about artists and songs.
  - Can we use it to store data about a user itself?

> We need to start thinking about how to capture information into a User model.
That has information about username, email, or password. We also need a way to
transfer or preserve state in our applications from request to request.

## "State" and Cookies

HTTP is stateless, which means that each HTTP request comes in with no history,
by default. This means that the server can't associate one request with a
previous one.

So, if we want to remember bits of information related to a specific person (i.e.
browser), we need a way to store that info and associate it with the browser.

This is done through cookies...

### Looking at Cookies

1. In Chrome, go to Preferences
- Show advanced settings
- Click "Content settings"
- Click "All cookies and site data"
- Scroll to `github.com`

Click around on the different "buttons" or "tabs". In particular, look at
`dotcom_user`, `signed_in`, and `tz`.

##### Turn and talk: What do you see? What do these do?

A *cookie* is a piece of data stored on your computer by your web browser and
associated with a particular website.

### Example cookies:

From Github:
```
Name: dotcom_user
Content: RobertAKARobin
Domain: .github.com
Path: /
Send for: Secure connections only
Accessible to script: No (HttpOnly)
Created: Wednesday, July 22, 2015 at 7:04:22 PM
Expires: Sunday, July 22, 2035 at 7:04:22 PM
```

Is it secure to store this info in cookies? Not really... the user can edit
cookies. The common fix is to store a long token in a cookie, and use that to
identify the user. The relevant data is then stored on the server, where it's
secure, and matched up with the token.

## Sessions

In Rails, we can read and set cookies manually, but that can be a bit of a pain.

Instead, we almost always use an abstraction of cookies, called the session:

- A session is just a place to store data during one request that you can read during later requests.
- A session is a hash containing key value pairs that provide state in your application

Let's hop into some code so we can see sessions in action.

The code we'll be working with today can be found
[here](https://github.com/ga-dc/tunr_rails_sessions_devise) This is a version of
the tunr rails application we've been building on this week. It contains
everything that we've learned up until now.

Make sure you fork/clone this repo if you would like to follow along. It is not
too important to follow along for this portion of this lesson. I encourage you
to just watch and use the following code to practice it yourself later.

## Set and Use session key-value pairs

In order to understand sessions, we're going to add some code to our existing
artists controller to allow users to sort artists.
In `app/controllers/artists_controller.rb`:

```ruby
# this action will set the `sort_by` property
def sort
  session[:sort_by] = params[:sort_by]
  redirect_to artists_path
end

# in our index, sort by the session value
def index
  @artists = Artist.all.order(session[:sort_by])
end
```

Let's update our `app/views/artists/index.html.erb` to include a form that
allows us to change the sort value:

```html
<form action="/artists/sort" method="get">
  <label>Sort By</label>
  <input type="text" name="sort_by">
  <input type="submit" value="sort">
</form>
Sorting by: <%= session[:sort_by] %>
```

Now because we created this action, let's update our `config/routes.rb` to route
submissions of the form to the sort action:

```ruby
get '/artists/sort', to: 'artists#sort'
```

If we open a new incognito window (`⌘ + ⇧ + n`) and navigate to
`http://localhost:3000/artists`, we'll see the session isn't set in that browser
because it's a brand new session, and thus our sorting is lost.

When we clear our cookies/session in our browser we can see in our index route
that the sorting is lost too.

> Now that we have the ability to transfer information from request to request.
We can preserve state in our application.

## Setting objects in sessions
Instead of hardcoding strings into our sessions hash, lets see if we can store
object ids.

Let's update our show action to set a session. In
`app/controllers/artists_controller.rb`:

```ruby
def index
  @last_viewed_artist = Artist.find(session[:last_viewed_artist_id])

  @artists = Artist.all
end

def show
  @artist = Artist.find(params[:id])
  session[:last_viewed_artist_id] = @artist.id
end
```

In your `app/views/artists/index.html.erb place the following:

```html
<% if @last_viewed_artist %>
  <h3>Last viewed artist: <%= @last_viewed_artist.name %></h3>
<% end %>
```

Now every time We click on an artists show page it will update the session to
contain the most recently viewed artist. Then any time we make a request to the
artists index path we can see the most recently viewed artist's name.

> So now we can store objects or attributes of objects in our sessions as well.
This may include id's of a user model, which is basically what devise is going
to do for us when a user "signs in"

## Deleting parts of the session
Lets add a new action/route/view for deleting session.

In `app/controllers/artists_controller.rb`:

```ruby
def delete_session
  session.delete(:last_viewed_artist)
  # or reset_session
  # which resets the entire session hash
  redirect_to artists_path
end
```

In `config/routes.rb`:

```ruby
get '/artists/delete_session', to: 'artists#delete_session'
```

> This is the sort of thing thats happening when a user "logs out"

Checkout the [testing_sessions branch](https://github.com/ga-dc/tunr_rails_sessions_devise/tree/sessions_demo)
for all the code thus far.

### You do
Take the next 5 minutes to:
- create a new action in the posts controller that instantiates a session key-value pair
- save it to an instance variable in the index, and have it display in the index view

### Break 10m
## Reframing

Devise is a gem in rails that we use in order to streamline user authentication.
Rails developers saw that they we're incorporating user authentication in many
of their applications. They built the devise gem assuming best practices (rails
way) for User Auth. The devise gem uses sessions in a big way.

At a high level, devise uses sessions to store user information from one request
to the next. It sets that session by verifying with passwords(password_digest)
on a user model. Once you set that session then you can refer to that user
object until either the session is cleared(user logs out or session clears
manually through browser) or the session is set to a new value (not common--
if ever?)

We're going to talk about how to get devise up and running and a couple of
helper methods.

If you'd like to learn about hand rolled user authentication reference [this lesson plan](https://github.com/ga-dc/curriculum/tree/master/05-mvc-with-rails/rails-sessions-and-auth)

## Devise We do codealong (50m)
- Fork and clone [this repo](https://github.com/ga-dc/devise_blog/tree/starter)
- This repo contains a rails application that is a single model crud application for posts.
- the first thing we should do is add `devise` to the Gemfile and run a bundle install

```ruby
gem 'devise'
```

Next install devise then generate the devise User

```bash
# normal bundle install
bundle install

# installs devise
rails generate devise:install

# generator used to create devise user model
rails generate devise User
```
You may have to restart your server at this point.

A lot of code just got generated for us.

> this would be a good place to `git commit`

This is some of the stuff that it's given us:

![railsgdeviseuser](images/railsgdeviseuser.png)

> Take a look at the devise source code! and you can see all of the different controllers

It's a lot of stuff to look at, but let's break it down. Going from top to
bottom excluding some of the files we won't be using for this class.

The first thing that was created was a migration for this model. In
`db/migrate/<somedate>_devise_create_users.rb` there's a lot of information here,
but I think most pertinent to us in the scope of user auth is the email and
password attributes.

### Hashing and Salting (aside)
[plain text offender](plaintextoffenders.com)

`:encrypted_password` is interesting. Why wouldn't they just use `:password` as
a column? So obviously we don't want to just store someone's password in a
database. That would not be so great. Really what we want to do, is put an
encrypted_password into our database. The way a password gets encrypted is that
some random string gets generated and added to the password(salting). Then that
new string goes through a hashing algorithm that outputs a "random" string.
That's what gets stored in the database.

So when a user tries to log in, the password gets added the same salt and then
goes through the same algorithm and it looks against the database for the result.

As stored in the database, the passwords `password1234` and `password1235` would
look very different.

If you want to know more about how to code your own(handroll) user models and
not have to use devise. Look at [this lesson plan](https://github.com/ga-dc/curriculum/tree/rails_devise/05-mvc-with-rails/rails-sessions-and-auth).

### Back to what devise gives us...

The next thing that I see is a model definition was created for us in
`app/model/user.rb`:

```ruby
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end

```

> the different arguments being passed in to devise are very semantically named
as far as their utilities go.

The next thing that was added was `devise_for :users` in our `config/routes.rb`

That one line of code opens routes to a lot of devise user authentication
controller actions

## Devise -configuration(15/45)
add this to `config/environments/development.rb`:

```ruby
 config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
 ```
> In an email there is no context for host and port where as other urls are
relative and don't need explicit host and port

I think it'd be nice we just went ahead and added a logout button to the layout
so that we can easily log in and log out as a user. So in our
`app/views/layouts/application.html.erb` add the following code:


 ```html
<% if current_user %>
  <h3><%= link_to 'Signout', destroy_user_session_path, :method => :delete %></h3>
<% else %>
  <h3><%= link_to 'Signup', new_user_registration_path %></h3>
  <h3><%= link_to 'Login', new_user_session_path %></h3>
<% end %>
```

> current_user is a helper method that allows us to access the user if one is
logged in. If they are logged in, the signout link will appear, if not both the
signup and login link will appear.


Let's also add a root path to our `config/routes.rb`:

```ruby
root 'posts#index'
```

## Devise Helpers (15/60)

Let's go ahead and fire up our server `$ rails s` and sign up for our site!

Welcome aboard! You're an authenticated rider on rails! What does that really
mean though?

(ST-WG) What's fundamentally different about our application than before? ..

So we've signed up and can see that nothing really has changed, we can still
access our posts like normal.

Let's add a bit of code too see if we can garner some more functionality.

The first thing that I want to do is add the helper method `authenticate_user!`
in the index action of the posts controller. So inside
`app/controllers/posts_controller.rb`:

```ruby
def index
  authenticate_user!
  @posts = Post.all
end
```

You'll notice now, if i'm not logged in, i can no longer access the index action
and it redirects me to the signup page if i try to access this action. This is
really cool. I now have a way to restrict controller actions unless people are
logged in.

This sort of thing is common with a lot of actions or all actions of a controller.
So we can use a `before_action` callback to handle this. Let's get rid of the
`authenticate_user!` in the index action and put the following code at the top
of `app/controllers/posts_controller.rb`:

```ruby
class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]
  def index
     # ... more code follows
```

> note I only want to authenticate the user for the create edit update and
destroy actions, it doesn't matter to me who is able to view posts. Though this
is totally dependent upon the domain model.

We saw `current_user` above earlier. But we only took advantage of its
truthiness/falsiness to generate some links for us. I think more importantly
though, `current_user` is a helper method that returns a ruby object in our
database that represents the user that is logged in.

To illustrate this more effectively. Let's add a bit of functionality. What we
want to achieve is for users to be able to have many posts and for posts to
belong to a user.

Let's do the following:
- add `has_many` and `belongs_to` associations in our model definitions
- add a foreign key to our posts table /w migration (`rails g migration add_foreign_key_to_posts user_id:integer`)
- `$ rake db:migrate`
- in the index action, change `@posts = Post.all` to `@posts = current_user.posts`

> note that since we don't have the `authenticate_user!` helper on the index
action, if we were to access posts directly without authenticating it would
error out. So to fix that we should enter some if/else conditional to handle
this.

Something like this:

```ruby
def index
  if current_user
    @posts = current_user.posts
  else
    @posts = Post.all
  end
end

```

- in the create action , change `@post = Post.new(post_params)` to `@post = current_user.posts.create(post_params)`

## Class Ex

Add devise to tunr!

Specifically:
- include the gem
- perform the steps to initialize devise in the app and add a user
- add view code to let users sign in and out
- ensure that users can't create / delete / update artists or songs if they
  aren't signed in

We will take advantage of our user authentication later this week when we allow
users to 'favorite' songs.

## What you can look forward to with devise!

> Should you want to learn more on your own, or if we have extra time I can talk
about devise views a little bit.

[Devise Documentation](https://github.com/plataformatec/devise)

This documentation contains a lot of great information.

- Customize devise views
- Customize devise model attributes [Direct Link to Docs](https://github.com/plataformatec/devise#strong-parameters)

If you want to add devise to a brand new rails application check out this [blog post](http://andrewsunglaekim.github.io/Getting-a-handle-on-devise/)
