const { Pool, Client } = require('pg');
// const db = pgp('postgres://localhost:4285/sdc');

const pool = new Pool({
  user: 'alliediorio',
  host: 'localhost',
  database: 'sdc',
  port: 5432,
  password: 'password'
})


// const getQuestions = (productId, count) => {
//   return pool.query(`SELECT json_build_object('product_id', '${productId}', 'results', json_agg(main))
//   FROM (
//     SELECT * FROM questions WHERE product_id=${productId} LIMIT ${count}
//     ) main`);
// };


const getQuestions = (productId, count) => {
  return pool.query(`SELECT json_build_object('product_id', '${productId}', 'results', json_agg(main))
FROM
  (SELECT q.*,
    (SELECT coalesce(json_object_agg(answer_id, json_build_object('id', answer_id, 'body', body, 'date', date, 'answerer_name', answerer_name, 'helpfulness', helpfulness, 'photos',

    (SELECT ARRAY(SELECT ap.url
        FROM answers_photos ap
        WHERE ap.answer_id = a.answer_id
      )
    )

    )), '{}'::json)
      FROM answers a
      WHERE a.question_id = q.question_id
  ) as answers
  FROM questions q WHERE q.product_id=${productId} LIMIT ${count}
  ) main`);
};


const getAnswers = (questionId, count) => {
  let countAnswers = `(SELECT COUNT(answer_id) FROM answers WHERE question_id = ${questionId})`;

  return pool.query(`SELECT json_build_object('question', '${questionId}', 'count', ${countAnswers}, 'results', json_agg(main))
  FROM (
    SELECT a.*,
    (SELECT coalesce(array_agg(row_to_json(sub)), ARRAY[]::json[])
      FROM (
        SELECT ap.id, ap.url
        FROM answers_photos ap
        WHERE ap.answer_id = a.answer_id
      ) sub
    ) as photos
    FROM answers a
    WHERE a.question_id = ${questionId} LIMIT ${count}
  ) main`
  );
};


module.exports = {
  getQuestions: getQuestions,
  getAnswers: getAnswers,
  // test: test
};


