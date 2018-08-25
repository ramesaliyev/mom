const {
  REDIS_HOSTNAME,
  REDIS_PORT,
} = process.env;

export const CacheConfig = {
  host: REDIS_HOSTNAME,
  port: REDIS_PORT
};