# Databases

## Objectives

- Create an SQL database, in PostgreSQL, containing tables, that is saved locally
- Distinguish between keys, foreign keys, and indexes
- Describe the data types used in SQL and the related field constraints
- Execute CRUD actions on the database using "pure" SQL (psql)
- Ensure the database is DRY using normalization
- Protect the database from common security vulnerabilities
- Use different JOIN types to combine data

## What is a database?

- A collection of tables representing data as columns and rows
  - A lot like an Excel workbook
- Communicate via SQL
  - Many types of DBs, but generally all use similar SQL syntax
  - PGSQL, MySQL, SQLite, Microsoft SQL, Oracle...

## What's a relational database?

  A collection of tables which store data.  With a mechanism for relating one table to another.
  - Each table is comprised of rows and columns (like a spreadsheet)
  - The table of `classes` is related to the table of `students`
- Column = Field = Attribute
  - Attribute sound familiar?
- Rows = Records = Tuples
  - Each row may represent an object, like each student in a a class or each car on a lot
- Key
  - A unique value each record has that you can use to find the record
  - There aren't really "row numbers" in PSQL
    - Primary keys are the closest thing
    - Keys and primary keys are different
    - The way SQL **indexes** things

### Relationship types
  - One-to-one
  - One-to-many
  - Many-to-many
  - **Get some examples!**

## Data types

- Have to tell the database what kind of data to allow in which cells
  - Boolean
  - Integer
  - Float
  - Text / VARCHAR
    - VARCHAR is short, TEXT is long
    - VARCHAR is "CHARACTER VARYING"
  - NULL
  - Date
  - Time
  - [And many more](http://www.postgresql.org/docs/9.3/interactive/datatype.html)

## Constraints
  - i.e. NOT NULL and UNIQUE
    - [And many more](http://www.postgresql.org/docs/8.1/static/ddl-constraints.html)
  - Why are constraints and data types different?
    - You'd have to have INTEGERNOTNULL and INTEGER
    - Like flags for CLI commands

## Syntax

  - All statements end in a semicolon
    - I will probably forget to use these, so please help!
  - Whitespace doesn't matter
  - Uppercasing!
  - [Ye style guide](http://leshazlewood.com/software-engineering/sql-style-guide/)

## Getting PGSQL

  - Mac: http://postgresapp.com/
    - Download
    - Move it to `/Applications`
    - We want to use it from the command line, so we add it to the search path.
      - `$ atom ~/.bash_profile`
      - Add this line:
     `export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/9.4/bin`
     - save and close.
     - Update your terminal.
    - Then open the app and click "Open psql"
  - Linux
    - `apt-get install postgresql-9.4`
  - All
    - Verify your installation, by running `psql` in your terminal.  You should see:

```
$ psql
psql (9.4.4)
Type "help" for help.

matt=#
```  

### Common Mistake

If you see this when your run `psql`, you have not started the PostgresApp first.

```
$ psql
psql: could not connect to server: No such file or directory
	Is the server running locally and accepting
	connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```


## Play with these commands

```
\l
# Lists all databases

CREATE DATABASE pbj;
\l
# What changed?
# What happens if we don't use a semicolon?

\c pbj
# What might C stand for?

\d
# Lists all tables

\?
# Shows available commands if you get stuck
```

```
CREATE TABLE students ( id SERIAL PRIMARY KEY, first_name VARCHAR NOT NULL, last_name VARCHAR NOT NULL, quote TEXT, birthday VARCHAR, ssn INT NOT NULL UNIQUE );
\d
SELECT * FROM students;
```

## A SQL Command
- What are different components?
  - CREATE TABLE: command to define a new table
  - followed by a list of the columns in the table

```
id SERIAL PRIMARY KEY
first_name VARCHAR NOT NULL
last_name VARCHAR NOT NULL
quote TEXT
birthday VARCHAR
ssn INT NOT NULL UNIQUE
```

---

### Defining a column

- `id SERIAL PRIMARY KEY`
  - `id`: column name, how we will refer to this column
  - `SERIAL` is the data type (similar to integer or string).  It's a special datatype for unique identifier columns, which the db auto-increments.
  - `PRIMARY KEY`: a special constraint which indicates a unique identifier for each row.

Take a few minutes to research the other rows.


## Breakin' stuff

```
SELECT *

SELECT (

\q
```

## CRUD

- CRUD stands for the most basic interactions we want to have with any database
  - What might CRUD stand for?

```
SELECT * FROM students;
# What does it do?
# What does * stand for?

INSERT INTO students (first_name, last_name) VALUES ('Robin', 'Thomas');
# This won't work!

INSERT INTO students (first_name, last_name, quote, birthday, ssn) VALUES ('Robin', 'Thomas', 'Two goldfish are in a tank. One says, "Know how to drive this thing?"', 'April 1', 8675309);
SELECT * FROM students;

UPDATE students SET first_name = 'Robert' WHERE first_name = 'Robin';
SELECT * FROM students;

DELETE FROM students WHERE first_name = 'Robin';
SELECT * FROM students;

DROP TABLE students;

DROP DATABASE pbj;
```

## Where's all this data stored, anyway?

- Look in PostgresApp preferences.  You should see `~/Library/Application\ Support/Postgres/var-9.4`.  Let's take a look in there.
- We see `postgres-server.log`
- Check out a file within `global/`. What is THAT?
  - This is binary (not text) data, spread out across multiple files
- [More info](http://www.postgresql.org/docs/9.0/static/storage-file-layout.html)


## Exercise!

- Create authors
author:
  first_name (required),
  last_name (required),
  pen_name (optional),
  birthdate (optional)

First, let's nail down the data types.
Then, insert some data.


## And then...


Control the results:

```
SELECT * from authors;

SELECT * FROM authors ORDER BY first_name ASC;

SELECT last_name, first_name FROM authors ORDER BY last_name DESC;

# by length of last_name
SELECT * FROM books WHERE CHAR_LENGTH(last_name) < 8;

# Limit what is returned
SELECT last_name FROM authors WHERE CHAR_LENGTH(last_name) > 8;

# Select an author by first letter
SELECT * FROM authors WHERE first_name LIKE  'R%';
# % is a wildcard (like "*")

# old enough to drive?
# birthday > ???

```

It's important to note that you haven't changed anything.  These are read-only views into the data.

## Putting it with Ruby

```
require "pg"
connection = PG.connect(:hostaddr => "127.0.0.1", :port => 5432, :dbname => "pbj")
results = connection.exec("SELECT * FROM authors")

#Does NOT return a hash!

results.each do |item|
  puts item
end
```

## Sekurrity!
- What security holes do you see here?
  - Let's say I want to update the database with something a user writes into their computer...
  - They could pretty easily make my code execute a DROP TABLE or something.
  - SQL injection
  - [Obligatory visual aid](xkcd.png)
  - [Other obligatory visual aid](car.jpg)

```
connection.prepare('insert_student_statement', 'INSERT INTO authors (first_name, last_name, pen_name) values ($1, $2, $3, $4, $5)')
connection.exec_prepared('insert_student_statement', [ 'J.K.', 'Rowling', 'Robert Gailbraith', "1965/07/31"])
```

## Joins

Add books!
books: title, published_at

Then fill it in.  Don't forget the relationship to author.

Bonus: Try it with Ruby.


## Joins

- Inner Join
  - Combines records that match both sides
- Left/Right Join
  - Combines records of one side with matching record from other side, and fills in null for remaining
- Outer join
  - Combines all records of both sides with matching record from other side, and fills in null for remaining.

- Huh?
  - Try it yourself

```
SELECT * FROM books INNER JOIN books ON (books.author_id = author.id);

SELECT * FROM authors INNER JOIN books ON (books.author_id = author.id);

SELECT authors.*, book.title FROM authors INNER JOIN books ON (books.author_id = author.id);

SELECT authors.*, books.*
FROM authors
LEFT OUTER JOIN books
ON (books.author_id = author.id);

SELECT authors.*, books.*
FROM authors
LEFT JOIN books
ON (books.author_id = author.id);
```

http://blog.codinghorror.com/a-visual-explanation-of-sql-joins/

### Non-relational database (No SQL)
- A non-relational databse is like a hash
  - A collection of key / value pairs
  - Don't need follow the same schema
    - i.e. There aren't column headers defining what everything in the 3rd column is
- Different ways of naming things
  - Table = Relation
    - Confusing, because it SHOWS relations, isn't a relation itself

## Homework

none
