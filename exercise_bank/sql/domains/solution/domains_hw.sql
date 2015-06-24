---------------------------
------- Travel Log ----------
---------------------------

CREATE TABLE locations (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL
);

CREATE TABLE entries (
  id serial PRIMARY KEY,
  entry_date date NOT NULL,
  entry_text text NOT NULL
  location_id integer REFERENCES locations(id)
);

---------------------------
------ Photographer --------
---------------------------

CREATE TABLE clients (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL
);

CREATE TABLE albums (
  id serial PRIMARY KEY,
  event_name varchar(50) NOT NULL
  album_date date,
  client_id integer REFERENCES clients(id)
);

CREATE TABLE photographs (
  id serial PRIMARY KEY,
  photo_url varchar(50) NOT NULL,
  album_id integer REFERENCES albums(id)
);

---------------------------
------ Figure Skating --------
---------------------------

CREATE TABLE judges (
  id serial PRIMARY KEY,
  judge_name varchar(50) NOT NULL
);

CREATE TABLE scores (
  id serial PRIMARY KEY,
  score integer NOT NULL
  judge_id integer REFERENCES judges(id) NOT NULL,
  skater_id integer REFERENCES skaters(id) NOT NULL
);

CREATE TABLE skaters (
  id serial PRIMARY KEY,
  skater_name varchar(50) NOT NULL
);

---------------------------
-------- Snapchat ---------
---------------------------

CREATE TABLE users (
  id serial PRIMARY KEY,
  username varchar(50) NOT NULL,
);

CREATE TABLE friendships (
  id serial PRIMARY KEY,
  user_id integer REFERENCES users(id),
  friend_id integer REFERENCES users(id)
);

CREATE TABLE snaps (
  id serial PRIMARY KEY,
  photo_url varchar(50) NOT NULL,
  length integer NOT NULL,
  sender_id integer REFERENCES users(id),
  receiver_id integer REFERENCES users(id)
);

---------------------------
-------- Jeopardy ---------
---------------------------

CREATE TABLE episodes (
  id serial PRIMARY KEY,
  air_date DATETIME NOT NULL
);

CREATE TABLE rounds (
  id serial PRIMARY KEY,
  type varchar(15) NOT NULL,
  episode_id INTEGER references episodes(id)
);

CREATE TABLE categories (
  id serial PRIMARY KEY,
  title varchar(30) NOT NULL,
  board_column_index INTEGER NOT NULL,
  round_id INTEGER references rounds(id)
);

CREATE TABLE questions (
  id serial PRIMARY KEY,
  question_text VARCHAR(255) NOT NULL,
  category_id integer references categories(id)
);

CREATE TABLE contestants (
  id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  factoid VARCHAR(255) NOT NULL
);

CREATE TABLE contestants_episodes (
  contestant_id INTEGER references contestants(id),
  episode_id INTEGER references episodes(id)
);

CREATE TABLE responses (
  id serial PRIMARY KEY,
  response_text VARCHAR(255) NOT NULL,
  buzzer_time_in_sec FLOAT(2) NOT NULL,
  correct BOOLEAN NOT NULL,
  question_id INTEGER references questions(id),
  contestant_id INTEGER references contestants(id)
);



