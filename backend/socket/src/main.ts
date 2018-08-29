import * as dotenv from 'dotenv';
import { SocketServer } from './server';

dotenv.config();

const socketServer = SocketServer.getSocket('/user');

let nCount = 0;
const test = () => {
  socketServer.emitToUser(1, 'notification', `Tokat ${++nCount}`);
  setTimeout(test, Math.random() * 20000);
}

test();