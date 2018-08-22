var amqp = require('amqplib/callback_api');

amqp.connect(process.env.MESSAGE_QUEUE, function(err, conn) {
  conn.createChannel(function(err, ch) {
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