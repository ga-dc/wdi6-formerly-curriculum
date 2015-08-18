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

Download [tunr_express](https://github.com/ga-dc/tunr_express).

It's directly ported from the old Sinatra version we used. Please download [tunr_sinatra](https://github.com/ga-dc/tunr_sinatra) too.

I'd like you to take 5 minutes, with your table, to just compare the code in the two apps.

#### What's different?
#### What's the same?

## Migrations

In Rails, to change the database we had to use `rake db:migrate`. With Sequelize, however, you don't need migrations. You can set up your models to "sync" with the database: whenever you run the sync script, Sequelize will look at the model and alter the database to fit the model.

So if you have a User model with an "email" field, the app will make sure the "users" table has an "email" column. Delete the "email" field in the model, and the next time the app starts up it'll remove the "email" column.

You *can still use* migrations instead of "syncing". Migrations with Sequelize are the same as they are in Rails: you generate a migration using `sequelize migrate:create`, it creates a file with a timestamp (a bunch of numbers) at the beginning, you run `sequelize db:migrate`, and it runs any migrations files that haven't been run yet. *No more automatically updating the database.*

#### Why might it be encouraged to use migrations instead of syncing?

Migrations require you to be more *intentional* about changing your database. If you remove a field from a model and then sync without thinking, you'll lose all the data in the field that corresponds to that column.

We're not making production-level apps yet, though, so for now we'll just keep syncing since it's a lot more convenient than running `db:migrate` all the time.
