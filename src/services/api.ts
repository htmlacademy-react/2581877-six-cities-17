import axios, { AxiosError, AxiosResponse, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
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

      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<{
      type: string;
      message: string;
    }>) => {
      if (error.response) {
        const { data } = error.response;
        const errorMessage = data.message;
        const errorType = data.type;

        // TODO: Тост с ошибкой
        console.error(`Error Type: ${errorType}, Message: ${errorMessage}`);

      }
      throw error;
    }
  );

  return api;
};
