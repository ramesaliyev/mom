import { notifier } from 'globals/notify';

const notify = notifier('Socket', 'wifi');

const nInfo = notify.bind(null, 'info');
const nSuccess = notify.bind(null, 'success');
const nError = notify.bind(null, 'error');
const nGrey = notify.bind(null, 'grey');

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
  socket.on('notification', (notification) => nSuccess(`Notification: "${notification}".`));
  socket.on('jobdone', (job) => nGrey(`Job Done: "${job.type}#${job.id}".`));
}
