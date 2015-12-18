# Validations

## Learning Objectives

- Explain what ActiveRecord validations are, why they are important, and where they are used.
- Use common validations.
- Explain how to access the ActiveRecord errors object and why it is useful.


## What are Validations? (5 min)

Put simply, validations are rules.  In software development, they are constraints on a system that ensure data integrity.

Databases provide their own constraints.  For instance, a **foreign_key constraint** between Artists and Songs ensures that any `artist_id` we assign to a Song actually exists in the Artists table.  If not, it will raise an error and not allow that Song to be created.

In MVC, business rules go in the Model.  ActiveRecord (AR) provides helpers to ensure that only valid data is stored in your database.  With them, you can ensure that specific information is present.  Or unique.  You can verify that email addresses, phone numbers, and social security numbers are properly formatted.  You can validate numbers and dates, protecting age fields and birthdates to ensure users are not 1000 years old.

### Research: Section 1.1 (5 min)

Rails has a great reference for Validations in their [guide](http://guides.rubyonrails.org/active_record_validations.html).  Let's read Section 1.1.

---

Their example:

``` ruby
class Person < ActiveRecord::Base
  validates :name, presence: true
end

Person.create(name: "John Doe").valid? # => true
Person.create(name: nil).valid? # => false
```

This ensures that a Person is not valid unless they have filled in their "name".


I don't want to spend this hour repeating what the Rails Guides say.  Instead, let's spend this hour experiencing Validations.

## Experiencing Validations (20 min)

Let's build upon a previous lesson. "tunr_validations" will start with the solution from "tunr_rails".
- First, we'll discuss validations for a Song.  
- I'll walk through the implementation.
- Then, you will ensure the Artist is validated.

### Setup

- fork and clone [tunr_validations](https://github.com/ga-dc/tunr_validations).
- We'll start from "master": `git checkout master`.
- Normally, I would `rake db:setup` now.  To be safe, lets drop it first.

```
rake db:drop
rake db:setup
```

Curious about `db:setup`?  See "Further reading" below... later.  For now, see the results on your screen.  It created the db, setup your db schema, and seeded.  Moving along...

We are going to be spending most of this lesson in the console.  In a new tab, start `rails console`.

We are going to be working with songs.  Let's ensure we start with a clean slate.
``` ruby
> Song.destroy_all
 => ...
# and to verify....
> Song.count
   (0.6ms)  SELECT COUNT(*) FROM "songs"
 => 0
```

### Play with Songs

Ok.  Now we can play with songs.  Let's start with a new Song...

``` ruby
> song = Song.new
 => #<Song
    id: nil,
    title: nil,
    album: nil,
    preview_url: nil,
    artist_id: nil>
```

> Q. Is this a valid song?
---

Ask `song`.

``` ruby
> song.valid?
 => true
```

We just instantiated a new song, without any information -- no title, no album, no preview_url, no artist -- and it is considered valid.

We can even save it.
``` ruby
> song.save
   (0.2ms)  BEGIN
  SQL (30.0ms)  INSERT INTO "songs" DEFAULT VALUES RETURNING "id"
   (125.0ms)  COMMIT
 => true

> song.new_record?
  => false
```

It saved. :(

> What should be required?
---

Every song should have a title, right?

``` ruby
class Song < ActiveRecord::Base
  belongs_to :artist
  validates :title, presence: true
end
```

How does our Song behave now?

Don't forget to **reload!** to use our changes.  This resets the console, so our `song` variable is gone.  We need to re-initialize it.
``` ruby
> reload!
Reloading...
 => true

> song = Song.new
  => #<Song id: nil, title: nil, album: nil, preview_url: nil, artist_id: nil>
```

> Q. Is it valid?
---

``` ruby
> song.valid?
 => false
```

Nope.

Why, specifically, is it not valid?  Again, we can ask `song`.
``` ruby
> song.errors.messages
 => {:title=>["can't be blank"]}
```

And if we try to save it?

``` ruby
> song.save
    (0.2ms)  BEGIN
    (0.2ms)  ROLLBACK
  => false
```

> Q. Why wasn't our song saved?
---

Because it is NOT valid.


### You do: Ensure each song has a preview_url. (10 min)

Let's assume the song's preview_url is important to our application's value.  A Song should not be valid unless it has a preview_url.  Also, let's do some basic format checking to ensure it starts with "http".  

This regular expression checks that a string starts with "http":
```
/\Ahttp/
```
We'll need a [validation helper](http://guides.rubyonrails.org/active_record_validations.html#validation-helpers) that matches against this regular expression.  Don't miss the [Common Validation Options](http://guides.rubyonrails.org/active_record_validations.html#common-validation-options).

Don't forget to **reload!** to incorporate your changes.

**Bonus:**
- Verify the length.  What is the shortest possible url?  The longest?
- Use a more strict regular expression.
- Check out what validators exist with `song.validators` & `song.validators_on`.

---

Possible solution:
``` ruby
class Song < ActiveRecord::Base
  belongs_to :artist
  validates :title, presence: true
  validates :preview_url, format:
    { with: /\Ahttp/,
      message: "must start with 'http'" }
end
```

### Duplication

You *may* see overlap.  We can use both the SQL constraint and the AR validation.

``` sql
 create_table "songs", force: :cascade do |t|
    t.string  "title", null: false
    ...
```
``` ruby
class Song < ActiveRecord::Base
  ...
  validates :title, presence: true
end
```

> Q. Why would we do this?
---

Messaging, safety, and speed.  We want helpful, accurate messages at the highest level (closest to the developer and users) [messaging, speed].  For security, we need constraints at the lowest level (closest to the database) [safety, speed].  You may even add client-side validations, in javascript, to avoid the call back to the server [messaging, speed].

> "I would highly recommend doing it in both places. Doing it in the model saves you a database query (possibly across the network) that will essentially error out, and doing it in the database guarantees data consistency." --[aseem](http://programming.nullanswer.com/question/25109141)

### Recap
Without validations there are no constraints on our model.  Almost all models need some basic constraints.  Rails provides a validation framework that supports declaring, verifying, and reporting problems.

## Errors (15 min)

> Q. Speaking of reporting... why does AR provide song.errors?
---

We used it for debugging support.  It's nice for that.  However, it was designed to provide a common framework for providing feedback to the user.  This is why, when we have a problem saving or updating a model,  we `render` the page.

``` ruby
# songs_controller.rb
def create
  @artist = Artist.find(params[:artist_id])
  @song = @artist.songs.build(song_params)
  if @song.save
    redirect_to artist_song_path(@artist, @song)
  else
    render :new
  end
end
```

What happens now?  Opening the browser, let's create a Song without a title.  Browsing to `http://localhost:3000/songs`, we see an error.

```
undefined method `name' for nil:NilClass
```

I see `song.artist.name`.  Apparently, `song.artist`, is returning `nil`.  One of our songs does not have an Artist.  We have bad data.  Make a note to add a validation to ensure a Song has an "artist". :)

I'm focusing on create right now.  Let's go straight there.  Navigating to "Norah Jones", I see her 'id' is 3.  Now, I can visit "http://localhost:3000/artists/3/songs/new".  


I want to attempt to create a song without any informaiton, so I leave it all blank and press "Create Song".  It brings us back to "new", but ew don't know why.  If we check our log we'll see:

``` ruby
Started POST "/artists/3/songs" for ::1 at 2015-08-06 12:15:50 -0400
Processing by SongsController#create as HTML
  Parameters: {"utf8"=>"✓", "authenticity_token"=>"lN3Sl1/Ne9MGtGbUhxA7gQWmRFTVge9NbbQnvzP5Ov3MRiMGNSqZWxOVngQwX4f8TxXKKsIKtO9Ectb/o/Artw==", "song"=>{"title"=>"", "album"=>"", "preview_url"=>""}, "commit"=>"Create Song", "artist_id"=>"3"}
  Artist Load (0.2ms)  SELECT  "artists".* FROM "artists" WHERE "artists"."id" = $1 LIMIT 1  [["id", 3]]
   (0.2ms)  BEGIN
   (0.2ms)  ROLLBACK
  Rendered songs/_form.html.erb (3.9ms)
  Rendered songs/new.html.erb within layouts/application (5.7ms)
Completed 200 OK in 55ms (Views: 32.8ms | ActiveRecord: 5.8ms)
```

``` ruby
# songs_controller
def create
  @artist = Artist.find(params[:artist_id])
  @song = @artist.songs.build(song_params)
  if @song.save
    redirect_to artist_song_path(@artist, @song)
  else
    render :new
  end
end
```

We see evidence that our save did not work.  
- We start the POST.  
- We make it into the controller.  
- We retrieve the Artist.  
- When should see an `INSERT` into our database, we see a `ROLLBACK`.
- Then, we see it is rendering "songs/new.html.erb", instead of redirecting.

**WE** know it, but our users don't.

As we saw, after the save fails, the @song object has all the errors itemized in @song.errors. Errors might occur when we are adding a new Song or updating an existing song.  We want to improve both those views so that, if errors exist, we loop through the errors and display them to our user.  Fortunately, a single partial is shared by both, "songs/_form.html.erb".

``` html
<!-- app/views/songs/_form.html.erb -->
<% if @song.errors.any? %>
  <div id="error_explanation">
    <h2><%= pluralize(@song.errors.count, "error") %> prohibited this song from being saved:</h2>

    <ul>
    <% @song.errors.full_messages.each do |msg| %>
      <li><%= msg %></li>
    <% end %>
    </ul>
  </div>
<% end %>
```

Now, if we try to create a new, invalid Song.  We see why.  

```
2 errors prohibited this song from being saved:

Title can't be blank
Preview url must start with 'http'
```


Furthermore, if you use the Rails form helpers to generate your forms, it will generate an extra <div> around the entry. allowing us to use css to highlight the affected fields.

``` css
.field_with_errors {
  padding: 2px;
  background-color: red;
  display: table;
}
```

See how much that helps?


### You do: display errors on Artist#new (10 min)

Provide feedback to the User for Artist creation and updates.

Questions?  Check the [validation docs](http://guides.rubyonrails.org/active_record_validations.html#displaying-validation-errors-in-views) first.  They're awesome!

**Bonus:** Use [simple_form](https://github.com/plataformatec/simple_form). It displays errors in-line.


## Conclusion

We discussed the need for constraints.  We need to validate that our Objects adhere to our business rules.  AR provides validation helpers to support this.  We identified that they belong in our Model, where business logic lives.  Then, we familiarized ourselves with the provided validators and used a few.  Finally, we used the built-in errors framework to provide feedback to our user.


## Further reading:

- Ensure you familiarize yourself with the [provided validation helpers](http://guides.rubyonrails.org/active_record_validations.html#validation-helpers).
- Since rails isn't meant to cover every scenario, you will probably be tasked with creating your own [custom validations](http://guides.rubyonrails.org/active_record_validations.html#performing-custom-validations)
- It's important to know which methods utilize validations and which bypass them: [Skipping validations](http://guides.rubyonrails.org/active_record_validations.html#skipping-validations)
- We can even indicate when validations should run via [callbacks](http://guides.rubyonrails.org/active_record_validations.html#when-does-validation-happen-questionmark).
- [Rails and rake](http://guides.rubyonrails.org/command_line.html#rake).
  - tl;dr
```
rake -D db:setup
# Also
rake -T db
```

## Questions

1. Which component, of Rails MVC, is responsible for the business logic?
2. Assume the user's age is an optional field.  Write the validation to verify that a User's age is between 13 and 125 (inclusive).
3. What would `user.errors.messages` return (for the above User), if you assigned `user.age = 12`?
4. Assume you visit "/customers/new" and enter some invalid information.  Given this controller code, what url would your browser be on after pressing "Create Customer"?

  ``` ruby
  class CustomersController < ApplicationController
    def new
      @customer = Customer.new
    end

    def create
      @customer = Customer.new(customer_params)
      if @customer.save
        redirect_to customer_path(@customer)
      else
        render :new
      end
    end
    ...
    private
    def customer_params
      params.require(:customer).permit(:first_name, :last_name, :age)
    end
  end
  ```

5. Give one reason why we might have the similar validations in the browser, model, and database layer of our application.
