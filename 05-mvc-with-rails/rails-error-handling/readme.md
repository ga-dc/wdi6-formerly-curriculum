# Error Handling

## Screencasts
- [Part 1/5](https://youtu.be/sHSsc7EGI0g)
- [Part 2/5](https://youtu.be/wKMuNDLDKFA)
- [Part 3/5](https://youtu.be/HZPTIpZUAnQ)
- [Part 4/5](https://youtu.be/yvNO_yoWcqE)
- [Part 5/5](https://youtu.be/hEKDLhZQOSA)

## Learning Objectives

- Explain the purpose of `flash` in Rails
- Compare and contrast `flash[:notice]` and `flash[:alert]`
- List three ActiveRecord methods that trigger validations
- Compare and contrast the validation helpers `confirmation`, `inclusion`, `exclusion`, `length`, `presence`, `uniqueness`, and `numericality`
- Compare and contrast the validation options `allow_nil`, `allow_blank`, and `on`
- Create a custom validation on an ActiveRecord model
- Explain the benefits of explicitly handling errors
- Produce and handle an error in Ruby using the keywords `begin`, `rescue`, and `raise`.

## Setup

Clone down the [errors and validations Tunr repo](https://github.com/ga-dc/tunr_rails_errors_validations).

# Messages to the User

Our app works, but it also breaks quite easily. It's useful for *us* when the app breaks because we can see where all the errors are... but those big red error pages don't make for a very good user experience.

## Framing

It would be nice if we could find a *nice* way let the user know that their artist was successfully created.  

Q. Based on what we've learned so far, how could you show the user a message that their Artist was successfully created?
---

> A. The easiest way would be to just create an instance variable `@message`.

```rb
# app/controllsers/artists_controller.rb
def create
  @artist = Artist.create!(artist_params)
  @message = "#{@artist.name} was created."
  redirect_to @artist
end
```

Then, in `app/views/artists/show.html.erb`:

```erb
<!-- app/views/artists/show.html.erb -->
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
# app/controllers/artists_controller.rb
def create
  @artist = Artist.create!(artist_params)
  flash[:notice] = "#{@artist.name} was created."
  redirect_to @artist
end
```

Then, in `views/artists/show.html.erb`, replace the `@message` line with this:

```erb
<!-- views/artists/show.html.erb -->
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
<!-- views/artists/show.html.erb -->
<% flash.each do |type, message| %>
  <p class="<%= type %>"><%= message %></p>
<% end %>
```

And this css:
```css
/* app/assets/stylesheets/application.css */
.alert{
  color:red;
}
.notice{
  color:blue;
}
```


Q. Presumably, we'd want to show error messages on any page. What problem do we run into now?
---

> A. We only show flash messages on the Artist show page.

Q. Where would be the best place to put the flash messages so we don't have to repeat anything?
---

> A. In `views/layouts/application.html.erb`

```erb
<!-- app/views/layouts/application.html.erb -->
<h1>Tun.r</h1>
<nav>
  <a href="/songs">Songs</a>
  <a href="/artists">Artists</a>
</nav>
<% flash.each do |type, message| %>
  <p class="<%= type %>"><%= message %></p>
<% end %>
```

## Shorthand Flash (5 min)

You can DRY up your code a bit by putting the flash message right in the `redirect_to`:

```rb
# app/controllers/artists_controller.rb
def create
  @artist = Artist.create!(artist_params)
  redirect_to @artist, notice: "#{@artist.name} was successfully saved."
end
```

Note that this only works with flashes named `notice:` or `alert:`. It does not work with `render`.

-----

# Validations

Flash is especially helpful for correcting the user when they use your app in the wrong way -- entering bogus data, for example.

## Framing (5 min)

In our Rails apps, we've been entering a lot of bogus data -- artists with blank names, for instance. That's fine while we're in development, but we don't want the users of our live app to be able to get away with that.

Q. Based on what we know, how could we prevent users from entering **blank data** into a field?
---

> A. Javascript.

...but that's easily circumvented with Chrome's Inspector.


> A. We could put that in the controller, like so:

```rb
# app/controllers/artists_controller.rb
def create
  if params[:name] == ""
    flash[:alert] = "Can't be blank!"
    redirect_to @artist
  else
    @artist = Artist.create(artist_params)
    redirect_to @artist
  end
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
  validates :country, exclusion: ["North Korea"]
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
# app/models/artist.rb
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

### Validation triggers

If you only write these:

```
$ billy = Artist.new(name: "Billy Ray Cyrus")
$ billy.errors.full_messages
```
...you'll get a blank array. That's because `.new` doesn't actually make the validations happen. The only methods that *do* are:

```
.valid?
.save
.save!
.create
.create!
.update
.update!
```

...so `.errors.full_messages` must be run after these.

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

## Using a boolean instead of the exception (10 min)

The discussion on validations has so far shown you about 18 different ways a user can "break" your app.

Truth be told, however, we don't usually use `.create` or `.create!` in Rails apps. Instead, we use `.new` and `.save`.

Q. What's the difference between `.create` and `.new / .save`?
---

> A. `.create` is the same thing as `.new` and `.save` run right after each other.

This gives us a way of making sure the user doesn't see a broken app:

```rb
# app/controllers/artists_controller.rb
def create
  @artist = Artist.new(artist_params)
  if @artist.save
    flash[:notice] = "#{@artist.name} was successfully created."
    redirect_to @artist
  else
    render :new
  end
end
```

...and in the form view:

```erb
<!-- app/views/artists/_form.html.erb -->
<%= @artist.errors.full_messages.first if @artist.errors.any? %>
<%= form_for @artist do |f| %>
```

This way, one thing happens when the user is successful -- and when they're *not* successful, something else happens and they're told what they did wrong.

### This ^ is the "right way" to write a Rails controller.

You could also do:

```erb
<!-- app/views/artists/_form.html.erb -->
<% @artist.errors.full_messages.each do |message| %>
  <p><%= message %></p>
<% end %>
```

### Pro (debugging) tip

Add `<%= debug(@artist) %>` to "app/views/artists/new.html.erb" to see information contained in `@artist`.  Try submitting invalid information for a new Artist.


## You do: Apply this to the artists#update action (10 min)

```rb
# app/controllers/artists_controller.rb
def update
  @artist = Artist.find(params[:id])
  if @artist.update(artist_params)
    flash[:notice] = "#{@artist.name} was created."
    redirect_to @artist
  else
    render :new
  end
end
```
---

## SimpleForm (10 min)

Ensure your Gemfile contains:
```
gem 'simple_form'
```

`bundle install`, and **restart the server**.

Change your `artists/_form.html.erb` form to use `simple_form_for`:

```erb
<!-- app/views/artists/_form.html.erb -->
<%= simple_form_for @artist do |f| %>
  <%= f.input :name %>
  <%= f.input :photo_url %>
  <%= f.input :nationality %>
  <%= f.submit %>
<% end %>
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
# app/controllers/artists_controller.rb
def show
  @artist = Artist.find(params[:id])
  if @artist
    render :show
  else
    redirect_to @artist
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
ActiveRecord::RecordNotFound
```

The exception's class is `RecordNotFound`.

Most classes of exceptions inherit from `StandardError`.

### We do

In your rails console, type:

```
$ ActiveRecord::RecordNotFound.new.class
```

Then, try:

```
$ ActiveRecord::RecordNotFound.new.class.superclass
```

Next, add another `.superclass` onto the end of that. Then another `.superclass`. Keep on going until you get `nil`.

Now, try it with:
- `ZeroDivisionError` (What happens when you divide by zero)
- `NoMethodError` (What happens when you try `"batman" - 42`, or `@artist.favorite_food`)

### Rescuing from types

So errors have different classes, and all those classes inherit from `StandardError` and `Exception`. Who cares?

You'd probably want to handle an error where someone divided by zero differently from an error where they looked up a record that doesn't exist.

Using `rescue_from`, you can make different things happen based on the type of error.

```rb
# app/controllers/application_controller.rb
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

## begin/rescue (time permitting) (15 min)

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
begin
  3 / 0
rescue => my_error
  puts my_error
end

puts "done"
```

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
