-- TO RUN DATABASE
-- 1. npm run seed_postgres
-- 2. psql postgres -f ./server/db_postgresQL/schema.sql

DROP DATABASE IF EXISTS Scarfly;
CREATE DATABASE Scarfly;
\c Scarfly;

-- DROP SCHEMA IF EXISTS businessSchema CASCADE;
-- CREATE SCHEMA businessSchema;

CREATE TABLE restaurants (
  restaurant_id SERIAL PRIMARY KEY,
  restaurant_name VARCHAR(300), 
  claimed BOOLEAN, 
  price INTEGER,
  total_reviews INTEGER,
  avg_stars DECIMAL
);

CREATE TABLE reviews (
  reviews_id SERIAL PRIMARY KEY, 
  restaurant_id INTEGER,
  dateStamp DATE, 
  star DECIMAL
);

CREATE TABLE categories (
  categories_id INTEGER PRIMARY KEY, 
  category VARCHAR(100)
);

CREATE TABLE categories_restaurants (
  categories_restaurants_id SERIAL PRIMARY KEY, 
  restaurant_id INTEGER,
  categories_id INTEGER
);

-- Query 1
-- SELECT * FROM restaurants WHERE restaurant_id = 1;

-- Query 2
-- SELECT category FROM categories INNER JOIN categories_restaurants ON categories_restaurants.categories_id = categories.categories_id AND categories_restaurants.restaurant_id=1;

-- Query 3
-- SELECT restaurant_name FROM restaurants INNER JOIN categories_restaurants ON categories_restaurants.restaurant_id = restaurants.restaurant_id AND categories_restaurants.categories_id = 100 LIMIT 100;

-- Query 4
-- SELECT * FROM reviews WHERE restaurant_id = 1;

-- Query 5
-- INSERT INTO reviews (restaurant_id, dateStamp, star) VALUES (1, '2019-10-01', 4);

-- Query 6
-- UPDATE reviews SET star = 3 WHERE restaurant_id = 1 AND dateStamp::text LIKE '2019-01%';

-- Query 7
-- INSERT INTO categories_restaurants (restaurant_id, categories_id) VALUES (1, (SELECT categories_id FROM categories WHERE category='exercitationem'));

-- Query 8
-- DELETE FROM categories_restaurants WHERE restaurant_id = 1 AND categories_id = (SELECT categories_id FROM categories WHERE category='exercitationem');

COPY restaurants(restaurant_id, restaurant_name, claimed, price, total_reviews, avg_stars) FROM '/Users/janicelam/Hackreactor/scarfly/header/server/db_postgresQL/csv/restaurants.csv' DELIMITER ',' CSV;
COPY categories(categories_id, category) FROM '/Users/janicelam/Hackreactor/scarfly/header/server/db_postgresQL/csv/categories.csv' DELIMITER ',' CSV;
COPY categories_restaurants(restaurant_id, categories_id) FROM '/Users/janicelam/Hackreactor/scarfly/header/server/db_postgresQL/csv/join.csv' DELIMITER ',' CSV;
COPY reviews(restaurant_id, dateStamp, star) FROM '/Users/janicelam/Hackreactor/scarfly/header/server/db_postgresQL/csv/reviews.csv' DELIMITER ',' CSV;