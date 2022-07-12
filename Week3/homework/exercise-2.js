'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const dropDataBase = `DROP DATABASE IF EXISTS week3;`;
const createDatabase = `CREATE DATABASE week3;`;
const useDatabase = `USE week3;`;
const createAccount = `CREATE TABLE IF NOT EXISTS Account (account_number INT PRIMARY KEY AUTO_INCREMENT, balance INT);`;
const createAccountChanges = `CREATE TABLE IF NOT EXISTS Account_changes (change_number INT PRIMARY KEY AUTO_INCREMENT, account_number INT, amount INT, changed_date DATE, remark VARCHAR(250), FOREIGN KEY (account_number) REFERENCES Account(account_number));`;
const autoIncrement = `ALTER TABLE Account AUTO_INCREMENT=100;`;

const createQueries = [
  dropDataBase,
  createDatabase,
  useDatabase,
  createAccount,
  createAccountChanges,
  autoIncrement,
];

const createTables = () => {
  createQueries.forEach((query) => {
    connection.query(query, (error, result) => {
      if (error) {
        console.log(`Error at ${query}: `, error);
      }
      console.log(`${query} completed`);
      console.table(result);
    });
  });
};

const insertAccountData = `INSERT INTO Account (balance) VALUES (2500.00), (3800), (580), (31000), (1240);`;
const insertAccountChangesData = `INSERT INTO Account_changes (account_number, amount, changed_date, remark) VALUES
(100, 200.00, '2022-05-26', 'grocery'),
(101, 75.00, '2022-06-04', 'drinks'),
(102, 50.00, '2022-06-06', 'energy cost'),
(103, 400.00, '2022-06-10', 'house rent'),
(104, 345.00, '2022-06-15', 'health insurance');`;

const allQueries = [insertAccountData, insertAccountChangesData];

const insertData = () => {
  allQueries.forEach((query) => {
    connection.query(query, (error, result) => {
      if (error) {
        console.log(`Error at ${query}: `, error);
      }
      console.log(`${query} completed`);
      console.table(result);
    });
  });
};

connection.connect();
createTables();
connection.end();
