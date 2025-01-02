import {createReducer} from '@reduxjs/toolkit';
import { OfferCity, Offer } from '../types';
import { offers } from '../mocks/offers';
import { filterByCityAction,fillOffersAction } from './actions';


type InitialState = {
  currentCity: OfferCity;
  currentCityOffers: Offer[];
}


const initialState:InitialState = {
  currentCity: 'Paris',
  currentCityOffers: offers,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(filterByCityAction, (state, action) => {
      state.currentCity = action.payload;
      state.currentCityOffers = state.currentCityOffers.filter((offer) => offer.city === state.currentCity);
    })
    .addCase(fillOffersAction, (state, action) => {
      state.currentCityOffers = action.payload;
    });
});

export {reducer};
