const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const createAuthorsTable = `CREATE TABLE IF NOT EXISTS research_Papers(
  paper_id int not null AUTO_INCREMENT PRIMARY KEY, 
  paper_title varchar(100), 
  published_on varchar(200),
  publish_date DATE,
);`;
