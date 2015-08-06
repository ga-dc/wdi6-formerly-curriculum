# Validations

## Learning Objectives

- Explain what ActiveRecord validations are, why they are important, and where they are used.
- Use common validations.
- Explain how to access the ActiveRecord errors object and why it is useful.


## What are Validations? (5 min)

Validations are constraints on a system that ensure data integrity.

Databases provide their own constraints.  For instance, a **foreign_key constraint** between Artists and Songs ensures that any `artist_id` we assign to a Song actually exists in the Artists table.  If not, it will raise an error and not allow that Song to be created.

In MVC, business rules go in the Model.  ActiveRecord (AR) provides helpers to ensure that only valid data is stored in your database.  With them, you can ensure that specific information is present.  Or unique.  You can verify that email addresses, phone numbers, and social security numbers are properly formatted.  You can validate numbers and dates, protecting age fields and birthdates to ensure users are not 1000 years old.


### Research: Section 1.1 (5 min)

Rails has a great reference for Validations in their [guide](http://guides.rubyonrails.org/active_record_validations.html).  Let's read Section 1.1.

---

Their example:

```
class Person < ActiveRecord::Base
  validates :name, presence: true
end

Person.create(name: "John Doe").valid? # => true
Person.create(name: nil).valid? # => false
```

This ensures that a Person is not valid unless they have filled in their "name".


I don't want to spend this hour repeating what the Rails Guides say.  Instead, let's spend this hour experiencing Validations.

## Experiencing Validations (20 min)

Let's build upon a previous lesson. "tunr_validations" will start with the solution from "tunr_rails". First, we'll discuss validations for a Song.  I'll walk through the implementation. Then, you will ensure the Artist is validated.

### Setup

- fork and clone [tunr_validations](https://github.com/ga-dc/tunr_validations).
- We'll start from "master": `git checkout master`.
- Normally, I would `rake db:setup` now.  To be safe, lets drop it first.

```
rake db:drop
rake db:setup
```

Curious about `db:setup`?  Ask rake.
```
rake -D db:setup
# Also
rake -T db
```

We are going to be spending most of this lesson in `rails console`.

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
???
```

> What should be required?
---

Every song should have a title, right?

``` ruby
class Song < ActiveRecord::Base
  belongs_to :artist
  validates :title, presence: true
end
```

Can we save it now?

Don't forget to **reload!** to use our changes.
``` ruby
> reload!
???
```

> Q. Is `song` valid?
---

``` ruby
> song.valid?
 => false
```
Nope.  

What caused the issue?  Again, ask `song`.
``` ruby
> song.errors.messages
 => {:password=>["can't be blank"]}
```

And if we try to save it?

``` ruby
???
```

### You do: Ensure each song has a preview_url. (10 min)

Let's assume the song's preview_url is important to our application's value.  A Song should not be valid unless it has a preview_url.  Also, let's do some basic format checking to ensure it starts with "http".  

This regular expression checks that a string starts with "http":
```
/\Ahttp/
```
We'll need a [validation helper](http://guides.rubyonrails.org/active_record_validations.html#validation-helpers) that matches against this regular expression.  Don't miss the [Common Validation Options](http://guides.rubyonrails.org/active_record_validations.html#common-validation-options).

Don't forget to **reload!** to incorporate your changes.

Bonus:
- Verify the length.  What is the shortest possible url?  The longest?
- Use a more strict regular expression.
- Check out what validators exist with `song.validators` & `song.validators_on`.

---

``` ruby
class Song < ActiveRecord::Base
  belongs_to :artist
  validates :title, presence: true
  validates :preview_url, format:
    { with: /\Ahttp/,
      message: "must start with 'http'" }
end
```

### Recap
Without validations there are no constraints on our model.  Almost all models need some basic constraints.  Rails provides a validation framework that supports declaring, verifying, and reporting issues (??? better word).

## Errors (10 min)

> Q. Speaking of reporting... why does AR provide song.errors?
---

We used it for debugging support.  It's nice for that.  However, it was designed to provide a common framework for providing feedback to the user.  This is why, when we have a problem saving or updating a model,  we `render` the page.

``` ruby
# songs_controller
???
```

What happens now?  Opening the browser, let's create a Song without a title, it brings us back to "new", but ew don't know why.  If we check our log we'll see:

```
???
```

After the save fails, the @song object now has all the errors itemized in @song.errors. Errors might occur when we are adding a new Song or updating an existing song.  We want to improve both those views so that, if errors exist, we loop through the errors and display them to our user.  Fortunately, a single partial is shared by both, "songs/_form.html.erb".

``` html
# app/views/songs/_form.html.erb
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

Now, if we try to create a new, invalid Song.  We see why.  Furthermore, if you use the Rails form helpers to generate your forms, it will generate an extra <div> around the entry. allowing us to use css to highlight the affected fields.

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

Questions?  Check the [docs](http://guides.rubyonrails.org/active_record_validations.html#displaying-validation-errors-in-views) first.

Bonus: use simple_form

## Conclusion

We discussed the need for constraints.  We need to validate that our Objects adhere to our business rules.  AR provides validation helpers to support this.  We identified that they belong in our Model, where business logic lives.  Then, we familiarized ourselves with the provided validators and used a few.  Finally, we used the built in errors to provide feedback to our user.

## Further reading:

- Ensure you familiarize yourself with the [available validation helpers](???).
- Since rails isn't meant to cover every scenario, you will probably be tasked with creating your own [custom validations](???)
- It's important to know which methods utilize validations and which bypass them: [???](???)
- We can even indicate when validations should run via [callbacks](???).
