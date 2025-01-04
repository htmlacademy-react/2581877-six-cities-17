import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoutes } from '../const';
import { OfferPreview } from '../types';
import { State } from '../types';
import { AppDispatch } from '../types';
import { loadOffersList } from './actions';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>();

export const fetchOffersList = createAppAsyncThunk<void, undefined>(
  'offers/fetchList',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferPreview[]>(APIRoutes.offersList);
    dispatch(loadOffersList(data));
  }
);
