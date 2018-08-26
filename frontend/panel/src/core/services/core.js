import * as axios from 'axios';

import { getDefaultHeaders } from 'config';

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

export const post = request.bind(null, 'post');
export const get = request.bind(null, 'get');