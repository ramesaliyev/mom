/**
 * SHARED RabbitMQ Service v0.6.0
 */

import * as amqpConnManager from 'amqp-connection-manager';

export class RabbitMQService {
  private connection;

  constructor({ host, port, user, pass }) {
    this.connection = amqpConnManager.connect({
      url: `amqp://${user}:${pass}@${host}:${port}`,
      json: true,
      connectionOptions: {
        heartbeat: 30,
      }
    });

    this.connection.on('connect', function() {
      console.log('Connected to MQ!');
    });

    this.connection.on('disconnect', function(params) {
      console.log('Disconnected from MQ!', params.err.stack);
    });
  }

  async queue(
    name: string,
    payload: any,
    options: any = { persist: true }, 
    queueOptions: any = { durable: true }
  ): Promise<any> {
    if (options.persist) {
      queueOptions.durable = true;
    }

    const channelWrapper = this.connection.createChannel({
      json: true,
      setup: channel => {
        return channel.assertQueue(name, queueOptions);
      }
    });  

    return channelWrapper.sendToQueue(name, payload)
      .then(() => {
        console.log(`A message sent to ${name} queue.`);
        channelWrapper.close();
      }, err => {
        console.log(`A message rejected from ${name} queue.`);
        channelWrapper.close();
        return Promise.reject(err);
      });
  }

  async consume(
    name: string,
    consumer: any,
    options: any = { noAck: false }, 
    queueOptions: any = { durable: true },
    channelOptions: any = { prefetch: 1 },
  ): Promise<any> {
    const middleman = (channel, consumer) => msg => {
      let content = msg.content.toString();

      try {
        content = JSON.parse(content);
      } catch (e) {}

      console.log(`Consuming from ${name}: Job#${content.id} Owner#${content.owner.id}`);
      consumer(
        content,
        () => {
          console.log(`Job #${content.id} is done.`);
          channel.ack(msg);
        },
        (requeue = true) => {
          console.log(`Job #${content.id} is errored, requeue=${requeue}.`);
          channel.nack(msg, false, requeue);
        }
      );
    }

    var channelWrapper = this.connection.createChannel({
      setup: channel => {
        const steps = [];

        steps.push(channel.assertQueue(name, queueOptions));
        channelOptions.prefetch && steps.push(channel.prefetch(channelOptions.prefetch));
        steps.push(channel.consume(name, middleman(channel, consumer), options));

        return Promise.all(steps);
      }
    });

    return channelWrapper.waitForConnect();
  }
}