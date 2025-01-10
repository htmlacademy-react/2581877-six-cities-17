import { createAction } from '@reduxjs/toolkit';
import { OfferCity } from '../types';
import { Offer } from '../types';
import { SortBy } from '../const';
import { OfferPreview } from '../types';
import { AuthorizationStatus } from '../const';
import { User } from '../types';
import { OfferFull } from '../types';
import { Review } from '../types';

export const filterByCityAction = createAction<OfferCity>('offers/filterByCity');
export const fillOffersAction = createAction<Offer[]>('offers/fill');
export const sortByAction = createAction<SortBy>('offers/sortBy/popular');
export const loadOffersListAction = createAction<OfferPreview[]>('offers/loadList');
export const loadOfferAction = createAction<OfferFull | null | undefined>('offer/loadFull');
export const loadNearbyAction = createAction<OfferPreview[]>('offer/loadNearby');
export const loadReviewsAction = createAction<Review[]>('reviews/load');
export const addNewReviewsAction = createAction<Review>('reviews/addNew');
export const changeIsFavoriteAction = createAction<{offerId:string; isFavorite:boolean}>('offer/changeIsFavorite');

export const changeAuthorizationStatusAction = createAction<
  {
    authorizationStatus: AuthorizationStatus;
    user: User | null;
  }
>('authorization/changeStatus');

