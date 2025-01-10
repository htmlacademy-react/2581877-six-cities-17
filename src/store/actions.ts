import { createAction } from '@reduxjs/toolkit';
import { OfferCity } from '../types';
import { Offer } from '../types';

export const filterByCityAction = createAction<OfferCity>('offers/filterByCity');
export const fillOffersAction = createAction<Offer[]>('offers/fill');
export const sortByAction = {
  popular: createAction('offers/sortBy/popular'),
  priceLowToHigh: createAction('offers/sortBy/priceLowToHigh'),
  priceHighToLow: createAction('offers/sortBy/priceHighToLow'),
  topRated: createAction('offers/sortBy/topRated'),
};
