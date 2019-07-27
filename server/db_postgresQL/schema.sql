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
  reviews_id SERIAL PRIMARY KEY, 
  restaurant_id INTEGER,
  dateStamp DATE, 
  star DECIMAL
);

CREATE TABLE businessSchema.categories (
  categories_id INTEGER PRIMARY KEY, 
  category VARCHAR(100)
);

CREATE TABLE businessSchema.categories_restaurants (
  categories_restaurants_id SERIAL PRIMARY KEY, 
  restaurant_id INTEGER,
  categories_id INTEGER
);
