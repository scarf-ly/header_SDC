const faker = require('faker');
// const db = require('./index.js');
// const Business = require('./Business.js');
const fs = require('fs');
// const csvWriter = require('csv-write-stream');
const writer = fs.createWriteStream('restaurants.csv');

// const writer = csvWriter();

const makeRestaurantName = () => {
  const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen'];
  const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar'];
  let adjective = faker.hacker.adjective();
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  return `${adjective} ${foodTypes[Math.floor(Math.random() * foodTypes.length)]} ${foodPlaces[Math.floor(Math.random() * foodPlaces.length)]}`;
};

const CreateData = () => {
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = ['2015', '2016', '2017', '2018', '2019'];

  let i = 0;
  write();
  function write() {
    let ok = true;
    while (i < 10000000 && ok) {
      i += 1;
      const reviews = [];
      for (let j = 0; j < year.length; j += 1) { // Generates a random review from each month for the past 5 years
        for (let k = 0; k < month.length; k += 1) {
          reviews.push({ star: faker.random.number({ min: 1, max: 5 }), date: month[k].concat('-', faker.random.number({ min: 1, max: 28 }).toString().concat('-' , year[j])) });
        }
      }
      let average = 0;
      reviews.forEach((value) => {
        average += value.star;
      });
      const boolOptions = ['true', 'false'];
      const bool = boolOptions[Math.floor(Math.random() * 2)];

      average = Math.round((average / reviews.length) * 2) / 2;
      const restaurantName = makeRestaurantName();
      const price = faker.random.number({ min: 1, max: 4 });
      const totReviews = faker.random.number({ min: 20, max: 10000 });
      const data = `${i},${restaurantName},${bool},${price},${totReviews},${average}\n`;

      ok = writer.write(data, 'utf8');
    }
    if (i > 0) {
      writer.once('drain', write);
    }
  }
};


CreateData();
console.log('successfully seeded');
