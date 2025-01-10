import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoutes } from '../const';
import { OfferPreview } from '../types';
import { State } from '../types';
import { AppDispatch } from '../types';
import { loadOffersList } from './actions';
import { changeAuthorizationStatus } from './actions';
import { User } from '../types';
import { AuthorizationStatus } from '../const';
import { dropToken, setToken } from '../services/tokens';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>();

export const fetchOffersList = createAppAsyncThunk<void, undefined>(
  'offers/fetchList',
  async (_args, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(APIRoutes.offersList);
    dispatch(loadOffersList(data));
  }
);

export const fetchAuthorizationStatus = createAppAsyncThunk<void, undefined>(
  'user/fetchAuthorisationStatus',
  async (_args, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User>(APIRoutes.login);
      dispatch(changeAuthorizationStatus({
        authorizationStatus: AuthorizationStatus.Auth,
        user: data,
      }
      ));
    } catch {
      dropToken();
      dispatch(changeAuthorizationStatus({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      }
      ));
    }
  }
);

export const logInAction = createAppAsyncThunk<void, { email: string; password: string }>(
  'user/logIn',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<User>(APIRoutes.login, { email, password });
      setToken(data.token);
      dispatch(changeAuthorizationStatus({
        authorizationStatus: AuthorizationStatus.Auth,
        user: data,
      }
      ));
    } catch {
      dropToken();
      dispatch(changeAuthorizationStatus({
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      }
      ));
    }
  }
);


export const logOutAction = createAppAsyncThunk<void, undefined>(
  'user/logOut',
  async (_args, { dispatch, extra: api }) => {
    await api.get<User>(APIRoutes.logout);
    dropToken();
    dispatch(changeAuthorizationStatus(
      {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null
      }
    ));
  }
);
