import { createConnection } from "typeorm";

const {
  POSTGRESQL_HOSTNAME,
  POSTGRESQL_PORT,
  POSTGRESQL_USERNAME,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_DATABASE,
  REDIS_HOSTNAME,
  REDIS_PORT,
} = process.env;

const DatabaseConfig = {
  type: 'postgres',
  host: POSTGRESQL_HOSTNAME,
  port: +POSTGRESQL_PORT,
  username: POSTGRESQL_USERNAME,
  password: POSTGRESQL_PASSWORD,
  database: POSTGRESQL_DATABASE,
  entities: [
    __dirname + '/entities/**/*.{ts,js}'
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

createConnection(DatabaseConfig as any);