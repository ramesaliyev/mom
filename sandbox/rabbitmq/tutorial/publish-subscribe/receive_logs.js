#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect(process.env.MESSAGE_QUEUE, function(err, conn) {
  if (err) {
    return console.log(err);
  }

  conn.createChannel(function(err, ch) {
    if (err) {
      return console.log(err);
    }

    var ex = 'logs';

    // create exchange logs of type fanout.
    ch.assertExchange(ex, 'fanout', {
      durable: false
    });

    const consumer = function(msg) {
      console.log(" [x] %s", msg.content.toString());
    };

    const queue = function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

      // We've already created a fanout exchange and a queue. Now we need to tell
      // the exchange to send messages to our queue. That relationship between
      // exchange and a queue is called a binding.
      ch.bindQueue(q.queue, ex, '');
      // From now on the logs exchange will append messages to our queue.

      // so we can consume now
      ch.consume(q.queue, consumer, { noAck: true });
    };

    // In the amqp.node client, when we supply queue name as an empty string,
    // we create a non-durable queue with a generated name:
    ch.assertQueue('', { exclusive: true }, queue);
    // When the connection that declared it closes, the queue will be deleted
    // because it is declared as exclusive.
  });
});