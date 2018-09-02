import { Injectable } from '@nestjs/common';

import { RedisService } from 'lib/redis'; 
import { CacheConfig } from 'config/cache';

@Injectable()
export class CacheService extends RedisService {
  constructor() {
    super(CacheConfig);
  }
}