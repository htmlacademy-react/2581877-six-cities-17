import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoutes } from '../const';
import { OfferPreview, Review } from '../types';
import { State } from '../types';
import { AppDispatch } from '../types';
import { addNewReviewsAction, loadOffersListAction, loadReviewsAction } from './actions';
import { changeAuthorizationStatusAction } from './actions';
import { User } from '../types';
import { AuthorizationStatus } from '../const';
import { dropToken, setToken } from '../services/tokens';
import { OfferFull } from '../types';
import { loadOfferAction } from './actions';
import { loadNearbyAction } from './actions';
import { replaceApiPath } from '../common';
import { changeIsFavoriteAction } from './actions';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>();

export const fetchOffersListAction = createAppAsyncThunk<void, undefined>(
  'offers/fetchList',
  async (_args, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(APIRoutes.offersList);
    dispatch(loadOffersListAction(data));
  }
);

export const fetchOfferAction = createAppAsyncThunk<void, { id: string }>(
  'offers/fetchFull',
  async ({ id }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OfferFull>(replaceApiPath(APIRoutes.offer, { 'offerId': id }));
      dispatch(loadOfferAction(data));
    } catch {
      dispatch(loadOfferAction(undefined));
    }
  }
);

export const fetchNearbyAction = createAppAsyncThunk<void, { id: string }>(
  'offers/fetchNearby',
  async ({ id }, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferPreview[]>(replaceApiPath(APIRoutes.nearby, { 'offerId': id }));
    dispatch(loadNearbyAction(data.slice(0, 3)));
  }
);

export const fetchReviewsAction = createAppAsyncThunk<void, { id: string }>(
  'reviews/fetchReviews',
  async ({ id }, { dispatch, extra: api }) => {
    const { data } = await api.get<Review[]>(replaceApiPath(APIRoutes.review, { 'offerId': id }));
    dispatch(loadReviewsAction(data));
  }
);

export const pushNewReviewsAction = createAppAsyncThunk<void, { offerId: string; review: Review }>(
  'reviews/pushNew',
  async ({ offerId, review }, { dispatch, extra: api }) => {
    const { data } = await api.post<Review>(replaceApiPath(APIRoutes.review, { 'offerId': offerId }), {
      comment: review.comment,
      rating: review.rating,
    });
    dispatch(addNewReviewsAction(data));
  }
);

export const pushIsFavoriteAction = createAppAsyncThunk<void, { id: string; isFavorite: boolean }>(
  'offer/pushIsFavorite',
  async ({ id, isFavorite }, { dispatch, extra: api }) => {
    const { data } = await api.post<OfferFull>(replaceApiPath(APIRoutes.favorite, { 'offerId': id, 'status': Number(isFavorite).toString() }));
    dispatch(changeIsFavoriteAction({ offerId: id, isFavorite: data.isFavorite }));
  }
);

export const fetchAuthorizationStatus = createAppAsyncThunk<void, undefined>(
  'user/fetchAuthorisationStatus',
  async (_args, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User>(APIRoutes.login);
      dispatch(changeAuthorizationStatusAction({
        authorizationStatus: AuthorizationStatus.Auth,
        user: data,
      }
      ));
    } catch {
      dropToken();
      dispatch(changeAuthorizationStatusAction({
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
      dispatch(changeAuthorizationStatusAction({
        authorizationStatus: AuthorizationStatus.Auth,
        user: data,
      }
      ));
    } catch {
      dropToken();
      dispatch(changeAuthorizationStatusAction({
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
    dispatch(changeAuthorizationStatusAction(
      {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null
      }
    ));
  }
);


