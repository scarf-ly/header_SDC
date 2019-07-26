const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'Business',
});

const connection = client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

module.exports.connection = connection;
