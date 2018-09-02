#!/usr/bin/env node
const { connect } = require('../utils');

connect((err, conn) => {
  if (err) {
    return console.log(err);
  }

  conn.createChannel(function(err, ch) {
    if (err) {
      return console.log(err);
    }
    
    var q = 'hello';

    ch.assertQueue(q, {
      durable: false // we will lost messages when rabbitmq restarts
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

    const consumer = function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    };

    // rount-robin mode
    ch.consume(q, consumer, {
      noAck: true // message will deleted from queue as soon as it received
    });
  });
});