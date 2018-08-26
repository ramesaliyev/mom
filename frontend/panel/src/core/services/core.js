import * as axios from 'axios';

import { getDefaultHeaders } from 'config';
import { getStore } from 'core/store';
import { notify } from 'globals/notify';
import { actionDoSignOut } from 'actions/user/signin';

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

const notifyResponse = (type, { response, config }) => {
  const { status } = response;
  const { method, pathname } = parseConfig(config);

  notify(
    type.toLowerCase(),
    `[${method}] ${type} (${status}) ${pathname}`
  );
}

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
    notifyResponse('Success', {
      response,
      config: response.config
    });
    
    return response;
  },
  error => {
    const { config, response } = error;
    const { status } = response;
    const { pathname } = parseConfig(config);

    notifyResponse('Error', {
      response,
      config
    });

    if (status === 401 && pathname !== '/logout') {
      getStore().dispatch(actionDoSignOut());
    }

    return Promise.reject(error)
  }
);

export const post = request.bind(null, 'post');
export const get = request.bind(null, 'get');