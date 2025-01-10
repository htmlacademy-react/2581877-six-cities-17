import { createAction } from '@reduxjs/toolkit';
import { OfferCity } from '../types';
import { Offer } from '../types';
import { SortBy } from '../const';
import { OfferPreview } from '../types';

export const filterByCityAction = createAction<OfferCity>('offers/filterByCity');
export const fillOffersAction = createAction<Offer[]>('offers/fill');
export const sortByAction = createAction<SortBy>('offers/sortBy/popular');

export const loadOffersList = createAction<OfferPreview[]>('offers/loadList');
