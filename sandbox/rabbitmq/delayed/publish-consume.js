#!/usr/bin/env node
const { connectPromise } = require('../utils');

const exchange = 'yourExchangeName';
const queue = 'yourQueueName';
const queueBinding = 'yourQueueBindingName';

const assertThings = ch => {
  // Assert a x-delayed-message Exchange. The type of the exchange is specified in the arguments as "x-delayed-type"
  ch.assertExchange(
    exchange,
    'x-delayed-message',
    {
      durable: true,
      arguments: {
        'x-delayed-type': 'direct'
      }
    }
  );

  return ch
    .assertQueue(queue, { durable: true })
    .then(() => {
      ch.bindQueue(queue, exchange, queueBinding);

      return ch;
    })
}
  

// Message consumer
connectPromise()
  .then(conn => conn.createChannel())
  .then(assertThings)
  .then(ch => {
    ch.consume(queue, (msg) => {
      // Handle delayed message
      console.log(`Received at ${Date.now()}`)
      console.log(msg.content.toString());
    }, { noAck: true });
  });

// Publish message
connectPromise()
  .then(conn => conn.createChannel())
  .then(assertThings)
  .then(ch => {
    // Publish message with a delay of 500 ms
    const headers = { 'x-delay': 5000 };

    ch.publish(
      exchange,
      queueBinding,
      new Buffer('hello world'),
      { headers }
    );

    console.log(`Published at ${Date.now()}`)
  });