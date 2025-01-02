import {createAction} from '@reduxjs/toolkit';
import { OfferCity } from '../types';
import { Offer } from '../types';

export const filterByCityAction = createAction<OfferCity>('offers/filterByCity');
export const fillOffersAction = createAction<Offer[]>('offers/fill');
