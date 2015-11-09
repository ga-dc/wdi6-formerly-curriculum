# Error Handling

## Learning Objectives

- Explain the benefits of explicitly handling errors
- Produce and handle an error in Ruby using the keywords `begin`, `rescue`, `raise`, and `ensure`
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

Wouldn't it be nice if, before an Artist record was saved, we could validate that the data entered into its fields were correct?

## You do

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

#### Play around with this validation. What does `errors.add` do?

# Error Handling

## Framing

The discussion on validations has so far shown you about 18 different ways a user can "break" your app. It's useful for *us* when the app breaks because we can see where all the errors are... but we don't want our users to know!

If only there was something that could *rescue* our app whenever it's about to break!

## Begin and Rescue

Let's intentionally break something the app. Go to the Artists controller, and add `"batman" - 42` to the `index` action:

```rb
class ArtistsController < ApplicationController

  def index
    "batman" - 42
    @artists = Artist.all
  end
```

Go to `localhost:3000/artists` and you should get an "undefined method" error.

Now put it inside a `begin/rescue` block:

```rb
class ArtistsController < ApplicationController

  def index
    begin
      "batman" - 42
    rescue
    end
    @artists = Artist.all
  end
```

What happens when you refresh the page? It loads!

The `begin` tells Ruby, "Start listening for errors." The `rescue` tells Ruby to "rescue" the app from breaking when any errors come up.

**Every `begin` must have a `rescue`, and vice-versa. It must also have an `end`.**

### Error messages

That's all very well, but it's not very useful.

#### Why is this error-suppresser not very useful?

If someone's interacting with your app and does something wrong, they want to know what they did wrong. Silent errors are just as bad as app-breaking errors!

Let's make an error message that actually shows up somewhere:

```rb
class ArtistsController < ApplicationController

  def index
    begin
      "batman" - 42
    rescue
      @error = "You done broke it."
    end
    @artists = Artist.all
  end
```

We can make errors show up in the application layout:

```erb
<body>
  <h1>Tun.r</h1>
  <p><%= @error %></p>
```

That at least tells us something went wrong, but doesn't tell us *what*.

### StandardError

We can tell Ruby to listen for a specific error type, and then when an error of that type happens, to save the information about the error to a variable:

```rb
class ArtistsController < ApplicationController

  def index
    begin
      "batman" - 42
    rescue StandardError => sad_panda
      @error = sad_panda.message
    end
    @artists = Artist.all
  end
```

Ruby has many different types of errors, and each one has a class. You can even make your own! However, `StandardError` is the class from which almost all of them inherit, so that's what we're using here.

We're saving the `StandardError` into a variable called `sad_panda` with the hashrocket `=>` notation. This variable can be called anything.

### Adding in validations

Lets make an actually useful error. Change the `index` action back to what it was before:

```rb
  def index
    @artists = Artist.all
  end
```

Let's add a `begin/rescue` to the `create` action:

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

Now, let's add a simple validation to the Artist model:

```rb
class Artist < ActiveRecord::Base
  has_many :songs
  validates :name, presence: true
end
```

...and to trigger it, submit the form with nothing in the `name` field.

You should get an `undefined method 'id'` error. The `rescue` hasn't prevented the controller from still trying to redirect us to "/artists/#{@artist.id}". The artist wasn't created, so it doesn't have an ID -- so the app's still breaking!

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
      raise "conway's game of life"
    rescue StandardError => sad_panda
      redirect_to "http://google.com/search?q=#{sad_panda.message}"
    else
      redirect_to "/artists/#{@artist.id}"
    end
  end
```

Whenever Ruby encounters a `raise`, it stops whatever it's doing and looks to see whether the `raise` occurred inside a `begin/rescue` block. If it did, then it lets the `rescue` handle the error. If it did **not**, then it "breaks" the app with a fatal error.

You can raise an error anywhere you want. It will always work the same way.

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

That's pretty good. But I'm not a huge fan of the "Confirm Form Submission" box that pops up when a page is rendered via POST.

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

#### We've seen two main ways of storing use data so it's available from page to page. What are they?

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


