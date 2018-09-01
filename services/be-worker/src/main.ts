import './lib/configure-env';

import { RabbitMQService } from './lib/rabbitmq';
import { MQConfig } from 'config/mq';

import JobMathWorker from './workers/job_math';

const queue = 'job:math';

const Worker = {
  'job:math': JobMathWorker
}[queue];

const service = new RabbitMQService(MQConfig);
const worker = new Worker(service);

service.consume(queue, worker.consumer.bind(worker));

console.log('Working...');