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


## Opening Framing (15m)
We now have a way to persist data in a database. We've also learned about OOP in Ruby how we can represent things in real life programmatically as objects. Which is AWESOME! But really databases just seems like data in this kind of cryptic place on our local computer.  We have to make super long SQL statements to do CRUD. It'd be really nice if we had some kind of way to interface between the database and our servers/applications in order to streamline this process. Enter ORM's.

Information Dive(5m)
For the next 5 minutes, research what ORM's are.

[ORM - wikipedia](https://en.wikipedia.org/wiki/Object-relational_mapping)

[AR Read 1.1 - 1.3](http://guides.rubyonrails.org/active_record_basics.html)

T&T (5m)
Now, turn & talk to your neighbor and discuss:
- at a high level, what ORM's are and how they might be useful
- what's the importance of interfacing the server with the database

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

Basically Active Record and Rails has a whole bunch of conventions that it follows so that you won't have to mess with different configuration details later. Some of the common ones are plural vs single, capital or lower, camel or snake.

In a nutshell, if you don't follow the conventions, you're going to have a bad time.

Alright! Let's get started with some code!

### Setup SQL - WDI(I do - 10m)
> Throughout the day, I'll be doing some code simulating a "wdi application" then you guys will code a "hospital application"

For the morning, I want to be able to do CRUD to a model with Active Record.  The first thing that I want to do is create/setup a database.

First let's create our database and create our schema file in the terminal:

```bash
$ mkdir ar_wdi
$ cd ar_wdi
$ mkdir config
$ touch config/wdi_schema.sql
$ createdb wdi_db
```

> All we did here was create a database in PSQL. If you ever want to drop a database the command is `$ dropdb <database_name>` (VERY DANGEROUS)

Next, I want to update the schema file and then load a schema for our model into the database:

in `config/wdi_schema.sql` file:

```sql
DROP TABLE IF EXISTS students;

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
$ psql -d wdi_db < config/wdi_schema.sql
```

Why did we do this? Why not just go into psql and create the tables in postgres? (ST-WG)

It'll be nice going forward with your application that we package the schema up so that its modular. We can have others quickly pick up our code and have our exact database setup.

### Setup SQL - Hospital( You do - 10m )
Now it's your turn!

First create a directory for your hospital app.

Make a config folder in that directory.

Create a `hospital_schema.sql` file in the config folder

In the schema, create a patients table, patients should have:
- first_name
- last_name
- ailment
- favorite_food

Now create a hospital database and load the schema

### Suggested Break (10m)

### Setup ruby - WDI (I do - 10m)
Great, now we have a table loaded into our database we're now ready to get started on the ruby side.
Let's first create all the directories/files we're going to need in the terminal:

```bash
$ touch app.rb
$ touch Gemfile
$ mkdir models
$ touch models/student.rb
```

> The `app.rb` file is our main application file. This is where alot of the main program logic will live.

> The `Gemfile` will contain all the dependencies for our program.
The `models/student.rb` file will contain the class definition for the Student class that will represent the students table in SQL

> by convention we always name our model file names singular

In the `Gemfile`:

```ruby
source 'https://rubygems.org'

gem "pg"  # this gem allows ruby to talk to postgres
gem "activerecord"  # this gem provides a connection between your ruby classes to relational database tables
gem "pry"  # this gem allows access to REPL
```

Then I'm going to run `$ bundle install` in the terminal.

### Setup Ruby - Hospital (You do - 10m)

- Create an `app.rb` file for this application
- Create a Gemfile
- Create a folder for your models
- Create a file that will contain your AR class definition for doctors
- Load dependencies into Gemfile and then bundle install

### Functionality - WDI (I do- 20m)

In the `models/student.rb` file:

```ruby
class Student < ActiveRecord::Base
  # AR classes are singular and capitalized by convention
end
```

> In this ruby file, we create a class of Student that inherits from ActiveRecord::Base . Basically, when we inherit from ActiveRecord::Base it gives this class a whole bunch of functionality that maps the ruby Student Class to the students table in postgres.

Now, lets create a file that handles the connection between our application and our database:

```bash
$ mkdir config
$ touch config/db.rb
```

In `config/db.rb`:
```ruby
ActiveRecord::Base.establish_connection(
  :adapter => "postgresql",
  :database => "wdi_db"
)
```

Finally, let's build out the functionality of the `app.rb` file(which in this case is just dropping us into pry):

```ruby
require 'bundler/setup' # require all the gems we'll be using for this app from the Gemfile. Obviates the need for `bundle exec`
require "pg" # postrgres db library
require "active_record" # the ORM
require "pry" # for debugging

require_relative "config/db" # require the db connection file that connects us to PSQL, prior to loading models
require_relative "models/student" # require the Student class definition that we defined in the models/student.rb file

# This will put us into a state of the pry REPL, in which we've established a connection
# with the wdi database and have defined the Student Class as an
# ActiveRecord::Base class.
binding.pry

```

> note the difference between `require` and `require_relative`. With `require` we are getting gems and `require_relative` we are getting files relative to the location of the file we wrote `require_relative` in

### Functionality - Hopsital (You do - 10m)
- Define your model in `models/patient.rb`
- require dependencies in `app.rb`
- Establish connection to database using AR
- load pry at the end of `app.rb`

### Methods - WDI(~60m until lunch finish after lunch)

Great! We've got everything done that we need to get setup with single model CRUD in our application. Let's run it in the terminal:

```bash
$ ruby app.rb
```

When we run this app, we can see that it drops us into pry. Let's write some code in pry to update our database... IN REALTIME!!!

First I'm going to write class and instance on the board, so we can write these down when we do them depending on what kind they are.


creating an instance of the Student object on the ruby side, but not saving:

```ruby
george = Student.new(first_name: "George", last_name: "Washington", age: 270, job: "da man")
```

saving to the database using `.save`:
```ruby
george.save
```

if you want to create an instance of an object AND save to the database we use `.create`:

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

We can also update attributes and save at the same time using the `.update` method:

```ruby
george = Student.find_by(first_name: "George")
george.update(job: "surfer", last_name: "Costanza")
```

Finally we can also just destroy/delete rows in our database with the `.destroy` method:

```ruby
george = Student.find_by(first_name: "George")
george.destroy
# goodbye george you're gone forever
```

> This is exciting stuff by the way, imagine, while we do these things, that our students model is instead a post on facebook, or a comment on facebook. So the next time you comment on someone's facebook page you have an idea now of whats happening on the database layer. Maybe not the whole picture, but you have an idea. We're going to build on that idea in the coming week and half, and thats really exciting.

### Methods - Hospital (you do- in pry!)

- create 5 patients in your database 3 should have the ailment: "chicken pox"
- create a patient without saving it and store it in a variable
- save that patient you stored in a variable to the database
- query for all patients in the database
- query for the patient that has an id of 1
- query for a patient by his/her name
- query for all patients that have the ailment "chicken pox"
- update a patient in the database of your choosing to have watermelon be its favorite food
- delete a patient from the database

## Associations

### Reframing (10m)
We use SQL because it is a relational database. But what does that really mean? Basically we want the ability to associate models in our domain. That can come in a variety of ways in a relational database, but at the heart of it is essentially this:

One model has many other instances of another model. And that other model belongs to the original. Not really clear, eh?

Let's take a look at an example in the wild.

With the application Facebook, there are many users. Each of these users have several models associated with them. Let's look at one more closely. We'll be looking at posts(status updates)

The first model we'll be looking at is Users. The second is Posts.

A User has many Posts
And every Post belongs to a certain user.

> Note the plurality of the nouns used in these two sentences

When we start organizing our objects in this manner and program these associations, it becomes much easier to query our database for what we need. IE. If we were on Adam's facebook page, it wouldn't make sense for us to query EVERY post in facebook and then do `.where(facebook_user: "Adam")` That would get really expensive. Instead we can do something like, `adam.posts` and then BAM, we got all of adam's posts.

> note that this is just speaking at a high level and not neccessarily actual code, though some of it actually is!

Let's see what some of this stuff looks like in code. We're going to be adding an instructor model to our program.
### Updating Schema - WDI (I do - 10m)

The first thing I want to do is update my schema to add another table and reflect the association.

In `wdi_schema.sql`:

```sql
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS instructors;

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INT NOT NULL,
  job TEXT,
  instructor_id INT
);

CREATE TABLE instructors (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INT NOT NULL
);
```

Lets go ahead and update the database to reflect our current schema in the terminal:

```bash
$ psql -d wdi < wdi_schema.sql
```

### Updating Schema - Hopsital (You do - 10m)
- For the Hospital application we'll be adding a Doctor model
- Create a new table for doctors in postgres it should have the following attributes
  - first_name
  - last_name
  - specialty
- make sure to add an attribute to patients so that they belong to a doctor
- load the schema to the database

### Updating Class Definitions - WDI (I do 10m)
Next I want to create a new file for my Instructor AR Class definition `$ touch models/instructor.rb`. In it i'll put:


```ruby
class Instructor < ActiveRecord::Base
  has_many :students
end
```

In my `models/student.rb`:

```ruby
class Student < ActiveRecord::Base
  belongs_to :instructor
end
```
> note the plurality of students and singularity of instructor

we also need to include the `models/instructor.rb` file into our `app.rb` so in `app.rb` we need to add

```ruby
require_relative "models/instructor"
```

### Updating Class Defintions - Hospital (You do 5m)
- Create a file that will contain your AR class definition for Doctor
- make sure to link that file in your main application file
- add corresponding associations

### Association helper methods - WDI (I do 30 m)
So we added some code, but we're not entirely sure what that did.

Basically when we added those two lines of code `has_many :students` `belongs_to :instructor` we created some helper methods that allow us to query the database more effectively.

Lets create some objects so we can see what were talking about:

```ruby
jesse = Instructor.create(first_name: "Jesse", last_name: "Shawl", age: 26)
adrian = Instructor.create(first_name: "Adrian", last_name: "Maseda", age: 28)

Student.create(first_name: "Bob", last_name: "Smith", age: 55, job: "Circus Clown", instructor: jesse)
Student.create(first_name: "Joey", last_name: "Tribiana", age: 42, job: "Actor", instructor: jesse)
Student.create(first_name: "Chandler", last_name: "Bing", age: 42, job: "Transpondster", instructor: adrian)
Student.create(first_name: "Monica", last_name: "Geller", age: 42, job: "chef", instructor: adrian)
```

Now that we have this association, we can now query the database more effectively.

If i want to get all of Jesse's students or set Jesse's students I can now write this code:
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
bob = Student.find_by(first_name: "Bob")
bob.instructor
# will return bob's instructor, this is .instructor being used as a getter method

adrian = Instructor.last
bob.instructor = adrian
# this .instructor being used as a setter method, and now bob's instructor is adrian
```

We can also create new students under a certain instructor by doing the following:

```ruby
jesse.students.create(first_name: "baskin", last_name: "robbins", age: 34, job: "icecream")
# this will create a new student that belongs to the Instructor object named jesse.
```
> note that we did not pass in an instructor id above. Active Record is smart and does that for us.

### Association helper methods - Hospital (you do 15m)

- Create at least 2 doctors in your database
- Create at least 4 patients in your database that belong to one of the two doctors
- Query the data base for all of patients belonging to one of the doctors
- Query the database for the doctor of the last patient you created
- Create a new patient without a doctor id, and use the setter method to associate a doctor to that patient

### Seeding a database - WDI (15m)
Seeding a database is not all that different from the things we've been doing today. What's the purpose of seed data? (ST-WG)

We want some sort of data in our database so that we can test our applications. Let's create our seed file in the terminal: `$ touch config/seeds.rb`

In our `config/seeds.rb` file let's put the following:

```ruby
require "pg"
require "active_record"
require "pry"

require_relative "../models/student"
require_relative "../models/instructor"

require_relative "../config/db.rb"


Instructor.destroy_all
Student.destroy_all
# destroys existing data in database

robin = Instructor.create(first_name: "robin", last_name: "thomas", age: 26)
adam = Instructor.create(first_name: "adam", last_name: "bray", age: 30)
robin.students.create(first_name: "michael", last_name: "scott", age: 45, job: "office manager")
robin.students.create(first_name: "Dwight", last_name: "Schrute", age: 34, job: "Assistant to the Regional Manager")
adam.students.create(first_name: "Dee", last_name: "Reynolds", age: 32, job: "Bartender")
adam.students.create(first_name: "George", last_name: "Costanza", age: 45, job: "toner seller")

```

### Seeding a database - Hopsital ( you do- 10m)
- create a seed file that contains all dependencies and establish connection to database /w Active Record
- in the seed file create at least 2 doctors and 4 patients
- make sure you destroy all objects before creating new ones

### Appendix

#### Instance vs Class
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

#### Conventions
|description      | Rule    |
|-----------------|---------|
|table names      |snake case and plural|
|model file names |snake case and singular|
|model definition |Camel case and singular|
|argument for has_many| snake case and plural|
|argument for belongs_to| snake case and singular|
|more to follow....|||
