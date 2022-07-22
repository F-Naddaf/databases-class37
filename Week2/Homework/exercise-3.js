const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
};

const connection = mysql.createConnection(config);

const execQuery = (query) => {
  connection.query(query, function (error, results) {
    if (error) throw error;
    console.table(results);
  });
};

const Authors_And_Mentors = `
    SELECT A1.author_name as author, A2.author_name as mentor 
    FROM authors as A1
    INNER JOIN authors as A2
    on A2.author_no = A1.mentor
    order by mentor;`;

const Authors_And_Papers = `
    SELECT author_name, papers.paper_title
    from authors as a
    left join author_research_Papers_authors as joint
    on a.author_no = joint.author_id
    left join author_research_Papers as papers
    on joint.paper_id = papers.paper_id;`;

connection.connect();

execQuery(Authors_And_Mentors);
execQuery(Authors_And_Papers);

connection.end();
