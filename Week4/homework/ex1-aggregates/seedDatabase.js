const csvFilePath = './population_pyramid_1950-2022.csv';
const csv = require('csvtojson');

const seedDatabase = async (client) => {
  const collectionExists = await client
    .db('databaseWeek4')
    .listCollections({ name: 'population_pyramid' })
    .hasNext();

  if (collectionExists) {
    return await client
      .db('databaseWeek4')
      .collection('population_pyramid')
      .drop();
  }

  // CSV to JSON
  let databaseArray = [];
  await csv()
    .fromFile(csvFilePath)
    .then((document) => {
      for (let i = 0; i < document.length; i++) {
        let oneDocument = {
          Country: document[i]['Country'],
          Year: document[i]['Year'],
          Age: document[i]['Age'],
          M: document[i]['M'],
          F: document[i]['F'],
        };
        databaseArray.push(oneDocument);
      }

      client
        .db('databaseWeek4')
        .collection('population_pyramid')
        .insertMany(databaseArray, (err, result) => {
          if (err) {
            console.log(`${err}`);
            return;
          }
          console.log(`Data seeding completed!`);
        });
    });
};

module.exports = seedDatabase;
