/**
 * SHARED RabbitMQ Service v0.8.0
 */

import * as amqpConnManager from 'amqp-connection-manager';

export class RabbitMQService {
  /**
   * 
   */
  private conn;
  private queues;
  private exchanges;
  private readonly defaultDelayedExchange = 'delayed.default';

  private readonly defaults = {
    consumer: {
      default: {
        noAck: false,
        prefetch: 1,
      }
    },
    
    exchange: {
      default: {
        durable: true,
      },

      delayed: {
        durable: true,
        arguments: {
          'x-delayed-type': 'direct'
        }
      }
    },

    queue: {
      default: {
        durable: true,
        maxPriority: 10,
      }
    },

    queuer: {
      default: {
        persist: true,
        priority: 1,
      }
    },
  }

  /**
   * 
   */
  constructor(private readonly config) {
    this.queues = {};
    this.exchanges = {};

    this.connect(config);
  }

  /**
   * Connect via AMQPConnectManager
   */
  protected connect({ host, port, user, pass }) {
    return this.conn = amqpConnManager.connect({
      url: `amqp://${user}:${pass}@${host}:${port}`,
      json: true,
      connectionOptions: {
        heartbeat: 30,
      }
    });
  }

  /**
   * 
   */
  on(...args) {
    return this.conn.on(...args);
  }

  /**
   * Create new confirm channel.
   */
  private getChannel(setup) {
    return this.conn.createChannel({ 
      json: true,
      setup,
    });
  }

  /**
   * Assert Exchange
   */
  private assertExchange(ch, name, type, options = {}) {
    return ch.assertExchange(name, type, {
      ...this.defaults.exchange.default,
      ...options
    });
  }

  private assertStandardExchange(ch, name) {
    const {
      type,
      options = {},
    } = this.getExchangeOptions(name);

    return this.assertExchange(ch, name, type, options);
  }

  /**
   * 
   */
  private assertDelayedExchange(ch, name, options = {}) {
    return this.assertExchange(ch, name, 'x-delayed-message', {
      ...this.defaults.exchange.delayed,
      ...options,
    })
  }

  /**
   * Assert Queue
   */
  private assertQueue(ch, name, options = {}, done = undefined) {
    return ch.assertQueue(name, {
      ...this.defaults.queue.default,
      ...options
    }, done);
  }

  /**
   * Assert Queue
   */
  private assertStandardQueue(ch, name) {
    const {
      options = {},
      bindings = [],
    } = this.getQueueOptions(name);

    const assertion = this.assertQueue(ch, name, options);
    
    const setup = [
      assertion,
    ]; 

    bindings.forEach(binding => {
      const {
        exchange,
        routing,
        type,
      } = binding;

      const exchangeAssertion = type === 'delayed' ?
        this.assertDelayedExchange(ch, exchange) :
        this.assertStandardExchange(ch, exchange);

      setup.push(
        exchangeAssertion.then(() => {
          ch.bindQueue(name, exchange, routing);
        })
      );
    });

    return Promise.all(setup);
  }

  /**
   * Register Queue Options
   */
  public registerQueue(name, options, bindings = []) {
    this.queues[name] = {
      options,
      bindings,
    };
  }

  /**
   * 
   */
  private getQueueOptions(name) {
    const {
      options = {},
      bindings = [],
    } = (this.queues[name] || {});

    return {
      options, 
      bindings: [
        ...bindings,
        {
          exchange: this.defaultDelayedExchange,
          routing: name,
          type: 'delayed',
        }
      ]
    };
  }

  /**
   * 
   */
  public registerExchange(name, type, options) {
    this.exchanges[name] = {
      type,
      options,
    };
  }

  /**
   * 
   */
  private getExchangeOptions(name) {
    return this.exchanges[name] || {};
  }

  /**
   * Publish to an exchange.
   * Binding name mostly the name of queue.
   */
  public publish(exchange, binding, payload, options = {}) {
    const channel = this.getChannel(ch =>
      this.assertStandardExchange(ch, exchange)
    );

    return channel.publish(
      exchange,
      binding,
      payload,
      options,
    );
  }

  public publishDefaultDelayed(queue, delay, payload) {
    const channel = this.getChannel(ch => {
      this.assertDelayedExchange(ch, this.defaultDelayedExchange);
    });

    return channel.publish(
      this.defaultDelayedExchange,
      queue,
      payload,
      {
        headers: {
          'x-delay': delay
        }
      },
    );
  }

  /**
   *  Send to Queue.
   */
  public sendToQueue(queue, payload, options = {}) {
    const channel = this.getChannel(ch =>
      this.assertStandardQueue(ch, queue)
    );

    const mOptions = {
      ...this.defaults.queuer.default,
      ...options
    };

    return channel.sendToQueue(queue, payload, mOptions)
      .then(
        () => channel.close(),
        err => (
          channel.close(),
          Promise.reject(err)
        )
      );
  }

  /**
   * Consume from Queue
   */
  public consume(queue, consumer, options = {}) {
    const mOptions = {
      ...this.defaults.consumer.default,
      ...options
    };

    const { prefetch } = mOptions;

    delete mOptions.prefetch;

    const channel = this.getChannel(ch => {
      const setup = [
        this.assertStandardQueue(ch, queue),
        ch.consume(
          queue,
          this.consumerMiddleware(
            ch, consumer
          ),
          mOptions
        )
      ];

      if (prefetch) {
        setup.unshift(
          ch.prefetch(prefetch)
        )
      }

      return Promise.all(setup)
    });

    return channel.waitForConnect();
  }

  /**
   * Queue Consumer Middleware
   */
  protected consumerMiddleware(ch, consumer) {
    return msg => {
      let content = msg.content.toString();

      try {
        content = JSON.parse(content);
      } catch (e) {}

      consumer(
        content,
        () => ch.ack(msg),
        (requeue = true) => ch.nack(msg, false, requeue)
      );
    };
  }
}

export class RabbitMQServiceWLogger extends RabbitMQService {
  connect(config) {
    const returned = super.connect(config);

    this.on('connect', () =>
      console.log('Connected to RabbitMQ!'));
    
      this.on('disconnect', params =>
      console.log('Disconnected from RabbitMQ!', params.err.stack));

    return returned;
  }

  sendToQueue(queue, payload, options = {}) {
    return super.sendToQueue(queue, payload, options)
      .then(data => {
        console.log(`A message sent to ${queue} queue.`);
        return data;
      }, err => {
        console.log(`A message rejected from ${queue} queue.`);
        return Promise.reject(err);
      });
  }

  consume(queue, consumer, options = {}) {
    console.log(`Consuming from ${queue}`);
    return super.consume(queue, consumer, options);
  }

  consumerMiddleware(ch, consumer) {
    return super.consumerMiddleware(
      ch, (content, resolve, reject) => {
        console.log(`#${content.id} received: `, content);
        consumer(content, () => {
          console.log(`#${content.id} done.`);
          resolve();
        }, requeue => {
          console.log(`#${content.id} rejected${requeue ? ' will requeue' : ''}.`);
          reject(requeue);
        });
      }
    );
  }

  publishDefaultDelayed(queue, delay, payload) {
    console.log(`Delayed. to=${queue} for=${delay} #${payload.id}:`, payload);

    return super.publishDefaultDelayed(queue, delay, payload);
  }
};