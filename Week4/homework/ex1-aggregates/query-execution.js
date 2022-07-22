const seedDatabase = require('../ex1-aggregates/seedDatabase');
const MongoClient = require('mongodb').MongoClient;
const env = require('dotenv').config();

// This runs everything
async function main() {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('databaseWeek4').collection('population_pyramid');

  try {
    await client.connect();

    await totalPopulationPerCountry(db, 'Netherlands');

    await totalPopulationPerContinent(db, '2020', '100+');

    await seedDatabase(client);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

// Exercise 1.2 per country
async function totalPopulationPerCountry(db, country) {
  const pipeline = [
    {
      $match: {
        Country: `${country}`,
      },
    },
    {
      $addFields: {
        totalPopulation: {
          $add: [{ $toInt: '$M' }, { $toInt: '$F' }],
        },
      },
    },
    {
      $group: {
        _id: '$Year',
        countPopulation: {
          $sum: '$totalPopulation',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  const aggCursor = db.aggregate(pipeline);
  await aggCursor.forEach((year) => console.log(year));
}

// Exercise 1.3 per continent
async function totalPopulationPerContinent(db, year, age) {
  const pipeline = [
    {
      $match: {
        Year: year,
        Age: age,
        Country: {
          $in: [
            'AFRICA',
            'ASIA',
            'EUROPE',
            'LATIN AMERICA AND THE CARIBBEAN',
            'NORTHERN AMERICA',
            'OCEANIA',
          ],
        },
      },
    },
    {
      $addFields: {
        TotalPopulation: {
          $add: [{ $toInt: '$M' }, { $toInt: '$F' }],
        },
      },
    },
  ];

  const aggCursor = db.aggregate(pipeline);
  await aggCursor.forEach((country) => console.log(country));
}

main();
