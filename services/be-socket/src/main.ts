import * as dotenv from 'dotenv';
import { SocketServer } from './server';

dotenv.config();

import { RabbitMQService } from './lib/rabbitmq';
import { MQConfig } from 'config/mq';

const service = new RabbitMQService(MQConfig);

const socketServer = SocketServer.getSocket('/user');

service.consume('socket', (content, resolve) => {
  socketServer.emitToUser(content.owner.id, 'jobdone', content);
  resolve();
});

let nCount = 0;
const test = () => {
  socketServer.emitToUser(1, 'notification', `Tokat ${++nCount}`);
  setTimeout(test, Math.random() * 20000);
}

test();