import './lib/configure-env';

const express = require('express');
const facty = require('facty');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <pre>

      Welcome to Math Service!

      Endpoints:
      - [GET] /factors/:nums
      - [GET] /add/:nums
      - [GET] /subtract/:nums
      - [GET] /multiply/:nums
      - [GET] /divide/:nums
    </pre>
  `);
});

app.use(function (req, res, next) {
  console.log(`Request "${req.url}"`);
  next();
});

app.use(function (err, req, res, next) {
  console.error('Err!',  err.stack);
  res.status(500).send('Internal Server Error!')
});

function randomTimeout(fn) {
  setTimeout(fn, parseInt(String(Math.random() * 10000), 10));
}

app.get('/factors/:nums', ({ params: { nums } }, res) => randomTimeout(() => {
  nums = nums.split(',');
  res.send(nums.map(num => facty.factorize(+num)));
}));

app.get('/add/:nums', ({ params: { nums } }, res) => randomTimeout(() => {
  res.send(reduceParam(nums, (a, b) => a + b));
}));

app.get('/subtract/:nums', ({ params: { nums } }, res) => randomTimeout(() => {
  res.send(reduceParam(nums, (a, b) => a - b));
}));

app.get('/multiply/:nums', ({ params: { nums } }, res) => randomTimeout(() => {
  res.send(reduceParam(nums, (a, b) => a * b, 1));
}));

app.get('/divide/:nums', ({ params: { nums } }, res) => randomTimeout(() => {
  const [first, ...rest] = nums.split(',');
  res.send(reduceParam(rest.join(','), (a, b) => a / b, first));
}));

app.listen(+process.env.EXMATHSERVICE_PORT, () =>
  console.log(`MathService listening on port ${process.env.EXMATHSERVICE_PORT}!`)
);

// Utils

const reduceParam = (param, fn, start = 0) => String(
  param.split(',').reduce((a, b) => fn(+a, +b), start)
);