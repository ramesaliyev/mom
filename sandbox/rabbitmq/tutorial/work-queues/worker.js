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

    var q = 'task_queue';

    ch.assertQueue(q, {
      durable: true // keep messages even if rabbitmq restarts
    });

    ch.prefetch(1);  // This tells RabbitMQ not to give more than one message
    // to a worker at a time. Or, in other words, don't dispatch a new message
    // to a worker until it has processed and acknowledged the previous one.
    // Instead, it will dispatch it to the next worker that is not still busy.

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    
    const consumer = function(msg) {
      var secs = msg.content.toString().split('.').length - 1;
      
      const content = msg.content.toString();
      console.log(" [x] Received %s", content);

      setTimeout(function() {
        ch.ack(msg);
        console.log(" [x] Done ", content);
      }, secs * 1000);
    };

    ch.consume(q, consumer, {
      noAck: false // message will be deleted from queue when we acknowledge it. ch.ack(msg);
    });
  });
});