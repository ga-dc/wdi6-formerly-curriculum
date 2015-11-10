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

# Validations

## Framing

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

## You do

[The docs, for reference.](http://guides.rubyonrails.org/active_record_validations.html)

- Add the following code to your Artist model. What does each line do?

```rb
class Artist < ActiveRecord::Base
  validates :name, uniqueness: true
  validates :name, presence: true
  validates :name, length: {in: 1..20}
  validates :nationality, inclusion: ["USA", "Canada", "UK]
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

## Custom validations

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

## Validation in the console

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

## Bangin' methods

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

# Error Handling

## Framing

The discussion on validations has so far shown you about 18 different ways a user can "break" your app. It's useful for *us* when the app breaks because we can see where all the errors are... but we don't want our users to know!

If only there was something that could *rescue* our app whenever it's about to break!

## Begin and Rescue

Let's intentionally break something the app.

Go to the Artist model, and replace it with the following:

```rb
class Artist < ActiveRecord::Base
  has_many :songs
  validates :name, presence: true
end
```

Now go to the Artists controller. Change the `create` action so that it renders the Artists#new view.

```rb
  def create
    @artist = Artist.create!(artist_params)
    render :new
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
    render :new
  end
```

Submit the form again. It should render the Artists#new page no problem.

The `begin` tells Ruby, "Start listening for errors." The `rescue` tells Ruby to "rescue" the app from breaking when any errors come up.

**Every `begin` must have a `rescue`, and vice-versa. It must also have an `end`.**

### Error messages

That's all very well, but it's not very useful.

#### Why is this error-suppresser not very useful?

If someone's interacting with your app and does something wrong, they want to know what they did wrong. Silent errors are just as bad as app-breaking errors!

Let's make an error message that actually shows up somewhere:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
    rescue
      @error = "You done broke it."
    end
    render :new
  end
```

We can make errors show up in the application layout, `views/layouts/application.html.erb`:

```erb
<body>
  <h1>Tun.r</h1>
  <p><%= @error %></p>
```

That at least tells us something went wrong, but doesn't tell us *what*.

### StandardError

We can tell Ruby to listen for a specific error type, and then when an error of that type happens, to save the information about the error to a variable:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
    rescue StandardError => sad_panda
      @error = sad_panda.message
    end
    render :new
  end
```

Ruby has many different types of errors, and each one has a class. You can even make your own! However, `StandardError` is the class from which almost all of them inherit, so that's what we're using here.

We're saving the `StandardError` into a variable called `sad_panda` with the hashrocket `=>` notation. This variable can be called anything.

### Adding in validations

Let's have the `create` action do what it originally did when the user successfully creates an artist, which is to redirect to that artist's page:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
    rescue StandardError => sad_panda
      @error = sad_panda.message
    end
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
      redirect_to "http://google.com/search?q=#{sad_panda.message}"
    else
      redirect_to "/artists/#{@artist.id}"
    end
  end
```

### Raising your own errors

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

# Flash

## Framing

...but we don't *want* to redirect the user to Google. We just want to show the error message. So let's do that the way we did before:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
    rescue StandardError => sad_panda
      @error = sad_panda.message
    else
      redirect_to "/artists/#{@artist.id}"
    end
  end
```

We'll get a "missing template" error if we don't give the controller something to render when it has errors, so let's have it show the `new` view again:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
    rescue StandardError => sad_panda
      @error = sad_panda.message
      render :new
    else
      redirect_to "/artists/#{@artist.id}"
    end
  end
```

That's pretty good. But I'm not a huge fan of the "Confirm Form Submission" box that pops up when you try to refresh a page that was rendered via POST.

Instead, we can have Rails just redirect the user to whichever page they were on before:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
    rescue StandardError => sad_panda
      @error = sad_panda.message
      redirect_to :back
    else
      redirect_to "/artists/#{@artist.id}"
    end
  end
```

...but now we've lost the error message, all over again!

#### Why does the error message no longer show up?

## Quit jerking us around. What's the answer?

#### We've seen two main ways of storing user data so it's available from page to page. What are they?

We could store errors in the database, but that's hugely inefficient. A better idea would be to use **session variables**, about which you learned in your last class.

Rails has a built-in way of doing this, called `flash`.

`flash` is a hash of messages that's created on one request and available through the next, then destroyed.

Replace the `error` instance variable with `flash[:alert]` in your Artist controller:

```rb
  def create
    begin
      @artist = Artist.create!(artist_params)
    rescue StandardError => sad_panda
      flash[:alert] = sad_panda.message
      redirect_to :back
    else
      redirect_to "/artists/#{@artist.id}"
    end
  end
```

In the `application/layout`, replace the `@error` line with this:

```rb
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

```rb
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

### For the rest of class: Continue to work on Scribble, adding in validations for common user errors and handling them so they don't "break" your app.

# Quiz questions

- What's the difference between `.create` and `.create!`?
- You see `ROLLBACK` in your Rails server log. What does that mean?
- What does it mean to let something "fail silently", and why is it considered bad?
- What's the difference between `begin` and `rescue`?
- What does an `else` statement in a `begin/rescue` do?
