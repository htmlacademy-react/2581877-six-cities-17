import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { rootReducer } from '../root-reducer';
import { OfferFull } from '../../types';
import { updateFavorites as updateFavoritesFull } from '../offer-data/offer-data';
import { updateFavorites as updateFavoritesList } from '../offers-list-data/offers-list-data';
import { updateFavorites as updateFavoritesUser } from '../user-process/user-process';
import { fetchFavorites, fetchOffersList } from '../api-actions';
import { NameSpace } from '../../const';
import { AppDispatch } from '../../types';

type Reducer = ReturnType<typeof rootReducer>;

const updateFavorites: Middleware<unknown, Reducer> =
  (store) =>
    (next) =>
      (action: PayloadAction<OfferFull>) => {
        if (action.type === 'offer/pushIsFavorite/fulfilled') {
          const offerFull = action.payload;
          store.dispatch(updateFavoritesFull({ offerId: offerFull.id, isFavorite: offerFull.isFavorite }));
          store.dispatch(updateFavoritesList({ offerId: offerFull.id, isFavorite: offerFull.isFavorite }));

          const offersList = store.getState()[NameSpace.OfferPreview].offersList;
          const index = offersList.findIndex((element) => element.id === offerFull.id);
          if (index > -1) {
            store.dispatch(updateFavoritesUser(offersList[index]));
          }

        }
        return next(action);
      };

const loadFavoritesWithUserLogin: Middleware<unknown, Reducer> =
  (store) =>
    (next) =>
      (action: PayloadAction<OfferFull>) => {
        if (action.type === 'user/fetchAuthorisationStatus/fulfilled' || action.type === 'user/logIn/fulfilled') {
          const dispatch = store.dispatch as AppDispatch;
          dispatch(fetchFavorites());
          dispatch(fetchOffersList());
        }
        return next(action);
      };

const syncFavoritesWithUserLogout: Middleware<unknown, Reducer> =
  (store) =>
    (next) =>
      (action: PayloadAction<OfferFull>) => {
        if (action.type === 'user/logOut/fulfilled') {
          const dispatch = store.dispatch as AppDispatch;
          dispatch(fetchOffersList());
        }
        return next(action);
      };

export const appMiddlewares = [updateFavorites, loadFavoritesWithUserLogin, syncFavoritesWithUserLogout];
