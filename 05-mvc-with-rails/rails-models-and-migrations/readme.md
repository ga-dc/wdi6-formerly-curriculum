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

> You can see that the output is `development`. ENV["RAILS_ENV"] is a way we get/set our environment and allows for different types of configurations. The other two types of environment are `test` and `production`

## What is Rake?

Rake is known as "Ruby Make". Make is a popular tool that allows developers to put
repetitive command line tasks into a single file and run several tasks at the same time
with a single command.

Rails uses rake to:

- Create the database (`rake db:create`)
- Create / Edit database tables (`rake db:migrate`)
- Drop the database (`rake db:drop`)
- Seed the database (`rake db:seed`)

[Learn more about rake here](https://github.com/ruby/rake#description)

## You do: Models

Create the models for both Artists and Songs

If you’re feeling adventurous, consider adding a third model like Favorites, or Genres.

How do you know it worked?

If we hop into the rails console and type in Artist:

```
$ rails c
Loading development environment (Rails 4.2.4)
2.2.3 :001> Artist
 => Artist(Table doesn't exist)
```

> If we type in any other capitalized word it will throw an error `uninitialized Constant`

## We do: Migrations

>You can think of each migration as being a new 'version' of the database. A schema starts off with nothing in it, and each migration modifies it to add or remove tables, columns, or entries. Active Record knows how to update your schema along this timeline, bringing it from whatever point it is in the history to the latest version. Active Record will also update your db/schema.rb file to match the up-to-date structure of your database.

http://edgeguides.rubyonrails.org/active_record_migrations.html

In the terminal:

    $ rails g migration create_artists

`rails g` is short for `rails generate`.

This creates a migration file `db/migrate/20150726145027_create_artists.rb`

>The numbers at the beginning of a migration file are a timestamp. Rails uses this timestamp to determine which migration should be run and in what order, so if you're copying a migration from another application or generate a file yourself, be aware of its position in the order. [source](http://edgeguides.rubyonrails.org/active_record_migrations.html#creating-a-standalone-migration)

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

When you run `rake db:migrate` I file called `db/schema.rb` gets generated. What are it's contents?

> You should NEVER have to update the `schema.rb`. Running `rake db:migrate` will update the schema for you as per your migrations.

## You do: view db/schema.rb

The above command created this file. Take a minute to read through it.

## You do: Use Rails console

- to create at least two artists.
- save the commands you run in your text editor so you can leverage it later.

```
$ rails console
```

`rails c` is short for `rails console`

## You do: Create the migration for Songs

## I do: passing arguments into `rails g migration`

```
$ rails g migration create_songs title:string album:string preview_url:string artist:references
```

> There are lots of little short cuts that `g` or `generate` can give you. <a href="http://edgeguides.rubyonrails.org/active_record_migrations.html#model-generators">Model Generators</a> is just one example.

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

- to create at least three songs that are associated with the previous two artists.
- save the commands you run in your text editor so you can leverage it later.

## Break

## We do: Seeds
Seeds? Why do we need to create dummy data for our application. In order to test out the interfaces and functionalities we build out, we need some content/data to manipulate in order to see how it looks and feels on our application.

Let's update our seeds (`db/seeds.rb`) file now.

Remember those commands we had you write down during the rails console exercises?

Instead of the console, leverage the code from those exercises to create 3 artists that have 3 songs each.

Make sure to include the following two lines of code at the top of your `db/seeds.rb`:

```rb
Artist.destroy_all
Song.destroy_all
```

To run this seeds file all we need to do is run `$ rake db:seed` in the terminal.

After running the seeds, go into the `rails console` and play with the objects you created.

## We do: How to deal with mistakes

I forgot to tell you all about timestamps. Rails can automatically timestamp when objects are created and updated. Let’s create a new migration to add timestamp columns to the artists table.

    $ rails g migration add_timestamps_to_artists

In that migration place the following content:

```rb
# 20150726150946_add_timestamps_to_artists.rb
class AddTimestampsToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :created_at, :datetime
    add_column :artists, :updated_at, :datetime
  end
end
```

> add_column is one of many custom methods that can be used in the `change` method in migrations. It takes 3 arguments. The first argument is the table you want to add the column to.  The second argument is what column you'd like to add to that table(1st argument). The third argument is the datatype for the column.

## You do: add timestamps to Songs table

## I do: Undoing things (possibly dangerous)

## The Wrong Way(but sometimes the way I do it...)

> I do it often, but only in development and if I haven't yet shared code with other developers.

Lets assume you have this migration:

```ruby
class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :name
      t.string :poto_url
      t.string :nationality
    end
  end
end
```

Oh man! I really messed my migration up by misspelling photo but I've already run my migrations. If I fix it directly here in this migration file and run `rake db:migrate`, I can look at my `db/schema.rb` file and see that nothings changed, it still says `poto_url`. It didn't take.

We can reset the entire database in the terminal:

```bash
$ rake db:drop
$ rake db:create
$ rake db:migrate
```

If we run these commands, we're dropping our entire database and creating a brand new one. Why is this potentially super dangerous?

Another (wrong) way we can do this is by using `rake db:rollback`.

To undo a single migration, `rake db:rollback`. This might destroy data - be careful! Whatever columns or tables that were created by that migration will now be gone.

> Something to note. When we run `rake db:migrate` on a new application it will run every migration. When we run `rake db:rollback` it will only undo the migration with the most recent timestamp. Every subsequent rollback will undo the most recent timestamped migration that hasn't been undone yet.

It is considered OK to rollback migrations, edit them, and re-migrate in a development environment, but NOT in a production environment. If you are working on an application with other developers, avoid using `rake db:rollback` after code has been pushed, and create new migrations that can be migrated forward on other machines.


Important Note if you're a developer - Users will be very upset if you destroy their data.

> It's sometimes not obvious what actions you take may or may not destroy user data. But bother `rake db:rollback` and `rake db:drop` have the potential of doing it.

## You do: Create a migration and roll it back

## I do: The Right Way

Let's assume we did mess up our initial migration like the code above with the misspelled `poto_url`. Instead of the methods listed above, the right way is to create an additional migration that changes the name of the column in our table.

In the terminal:

```bash
$ rails g migration change_column_in_artists
```

This will generate a new migration. Lets fill its contents now in `db/migrate/20151105201357_change_column_in_artists.rb`:

```ruby
class ChangeColumnInArtists < ActiveRecord::Migration
  def change
    rename_column :artists, :poto_url, :photo_url
  end
end
```

> rename_column is another method we can use inside the `change` method of migrations. It takes 3 arguments as well. First argument is the table you'd like to rename a column on. The second argument is which column you'd like to change. The third argument is what you'd like to change the column name to.

Now if we run our migrations, we can see that the artists table in `db/schema.rb` has the proper `:photo_url` column. Although it's a bit more leg work, we're not having to destroy any databases or undo any migrations which can potentially be really dangerous.

## Resources

- list of rails commands - https://gist.github.com/jshawl/ce1de309ef993ec808d9

## Sample quiz questions

- Why are migrations timestamped, and how does this affect our development workflow?
- What is the difference between creating a migration to add a column, vs editing an existing migration and `rake db:migrate:reset`ting?
