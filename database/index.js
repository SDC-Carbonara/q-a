const { Pool, Client } = require('pg');
// const db = pgp('postgres://localhost:4285/sdc');

const pool = new Pool({
  user: 'alliediorio',
  host: 'localhost',
  database: 'sdc',
  port: 5432,
  password: 'password'
})

// const getQuestions = () => {
//   return pool.query('SELECT * FROM questions WHERE product_id=1');
// };

const getQuestions = () => {
  return pool.query('SELECT * FROM questions WHERE product_id=1');
};

const getAnswers = () => {
  return pool.query('SELECT * FROM answers WHERE question_id=1');
  // pool.query('SELECT * FROM answers WHERE id=1', (err, res) => {
  //   callback(res.rows);
  // })
};

const getPhotos = () => {
  return pool.query('SELECT * FROM answers_photos WHERE answer_id=5');
};
module.exports = {
  getQuestions: getQuestions,
  getAnswers: getAnswers,
  getPhotos: getPhotos
};




