const express = require('express');
const facty = require('facty');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <pre>

      Welcome to Math Service!

      Endpoints:
      - [GET] /factors/:num
      - [GET] /add/:nums
      - [GET] /subtract/:nums
      - [GET] /multiply/:nums
      - [GET] /divide/:nums
    </pre>
  `);
});

app.get('/factors/:num', ({ params: { num } }, res) => {
  res.send(facty.factorize(+num));
});

app.get('/add/:nums', ({ params: { nums } }, res) => {
  res.send(reduceParam(nums, (a, b) => a + b));
});

app.get('/subtract/:nums', ({ params: { nums } }, res) => {
  res.send(reduceParam(nums, (a, b) => a - b));
});

app.get('/multiply/:nums', ({ params: { nums } }, res) => {
  res.send(reduceParam(nums, (a, b) => a * b, 1));
});

app.get('/divide/:nums', ({ params: { nums } }, res) => {
  const [first, ...rest] = nums.split(',');
  res.send(reduceParam(rest.join(','), (a, b) => a / b, first));
});

app.listen(process.env.PORT, () =>
  console.log(`MathService listening on port ${process.env.PORT}!`)
);

// Utils

const reduceParam = (param, fn, start = 0) => String(
  param.split(',').reduce((a, b) => fn(+a, +b), start)
);