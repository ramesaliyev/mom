import { Injectable } from '@nestjs/common';

import { RabbitMQWLogger as RabbitMQ } from 'lib/rabbitmq'; 
import { MQConfig } from 'config/mq';

@Injectable()
export class MQService extends RabbitMQ {
  constructor() {
    super(MQConfig);
  }
}