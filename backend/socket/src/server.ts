import * as dotenv from 'dotenv';
import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIO from 'socket.io';
import * as jwt from 'jsonwebtoken';

dotenv.config();

import Message from './models/message';
import User from './models/user';
import * as cache from './services/cache';

const log = (event, user) => 
  console.log(`${event} (UID:${user.id})`);

export class SocketServer {
  public static readonly PORT:number;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private nsp: any;
  private port: string | number;

  constructor(namespace = '/') {
    this.onConnect = this.onConnect.bind(this);

    this.create(namespace);
    this.registerSecurityMiddleware();
    this.listen();

    this.nsp.on('connection', this.onConnect);
  }

  create(namespace): void {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = socketIO(this.server);
    this.nsp = this.io.of(namespace);
  }

  listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });
  }

  onConnect(socket: any) {
    const user: User = this.getUserFromQuery(socket);

    log('User connected.', user);

    socket.on('disconnect', () => {
      log('User disconnected.', user);
    });

    socket.on('authenticate', (message: any) => {
      this.authenticate(socket, message);
    });

    socket.on('deauthenticate', (message: any, ack: any) => {
      this.deauthenticate(socket, message);
      ack && ack();
    });
  }

  registerSecurityMiddleware(): void {
    this.nsp.use((socket, next) => {
      const user: User = this.getUserFromQuery(socket);

      if (!user) {
        socket.disconnect(true);
        console.log('Connection attempt denied in middleware, no user.');
        return false;
      }

      next();
    });
  }

  async authenticate(socket: any, message: Message): Promise<any> {
    const user: User = message.user;

    log('Authentication requested.', user);

    const reject = () => {
      log('Authentication rejected.', user);
      return socket.emit('auth-error', 'wrong-token');  
    };

    const isJWTValid = await new Promise((resolve, reject) =>
      jwt.verify(
        user.accessToken,
        process.env.JWT_SECRET_KEY,
        (err, decoded) => err ?
          resolve(false) : resolve(decoded)
      )
    );

    if (!isJWTValid) {
      return reject();
    }

    const cachedAccessToken = await cache.get(
      `${process.env.USER_TOKEN_CACHE_PREFIX}${user.id}`
    );

    if (cachedAccessToken !== user.accessToken) {
      return reject();
    }

    socket.join(this.getUserPrivateRoom(user));
    socket.emit('authenticated');

    log('Authentication granted.', user);
  }

  deauthenticate(socket: any, message: Message): void {
    const user: User = message.user;

    socket.leave(this.getUserPrivateRoom(user));
    socket.emit('deauthenticated');

    log('Deauthentication granted.', user);
  }

  getUserFromQuery(socket: any): User | null {
    try {
      return JSON.parse(socket.handshake.query.user);
    } catch (e) {}

    return null;
  }

  getUserPrivateRoom(user: User) {
    return `user-private-room-${user.id}`;
  }
}