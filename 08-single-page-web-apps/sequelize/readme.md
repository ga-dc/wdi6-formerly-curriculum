# Sequelize

## Learning Objectives

- Explain the purpose of an ORM
- Use sequelize to connect to a DB in JS
- Define a model in sequelize that has getters and setters
- Define the roll of callbacks in Sequelize
- Describe why database are asynchronous (and what asynchronous means)
- Use Sequelize to find models from the DB
- Use Sequelize to perform CRUD on model instances
- Create an API with CRUD functionality using Express and Sequelize
- Map a directory / file structure conducive to DB modeling
- Map Rails / ActiveRecord methods to Express / Sequelize methods

## Let's start at the end

Download [tunr_node_hbs](https://github.com/ga-dc/tunr_node_hbs).

It's directly ported from the old Sinatra version we used. Please download [tunr_sinatra](https://github.com/ga-dc/tunr_sinatra) too.

If I run both of them concurrently, you can see for yourself that they look like exactly the same thing.

### Node:
```bash
createdb tunr_db
node db/sync.js
node db/seeds.js
nodemon app.js
```
### Sinatra:
```bash
createdb tunr_db
psql -f db/schema.sql tunr_db
ruby seeds.rb
ruby app.rb
```

I'd like you to take 5 minutes, with the people at your table, to just compare the code in the two apps. Write down at least 3 responses for each of the two questions...:

##### What's different between them?
##### What's the same?

## Today's class...

...is going to be pretty much just exploring this app, paying special attention to how all the database stuff works.

In Rails and Sinatra, we use ActiveRecord to interact with the database. In Node, we use Sequelize.

##### What advantages does this app running in Express have over this app running in Sinatra?

Nothing, really. The difference is just in whether you prefer Javascript or Ruby.

One downside of Express is that it's not as "plug and play" as Sinatra: you're responsible for more things.

One *upside* of Express is that it's not as "plug and play" as Sinatra: you're responsible for more things. Personally, I kinda like that Node requires me to have more control and be more explicit.

But **you**, dear student, have a *tremendous* advantage in being able to make this app either in Sinatra or in Node.

### Why not MongoDB?

Because Mongo isn't a relational database. It stores data as big blobs of JSON. That's useful if you want to mostly store huge chunks of data -- documents, images, and so on -- but we're much more concerned with small bits of data that we want to be able to relate to each other: Artists and Songs, Posts and Comments, and so on.

Doing that is a sonic pain in Mongo. The general consensus among developers is that Mongo should be avoided.

Sequelize uses **Postgres** -- what we've been using -- which is really nice because it's familiar and we can still poke around in the database using `psql`.

## Setting up the database

##### How do we run a database migration for this Sinatra app?

In this case, you'd run `psql -f db/schema.sql tunr_db`. This could also be a Ruby file -- say, a `migration.rb` file, that uses ActiveRecord.

##### How is the database created in the Node app?

You could actually run `psql -f db/schema.sql tunr_db` here, too, the way you would in Sinatra. Sequelize works with Postgres, just like ActiveRecord.

But Sequelize has a really nice way of migrating the database that ActiveRecord doesn't.

##### What did you use in Rails to change the database?

In Rails, to change the database we had to use `rake db:migrate`. Migrations with Sequelize are the same as they are in Rails: you generate a migration using `sequelize migrate:create`, it creates a file with a timestamp (a bunch of numbers) at the beginning, you run `sequelize db:migrate`, and it runs any migrations files that haven't been run yet.

### So we open the db/migrate.js file to see...

Not much.

There's a sleeker alternative to migrations, called "sync". You can set up your models to "sync" with the database: whenever you run the sync script, Sequelize will look at all of your models and alter their tables to fit the model.

So if you have a User model with an "email" field, the app will make sure the "users" table has an "email" column. Delete the "email" field in the model, and the next time the app starts up it'll remove the "email" column.

### Note:
- The `force: true` tells Sequelize to drop all rows in all existing tables in the database.
- The `process.exit()` tells Node, "OK, stop doing stuff now." Otherwise, Node is going to just keep running and waiting for something to happen until you turn off your server. You can call this *anywhere* in your app.

##### Why might it sometimes be encouraged to use migrations instead of syncing?

Migrations require you to be more *intentional* about changing your database. If you remove a field from a model and then sync without thinking, you'll lose all the data in the field that corresponds to that column.

We're not making production-level apps yet, though, so for now we'll just keep syncing since it's a lot more convenient than running `db:migrate` all the time.

### TLDR, to set up the database...

...run `node db/migrate.js`

## Seeding

##### Wild guess as to how we'll seed the database?

Run `node db/seeds.js` and away you go!

Check `psql` to verify all the data is there.

Better yet, run `nodemon app.js` and go to `localhost:3000`!

### seeds.js

Looking at the top of this file, you can I've `require`d two big JSON files.

I've saved them into a variable called Seeds, but I could call that "Poodle", or give both JSON files their own separate variables. *Doesn't matter.*

Now things get weird.

### Asynchronicity

You see all of those `.then`s? jQuery also has `.then`, and `.done`, and `.fail`, and others.

The rest of this file is a bunch of asynchonous things happening -- that is, a chain of events where we don't want the next event to start until the current event has completed.

The events in this case are CRUD interactions with the database.

ActiveRecord doesn't make you worry about this. If you have:
```js
@artist = Artist.find(2)
@artist.songs.create
```
...the second line won't run until the first has completed.

In Node, if you were to run:
```js
DB.models.Artist.bulkCreate(Seeds.artists);
DB.models.Artist.findAll();
```
...the second line would start running **before** the first line had stopped. That is, Node would try to retrieve all the artists before they'd been created, which wouldn't work.

(This is **annoying**. Ruby wins this round.)

I didn't *have* to use `.then`. I could have used...

### Nested callbacks

That would result in something like:

```js
DB.models.Artist.bulkCreate(data.artists).then(function(){
  DB.models.Artist.findAll().then(function(artists){
    DB.models.Song.bulkCreate(songs).then(function(){
      process.exit();
    })
  });
});
```

This is the innocent-looking entrance to what is called...

### Callback Hell

You wake up one day and find you have 47 nested callbacks, have to hit "tab" 47 times for each new line, and your wife has left you and your house has burned down.

It makes no difference from a performance standpoint. It's *real nice* from a readability standpoint.

### What's actually going on in this file

1. We create a bunch of Artists from seed data.
- From the database, we retrieve all the artists we just created.
- Using the artists we retrieved, we take the Song seed data, loop through it, and figure out the ID of the artist to which each song belongs. Then we create a bunch of Songs from that updated data.
- We tell Node to shut off.

### Note:
- If you're going to have chained `then`s, the function inside each `then` needs to `return` the asynchronous function inside it.
- You can chain object methods and properties across multiple lines to make your code more readable. That is:

This:
```js
Object.doSomething().doSomethingElse();
```
...is the same as:
```js
Object
.doSomething()
.doSomethingElse()
```

## Models

...are pretty similar to ActiveRecord models, only they have different magic words.

Sequelize has [all the data types you would expect](http://docs.sequelizejs.com/en/latest/api/datatypes/). It's kind of annoying to have to write `Sequelize.STRING` instead of just `string`, but such is life.

As you can see from the very useful example in the `Artist` model, you can add custom functions to models in Node just as you did in Rails.

The one really different thing is...

### Where associations go

In ActiveRecord, you'd put `has_many :songs` in your model. In Node, you must define your associations *after all your models have been loaded*.

In this app, I defined my associations in the `connection` file.

## Connecting to the database

At the top of both the migration file and the seeds file a `connection` file is `require`d.

Let's take a look at that file.

### connection.js

The first two lines give us an object representing Sequelize itself, and an object represeting Sequelize's connection to my database.

Next, we load the models.

Then, we define the **associations** for the models. Note that I've arranged it this way so the associations are set up after the models have been loaded.

Again, in Node you have to define your associations after all your models have been loaded. I can't put `Artist.hasMany(Song)` in my Artist model because if 
