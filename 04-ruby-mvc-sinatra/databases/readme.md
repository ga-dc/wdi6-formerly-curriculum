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
CREATE TABLE students ( id SERIAL PRIMARY KEY, first_name VARCHAR NOT NULL, last_name VARCHAR NOT NULL, quote TEXT NOT NULL, birthday VARCHAR NOT NULL, ssn INT NOT NULL UNIQUE );
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
quote TEXT NOT NULL
birthday VARCHAR NOT NULL
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

INSERT INTO students (first_name, last_name, quote, birthday, ssn) VALUES ('Robin', 'Thomas', 'Two goldfish are in a tank. One says, "Know how to drive this thing?", 'April 1', 8675309);
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

- Enter all students into your database!

## And then...

```
SELECT * FROM students WHERE CHAR_LENGTH(quote) > 100;

SELECT quote FROM students WHERE CHAR_LENGTH(quote) > 100;

SELECT * FROM students WHERE SUBSTRING(first_name from 1 for 1) = 'R';
# Dat index tho.

SELECT * FROM students ORDER BY first_name ASC;

SELECT * FROM students ORDER BY first_name DESC;
```

## Putting it with Ruby

```
require "pg"
connection = PG.connect(:hostaddr => "127.0.0.1", :port => 5432, :dbname => "pbj")
results = connection.exec("SELECT * FROM students")

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
connection.prepare('insert_student_statement', 'INSERT INTO students (first_name, last_name, quote, birthday, ssn) values ($1, $2, $3, $4, $5)')
connection.exec_prepared('insert_student_statement', [ 'Jesse', 'Shawl', 'I like turtles.', 'Febtemper 32nd', 1234567])
```

## Pre-Joins

First, add in a new column to the table

```
ALTER TABLE students ADD COLUMN gender VARCHAR(1);
# What does VARCHAR(1) do?
```

Then fill it in.
- Instead of writing `UPDATE (blah blah blah)` a bunch of times, try doing it in Ruby!

```
require "pg"
connection = PG.connect(:hostaddr => "127.0.0.1", :port => 5432, :dbname => "pbj")
students = connection.exec("SELECT * FROM students");
students.each do |student|
  first_name = student["first_name"]
  if ["Brittany","Janice","Julia","Haleigh","Sarah","Gwen","Lindsay"].include? first_name
    gender = "f"
  else
    gender = "m"
  end
  connection.exec("UPDATE students SET gender = '#{gender}' WHERE first_name = '#{first_name}'")
end
```

Then split the table in half.
```
CREATE TABLE students2 AS SELECT * FROM students WHERE (random() < .5);
```

## Actual Joins

- Inner Join
  - Combines records that match both sides
- Left/Right Join
  - Combines records of one side with matching record from other side, and fills in null for remaining
- Outer join
  - Combines all records of both sides with matching record from other side, and fills in null for remaining.

- Huh?
  - Try it yourself

```
SELECT * FROM students INNER JOIN students2 ON (students.gender = students2.gender);

SELECT * FROM students LEFT OUTER JOIN students2 ON (students.gender = students2.gender);

SELECT * FROM students LEFT JOIN students2 ON (students.gender = students2.gender);
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

https://github.com/ga-dc/nba_stats
