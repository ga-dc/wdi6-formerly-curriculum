# Databases

## Objectives

### Concepts

- Explain what a database is and why you would use one as opposed to other persistent storage mechanisms
- Explain the difference between a database management system (DBMS) and a database, and name the major DBMSes
- Explain how a DBMS, a database, and SQL relate to one another
- Describe a database schema and how it relates to tables, rows and columns
- List common data types used in SQL and the related field constraints
- Protect the database from common security vulnerabilities

### Mechanics

- Create a new PostgreSQL database
- Set up a PostgreSQL database schema with a saved SQL file
- Seed a PostgreSQL database with a saved SQL file
- Execute basic SQL commands to execute CRUD actions in a database
  - CREATE/DROP DATABASE
  - CREATE/DROP TABLE
  - INSERT - Create
  - SELECT - Read
  - UPDATE - Update
  - DELETE - Destroy


## What is a database?

A database is a tool for storing data. There are many ways to store data on a
computer, such as writing to a text file, a binary file, etc. But databases
offer a number of advantages:

**Permanence** - once we write data to our database, we can be pretty sure it
won't be lost (unless the server catches on fire)

**Speed** - databases are generally optimized to be FAST at retrieving and
updating information (literally, DBs can be 100,000s of times faster than
reading from a file)

**Consistency** - Databases can enforce rules regarding consitency of data,
especially when handling simultaneous requests to update information

**Scalability** - Databases can handle a lot more request per second, and many
DBs have ways to scale to massive loads by replicating / syncing information
across multiple DBs

**Querying** - DBs make it easy to search, sort, filter, and combine related
data using a Query Language.

## What's a relational database?

The most popular type of database is a **relational** database.

Relational databases:

- Store data in tables, which have columns and rows, much like a spreadsheet
  - Tables might be `songs` and `artists`
  - Each row in `songs` represents one song
  - Each column is called an **attribute** or **field**, such as `id, `title`,
    `birth_year`
- Communicate via SQL (Structured Query Language)
- Can relate data between tables (hence the name *relational* database)
  - e.g. we can relate rows in the `songs` table to rows in the `artists` table
- We often use a `key`, which is a field that is unique for each row in a table.
  - `id` is a common key, starting at 1.

There are lots of relational databases, such as PostgreSQL, MySQL, SQLite, etc.
They are all pretty similar (use SQL), but do have different features.

PostgreSQL is the most popular open-source database for web development.

### Terminology

While this is a bit technical, it's worth clarifying some terminology:

* Database - The actual set of data being stored. We may create multiple
  databases on our computer, usually one for each application.
* Database Management System - The software that lets a user interact (query) the
  the data in a database. Examples are PostgreSQL, MySQL, MongoDB, etc.
* Database CLI - A tool offered by most DBMSs that allows us to query the
  database from the command line. For PostgreSQL, we'll use `psql`.
* NoSQL Databases - Out of scope for this lesson. Stands for "Not SQL" or
  "Not Only SQL". Store data without using tables. More like 'big buckets'.
  We'll cover these later in the course.

## Exploring Postgres

Launch `Postgres.app` if you don't see the elephant in your menu bar.

### psql commands

We'll use `psql` as our primary means of interacting with our databases.

Here's a quick demo... (probably don't need to follow along).

```sql
help # general help
\?   # help with psql commands
\h   # help with SQL commands
\l   # Lists all databases

CREATE DATABASE wdi7;
# What changed?
\l

# What happens if we don't use a semicolon?

\c wdi7 # Connect to pbj database

\d # Lists all tables

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  quote TEXT, birthday VARCHAR,
  ssn INT NOT NULL UNIQUE
);

\d

SELECT * FROM students;

INSERT INTO students (first_name, last_name) VALUES ('Robin', 'Thomas');
# This won't work!

INSERT INTO students (first_name, last_name, quote, birthday, ssn) VALUES ('Robin', 'Thomas', 'Two goldfish are in a tank. One says, "Know how to drive this thing?"', 'April 1', 8675309);
SELECT * FROM students;

UPDATE students SET first_name = 'Robert' WHERE first_name = 'Robin';
SELECT * FROM students;

DELETE FROM students WHERE first_name = 'Robin';
DELETE FROM students WHERE first_name = 'Robert';

SELECT * FROM students;

DROP TABLE students;

DROP DATABASE wdi7;

\q #quits
```

In short:
* Backslash commands (e.g. `\l` ) are commands to navigate psql.
* Everything else is SQL, to get / modify info in the current database.

### SQL Syntax

- All statements end in a semicolon
- Whitespace doesn't matter
- Uppercasing!
- [Ye olde style guide](http://leshazlewood.com/software-engineering/sql-style-guide/)

### Breakin' stuff

If you forget a closing bracket or semicolon, `\q` will get you out.

```
SELECT *

SELECT (

\q
```

## Schema

Every database (for a given program we're writing) will have one or more
**tables**. Each table stores similar data, e.g. a `songs` table, or an
`artists` table.

Each table has a **schema** which defines what columns it has, including:

* the column's name
* the column's data type
* any constraints (or rules) for that column

### Common Data Types

Here are some common data types for SQL DBs:

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

### Constraints

Constraints act as limits on the data that can go in a column.

- i.e. NOT NULL and UNIQUE
  - [And many more](http://www.postgresql.org/docs/8.1/static/ddl-constraints.html)
- Why are constraints and data types different?
  - You'd have to have INTEGERNOTNULL and INTEGER
  - Like flags for CLI commands

### Defining a Schema

We need to define a schema for our database. It can change later on if we need
to add / remove tables or columns, but we'll start with something simple.

Instead of typing this into psql, it's easier to save it into a file, and 'run'
that file.

We'll be using this as an example today:

[Library SQL Exercise](https://github.com/ga-dc/library_sql)

#### Creating our database

```bash
$ createdb library
```

#### Writing our Schema

See

#### Loading our Schema

To load our schema, we need to 'run' our `schema.sql` file. Here's how we do it:

```bash
$ psql -d library < schema.sql
```

This means: "run the psql program, connect to the database called 'library',
then run the 'schema.sql' file in that database".


### Defining a column

- `id SERIAL PRIMARY KEY`
  - `id`: column name, how we will refer to this column
  - `SERIAL` is the data type (similar to integer or string).  It's a special datatype for unique identifier columns, which the db auto-increments.
  - `PRIMARY KEY`: a special constraint which indicates a unique identifier for each row.

Take a few minutes to research the other rows.

## CRUD

- CRUD stands for the most basic interactions we want to have with any database
  - What might CRUD stand for?

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
  - [Obligatory visual aid](images/xkcd.png)
  - [Other obligatory visual aid](images/car.jpg)

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
