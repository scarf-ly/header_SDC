DROP DATABASE IF EXISTS Business;
CREATE DATABASE Business;

DROP SCHEMA IF EXISTS businessSchema CASCADE;
CREATE SCHEMA businessSchema;

CREATE TABLE businessSchema.restaurants (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(300),
  avg_stars INTEGER, 
  price INTEGER, 
  categories VARCHAR(500)
);

CREATE TABLE businessSchema.reviews (
  id INTEGER NOT NULL PRIMARY KEY, 
  item_id
  "date" date, 
  star INTEGER
)
