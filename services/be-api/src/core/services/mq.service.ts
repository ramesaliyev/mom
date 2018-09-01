import { Injectable } from '@nestjs/common';

import { RabbitMQService } from 'lib/rabbitmq'; 
import { MQConfig } from 'config/mq';

@Injectable()
export class MQService extends RabbitMQService {
  constructor() {
    super(MQConfig);
  }
}