#!/usr/bin/env node
const amqp = require('amqplib/callback_api');

amqp.connect(process.env.MESSAGE_QUEUE, function(err, conn) {
  if (err) {
    return console.log(err);
  }

  conn.createChannel(function(err, ch) {
    if (err) {
      return console.log(err);
    }

    var q = 'task_queue';
    var msg = process.argv.slice(2).join(' ') || "Hello World!";

    ch.assertQueue(q, {
      durable: true // keep messages even if rabbitmq restarts
    });

    // We know nothing about exchanges, but still are able to send
    // messages to queues. This is possible because we are using a
    // default exchange, which is identified by the empty string ("").
    ch.sendToQueue(q, new Buffer(msg), {
      persistent: true // make the message persistent
    });

    setTimeout(() => {
      console.log(" [x] Sent '%s'", msg);

      conn.close();
      process.exit(0);
    }, 50);
  });
});

