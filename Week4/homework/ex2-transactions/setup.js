const { MongoClient } = require('mongodb');
const env = require('dotenv').config();

async function main() {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    // Create the accounts collection
    await createAccounts(client, accountsArray);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function createAccounts(client, accounts) {
  const result = await client
    .db('databaseWeek4')
    .collection('accountTransaction')
    .insertMany(accounts);
  console.log(
    `${result.insertedCount} accounts have been created with the following IDs: `,
  );
  console.log(result.insertedIds);
}

const accountsArray = [
  {
    account_number: 100,
    balance: 3248,
    account_changes: {
      change_number: 3,
      amount: 300,
      changed_date: '2022-03-03',
      remark: 'dinner',
    },
  },
  {
    account_number: 101,
    balance: 8463,
    account_changes: {
      change_number: 9,
      amount: 150,
      changed_date: '2022-04-12',
      remark: 'gas money',
    },
  },
  {
    account_number: 102,
    balance: 98463,
    account_changes: {
      change_number: 23,
      amount: 250,
      changed_date: '2022-05-01',
      remark: 'food and drinks',
    },
  },
  {
    account_number: 103,
    balance: 3624,
    account_changes: {
      change_number: 5,
      amount: 50,
      changed_date: '2022-03-01',
      remark: 'present',
    },
  },
  {
    account_number: 104,
    balance: 3744,
    account_changes: {
      change_number: 16,
      amount: 400,
      changed_date: '2022-03-20',
      remark: 'new TV',
    },
  },
];
