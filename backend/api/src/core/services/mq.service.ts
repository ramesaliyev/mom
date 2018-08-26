import { Injectable } from '@nestjs/common';
import * as amqplib from 'amqplib';

import { MQConfig } from 'config/mq';
const { host, port, user, pass } = MQConfig;

@Injectable()
export class MQService {
  private readonly connection

  constructor() {
    this.connection = amqplib.connect(
      `amqp://${user}:${pass}@${host}:${port}`
    );
  }

  async conn() {
    return await this.connection;
  }

  async createConfirmChannel(): Promise<any> {
    const conn = await this.conn();
    return await conn.createConfirmChannel();
  }

  async assertQueue(channel: any, name: string, options: any = {}): Promise<any> {
    return await channel.assertQueue(name, options);
  }

  async queue(name: string, payload: any, options: any = {}, queueOptions: any = {}): Promise<any> {
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
}