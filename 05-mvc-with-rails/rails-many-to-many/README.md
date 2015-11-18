# Many-to-Many Relationships (using has_many :through) in Rails

## Learning Objectives

* Differentiate between a one-to-many and a many-to-many relationship
* Describe the role of a join table in a many-to-many relationship
* Create a Model to represent a join table
* Use `has_many through` to connect two models via a join model in Rails
* Use a many-to-many relationship to implement a feature in a Rails app

### Screencast of this lesson

[Screencast on Youtube](https://www.youtube.com/watch?v=JxW8lJzLhxI)
[Andy 1](https://youtu.be/PXNrk6m4WRg)
[Andy 2](https://youtu.be/Gr3GV8dUkDE)

### References

* [Rails Guides - Has Many Through](http://guides.rubyonrails.org/association_basics.html#the-has-many-through-association)
* [Tunr Favorites Starter](https://github.com/ga-dc/tunr_rails_many_to_many/tree/favorites-starter)
* [Tunr Favorites Solution](https://github.com/ga-dc/tunr_rails_many_to_many/tree/favorites-solution)

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
it's joining. e.g., for Favorites, we should have a `song_id` column and
a `user_id` column.

We can add additional columns as needed to store additional information about
the relationship. For example, we may choose to add an `order` column which
stores an integer representing what order that song appears on the playlist.
(e.g. a song may be first on one playlist, but 10th on another... that info
would be stored on the join table.)

## Join Models & Tables

In rails, we should always create a model to represent our join table. The name
can technically be anything we want, but really the model name should be as
descriptive as possible, and indicate that it represents an *association*.

### YOU DO: Naming Join Tables (10 minutes / 0:30)

In pairs, spend **5 minutes** answering the following questions for the below list of models...  
  1. What would a many-to-many relationship look like between these two models?
  2. What would be a descriptive name for their resulting join table?
  3. What would be a useful additional column to include in the join table (e.g., `num_guests`)?

Models  
  1. Authors and Books
  2. Students and Courses  
  3. Doctors and Patients  
  4. Posts and Categories  
  5. Songs and Playlists  

### Generating the Model / Migration (10 minutes / 0:40)

> We will be using Attendances as the in-class example. I encourage you NOT to code along -- just watch. You will have the chance to implement this during in-class exercises with Tunr.  

Attendances represent the many-to-many relationship between Users and Events. Let's quickly set up those two models...

```bash
$ rails g model User username:string age:integer
$ rails g model Event title:string location:string
```

We generate the model just like any other. If we specify the attributes (i.e.,
columns on the command line) Rails will automatically generate the correct
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

### YOU DO: Create the Favorite Model in Tunr (20 minutes / 1:00)

[Here's some starter code](https://github.com/ga-dc/tunr_rails_many_to_many/tree/favorites-starter). Make sure to work off the `favorites-starter` branch.

Take **15 minutes** to create a model / migration for the `Favorite` model. It should have `song_id`
and `user_id` columns.

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

### YOU DO: Update our Models (10 minutes / 1:30)

Take **5 minutes** to update the Song, User and Favorite models to ensure we have the
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

So we've been able to generate associations between our models via Pry. But what about our end users? How would somebody go about creating/removing a favorite on Tunr?
* We need to add that functionality by modifying our controller, view and routes.

Let's take a look at `songs_controller.rb`...
* What do we currently have in here?
* Can we use any of these actions to handle adding/removing songs? Or do we need to add something new?

```rb
class SongsController < ApplicationController
  # index
  def index
    @songs = Song.all
  end

  # new
  def new
    @artist = Artist.find(params[:artist_id])
    @song = Song.new
  end

  # create
  def create
    @artist = Artist.find(params[:artist_id])
    @song = Song.create!(song_params.merge(artist: @artist))
    redirect_to artist_song_path(@artist, @song)
  end

  #show
  def show
    @song = Song.find(params[:id])
  end

  # edit
  def edit
    @song = Song.find(params[:id])
  end

  # update
  def update
    @song = Song.find(params[:id])
    @artist = Artist.find(params[:artist_id])
    @song.update(song_params.merge(artist: @artist))
    redirect_to artist_song_path(@song.artist, @song)
  end

  # destroy
  def destroy
    @song = Song.find(params[:id])
    @song.destroy
    redirect_to songs_path
  end

  private
  def song_params
    params.require(:song).permit(:title, :album, :preview_url, :artist_id)
  end
end
```

We have CRUD functionality for the songs themselves, but that's about it.
* We need to add some actions to our controller that handle this additional functionality. You'll do that for Tunr in the next exercise.
* These will not correspond to RESTful routes.

There's more to this than just updating the Songs controller, but we've done some of the work for you...

```rb
# config/routes.rb

Rails.application.routes.draw do
  devise_for :users
  root to: 'artists#index'
  get '/songs', to: 'songs#index'
  resources :artists do
    resources :songs
    resources :genres
  end

  resources :songs do
    member do
      post 'add_favorite'
      delete 'remove_favorite'
    end
  end
end
```

```rb
# app/views/artists/show.html.erb

<h2><%= @artist.name %> <a href="/artists/<%= @artist.id %>/edit">(edit)</a></h2>
<h4><%= @artist.nationality %></h4>

<img class='artist-photo' src="<%= @artist.photo_url %>">

<h3>Songs <%= link_to "(+)", new_artist_song_path(@artist) %></h3>
<ul>
  <% @artist.songs.each do |song| %>
    <li>
      <%= link_to "#{song.title} (#{song.album})", artist_song_path(@artist, song) %>
      <% if song.favorites.length > 0 %>
        <%= link_to "&hearts;".html_safe, remove_favorite_song_path(song), method: :delete, class: "fav" %>
      <% else %>
        <%= link_to "&hearts;".html_safe, add_favorite_song_path(song), method: :post, class: "no-fav" %>
      <% end %>
    </li>
  <% end %>
</ul>
```


### YOU DO: Update Songs Controller (20 minutes / 2:25)

Take **15 minutes** to update the `add_favorite` and `remove_favorite` actions in the playlists controller to
add and remove songs from the playlist. Look at the `artists/show.html.erb`
view to see how we route to these actions.

Below are some line-by-line instructions on how to implement `add_favorite` and `remove_favorite`. I encourage you not to look unless you are stuck!  

`add_favorite` should...  
  1. Save the song which you will be favoriting in an instance variable.  
  2. Create a new Favorite instance that...  
    a. Belongs to the song.  
    b. Belongs to the user who is creating the favorite.  
  3. Redirect to the show page for the artist once the song is added.

`remove_favorite` should...  
  1. Save the song you will be un-favoriting in an instance variable.  
  2. Delete the Favorite instance that references the song that is being un-favorited.  
  3. Redirect to the show page for the artist once the song is added.  

If you'd like to take a peek now, [here's the Tunr Favorite solution](https://github.com/ga-dc/tunr_rails_many_to_many/tree/favorites-solution).


## Closing Q&A

## Bonus Homework: [Scribble Categories and Tags](https://github.com/ga-dc/scribble/blob/master/readme.md#many-to-many-bonus)

Example: [Deployed Scribble](https://wdi-scribble.herokuapp.com/)
