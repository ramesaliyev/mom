import { getUserFromCache } from '../../services/cache';

export default function Protected() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(socket, ...rest: any[]) {
      const { user } = socket;

      if (!user) {
        return this.emitAuthError(socket, 'no-user');
      }

      const nowInSeconds = Date.now() / 1000;

      if (nowInSeconds > user.exp) {
        return this.emitAuthError(socket, 'token-expired');
      }

      if (nowInSeconds - user.lastVerifyTime > +process.env.SOCKET_REVERIFY_INTERVAL_IN_SECONDS) {
        const cachedAccessToken = await getUserFromCache(user.id);

        if (cachedAccessToken !== user.accessToken) {
          return this.emitAuthError(socket, 'old-token');
        }

        user.lastVerifyTime = nowInSeconds;
      }

      return originalMethod(socket, ...rest);
    }
  };
}