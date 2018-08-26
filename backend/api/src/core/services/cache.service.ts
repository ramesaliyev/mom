import { Injectable } from '@nestjs/common';
const { promisify } = require('util');
import * as redis from 'redis';

import { CacheConfig } from 'config/cache';
const client = redis.createClient(CacheConfig);
const get = promisify(client.get).bind(client);

@Injectable()
export class CacheService {
  async get(key: string): Promise<any> {
    return await get(key);
  }

  async set(key: string, value: any, options: any): Promise<any> {
    let args = [
      key, value
    ];

    if (options.expire) {
      args = [
        ...args,
        'EX', 
        options.expire,
      ]
    }

    return await client.set(...args);
  }

  async remove(key: string): Promise<any> {
    return await client.del(key);
  }
}