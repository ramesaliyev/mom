connection: a real tcp connection between the app and the rabbitmq.
channel: virtual connection which pass through the real connection.

producer -> exchange -> queue

# Exchange Types:
## Direct
A message goes to the queues whose binding key exactly matches the routing key of the message.

## Topic
Like direct exchange but routing_key is a list of words, delimited by dots. And there is two special character.
- `*` (star)  which can substitute for exactly one word.
- `#` (hash) which can substitute for zero or more words.

Topic exchange is powerful and can behave like other exchanges.

When a queue is bound with "#" (hash) binding key - it will receive all the messages, regardless of the routing key - like in fanout exchange.

When special characters "*" (star) and "#" (hash) aren't used in bindings, the topic exchange will behave just like a direct one.

## Fanout
  It just broadcasts all the messages it receives to all the queues it knows.

## Headers
  ...