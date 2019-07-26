const faker = require('faker');
// const db = require('./index.js');
// const Business = require('./Business.js');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();
const writer2 = csvWriter();

const makeRestaurantName = () => {
  const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen'];
  const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar'];
  let adjective = faker.hacker.adjective();
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  return `${adjective} ${foodTypes[Math.floor(Math.random() * foodTypes.length)]} ${foodPlaces[Math.floor(Math.random() * foodPlaces.length)]}`;
};

const createData = () => {
  writer.pipe(fs.createWriteStream('reviews.csv'));
  // writer2.pipe(fs.createWriteStream('restaurants.csv'));
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = ['2015', '2016', '2017', '2018', '2019'];
  for (let i = 1; i < 10000000; i += 1) { // Generates 100 random entries
    const reviews = [];
    for (let j = 0; j < year.length; j += 1) { // Generates a random review from each month for the past 5 years
      for (let k = 0; k < month.length; k += 1) {
        reviews.push({ star: faker.random.number({ min: 1, max: 5 }), date: month[k].concat('-', faker.random.number({ min: 1, max: 28 }).toString().concat('-' , year[j])) });
        // writer.write({
        //   restaurant_id: i,
        //   date: month[k].concat('-', faker.random.number({ min: 1, max: 28 }).toString().concat('-', year[j])),
        //   star: faker.random.number({ min: 1, max: 5 }),
        // });
      }
    }
    let average = 0;
    reviews.forEach((value) => {
      average += value.star;
    });
    average = Math.round((average / reviews.length) * 2) / 2;
    writer2.write({
      id: i,
      name: makeRestaurantName(),
      avg_stars: average,
      price: faker.random.number({ min: 1, max: 4 }),
      categories: faker.lorem.words(),
    });
    
    // console.log('done');
    // Business.create({
    //   id: i,
    //   name: makeRestaurantName(),
    //   avg_stars: average,
    //   price: faker.random.number({ min: 1, max: 4 }),
    //   categories: faker.lorem.words(),
    //   reviews,
    // }).then(() => {
    //   db.close();
    // }).catch(() => {
    //   console.log('test');
    //   db.close();
    // });
  }
  writer.end();
};

createData();

console.log('10,000,000 random entries generated');
