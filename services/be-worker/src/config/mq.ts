const {
  MQ_HOSTNAME,
  MQ_PORT,
  MQ_USERNAME,
  MQ_PASSWORD,
} = process.env;

export const MQConfig = {
  host: MQ_HOSTNAME,
  port: +MQ_PORT,
  user: MQ_USERNAME,
  pass: MQ_PASSWORD,
};