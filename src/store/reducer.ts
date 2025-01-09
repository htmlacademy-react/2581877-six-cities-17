import { createReducer } from '@reduxjs/toolkit';
import { OfferCity, Offer, Review } from '../types';
import { filterByCityAction, fillOffersAction, sortByAction, changeAuthorizationStatusAction, loadOfferAction, loadOffersListAction, loadNearbyAction, loadReviewsAction, addNewReviewsAction } from './actions';
import { SortBy } from '../const';
import { OfferPreview } from '../types';
import { AuthorizationStatus } from '../const';
import { User } from '../types';
import { OfferFull } from '../types';
import { changeIsFavoriteAction } from './actions';

type InitialState = {
  currentCity: OfferCity;
  offers: Offer[];
  sortBy: SortBy;
  offersPreview: OfferPreview[];
  offerFull: OfferFull | null | undefined;
  offersNearby: OfferPreview[];
  reviews: Review[];
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}


const initialState: InitialState = {
  currentCity: 'Paris',
  offers: [],
  sortBy: SortBy.Popular,
  offersPreview: [],
  offersNearby: [],
  offerFull: null,
  reviews: [],
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

    .addCase(loadOffersListAction, (state, action) => {
      state.offersPreview = action.payload;
    })

    .addCase(loadOfferAction, (state, action) => {
      state.offerFull = action.payload;
    })

    .addCase(loadNearbyAction, (state, action) => {
      state.offersNearby = action.payload;
    })

    .addCase(loadReviewsAction, (state, action) => {
      state.reviews = action.payload;
    })

    .addCase(addNewReviewsAction, (state, action) => {
      state.reviews.push(action.payload);
    })

    .addCase(changeIsFavoriteAction, (state, action) => {
      const { offerId, isFavorite } = action.payload;
      if (state.offerFull?.id === offerId) {
        state.offerFull.isFavorite = isFavorite;
      }
      state.offersPreview = state.offersPreview.map((offer) => {
        if (offer.id === offerId) {
          offer.isFavorite = isFavorite;
        }
        return offer;
      });
      state.offersNearby = state.offersNearby.map((offer) => {
        if (offer.id === offerId) {
          offer.isFavorite = isFavorite;
        }
        return offer;
      });
    })

    .addCase(changeAuthorizationStatusAction, (state, action) => {
      state.authorizationStatus = action.payload.authorizationStatus;
      state.user = action.payload.user;
    });
});

export { reducer };
