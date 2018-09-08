import { Injectable } from '@nestjs/common';

import { RabbitMQServiceWLogger } from 'lib/rabbitmq'; 
import { MQConfig } from 'config/mq';

@Injectable()
export class MQService extends RabbitMQServiceWLogger {
  constructor() {
    super(MQConfig);
  }
}