let defaultHeaders = {};

export const addDefaultHeaders = (headers = {}) => {
  defaultHeaders = {
    ...defaultHeaders,
    ...headers
  }
}

export const getDefaultHeaders = () => defaultHeaders;