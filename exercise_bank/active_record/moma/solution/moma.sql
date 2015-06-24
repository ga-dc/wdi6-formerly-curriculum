CREATE TABLE artists (
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  nationality varchar(100) NOT NULL
);

CREATE TABLE paintings (
  id serial PRIMARY KEY,
  title varchar(100) NOT NULL,
  artist_id integer REFERENCES artists(id)
);