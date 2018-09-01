const {
  POSTGRESQL_HOSTNAME,
  POSTGRESQL_PORT,
  POSTGRESQL_USERNAME,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_DATABASE,
  REDIS_HOSTNAME,
  REDIS_PORT,
} = process.env;

export const DatabaseConfig = {
  type: 'postgres',
  host: POSTGRESQL_HOSTNAME,
  port: +POSTGRESQL_PORT,
  username: POSTGRESQL_USERNAME,
  password: POSTGRESQL_PASSWORD,
  database: POSTGRESQL_DATABASE,
  entities: [
    __dirname + '/../**/*.entity.{ts,js}'
  ],
  synchronize: true,
  cache: {
    type: "redis",
    options: {
      host: REDIS_HOSTNAME,
      port: REDIS_PORT,
    }
  }
};