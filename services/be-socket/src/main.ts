import "./lib/configure-env";

import { SocketServer } from './server';
import { RabbitMQWLogger as RabbitMQ } from './lib/rabbitmq';
import { MQConfig } from 'config/mq';

const service = new RabbitMQ(MQConfig);

const socketServer = SocketServer.getSocket('/user');

service.consume('socket', (content, resolve) => {
  const ownerId = content.owner.id;
  console.log(`Job received, emitting to user #${ownerId}`);

  socketServer.emitToUser(ownerId, 'job:done', content);
  
  resolve();
}).then(() => {
  console.log('Consuming socket queue...');
});

let bCount = 0;
const test = () => {
  socketServer.emitToUser(1, 'notification', `🔥 #${++bCount}`);
  setTimeout(test, Math.random() * 20000);
}

test();