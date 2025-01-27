import {AuthorizationStatus, NameSpace} from '../../const';
import { State, User, OfferPreview } from '../../types';
import { CategorizedOffers } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: Pick<State, NameSpace.User>): User | null => state[NameSpace.User].user;
export const getFavorites = (state: Pick<State, NameSpace.User>): OfferPreview[] => state[NameSpace.User].favorites;

export const getCategorizedFavorites = createSelector([getFavorites], (offers) => {
  const categorizedOffers: CategorizedOffers = {};

  offers.forEach((offer: OfferPreview) => {
    const offerCity = offer.city.name;
    if (categorizedOffers[offerCity] === undefined) {
      categorizedOffers[offerCity] = [];
    }
    categorizedOffers[offerCity].push(offer);
  });
  return categorizedOffers;
});

export const getFavoritesCount = createSelector([getFavorites], (offers) => offers.length);
