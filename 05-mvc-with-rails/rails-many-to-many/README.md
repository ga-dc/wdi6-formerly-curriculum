# Many-to-many Relationships (using has_many :through) in Rails

## Learning Objectives

* Differentiate between a one-to-many and a many-to-many relationship
* Describe the role of a join table in a many-to-many relationship
* Create a Model to represent a join table
* Use `has_many through` to connect two models via a join model in Rails
* Use a many-to-many relationship to implement a feature in a Rails app

### Screencast of this lesson

[Screencast on Youtube](https://www.youtube.com/watch?v=JxW8lJzLhxI)

### References

* [Rails Guides - Has Many Through](http://guides.rubyonrails.org/association_basics.html#the-has-many-through-association)
* [Tunr Playlists Starter](https://github.com/ga-dc/tunr_rails/tree/playlists-starter)
* [Tunr Playlists Solution](https://github.com/ga-dc/tunr_rails/tree/playlists-solution)

## Many-to-Many Relationships (10 minutes / 0:10)

Many-to-many relationships are fairly common in apps. Examples might include:

* posts have many categories, categories have many posts
* groups have many photos, photos have many groups
* playlists have many songs, songs can be in many playlists

Unlike 1-to-many relationships, we can't just add a foreign key to one of the
two tables (the `belongs_to` table) to store these associations. We'd run into a
problem where the column would need to store multiple ids, rather than just the
one id in a one-to-many relationship.

Instead, we must create a new table, a *join table* to store these associations.

## Join Tables (10 minutes / 0:20)

A join table is a separate intermediate table in our DB whose job is to store information
about the relationship between our two models of the many-to-many. For each
many-to-many relationship, we'll need one join table.

> Why are they called "join tables"? On a database level, join tables are created using SQL methods like `INNER JOIN` and `OUTER JOIN`. Learn more about them [here](http://www.sql-join.com/).

At a minimum, each join table should have two foreign_key columns, for the tables
it's joining. e.g. for PlaylistEntries, we should have a `song_id` column and
a `playlist_id` column.

We can add additional columns as needed to store additional information about
the relationship. For example, we may choose to add an `order` column which
stores an integer representing what order that song appears on the playlist.
(e.g. a song may be first on one playlist, but 10th on another... that info
would be stored on the join table.)

## Join Models & Tables

In rails, we should always create a model to represent our join table. The name
can technically be anything we want, but really the model name should be as
descriptive as possible, and indicate that it represents an *association*.

### EXERCISE: Naming Join Tables (10 minutes / 0:30)

In pairs, spend **5 minutes** answering the following questions for the below list of models...  
  1. What would a many-to-many relationship look like between these two models?
  2. What would be a descriptive name for their resulting join table?

Models  
  1. Users and Events  
  2. Students and Courses  
  3. Doctors and Patients  
  4. Posts and Categories  
  5. Songs and Playlists  

### Generating the Model / Migration (10 minutes / 0:40)

> We will be using Attendances as the in-class example. I encourage you not to code along -- just watch. You will have the chance to implement this during in-class exercises with Tunr.  

We generate the model just like any other. If we specify the attributes (i.e.
columns on the command line, Rails will automatically generate the correct
migration for us.


First the model file...  

```rb
# models/attendance.rb

class Attendance < ActiveRecord::Base
  # Associations to come later...
end
```

Now the migration...  

```bash
$ rails g migration create_attendances
```

```rb
# db/migrate/*****_create_attendances.rb

class CreateAttendances < ActiveRecord::Migration
  def change
    create_table :attendances do |t|
      t.integer :num_guests, null: false
      t.references :user, index: true, foreign_key: true
      t.references :event, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
```

> **What is `t.references`?** It does the same thing as writing out `belongs_to :model`.

This will generate an Attendance model, with `user_id`, `event_id` and
`num_guest` columns.

### EXERCISE: Create the PlaylistEntry Model (20 minutes / 1:00)

[Here's some starter code](https://github.com/ga-dc/tunr_rails/tree/playlists-starter). Make sure to work off the `playlists-starter` branch.

Take **15 minutes** to create a model / migration for the `PlaylistEntry` model. It should have `song_id`,
`playlist_id`, and `order` columns.

### BREAK (10 minutes / 1:10)

### Adding the AR Relationships (10 minutes / 1:20)

Once we create our join model, we need to update our other models to indicate
the associations between them.

For example, in our Users/Events example, we should have this:

```ruby
# models/attendance.rb
class Attendance < ActiveRecord::Base
  belongs_to :event
  belongs_to :user
end

# models/event.rb
class Event < ActiveRecord::Base
  has_many :attendances
  has_many :users, through: :attendances
end

# models/user.rb
class User < ActiveRecord::Base
  has_many :attendances
  has_many :events, through: :attendances
end
```

Although an Event has many Users (and vice-versa), Events and Users are not directly linked.
*

### EXERCISE: Update our Models (10 minutes / 1:30)

Take **5 minutes** to update the Song, Playlist, and Playlist Entry models to ensure we have the
correct associations.

### Testing our Association (10 minutes / 1:40)

It's a good idea to use the `rails console` to test creating our associations.

Here's an example of using the association of users / events:

```ruby
bob = User.create({username: "Bob", age: 25})
carly = User.create({username: "Carly", age: 28})

prom = Event.create({title: "Under the Sea: 2015 Prom", location: "Greenville High School"})
after_party = Event.create({title: "Eve's Awesome After-party", location: "Super Secret!" })
brunch = Event.create({title: "BRUNCH!", location: "IHOP" })

# We can create the association directly
bob_going_to_the_prom = Attendance.create(user: bob, event: prom, num_guests: 1)

# Or using helper functionality:
bob.attendances.create(event: after_party, num_guests: 0) # bob's going alone :(

# or the other way
brunch.attendances.create(user: carly, num_guests: 10)
prom.attendances.create(user: carly, num_guests: 1)

# to see who's going to an event:
prom.users
after_party.users
brunch.users


# to see a user's events
bob.events
carly.events

# to delete an association
Attendance.find_by(user: bob, event: prom).destroy # will only destroy the first one that matches

Attendance.where(user: bob, event: prom).destroy_all # will destroy all that match
prom.attendances.where(user: bob).destroy_all
```
### BREAK (10 minutes / 1:50)

### Updating The Controller (15 minutes / 2:05)

So we've been able to generate associations between our models via Pry. But what about our end users? How would somebody go about adding/removing a song to/from a playlist on Tunr?
* We need to add that functionality by modifying our controller, views and `routes.rb`.

Let's take a look at `playlists_controller.rb`...
* What do we currently have in here?
* Can we use any of these actions to handle adding/removing songs? Or do we need to add something new?

```rb
class PlaylistsController < ApplicationController
  def index
    @playlists = Playlist.all
  end

  def show
    @playlist = Playlist.find(params[:id])
  end

  def new
    @playlist = Playlist.new
  end

  def create
    @playlist = Playlist.new(playlist_params)
    if @playlist.save
      redirect_to @playlist
    else
      render :new
    end
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy
    redirect_to playlists_url
  end

  private
  def playlist_params
    params.require(:playlist).permit(:name)
  end
end
```

We have CRUD functionality for the playlists themselves, but that's about it.
* We need to add some actions to our controller that handle this additional functionality. You'll do that for Tunr in the next exercise.
* These will not correspond to RESTful routes.

There's more to this than just updating the Playlist controller, but we've done some of the work for you...

```rb
# config/routes.rb

Rails.application.routes.draw do
  root to: 'artists#index'

  resources :playlists, except: [:edit, :update] do
    member do
      post 'add_song'
      post 'remove_song'
    end
  end

  get '/songs', to: 'songs#index'
  resources :artists do
    resources :songs
    resources :genres
  end
end
```

```rb
# app/views/playlists/show.html.erb

<h2><%= @playlist.name %></h2>

<h3>Songs</h3>
<ul>
  <% @playlist.songs.each do |song| %>
    <li>
      <%= link_to "#{song.title} - #{song.artist.name}" ,artist_song_path(song.artist, song) %>
      <%= link_to "(x)", remove_song_playlist_path(@playlist, song_id: song.id), method: :post %>
    </li>
  <% end %>
</ul>

<fieldset>
  <h3>Add Song</h3>
  <%= form_tag(add_song_playlist_path(@playlist)) do %>
    <%= label_tag "Song" %>
    <%= select_tag(:song_id, options_for_select(Song.all.map{|s| ["#{s.artist.name} - #{s.title}", s.id]})) %>
    <%= submit_tag "Add Song" %>
  <% end %>
</fieldset>
```


### EXERCISE: Update Playlists Controller (20 minutes / 2:25)

Take **15 minutes** to update the `add_song` and `remove_song` actions in the playlists controller to
add and remove songs from the playlist. Look at the `playlists/show.html.erb`
view to see how we route to these actions.

Below are some line-by-line instructions on how to implement `add_song` and `remove_song`. I encourage you not to look unless you are stuck!  

`add_song` should...  
  1. Select the playlist to which you will be adding a song.  
  2. Create a new PlaylistEntry instance that...  
    a. Belongs to the playlist.  
    b. Belongs to the song that is being added to the playlist.  
  3. Redirect to the show page for the playlist once the song is added.

`remove_song` should...  
  1. Select the playlist from which you will be removing a song.  
  2. Delete the playlist's PlaylistEntry that references the song you are removing.  
  3. Redirect to the show page for the playlist once the song is removed.  

If you'd like to take a peek now, [here's the Tunr Playlist solution](https://github.com/ga-dc/tunr_rails/tree/playlists-solution).


## Closing Q&A

## Bonus Homework: Scribble Tags
