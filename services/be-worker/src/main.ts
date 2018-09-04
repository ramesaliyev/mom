import './lib/configure-env';

import { RabbitMQService } from './lib/rabbitmq';
import { MQConfig } from 'config/mq';

const QUEUE_NAME = 'job';

import workers from './workers';

const service = new RabbitMQService(MQConfig);

service.consume(QUEUE_NAME, (content, resolve, reject) => {
  const { type } = content;
  const worker = new workers[type](service);

  try {
    worker.consume(content, resolve, reject);
  } catch (e) {
    reject();
  }
});
