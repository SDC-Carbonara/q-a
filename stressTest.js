import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 200,
  duration: '30s',
};

export default function () {
  let question_id = Math.ceil(Math.random() * (1000001 - 1) + 1);
  http.get(`http://localhost:4285/qa/questions/${question_id}/answers`);
  sleep(1);
}

