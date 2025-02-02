import { NameSpace, NewReviewStatus, OFFERS_NEARBY_LIST_MAX_COUNT } from '../../const';
import { fetchOffer, fetchNearby, fetchReviews, pushNewReviews } from '../api-actions';
import { createSlice } from '@reduxjs/toolkit';
import { OfferPreview } from '../../types';
import { OfferFull } from '../../types';
import { Review } from '../../types';
import { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  offerFull: OfferFull | null;
  hasFetchError: boolean;
  offersNearby: OfferPreview[];
  reviews: Review[];
  newReviewStatus: NewReviewStatus;
}


const initialState: InitialState = {
  offerFull: null,
  hasFetchError: false,
  offersNearby: [],
  reviews: [],
  newReviewStatus: NewReviewStatus.Empty,
};

export const offerData = createSlice({
  name: NameSpace.OfferFull,
  initialState,
  reducers: {
    clearOffer: (state) => {
      state.offerFull = null;
    },
    clearOfferNearBy: (state) => {
      state.offersNearby = [];
    },
    clearReviews: (state) => {
      state.reviews = [];
    },
    clearNewReviewState: (state) => {
      state.newReviewStatus = NewReviewStatus.Empty;
    },
    updateFavorites: (state, action: PayloadAction<{offerId:string; isFavorite: boolean}>) => {
      const {offerId, isFavorite} = action.payload;
      const index = state.offersNearby.findIndex((element) => element.id === offerId);
      if (index > -1) {
        state.offersNearby[index].isFavorite = isFavorite;
      }
      if (state.offerFull) {
        state.offerFull.isFavorite = isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.hasFetchError = false;
      })

      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offerFull = action.payload;
      })

      .addCase(fetchOffer.rejected, (state) => {
        state.hasFetchError = true;
      })

      .addCase(fetchNearby.fulfilled, (state, action) => {
        state.offersNearby = action.payload.slice(0, OFFERS_NEARBY_LIST_MAX_COUNT);
      })

      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })

      .addCase(pushNewReviews.pending, (state) => {
        state.newReviewStatus = NewReviewStatus.Pending;
      })

      .addCase(pushNewReviews.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.newReviewStatus = NewReviewStatus.Success;

      })
      .addCase(pushNewReviews.rejected, (state) => {
        state.newReviewStatus = NewReviewStatus.Error;
      });

  }
});


export const { clearOffer, clearOfferNearBy, clearReviews, updateFavorites, clearNewReviewState } = offerData.actions;
