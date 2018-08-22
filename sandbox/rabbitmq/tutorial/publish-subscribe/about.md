https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html

publish-subscribe mode

    $ node rabbitmq/tutorial/publish-subscribe/emit_log.js kamilnaber

- fanout exchange used
  - it just broadcasts all the messages it receives to all the queues it knows.
- bindings

callbacks used