DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS taggings;

CREATE TABLE tags (
	id SERIAL PRIMARY KEY,
	body varchar(100) NOT NULL
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name varchar(100) NOT NULL,
	email varchar(100) NOT NULL
);

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	body varchar(100) NOT NULL,
	user_id integer NOT NULL
);

CREATE TABLE taggings (
	id SERIAL PRIMARY KEY,
	tag_id integer NOT NULL,
	post_id integer NOT NULL
);
