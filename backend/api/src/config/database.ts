const {
  POSTGRESQL_HOSTNAME,
  POSTGRESQL_PORT,
  POSTGRESQL_USERNAME,
  POSTGRESQL_PASSWORD,
  POSTGRESQL_DATABASE,
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
};