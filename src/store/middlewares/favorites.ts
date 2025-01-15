import {PayloadAction} from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import {rootReducer} from '../root-reducer';
import { OfferFull } from '../../types';
import { updateFavorites as updateFavoritesFull } from '../offer-data/offer-data';
import { updateFavorites as updateFavoritesList } from '../offers-list-data/offers-list-data';
import { fetchFavorites } from '../api-actions';
import { store } from '..';


type Reducer = ReturnType<typeof rootReducer>;

export const updateFavorites: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<OfferFull>) => {
        if (action.type === 'offer/pushIsFavorite/fulfilled') {
          store.dispatch(updateFavoritesFull(action.payload));
          store.dispatch(updateFavoritesList(action.payload));
        }
        return next(action);
      };

export const loadFavorites: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<OfferFull>) => {
        if (action.type === 'user/fetchAuthorisationStatus/fulfilled' || action.type === 'user/logIn/fulfilled') {
          store.dispatch(fetchFavorites());
        }
        return next(action);
      };
