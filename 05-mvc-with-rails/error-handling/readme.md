# Error Handling

## Learning Objectives

- Explain the purpose of `flash` in Rails
- Compare and contrast `flash[:notice]` and `flash[:alert]`
- List three ActiveRecord methods that trigger validations
- Compare and contrast the validation helpers `confirmation`, `inclusion`, `exclusion`, `length`, `presence`, `uniqueness`, and `numericality`
- Compare and contrast the validation options `allow_nil`, `allow_blank`, and `on`
- Create a custom validation on an ActiveRecord model
- Explain the benefits of explicitly handling errors
- Produce and handle an error in Ruby using the keywords `begin`, `rescue`, and `raise`.

# Messages to the User

Our app works, but it also breaks quite easily. It's useful for *us* when the app breaks because we can see where all the errors are... but those big red error pages don't make for a very good user experience.

## Framing

It would be nice if we could find a *nice* way let the user know that their artist was successfully created.  

Q. Based on what we've learned so far, how could you show the user a message that their Artist was successfully created?
---

> A. The easiest way would be to just create an instance variable `@message`.

```rb
def create
  @artist = Artist.create!(artist_params)
  @message = "#{@artist.name} was created."
  redirect_to artists_url
end
```

Then, in `app/views/artists/index.html.erb`:

```erb
Message: <%= @message %>
```

Q. Try it! Why doesn't this work?
---

> A. Context. We redirect to a different page. A redirect is a separate GET request. Instance variables exist only on *one* request. They don't persist across requests.

Q. We've seen two main ways of storing user data so it's available from page to page, and request to request. What are they?
---

> A. We could store errors in the database, but that's hugely inefficient. A better idea would be to use temporary **session variables**, which you just learned about.

Rails has a built-in way of storing messages in sessions, called `flash`.

`flash` is a hash that's created on one request, available through the next, then destroyed.  It was created to "flash" a message to the user and then go away.

Replace the `error` instance variable with `flash[:alert]` in your Artist controller to see it in action:

```rb
def create
  @artist = Artist.create!(artist_params)
  flash[:notice] = "#{@artist.name} was successfully saved."
  redirect_to artists_url
end
```

Then, in `views/artists/index.html.erb`, replace the `@message` line with this:

```erb
<% flash.each do |type, message| %>
  <p><%= type %>: <%= message %></p>
<% end %>
```

#### Try it!

## [Flash convention](http://gaspull.geeksaresexytech.netdna-cdn.com/wp-content/uploads/2015/07/P1060110.jpg)

We used `flash[:alert]`, but as with any hash, we can use `flash[:notice]`, `flash[:wombat]`, `flash[:bananapatch]`, `flash[:error]`, whatever.

It's convention to stick to two main ones: `:alert` and `:notice`.

Q. Why should you stick to this convention?
---
> Having one or two flash types makes it really easy to style your Flashes with CSS.  Also, rails provides special helpers for alert and notice.  In the [controllers](http://guides.rubyonrails.org/action_controller_overview.html#the-flash) and [views](http://api.rubyonrails.org/classes/ActionDispatch/Flash.html).

Consider:

```erb
<% flash.each do |type, message| %>
  <p class="<%= type %>"><%= message %></p>
<% end %>
```

And this css:
```css
.alert{
  color:red;
}
.notice{
  color:blue;
}
```


Q. Presumably, we'd want to show error messages on any page. What problem do we run into now?
---

> A. We only show flash messages on the Artist index page.

Q. Where would be the best place to put the flash messages so we don't have to repeat anything?
---

> A. In `views/layouts/application.html.erb`

## Shorthand Flash (5 min)

You can DRY up your code a bit by putting the flash message right in the `redirect_to`:

```rb
def create
  @artist = Artist.create!(artist_params)
  redirect_to artists_url, notice: "#{@artist.name} was successfully saved."
end
```

Note that this only works with flashes named `notice:` or `alert:`.

It also works with `render`:

```rb
def index
  @artists = Artist.all
  render :index, notice: "Successfully retrieved all the artists."
end
```

-----

# Validations

Flash is especially helpful for correcting the user when they use your app in the wrong way -- entering bogus data, for example.

## Framing (5 min)

In our Rails apps, we've been entering a lot of bogus data -- artists with blank names, for instance. That's fine while we're in development, but we don't want the users of our live app to be able to get away with that.

Q. Based on what we know, how could we prevent users from entering blank data into a field?
---

> A. Javascript.

...but that's easily circumvented with Chrome's Inspector.


> A. We could put that in the controller, like so:
  ```rb
  if params[:name] == ""
    redirect_to artists_url
  end
  ```

...but putting it in the controller is going to lead to some pretty unwieldy controller methods. Besides, we may want there to be several routes that create or update an artist, and we'd need to copy and paste that bit of code for each one. That's hardly DRY!


> A. We could put in database constraints, like `NOT NULL` and `UNIQUE`, by going and playing around in SQL.

But...it's SQL.  Rails provides [some helpers](http://edgeguides.rubyonrails.org/active_record_migrations.html#column-modifiers) for managing database constraints.  Beyond those, it can be difficult.

Wouldn't it be nice if, before an Artist record was saved, we could validate that the data entered into its fields were correct?

## You do (15 min)

[The docs, for reference.](http://guides.rubyonrails.org/active_record_validations.html)

- Add the following code to your Artist model. What does each line do?

```rb
class Artist < ActiveRecord::Base
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :name, length: {in: 1..20}
  validates :nationality, inclusion: ["USA", "Canada", "UK"]
end
```

- What's the *un*-DRY version of the following?

```rb
class Artist < ActiveRecord::Base
  validates :name, :nationality, :photo_url, presence: true
  validates :name, uniqueness: true, length: {maximum: 100}
end
```

- Can you figure out what these would do?

```rb
class User < ActiveRecord::Base
  validates :password, confirmation: true
  validates :age, numericality: {only_integer: true, greater_than_or_equal_to: 13}
  validates :country, exclusion: {in: ["North Korea"]}
end
```

- What are the differences between the two following snippets?

```rb
class User < ActiveRecord::Base
  validates :password, confirmation: true
  validates :ssn, uniqueness: true, allow_blank: true
end

class User < ActiveRecord::Base
  validates :password, confirmation: true, on: create
  validates :ssn, uniqueness: true, allow_nil: true
end
```

## Custom validations (10 min)

You can also easily create your own custom validations. For instance, this will make Tunr reject any artist named Billy Ray Cyrus:

```rb
class Artist < ActiveRecord::Base
  validate :break_billy_rays_achy_breaky_heart

  def break_billy_rays_achy_breaky_heart
    if self.name == "Billy Ray Cyrus"
      errors.add(:name, "cannot be Billy Ray Cyrus, because he doesn't qualify as an artist.")
    end
  end
end
```

Q. Test it out by using the form to create a new artist named "Billy Ray Cyrus". What does `errors.add` do?
---

> A. Determines what the error message is.

Q. This validation won't be triggered if the user writes "billy ray cyrus" in all-lowercase. How could you fix that?
---

> A. `if self.name.downcase == "billy ray cyrus"`

## Validation in the console (10 min)

Let's test out these validations in the Rails console.

You can leave `rails s` running in one tab; it doesn't matter. In a *different* tab, run `rails c`.

Your "prompt" in the Rails console should look something like this:

```
2.2.3 :001>
```

Now, type in:

```
$ billy = Artist.new(name: "Billy Ray Cyrus")
$ miley = Artist.new(name: "Miley Cyrus")
```

Q. What does `billy.valid?` do? What about `miley.valid?`
---

> A. Tells us whether these Artists will be able to be saved to the database.

Q. After typing `billy.valid?`, type `billy.errors`. What does it do? What about `billy.errors.full_messages`?
---

> A. Contains the error messages generated by trying to save the Artist.

These are the methods Rails uses underneath the surface to trigger validation errors.

Q. Imagine you see the below line of code has been added to the `views/artists/new.html.erb` page. What does it do?
---

```
<%= @artist.errors.full_messages.first if @artist.errors.any? %>
```

> A. It prints out the first error message that was generated.

## Break (10 min)

## Bangin' methods (10 min)

Let's try using `.create` instead of `.new`:

```
$ billy = Artist.create(name: "Billy Ray Cyrus")
```

### Rollback

You should see something like:

```
2.2.1 :024 > billy = Artist.create(name: "Billy Ray Cyrus")
   (0.2ms)  BEGIN
   (0.6ms)  ROLLBACK
 => #<Artist id: nil, name: "Billy Ray Cyrus", photo_url: nil, nationality: nil, created_at: nil, updated_at: nil>
```

That `ROLLBACK` indicates that ActiveRecord tried running a SQL command, but it was unsuccessful, so it's undoing -- or "rolling-back" -- any changes that it made.

### With a bang

Now try the same command, but put a bang `!` at the end of `.create`:

```
$ billy = Artist.create!(name: "Billy Ray Cyrus")
```

Q. What's the difference between `.create` and `.create!`?
---

> A. Adding in a bang makes the app throw a fatal error -- that is, "break" -- if a validation fails. Without the bang, it fails "silently".

You can add a bang to both `.create` and `.save`.

Q. It's considered good practice to always use bangs on these methods. Why?
---

> A. It forces us to cover all our bases. Without the bang, the user may be able to submit data that doesn't work. We want them to KNOW when the data doesn't work.

## Using a boolean instead of the exception (10 min)

The discussion on validations has so far shown you about 18 different ways a user can "break" your app.

Truth be told, however, we don't usually use `.create` or `.create!` in Rails apps. Instead, we use `.new` and `.save`.

Q. What's the difference between `.create` and `.new / .save`?
---

> A. `.create` is the same thing as `.new` and `.save` run right after each other.

This gives us a way of making sure the user doesn't see a broken app:

```rb
def create
  @artist = Artist.new(artist_params)
  if @artist.save
    flash[:notice] = "#{@artist.name} was successfully created."
    redirect_to artists_url
  else
    flash[:alert] = @artist.error.full_messages
    render :new
  end
end
```

This way, one thing happens when the user is successful -- and when they're *not* successful, something else happens and they're told what they did wrong.

Remember that we can save two lines of code by putting `notice` and `alert` right into `redirect_to` and `render`:

```rb
def create
  @artist = Artist.new(artist_params)
  if @artist.save
    redirect_to artists_url, notice: "#{@artist.name} was successfully created."
  else
    render :new, alert: @artist.error.full_messages
  end
end
```

### Pro (debugging) tip

Add `<%= debug(@artist) %>` to "app/views/artists/new.html.erb" to see information contained in `@artist`.  Try submitting invalid information for a new Artist.


## You do: Apply this to the artists#update action (10 min)
---

## SimpleForm (10 min)

Ensure your Gemfile contains:
```
gem 'simple_form'
```

`bundle install`, and restart the server.

Change your `artists/new.html.erb` form to use `simple_form_for`:

```erb
<h2>New Artist</h2>

<%= simple_form_for Artist.new do |f| %>
  <%= f.input :name %>
  <%= f.input :photo_url %>
  <%= f.input :nationality %>
  <%= f.submit %>
<% end %>
```

Ensure the `artists#create` action looks like this:

```erb
def create
  @artist = Artist.new(artist_params)
  if @artist.save
    redirect_to artist_url(@artist)
  else
    render :new
  end
end
```

Finally, make sure your Artist model has a validation in it.

Try creating a new Artist, making sure you fail that validation.

Pretty cool, huh?
---

## Break (10 min)

# Error Handling

We recommend you start a new branch for this portion.  We're sharing concepts, not, necessarily, best practices.

## Framing (5 min)

Let's force the app to break by looking up an artist that doesn't exist. Try going to `localhost:3000/artists/8675309`.

Notice that across the top it says `ActiveRecord::RecordNotFound`.

This is something that is very likely to happen: your users will look up an artist that has been deleted, or get bored and type in random IDs.

Q. How could you control for users looking up records that don't exist?
---

> A. You could just check to see if an artist with that ID exists, and if it doesn't, then redirect somewhere else.

```rb
def show
  @artist = Artist.find(params[:id])
  if @artist
    render :show
  else
    redirect_to "artists"
  end
end
```

This is fine, but it's not very DRY: if we wanted to protect songs from this error we'd need to copy and paste almost the exact same code.

## rescue_from (5 min)

Replace the contents of your application controller with this:

```rb
# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  rescue_from ActiveRecord::RecordNotFound, with: :couldnt_find_record

  private
  def couldnt_find_record
    redirect_to root_url, notice: "That record doesn't exist!"
  end
end
```

Now try going to `localhost:3000/artists/8675309`.

### What happened?

We told Rails to "rescue us from" a specific kind of error -- in this case, ActiveRecord's "Not Found" error. We told it to rescue us by running a method called `couldnt_find_record` that we've defined. What that method does is nothing new: it redirects us to some URL, and flashes a notice.

## Exception types (15 min)

Every error -- or "exception" -- in Ruby belongs to a class. In this case, `RecordNotFound` is the class. When a validation fails, you get:

```
ActiveRecord::RecordInvalid
```

The exception's class is `RecordInvalid`.

Most classes of exceptions inherit from `StandardError`.

### We do

In your rails console, type:

```
$ ActiveRecord::RecordInvalid.new.class
```

Then, try:

```
$ ActiveRecord::RecordInvalid.new.class.superclass
```

Next, add another `.superclass` onto the end of that. Then another `.superclass`. Keep on going until you get `nil`.

Now, try it with:
- `ActiveRecord::RecordNotFound`
- `ZeroDivisionError` (What happens when you divide by zero)
- `NoMethodError` (What happens when you try `"batman" - 42`, or `@artist.favorite_food`)

### Rescuing from types

So errors have different classes, and all those classes inherit from `StandardError` and `Exception`. Who cares?

You'd probably want to handle an error where someone divided by zero differently from an error where they looked up a record that doesn't exist.

Using `rescue_from`, you can make different things happen based on the type of error.

```rb
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  rescue_from ActiveRecord::RecordNotFound, with: :couldnt_find_record
  rescue_from NoMethodError, with: :no_method_error

  private
  def couldnt_find_record
    redirect_to root_url, notice: "That record doesn't exist!"
  end

  def no_method_error
    redirect_to root_url, notice: "The developer working on this didn't cover their butt appropriately. Our bad."
  end
end
```

## begin/rescue [time permitting] (15 min)

What's going on underneath the hood is Rails using Ruby's built-in `begin/rescue` syntax.

Let's step away from Rails for a second. In your `wdi/sandbox` folder, create a new file called `exceptions.rb`.

In it, paste the following:

```rb
3 / 0

puts "done"
```

Run that with `ruby exceptions.rb`. It should throw a "ZeroDivisionError" at you.

Now, replace the file with this:

```rb
require "pry"

begin
  3 / 0
rescue => my_error
  binding.pry
end

puts "done"
```

When Pry starts, type `my_error.message`.

`begin` tells Ruby, "Start listening for an exception." Whenever Ruby runs into an error, it stops whatever it's doing and looks for a `rescue` statement. If it finds one, it does whatever the `rescue` says to do, and then continues.

Inside `rescue`, using the hashrocket `=>` syntax, we can do something with the exception that was generated.

This gives us a way of handling errors. It's where `rescue_from` gets its name.

We will use `begin/rescue` very little, but it happens all the time underneath the surface of the gems we use, and is something you'll see occasionally.

# Questions (5 min)

- What's the difference between `.create` and `.create!`?
- You see `ROLLBACK` in your Rails server log. What does that mean?
- What does it mean to let something "fail silently", and why is it considered bad?
- What's the difference between `begin` and `rescue`?
- What's the difference between an error and an exception?
