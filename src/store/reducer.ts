import { createReducer } from '@reduxjs/toolkit';
import { OfferCity, Offer } from '../types';
import { filterByCityAction, fillOffersAction, sortByAction, changeAuthorizationStatus } from './actions';
import { SortBy } from '../const';
import { OfferPreview } from '../types';
import { loadOffersList } from './actions';
import { AuthorizationStatus } from '../const';
import { User } from '../types';

type InitialState = {
  currentCity: OfferCity;
  offers: Offer[];
  sortBy: SortBy;
  offersPreview: OfferPreview[];
  isLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}


const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [],
  sortBy: SortBy.Popular,
  offersPreview: [],
  isLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillOffersAction, (state, action) => {
      state.offers = action.payload;
    })

    .addCase(filterByCityAction, (state, action) => {
      state.currentCity = action.payload;
    })

    .addCase(sortByAction, (state, action) => {
      state.sortBy = action.payload;
    })

    .addCase(loadOffersList, (state, action) => {
      state.offersPreview = action.payload;
      state.isLoaded = true;
    })

    .addCase(changeAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload.authorizationStatus;
      state.user = action.payload.user;
    });
});

export { reducer };
