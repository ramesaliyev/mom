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
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    // create exchange logs of type fanout.
    ch.assertExchange(ex, 'fanout', {
      durable: false
    });

    ch.publish(ex, '', new Buffer(msg)); // publishing to logs exchange
    // The empty string as second parameter means that we don't want to
    // send the message to any specific queue. We want only to publish
    // it to our 'logs' exchange.

    // The messages will be lost if no queue is bound to the exchange yet,
    // but that's okay for us; if no consumer is listening yet we can safely discard the message.

    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 50);
});