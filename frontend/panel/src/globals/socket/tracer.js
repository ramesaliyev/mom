import { notify } from 'globals/notify';

const doNotify = (type, message) => notify(type, `[Socket] ${message}`)
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
  socket.on('reconnect', () => nSuccess('Reconnected.'));
  socket.on('disconnect', (reason = 'no-reason') => nError(`Disconnected (${reason}).`));
  socket.on('authenticated', () => nSuccess('Authenticated.'));
  socket.on('deauthenticated', () => nSuccess('Deauthenticated.'));
  socket.on('auth-error', (reason = 'no-reason') => nError(`AuthError (${reason}).`));
}
