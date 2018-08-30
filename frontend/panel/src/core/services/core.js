import * as axios from 'axios';

import { getDefaultHeaders } from 'config';
import { getStore } from 'core/store';
import { notifier } from 'globals/notify';
import { actionDoSignOut } from 'actions/user/signin';

const notify = notifier('Api', 'database');

const request = (method, url, data, options = {}) =>
  axios({
    // Set url.
    baseURL: process.env.REACT_APP_API_URL,
    url,

    // Set method.
    method,

    // Set params if method is get. otherwise set data.
    [method === 'get' ? 'params' : 'data']: data,

    // Spread options.
    ...options,

    // Spread headers.
    headers: {
      ...getDefaultHeaders(),
      ...(options.headers || {})
    }
  });

const parseConfig = (config) => ({
  method: config.method.toUpperCase(),
  pathname: config.url.replace(config.baseURL, '')
});

axios.interceptors.request.use(config => {
  const { method, pathname } = parseConfig(config);
  notify('info', `[${method}]  ${pathname}`);

  return config;
}, error => {
  const { method, pathname } = parseConfig(error.config);
  notify('error', `[${method}] Error (onRequest) ${pathname}`);

  return Promise.reject(error);
});

axios.interceptors.response.use(
  response => {
    const { status, config } = response;
    const { method, pathname } = parseConfig(config);

    notify(
      'success',
      `[${method}] Success (${status}) ${pathname}`
    );
    
    return response;
  },
  error => {
    const { config, response } = error;
    const { status, data } = response;
    const { method, pathname } = parseConfig(config);

    const message = data.error || (data.message ? (data.message.message || data.message) : data) ;

    notify(
      'error',
      `[${method}] Error (${status}) ${pathname} "${message}"`
    );

    if (
      status === 401 &&
      pathname !== '/login' &&
      pathname !== '/logout'
    ) {
      getStore().dispatch(actionDoSignOut());
    }

    return Promise.reject(error)
  }
);

export const post = request.bind(null, 'post');
export const get = request.bind(null, 'get');