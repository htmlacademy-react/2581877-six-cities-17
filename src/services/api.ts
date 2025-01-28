import axios, { AxiosError, AxiosResponse, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './tokens';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';

type DetailMessageType = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.REQUEST_TIMEOUT]: true,
  [StatusCodes.INTERNAL_SERVER_ERROR]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

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
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
        toast.error(detailMessage.message, { toastId: 'api-error'});
      }

      throw error;
    }
  );

  return api;
};
