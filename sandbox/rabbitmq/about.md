connection: a real tcp connection between the app and the rabbitmq.
channel: virtual connection which pass through the real connection.

producer -> exchange -> queue

exchange types:
  - direct
  - topic
  - headers
  - **fanout**: it just broadcasts all the messages it receives to all the queues it knows.
