DROP TABLE IF EXISTS drinks;
DROP TABLE IF EXISTS foods;
DROP TABLE IF EXISTS fridges;

CREATE TABLE fridges (
  id serial PRIMARY KEY,
  location varchar(50) NOT NULL,
  brand varchar(50) NOT NULL,
  size integer NOT NULL
);

CREATE TABLE foods (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  weight integer NOT NULL,
  is_vegan boolean,
  enter_time timestamp,
  fridge_id integer REFERENCES fridges(id)
);

CREATE TABLE drinks (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  size integer NOT NULL,
  is_alcoholic boolean,
  fridge_id integer REFERENCES fridges(id)
);
