import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoutes } from '../const';
import { OfferPreview, Review } from '../types';
import { State } from '../types';
import { AppDispatch } from '../types';
import { User } from '../types';
import { dropToken, setToken } from '../services/tokens';
import { OfferFull } from '../types';
import { replaceApiPath } from '../common';


const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>();

export const fetchOffersList = createAppAsyncThunk<OfferPreview[], undefined>(
  'offers/fetchList',
  async (_args, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(APIRoutes.offersList);
    return data;
  }
);


export const fetchOffer = createAppAsyncThunk<OfferFull, { id: string }>(
  'offers/fetchFull',
  async ({ id }, { extra: api }) => {

    const { data } = await api.get<OfferFull>(replaceApiPath(APIRoutes.offer, { 'offerId': id }));
    return data;

  }
);

export const fetchNearby = createAppAsyncThunk<OfferPreview[], { id: string }>(
  'offers/fetchNearby',
  async ({ id }, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(replaceApiPath(APIRoutes.nearby, { 'offerId': id }));
    return data;
  }
);

export const fetchReviews = createAppAsyncThunk<Review[], { id: string }>(
  'reviews/fetchReviews',
  async ({ id }, { extra: api }) => {
    const { data } = await api.get<Review[]>(replaceApiPath(APIRoutes.review, { 'offerId': id }));
    return data;
  }
);

export const pushNewReviews = createAppAsyncThunk<void, { offerId: string; review: Review }>(
  'reviews/pushNew',
  async ({ offerId, review }, { extra: api }) => {
    await api.post<Review>(replaceApiPath(APIRoutes.review, { 'offerId': offerId }), {
      comment: review.comment,
      rating: review.rating,
    });
  }
);

export const pushIsFavoriteAction = createAppAsyncThunk<void, { id: string; isFavorite: boolean }>(
  'offer/pushIsFavorite',
  async ({ id, isFavorite }, { extra: api }) => {
    await api.post<OfferFull>(replaceApiPath(APIRoutes.favorite, { 'offerId': id, 'status': Number(isFavorite).toString() }));

  }
);

export const fetchAuthorizationStatus = createAppAsyncThunk<void, undefined>(
  'user/fetchAuthorisationStatus',
  async (_args, { extra: api }) => {
    await api.get<User>(APIRoutes.login);
  }
);

export const logInAction = createAppAsyncThunk<User | null, { email: string; password: string }>(
  'user/logIn',
  async ({ email, password }, { extra: api }) => {
    try {
      const { data } = await api.post<User>(APIRoutes.login, { email, password });
      setToken(data.token);
      return data
    } catch {
      dropToken();
      return null;
    }
  }
);


export const logOutAction = createAppAsyncThunk<void, undefined>(
  'user/logOut',
  async (_args, { extra: api }) => {
    await api.get<User>(APIRoutes.logout);
    dropToken();
  }
);


