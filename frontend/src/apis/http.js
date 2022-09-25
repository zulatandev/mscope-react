import axios, { AxiosRequestConfig, Method } from 'axios';

import { ACCESS_TOKEN_KEY, API_SERVER } from '../constants';
import { StorageService } from '../service';

const http = axios.create({ baseURL: `${API_SERVER}/api` });

const request = (method: Method, url: string, options: AxiosRequestConfig) => {
  const accessToken = StorageService.getItem(ACCESS_TOKEN_KEY);

  return http
    .request({
      ...options,
      method,
      url,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(httpResponseHandler)
    .catch(httpErrorHandler);
};

const httpResponseHandler = response => {
  return response.data;
};

const httpErrorHandler = err => {
  const message = err?.response?.data?.message;
  throw {
    message: message || 'Network Error!'
  };
};

const Http = {
  get(url: string, params = {}, headers = {}) {
    return request('GET', url, { params, headers });
  },
  post(url: string, body = {}, headers = {}) {
    return request('POST', url, { data: body, headers });
  },
  put(url: string, body = {}, headers = {}) {
    return request('PUT', url, { data: body, headers });
  },
  patch(url: string, body = {}, headers = {}) {
    return request('PATCH', url, { data: body, headers });
  },
  delete(url: string, body = {}, headers = {}) {
    return request('DELETE', url, { data: body, headers });
  }
};

export default Http;
