#!/usr/bin/env node
const { connect } = require('../utils');

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: rpc_client.js num");
  process.exit(1);
}

connect((err, conn) => {
  if (err) {
    return console.log(err);
  }

  conn.createChannel(function(err, ch) {
    if (err) {
      return console.log(err);
    }

    const queue = function(err, q) {
      var corr = generateUuid();
      var num = parseInt(args[0]);

      console.log(' [x] Requesting fib(%d)', num);

      const consumer = function(msg) {
        if (msg.properties.correlationId == corr) {
          console.log(' [.] Got %s', msg.content.toString());
          
          setTimeout(function() {
            conn.close();
            process.exit(0);
          }, 50);
        }
      };

      ch.consume(q.queue, consumer, { noAck: true });

      ch.sendToQueue('rpc_queue', new Buffer(num.toString()), {
        correlationId: corr,
        replyTo: q.queue
      });
    };

    ch.assertQueue('', { exclusive: true }, queue);
  });
});

function generateUuid() {
  const { random } = Math;
  return `${random()}${random()}${random()}`;
}