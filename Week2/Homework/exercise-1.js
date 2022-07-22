const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const dropDatabase = 'DROP DATABASE IF EXISTS userdb;';
const createDatabase = 'CREATE DATABASE userdb;';

const createAuthorsTable = `CREATE TABLE authors(
  author_no INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  author_name VARCHAR(50) NOT NULL, 
  university VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  h_index INT,
  gender enum('F', 'M')
);`;

const addingMentor = `ALTER TABLE authors
  ADD CONSTRAINT FOREIGN KEY (mentor) REFERENCES authors(author_no);`;

const insertAuthorsTable = `INSERT INTO authors (author_no, author_name, university, date_of_birth, h_index, gender, mentor)
  VALUES
  (1, 'Stephen King', 'Maine', '1947-09-21', 01, 'M', 1),
  (2, 'Harper Lee', 'Oxford', '1926-04-28', 01, 'F', NULL),
  (3, 'Margaret Atwood', 'Harvard', '1939-11-18', 01, 'F', 2),
  (4, 'Terry Brooks', 'Washington & Lee', '1944-01-08', 01, 'M', 1),
  (5, 'Geoff Ryman', 'UCLA', '1951-05-09', 01, 'M', 4),
  (6, 'George R R Martin', 'Northwestern', '1948-09-20', 01, 'M', 7),
  (7, 'Orson Scott Card', 'Utah', '1951-08-24', 01, 'M', NULL),
  (8, 'C J Cherryh', 'Oklahoma', '1942-09-01', 01, 'F', 5);`;

const dropDatabases = () => {
  connection.query(dropDatabase, (err, res) => {
    err ? console.log(err) : console.log(res, 'database dropped');
  });
};

const createDatabases = () => {
  connection.query(createDatabase, (err, res) => {
    err ? console.log(error) : console.log(res, 'Database created');
  });
};

const createAuthorTable = () => {
  connection.query(createAuthorsTable, (err, res) => {
    err ? console.log(err) : console.log(res, 'The table is created');
  });
};

const addingMentors = () => {
  connection.query(addingMentor, (err, res) => {
    err ? console.log(err) : console.log(res, 'Mentor is added');
  });
};

const insertAuthorTable = () => {
  connection.query(insertAuthorsTable, (err, res) => {
    err ? console.log(err) : console.log(res, 'Table is inserted');
  });
};

connection.connect();
dropDatabases();
createDatabases();
createAuthorTable();
addingMentors();
insertAuthorTable();
connection.end();
