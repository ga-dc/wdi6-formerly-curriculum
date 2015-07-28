# Sessions and Auth

## Learning Objectives
- Contrast the use cases for cookies, sessions, and permanent storage.
- Define and then access a session variable in a Rails application.
- Create a (very) simple hashing algorithm.
- Describe the differences between hashing and encoding.
- Add sign-in, sign in, and sign out functionality to a Rails application.
- Securely store and access passwords.
- Describe the functionality added by `has_secure_password`.
- Differentiate between authentication and authorization.

## What's a cookie?

### We do:
1. In Chrome, go to Preferences
- Show advanced settings
- Click "Content settings"
- Click "All cookies and site data"
- Scroll to `github.com`

Click around on the different "buttons" or "tabs". In particular, look at `dotcom_user`, `logged_in`, and `tz`.

#### Turn and talk: What do you see? What do these do?

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

#### What might be the purpose of these cookies?
#### Why is Github's expiration date so far in the future, while Wells Fargo's is when the browsing session ends?
#### What's the significance of 'Send for: Secure connections only'?

Notice the "Accessible to script". Cookies can be accessed via Javascript.

If you go to `github.com`, open the console, and type `document.cookies`, you'll get something like this:

```
tz=America%2FNew_York; _ga=GA1.2.3456.7890; _gat=1"
```

Hiding from scripts, expiration dates, secure connections only...

#### Why does security with cookies seem to be such a big deal?

## Reading and writing cookies

### Writing

Modifying cookies is super easy. In Tunr:
```
# controllers/artists_controller.rb

def index
  cookies["Why did the chicken cross the road?"] = "To get to the other side"
  @artists = Artist.all
end
```

Now, when I go to the `artists#index` page (that is, the main page)... nothing seems to happen. But if I check the cookies for `localhost` in Chrome, there's now a cookie called `Why+did+the+chicken+cross+the+road%3F`, with the value "To get to the other side"!

I can change the expiration time of my cookie like this:

```
def index
  cookies["Why did the chicken cross the road?"] = {
    value: "To get to the other side",
    expires: 10.seconds.from_now
  }
  @artists = Artist.all
end
```

If I immediately look at the cookies for `localhost` I can see this cookie. If I close the window, wait a few seconds, and look again, it's vanished!

By default, the expiration time is "when the current session ends" -- that is, when the browser is closed.

### Reading

To **read** my cookie, I just use `cookies["Why did the chicken cross the road?"]`. I can put this right in an `.html.erb` page.

Note that `cookies` is a **hash**, just like any other hash. If I put `<%= cookies.to_json %>` in my `.html.erb`, it'll show me all the cookies for this domain (`localhost`, in this case).

## Applying to Tunr

Currently, Tunr just supports one single user. It would be nice if it could have multiple users. Whenever a user logs in, they'd see only *their* artists and songs.

To start, let's add a "sign-in" form. We'll put it in the main application layout so that the form appears across the top of every page.

The form just needs a text field for a username, and a "Submit" button. We'll worry about passwords and stuff later.

```
# app/views/layouts/application.html.erb

<form method="post" action="/signin">
  <input type="text" name="username" placeholder="username" />
  <input type="submit" value="Sign in" />
</form>
```

Now we need to make the form able to actually do something. The form is POSTing to `/signin`, so let's make the appropriate route:

```
# config/routes.rb

Rails.application.routes.draw do
  root to: 'artists#index'
  get '/songs', to: 'songs#index'
  post '/signin', to: 'application#signin'
  resources :artists do
    resources :songs
    resources :genres
  end
end
```

I made the route direct the request to the `signin` method of the Application controller, so we'd better create that method.

*(In this controller, you'll see something about "forgery" and "CSRF". We'll talk about that later; ignore it for now.)*

This `signin` method should get the `username` from the `params` that were POSTed. Then, let's have it save the username as a cookie, and redirect the user back to where they were before.

```
# app/controllers/application_controller.rb

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def signin
    cookies[:username] = {
      value: params[:username],
      expires: 100.years.from_now
    }
    redirect_to :back
  end
end
```

Finally, so we can see our handiwork, lets change the sign-in form so that the username is automatically filled in if the "username" cookie is set.

We'll also need to add in a line of "magic" that has to do with the "protect_from_forgery" thing we saw before. Again, we'll talk about what it does in a bit.

```
<form method="post" action="/signin">
  <%= tag(:input, :type => "hidden", :name => request_forgery_protection_token.to_s, :value => form_authenticity_token) %>
  <input type="text" name="username" placeholder="username" value="<%= cookies[:username] %>" />
  <input type="submit" value="Sign in" />
</form>
```

Now, when I type in a username and "Sign in", my username is filled in! I can close the browser, and when I go back to the page it'll still be there.

This is exactly how those "Remember me?" checkboxes you see when logging in on so many sites work.

Hopefully you can start to see the utility of cookies. They were originally invented for e-commerce, to let you store the items in your shopping cart on, say, Amazon. Now they're used for all kinds of things.

### Bringing in the database

The goal for this app is for it to serve as your personal playlist. Each user will see only the songs and artists they created.

Having this "remember me" functionality is a nice user interface thing, but it doesn't really *do* anything. Also, the data is just stored in the browser. As the app creator, I want the user data to be stored on my server.

Let's create a user model!

```
rails generate model user
```

Our User table is going to be really simple, with just a username and password:

```
# db/migrate/[timestamp]_users.db

class Users < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
    end
  end
end
```

Now we need to make that POST `sign-in` method actually do something.

- If a user with that username doesn't exist, it should be created, and the username and password saved as cookies so that neither needs to be re-entered
- If a user with that username *does* exist, its password should be compared with the password that was just entered
  - If the password is the same, a "welcome" message should be displayed, and the username and password saved as cookies
  - If it's different, an "error" message should be displayed, and the `username` cookie is made a blank string

### How do we make an error message?
A special Rails thingy called **flash**. It's a hash that's passed to the next action, and then erased.

```
# app/controllers/application_controller.rb

def signin
  if !User.find_by(username: params[:username])
    User.create(username: params[:username], password: params[:password])
    flash[:signin] = "We created an account for you, #{@user.username}!"
    cookies[:username] = params[:username]
    cookies[:password] = params[:password]
  else
    @user = User.find_by(username: params[:username])
    if @user.password == params[:password]
      flash[:signin] = "You're signed in, #{@user.username}!"
      cookies[:username] = params[:username]
      cookies[:password] = params[:password]
    else
      flash[:signin] = "Your password is wrong!"
    end
  end
  redirect_to :back
end
```

Let's add the "password" field to the sign-in form. Let's also make a place to put an error message if someone enters the wrong password, and a welcome message if they put in the right one.

```
# app/views/layouts/application.html.erb

<h2><%= flash[:signin] %></h2>
<form method="post" action="../signin">
  <%= tag(:input, :type => "hidden", :name => request_forgery_protection_token.to_s, :value => form_authenticity_token) %>
  <input type="text" name="username" placeholder="username" value="<%= cookies[:username] %>"/>
  <input type="password" name="password" placeholder="password" value="<%= cookies[:password] %>"/>
  <input type="submit" value="Sign in" />
</form>
```

### Associating the User with songs and artists

Now that we're letting the app have multiple users, we need to associate each song and artist with a particular user.

**Important note:** The way the app's set up, if 30 users all add "Bohemian Rhapsody" to their playlist, there will be 30 copies of "Bohemian Rhapsody" and in the "Songs" table, and at least 30 copies of "Queen" in the "Artists" table. This isn't very efficient, but it's useful for demonstrating the concepts we're covering here.

#### How do we associate songs and artists with a user?
- Give the `songs` and `artists` tables a `user_id` column
  - We can actually do it with less work. Each song already belongs to an artist, so we'll just make each artist belong to a user and leave the songs alone -- that is, we'll **add a `user_id` column to the `artists` table**. *(This means you can't have a song without an artist, but I'm OK with that.)*

```
rails generate migration addUsersToArtists
```
```
# db/migrate/[timestamp]_add_users_to_artists.rb

class AddUserToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :user_id, :string
  end
end
```

Now let's make sure we can do `@user.artists` and `@artist.user` and so forth by **updating the Artist model and creating a User model**:

```
# app/models/artist.rb

class Artist < ActiveRecord::Base
  has_many :songs, dependent: :destroy
  belongs_to :user
end
```

```
# app/models/user.rb

class User < ActiveRecord::Base
  has_many :artists, dependent: :destroy
end
```


Let's **change the `artists` controller so that whenever you add an artist, it saves the username**.

```
# app/controllers/artists_controller.rb

def create
  @artist = Artist.create!(artist_params.merge({user_id: cookies["username"]}))
  redirect_to (artist_path(@artist))
end
```

With this done, we can **modify the controller to show the songs and artists for this user only**.

```
# app/controllers/artists_controller.rb

def index
  @artists = Artist.where(user_id: cookies["username"])
end
```

Without cookies to keep the username on every page of the app, the user would have to type their username every single time they wanted to add a new artist.

## Security

Now imagine instead of songs and artists this app stored transactions and bank accounts. If you knew someone else's username, you could see all their transactions.

No problem: we'll create a "users" model that has a username and a password. The passwords will be stored in the database:

|id|username|password|
|-|-|-|
|1|robertakarobin|spatulabagel|
|2|andykim|argylesocks|
|3|adambray|correcthorsebatterystaple|

So you go to the app, enter your username and password, click "sign in", it checks to make sure the password matches your username... And then what?

#### How can we keep the user from needing to enter their password on every page?
- Save the password as a cookie?
  - Anyone else who uses your computer could go into Chrome, look at the cookies, and see your password
- Save a cookie called "is_logged_in"?
  - That would make your site really insecure. There are Chrome extensions that let you create cookies for any site. Someone could come to your site and just make an "is_logged_in" cookie.

#### Another issue: All the passwords are stored in the database as plain text. Why is that a problem?

Most people use the same password for many sites. Anyone with access to the database could see people's passwords and easily try them out on other sites.

### Two truths and a lie:

- Washington is an expensive city in which to live.
- Jesse has nice hair.
- It is possible to make something 100% secure.

There is no such thing as a completely secure system. With enough time and effort, anything can be hacked.

#### Given two systems, what would make a hacker choose to hack one over the other?
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

#### So how can we make it annoying to try to hack the passwords in our database?
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

#### Why am I still confident that you won't figure out my password?
- Because that's a really, really difficult calculation for any computer to make!

So let's say instead of my password, the database stores this number, which is only about 260 bytes as a string. When I enter my password, my app takes whatever I entered to the 40th power. If it matches, even though it doesn't know my actual password, it knows I entered my password correctly. If what I entered is just one number off, the calculation's result will be completely different, and it won't match.

This way, the only place my actual password is stored is in my own human memory.

Could someone hack my password? Yes, but it would take a tremendous amount of computer power.

Hashing is used very, very widely in **authentication** -- that is, making sure someone is who they say they are.

## Sessions

Let's go back to our old problem: how to keep Tunr users from needing to enter their password on every page of the app.

We're keeping their username as a cookie, and their password as a hash in the database.

## Review

- Where are (a) cookies and (b) session variables stored?
  - (a) the server, (b) the browser
  - (a) the browser, (b) the database
  - (a) the database, (b) the server
  - (a) the browser, (b) the server
- What's the difference between encryption and hashing?
