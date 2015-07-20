# Ruby + MVC with Sinatra

Build an interactive web application that persists data.

## Learning Objectives

### Ruby Basics

- Compare/contrast Ruby and Javascript as programming languages.
- Run Ruby code by REPL (Pry) and file.
- Identify specific differences between Ruby and Javascript in the following areas...
  - Syntax
  - Variables
  - Fundamental Data Types
  - Data Collections
  - Conditionals
  - Methods (Functions)
- Demonstrate how variables are stored in memory using Ruby.

### Ruby Enumerables

- Use Ruby loops to iterate over code blocks.
- Define what a Ruby enumerable method is.
- Identify useful Ruby enumerables.
- Use enumerables to traverse, sort and modify collections.

### Intro to Object-Oriented Programming in Ruby

- Define Object-Oriented Programming, and it's benefits
- Define and differentiate between classes and objects
- Create a Ruby a class with an initialize method
- Instantiate an object from a class and interact with it
- Explain the difference between local and instance variables
- Write setter and getter methods
- Describe the use of `attr_reader` / `attr_writer` / `attr_accessor`
- Write methods to define an interface to the class' behaviors
- Describe how OOP supports encapsulation and abstraction

### Intermediate Object-Oriented Programming in Ruby

- Define and differentiate between class and instance methods
- Explain the use of self in Ruby
- Explain the difference between local, instance and class variables
- Define inheritance in the context of OOP
- Write a Ruby class that inherits from another
- Describe the method lookup chain in Ruby

### Problem Modeling

- Demonstrate how to break a problem into relevant parts
- Demonstrate multiple solutions, identifying tradeoffs
- Indicate what is easily solvable
- Identify areas of high/low risk

### Domain Modeling/ERDs

- Draw an Entity Relationship Diagram (ERD) using proper notation
- Identify and diagram a one-to-one, one-to-many, many-to-many relationship between d ta entities (physical/virtual)
- Create a domain model by listing its parts (entities, relationships, attributes a d behavior)
- Distinguish between entities & attributes (and when you should use one over the o her)
- Discuss data normalization needs and techniques

###	DB / SQL

- Explain the purpose of a database
- Describe benefits a of Database over other storage
- Define ACID
- Create a SQL database, containing tables, that is saved locally and is ACID
- Distinguish between primary keys, foreign keys, and indexes (simple & complex)
- Describe the datatypes used in SQL and the related field constraints
- Execute CRUD actions on the database using "pure" SQL (Postgres, PSQL)
- Use different join types to combine data

### Sinatra && REST

- Explain what REST is and why we use it
- List the HTTP request verbs
- Describe what Sinatra is and what it is used for
- Distinguish between a route and a path
- Build a Sinatra app that responds to HTTP requests
- Define routes using Sinatra
- Define routes with URL parameters and access those parameters
- Use erb to create reusable views and templates
- Use a global template - layout.erb
- Use forms to submit POST and GET requests

### Active Record
- Define ORM and why we use it over a database language.
- Explain what Active record is and what problems it solves.
- Explain convention over configuration and how it relates to Active Record
- Explain the basic idea of metaprogramming and how AR leverages this to provide an interface to the DB
- Define a class that inherits from AR
  - Utilize `has_many`, `belongs_to` to establish relationships with AR
- Difference between class versus instant methods
- Utilize AR to perform the following CRUD actions on a database
  - create
  - new
  - save
  - all
  - find, find_by
  - where
  - update
  - destroy
- Seed a database using AR

### Sinatra w/ ActiveRecord

- Explain the role of ActiveRecord in a web app
- Diagram the request / response lifecycle in a Sinatra app with AR
- Load Active Record in a Sinatra app
- Build RESTful routes to implement CRUD functionality in Sinatra
- Write ERB views to display AR models
- Write forms with attributes for ActiveRecord models.
- Write forms that use nested parameters
- Use `_method` param to emulate PUT and DELETE requests