const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = (query) => {
  connection.query(query, function (error, results) {
    if (error) throw error;
    console.table(results);
  });
};

const create_Authors_Research_Table = `CREATE TABLE IF NOT EXISTS author_research_Papers(
  author_no INT NOT NULL,
  paper_id INT NOT NULL, 
  FOREIGN KEY(author_no) REFERENCES authors(author_no), 
  FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id),
  PRIMARY KEY(author_no, paper_id)
);`;

const research_papers_insert = `
INSERT INTO author_research_Papers
(paper_title, conference, publish_date) VALUES

('Picture Perfect', 'Arrowhead Pharmaceuticals, Inc.', '2012/04/15'),
('Journey of August King', 'Bank of America Corporation', '2008/03/26'),
('Zombie High', 'Nokia Corporation', '2017/10/26'),
('Days of Grace (Días de gracia) ', 'Newtek Business Services Corp.', '2001/05/14'),
('Shark Tale', 'ARMOUR Residential REIT, Inc.', '2009/08/16'),
('Otaku', 'The GDL Fund', '2015/04/05'),
('Outsourced', 'Jensyn Acquistion Corp.', '2019/04/16'),
('Making the Boys ', 'Canon, Inc.', '2001/06/04'),
('The Chumscrubber', 'Sears Holdings Corporation', '2001/06/06'),
('Ladykillers', 'Imperva, Inc.', '2004/07/10'),
('Go for It', 'Azure Power Global Limited', '2016/07/12'),
('True Confessions', 'Colony Starwood Homes', '2020/05/10'),
('Lodger', 'Roka Bioscience, Inc.', '2002/10/15'),
('Garbage Prince', 'Griffon Corporation', '2010/04/29'),
('Devil Commands', 'PIMCO Income Strategy Fund II', '2002/06/14'),
('Nightmare Man', 'ONEOK Partners, L.P.', '2012/06/12'),
('Surveillance', 'Provident Bancorp, Inc.', '2020/03/19'),
('Journey to the Beginning of Time', 'CoBiz Financial Inc.', '2005/10/09'),
('Float', 'First Trust Intermediate Duration Preferred & Income Fund', '2016/09/01'),
('Bad Ass', 'Ballard Power Systems, Inc.', '2001/10/10'),
('Rookie of the Year', 'Akamai Technologies, Inc.', '2006/06/30'),
('Chain Reaction', 'Xinyuan Real Estate Co Ltd', '2012/09/04'),
('Say Anything...', 'PAVmed Inc.', '2002/09/02'),
('Charlotte Gray', 'Paratek Pharmaceuticals, Inc. ', '2021/12/06'),
('Lorenzo''s Oil', 'SkyWest, Inc.', '2006/05/30'),
('Light Bulb Conspiracy', 'AECOM', '2019/07/08'),
('Tomb of Ligeia', 'World Acceptance Corporation', '2012/04/15'),
('Kurt & Courtney', 'XG Technology, Inc', '2019/10/28'),
('Holidays by the Sea (Ni à vendre ni à louer)', 'Manitex International, Inc.', '2018/11/22'),
('Carry On, Constable', 'Wells Fargo & Company', '2017/05/28')
`;

const Insert_Into_Joint_Table = `
INSERT INTO author_research_Papers (author_no, paper_id)
  VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  (6, 6),
  (7, 7),
  (8, 8),
  (9, 9),
  (10, 10),
  (11, 11),
  (12, 12),
  (13, 13),
  (14, 14),
  (15, 15),
  (1, 16),
  (2, 17),
  (3, 18),
  (4, 19),
  (5, 20),
  (6, 21),
  (7, 22),
  (8, 23),
  (9, 24),
  (10, 25),
  (11, 26),
  (12, 27),
  (13, 28),
  (14, 29),
  (15, 30)
  `;

connection.connect();

execQuery(create_Authors_Research_Table);
execQuery(research_papers_insert);
execQuery(Insert_Into_Joint_Table);

connection.end();
