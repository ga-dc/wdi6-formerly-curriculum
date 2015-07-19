# Active Record

## LO's
- Define ORM and why we use it over a database language.
- Explain what Active record is and what problems it solves.
- Explain convention over configuration and how it relates to Active Record
- Explain the basic idea of metaprogramming and how AR leverages this to provide an interface to the DB
- Define a class that inherits from AR
- Utilize AR to perform the following CRUD actions on a database
  - create
  - new
  - save
  - all
  - find, find_by
  - where
  - update
  - destroy
- Differentiate between class versus instant methods
- Utilize `has_many`, `belongs_to` to establish associations/relationships with AR
- Seed a database using AR


## Opening Framing (15m)
We now have a way to persist data in a database. We've also learned about OOP in Ruby how we can represent things in real life programmatically as objects. Which is AWESOME! But really databases just seems like data in this kind of cryptic place on our local computer.  We have to make super long SQL statements to do CRUD. It'd be really nice if we had some kind of way to interface between the database and our servers/applications in order to streamline this process. Enter ORM's.

Information Dive(5m)
For the next 5 minutes, research what ORM's are.

T&T (5m)
Now, turn & talk to your neighbor and discuss:
- at a high level, what ORM's are how they might be useful
- whats the importance of interfacing the server with the database

## ORM's & Active Record (15m)
- *Official* wikipedia definition. A programming technique for converting data between incompatible type systems in object-oriented programming languages.
> Thats sounds like a lot of 5 dollar words, but what does it really mean?

We need a way to encapsulate our databases into objects that we can talk to on our server. ORM's serve that purpose. That table we created in SQL? Well, its an object on our server now. That's what ORM's do.

More concretely they:
- They 'map' (translate) objects to rows in our DB (and vice versa)
- 1 table per Model/Class/Entity
  - table name is model name pluralized
  - each column is an attribute for that model
- Handles associations using foreign keys

It just so happens you guys will be learning one of the best ORM's on the market. It has some of the best documentation and best syntax(because ruby is awesome) the industry has to offer. This ORM is Active Record.

> Active Record is the M in MVC - the model - which is the layer of the system responsible for representing business data and logic. Active Record facilitates the creation and use of business objects whose data requires persistent storage to a database. It is an implementation of the Active Record pattern which itself is a description of an Object Relational Mapping system. - Taken from AR docs

## Active Record
### Convention Over configuration (ST - WG 5m)
Before we get started with the code, I want to highlight a reoccurring theme of Active Record and Rails in general. That is Convention over Configuration. I'm going write on the board `conventions` throughout todays lesson so we can list them as we go. But what do you guys think we mean by convention over configuration?

Basically Active Record and Rails has a whole bunch of conventions that it follows so that you won't have to mess with different configuration details later. In a nutshell, if you don't follow the conventions, you're going to have a bad time.

Alright! Let's get started with some code!

### Setup (20m)
For the morning, I want to be able to do CRUD to a model with Active Record. The first thing that I want to do is create/setup a database.

First let's create our database and create our schema file in the terminal:

```bash
$ createdb wdi
$ touch wdi_schema.sql
```

> All we did here was create a database in PSQL. If you ever want to drop a database the command is `$ dropdb <database_name>` (VERY DANGEROUS)

Next, I want to update the schema file and then load a schema for our model into the database:

in `wdi_schema.sql` file:

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INT NOT NULL,
  job TEXT
);
```

now lets load the `wdi_schema.sql` in the terminal:

```bash
$ psql -d wdi < wdi_schema.sql
```

Great, now we have a table loaded into our database we're now ready to get started on the ruby side.
Let's first create all the directories/files we're going to need in the terminal:

```bash
$ touch app.rb
$ touch Gemfile
$ mkdir models
$ touch models/student.rb
```

> The `app.rb` file is our main application file. This is where alot of the main program logic will live. The `Gemfile` will contain all the dependencies for our program. The `models/student.rb` file will contain the class definition for the Student class that will represent the students table in SQL

> by convention we always name our model file names singular

In the `Gemfile`:

```ruby
gem "pg"
# this gem provides a ruby interface to the Postgresql database
gem "activerecord"
# this gem provides a connection between your ruby classes to relational database tables
gem "pry"
# this gem allows access to REPL
```

### Functionality (20m)

In the `models/student.rb` file:

```ruby
class Student < ActiveRecord::Base
  # AR classes are singular and capitalized by convention
end
```

> In this ruby file, we create a class of Student that inherits from ActiveRecord::Base . Basically, when we inherit from ActiveRecord::Base it gives this class a whole bunch of functionality that maps the ruby Student Class to the students table in postgres.

Finally, let's build out the functionality of the `app.rb` file:

```ruby
require "pg"
require "active_record"
require "pry"
# require all the gems we'll be using for this app from the Gemfile
require_relative "models/student"
# require the Student class definition that we defined in the models/student.rb file

ActiveRecord::Base.establish_connection(
  :adapter => "postgresql",
  :database => "wdi"
)

binding.pry
# puts us into a state of the pry REPL, in which we've established a connection
# with the wdi database and have defined the Student Class as an
# ActiveRecord::Base class.
```

> note the difference between `require` and `require_relative`. With `require` we are getting gems and `require_relative` we are getting files relative to the location of the file we wrote `require_relative` in

Great! We've got everything done that we need to get setup with single model CRUD in our application. Let's run it in the terminal:

```bash
$ bundle exec ruby app.rb
```

When we run this app, we can see that it drops us into pry. Let's write some code in pry to update our database... IN REALTIME!!!

First I'm going to write class and instance on the board, so we can write these down when we do them depending on what kind they are.

Methods(30m)

creating an instance of the Student object on the ruby side, but not saving:

```ruby
george = Student.new(first_name: "George", last_name: "Washington", age: 270, job: "da man")
```

saving to the database using `.save`:
```ruby
george.save
```

if you want to create and instance of an object AND save to the database we use `.create`:

```ruby
george = Student.create(first_name: "George", last_name: "Washington", age: 270, job: "da man")
```

All of the attribute columns of your model are now `attr_accessor`'s as well. So we can do things like:

```ruby
george.first_name
# gets the first name of george
george.first_name = "george the first"
# sets the first name to george the first
george.save
# saves the model to the database
```

> Should be noted that when we set the attribute using a setter, it doesn't automatically save to the database, its not until we call `.save` on the object that it saves to the database

To get all of the students we use `.all`:

```ruby
Student.all
```

We can also find a student by its ID using `.find`:

```ruby
Student.find(1)
```

Additionally we can also find a student by an attribute using `.find_by`:

```ruby
Student.find_by(first_name: "George")
```

> Note that find_by only returns the first object that meets the requirements of the arguments

If you want all students that meet a certain query then we use `.where`:

```ruby
Student.where(first_name: "George")
```

- create
- new
- save
- all
- find, find_by
- where
- update
- destroy

> This is exciting stuff by the way, imagine, while we do these things, that our students model is instead a post on facebook, or a comment on facebook. So the next time you comment on someone's facebook page you have an idea now of whats happening on the database layer. Maybe not the whole picture, but you have an idea. We're going to build on that idea in the coming week and half, and thats really exciting.
