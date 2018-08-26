import * as redis from 'redis';
const { promisify } = require('util');

const client = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: +process.env.REDIS_PORT
});

export const get = promisify(client.get).bind(client);