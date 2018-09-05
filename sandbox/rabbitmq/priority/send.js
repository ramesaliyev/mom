#!/usr/bin/env node
const { connect } = require('../utils');

function bail(err, conn) {
  console.error(err);
  if (conn) conn.close(function () { process.exit(1); });
}

function on_connect(err, conn) {
  if (err !== null) return bail(err);

  const q = 'priority-test';
  const [first, ...rest] = process.argv.slice(2);

  const priority = +first || 0;
  const message = rest.join(' ') || "Dummy Message";
  
  function on_channel_open(err, ch) {
    if (err !== null) return bail(err, conn);

    ch.assertQueue(q, { durable: false, maxPriority: 10 }, function (err, ok) {
      if (err !== null) return bail(err, conn);

      ch.sendToQueue(q, new Buffer(message), { priority });
        
      console.log(` [x] Sent '${message} with priority ${priority}'`);

      ch.close(function () {
        conn.close();
      });
    });
  }

  conn.createChannel(on_channel_open);
}

connect(on_connect);