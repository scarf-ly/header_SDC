CREATE KEYSPACE IF NOT EXISTS scarfly WITH replication = {'class':'SimpleStrategy', 'replication_factor' :1};
USE scarfly;

-- QUERY: SELECT * FROM restaurants WHERE restaurant_id = query_id
-- cassandra command ALTER TABLE person ADD email text;
CREATE TABLE restaurants (
  restaurant_id INT,
  restaurant_name TEXT STATIC, 
  claimed BOOLEAN STATIC, 
  price INT STATIC,
  total_reviews INT STATIC,
  avg_stars DECIMAL STATIC, 
  PRIMARY KEY (restaurant_id)
);

 -- OPTIONAL: ONE LARGER TABLE WITH THE CATEGORIES INCLUDE AS WELL
--  CREATE TABLE restaurantsLarger (
--   restaurant_id INT,
--   restaurant_name TEXT, 
--   claimed BOOLEAN, 
--   price INT,
--   total_reviews INT,
--   avg_stars DECIMAL, 
--   category TEXT,
--   PRIMARY KEY (restaurant_id, category)
-- );

 --QUERY: SELECT * FROM reviews WHERE restaurant_id = query_id
 --QUERY: To modify a certain review --> MODIFY * FROM reviews where reviews_id = query_ic
CREATE TABLE reviews (
  reviews_id INT,
  restaurant_id INT, 
  dateStamp DATE, 
  stars INT,
  PRIMARY KEY (restaurant_id, reviews_id)
);

-- we want to show all categories that belong to a restaurant
--QUERY: SELECT category FROM categories_restaurants WHERE restaurant_id = 1; MAYBE TAKE THIS OUT IF USING LARGER TABLE
CREATE TABLE category_restaurants (
  restaurant_id INT,
  category_id INT,
  category TEXT,
  PRIMARY KEY (restaurant_id, category_id)
);

-- want to show all restaurants in a certain category
-- QUERY: SELECT restaurant_name FROM restaurants_categories WHERE categories_id = 1;
CREATE TABLE restaurants_category (
  category_id INT, 
  restaurant_id INT,
  restaurant_name TEXT,
  PRIMARY KEY (category_id, restaurant_id)
);

-- Query 1
-- SELECT * FROM restaurants WHERE restaurant_id = 1;

-- Query 2
-- SELECT category FROM category_restaurants WHERE restaurant_id=1;

-- Query 3
-- SELECT restaurant_name FROM restaurants_category WHERE category_id = 100 LIMIT 100;

-- Query 4 
-- SELECT * FROM reviews WHERE restaurant_id = 1;

-- Query 5
-- UPDATE reviews SET dateStamp='2019-07-23', stars=5 WHERE restaurant_id=1 and reviews_id=600000123;

-- Query 6
-- UPDATE reviews SET stars=3 WHERE restaurant_id=1 AND reviews_id=599999941;

-- Query 7 add a category for a restaurant //revise restaurnat ID and include an ID set to UUID
-- UPDATE category_restaurants SET category ='exercitationem' WHERE restaurant_id=1 and category_id=890;

-- Query 8 delete a category from a rest
-- DELETE FROM category_restaurants WHERE restaurant_id=1 AND category_id=26;

copy restaurants (restaurant_id, restaurant_name, claimed, price, total_reviews, avg_stars) FROM '/Users/janicelam/Hackreactor/scarfly/header/server/db_cassandra/csv/restaurants.csv';
copy category_restaurants (restaurant_id, category_id, category) FROM '/Users/janicelam/Hackreactor/scarfly/header/server/db_cassandra/csv/joinCategory.csv';
copy reviews (reviews_id, restaurant_id, dateStamp, stars) FROM '/Users/janicelam/Hackreactor/scarfly/header/server/db_cassandra/csv/reviews.csv';
-- copy restaurantsLarger (restaurant_id, restaurant_name, claimed, price, total_reviews, avg_stars, category) FROM '/Users/janicelam/Hackreactor/scarfly/header/server/db_cassandra/csv/restaurantsLarger.csv';
-- copy all_restaurants (restaurant_id, restaurant_name, claimed, price, total_reviews, avg_stars, ratings_id, ratings_date, rating_stars, category_id, category) FROM '/Users/janicelam/Hackreactor/scarfly/header/server/db_cassandra/csv/restaurantsLarger2.csv';
copy restaurants_category (category_id, restaurant_id, restaurant_name) FROM '/Users/janicelam/Hackreactor/scarfly/header/server/db_cassandra/csv/joinRestaurant.csv';
