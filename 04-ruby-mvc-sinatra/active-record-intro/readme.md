# Active Record

## LO's
- Define ORM and why we use it over a database language.
- Explain what Active record is and what problems it solves.
- Explain convention over configuration and how it relates to Active Record
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
- Differentiate between class versus instant methods in Active Record objects/classes
- Utilize `has_many`, `belongs_to` to establish associations/relationships with AR
- Seed a database using AR


## Opening Framing (5 / 5)
Think about what we have learned so far in this unit. We now have a way to persist data in a database. We've also learned about how OOP allows us to programmatically represent real things as objects in ruby. Which is AWESOME! But really databases just seems like data in this kind of cryptic place on our local computer.  We have to make super long SQL statements to do CRUD. It'd be really nice if we had some kind of way to interface between the database and our servers/applications in order to streamline this process. Enter ORM's.

### Information Dive (5 / 10)
For the next 5 minutes, research what ORM's are.

[ORM - wikipedia](https://en.wikipedia.org/wiki/Object-relational_mapping)

[AR Read 1.1 - 1.3](http://guides.rubyonrails.org/active_record_basics.html)

### T&T (5 / 15)
Now, turn & talk to your neighbor and discuss:

1. At a high level, what are ORM's and how might they be useful?
2. What is the importance of interfacing the server with the database?

## ORM's & Active Record (10 / 25)
- *Official* wikipedia definition. A programming technique for converting data between incompatible type systems in object-oriented programming languages.

> Thats sounds like a lot of 5 dollar words, but what does it really mean?

We need a way to encapsulate our databases into objects that we can talk to on our server. ORM's serve that purpose. Remember those tables we created in SQL? Well, its an object represented on our server now. That's what ORM's do.

More concretely ORM's:
- 'Map' (translate) objects to rows in our DB (and vice versa)
- **Conventions**:
  - 1 table per Model/Class/Entity
  - table name is model name pluralized
  - each column is an attribute for that model
- Table associations are handled using foreign keys

It just so happens you will be learning one of the best ORM's on the market. It has some of the best documentation and best syntax(because ruby is awesome) the industry has to offer. This ORM is Active Record.

> Active Record is the M in MVC - the model - which is the layer of the system responsible for representing business data and logic. Active Record facilitates the creation and use of business objects whose data requires persistent storage to a database. It is an implementation of the Active Record pattern which itself is a description of an Object Relational Mapping system. - Taken from AR docs

## Active Record
### Convention Over configuration (ST-WG - 10 / 35)
Before we get started with code, I want to highlight a reoccurring theme with Active Record and Rails in general. You'll often here us say Convention over Configuration.

**Question:**  Without getting into the specifics of AR, what do you think we mean by convention over configuration?

Basically Active Record and Rails, and other frameworks have a whole bunch of conventions that they follow so that you do not have to mess with different configuration details later. These conventions exist because developers agree on best practices, and therefore allows us to spend less time trying to configure, when there all ready is an accepted way to do things. Some of the common ones we will encounter are naming conventions such as: plural vs single, capital or lower, camel or snake.

**BOARD:** Throughout this lesson, I will write on the board Active Record's conventions so we can list them as we go.

In a nutshell, if you don't follow the conventions, you're going to have a bad time.

Alright! Let's get started with some code!

### Setup SQL - WDI (I Do - 5 / 40)
> Throughout the day, I'll be doing some code simulating a "wdi application" then you will code along with our Tunr
applications.

Let's go over our domain model for both applications.

![ERDs](./active-record.png)


[Tunr Deployed link](https://wdi-dc6-tunr-demo.herokuapp.com/artists)

I want to be able to do CRUD for these models with Active Record. We'll be going into greater detail about how we are going to use Active Record as an interface between our server and our database, but to start, the first thing that I want to do is create/setup a database.

First let's create our database and create our schema file in the terminal:

```bash
# in ~/wdi/sandbox
$ mkdir ar_wdi
$ cd ar_wdi
$ mkdir db
$ touch db/wdi_schema.sql
$ createdb wdi_db
```

> All we did here was create a database in PSQL. If you ever want to drop a database the command is `$ dropdb <database_name>` (VERY DANGEROUS)

Next, I want to update the schema file and then load a table for our model into the database:

in `db/wdi_schema.sql` file:

```sql
DROP TABLE IF EXISTS instructors;
DROP TABLE IF EXISTS students;

CREATE TABLE instructors (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INT NOT NULL
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INT NOT NULL,
  job TEXT,
  instructor_id INT
);
```

now lets run our `wdi_schema.sql` file in the terminal:

```bash
$ psql -d wdi_db < db/wdi_schema.sql
```

**Question (ST-WG):** Why did we do this? Why not just go into psql and create the tables in postgres?

It'll be nice going forward with your application that we package the schema up so that its modular. We can have others quickly pick up our code and have our exact database setup.

### Setup SQL - Tunr (You Do - 10 / 50)

**NOTE:** If you already ran your Tunr schema in the Domain Modeling / SQL class, you do not need to complete this portion.  

[Part 1 - Database/Schema](https://github.com/ga-dc/tunr_sinatra/tree/2_active_record_starter#part-1---database--schema)

### Setup Ruby - WDI (I Do - 10 / 60)
Great, now we have a table loaded into our database we're now ready to get started on the ruby side.
Let's first create all the directories/files we're going to need in the terminal:

```bash
$ touch app.rb
$ touch Gemfile
$ mkdir models
$ touch models/student.rb
```

> The `app.rb` file is our main application file. This is where a lot of the main program logic will live.

> The `Gemfile` will contain all the dependencies for our program.

> The `models/student.rb` file will contain the class definition for the Student class that will represent the students table in SQL

> by convention we always name our model file names singular

In the `Gemfile`:

```ruby
source 'https://rubygems.org'

gem "pg"  # this gem allows ruby to talk to postgres
gem "activerecord"  # this gem provides a connection between your ruby classes to relational database tables
gem "pry"  # this gem allows access to REPL
```

Then I'm going to run `$ bundle install` in the terminal.

### Setup Ruby - Tunr (You Do - 10 / 70)
If you did not complete the initial SQL setup for Tunr above:
 - In your cloned copy, run `git fetch https://github.com/ga-dc/tunr_sinatra` to get the most recent branches
 - Please `git checkout` to the `2_active_record_starter` branch
 - Then you will need to create the db with `createdb tunr_db`
 - Then load the schema file with `psql -d tunr_db < db/schema.sql`
 - Next run the seed file with `psql -d tunr_db < db/seed.sql`
 - Follow the steps from `Part 2.1` in the link below

[Part 2.1 - Create the Artist Model Using Active Record](https://github.com/ga-dc/tunr_sinatra/tree/2_active_record_starter#part-21---create-the-artist-model-using-active-record)

### Break (10 / 80)

### Functionality - WDI (I Do - 20 / 100)  

In the `models/student.rb` file, let's define our student model:

```ruby
class Student < ActiveRecord::Base
  # AR classes are singular and capitalized by convention
end
```

> In this ruby file, we create a class of Student that inherits from `ActiveRecord::Base`. Essentially, when we inherit from `ActiveRecord::Base`, it gives this class a whole bunch of functionality that maps the ruby `Student` class to the `students` table in postgres.

Now, lets create a file that handles the connection between our application and our database:

```bash
# Add a connection.rb file to our db directory
$ touch db/connection.rb
```

In `db/connection.rb`:
```ruby
ActiveRecord::Base.establish_connection(
  :adapter => "postgresql",
  :database => "wdi_db"
)
```

Finally, let's build out the functionality of the `app.rb` file(which in this case is just dropping us into pry):

```ruby
require "bundler/setup" # require all the gems we'll be using for this app from the Gemfile. Obviates the need for `bundle exec`
require "pg" # postrgres db library
require "active_record" # the ORM
require "pry" # for debugging

require_relative "db/connection" # require the db connection file that connects us to PSQL, prior to loading models
require_relative "models/student" # require the Student class definition that we defined in the models/student.rb file

# This will put us into a state of the pry REPL, in which we've established a connection
# with the wdi database and have defined the Student Class as an
# ActiveRecord::Base class.
binding.pry

```

> note the difference between `require` and `require_relative`. With `require` we are getting gems and `require_relative` we are getting files relative to the location of the file we wrote `require_relative` in

### Functionality - Tunr (You Do - 10 / 110)

[Part 2.2 - Define Artist & Setup Your `app.rb` to Connect The Database](https://github.com/ga-dc/tunr_sinatra/tree/2_active_record_starter#part-22---define-artists--setup-your-apprb-to-connect-to-the-database)


### Methods - WDI (I Do - 30 / 140)

Great! We've got everything done that we need to get setup with single model CRUD in our application. Let's run it in the terminal:

```bash
$ ruby app.rb
```

When we run this app, we can see that it drops us into pry. Let's write some code in pry to update our database... **IN REALTIME!!!**

**Board:** I want to come up with an ongoing list of class and instance methods that we can add to as we use them

Let's create an instance of the Student object on the ruby side, but that does not save originally:

> **Note** the syntax for creating a new instance.

```ruby
george = Student.new(first_name: "George", last_name: "Washington", age: 270, job: "Prez")
```

To save our instance to the database we use `.save`:

```ruby
george.save
```

If we want to initialize an instance of an object AND save it to the database we use `.create`:

```ruby
abe = Student.create(first_name: "Abe", last_name: "Lincoln", age: 150, job: "Prez")
```

One really handy feature we get from an Active Record inherited class is that all of the attribute columns of our model are now `attr_accessor`'s as well. So we can do things like:

```ruby
george.first_name
# gets the first name of george
george.first_name = "Jorge"
# sets the first name to "Jorge"
george.save
# saves the model to the database
```

> **Note:** Should be noted that when we set the attribute using a setter, it doesn't automatically save to the database, its not until we call `.save` on the object that it saves to the database

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
Student.find_by(last_name: "Washington")
```

> Note that find_by only returns the first object that meets the requirements of the arguments

If you want all students that meet a certain query then we use `.where`:

```ruby
Student.where(last_name: "Washington")
```

We can also update attributes and save at the same time using the `.update` method:

```ruby
george = Student.find_by(last_name: "Washington")
george.update(job: "actor", first_name: "Denzel")
```

Finally we can also just destroy/delete rows in our database with the `.destroy` method:

```ruby
george = Student.find_by(last_name: "Washington")
george.destroy
# goodbye george you're gone forever
```

> This is exciting stuff by the way, imagine, while we do these things, that our students model is instead a post on facebook, or a comment on facebook. So the next time you comment on someone's facebook page you have an idea now of whats happening on the database layer. Maybe not the whole picture, but you have an idea. We're going to build on that idea in the coming week and half, and thats really exciting.


### LUNCHTIME

### Methods - Tunr (You Do (In Pry!) - 15 / 155)

[Part 2.3 - Use Your Artist Model](https://github.com/ga-dc/tunr_sinatra/tree/2_active_record_starter#part-23---use-your-artist-model)

## Associations

### Reframing (10 / 165)
**Question:** We have a lot of choice when it comes to databases, why are we using SQL?

We use SQL because it is a relational database. But what does that really mean? Basically we want the ability to associate models in our domain. That can come in a variety of ways in a relational database, but at the heart of it is essentially this:

One model has many other instances of another model. And that other model belongs to the original. Not really clear, eh?

Let's take a look at an example in the wild.

With the application Facebook, there are many users. Each of these users have several models associated with them. Let's look at one more closely. We'll be looking at posts(status updates)

The first model we'll be looking at is Users. The second is Posts.

A User has many Posts
And every Post belongs to a certain user.

> Note the plurality of the nouns used in these two sentences

When we start organizing our objects in this manner and program these associations, it becomes much easier to query our database for what we need. IE. If we were on Adrian's facebook page, it wouldn't make sense for us to query EVERY post in facebook and then do `.where(facebook_user: "Adrian")` That would get really expensive. Instead we can do something like, `adrian.posts` and then BAM, we got all of adrian's posts.

> Note that this is just speaking at a high level and not modeling the exact syntax, however it's incredibly close to how the code actually would look if it were modeled in AR.

Let's see what some of this stuff looks like in code. We're going to be adding an instructor model to our program.

### Associations in Schema - WDI (I Do - 10 / 175)

**NOTE:** In this section, we are reviewing we our schema and how it reflects associations for our domain. We are NOT updating the schema file.

In `wdi_schema.sql`:

```sql
DROP TABLE IF EXISTS instructors;
DROP TABLE IF EXISTS students;

CREATE TABLE instructors (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INT NOT NULL
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INT NOT NULL,
  job TEXT,
  instructor_id INT
);
```

Make note of the foreign key in `students`

### Updating Class Definitions - WDI (I Do - 10 / 195)

Next I want to create a new file for my Instructor AR Class definition `$ touch models/instructor.rb`. In it I'll put:

```ruby
class Instructor < ActiveRecord::Base
  has_many :students
end
```

Now In my `models/student.rb` we have to reflect the association:

```ruby
class Student < ActiveRecord::Base
  belongs_to :instructor
end
```
> note the plurality of `students` and singularity of `instructor`

We also need to include the `models/instructor.rb` file into our `app.rb` so in `app.rb` we need to add

```ruby
require_relative "models/instructor"
```

### Updating Class Defintions - Tunr (You Do - 5 / 200)

[Part 2.4 - Create Your Song Model / Setup Associations](https://github.com/ga-dc/tunr_sinatra/tree/2_active_record_starter#part-24---create-your-song-model--setup-associations)

### Break (10 / 210)

### Association Helper Methods - WDI (I Do - 30 / 240)

So we added some code, but we can't yet see the functionality it gives us.

Basically when we added those two lines of code `has_many :students` `belongs_to :instructor` we created some helper methods that allow us to query the database more effectively.

Lets create some objects so we can see what were talking about:

```ruby
jesse = Instructor.create(first_name: "Jesse", last_name: "Shawl", age: 26)
adrian = Instructor.create(first_name: "Adrian", last_name: "Maseda", age: 28)

Student.create(first_name: "Tom", last_name: "Jefferson", age: 67, job: "Doctor", instructor: adrian)
Student.create(first_name: "Jack", last_name: "Adams", age: 67, job: "Lawyer", instructor: jesse)
Student.create(first_name: "Andy", last_name: "Jackson", age: 55, job: "Banker", instructor: jesse)
Student.create(first_name: "Ted", last_name: "Roosevelt", age: 55, job: "Hunter", instructor: adrian)
```

Now that we have this association, we can now easily query the database for the relevant records.

If I want to get all of Jesse's students or set Jesse's students I can now write this code:
```ruby
jesse = Instructor.find_by(first_name: "Jesse")
jesse.students
# will return all students that belong to Jesse, this is .students being used as a getter method

jesse.students = [Student.first, Student.last]
# this is .students being used as a setter method
```
> note that when students is being used as a setter method above, it actually changes the instructor_id column for those students to match Jesse's primary ID. Any student that previously was assigned to Jesse and not reassigned in the setter will now have an instructor_id of nil

Alternatively if I wanted to get a student's instructor I could write this code:

```ruby
jack = Student.find_by(first_name: "Jack")
jack.instructor
# will return Jack's instructor, this is .instructor being used as a getter method

adrian = Instructor.last
jack.instructor = adrian
jack.save
# this .instructor being used as a setter method, and now Jack's instructor is Adrian
```

We can also create new students under a certain instructor by doing the following:

```ruby
jesse.students.create(first_name: "baskin", last_name: "robbins", age: 34, job: "icecream")
# this will create a new student that belongs to the Instructor object named jesse.
```
> **Note** that we did not pass in an instructor id above. Active Record is smart and does that for us.

### Association Helper Methods - Tunr (You Do - 15 / 255)

[Part 2.5 - Use Your Model Assocations](https://github.com/ga-dc/tunr_sinatra/blob/2_active_record_starter/readme.md#part-25---use-your-model-associations)

### Seeding a Database - WDI (15 / 270)
Seeding a database is not all that different from the things we've been doing today. What's the purpose of seed data? **(ST-WG)**

We want some sort of data in our database so that we can test our applications. Let's create a seed file in the terminal: `$ touch db/seeds.rb`

In our `db/seeds.rb` file let's put the following:

```ruby
require "bundler/setup" # require all the gems we'll be using for this app from the Gemfile. Obviates the need for `bundle exec`

require "pg"
require "active_record"
require "pry"

require_relative "../models/student"
require_relative "../models/instructor"

require_relative "../db/connection.rb"


Instructor.destroy_all
Student.destroy_all
# destroys existing data in database

robin = Instructor.create(first_name: "Robin", last_name: "Thomas", age: 26)
adam = Instructor.create(first_name: "Adam", last_name: "Bray", age: 30)
robin.students.create(first_name: "Michael", last_name: "Scott", age: 45, job: "Office Manager")
robin.students.create(first_name: "Dwight", last_name: "Schrute", age: 34, job: "Assistant to the Regional Manager")
adam.students.create(first_name: "Dee", last_name: "Reynolds", age: 32, job: "Bartender")
adam.students.create(first_name: "Charlie", last_name: "Kelly", age: 31, job: "Owner of Paddy's")
```

Now when we run our application with `ruby app.rb`, we enter into Pry with all our data loaded.

## Closing
Who misses writing SQL queries by hand? Exactly. Active Record is extremely powerful and helpful, and allows us to easily interface with the business models for our applications.

Review Learning Objectives

### Homework
[Landlord (Active Record)](https://github.com/ga-dc/landlord#active-record)

### Resources
- [Active Record Basics](http://guides.rubyonrails.org/active_record_basics.html)
- [Active Record Query Interface](http://guides.rubyonrails.org/active_record_querying.html)

### Appendix

#### Instance vs Class Methods
| method              | instance | class    |
|---------------------|:--------:|:--------:|
| .new                |          |     x    |
| .save               |     x    |          |
| .create             |          |     x    |
| attribute accessors |     x    |          |
| .all                |          |     x    |
| .find               |          |     x    |
| .find_by            |          |     x    |
| .where              |          |     x    |
| .update             |     x    |          |
| .destroy            |     x    |          |
| .destroy_all        |          |     x    |

#### Conventions in AR
|description      | Rule    |
|-----------------|---------|
|table names      |snake case and plural|
|model file names |snake case and singular|
|model definition |Camel case and singular|
|argument for has_many| snake case and plural|
|argument for belongs_to| snake case and singular|
|more to follow....|||
