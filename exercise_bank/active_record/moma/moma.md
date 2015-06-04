# MOMA App

This app will have 2 models: Artists and Paintings. An Artist has many paintings, and a Painting belongs to an Artist.

An Artist has
* name
* nationality

A Painting has
* title

###Part 1 - Database Schemas

1. Create a new database called `moma_db`.
2. Create the database tables to model Artists, Paintings, and their relationships. Save this to a file called `moma.sql`

###Part 2 - Setting up ActiveRecord

Create a Ruby program that creates an ActiveRecord interface for interacting with the artists & paintings. Save this to a file called `moma.rb`

__Do NOT create a menu in Ruby. You should be interacting with your program and ActiveRecord using `binding.pry`.__
__Do NOT use TDD.__

Populate your database (using ActiveRecord) with at least 3 Artists and 3 Paintings (associated correctly!), including Vincent Van Gogh and Pablo Picasso.

###Part 3 - ActiveRecord Practice

Write the commands that you would enter in pry to do the following:
Save the pry commands to a file called `ar_commands.txt`

1. Create a new Artist (Vincent Van Gogh) and save him to your database
2. Create a new Painting (Starry Night) and save it to your database

3. Return all Artists
4. Return all Paintings

5. Return the artist with an id of 2
6. Return the artist with a name of "Vincent Van Gogh"
7. Return all the artists who are "Spanish"

8. Return the painting with an id of 1
9. Return the painting with a name of "Guernica"

10. Return all the paintings that "Pablo Picasso" painted
11. Return the artist of "Guernica"

12. Change Vincent Van Gogh's nationality to "American"
13. Change "Starry Night" to be one of Pablo Picasso's paintings
