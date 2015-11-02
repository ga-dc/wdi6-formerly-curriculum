# Databases

## Learning Objectives

### Concepts

- Explain what a database is and why you would use one as opposed to other persistent storage mechanisms
- Explain the difference between a database management system (DBMS) and a database, and name the major DBMSes
- Explain how a DBMS, a database, and SQL relate to one another
- Describe a database schema and how it relates to tables, rows and columns
- List common data types used in SQL and the related field constraints
- Describe what a SQL injection attack is

### Mechanics

- Create a new PostgreSQL database
- Set up a PostgreSQL database schema with a saved SQL file
- Seed a PostgreSQL database with a saved SQL file
- Execute basic SQL commands to execute CRUD actions in a database

## Introduction

What's the main problem with our programs right now, in terms of user
experience?

When we quit them, any data / progress is lost! Right now, we can only store
information in memory, which is wiped when a program is quit. We definitely
need a way to fix this...

## Enter Databases

A database is a tool for storing data. There are many ways to store data on a
computer, such as writing to a text file, a binary file, etc. But databases
offer a number of advantages:

**Permanence** - once we write data to our database, we can be pretty sure it
won't be lost (unless the server catches on fire)

**Speed** - databases are generally optimized to be FAST at retrieving and
updating information (literally, DBs can be 100,000s of times faster than
reading from a file)

**Consistency** - Databases can enforce rules regarding consistency of data,
especially when handling simultaneous requests to update information

**Scalability** - Databases can handle a lot more request per second, and many
DBs have ways to scale to massive loads by replicating / syncing information
across multiple DBs

**Querying** - DBs make it easy to search, sort, filter, and combine related
data using a Query Language.

Note: There's an acronym in computer science [ACID](https://en.wikipedia.org/wiki/ACID),
which is a set of properties that ensure data is reliably stored. You can read
the wiki article for more info, but in short, a lot of the properties mentioned
above make a database ACID complient.

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

MySQL claims to be "the most popular open-source database", while PostgreSQL
claims in response to be "the most advanced open-source database". It's true
that in most tests, Postgres comes out ahead in terms of speed, and has many
features MySQL lacks, such as true full-text search, handling geo-data, etc.

If you're interested in pros and cons, check out this [article comparing MySQL,
Postgres, and SQLite](https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems).

### Terminology

While this is a bit technical, it's worth clarifying some terminology:

* Database - The actual set of data being stored. We may create multiple
  databases on our computer, usually one for each application.
* Database Management System - The software that lets a user interact (query)
  the data in a database. Examples are PostgreSQL, MySQL, MongoDB, etc.
* Database CLI - A tool offered by most DBMSs that allows us to query the
  database from the command line. For PostgreSQL, we'll use `psql`.
* NoSQL Databases - Out of scope for this lesson. Stands for "Not SQL" or
  "Not Only SQL". Store data without using tables. More like 'big buckets'.
  We'll cover these later in the course.

## Exploring Postgres

Launch `Postgres.app` if you don't see the elephant in your menu bar.

### psql commands

We'll use `psql` as our primary means of interacting with our databases. Later
on we'll use ruby or server-side JS programs to do so in our programs.

Here's a quick demo... (probably don't need to follow along).

```sql
help -- general help
\?   -- help with psql commands
\h   -- help with SQL commands
\l   -- Lists all databases

CREATE DATABASE wdi7;
# What changed?
\l

-- What happens if we don't use a semicolon?

\c wdi7 -- Connect to wdi7 database

\d -- Lists all tables

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  quote TEXT,
  birthday VARCHAR,
  ssn INT NOT NULL UNIQUE
);

\d

SELECT * FROM students;

INSERT INTO students (first_name, last_name) VALUES ('Robin', 'Thomas');
-- This won't work!

INSERT INTO students (first_name, last_name, quote, birthday, ssn) VALUES ('Robin', 'Thomas', 'Two goldfish are in a tank. One says, "Know how to drive this thing?"', 'April 1', 8675309);
SELECT * FROM students;

UPDATE students SET first_name = 'Robert' WHERE first_name = 'Robin';
SELECT * FROM students;

DELETE FROM students WHERE first_name = 'Robin';
DELETE FROM students WHERE first_name = 'Robert';

SELECT * FROM students;

DROP TABLE students;

DROP DATABASE wdi7;

\q --quits
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

Note that we're *NOT* writing a ruby (`.rb`) file, but a SQL `.sql` file.

#### Creating our database

```bash
$ createdb library
```

Note that this is a command-line utility that ships with Postgres, as an
alternate to using the SQL command `CREATE DATABASE library;` inside `psql`.

#### Writing our Schema

See the [schema file](https://github.com/ga-dc/library_sql/blob/master/schema.sql)
for a final version.


- `id SERIAL PRIMARY KEY`
  - `id`: column name, how we will refer to this column
  - `SERIAL` is the data type (similar to integer or string).  It's a special datatype for unique identifier columns, which the db auto-increments.
  - `PRIMARY KEY`: a special constraint which indicates a unique identifier for each row.

Take a few minutes to research the other rows.


#### Loading our Schema

To load our schema, we need to 'run' our `schema.sql` file. Here's how we do it:

```bash
$ psql -d library < schema.sql
```

This means: "run the psql program, connect to the database called 'library',
then run the 'schema.sql' file in that database".

#### Loading a Seed File

I've provided a sql file that adds sample data into our `library` database.

Load that in so we can practice interacting with our data:

```bash
$ psql -d library < seed.sql
```

## Performing 'CRUD' actions with SQL

CRUD stands for the most basic interactions we want to have with any database,
create, read, update, destroy (aka delete).

The most common SQL commands correspond to these 4 actions:

* INSERT -> Create a row
* SELECT -> Read / get information for rows
* UPDATE -> Update a row
* DELETE -> Destroy a row

### INSERT

`INSERT` adds a row to a table:

```sql
INSERT INTO authors(name, nationality, birth_year) VALUES ('Adam Bray', 'United States of America', 1985);
```

### SELECT

`SELECT` returns rows from a table:

```sql
-- select all columns from all rows
SELECT * FROM authors;

-- select only some columns, from all rows
SELECT name, birth_year FROM authors;

-- select rows that meet certain criteria
SELECT * FROM authors WHERE name = 'James Baldwin';
```

### UPDATE

`UPDATE` updates values for one or more rows:

```sql
UPDATE authors SET name = 'Adam B.', birth_year = 1986 WHERE name = 'Adam Bray';
```

### DELETE

`DELETE` removes rows from a table:

```sql
DELETE FROM authors WHERE name = 'Adam B.';
```

## Exercise!

Complete the queries in `basic_queries.sql` in the library_sql repo.

## Putting it with Ruby

```ruby
require "pg"
connection = PG.connect(:hostaddr => "127.0.0.1", :port => 5432, :dbname => "library")
author_results = connection.exec("SELECT * FROM authors")

# results is an array of rows, each row is effectively a hash

author_results.each do |author|
  puts author["name"] + " " + author["birth_year"]
end
```

## Security!

- What security holes do you see here?
  - Let's say I want to update the database with something a user writes into their computer...
  - They could pretty easily make my code execute a DROP TABLE or something.
  - SQL injection
  - [Obligatory visual aid](images/xkcd.png)
  - [Other obligatory visual aid](images/car.jpg)

```ruby
connection.prepare('insert_student_statement', 'INSERT INTO authors (name, nationality, birth_year) VALUES ($1, $2, $3)')
connection.exec_prepared('insert_student_statement', [ 'Jesse Shawl', 'Mars', 2001])
```

When we get to Rails, we'll see it helps protect us from these attacks, but we
still need to be mindful.

For more info here are some article on SQL injection:

* [SQLi in Rails](http://rails-sqli.org)
* [SQL Injection (SQLi)](https://www.acunetix.com/websitesecurity/sql-injection/)
* [SQL Injection Cheat Sheet](http://www.veracode.com/security/sql-injection)
