import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './tokens';

const API_URL = 'https://16.design.htmlacademy.pro/six-cities';
const API_TIMEOUT = 5_000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = getToken();

      if(token && config.headers) {
        config.headers['X-Token'] = token;
      }
      return config;
    }
  );

  return api;
};
