const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/munch';
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const businessSchema = new mongoose.Schema({
  id: String,
  name: String,
  avg_stars: Number,
  price: Number,
  categories: String,
  reviews: [{
    star: Number,
    date: { type: Date, default: Date.now },
  }],
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
