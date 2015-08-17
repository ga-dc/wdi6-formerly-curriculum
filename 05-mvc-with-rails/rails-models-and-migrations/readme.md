# Rails Models and Migrations

## Learning Objectives

- Create a new rails application with postgres as the default
- Use `rake` to create, edit, and update, and seed the db
- Use rails generators to create migrations.
- Use rails console to inspect and manipulate models
- Use rails migrations to create tables and modify columns
- Undo a migration with `rake db:rollback`
- Create migrations that associate one model with another.
- Identify the impacts of editing existing migrations.
- Use `timestamps` to timestamp crud actions
- Use shorthand syntax to create migrations from the command line.

---

The files we’ll be working with in this lesson are highlighted in blue below:

![](https://dl.dropboxusercontent.com/s/2zho5ekuhxpp5lx/Screenshot%202015-07-26%2010.26.28.png?dl=0)

## We do

Create a new rails application, specifying postgres as the database

    $ rails new tunr -d postgresql

This creates 92 new files in a directory called tunr. (I counted w/ `find . -type f | wc -l`)

We can easily keep track of what files have changed if we use version control:

    $ cd tunr
    $ git init
    $ git add .
    $ git commit -m "initial commit"

The solution for this exercise has already been posted: https://github.com/ga-dc/tunr-rails-models-and-migrations/tree/solution

## tunr/config/database.yml

Specifies the database connection options. By default, rails uses the development options.

To create the database, run `rake db:create`

How do you know it worked?

- `rails c`
- `psql -d tunr_development`
- `rails dbconsole`

Use `rails c` to view the output of

```rb
ENV["RAILS_ENV"]
```

## What is Rake?

Rake is known as "Ruby Make". Make is a popular tool that allows developers to put
repetitive command line tasks into a single file and run several tasks at the same time
with a single command.

Rails uses rake to:

- Create the database
- Create / Edit database tables
- Drop the database
- Seed the database
- [source code](https://github.com/rails/rails/blob/3e36db4406beea32772b1db1e9a16cc1e8aea14c/railties/lib/rails/tasks/engine.rake#L30-L31)

## You do: Models

Create the models for both Artists and Songs

If you’re feeling adventurous, consider adding a third model like Favorites, or Genres.

How do you know it worked?

## We do: Migrations

>You can think of each migration as being a new 'version' of the database. A schema starts off with nothing in it, and each migration modifies it to add or remove tables, columns, or entries. Active Record knows how to update your schema along this timeline, bringing it from whatever point it is in the history to the latest version. Active Record will also update your db/schema.rb file to match the up-to-date structure of your database.

http://edgeguides.rubyonrails.org/active_record_migrations.html

    $ rails g migration create_artists

`rails g` is short for `rails generate`.

This creates a migration file `db/migrate/20150726145027_create_artists.rb`

```rb
class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
    end
  end
end
```

This file defines the structure of a new table called "artists".

```rb
class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :name 
      t.string :photo_url 
      t.string :nationality
    end
  end
end
```

`t` represents the table we're creating, and we can use methods like `string`, `integer`, and other
data types to create columns of that type, passing in the name of the column as a symbol.

You can create the artists table and run this migration with `rake db:migrate`

[Using the Change method](http://edgeguides.rubyonrails.org/active_record_migrations.html#using-the-change-method)

## You do: view db/schema.rb

The above command created this file. Take a minute to read through it. 

## You do: Use Rails console

to create at least two artists.

```
$ rails console
```

`rails c` is short for `rails console`

## You do: Create the migration for Songs

```
$ rails g migration create_songs title:string album:string preview_url:string artist:references
```

The above command creates the following file:

```rb
# db/migrate/20150726150324_create_songs.rb
class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.string :album
      t.string :preview_url
      t.references :artist, index: true, foreign_key: true
    end
  end
end
```

`references` is used when the column represents a foreign key for another table. It appears
wherever `belongs_to` appears in the model definition.

`t.references :artist` is equivilant to `t.integer :artist_id`

## You do: Use rails console

to create at least three songs that are associated with the previous two artists.

## Break

## We do: Seeds

First, let's add in the missing data for seeds:

    $ curl http://www.wdidc.org/seeds/get.sh | sh
    $ rake db:seed

## We do: How to deal with mistakes

I forgot to tell you all about timestamps. Rails can automatically timestamp when 
objects are created and updated. Let’s create a new migration to add timestamp columns
to the artists table.

    $ rails g migration add_timestamps_to_artists

```rb
# 20150726150946_add_timestamps_to_artists.rb
class AddTimestampsToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :created_at, :datetime
    add_column :artists, :updated_at, :datetime
  end
end
```

## You do: add timestamps to Songs table

## We do: Undoing things (possibly dangerous)

To undo a migration, `rake db:rollback`. This might destroy data - be careful!

It is considered OK to rollback migrations, edit them, and re-migrate in a development
environment, but NOT in a production environment. If you are working on an application
with other developers, avoid using `rake db:rollback` after code has been pushed, and
create new migrations that can be migrated forward on other machines.

What is the difference between creating migrations that fix previous mistakes, vs this workflow:

1. make mistake
2. rake db:migrate
3. fix wrong migration file
4. rake db:migrate:reset || rake db:drop:all && rake db:create && rake db:migrate

Users will be very upset if you destroy their data. 

## You do: Create a migration and roll it back

## Resources

- list of rails commands - https://gist.github.com/jshawl/ce1de309ef993ec808d9

## Sample quiz questions

- Why are migrations timestamped, and how does this affect our development workflow?
- What is the difference between creating a migration to add a column, vs editing an existing migration and `rake db:migrate:reset`ting?

