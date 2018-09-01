import { getStore } from 'core/store';
import { actionRenewToken } from 'actions/user/renew';
import { notifier } from 'globals/notify';

const notify = notifier('TokenRenewScheduler', 'hourglass');

const tokenRenewBeforeLeft = +process.env.REACT_APP_TOKEN_RENEW_WHEN_LEFT_IN_PERCENT;

export const scheduleRenewToken = user => {
  const { iat, exp } = user;
  const now = Date.now();
  const tokenTTL = exp - iat;
  const renewAtTimeLeft = (tokenTTL / 100 * (100 - tokenRenewBeforeLeft));
  const mostLateRenewTime = iat + renewAtTimeLeft;

  if (now > mostLateRenewTime) {
    notify('info', 'Renewing token...');
    getStore().dispatch(actionRenewToken());
  } else {
    const willRenewAfter = ((mostLateRenewTime - now) / 1000).toFixed(0);
    notify('info', `Token will be renewed after ${willRenewAfter} seconds.`);
    setTimeout(
      () => scheduleRenewToken(user),
      mostLateRenewTime - now
    );
  }
}