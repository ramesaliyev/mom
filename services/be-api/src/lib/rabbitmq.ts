/**
 * SHARED MQ Service v0.4.0
 */

import * as amqplib from 'amqplib';

export class RabbitMQService {
  constructor(
    private readonly config
  ) {}

  async conn() {
    const { host, port, user, pass } = this.config;

    return await amqplib.connect({
      protocol: 'amqp',
      hostname: host,
      port: port,
      username: user,
      password: pass,
      heartbeat: 30,
    });
  }

  async createConfirmChannel(): Promise<any> {
    const conn = await this.conn();
    return await conn.createConfirmChannel();
  }

  async assertQueue(channel: any, name: string, options: any = {}): Promise<any> {
    return await channel.assertQueue(name, options);
  }

  async queue(
    name: string,
    payload: any,
    options: any = { persist: true }, 
    queueOptions: any = { durable: true }
  ): Promise<any> {
    const channel = await this.createConfirmChannel();

    if (options.persist) {
      queueOptions.durable = true;
    }

    await this.assertQueue(channel, name, queueOptions);

    return new Promise((resolve, reject) => {
      channel.sendToQueue(name, new Buffer(JSON.stringify(payload)), options, err => {
        channel.close();
        return err ? reject(err) : resolve({ ack: true });
      });  
    });
  }

  async consume(
    name: string,
    consumer: any,
    options: any = { noAck: false }, 
    queueOptions: any = { durable: true },
    channelOptions: any = { prefetch: 1 },
  ): Promise<any> {
    const channel = await this.createConfirmChannel();

    if (channelOptions.prefetch) {
      channel.prefetch(channelOptions.prefetch);
    }

    await this.assertQueue(channel, name, queueOptions);

    const middleConsumer = msg => {
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
        () => {
          console.log(`Job #${content.id} is errored, will requeue.`);
          channel.nack(msg, false, true);
        }
      );
    }

    channel.consume(name, middleConsumer, options);
  }
}