# Ruby + MVC with Sinatra

Build an interactive web application that persists data.

## Learning Objectives

### Intro to Object-Oriented Programming in Ruby

- Define Object-Oriented Programming, and it's benefits
- Define and differentiate between classes and objects
- Create a Ruby a class with an initialize method
- Instantiate an object from a class and interact with it
- Explain the difference between local and instance variables
- Write setter and getter methods
- Describe the use of `attr_reader` / `attr_writer` / `attr_accessor`
- Write methods to define an interface to the class' behaviors

### Intermediate Object-Oriented Programming in Ruby

- Define and differentiate between class and instance methods
- Explain the use of self in Ruby
- Explain the difference between local, instance and class variables
- Define inheritance in the context of OOP
- Write a Ruby class that inherits from another
- Describe the method lookup chain in Ruby

### Sinatra && REST

- Explain what REST is and why we use it
- List the HTTP request verbs
- Describe what Sinatra is and what it is used for
- Describe the roles of WEBrick and Rack, and where they reside in the web application stack
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
- Seed a database using AR
- Utilize AR to perform the following CRUD actions on a database
  - create
  - save
  - all
  - find, find_by
  - where
  - update
  - destroy

### Sinatra w/ ActiveRecord

- Explain the role of ActiveRecord in a web app
- Load Active Record in a Sinatra app
- Build RESTful routes to implement CRUD functionality in Sinatra
- Write forms that 'wrap' ActiveRecord models.
- Write forms that use nested parameters
