const faker = require('faker');
const fs = require('fs');
const path = require('path');

let reviewsCounter = 0;
const cassandraCateg = [];

const writerRestaurants = fs.createWriteStream(path.join(__dirname, './csv/restaurants.csv'));
const writerReviews = fs.createWriteStream(path.join(__dirname, './csv/reviews.csv'));
const writerJoinCategory = fs.createWriteStream(path.join(__dirname, './csv/joinCategory.csv'));
const writerJoinRestaurant = fs.createWriteStream(path.join(__dirname, './csv/joinRestaurant.csv'));

const makeRestaurantName = () => {
  const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen'];
  const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar'];
  let adjective = faker.hacker.adjective();
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  return `${adjective} ${foodTypes[Math.floor(Math.random() * foodTypes.length)]} ${foodPlaces[Math.floor(Math.random() * foodPlaces.length)]}`;
};

const CreateData = (i) => {
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = ['2015', '2016', '2017', '2018', '2019'];

  const reviews = [];
  for (let j = 0; j < year.length; j += 1) { // Generates a random review from each month for the past 5 years
    for (let k = 0; k < month.length; k += 1) {
      reviews.push({ star: faker.random.number({ min: 1, max: 5 }), date: month[k].concat('-', faker.random.number({ min: 1, max: 28 }).toString().concat('-', year[j])) });
      const date = year[j].concat('-', month[k].concat('-', faker.random.number({ min: 1, max: 28 }).toString()));
      const star = faker.random.number({ min: 1, max: 5 });
      reviewsCounter += 1;
      const dataReview = `${reviewsCounter},${i},${date},${star}\n`;
      writerReviews.write(dataReview, 'utf8');
    }
  }
  const restaurantName = makeRestaurantName();

  const joinArray = [];

  // put 5 random numbers between 1 and 100 into joinArray
  while (joinArray.length < 5) {
    const r = Math.floor(Math.random() * 100) + 1;
    if (joinArray.indexOf(r) === -1) joinArray.push(r);
  }

  for (let m = 0; m < 5; m += 1) {
    const dataJoinCategory = `${i},${joinArray[m]},${cassandraCateg[joinArray[m]]}\n`;
    writerJoinCategory.write(dataJoinCategory, 'utf8');
    const dataJoinRestaurant = `${joinArray[m]},${i},${restaurantName}\n`;
    writerJoinRestaurant.write(dataJoinRestaurant, 'utf8');
  }

  let average = 0;
  reviews.forEach((value) => {
    average += value.star;
  });
  const boolOptions = ['true', 'false'];
  const bool = boolOptions[Math.floor(Math.random() * 2)];

  average = Math.round((average / reviews.length) * 2) / 2;
  const price = faker.random.number({ min: 1, max: 4 });
  const totReviews = faker.random.number({ min: 20, max: 10000 });
  const dataRestaurant = `${i},${restaurantName},${bool},${price},${totReviews},${average}\n`;

  return writerRestaurants.write(dataRestaurant, 'utf8');
};

// generate 100 random categories
const CreateCategories = () => {
  for (let i = 1; i <= 100; i += 1) { // create 100 fake words to choose from
    const categ = faker.lorem.word();
    cassandraCateg.push(categ);
  }
};
CreateCategories();

function writeAllData() {
  let i = 10000001;
  CreateCategories();
  console.time('time');
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        // Last time!
        console.timeEnd('time');
        CreateData(i);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        if (i % 500000 === 0) {
          console.log('still working...');
        }
        ok = CreateData(i);
      }
    } while (i > 1 && ok);
    if (i > 1) {
      // Had to stop early!
      // Write some more once it drains.
      writerRestaurants.once('drain', write);
    }
  }
}

writeAllData();
