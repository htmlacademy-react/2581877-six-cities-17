import { createReducer } from '@reduxjs/toolkit';
import { OfferCity, Offer } from '../types';
import { filterByCityAction, fillOffersAction, sortByAction } from './actions';
import { SortBy } from '../const';
import { OfferPreview } from '../types';
import { loadOffersList } from './actions';

type InitialState = {
  currentCity: OfferCity;
  offers: Offer[];
  sortBy: SortBy;
  offersPreview: OfferPreview[];
  isLoaded: boolean;
}


const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [],
  sortBy: SortBy.Popular,
  offersPreview: [],
  isLoaded: false,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillOffersAction, (state, action) => {
      state.offers = action.payload;
    })

    .addCase(filterByCityAction, (state, action) => {
      state.currentCity = action.payload;
    })

    .addCase(sortByAction, (state,action) => {
      state.sortBy = action.payload;
    })

    .addCase(loadOffersList, (state,action) => {
      state.offersPreview = action.payload;
      state.isLoaded = true;
    });
});

export { reducer };
