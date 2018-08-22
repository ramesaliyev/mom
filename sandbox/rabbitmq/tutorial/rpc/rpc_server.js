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

    var q = 'rpc_queue';

    ch.assertQueue(q, { durable: false });
    ch.prefetch(1);

    console.log(' [x] Awaiting RPC requests');
    
    ch.consume(q, function reply(msg) {
      var n = parseInt(msg.content.toString(), 10);

      console.log(" [.] fib(%d)", n);
      var r = fibonacci(n);
      console.log(" [.] ==> %d", r)

      ch.sendToQueue(
        msg.properties.replyTo,
        new Buffer(r.toString()),
        { correlationId: msg.properties.correlationId }
      );

      ch.ack(msg);
    });
  });
});

function fibonacci(n) {
  if (n == 0 || n == 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}