# AMQP
AMQP (Advanced Message Queuing Protocol) is the protocol used by RabbitMQ for messaging.

# Producer
Application that sends the messages.

# Consumer
Application that receives the messages.

# Connection
A real tcp connection between the app and the rabbitmq. Expensive. One connection for one cluster.

# Channel
Virtual connection virtual connection inside a connection. When you are publishing or consuming messages from a queue - it's all done over a channel. Create multiple with one connection.

# Message
Information that is sent from the producer to a consumer through RabbitMQ.

# Queue
Queue is the place where the messages end up ready to be picked up by the consumer, this is like the mailbox in the destination post office.

# Exchange
Receives messages from producers and pushes them to queues depending on rules defined by the exchange type. In order to receive messages, a queue needs to be bound to at least one exchange.

journey of message: **producer -> exchange -> queue -> consumer**

## Exchange Types:
### Direct
A message goes to the queues whose binding key exactly matches the routing key of the message.

### Topic
Like direct exchange but routing_key is a list of words, delimited by dots. And there is two special character.
- `*` (star)  which can substitute for exactly one word.
- `#` (hash) which can substitute for zero or more words.

Topic exchange is powerful and can behave like other exchanges.

When a queue is bound with "#" (hash) binding key - it will receive all the messages, regardless of the routing key - like in fanout exchange.

When special characters "*" (star) and "#" (hash) aren't used in bindings, the topic exchange will behave just like a direct one.

### Fanout
  It just broadcasts all the messages it receives to all of the queues that are bound to it.

### Headers
  Headers exchanges use the message header attributes for routing. But they say this is almost not used due to poor performance.

# Binding
A binding is a link between a queue and an exchange.

# Routing Key
The routing key is a key that the exchange looks at to decide how to route the message to queues. The routing key is like an address for the message.

# Users
It is possible to connect to RabbitMQ with a given username and password. Every user can be assigned permissions such as rights to read, write and configure privileges within the instance. Users can also be assigned permissions to specific virtual hosts.

# Vhosts
Like instances of RabbitMQ. Cannot communicate. 
