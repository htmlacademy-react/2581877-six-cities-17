import { createReducer } from '@reduxjs/toolkit';
import { OfferCity, Offer } from '../types';
import { offers } from '../mocks/offers';
import { filterByCityAction, fillOffersAction, sortByAction } from './actions';
import { SortBy } from '../const';

type InitialState = {
  currentCity: OfferCity;
  currentCityOffers: Offer[];
  sortBy: SortBy;
}


const initialState: InitialState = {
  currentCity: 'Paris',
  currentCityOffers: offers.filter((offer) => offer.city === 'Paris'),
  sortBy: SortBy.Popular,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillOffersAction, (state, action) => {
      state.currentCityOffers = action.payload;
      state.sortBy = SortBy.Popular;
    })

    .addCase(filterByCityAction, (state, action) => {
      state.currentCity = action.payload;
      state.currentCityOffers = state.currentCityOffers.filter((offer) => offer.city === state.currentCity);
    })

    .addCase(sortByAction.popular, (state) => {
      state.sortBy = SortBy.Popular;
    })

    .addCase(sortByAction.priceHighToLow, (state) => {
      state.sortBy = SortBy.PriceHighToLow;
      state.currentCityOffers.sort((a, b) => b.price - a.price);
    })

    .addCase(sortByAction.priceLowToHigh, (state) => {
      state.sortBy = SortBy.PriceLowToHigh;
      state.currentCityOffers.sort((a, b) => a.price - b.price);
    })

    .addCase(sortByAction.topRated, (state) => {
      state.sortBy = SortBy.TopRrated;
      state.currentCityOffers.sort((a, b) => b.rating - a.rating);
    });
});

export { reducer };
