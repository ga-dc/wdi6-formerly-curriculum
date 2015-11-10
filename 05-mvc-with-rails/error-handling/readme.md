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

Our app works, but it also breaks really easily. It's useful for *us* when the app breaks because we can see where all the errors are... but those big red error pages don't make for a very good user experience.

## Framing

It would be nice if we could find a *nice* way let the user know that their artist was successfully created.  

Q. Based on what we've learned so far, how could you show the user a message that their Artist was successfully created?
---

> A. The easiest way would be to just create an instance variable `@message`.

```rb
  def create
    @artist = Artist.create!(artist_params)
    @message = "#{@artist.name} was created."
    redirect_to "/artists"
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

> A. We could store errors in the database, but that's hugely inefficient. A better idea would be to use **session variables**, about which you learned in your last class.

Rails has a built-in way of storing messages in sessions, called `flash`.

`flash` is a hash that's created on one request, available through the next, then destroyed.

Replace the `error` instance variable with `flash[:alert]` in your Artist controller to see it in action:

```rb
  def create
    @artist = Artist.create!(artist_params)
    flash[:notice] = "#{@artist.name} was successfully saved."
    redirect_to "/artists"
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
> Having one or two flash types makes it really easy to style your Flashes with CSS.

Consider:

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
    redirect_to "/artists", notice: "#{@artist.name} was successfully saved."
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
    redirect_to "/artists"
  end
  ```

...but putting it in the controller is going to lead to some pretty unwieldy controller methods. Besides, we may want there to be several routes that create or update an artist, and we'd need to copy and paste that bit of code for each one. That's hardly DRY!


> A. We could put in database constraints, like `NOT NULL` and `UNIQUE`, by going and playing around in SQL.

...but that's difficult and dangerous.

For one thing, Rails doesn't give us a direct way of writing SQL schema. For another thing, I wouldn't want to write SQL anyway! I'll avoid SQL pretty much every time I possibly can because otherwise it's really easy for me to mess up my database, and because SQL isn't a programming language and so is more difficult for me to understand.

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
2.2.1 :001>
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

## Using a boolean instead of the exception

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
    redirect_to artists_path
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
    redirect_to artists_path, notice: "#{@artist.name} was successfully created."
  else
    render :new, alert: @artist.error.full_messages
  end
end
```

## You do: (10 min) Apply this to the artists#update action.
---

## SimpleForm

Ensure your Gemfile contains:
```
gem 'simple_form'
```

`bundle install`, and restart the server.

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
---

# Error Handling

## Framing

We've put a lot of checks in here, but there are always going to be some errors we don't catch. How can we handle those?

## Exception types

Let's force the app to break by looking up an artist that doesn't exist. Try going to `localhost:3000/artists/8675309`. Across the top you see:

```
ActiveRecord::RecordNotFound
```



# Quiz questions

- What's the difference between `.create` and `.create!`?
- You see `ROLLBACK` in your Rails server log. What does that mean?
- What does it mean to let something "fail silently", and why is it considered bad?
- What's the difference between `begin` and `rescue`?
- What does an `else` statement in a `begin/rescue` do?
