import { Injectable } from '@nestjs/common';

import { Redis } from 'lib/redis'; 
import { CacheConfig } from 'config/cache';

@Injectable()
export class CacheService extends Redis {
  constructor() {
    super(CacheConfig);
  }
}