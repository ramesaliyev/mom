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
    
    var q = 'hello';

    ch.assertQueue(q, {
      durable: false  // we will lost messages when rabbitmq restarts
    });
    
    // rount-robin mode
    ch.sendToQueue(q, new Buffer('Hello World!'));

    setTimeout(() => {
      console.log("[x] Sent 'Hello World!'");

      conn.close();
      process.exit(0);
    }, 50);
  });
});

