https://github.com/squaremo/amqp.node/pull/186/files

    # Receive messages by priority
    $ node rabbitmq/priority/send.js 1 message1
    $ node rabbitmq/priority/send.js 2 message2
    $ node rabbitmq/priority/send.js 3 message3
    $ node rabbitmq/priority/send.js 4 message4
    $ node rabbitmq/priority/send.js 5 message5

    # Send messages by priority
    $ node rabbitmq/priority/receive.js