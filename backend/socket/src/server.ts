import * as dotenv from 'dotenv';
import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIO from 'socket.io';
import * as jwt from 'jsonwebtoken';

dotenv.config();

import User from './models/user';
import * as cache from './services/cache';

const log =   (event, user: any = { id : 'anonymous' }) =>
  console.log(`${event} #${user.id}`);

export class SocketServer {
  public static readonly PORT:number;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private nsp: any;
  private port: string | number;

  constructor(namespace = '/') {
    this.onConnect = this.onConnect.bind(this);

    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = socketIO(this.server);
    this.nsp = this.io.of(namespace);

    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });

    this.nsp.on('connection', this.onConnect);

    // this.nsp.use((socket, next) => {
    //   if (!socket.user) {
    //     //return this.closeConn(socket, 'no-user');
    //   }

    //   console.log('Middleware:', socket.user, socket.request)

    //   next();
    // });
  }

  async onConnect(socket: any) {
    log('An user connected.');

    socket.on('disconnect', () => {
      log('User disconnected.', socket.user || socket.oldUser);
    });

    socket.on('authenticate', (userData: User) => {
      this.authenticate(socket, userData);
    });

    socket.on('deauthenticate', (message: any, ack: any) => {
      this.deauthenticate(socket);
      ack && ack();
    });
  }

  async authenticate(socket: any, userData: any): Promise<any> {
    log('Authentication requested.', userData);

    const reject = (reason: string) => {
      log(`Authentication rejected. (${reason})`, userData);
      socket.emit('auth-error', reason);
      return false;
    };

    const user: any = await new Promise((resolve, reject) =>
      jwt.verify(
        userData.accessToken,
        process.env.JWT_SECRET_KEY,
        (err, decoded) => err ?
          resolve(false) : resolve(decoded)
      )
    );

    if (!user) {
      return reject('wrong-token');
    }

    if (user.id !== userData.id) {
      return reject('not-token-of-user');
    }

    const cachedAccessToken = await cache.get(
      `${process.env.USER_TOKEN_CACHE_PREFIX}${user.id}`
    );

    if (cachedAccessToken !== userData.accessToken) {
      return reject('old-token');
    }

    socket.user = user;
    socket.join(this.getUserPrivateRoom(user));
    socket.emit('authenticated');

    log('Authentication granted.', user);

    return true;
  }

  deauthenticate(socket: any): void {
    const user: User = socket.user;

    if (user) {
      socket.user = null;
      socket.oldUser = user;
      socket.leave(this.getUserPrivateRoom(user));
    }
    
    socket.emit('deauthenticated');

    log('Deauthentication granted.', user);
  }

  getUserPrivateRoom(user: User) {
    return `user-private-room-${user.id}`;
  }
}

// PROTECTED ON LISTENING

    // DELET THIS
    // socket.on('message', (message: Message) => {
    //   log(`User send: ${message.content}`, message.user);

    //   this.nsp
    //     .in(this.getUserPrivateRoom(user))
    //     .clients((error, clients) => {
    //       if (error) {
    //         //throw error;
    //       };

    //       console.log('All clients:', Object.keys(this.nsp.connected));
    //       console.log('Room clients:', clients);
    //       console.log('Client time to exp:', this.nsp.connected[clients[0]].handshake.query.tokenExp);
    //     });
    // });
    // DELET THIS