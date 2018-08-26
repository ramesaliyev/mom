import * as dotenv from 'dotenv';
import { SocketServer } from './server';

dotenv.config();

new SocketServer('/user');