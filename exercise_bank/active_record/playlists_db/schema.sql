DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS users;

CREATE TABLE songs (
	id SERIAL PRIMARY KEY,
	title varchar(100) NOT NULL,
	artist varchar(100) NOT NULL
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email varchar(100) NOT NULL
);

CREATE TABLE playlists (
	id SERIAL PRIMARY KEY,
	title varchar(100) NOT NULL,
	user_id integer NOT NULL,
	song_id integer NOT NULL
);