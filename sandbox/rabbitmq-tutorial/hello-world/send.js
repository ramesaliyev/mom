#!/usr/bin/env node
const amqp = require('amqplib/callback_api');

amqp.connect(process.env.MESSAGE_QUEUE, function(err, conn) {
  if (err) {
    return console.log(err);
  }

  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, { durable: false });
    
    ch.sendToQueue(q, new Buffer('Hello World!'));
    
    console.log("[x] Sent 'Hello World!'");

    setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });
});

