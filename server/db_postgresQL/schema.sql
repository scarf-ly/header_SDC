DROP DATABASE IF EXISTS Business;
CREATE DATABASE Business;

DROP SCHEMA IF EXISTS businessSchema CASCADE;
CREATE SCHEMA businessSchema;

CREATE TABLE businessSchema.restaurants (
  restaurant_id SERIAL PRIMARY KEY,
  name VARCHAR(300), 
  claimed BOOLEAN, 
  price INTEGER,
  total_reviews INTEGER,
  avg_stars DECIMAL
);

CREATE TABLE businessSchema.reviews (
  reviews_id INTEGER NOT NULL PRIMARY KEY, 
  restaurant_id INTEGER REFERENCES businessSchema.restaurants(restaurant_id),
  dateStamp DATE, 
  star DECIMAL
);

CREATE TABLE businessSchema.categories (
  categories_id INTEGER NOT NULL PRIMARY KEY, 
  category VARCHAR(100)
);

CREATE TABLE businessSchema.categories_restaurants (
  categories_restaurants_id INTEGER NOT NULL PRIMARY KEY, 
  restaurant_id INTEGER REFERENCES businessSchema.restaurants(restaurant_id) ON UPDATE CASCADE,
  categories_id INTEGER REFERENCES businessSchema.categories(categories_id) ON UPDATE CASCADE ON DELETE CASCADE
);