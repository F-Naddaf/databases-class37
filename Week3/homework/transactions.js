'use strict'

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week3",
});

const startTransaction = `START TRANSACTION;`;
const updateAccountOne = `UPDATE Account SET balance = balance - 1000 WHERE account_number = 101;`;
const updateAccountTwo = `UPDATE Account SET balance = balance + 1000 WHERE account_number = 102;`;
const updateAccountChangesOne = `UPDATE Account_changes SET amount = -1000, changed_date = CURDATE(), remark = 'bet transfer' WHERE account_number = 101;`;
const updateAccountChangesTwo = `UPDATE Account_changes SET amount = 1000, changed_date = CURDATE(), remark = 'bet transfer' WHERE account_number = 102;`;
const commitTransaction = `COMMIT`;
const rollback = `ROLLBACK TRANSACTION`;

const allQueries = [
  startTransaction,
  updateAccountOne,
  updateAccountTwo,
  updateAccountChangesOne,
  updateAccountChangesTwo,
  commitTransaction,
];

const updateTables = () => {
  allQueries.forEach((query) => {
    connection.query(query, (error, result) => {
      if (error) {
        connection.query(rollback);
        console.log(`Error at ${query}: `, error);
      }
      console.log(`${query} completed`);
      console.table(result);
    });
  });
};

connection.connect();
updateTables();
connection.end();