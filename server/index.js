const db = require('../database/index.js');
const express = require('express');
const app = express();
const port = 4285;

app.use(express.json());

app.get('/allie', (req, res) => {
  db.getQuestions()
    .then(questionInfo => {
      let questionObj = {
        product_id: '1',
        results: questionInfo.rows,
      };
      res.send(questionObj);
    })
    .catch(err => {
      console.log(err);
      res.send('this suuuucks');
    })
});


app.get('/diorio', (req, res) => {
  db.getAnswers()
    .then(answerInfo => {
      res.send(answerInfo.rows);
    })
    .catch(err => {
      res.send(err);
    })
});

app.get('/pics', (req, res) => {
  db.getPhotos()
    .then(photos => {
      res.send(photos.rows);
    })
    .catch(err => {
      res.send(err);
    })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})