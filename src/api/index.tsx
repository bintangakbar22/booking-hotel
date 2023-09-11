import {BASE_URL} from '@constants/url';
import axios from 'axios';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const baseConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'access-control-allow-origin': '*',
    'X-Parse-Application-Id': 'Rr9ZKgR2t2f49g5ueLWriacIrvKy8Hwv7P87FSw3',
    'X-Parse-REST-API-Key': '4C6gLjrbNGoym5m9j9mFQiDzXO5eETLxjUjY9Fzy',
  },
  timeout: 25000,
};
const api = axios.create(baseConfig);

api.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  async function (error) {
    Toast.show({
      type: 'error',
      text1: error?.data?.message ?? error?.message,
    });
    return Promise.reject(error);
  },
);

export default api;
