const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');

// const responseTime = require('response-time')
const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT;
const redisClient = redis.createClient(REDIS_PORT);

const app = express();
const port = 3003;
const path = require('path');
const db = require('./db_postgresQL/postgres_queries');
app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.use(bodyParser.json());

redisClient.on('error', (err) => {
  console.log("Error " + err);
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

const cacheRestaurantInfo = (req, res, next) => {
  const { id } = req.params;
  redisClient.get((`${id}restaurant`).toString(), (err, data) => {
    if (data != null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

const cacheRestaurantByCateg = (req, res, next) => {
  const { categID } = req.params;
  redisClient.get((`${categID}category`).toString(), (err, data) => {
    if (data != null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

// const cacheAddReview = () => {

// }

app.get('/:id/header', cacheRestaurantInfo, db.getRestaurantInfo);
app.get('/:id/:categID', cacheRestaurantByCateg, db.getRestaurantByCateg);
app.post('/:id/header/review', db.addReview);
app.patch('/:id/header/review', db.modReview);
app.delete('/:id/header`', db.deleteCat);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
