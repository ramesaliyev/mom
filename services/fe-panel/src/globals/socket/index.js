import io from 'socket.io-client';

import { getStore } from 'core/store';
import { actionDoSignOut } from 'actions/user/signin';

import tracer from './tracer';

class Socket {
  endpoint = `${process.env.REACT_APP_SOCKET_ENDPOINT}/user`;
  socket = null;
  user = null;
  connected = false;
  authenticated = false;

  constructor() {
    this.destroy = this.destroy.bind(this);
  }

  connect(user) {
    this.socket = io(this.endpoint, {
      forceNew: true,
    });

    this.on('disconnect', (reason) => {
      this.connected = false;  
    });

    this.on('reconnect', () => {
      this.authenticated && this.relogin();  
    });

    this.on('authenticated', () => {
      this.authenticated = true;
    });

    this.on('auth-error', (reason) => {
      getStore().dispatch(actionDoSignOut());
    });

    this.on('deauthenticated', () => {
      this.authenticated = false;
    });

    this.on('notification', (notification) => {
      // do something
    });

    this.on('job:done', (content) => {
      // do something
      console.log('Job Done', content);
    });

    this.connected = true;

    return this;
  }

  login(user) {
    this.user = user;
    
    this.emit('authenticate', user);

    return this;
  }

  relogin() {
    this.user && this.login(this.user);
  }

  logout() {
    this.emit('deauthenticate', null, () => {
      this.destroy();
    });

    return this;
  }

  trace() {
    tracer(this);

    return this;
  }

  destroy() {
    this.socket && this.socket.disconnect();
    Socket.instance = null;
  }

  on(event, handler) {
    this.socket.on(event, handler);
    
    return this;
  }

  emit(event, content, ack) {
    this.socket && this.socket.emit(event, content, ack);
    return this;
  }
}

/**
 * Singleton socket.
 */
export const getSocket = () =>
  Socket.instance = Socket.instance || new Socket()