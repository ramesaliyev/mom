import { notify } from 'globals/notify';

const doNotify = (type, message) => {
  notify(type, `[Socket] ${message}`);
  console.log(type, `[Socket] ${message}`);
}
const nInfo = doNotify.bind(null, 'info');
const nSuccess = doNotify.bind(null, 'success');
const nError = doNotify.bind(null, 'error');

export default (socket) => {
  nInfo('Connecting...');

  const _emit = socket.emit;
  socket.emit = (...args) => {
    nInfo(`Emitting: ${args[0]}`);
    _emit.apply(socket, args);
  };

  socket.on('connect', () => nSuccess('Connected.'));
  socket.on('connect_error', (e) => nError(`Connection error occured. ${e.message}`));
  socket.on('connect_timeout', (e) => nError('Connection timeout.'));
  socket.on('reconnect', (number) => nSuccess(`Reconnected after ${number} try.`));
  socket.on('reconnect_attempt', (number) => nInfo(`Trying to reconnect, attempt ${number}.`));
  socket.on('reconnect_error', (e) => nError(`Reconnection error occured. ${e.message}`));
  socket.on('reconnect_failed', (number) => nError(`Reconnect failed.`));
  socket.on('disconnect', (reason = 'no-reason') => nError(`Disconnected (${reason}).`));
  socket.on('authenticated', () => nSuccess('Authenticated.'));
  socket.on('deauthenticated', () => nSuccess('Deauthenticated.'));
  socket.on('auth-error', (reason = 'no-reason') => nError(`AuthError (${reason}).`));
}
