import "./lib/configure-env";

import { SocketServer } from './server';
import { RabbitMQService } from './lib/rabbitmq';
import { MQConfig } from 'config/mq';

const service = new RabbitMQService(MQConfig);

const socketServer = SocketServer.getSocket('/user');

service.consume('socket', (content, resolve) => {
  console.log(content.owner.id, 'jobdone', content);
  socketServer.emitToUser(content.owner.id, 'jobdone', content);
  resolve();
});

let nCount = 0;
const test = () => {
  socketServer.emitToUser(1, 'notification', `Tokat ${++nCount}`);
  setTimeout(test, Math.random() * 20000);
}

test();