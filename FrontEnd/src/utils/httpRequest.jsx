import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}, token) => {
  const config = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await httpRequest.get(path, config);
  return response.data;
};

export const post = async (path, data, options = {}, token) => {
  const config = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await httpRequest.post(path, data, config);
  return response.data;
};

export default httpRequest;