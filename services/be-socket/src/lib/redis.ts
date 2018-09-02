/**
 * SHARED Redis Service v0.1.0
 */

import { promisify } from "util";
import * as redis from "redis";

export class RedisService {
  private client;
  public get;

  constructor({ host, port}) {
    this.client = redis.createClient({
      host,
      port,
    });
    
    this.get = promisify(this.client.get).bind(this.client);
  }

  public async set(key: string, value: any, options: any): Promise<any> {
    let args = [key, value];

    if (options.expire) {
      args = [...args, "EX", options.expire];
    }

    return await this.client.set(...args);
  }

  public async remove(key: string): Promise<any> {
    return await this.client.del(key);
  }
}
