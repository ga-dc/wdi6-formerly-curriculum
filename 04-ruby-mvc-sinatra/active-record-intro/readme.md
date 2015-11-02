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
Think about what we have learned so far in this unit. We now have a way to persist data in a database. We've also learned about how OOP allows us to programmatically represent real things as objects in ruby. Which is AWESOME! But really databases just seems like data in this kind of cryptic place on our local computer.  We have to make super long SQL statements to do CRUD. It'd be really nice if we had some kind of way to interface between the database and our servers/applications in order to streamline this process. Enter ORM's.

### Information Dive(5m)
For the next 5 minutes, research what ORM's are.

[ORM - wikipedia](https://en.wikipedia.org/wiki/Object-relational_mapping)

[AR Read 1.1 - 1.3](http://guides.rubyonrails.org/active_record_basics.html)

### T&T (5m)
Now, turn & talk to your neighbor and discuss:
1. At a high level, what are ORM's and how might they be useful?
2. What is the importance of interfacing the server with the database?

## ORM's & Active Record (15m)
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
### Convention Over configuration (ST - WG 5m)
Before we get started with code, I want to highlight a reoccurring theme with Active Record and Rails in general. You'll often here us say Convention over Configuration.

**BOARD:** Throughout this lesson, I will write on the board Active Record's conventions so we can list them as we go.

**Question:**  Without getting into the specifics of AR, what do you think we mean by convention over configuration?

Basically Active Record and Rails, and other frameworks have a whole bunch of conventions that they follow so that you do not have to mess with different configuration details later. These conventions exist because developers agree on best practices, and therefore allows us to spend less time trying to configure, when there all ready is an accepted way to do things. Some of the common ones we will encounter are naming conventions such as: plural vs single, capital or lower, camel or snake.

In a nutshell, if you don't follow the conventions, you're going to have a bad time.

Alright! Let's get started with some code!

### Setup SQL - WDI(I do - 10m)
> Throughout the day, I'll be doing some code simulating a "wdi application" then you will code a "hospital application"

For the morning, I want to be able to do CRUD to a model with Active Record. We'll be going into greater detail about how we are going to use active record as an interface between our server and our database, but to start, the first thing that I want to do is create/setup a database.

First let's create our database and create our schema file in the terminal:

```bash
# in ~/wdi/sandbox
$ mkdir ar_wdi
$ cd ar_wdi
$ mkdir config
$ touch config/wdi_schema.sql
$ createdb wdi_db
```

> All we did here was create a database in PSQL. If you ever want to drop a database the command is `$ dropdb <database_name>` (VERY DANGEROUS)

Next, I want to update the schema file and then load a table for our model into the database:

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

now lets run our `wdi_schema.sql` file in the terminal:

```bash
$ psql -d wdi_db < config/wdi_schema.sql
```

**Question (ST-WG):** Why did we do this? Why not just go into psql and create the tables in postgres?

It'll be nice going forward with your application that we package the schema up so that its modular. We can have others quickly pick up our code and have our exact database setup.

### Setup SQL - Hospital( You do - 10m )
Now it's your turn!

1. create a directory for your hospital app.
2. Make a config folder in that directory.
3. Create a `hospital_schema.sql` file in the config folder
4. In the schema, create a patients table, patients should have:
  - `first_name`
  - `last_name`
  - `ailment`
  - `favorite_food`
5. Now create a hospital database and load the schema

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

### Setup Ruby - Hospital (You do - 10m)

 1. Create an `app.rb` file for this application
 2. Create a Gemfile
 3. Create a folder for your models
 4. Create a file that will contain your AR class definition for doctors
 5. Load dependencies into Gemfile and then bundle install

### Functionality - WDI (I do- 20m)

In the `models/student.rb` file, let's define our student model:

```ruby
class Student < ActiveRecord::Base
  # AR classes are singular and capitalized by convention
end
```

> In this ruby file, we create a class of Student that inherits from `ActiveRecord::Base`. Essentially, when we inherit from `ActiveRecord::Base`, it gives this class a whole bunch of functionality that maps the ruby `Student` class to the `students` table in postgres.

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
require "bundler/setup" # require all the gems we'll be using for this app from the Gemfile. Obviates the need for `bundle exec`
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
1. Define your model in `models/patient.rb`
2. Require dependencies in `app.rb`
3. Establish connection to database using AR
4. Load pry at the end of `app.rb`


### Methods - WDI(~60m until lunch finish after lunch)

Great! We've got everything done that we need to get setup with single model CRUD in our application. Let's run it in the terminal:

```bash
$ ruby app.rb
```

When we run this app, we can see that it drops us into pry. Let's write some code in pry to update our database... **IN REALTIME!!!**

**Board:** I want to come up with an ongoing list of class and instance methods that we can add to as we use them

**Question** What do we mean by CRUD?

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
george = Student.create(first_name: "Abe", last_name: "Lincoln", age: 150, job: "Prez")
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
Student.find(0)
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

### Methods - Hospital (you do- in pry!) (15m)
In the console:
1. Create 5 patients in your database, 3 should have the ailment: "chicken pox"
2. Create a patient without saving it and store it in a variable
3. Save that patient you stored in a variable to the database
4. Query for all patients in the database
5. Query for the patient that has an id of 1
6. Query for a patient by his/her name
7. Query for all patients that have the ailment "chicken pox"
8. Update a patient in the database of your choosing to have watermelon be its favorite food
9. Delete a patient from the database

## Associations

### Reframing (10m)
**Question:** We have a lot of choice when it comes to databases, why did we choose to use SQL?

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
### Updating Schema - WDI (I do - 10m)

The first thing I want to do is update my schema to add another table and reflect the association, make note of the foreign key.

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

Lets go ahead run our schema file so that we can update the database to reflect our current schema in the terminal:

```bash
$ psql -d wdi < wdi_schema.sql
```

### Updating Schema - Hopsital (You do - 10m)
1. For the Hospital application we'll be adding a Doctor model
2. Create a new table for doctors in postgres it should have the following attributes
  - `first_name`
  - `last_name`
  - `specialty`
3. Make sure to add an attribute to patients so that they belong to a doctor
4. Load the schema to the database

### Updating Class Definitions - WDI (I do 10m)
Next I want to create a new file for my Instructor AR Class definition `$ touch models/instructor.rb`. In it i'll put:


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

### Updating Class Defintions - Hospital (You do 5m)
1. Create a file that will contain your AR class definition for Doctor
2. Make sure to link that file in your main application file
3. Add corresponding associations to your models

### Break (10 minutes)

### Association helper methods - WDI (I do 30 m)
So we added some code, but we can't yet see the functionality it gives us.

Basically when we added those two lines of code `has_many :students` `belongs_to :instructor` we created some helper methods that allow us to query the database more effectively.

Lets create some objects so we can see what were talking about:

```ruby
jesse = Instructor.create(first_name: "Jesse", last_name: "Shawl", age: 26)
adrian = Instructor.create(first_name: "Adrian", last_name: "Maseda", age: 28)

Student.create(first_name: "Tom", last_name: "Jefferson", age: 67, job: "Doctor", instructor: jesse)
Student.create(first_name: "Jack", last_name: "Adams", age: 67, job: "Lawyer", instructor: jesse)
Student.create(first_name: "Andy", last_name: "Jackson", age: 55, job: "Banker", instructor: adrian)
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
tom = Student.find_by(first_name: "Tom")
tom.instructor
# will return tom's instructor, this is .instructor being used as a getter method

adrian = Instructor.last
tom.instructor = adrian
# this .instructor being used as a setter method, and now bob's instructor is adrian
```

We can also create new students under a certain instructor by doing the following:

```ruby
jesse.students.create(first_name: "baskin", last_name: "robbins", age: 34, job: "icecream")
# this will create a new student that belongs to the Instructor object named jesse.
```
> **Note** that we did not pass in an instructor id above. Active Record is smart and does that for us.

### Association helper methods - Hospital (you do 15m)
In the console:
1. Create at least 2 doctors in your database
2. Create at least 4 patients in your database that belong to one of the two doctors
3. Query the data base for all of patients belonging to one of the doctors
4. Query the database for the doctor of the last patient you created
5. Create a new patient without a doctor id, and use the setter method to associate a doctor to that patient

### Seeding a database - WDI (15m)
Seeding a database is not all that different from the things we've been doing today. What's the purpose of seed data? **(ST-WG)**

We want some sort of data in our database so that we can test our applications. Let's create a seed file in the terminal: `$ touch config/seeds.rb`

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
adam.students.create(first_name: "Charlie", last_name: "Kelly", age: 31, job: "Owner of Paddy's")

```

### Seeding a database - Hopsital ( you do- 10m)
1. Create a seed file that contains all dependencies and establish connection to database /w Active Record
2. In the seed file, create at least 2 doctors and 4 patients
3. Make sure you destroy all objects before creating new ones

## Closing
Who misses writing SQL queries by hand? Exactly. Active Record is extremely powerful and helpful to more easily interface with the business models for our applications.

Review Learning Objectives

### Homework
[Landlord (Active Record)](https://github.com/ga-dc/landlord#active-record)

### Resources
[Active Record Basics](http://guides.rubyonrails.org/active_record_basics.html)
[Active Record Query Interface](http://guides.rubyonrails.org/active_record_querying.html)

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
