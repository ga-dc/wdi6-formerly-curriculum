# Nightclub

We all know that night clubs are foolishly exclusive. Let's build a model to handle all of that pretentious validation before letting records into our database. We'll build a `Clubber` model with the following validations:

**class Clubber < ActiveRecord::Base**

* Clubber name has to be at least two letters.
* Clubber age must be over 21, but below 40!
* Clubber gender may only be set as `"f"` or `"m"`.
* A new male Clubber cannot be created unless there's a 2:1 ratio of females to males currently within the nightclub database.

## 1. Database

In the PG console, create a new database called "nightclub". Connect to the database (`\c nightclub`), and then paste in the table schema from `lib/nightclub.sql` (or import it!)

## 2. Modeling

Run Rspec on the specs directory… there will be some failing AND passing tests *(the tests are specifically written to test validations, so may pass by default without constraints)*. First make all model specs pass using validation methods!

## 3. REPL App

Build out a REPL app that allows you to add and remove clubbers in the database. Start with the framework established in `main.rb`. When adding clubbers, be sure to print out error messages if validation fails while creating a record!