CREATE KEYSPACE IF NOT EXISTS Business;
USE Business;

-- QUERY: SELECT * FROM restaurants WHERE restaurant_id = query_id
-- cassandra command ALTER TABLE person ADD email text;
CREATE TABLE IF NOT EXISTS restaurants (
  restaurant_id INT,
  name TEXT, 
  claimed BOOLEAN, 
  price INT,
  total_stars
  avg_stars DECIMAL, 
  categories frozen<categories>,
  PRIMARY KEY (restaurant_id)
)

CREATE TYPE categories (
);

 --QUERY: SELECT * FROM reviews WHERE restaurant_id = query_id
 --QUERY: To modify a certain review --> MODIFY * FROM reviews where reviews_id = query_ic
CREATE TABLE IF NOT EXISTS reviews (
  reviews_id INT,
  restaurant_id INT, 
  dateValue DATE, 
  PRIMARY KEY (restaurant_id, reviews_id)
)

-- if we want to show all of the restaurants within a certain category
--QUERY: SELECT * FROM categories WHERE restaurant_id = query_rest_id && 
CREATE TABLE IF NOT EXISTS categories (
  categories_id INT,
  restaurant_id INT,
  category TEXT,
  PRIMARY KEY (categories_id)
)