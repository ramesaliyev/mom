const {
  EXMATHSERVICE_HOSTNAME,
  EXMATHSERVICE_PORT,
} = process.env;

export const ServicesConfig = {
  math: {
    host: EXMATHSERVICE_HOSTNAME,
    port: +EXMATHSERVICE_PORT,
  }
};