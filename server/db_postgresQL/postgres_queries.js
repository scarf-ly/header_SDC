const { Pool } = require('pg');
const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT;
const redisClient = redis.createClient(REDIS_PORT);

const pool = new Pool({
  user: 'janicelam',
  host: 'localhost',
  database: 'scarfly',
  // password: 'password',
});

const getRestaurantInfo = (req, res) => {
  // const data = [];
  pool.query(`SELECT * FROM restaurants WHERE restaurant_id=${req.params.id}`, (err, data1) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // data.concat(data1.rows);
      // redisClient.set((`${req.params.id}restaurant`).toString(), JSON.stringify(data1.rows));
      pool.query(`SELECT category FROM categories INNER JOIN categories_restaurants ON categories_restaurants.categories_id = categories.categories_id AND categories_restaurants.restaurant_id=${req.params.id}`, (err1, data2) => {
        if (err1) {
          res.status(500).send(err1);
        } else {
          // redisClient.set((`${req.params.id}restaurant`).toString(), JSON.stringify(data2.rows));
          pool.query(`SELECT dateStamp,star FROM reviews WHERE restaurant_id = ${req.params.id}`, (err2, data3) => {
            if (err2) {
              res.status(500).send(err2);
            } else {
              // const final = data.concat(data1.rows, data2.rows, data3.rows);
              // console.log(final)
              // redisClient.set((`${req.params.id}restaurant`).toString(), JSON.stringify(data1.rows));
              // redisClient.set((`${req.params.id}restaurant`).toString(), JSON.stringify(data2.rows));
              redisClient.set((`${req.params.id}restaurant`).toString(), JSON.stringify({ header: data1.rows, categories: data2.rows, reviews: data3.rows }));
              res.status(200).send({ header: data1.rows, categories: data2.rows, reviews: data3.rows });
            }
          });
        }
      });
    }
  });
};

const getRestaurantByCateg = (req, res) => {
  pool.query(
    `SELECT restaurant_name FROM restaurants INNER JOIN categories_restaurants
      ON categories_restaurants.restaurant_id = restaurants.restaurant_id
      AND categories_restaurants.categories_id = ${req.params.categID}
      LIMIT 100`,
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        redisClient.set((`${req.params.categID}category`).toString(), JSON.stringify(data.rows));
        res.status(200).send(data.rows);
      }
    },
  );
};

const addReview = (req, res) => {
  const query = {
    text: 'INSERT INTO reviews (restaurant_id, dateStamp, star) VALUES ($1, $2, $3)',
    values: [req.params.id, req.body.dateStamp, req.body.star],
  };
  pool.query(query, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('successfully added to db!');
    }
  });
};

const modReview = (req, res) => {
  const query = {
    text: 'UPDATE reviews SET star = $1 WHERE restaurant_id = $2 AND dateStamp::text LIKE $3',
    values: [req.body.star, req.params.id, req.body.dateStamp],
  };
  pool.query(query, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('successfully modified the db!');
    }
  });
};

const deleteCat = (req, res) => {
  const query = {
    text: 'DELETE FROM categories_restaurants WHERE restaurant_id = $1 AND categories_id = (SELECT categories_id FROM categories WHERE category LIKE $2)',
    values: [req.params.id, req.body.category],
  };
  pool.query(query, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('successfully deleted from the db!');
    }
  });
};

module.exports = {
  getRestaurantInfo,
  getRestaurantByCateg,
  addReview,
  modReview,
  deleteCat,
};
