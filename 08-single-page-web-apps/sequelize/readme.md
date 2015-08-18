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

#### What's different between them?
#### What's the same?

## This class

...is going to be pretty much just exploring this app, paying special attention to how all the database stuff works.

In Rails and Sinatra, we use ActiveRecord to interact with the database. In Node, we use Sequelize.

#### What advantages does this app running in Express have over this app running in Sinatra?

Nothing, really. The difference is just in whether you prefer Javascript or Ruby.

One downside of Express is that it's not as "plug and play" as Sinatra: you're responsible for more things.

One *upside* of Express is that it's not as "plug and play" as Sinatra: you're responsible for more things. Personally, I kinda like that Node requires me to have more control and be more explicit.

But **you** have a *tremendous* advantage in being able to make this app either in Sinatra or in Node.

### Why not MongoDB?

Because Mongo isn't a relational database. It stores data as big blobs of JSON. That's useful if you want to mostly store huge chunks of data -- documents, images, and so on -- but we're much more concerned with small bits of data that we want to be able to relate to each other: Artists and Songs, Posts and Comments, and so on.

Doing that is a sonic pain in Mongo. The general consensus among developers is that Mongo should be avoided.

Sequelize uses **Postgres** -- what we've been using -- which is really nice because it's familiar and we can still poke around in the database using `psql`.

## Setting up the database

#### How do we run a database migration for this Sinatra app?

In this case, you'd run `psql -f db/schema.sql tunr_db`. This could also be a Ruby file -- say, a `migration.rb` file, that uses ActiveRecord.

#### How is the database created in the Node app?

You could actually run `psql -f db/schema.sql tunr_db` the way you would in Sinatra. Sequelize and You run `node db/sync.db`.

## Migrations

In Rails, to change the database we had to use `rake db:migrate`. With Sequelize, however, you don't need migrations. You can set up your models to "sync" with the database: whenever you run the sync script, Sequelize will look at the model and alter the database to fit the model.

So if you have a User model with an "email" field, the app will make sure the "users" table has an "email" column. Delete the "email" field in the model, and the next time the app starts up it'll remove the "email" column.

You *can still use* migrations instead of "syncing". Migrations with Sequelize are the same as they are in Rails: you generate a migration using `sequelize migrate:create`, it creates a file with a timestamp (a bunch of numbers) at the beginning, you run `sequelize db:migrate`, and it runs any migrations files that haven't been run yet. *No more automatically updating the database.*

#### Why might it be encouraged to use migrations instead of syncing?

Migrations require you to be more *intentional* about changing your database. If you remove a field from a model and then sync without thinking, you'll lose all the data in the field that corresponds to that column.

We're not making production-level apps yet, though, so for now we'll just keep syncing since it's a lot more convenient than running `db:migrate` all the time.
