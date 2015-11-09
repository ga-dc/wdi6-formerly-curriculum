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

## Many-to-Many Relationships

Many-to-many relationships are fairly common in apps. Examples might include:

* posts have many categories, categories have many posts
* groups have many photos, photos have many groups
* playlists have many songs, songs can be in many playlists

Unlike 1-to-many relationships, we can't just add a foreign key to one of the
two tables (the `belongs_to` table) to store these associations. We'd run into a
problem where the column would need to store multiple ids, rather than just the
one id in a one-to-many relationship.

Instead, we must create a new table, a *join table* to store these associations.

## Join Tables

A join table is a separate table in our DB whose job is to store information
about the relationship between our two models of the many-to-many. For each
many-to-many relationship, we'll need one join table.

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
can technically be anythign we want, but really the model name should be as
descriptive as possible, and indicate that it represents an *association*.

Some examples:
* To join users and events, we might create an `Attendance` model
* To join users and courses, we might create an `Registration` model
* To join photos to groups, we might have a `GroupMembership` model
* To join posts to categories, we might have a `CategoryEntry` or `Categorization` model
* To join songs to playlists, we might have a `PlaylistEntry` model

### Generating the Model / Migration

We generate the model just like any other. If we specify the attributes (i.e.
columns on the command line, Rails will automatically generate the correct
migration for us.

```bash
$ rails g model Attendance user:references event:references num_guests:integer
```

This will generate an Attendance model, with `user_id`, `event_id` and
`num_guest` columns.

### EXERCISE: Create the PlaylistEntry Model

Create a model / migration for the `PlaylistEntry` model. It should have `song_id`,
`playlist_id`, and `order` columns.

### Adding the AR Relationships

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

### EXERCISE: Update our Models

Update the Song, Playlist, and Playlist Entry models to ensure we have the
correct associations.

### Testing our Association

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
prom.attendances.where(user: bob).destry_all
```

### EXERCISE: Update Playlists Controller

Update the `add_song` and `remove_song` actions in the playlists controller to
add and remove songs from the playlist. Look at the `playlists/show.html.erb`
view to see how we route to these actions.
