import * as dotenv from 'dotenv';
import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIO from 'socket.io';

dotenv.config();

import User from './models/user';
import { getUserFromCache } from '../services/cache';
import { promisifiedJWTVerify } from '../services/jwt';
import Protected from './decorators/protected';

const log = (event, user: any = { id : 'anonymous' }) =>
  console.log(`${event} #${user.id}`);

export class SocketServer {
  public static readonly PORT:number;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private nsp: any;
  private port: string | number;

  private static instances: Map<string, SocketServer> = new Map<string, SocketServer>();
  public static getSocket(namespace: string): SocketServer {
    if (SocketServer.instances.has(namespace)) {
      return SocketServer.instances.get(namespace);
    }

    const socket = new SocketServer(namespace);
    SocketServer.instances.set(namespace, socket);

    return socket;
  } 

  private constructor(namespace = '/') {
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
  }

  private async onConnect(socket: any) {
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

  private async authenticate(socket: any, userData: any): Promise<any> {
    log('Authentication requested.', userData);

    const reject = (reason: string) =>
      this.emitAuthError(socket, reason, userData);

    const user: any = await promisifiedJWTVerify(userData.accessToken);

    if (!user) {
      return reject('wrong-token');
    }

    if (user.id !== userData.id) {
      return reject('not-token-of-user');
    }

    const cachedAccessToken = await getUserFromCache(user.id);

    if (cachedAccessToken !== userData.accessToken) {
      return reject('old-token');
    }

    socket.user = user;
    socket.user.lastVerifyTime = Date.now() / 1000;
    socket.join(this.getUserPrivateRoom(user));
    socket.emit('authenticated');

    log('Authentication granted.', user);

    return true;
  }

  private deauthenticate(socket: any): void {
    const user: User = socket.user;

    if (user) {
      socket.user = null;
      socket.oldUser = user;
      socket.leave(this.getUserPrivateRoom(user));
    }
    
    socket.emit('deauthenticated');

    log('Deauthentication granted.', user);
  }

  private emitAuthError(socket: any, reason: string, userData: User): boolean {
    const user = userData || socket.user;

    log(`Authentication rejected. (${reason})`, user);
    socket.emit('auth-error', reason);
    
    return false;
  }
  
  emitToUser(id: number, event: string, message: any): void {
    const userPrivateRoom = this.getUserPrivateRoom({ id } as User);
    return this.emitToRoom(userPrivateRoom, event, message);
  }

  private emitToRoom(room: string, event: string, message: any) {
    this.nsp.in(room).clients((error, clientIds) => {
      if (error) {
        return; // handle this
      }

      // Send to all authenticated clients in room.
      clientIds.forEach(clientId => {
        const clientSocket = this.nsp.connected[clientId];
        this.emitToAuthenticatedSocket(clientSocket, event, message);
      });
    });
  }

  @Protected()
  private emitToAuthenticatedSocket(socket: any, event: string, message: any) {
    socket.emit(event, message);
  }

  private getUserPrivateRoom(user: User) {
    return `user-private-room-${user.id}`;
  }
}