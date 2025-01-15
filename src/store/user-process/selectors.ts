import {AuthorizationStatus, NameSpace} from '../../const';
import { State, User, OfferPreview } from '../../types';
import { CategorizedOffers } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: Pick<State, NameSpace.User>): User | null => state[NameSpace.User].user;
export const getFavorites = (state: Pick<State, NameSpace.User>): OfferPreview[] => state[NameSpace.User].favorites;

export const getFilteredAndSortedOffers = createSelector([getFavorites], (offers) => {
  const categorizedOffers: CategorizedOffers = {};

  //разбиваем массив предложений на словарь OfferCity -> Offer[]
  offers.forEach((offer: OfferPreview) => {
    const offerCity: string = offer.city.name;
    if (categorizedOffers[offerCity] === undefined) {
      categorizedOffers[offerCity] = [];
    }
  });

});