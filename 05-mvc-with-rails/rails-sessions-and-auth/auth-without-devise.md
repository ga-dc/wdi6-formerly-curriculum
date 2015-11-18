# Sessions and Auth

## Learning Objectives
- Contrast the use cases for cookies, sessions, and permanent storage.
- Define and then access a session variable in a Rails application.
- Create a (very) simple hashing algorithm.
- Describe the differences between hashing and encoding.
- Add sign-in, sign-up, and sign-out functionality to a Rails application.
- Securely store and access passwords.
- Describe the functionality of `has_secure_password`.
- Differentiate between authentication and authorization.

**Please follow along with the lesson plan.**

## Adding users

Currently, Tunr just supports one single user. It would be nice if it could have multiple users. Whenever a user logs in, they'd see only *their* artists and songs.

To start, let's **create a User model**. It's going to be really simple, with just a username and password:

```
rails generate migration create_users
```
```rb
# db/migrate/[timestamp]_users.db

class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
    end
  end
end
```

We'll talk about why this is `password_digest` instead of just `password` later.

```
rake db:drop
rake db:create
rake db:migrate
```

We'll need to **create the user model**. We could add in fancy validations to make sure passwords are at least 8 characters or what-have-you, but that's a "nice-to-have" we can come back to later.

```rb
# app/models/user.rb

class User < ActiveRecord::Base
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true
end
```

Next, we'll create **a sign-up form**. The form will POST to a `/sign_up` route that we have yet to create.

```erb
# app/views/users/sign_up.html.erb

<h2>Sign up</h2>
<%= form_tag("/sign_up", method: "post") do %>
  <input type="text" name="username" placeholder="username" />
  <input type="password" name="password" placeholder="password" />
  <input type="password" name="password_confirmation" placeholder="password again" />
  <input type="submit" value="Sign up" />
<% end %>
```

Then, we'll create **a sign-in form**. The form will POST to a `/sign_in` route, which again we have yet to create.

```erb
# app/views/users/sign_in.html.erb

<h2>Sign in</h2>
<%= form_tag("/sign_in", method: "post") do %>
  <input type="text" name="username" placeholder="username" />
  <input type="password" name="password" placeholder="password" />
  <input type="submit" value="Sign in" />
<% end %>
```

Next, we'll make links to sign-in, sign-up, and sign-out on the **main application layout**. *(We don't actually have a page for sign-out yet... But we will... sort of!)*

```erb
# app/views/layout/application.html.erb

# ...
<h1>Tun.r</h1>
<nav>
  <a href="/sign_in">Sign in</a>
  <a href="/sign_up">Sign up</a>
  <a href="/sign_out">Sign out</a>
  <a href="/songs">Songs</a>
  <a href="/artists">Artists</a>
</nav>
# ...
```

Now we'll set up the **routes** to direct requests to the proper controller actions:

##### What actions should a user have?
- We won't add in an "edit password" functionality yet.
##### What kind of HTTP request should go to each action?

```rb
# config/routes.rb

Rails.application.routes.draw do
  root to: 'artists#index'
  get '/songs', to: 'songs#index'
  resources :artists do
    resources :songs
    resources :genres
  end
  get '/sign_in', to: 'users#sign_in'
  post '/sign_in', to: 'users#sign_in!'
  get '/sign_up', to: 'users#sign_up'
  post '/sign_up', to: 'users#sign_up!'
  get '/sign_out', to: 'users#sign_out'
end
```

Now we'll need a controller to actually receive and respond to these requests.

Let's make the **users controller**:

```rb
# app/controllers/users_controller.rb

class UsersController < ApplicationController

  def sign_up
  end

  def sign_up!
    user = User.new(
      username: params[:username],
      password_digest: params[:password]
    )
    if params[:password_confirmation] != params[:password]
      message = "Your passwords don't match!"
    elsif user.save
      message = "Your account has been created!"
    else
      message = "Your account couldn't be created. Did you enter a unique username and password?"
    end
    puts message
    redirect_to action: :sign_up
  end

  def sign_in
  end

  def sign_in!
    @user = User.find_by(username: params[:username])
    if !@user
      message = "This user doesn't exist!"
    elsif @user.password_digest != params[:password]
      message = "Your password's wrong!"
    else
      message = "You're signed in, #{@user.username}!"
    end
    puts message
    redirect_to action: :sign_in
  end

  def sign_out
    puts "You're signed out!"
    redirect_to root_url
  end

end
```

...and now if we **run** our application, we can see that it's working successfully!

## The Flash

`puts`ing out error messages isn't very helpful, since the user is never going to be able to see them.

Rails gives us a handy method for showing users error messages, called `flash`. It's a hash that is generated in one controller action, and is accessible only in the *next* controller action. That is: a flash message is single-use.

Let's **add flash messages to the Users controller**:

```rb
# app/controllers/users_controller.rb

  def sign_in!
# ...
    flash[:notice] = message
  end

  def sign_up!
# ...
    flash[:notice] = message
  end

  def sign_out
# ...
    flash[:notice] = message
  end

  end
```

...and make the flash messages **show up in the view**:

```erb
# app/users/application.html.erb

<h1>Tun.r</h1>
<nav>
  <a href="/sign_in">Sign in</a>
  <a href="/sign_up">Sign up</a>
  <a href="/sign_out">Sign out</a>
  <a href="/songs">Songs</a>
  <a href="/artists">Artists</a>
</nav>
<h2><%= flash[:notice] %>
```

## Password security

##### All the passwords are stored in the database as plain text. Why is that a problem?

Most people use the same password for many sites. Anyone with access to the database could see people's passwords and easily try them out on other sites.

### Two truths and a lie:

- Washington is an expensive city in which to live.
- Jesse has nice hair.
- It is possible to make something 100% secure.

There is no such thing as a completely secure system. With enough time and effort, anything can be hacked.

Your best bet is to make it **annoying** to hack your system.

##### Given two systems, what would make a hacker choose to hack one over the other?
- Effort required
- Potential payout
- Severity of consequences

All hackers choose their targets with a simple formula:
```
desire to hack = (perceived payout relative other targets) - (perceived effort relative other targets)
```

That means you can protect yourself either by making it look like the data your app stores is worthless, *or* by making your app more annoying to hack than other apps.

If all you're protecting is a handful of e-mail addresses or comments on a minor blog, a box asking "What is 3 + 7?" is probably sufficient protection. Even though it's easy to hack, there are so many other sites with even less protection, and those are the ones hackers will target.

### Hashing

##### So how can we make it annoying to try to hack the passwords in our database?
- Encrypt
  - But what if someone figures out your encryption algorithm?

Instead, we use **hashing**, which is like encryption but without the need to decrypt.

For example, take this number:

```
33993673848282495216560077504280594059128549394489757514768726934773416841839157064011040089835002141848809883232920605619516633004880348600310560794457410501698455318707955859288688370267366292287244426179077614143160867036115289761409284501330209791881804790388195916823965601
```

This is my password, encrypted with an algorithm. I'll give you some hints: my password is a 7-digit number, and the algorithm is taking that number to the 40th power. So to find my password, all you need to do is find a calculator and enter:

```
33993673848282495216560077504280594059128549394489757514768726934773416841839157064011040089835002141848809883232920605619516633004880348600310560794457410501698455318707955859288688370267366292287244426179077614143160867036115289761409284501330209791881804790388195916823965601 ^ (1/40)
```

##### Why am I still confident that you won't figure out my password?
- Because that's a really, really difficult calculation for any computer to make!

So let's say instead of my password, the database stores this number, which is only about 260 bytes as a string. When I enter my password, my app takes whatever I entered to the 40th power. If it matches, even though it doesn't know my actual password, it knows I entered my password correctly. If what I entered is just one number off, the calculation's result will be completely different, and it won't match.

This way, the only place my actual password is stored is in my own human memory.

Could someone hack my password? Yes, but it would take a tremendous amount of computer power.

Hashing is used very, very widely in **authentication** -- that is, making sure someone is who they say they are.

## Hashing Tunr

We're going to use a gem called "bcrypt" that uses a really secure hashing algorithm.

Add it to your **Gemfile**...

```
# Gemfile

# ...
gem 'bcrypt'
# ...
```

...and **install the Gem**:

```
bundle install
```

Let's play around with it in the **rails console**:

```
rails c
```

BCrypt's hashing method is `BCrypt::Password.create`. If we run this multiple times, we get a different result each time:

```
> BCrypt::Password.create("hello")
```

That's because to keep things *really* secure, BCrypt adds some random extra letters onto the end of the hash. These extra letters are called a **salt**. This process is **salting a hash**.

To check whether a string matches the hash, we first have to let BCrypt decode its hash:

```
> BCrypt::Password.create("hello")
 => "$2a$10$yADYNXdzkZC6bLElijmYxuT2bLjG09Oe7i/7asficgWqgHqbj73Ge"
> hash = "$2a$10$yADYNXdzkZC6bLElijmYxuT2bLjG09Oe7i/7asficgWqgHqbj73Ge"
> decoded_hash = BCrypt::Password.new(hash)
> decoded_hash.is_password?("hello")
 => false
> decoded_hash.is_password?("Hello")
 => true
```

Putting this all together in Tunr, we'll **hash passwords in the Users controller**:

```rb
# app/controllers/users_controller.rb

class UsersController < ApplicationController

  def sign_up
  end

  def sign_up!
    user = User.new(
      username: params[:username],
      password_digest: BCrypt::Password.create(params[:password])
    )
    if params[:password_confirmation] != params[:password]
      message = "Your passwords don't match!"
    elsif user.save
      message = "Your account has been created!"
    else
      message = "Your account couldn't be created. Did you enter a unique username and password?"
    end
    flash[:notice] = message
    redirect_to action: :sign_up
  end

  def sign_in
  end

  def sign_in!
    @user = User.find_by(username: params[:username])
    if !@user
      message = "This user doesn't exist!"
    elsif !BCrypt::Password.new(@user.password_digest).is_password?(params[:password])
      message = "Your password's wrong!"
    else
      message = "You're signed in, #{@user.username}!"
    end
    flash[:notice] = message
    redirect_to action: :sign_in
  end

  def sign_out
    flash[:notice] = "You're signed out!"
    redirect_to root_url
  end

end
```

## has_secure_password

Rails provides a method called `has_secure_password` does... about what you would expect from the name. This includes:
- Making sure a User isn't created without a password
- Makes sure your User model has a `password_digest` column. A digest is the hashed value of something -- that is, the big long random string. (The way your password would look after you've digested it, if you will.)
- Making sure the password is less than or equal to 72 characters
- If you have a "type your password again to confirm it" field, it makes sure they match

To use it, just **add has_secure_password to your User model**:

```rb
# app/models/user.rb

class User < ActiveRecord::Base
  validates :username, presence: true, uniqueness: true
  has_secure_password
end
```

Let's re-create the database so now it contains only secure passwords:

```
rake db:drop
rake db:create
rake db:migrate
```

## User persistence

##### What's missing from our user sign-in process?
##### If I refresh the page, am I still signed in?

We need to figure out a way to have Rails remember I'm signed in.

##### Why not just created an "is_signed_in" column in my User table?
- How would Rails now how to sign out? More importantly, if multiple users are accessing the app, how would Rails know which signed_in user is on which computer?

## Cookie Monster

### We do:
1. In Chrome, go to Preferences
- Show advanced settings
- Click "Content settings"
- Click "All cookies and site data"
- Scroll to `github.com`

Click around on the different "buttons" or "tabs". In particular, look at `dotcom_user`, `signed_in`, and `tz`.

##### Turn and talk: What do you see? What do these do?

A *cookie* is a piece of data stored on your computer by your web browser and associated with a particular website.

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

Normally my online banking account only has 5 cookies, but as soon as I log in it gets an additional 15 or so, including this one:
```
Name: FORTUNE_COOKIE
Content: abcd-efgh-ijkl-mnop-qrst-uvwx-yz12-3456
Domain: .online.wellsfargo.com
Path: /
Send for: Secure connections only
Accessible to script: No (HttpOnly)
Created: Saturday, July 25, 2015 at 6:07:09 PM
Expires: When the browsing session ends
```

##### What might be the purpose of these cookies?
##### Why is Github's expiration date so far in the future, while Wells Fargo's is when the browsing session ends?
##### What's the significance of 'Send for: Secure connections only'?

Notice the "Accessible to script". Cookies can be accessed via Javascript.

If you go to `github.com`, open the console, and type `document.cookies`, you'll get something like this:

```
tz=America%2FNew_York; _ga=GA1.2.3456.7890; _gat=1"
```

Hiding from scripts, expiration dates, secure connections only...

##### Turn and talk: Why does security with cookies seem to be such a big deal?

### Writing

Modifying cookies is super easy. Let's have Tunr "remember" the username **when users run the sign_in controller action** by saving it as a cookie:

```rb
# app/controllers/users_controller.rb

def sign_in!
# ...
  else
    message = "You're signed in, #{@user.username}! "
    cookies[:username] = @user.username
  end
end

# ...
```

If I check the cookies for `localhost` in Chrome, there's now a cookie called `username`!

I can change the expiration time of my cookie like this:

```rb
# app/controllers/users_controller.rb

def sign_in!
# ...
  else
    message = "You're signed in, #{@user.username}! "
    cookies[:username] = {
      value: @user.username,
      expires: 100.years.from_now
    }
  end
end
# ...
```

If I make this `10.seconds.from_now`, sign in again, and immediately look at the cookies for `localhost` I can see this cookie. If I close the window, wait a few seconds, and look again, it's vanished!

By default, the expiration time is "when the current session ends" -- that is, when the browser is closed.

### Reading

`cookies` is a **hash**, just like any other hash. If I put `<%= cookies.to_json %>` in my `.html.erb`, it'll show me all the cookies for this domain (`localhost`, in this case).

To **read** my cookie, I just use `cookies[:username]`. I'll put this in the `sign_in_prompt` page to **have the username filled in automatically**:

```erb
# app/views/users/sign_in_prompt.html.erb

<h2>Sign in</h2>
<%= form_tag("/sign_in", method: "post") do %>
  <input type="text" name="username" placeholder="username" value="<%= cookies[:username] %>"/>
  <input type="password" name="password" placeholder="password" />
  <input type="submit" value="Sign in" />
<% end %>
```

Now, when I type in a username and "Sign in", my username is filled in! I can close the browser, and when I go back to the page it'll still be there.

Hopefully you can start to see the utility of cookies. They were originally invented for e-commerce, to let you store the items in your shopping cart on, say, Amazon. Now they're used for all kinds of things.

### Same old problem

Now we can remember the user's username. But we're not actually remembering the user is signed in.

We could just create a cookie called `is_signed_in` and set that to true.

##### What could go wrong with using an `is_signed_in` cookie?
- Cookies are stored on the user's computer. This means we're basically relying on a user to tell us whether or not they're signed in. That's not very secure. There are Chrome extensions that let you add and edit the cookies on your computer. **We** want to tell the **user** whether or not they're signed in, not have them tell us.

## Sessions

Remember `flash` messages? Those are a lot like cookies, except instead of being stored on the user's browser, they're stored on **your server**.

This is an example of a **session variable**. It's like a cookie in reverse. A cookie is stored on the user's browser and associated with a particular domain. A session variable is stored on the server and associated with a particular user's browser.

Because session variables are stored on your server, the user can't manipulate them.

### How sessions work

When your browser starts interacting with a server -- that is, when you go to a website -- the server gives you a unique ID and stores it as a cookie on your computer.

Then, the server can save data and store it, associated with that ID.

Like this:

```
# USER'S BROWSER

cookies = {
  "google.com": {...},
  "tunr.com": {
    "username": "robin",
    "session_id": "8675309"
  }
}
```

```
# YOUR SERVER

session_vars = {
  "1234567": {...},
  "8675309": {
    "is_signed_in": true
  }
}
```

Whenever you use a session variable in your code, your server just checks the user's browser for that cookie, gets the ID, and then looks up all the session variables for that ID.

Rails automatically generates that ID for you. We can see it in our cookies:

```
Name: _tunr_session
Content:  abcdefghijklmnopqrstuvwxyz
Domain: localhost
Path: /
Send for: Any kind of connection
Accessible to script: No (HttpOnly)
Created:  Tuesday, July 28, 2015 at 10:54:08 AM
Expires:  When the browsing session ends
```

##### Looking at this cookie, why would you say session variables are called "ession variables"?
- The session ID is destroyed when your browsing session ends, making those session variables inaccessible.

### Applying to Tunr

Let's add an `is_signed_in` session variable to Tunr. We'll create it in the Users controller. 

```rb
# app/controllers/users_controller.rb

def sign_in!
# ...
  else
    message = "You're signed in, #{@user.username}! "
    cookies[:username] = {
      value: @user.username,
      expires: 100.years.from_now
    }
    session[:user] = @user
  end
# ...
end

def sign_out!
  reset_session
  redirect_to root_url
end
```

Now let's **modify the application layout accordingly**. If the user isn't signed in, we'll show "sign in" and "sign up" links. If they **are** signed in, we'll show a "sign out" link.

```erb
# app/views/layouts/application.html.erb

# ...
<nav>
  <% if session[:user] %>
    <a href="/sign_out"><%= session[:user]["username"] %>: sign out</a></h2>
  <% else %>
    <a href="/sign_up">Sign up</a>
    <a href="/sign_in">Sign in</a>
  <% end %>
  <a href="/songs">Songs</a>
  <a href="/artists">Artists</a>
</nav>
# ...
```

### Before actions

We'll tighten up this app even more by making it so you can't see **anything** unless you've logged in.

We're going to use a method called `before_action`. This lets us do something before *every single action* happens.

In this case, we're going to use it to authenticate the user before every action.

##### What's the difference between "authenticate" and "authorize"?
- Authenticating is checking whether someone is who they say they are
- Authorizing is giving someone special privileges
  - So when you've *authenticated* a user, they are *authorized* to use your app

Let's **update the application controller to authenticate before every action**:

```rb
# app/controllers/application_controller.rb

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate

  private
  def authenticate
    if !session[:user]
      redirect_to "/sign_in"
    end
  end
end
```

*(**Note** that `protect_from_forgery` thing: that works via sessions. It inserts a hidden random string on every form in your app. When that form is submitted, Rails compares that string against a session variable it set for you.)*

If we run the app now... we'll get a "too many redirects" error. That's because we're telling the app to redirect to the sign_in page before every action... including just trying to go to the sign_in page. So when someone is directed to the sign_in page, they're redirected to the sign_in page, and redirected, and redirected...

We want this authentication to happen on every action **except** the user actions. So we can use another special method called `skip_before_action`.

Let's update the **User controller** to prevent authentication, and therefore an infinite loop:

```rb
# app/controllers/users_controller.rb

class UsersController < ApplicationController
  skip_before_action :authenticate
# ...
end
```

## Putting it all together

The goal for this app is for it to serve as your personal playlist. Each user will see only the songs and artists they created.

Now that we're letting the app have multiple users, we need to associate each song and artist with a particular user.

**Important note:** The way the app's set up, if 30 users all add "Bohemian Rhapsody" to their playlist, there will be 30 copies of "Bohemian Rhapsody" and in the "Songs" table, and at least 30 copies of "Queen" in the "Artists" table. This isn't very efficient, but it's useful for demonstrating the concepts we're covering here.

##### How do we associate songs and artists with a user?
- Give the `songs` and `artists` tables a `user_id` column?
  - We can actually do it with less work. Each song already belongs to an artist, so we'll just make each artist belong to a user and leave the songs alone -- that is, we'll **add a `user_id` column to the `artists` table**. *(This means you can't have a song without an artist, but I'm OK with that.)*

```
rails generate migration add_users_to_artists
```
```rb
# db/migrate/[timestamp]_add_users_to_artists.rb

class AddUserToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :user_id, :integer
  end
end
```

```
rake db:drop
rake db:create
rake db:migrate
```

Now let's make sure we can do `@user.artists` and `@artist.user` and so forth by **updating the Artist model and creating a User model**:

```rb
# app/models/artist.rb

class Artist < ActiveRecord::Base
  has_many :songs, dependent: :destroy
  belongs_to :user
end
```

```rb
# app/models/user.rb

class User < ActiveRecord::Base
  has_secure_password
  has_many :artists
end
```

Let's **change the `artists` controller so that whenever you add an artist, it saves the username**.

```rb
# app/controllers/artists_controller.rb

def create
  @user = User.find(session[:user]["id"])
  @artist = @user.artists.create!(artist_params)
  redirect_to (artist_path(@artist))
end
```

With this done, we can **modify the controller to show the songs and artists for this user only**.

```rb
# app/controllers/artists_controller.rb

def index
  @artists = User.find(session[:user]["id"]).artists
end
```

## Review

##### What are the steps for adding user authentication?
1. User migration
- User model
- Install BCrypt gem
- User controller
  - Sign up
  - Sign in
  - Sign out
- Routes

##### What are the three BCrypt methods we used?
- `hash = BCrypt::Password.create("hello")`
- `decoded_hash = BCrypt::Password.new(hash)`
- `decoded_hash.is_password?("hello")`

##### Where are (a) cookies and (b) session variables stored?
- (a) the server, (b) the browser
- (a) the browser, (b) the database
- (a) the database, (b) the server
- (a) the browser, (b) the server

##### What's the difference between encryption and hashing?
##### What's the difference between authenticating and authorizing?
