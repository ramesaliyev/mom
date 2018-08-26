import io from 'socket.io-client';

import { getStore } from 'core/store';
import { actionDoSignOut } from 'actions/user/signin';

import tracer from './tracer';

class Socket {
  endpoint = `${process.env.REACT_APP_SOCKET_ENDPOINT}/user`;
  socket = null;
  user = null;

  constructor() {
    this.destroy = this.destroy.bind(this);
  }

  connect(user) {
    this.user = user;
    this.socket = io(this.endpoint, {
      forceNew: true,
      query: { user: JSON.stringify(user) }
    });

    this.on('reconnect', () => {
      this.authenticated && this.login();  
    });

    return this;
  }

  trace() {
    tracer(this);
    return this;
  }

  destroy() {
    this.socket && this.socket.close();
    Socket.instance = null;
  }

  on(event, handler) {
    this.socket.on(event, handler);
  }

  emit(event, content, ack) {
    this.socket.emit(event, {
      user: this.user,
      content
    }, ack);
  }

  login() {
    this.on('authenticated', () => {
      this.authenticated = true;
    });

    this.on('auth-error', () => {
      getStore().dispatch(actionDoSignOut());
    });

    this.emit('authenticate');
  }

  logoutNDestroy() {
    this.on('deauthenticated', () => {
      this.authenticated = false;
    });

    this.emit('deauthenticate', null, () => {
      this.destroy();
    });
  }
}

/**
 * Singleton socket.
 */
export const getSocket = () =>
  Socket.instance = Socket.instance || new Socket()