# Learning Objectives - Week 4 - Ruby + MVC with Sinatra

Build an interactive web application that persists data.

## Ruby Basics

- Compare/contrast Ruby and Javascript as programming languages.
- Run Ruby code by REPL (Pry/Irb) and file.
- Identify specific differences between Ruby and Javascript in the following areas...
  - Syntax
  - Variables
  - Fundamental Data Types
  - Data Collections
  - Conditionals
  - Methods (Functions)
- Examine Ruby symbols and data immutability.
- List three useful methods for arrays and hashes.
- Demonstrate how variables are stored in memory using Ruby.
- Use "!" to modify values in memory.

## Ruby Enumerables

- Review Ruby arrays and hashes
- Use Ruby loops to iterate over code blocks.
- Define what a Ruby enumerable method is.
- Identify useful Ruby enumerables, including `.each`, `.map` and `.select`.
- Use enumerables to traverse, sort and modify collections.

## Object-Oriented Programming in Ruby: Part 1

- Define Object-Oriented Programming, and its benefits
- Define and differentiate between classes and objects
- Create a Ruby class with an initialize method
- Instantiate an object from a class and interact with it
- Use `binding.pry` to play with code live
- Explain the difference between local and instance variables
- Write setter and getter methods
- Describe the use of `attr_reader` / `attr_writer` / `attr_accessor`
- Write methods to define an interface to the class' behaviors
- Describe how OOP supports encapsulation and abstraction

## Object-Oriented Programming in Ruby: Part 2

- Explain the use of self in Ruby
- Explain the difference between local, instance and class variables
- Define and differentiate between class and instance methods
- Define inheritance in the context of OOP
- Write a Ruby class that inherits from another

## Domain Modeling/ERDs

- Draw an Entity Relationship Diagram (ERD) using proper notation
- Identify and diagram a one-to-one, one-to-many, many-to-many relationship between data entities (physical/virtual)
- Distinguish between entities & attributes (and when you should use one over the other)
- Discuss data normalization needs and techniques

## Relational Databases/SQL

- Explain what a database is and why you would use one as opposed to other persistent storage mechanisms
- Explain the difference between a database management system (DBMS) and a database, and name the major DBMSes
- Explain how a DBMS, a database, and SQL relate to one another
- Describe a database schema and how it relates to tables, rows and columns
- List common data types used in SQL and the related field constraints
- Describe what a SQL injection attack is
- Create a new PostgreSQL database
- Set up a PostgreSQL database schema with a saved SQL file
- Seed a PostgreSQL database with a saved SQL file
- Execute basic SQL commands to execute CRUD actions in a database
- Define what a foreign key is
- Describe how to represent a one-to-many relationship in SQL database
- Explain how to represent one-to-one and many-to-many relationships in a SQL DB
- Distinguish between keys, foreign keys, and indexes
- Describe the purpose of the JOIN
- Use JOIN to combine tables in a SELECT
- Describe what it means for a database to be normalized

## Sinatra && REST

- Explain what REST is and why we use it
- List the HTTP request verbs
- Describe what Sinatra is and what it is used for
- Distinguish between a route and a path
- Build a Sinatra app that responds to HTTP requests
- Define routes using Sinatra
- Define routes with URL parameters and access those parameters
- Use erb to create reusable views and templates
- Access data from global params hash
- Use a global template - layout.erb
- Use forms to submit POST and GET requests

## ActiveRecord
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

## Sinatra && ActiveRecord

- Explain the role of ActiveRecord in a web app
- Diagram the request / response lifecycle in a Sinatra app with AR
- Load Active Record in a Sinatra app
- Build RESTful routes to implement CRUD functionality in Sinatra
- Write ERB views to display AR models
- Write forms with attributes for ActiveRecord models
- Write forms that use a 'namespace' for parameters
- Use `_method` param to emulate PUT and DELETE requests
