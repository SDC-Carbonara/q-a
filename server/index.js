const db = require('../database/index.js');
const express = require('express');
const app = express();
const port = 4285;

app.use(express.json());


app.get('/qa/questions/', (req, res) => {
  db.getQuestions(req.query.product_id, req.query.count || 5)
    .then(questionInfo => {
      res.send(questionInfo.rows[0].json_build_object);
    })
    .catch(err => {
      console.log(err);
      res.send('this suuuucks');
    })
});

app.get('/test', (req, res) => {
  db.test(req.query.product_id, req.query.count || 10)
  .then(info => {
    res.send(info.rows[0].json_build_object);
  })
  .catch(err => {
    res.send(err);
    console.log(err);
  })
});


app.get('/qa/questions/:question_id/answers', (req, res) => {
  db.getAnswers(req.params.question_id, req.query.count || 5)
    .then(answerInfo => {
      res.send(answerInfo.rows[0].json_build_object);
    })
    .catch(err => {
      console.log(err);
      res.send('NOPE');
    })
});



app.listen(port, () => {
  console.log(`listening on port ${port}`);
})