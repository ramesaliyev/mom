import { Redis } from 'lib/redis'; 
import { CacheConfig } from 'config/cache';

const redis = new Redis(CacheConfig);

export const getUserFromCache = id => redis.get(
  `${process.env.USER_TOKEN_CACHE_PREFIX}${id}`
);