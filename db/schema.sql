DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS ladders CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL, 
  name VARCHAR(255) NOT NULL, 
  email VARCHAR(255) NOT NULL, 
  password VARCHAR(255) NOT NULL
);

CREATE TABLE ladders(
  id SERIAL PRIMARY KEY NOT NULL,
  last_requested TIMESTAMP,
  rankings JSON
);

CREATE TABLE characters(
  id SERIAL PRIMARY KEY NOT NULL, 
  items JSON,
  ladder_id INTEGER REFERENCES ladders(id) ON DELETE CASCADE,
  last_requested TIMESTAMP
);

CREATE TABLE favourites(
  id SERIAL PRIMARY KEY NOT NULL, 
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE
);