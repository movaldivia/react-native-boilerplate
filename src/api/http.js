import axios from 'axios';
import {getToken} from '../helpers/token';

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

//axios.defaults.baseURL = API_URL aqui poner con variables de entorno la url de la api a utilizar.;

axios.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    alert(error)
  } else {
    if (error.response.status === 400 || error.response.status === 403) {
      const key = Object.keys(error.response.data);
      alert(error.response.data[key[0]])
    } else if (error.status === 401) {
      alert('Token Expirado')
    }
  }

  return Promise.reject(error);
});

export default {
  get: (url, options = {}) =>
    (options.blob && axios.get(url, {responseType: 'blob'})) ||
    axios.get(url, {...defaultOptions, ...options}),
  post: (url, data, options = {}) =>
    axios.post(url, data, {...defaultOptions, ...options}),
  patch: (url, data, options = {}) =>
    axios.patch(url, data, {...defaultOptions, ...options}),
  put: (url, data, options = {}) =>
    axios.put(url, data, {...defaultOptions, ...options}),
  delete: (url, options = {}) =>
    axios.delete(url, {...defaultOptions, ...options}),
};
