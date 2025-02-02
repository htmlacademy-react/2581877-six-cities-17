import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { OfferPreview, Review } from '../types';
import { State } from '../types';
import { AppDispatch } from '../types';
import { User } from '../types';
import { dropToken, setToken } from '../services/tokens';
import { OfferFull } from '../types';
import { replaceApiPath } from '../common';
import { AxiosError } from 'axios';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>();

export const fetchOffersList = createAppAsyncThunk<OfferPreview[], undefined>(
  'offers/fetchList',
  async (_args, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(APIRoute.OffersList);
    return data;
  }
);


export const fetchOffer = createAppAsyncThunk<OfferFull, { id: string }>(
  'offers/fetchFull',
  async ({ id }, { extra: api, rejectWithValue }) => {

    try {
      const { data } = await api.get<OfferFull>(replaceApiPath(APIRoute.Offer, { 'offerId': id }));
      return data;
    } catch(error) {
      const axiosError = error as AxiosError;

      return rejectWithValue(axiosError.message);
    }
  }
);

export const fetchNearby = createAppAsyncThunk<OfferPreview[], { id: string }>(
  'offers/fetchNearby',
  async ({ id }, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(replaceApiPath(APIRoute.Nearby, { 'offerId': id }));
    return data;
  }
);

export const fetchReviews = createAppAsyncThunk<Review[], { id: string }>(
  'reviews/fetchReviews',
  async ({ id }, { extra: api }) => {
    const { data } = await api.get<Review[]>(replaceApiPath(APIRoute.Review, { 'offerId': id }));
    return data;
  }
);

export const pushNewReviews = createAppAsyncThunk<Review, { offerId: string; review: Review }>(
  'reviews/pushNew',
  async ({ offerId, review }, { extra: api }) => {
    const { data } = await api.post<Review>(replaceApiPath(APIRoute.Review, { 'offerId': offerId }), {
      comment: review.comment,
      rating: review.rating,
    });
    return data;
  }
);

export const pushIsFavoriteAction = createAppAsyncThunk<OfferFull, { id: string; isFavorite: boolean }>(
  'offer/pushIsFavorite',
  async ({ id, isFavorite }, { extra: api }) => {
    const { data } = await api.post<OfferFull>(replaceApiPath(APIRoute.FavoriteStatus, { 'offerId': id, 'status': Number(isFavorite).toString() }));
    return data;
  }
);

export const fetchFavorites = createAppAsyncThunk<OfferPreview[], undefined>(
  'user/fetchFavorites',
  async (_args, { extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(APIRoute.Favorite);
    return data;
  }
);

export const fetchAuthorizationStatus = createAppAsyncThunk<User, undefined>(
  'user/fetchAuthorisationStatus',
  async (_args, { extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Login);
    return data;
  }
);

export const logInAction = createAppAsyncThunk<User, { email: string; password: string }>(
  'user/logIn',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<User>(APIRoute.Login, { email, password });
    setToken(data.token);
    return data;
  }
);


export const logOutAction = createAppAsyncThunk<void, undefined>(
  'user/logOut',
  async (_args, { extra: api }) => {
    await api.delete<User>(APIRoute.Logout);
    dropToken();
  }
);


