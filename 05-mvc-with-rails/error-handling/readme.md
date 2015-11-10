# Error Handling

## Learning Objectives

- Explain the benefits of explicitly handling errors
- Produce and handle an error in Ruby using the keywords `begin`, `rescue`, and `raise`.
- Explain the purpose of `flash` in Rails
- Compare and contrast `flash[:notice]` and `flash[:alert]`
- List three ActiveRecord methods that trigger validations
- Compare and contrast the validation helpers `confirmation`, `inclusion`, `exclusion`, `length`, `presence`, `uniqueness`, and `numericality`
- Compare and contrast the validation options `allow_nil`, `allow_blank`, and `on`
- Create a custom validation on an ActiveRecord model

# Messages to the User

## Framing

It would be nice if we could let the user know that their artist was successfully created.  

#### How could we show a message?

```rb
  def create
    @artist = Artist.create!(artist_params)
    @message = "#{@artist.name} was created."
    redirect_to "/artists"
  end
```

In `app/views/artists/index.html.erb`:

```erb
Message: <%= @message %>
```

Let's try it.


#### Why doesn't this work?

> A. Context.  This is a stateless system.  The instance variables do not persist across requests.


#### We've seen two main ways of storing user data so it's available from page to page. What are they?

We could store errors in the database, but that's hugely inefficient. A better idea would be to use **session variables**, about which you learned in your last class.

Rails has a built-in way of doing this, called `flash`.

`flash` is a hash of messages that's created on one request and available through the next, then destroyed.

Replace the `error` instance variable with `flash[:alert]` in your Artist controller:

```rb
  def create
    @artist = Artist.create!(artist_params)
    flash[:notice] = "#{@artist.name} was successfully saved."
    redirect_to "/artists"
  end
```

In the `views/artists/index`, replace the `@message` line with this:

```erb
  <% flash.each do |type, message| %>
    <p><%= type %>: <%= message %></p>
  <% end %>
```

...and there you go!

### Flash convention

We used `flash[:alert]`, but as with any hash, we can use `flash[:notice]`, `flash[:wombat]`, `flash[:error]`, whatever.

It's convention to stick to two main ones: `:alert` and `:notice`.

#### Why should you stick to this convention?

Having one or two flash types makes it really easy to style your Flashes with CSS. Consider:

```erb
  <% flash.each do |type, message| %>
    <p class="<%= type %>"><%= message %></p>
  <% end %>
```

```css
.alert{
  color:red;
}
.notice{
  color:blue;
}
```

> It *used* to be that Rails had some helper methods that worked only with `alert` and `notice`. However, that's no longer the case.

#### Presumably, we'd want to show error messages on any page. What problem do we run into now?

> We only show flash messages on the Artist index page!

#### Where would be the best place to put the flash messages so we don't have to repeat anything?

> In `views/layouts/application.html.erb`

# Validations

## Framing (5 min)

In our Rails apps, we've been entering a lot of bogus data -- artists with blank names, for instance. That's fine while we're in development, but we don't want the users of our live app to be able to get away with that.

#### How could we prevent users from entering blank data into a field?

We could use Javascript, but that's easily circumvented with Chrome's Inspector.

We could put that in the controller, like so:

```rb
if params[:name] == ""
  redirect_to "/artists"
end
```

...but that's going to lead to some pretty unwieldy controller methods. Besides, we may want there to be several routes that create or update an artist, and we'd need to copy and paste that bit of code for each one. That's hardly DRY!

We could put in database constraints, like `NOT NULL` and `UNIQUE`, by going and playing around in SQL.

#### Why would I want to avoid writing database constraints?

It's difficult and dangerous. For one thing, Rails doesn't give us a direct way of writing SQL schema. For another thing, I wouldn't want to write SQL anyway! I'll avoid SQL pretty much every time I possibly can because otherwise it's really easy for me to mess up my database, and because SQL isn't a programming language and so is more difficult for me to understand.

Wouldn't it be nice if, before an Artist record was saved, we could validate that the data entered into its fields were correct?

## You do (15 min)

[The docs, for reference.](http://guides.rubyonrails.org/active_record_validations.html)

- Add the following code to your Artist model. What does each line do?

```rb
class Artist < ActiveRecord::Base
  validates :name, uniqueness: true
  validates :name, presence: true
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

#### Test it out by using the form to create a new artist named "Billy Ray Cyrus". What does `errors.add` do?

#### This validation won't be triggered if the user writes "billy ray cyrus" in all-lowercase. How could you fix that?

## Validation in the console (10 min)

Let's test it out in the Rails console.

You can leave `rails s` running in one tab; it doesn't matter. In a *different* tab, run `rails c`.

Your "prompt" in the Rails console should look something like this:

```
2.2.1 :001>
```

Now, type in:

```
$ billy = Artist.new(name: "Billy Ray Cyrus")
$ miley = Artist.new(name: "Miley Cyrus")
```

#### What does `billy.valid?` do? What about `miley.valid?`

#### After typing `billy.valid?`, type `billy.errors`. What does it do? What about `billy.errors.full_messages`?

These are the methods Rails uses underneath the surface to trigger validation errors.

#### You see the below line of code has been added to the `views/artists/new.html.erb` page. What does it do?

```
<%= @artist.errors.full_messages.first if @artist.errors.any? %>
```

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

#### What's the difference between `.create` and `.create!`?

Adding in a bang makes the app throw a fatal error -- that is, "break" -- if a validation fails. Without the bang, it fails "silently".

You can add a bang to both `.create` and `.save`.

#### It's considered good practice to always use bangs on these methods. Why?

> A. ???

## Using a boolean instead of the exception

The discussion on validations has so far shown you about 18 different ways a user can "break" your app. It's useful for *us* when the app breaks because we can see where all the errors are... but we don't want our users to know.

Truth be told, however, we don't usually use `.create` or `.create!` in Rails apps.

Instead, we use `.new` and `.save`, like this:

```rb
def create
  @artist = Artist.new(artist_params)
  if @artist.save
    flash[:notice] = "#{@artist.name} was successfully created."
    redirect_to artists_path
  else
    flash[:alert] = @artist.error.full_messages
    render :new
  end
end
```

This gives us a way of letting one thing happen when the user is successful -- and when they're *not* successful, doing something else and letting them know what went wrong.

You can actually save two lines of code by putting `notice` and `alert` right into `redirect_to` and `render`:

```rb
def create
  @artist = Artist.new(artist_params)
  if @artist.save
    redirect_to artists_path, notice: "#{@artist.name} was successfully created."
  else
    render :new, alert: @artist.error.full_messages
  end
end
```

### You do: (10 min) Apply this to the artists#update action.


## SimpleForm

Ensure your Gemfile contains:
```
gem 'simple_form'
```

Don't forget to restart the server.

Change your `artists/new.html.erb` form to use `simple_form_for`:

```erb
<%= simple_form_for @artist do |f| %>
  <%= f.input :title %>
  <%= f.input :photo_url %>
  <%= f.input :nationality %>
  <%= f.submit %>
<% end %>
```

Try creating a new Artist, making sure you fail a validation.

Pretty cool, huh?


# Error Handling

What we just went over is the **"right"**, Rails-y way to handle validations. However, you may also see people using something called `begin` and `rescue`.

## Framing

Imagine, if you will, that we for some reason didn't want to use `.new` and `.save` -- we just want to use `.create!`. When something goes wrong with `.create!`, it "breaks" your app.

If only there was something that could *rescue* our app whenever it's about to break!

## Begin and Rescue (10 min)

Let's intentionally break the app.

Go to the Artist model, and make sure it validates the presence of the `name` field:

```rb
class Artist < ActiveRecord::Base
  has_many :songs
  validates :name, presence: true
end
```

Now go to the Artists controller. The `create` action should look like this:

```rb
# app/controllers/artists_controller.rb
  def create
    @artist = Artist.create!(artist_params)
    flash[:notice] = "#{@artist.name} was successfully saved."
    redirect_to "/artists"
  end
```

Finally, go to `localhost:3000/artists/new`, leave the form blank, and submit it. You should get an error saying "Validation failed: Name can't be blank".

Now change the `create` action to look like the following:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
    rescue
    end
    flash[:notice] = "#{@artist.name} was successfully saved."
    redirect_to "/artists"
  end
```

Submit the form again. It should render the Artists#new page no problem.

The `begin` tells Ruby, "Start listening for errors." The `rescue` tells Ruby to "rescue" the app from breaking when any errors come up.

**Every `begin` must have a `rescue`, and vice-versa. It must also have an `end`.**

## Error messages (10 min)

That's all very well, but it's not very useful.

#### Why is this error-suppresser not very useful?

If someone's interacting with your app and does something wrong, they want to know what they did wrong. Silent errors are just as bad as app-breaking errors!

Let's make an error message that actually shows up somewhere:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
      flash[:notice] = "#{@artist.name} was successfully saved."
    rescue
      flash[:alert] = "#{@artist.name} couldn't be saved."
    end
    redirect_to "/artists"
  end
```

#### Why didn't the "successfully saved" message show up?

> Because when an error is raised, it stops whatever the script is doing and jumps to a `rescue`, if available.

This at least tells us something went wrong, but doesn't tell us *what*.

### Let the Developers know what happened

That's what we have logs for.

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
      flash[:notice] = "#{@artist.name} was successfully saved."
    rescue => sad_panda
      Rails.logger.error sad_panda
      flash[:alert] = "#{@artist.name} couldn't be saved."
    end
    redirect_to "/artists"
  end
```


Check out the logs.  The log is displayed in the terminal where you started `rails server`.

#### Why not use `puts`?

`puts` is generally only used to make sure something is working while you're developing it. `Rails.logger` is more formal. Using it is saying "I expressly want this to be saved for posterity."

#### You do: (5 min) [Read section 2, about the Logger](http://guides.rubyonrails.org/debugging_rails_applications.html#the-logger)

#### Why do we care about these log files? We have the console open right here!

When you deploy your app, you're not going to have someone hovering over the console all the time. So, if something goes wrong, you're going to rely on your server keeping written records of what hit the fan.

## StandardError

So now the *developers* know what went wrong, but the *user* still has no idea -- they just know that **something** went wrong.

We can tell Ruby to listen for a specific error type, and then when an error of that type happens, to save the information about the error to a variable:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
      flash[:notice] = "#{@artist.name} was successfully saved."
    rescue => sad_panda
      Rails.logger.error sad_panda
      flash[:alert] = "#{@artist.name} couldn't be saved due to #{sad_panda.message}"
    end
    redirect_to "/artists"
  end
```

Ruby has many different types of errors, and each one has a class. You can even make your own! However, `StandardError` is the class from which almost all of them inherit, so that's what we're using here.

We're saving the `StandardError` into a variable called `sad_panda` with the hashrocket `=>` notation. This variable can be called anything.

## Control Flow ()

Let's have the `create` action do what it originally did when the user successfully creates an artist, which is to redirect to that artist's page:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
    rescue StandardError => sad_panda
      @error = sad_panda.message
    end
    # render :new
    redirect_to "/artists/#{@artist.id}"
  end
```

Submit the blank form. You should get an `undefined method 'id'` error. The `rescue` hasn't prevented the controller from still trying to redirect us to "/artists/#{@artist.id}". The artist wasn't created, so it doesn't have an ID -- so the app's still breaking!

### Else

What we really want is for the controller to do one thing when it works, and another when it doesn't.

`begin/rescue` blocks can also take an `else` statement. We can use this to, say, show the Artist show page if there are no errors, but redirect the user to Google if there are still errors:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
    rescue StandardError => sad_panda
      render :new
      redirect_to "http://google.com/search?q=#{sad_panda.message}"
    else
      redirect_to "/artists/#{@artist.id}"
    end
  end
```

## Raising your own errors

Underneath the surface, errors all rely on the `raise` keyword. You don't "throw" an error in Ruby, you "raise" it.

For example:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
      if @artist.name == "Billy Ray Cyrus"
        raise "An Artist who isn't Billy Ray Cyrus, please"
      end
    rescue StandardError => sad_panda
      redirect_to "http://google.com/search?q=#{sad_panda.message}"
    else
      redirect_to "/artists/#{@artist.id}"
    end
  end
```

Whenever Ruby encounters a `raise`, it stops whatever it's doing and looks to see whether the `raise` occurred inside a `begin/rescue` block. If it did, then it lets the `rescue` handle the error. If it did **not**, then it "breaks" the app with a fatal error.

You can raise an error anywhere you want. It will always work the same way.

#### Why use `raise` at all? Why not just use `@error` and `if/else` statements?

`raise` is like a `return` statement in that it stops the app from continuing. You *could* just use a bunch of `if/else` statements, but using `raise` to halt the app is much more convenient. Additionally, you're probably going to want to handle most of your errors the same way. Using `begin/rescue` makes this much simpler.

#### Theoretically, you could wrap your entire Rails app in one big `begin/rescue` block to prevent it from ever breaking. This is considered bad practice. Why?

In fact, this is what we do with GArnet. It means every error is handled the exact same way. With more complicated apps, you want this to be the case: you'll want different errors to be handled in different ways.

For now, just showing an error message is sufficient, but in most cases it isn't. For instance, imagine you're creating a secure app where attempting to log in with an incorrect password three times "locks" the user out of the app. The best way to do that would be to define a special error type for that particular situation and handle it explicitly.


### For the rest of class: Continue to work on Scribble, adding in validations for common user errors and handling them so they don't "break" your app.

# Quiz questions

- What's the difference between `.create` and `.create!`?
- You see `ROLLBACK` in your Rails server log. What does that mean?
- What does it mean to let something "fail silently", and why is it considered bad?
- What's the difference between `begin` and `rescue`?
- What does an `else` statement in a `begin/rescue` do?
